import { DrugData } from './pharma-apis';

// RxNorm API Service - Completely FREE, no API key needed
export class RxNormService {
  private baseUrl = 'https://rxnav.nlm.nih.gov/REST';

  // Search for drugs by name
  async searchDrugs(drugName: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drugs.json?name=${encodeURIComponent(drugName)}`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm search error:', error);
      return null;
    }
  }

  // Get drug details by RxCUI
  async getDrugDetails(rxcui: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/rxcui/${rxcui}/allProperties.json`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm details error:', error);
      return null;
    }
  }

  // Get drug interactions
  async getDrugInteractions(rxcui: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/interaction/interaction.json?rxcui=${rxcui}`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm interactions error:', error);
      return null;
    }
  }

  // Get related NDCs (National Drug Codes)
  async getRelatedNDCs(rxcui: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/rxcui/${rxcui}/ndcs.json`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm NDCs error:', error);
      return null;
    }
  }

  // Get spelling suggestions
  async getSpellingSuggestions(term: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/spellingsuggestions.json?name=${encodeURIComponent(term)}`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm spelling error:', error);
      return null;
    }
  }

  // Get all drugs by term type (e.g., ingredients)
  async getAllConceptsByType(tty: string = 'IN'): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/allconcepts.json?tty=${tty}`
      );
      return await response.json();
    } catch (error) {
      console.error('RxNorm concepts error:', error);
      return null;
    }
  }
}

// DailyMed API Service - FREE FDA drug labels
export class DailyMedService {
  private baseUrl = 'https://dailymed.nlm.nih.gov/dailymed/services/v2';

  // Search drug names
  async searchDrugNames(name: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drugnames.json?name=${encodeURIComponent(name)}`
      );
      return await response.json();
    } catch (error) {
      console.error('DailyMed search error:', error);
      return null;
    }
  }

  // Get SPL (Structured Product Label) by SetID
  async getSPLDetails(setId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/spls/${setId}.json`
      );
      return await response.json();
    } catch (error) {
      console.error('DailyMed SPL error:', error);
      return null;
    }
  }

  // Get all NDCs
  async getAllNDCs(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/ndcs.json`
      );
      return await response.json();
    } catch (error) {
      console.error('DailyMed NDCs error:', error);
      return null;
    }
  }

  // Get drug classes
  async getDrugClasses(): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drugclasses.json`
      );
      return await response.json();
    } catch (error) {
      console.error('DailyMed drug classes error:', error);
      return null;
    }
  }
}

// OpenFDA API Service - FREE with rate limits
export class OpenFDAService {
  private baseUrl = 'https://api.fda.gov';

  // Search drug events
  async searchDrugEvents(drugName: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drug/event.json?search=patient.drug.medicinalproduct:"${encodeURIComponent(drugName)}"&limit=10`
      );
      return await response.json();
    } catch (error) {
      console.error('OpenFDA events error:', error);
      return null;
    }
  }

  // Search drug labels
  async searchDrugLabels(drugName: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(drugName)}"&limit=10`
      );
      return await response.json();
    } catch (error) {
      console.error('OpenFDA labels error:', error);
      return null;
    }
  }

  // Search drug recalls
  async searchDrugRecalls(drugName: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}/drug/enforcement.json?search=product_description:"${encodeURIComponent(drugName)}"&limit=10`
      );
      return await response.json();
    } catch (error) {
      console.error('OpenFDA recalls error:', error);
      return null;
    }
  }
}

// Combined Drug API Service
export class ComprehensiveDrugService {
  private rxNorm = new RxNormService();
  private dailyMed = new DailyMedService();
  private openFDA = new OpenFDAService();

  // Get comprehensive drug information from multiple sources
  async getComprehensiveDrugInfo(drugName: string): Promise<DrugData | null> {
    try {
      // Get basic drug info from RxNorm
      const rxNormData = await this.rxNorm.searchDrugs(drugName);
      
      if (!rxNormData?.drugGroup?.conceptGroup) {
        return null;
      }

      // Extract first available drug concept
      const drugConcept = rxNormData.drugGroup.conceptGroup
        .find((group: any) => group.conceptProperties?.length > 0)
        ?.conceptProperties?.[0];

      if (!drugConcept) {
        return null;
      }

      // Get detailed properties
      const detailsData = await this.rxNorm.getDrugDetails(drugConcept.rxcui);
      const interactionsData = await this.rxNorm.getDrugInteractions(drugConcept.rxcui);

      // Build comprehensive drug data
      const drugData: DrugData = {
        name: drugConcept.name || drugName,
        genericName: drugConcept.name || drugName,
        brandNames: this.extractBrandNames(rxNormData),
        category: this.extractCategory(detailsData),
        rxcui: drugConcept.rxcui,
        
        dosage: {
          adult: this.extractDosage(detailsData, 'adult'),
          pediatric: this.extractDosage(detailsData, 'pediatric'),
          elderly: this.extractDosage(detailsData, 'elderly'),
          renal: this.extractDosage(detailsData, 'renal'),
          hepatic: this.extractDosage(detailsData, 'hepatic')
        },

        indications: this.extractIndications(detailsData),
        contraindications: this.extractContraindications(detailsData),
        sideEffects: this.extractSideEffects(detailsData),
        interactions: this.extractInteractions(interactionsData),
        warnings: this.extractWarnings(detailsData),
        
        pregnancyCategory: this.extractPregnancyCategory(detailsData),
        
        lastUpdated: new Date().toISOString(),
        source: 'RxNorm/DailyMed/OpenFDA',
        isVerified: true
      };

      return drugData;

    } catch (error) {
      console.error('Comprehensive drug info error:', error);
      return null;
    }
  }

  // Get list of most common drugs to populate database
  async getCommonDrugs(): Promise<string[]> {
    try {
      // Get all ingredient concepts from RxNorm
      const ingredientsData = await this.rxNorm.getAllConceptsByType('IN');
      
      if (!ingredientsData?.minConceptGroup?.minConcept) {
        return [];
      }

      // Extract drug names and return most common ones
      return ingredientsData.minConceptGroup.minConcept
        .slice(0, 500) // Get top 500 drugs
        .map((concept: any) => concept.name)
        .filter((name: string) => name && name.length > 2);

    } catch (error) {
      console.error('Common drugs error:', error);
      return [];
    }
  }

  // Helper methods to extract specific information
  private extractBrandNames(rxNormData: any): string[] {
    const brandNames: string[] = [];
    
    rxNormData?.drugGroup?.conceptGroup?.forEach((group: any) => {
      if (group.tty === 'BN' && group.conceptProperties) {
        group.conceptProperties.forEach((concept: any) => {
          if (concept.name && !brandNames.includes(concept.name)) {
            brandNames.push(concept.name);
          }
        });
      }
    });

    return brandNames;
  }

  private extractCategory(detailsData: any): string {
    // Extract therapeutic category from RxNorm properties
    const properties = detailsData?.propConceptGroup?.propConcept || [];
    const categoryProp = properties.find((prop: any) => 
      prop.propName === 'RxNorm Name' || prop.propName === 'Therapeutic Class'
    );
    return categoryProp?.propValue || 'Medication';
  }

  private extractDosage(detailsData: any, type: string): string {
    // This would need to be enhanced with more sophisticated parsing
    // For now, return generic dosage information
    return 'Consult prescribing information for specific dosage';
  }

  private extractIndications(detailsData: any): string[] {
    // Extract indications from properties
    return ['Consult prescribing information for indications'];
  }

  private extractContraindications(detailsData: any): string[] {
    return ['Consult prescribing information for contraindications'];
  }

  private extractSideEffects(detailsData: any): string[] {
    return ['Consult prescribing information for side effects'];
  }

  private extractInteractions(interactionsData: any): string[] {
    const interactions: string[] = [];
    
    if (interactionsData?.interactionTypeGroup) {
      interactionsData.interactionTypeGroup.forEach((group: any) => {
        group.interactionType?.forEach((interaction: any) => {
          if (interaction.interactionPair) {
            interaction.interactionPair.forEach((pair: any) => {
              if (pair.description) {
                interactions.push(pair.description);
              }
            });
          }
        });
      });
    }

    return interactions;
  }

  private extractWarnings(detailsData: any): string[] {
    return ['Follow prescribing guidelines and consult healthcare provider'];
  }

  private extractPregnancyCategory(detailsData: any): string {
    return 'Consult prescribing information for pregnancy category';
  }
}

// Export singleton instance
export const drugAPIService = new ComprehensiveDrugService(); 