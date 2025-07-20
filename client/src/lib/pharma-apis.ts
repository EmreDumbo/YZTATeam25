// Comprehensive Pharmaceutical APIs Integration
import { COMPREHENSIVE_DRUG_DATABASE } from './comprehensive-drug-db';

interface ApiResponses {
  fda?: {
    results?: Array<{
      openfda?: {
        brand_name?: string[];
        generic_name?: string[];
      };
      indications_and_usage?: string[];
      contraindications?: string[];
      adverse_reactions?: string[];
      warnings?: string[];
      dosage_and_administration?: string[];
    }>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rxnorm?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drugbank?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dailyMed?: any;
}

export interface DrugData {
  name: string;
  genericName: string;
  brandNames: string[];
  rxcui?: string;
  ndc?: string[];
  dosage: {
    adult: string;
    pediatric?: string;
    elderly?: string;
    renal?: string;
    hepatic?: string;
  };
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  warnings: string[];
  category: string;
  pregnancyCategory?: string;
  controlledSubstance?: string;
}

// RxNorm API Integration (US National Library of Medicine)
class RxNormAPI {
  private baseUrl = 'https://rxnav.nlm.nih.gov/REST';

  async searchDrug(term: string) {
    try {
      const response = await fetch(`${this.baseUrl}/drugs.json?name=${encodeURIComponent(term)}`);
      return await response.json();
    } catch (error) {
      console.error('RxNorm API error:', error);
      return null;
    }
  }

  async getDrugInteractions(rxcui: string) {
    try {
      const response = await fetch(`${this.baseUrl}/interaction/interaction.json?rxcui=${rxcui}`);
      return await response.json();
    } catch (error) {
      console.error('RxNorm interaction error:', error);
      return null;
    }
  }

  async getDrugProperties(rxcui: string) {
    try {
      const response = await fetch(`${this.baseUrl}/rxcui/${rxcui}/properties.json`);
      return await response.json();
    } catch (error) {
      console.error('RxNorm properties error:', error);
      return null;
    }
  }
}

// OpenFDA API Integration
class OpenFDAAPI {
  private baseUrl = 'https://api.fda.gov';

  async searchDrugLabels(term: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(term)}"&limit=10`
      );
      return await response.json();
    } catch (error) {
      console.error('OpenFDA API error:', error);
      return null;
    }
  }

  async getDrugEvents(term: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/drug/event.json?search=patient.drug.medicinalproduct:"${encodeURIComponent(term)}"&count=patient.reaction.reactionmeddrapt.exact&limit=10`
      );
      return await response.json();
    } catch (error) {
      console.error('OpenFDA events error:', error);
      return null;
    }
  }
}

// DailyMed API Integration
class DailyMedAPI {
  private baseUrl = 'https://dailymed.nlm.nih.gov/dailymed';

  async searchSPL(term: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/services/v2/spls.json?drug_name=${encodeURIComponent(term)}`
      );
      return await response.json();
    } catch (error) {
      console.error('DailyMed API error:', error);
      return null;
    }
  }
}

// DrugBank API Integration (requires API key)
class DrugBankAPI {
  private baseUrl = 'https://go.drugbank.com/structures';
  private apiKey = process.env.DRUGBANK_API_KEY;

  async searchDrug(term: string) {
    if (!this.apiKey) return null;
    
    try {
      const response = await fetch(
        `${this.baseUrl}/search.json?q=${encodeURIComponent(term)}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );
      return await response.json();
    } catch (error) {
      console.error('DrugBank API error:', error);
      return null;
    }
  }
}

// Comprehensive Drug Database Manager
export class PharmaDatabaseManager {
  private rxnorm: RxNormAPI;
  private openFDA: OpenFDAAPI;
  private dailyMed: DailyMedAPI;
  private drugBank: DrugBankAPI;

  constructor() {
    this.rxnorm = new RxNormAPI();
    this.openFDA = new OpenFDAAPI();
    this.dailyMed = new DailyMedAPI();
    this.drugBank = new DrugBankAPI();
  }

  async comprehensiveDrugSearch(drugName: string): Promise<DrugData | null> {
    // First check our comprehensive local database
    const localData = COMPREHENSIVE_DRUG_DATABASE[drugName.toLowerCase() as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    
    if (localData) {
      // We have local data, optionally enhance with live API data
      try {
        const [rxnormData, fdaData] = await Promise.all([
          this.rxnorm.searchDrug(drugName),
          this.openFDA.searchDrugLabels(drugName)
        ]);

        // Enhance local data with any new API information
        return this.enhanceLocalData(localData, { rxnorm: rxnormData, fda: fdaData });
      } catch (error) {
        console.log('API enhancement failed, using local data:', error);
        return localData as DrugData;
      }
    }

    // If not in local database, search APIs
    try {
      const [rxnormData, fdaData, dailyMedData] = await Promise.all([
        this.rxnorm.searchDrug(drugName),
        this.openFDA.searchDrugLabels(drugName),
        this.dailyMed.searchSPL(drugName)
      ]);

      const combinedData = this.combineApiData(drugName, {
        rxnorm: rxnormData,
        fda: fdaData,
        dailyMed: dailyMedData
      });

      return combinedData;
    } catch (error) {
      console.error('Comprehensive search error:', error);
      return null;
    }
  }

  private enhanceLocalData(localData: DrugData, apiResponses: ApiResponses): DrugData {
    const enhanced = { ...localData };

    // Add any new brand names from FDA data
    if (apiResponses.fda?.results?.[0]?.openfda?.brand_name) {
      const fdaBrands = apiResponses.fda.results[0].openfda.brand_name;
      enhanced.brandNames = [...new Set([...enhanced.brandNames, ...fdaBrands])];
    }

    return enhanced as DrugData;
  }

  private combineApiData(drugName: string, apiResponses: ApiResponses): DrugData {
    const drug: DrugData = {
      name: drugName,
      genericName: '',
      brandNames: [],
      dosage: { adult: '', pediatric: '', elderly: '', renal: '', hepatic: '' },
      indications: [],
      contraindications: [],
      sideEffects: [],
      interactions: [],
      warnings: [],
      category: '',
      pregnancyCategory: '',
      controlledSubstance: ''
    };

    // Extract from RxNorm
    if (apiResponses.rxnorm?.drugGroup?.conceptGroup) {
      const concepts = apiResponses.rxnorm.drugGroup.conceptGroup;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      concepts.forEach((group: any) => {
        if (group.conceptProperties) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          group.conceptProperties.forEach((prop: any) => {
            if (prop.synonym) {
              drug.brandNames.push(prop.synonym);
            }
            if (prop.rxcui) {
              drug.rxcui = prop.rxcui;
            }
          });
        }
      });
    }

    // Extract from OpenFDA
    if (apiResponses.fda?.results) {
      const fdaResult = apiResponses.fda.results[0];
      
      if (fdaResult.openfda?.generic_name) {
        drug.genericName = fdaResult.openfda.generic_name[0];
      }
      
      if (fdaResult.openfda?.brand_name) {
        drug.brandNames.push(...fdaResult.openfda.brand_name);
      }

      if (fdaResult.indications_and_usage) {
        drug.indications = fdaResult.indications_and_usage;
      }

      if (fdaResult.contraindications) {
        drug.contraindications = fdaResult.contraindications;
      }

      if (fdaResult.adverse_reactions) {
        drug.sideEffects = fdaResult.adverse_reactions;
      }

      if (fdaResult.warnings) {
        drug.warnings = fdaResult.warnings;
      }

      if (fdaResult.dosage_and_administration) {
        drug.dosage.adult = fdaResult.dosage_and_administration[0] || '';
      }
    }

    return drug;
  }

  async getDrugInteractions(drugName: string): Promise<string[]> {
    // First check local database for known interactions
    const localData = COMPREHENSIVE_DRUG_DATABASE[drugName.toLowerCase() as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    if (localData?.interactions) {
      return localData.interactions;
    }

    // If not in local database, use API
    try {
      const rxnormData = await this.rxnorm.searchDrug(drugName);
      if (!rxnormData?.drugGroup?.conceptGroup) return [];

      const rxcui = rxnormData.drugGroup.conceptGroup[0]?.conceptProperties?.[0]?.rxcui;
      if (!rxcui) return [];

      const interactions = await this.rxnorm.getDrugInteractions(rxcui);
      
      if (interactions?.interactionTypeGroup) {
        const interactionList: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        interactions.interactionTypeGroup.forEach((group: any) => {
          if (group.interactionType) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            group.interactionType.forEach((interaction: any) => {
              if (interaction.interactionPair) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                interaction.interactionPair.forEach((pair: any) => {
                  if (pair.description) {
                    interactionList.push(pair.description);
                  }
                });
              }
            });
          }
        });
        return interactionList;
      }

      return [];
    } catch (error) {
      console.error('Interaction search error:', error);
      return [];
    }
  }

  // Get all available drugs from our comprehensive database
  getAllAvailableDrugs(): string[] {
    return Object.keys(COMPREHENSIVE_DRUG_DATABASE);
  }

  // Search for drugs by partial name or brand name
  searchDrugs(query: string): string[] {
    const queryLower = query.toLowerCase();
    const matches: string[] = [];

    Object.entries(COMPREHENSIVE_DRUG_DATABASE).forEach(([key, drug]) => {
      const typedDrug = drug as DrugData;
      // Check generic name
      if (key.includes(queryLower) || typedDrug.name.toLowerCase().includes(queryLower)) {
        matches.push(key);
      }
      
      // Check brand names
      if (typedDrug.brandNames?.some(brand => brand.toLowerCase().includes(queryLower))) {
        matches.push(key);
      }
    });

    return [...new Set(matches)];
  }
}

// Export the comprehensive database for direct access
export { COMPREHENSIVE_DRUG_DATABASE as EXTENSIVE_DRUG_DATABASE };

export default PharmaDatabaseManager; 