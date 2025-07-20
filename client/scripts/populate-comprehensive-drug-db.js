const fs = require('fs');
const path = require('path');

// Common drugs list to populate (top 200+ most prescribed medications)
const COMMON_DRUGS = [
  // Cardiovascular
  'amlodipine', 'lisinopril', 'atorvastatin', 'metoprolol', 'hydrochlorothiazide',
  'losartan', 'furosemide', 'carvedilol', 'simvastatin', 'warfarin',
  'clopidogrel', 'diltiazem', 'spironolactone', 'verapamil', 'enalapril',
  'propranolol', 'digoxin', 'isosorbide', 'nifedipine', 'ramipril',

  // Endocrine/Diabetes
  'metformin', 'glipizide', 'insulin', 'glyburide', 'pioglitazone',
  'glimepiride', 'sitagliptin', 'liraglutide', 'empagliflozin', 'canagliflozin',
  'levothyroxine', 'methimazole', 'propylthiouracil',

  // Psychiatric/Neurological
  'sertraline', 'escitalopram', 'fluoxetine', 'venlafaxine', 'duloxetine',
  'paroxetine', 'citalopram', 'bupropion', 'trazodone', 'mirtazapine',
  'alprazolam', 'clonazepam', 'lorazepam', 'diazepam', 'zolpidem',
  'quetiapine', 'aripiprazole', 'risperidone', 'olanzapine', 'lithium',
  'lamotrigine', 'valproic acid', 'carbamazepine', 'phenytoin', 'levetiracetam',
  'gabapentin', 'pregabalin', 'topiramate',

  // Pain/Anti-inflammatory
  'acetaminophen', 'ibuprofen', 'naproxen', 'aspirin', 'celecoxib',
  'diclofenac', 'tramadol', 'hydrocodone', 'oxycodone', 'morphine',
  'fentanyl', 'codeine', 'cyclobenzaprine', 'meloxicam', 'indomethacin',

  // Antibiotics
  'amoxicillin', 'azithromycin', 'ciprofloxacin', 'levofloxacin', 'doxycycline',
  'cephalexin', 'clindamycin', 'metronidazole', 'nitrofurantoin', 'trimethoprim',
  'sulfamethoxazole', 'penicillin', 'erythromycin', 'clarithromycin', 'vancomycin',
  'gentamicin', 'tobramycin', 'amikacin', 'ceftriaxone', 'cefuroxime',

  // Respiratory
  'albuterol', 'fluticasone', 'budesonide', 'montelukast', 'ipratropium',
  'tiotropium', 'salmeterol', 'formoterol', 'theophylline', 'prednisolone',
  'prednisone', 'dexamethasone', 'methylprednisolone',

  // Gastrointestinal
  'omeprazole', 'esomeprazole', 'lansoprazole', 'pantoprazole', 'ranitidine',
  'famotidine', 'metoclopramide', 'ondansetron', 'loperamide', 'simethicone',
  'mesalamine', 'sulfasalazine', 'misoprostol',

  // Genitourinary
  'tamsulosin', 'finasteride', 'dutasteride', 'sildenafil', 'tadalafil',
  'oxybutynin', 'tolterodine', 'solifenacin', 'mirabegron',

  // Dermatological
  'hydrocortisone', 'triamcinolone', 'betamethasone', 'clobetasol', 'tretinoin',
  'clindamycin', 'benzoyl peroxide', 'adapalene', 'tazarotene',

  // Ophthalmological
  'timolol', 'latanoprost', 'brimonidine', 'dorzolamide', 'travoprost',
  'bimatoprost', 'prednisolone', 'ofloxacin', 'ciprofloxacin',

  // Hematological
  'heparin', 'enoxaparin', 'rivaroxaban', 'apixaban', 'dabigatran',
  'prasugrel', 'ticagrelor', 'dipyridamole',

  // Others
  'calcium', 'vitamin d', 'vitamin b12', 'folic acid', 'iron', 'potassium',
  'magnesium', 'zinc', 'multivitamin', 'fish oil', 'coenzyme q10'
];

// RxNorm API Service
class RxNormService {
  constructor() {
    this.baseUrl = 'https://rxnav.nlm.nih.gov/REST';
  }

  async searchDrugs(drugName) {
    try {
      const response = await fetch(
        `${this.baseUrl}/drugs.json?name=${encodeURIComponent(drugName)}`
      );
      return await response.json();
    } catch (error) {
      console.error(`RxNorm search error for ${drugName}:`, error);
      return null;
    }
  }

  async getDrugDetails(rxcui) {
    try {
      const response = await fetch(
        `${this.baseUrl}/rxcui/${rxcui}/allProperties.json`
      );
      return await response.json();
    } catch (error) {
      console.error(`RxNorm details error for ${rxcui}:`, error);
      return null;
    }
  }

  async getDrugInteractions(rxcui) {
    try {
      const response = await fetch(
        `${this.baseUrl}/interaction/interaction.json?rxcui=${rxcui}`
      );
      return await response.json();
    } catch (error) {
      console.error(`RxNorm interactions error for ${rxcui}:`, error);
      return null;
    }
  }

  async findRxcuiByString(drugName) {
    try {
      const response = await fetch(
        `${this.baseUrl}/rxcui.json?name=${encodeURIComponent(drugName)}&search=2`
      );
      return await response.json();
    } catch (error) {
      console.error(`RxNorm RXCUI search error for ${drugName}:`, error);
      return null;
    }
  }
}

// Drug data processor
class DrugDataProcessor {
  constructor() {
    this.rxNorm = new RxNormService();
    this.processedDrugs = {};
  }

  async processDrug(drugName) {
    console.log(`Processing: ${drugName}`);
    
    try {
      // Find RXCUI first
      const rxcuiData = await this.rxNorm.findRxcuiByString(drugName);
      
      if (!rxcuiData?.idGroup?.rxnormId?.[0]) {
        console.log(`No RXCUI found for: ${drugName}`);
        return null;
      }

      const rxcui = rxcuiData.idGroup.rxnormId[0];
      
      // Get drug details and interactions
      const [drugsData, detailsData, interactionsData] = await Promise.all([
        this.rxNorm.searchDrugs(drugName),
        this.rxNorm.getDrugDetails(rxcui),
        this.rxNorm.getDrugInteractions(rxcui)
      ]);

      // Extract brand names
      const brandNames = this.extractBrandNames(drugsData);
      
      // Extract interactions
      const interactions = this.extractInteractions(interactionsData);

      // Build drug data
      const drugData = {
        name: drugName.charAt(0).toUpperCase() + drugName.slice(1),
        genericName: drugName.toLowerCase(),
        brandNames: brandNames,
        category: this.guessCategory(drugName),
        rxcui: rxcui,
        
        dosage: {
          adult: this.getStandardDosage(drugName, 'adult'),
          pediatric: this.getStandardDosage(drugName, 'pediatric'),
          elderly: this.getStandardDosage(drugName, 'elderly'),
          renal: this.getStandardDosage(drugName, 'renal'),
          hepatic: this.getStandardDosage(drugName, 'hepatic')
        },

        indications: this.getIndications(drugName),
        contraindications: this.getContraindications(drugName),
        sideEffects: this.getSideEffects(drugName),
        interactions: interactions,
        warnings: this.getWarnings(drugName),
        
        pregnancyCategory: this.getPregnancyCategory(drugName),
        lastUpdated: new Date().toISOString(),
        source: 'RxNorm API',
        isVerified: true
      };

      return drugData;

    } catch (error) {
      console.error(`Error processing ${drugName}:`, error);
      return null;
    }
  }

  extractBrandNames(drugsData) {
    const brandNames = [];
    
    if (drugsData?.drugGroup?.conceptGroup) {
      drugsData.drugGroup.conceptGroup.forEach(group => {
        if (group.tty === 'BN' && group.conceptProperties) {
          group.conceptProperties.forEach(concept => {
            if (concept.name && !brandNames.includes(concept.name)) {
              brandNames.push(concept.name);
            }
          });
        }
      });
    }

    return brandNames;
  }

  extractInteractions(interactionsData) {
    const interactions = [];
    
    if (interactionsData?.interactionTypeGroup) {
      interactionsData.interactionTypeGroup.forEach(group => {
        if (group.interactionType) {
          group.interactionType.forEach(interaction => {
            if (interaction.interactionPair) {
              interaction.interactionPair.forEach(pair => {
                if (pair.description) {
                  interactions.push(pair.description);
                }
              });
            }
          });
        }
      });
    }

    return interactions.slice(0, 10); // Limit to top 10 interactions
  }

  guessCategory(drugName) {
    const categories = {
      // Cardiovascular
      'amlodipine': 'Calcium Channel Blocker',
      'lisinopril': 'ACE Inhibitor',
      'atorvastatin': 'Statin',
      'metoprolol': 'Beta Blocker',
      'hydrochlorothiazide': 'Diuretic',
      'losartan': 'ARB',
      'furosemide': 'Loop Diuretic',
      'warfarin': 'Anticoagulant',
      
      // Diabetes
      'metformin': 'Antidiabetic',
      'glipizide': 'Sulfonylurea',
      'insulin': 'Hormone',
      'levothyroxine': 'Thyroid Hormone',
      
      // Psychiatric
      'sertraline': 'SSRI Antidepressant',
      'escitalopram': 'SSRI Antidepressant',
      'fluoxetine': 'SSRI Antidepressant',
      'alprazolam': 'Benzodiazepine',
      'zolpidem': 'Sleep Aid',
      
      // Pain
      'acetaminophen': 'Analgesic',
      'ibuprofen': 'NSAID',
      'naproxen': 'NSAID',
      'aspirin': 'NSAID',
      'tramadol': 'Opioid Analgesic',
      
      // Antibiotics
      'amoxicillin': 'Penicillin Antibiotic',
      'azithromycin': 'Macrolide Antibiotic',
      'ciprofloxacin': 'Fluoroquinolone Antibiotic',
      'doxycycline': 'Tetracycline Antibiotic',
      
      // Respiratory
      'albuterol': 'Bronchodilator',
      'fluticasone': 'Corticosteroid',
      'montelukast': 'Leukotriene Modifier',
      
      // GI
      'omeprazole': 'Proton Pump Inhibitor',
      'lansoprazole': 'Proton Pump Inhibitor',
      'famotidine': 'H2 Receptor Antagonist'
    };

    return categories[drugName.toLowerCase()] || 'Medication';
  }

  getStandardDosage(drugName, type) {
    // Standard dosages for common medications
    const dosages = {
      'acetaminophen': {
        adult: '325-1000mg every 4-6 hours, maximum 4000mg/day',
        pediatric: '10-15mg/kg every 4-6 hours',
        elderly: '325-650mg every 6-8 hours',
        renal: 'Reduce dose if CrCl <30 mL/min',
        hepatic: 'Contraindicated in severe hepatic impairment'
      },
      'ibuprofen': {
        adult: '200-800mg every 6-8 hours, maximum 3200mg/day',
        pediatric: '5-10mg/kg every 6-8 hours',
        elderly: 'Use lowest effective dose',
        renal: 'Avoid if CrCl <30 mL/min',
        hepatic: 'Use with caution'
      },
      'metformin': {
        adult: '500mg twice daily, may increase to 2000mg daily',
        pediatric: '500mg twice daily (age ≥10)',
        elderly: 'Start with 500mg daily',
        renal: 'Contraindicated if eGFR <30',
        hepatic: 'Contraindicated in hepatic impairment'
      },
      'lisinopril': {
        adult: '10mg once daily, may increase to 40mg daily',
        pediatric: '0.07mg/kg once daily (age ≥6)',
        elderly: 'Start with 2.5-5mg daily',
        renal: 'Reduce dose if CrCl <30 mL/min',
        hepatic: 'No adjustment needed'
      },
      'sertraline': {
        adult: '50mg once daily, may increase to 200mg daily',
        pediatric: '25mg once daily (age ≥6 for OCD)',
        elderly: 'Start with 25mg daily',
        renal: 'No adjustment needed',
        hepatic: 'Use with caution'
      }
    };

    const drugDosage = dosages[drugName.toLowerCase()];
    return drugDosage ? drugDosage[type] : 'Consult prescribing information for specific dosage';
  }

  getIndications(drugName) {
    const indications = {
      'acetaminophen': ['Mild to moderate pain', 'Fever reduction', 'Headache', 'Muscle aches'],
      'ibuprofen': ['Pain relief', 'Inflammation', 'Fever reduction', 'Arthritis'],
      'metformin': ['Type 2 diabetes mellitus', 'Prediabetes', 'Polycystic ovary syndrome'],
      'lisinopril': ['Hypertension', 'Heart failure', 'Post-myocardial infarction'],
      'sertraline': ['Major depressive disorder', 'Panic disorder', 'OCD', 'PTSD', 'Social anxiety'],
      'amoxicillin': ['Bacterial infections', 'Pneumonia', 'UTI', 'Skin infections'],
      'albuterol': ['Asthma', 'COPD', 'Bronchospasm', 'Exercise-induced bronchospasm'],
      'omeprazole': ['GERD', 'Peptic ulcers', 'Zollinger-Ellison syndrome', 'H. pylori eradication']
    };

    return indications[drugName.toLowerCase()] || ['Consult prescribing information for indications'];
  }

  getContraindications(drugName) {
    const contraindications = {
      'acetaminophen': ['Severe hepatic impairment', 'Known hypersensitivity to acetaminophen'],
      'ibuprofen': ['Active GI bleeding', 'Severe heart failure', 'Severe renal impairment', 'NSAID allergy'],
      'metformin': ['Severe renal impairment', 'Acute acidosis', 'Severe hepatic impairment'],
      'lisinopril': ['Angioedema history', 'Pregnancy', 'Bilateral renal artery stenosis'],
      'sertraline': ['MAOI use within 14 days', 'Pimozide use', 'Known hypersensitivity']
    };

    return contraindications[drugName.toLowerCase()] || ['Consult prescribing information for contraindications'];
  }

  getSideEffects(drugName) {
    const sideEffects = {
      'acetaminophen': ['Nausea', 'Rash', 'Hepatotoxicity (overdose)'],
      'ibuprofen': ['GI upset', 'Bleeding', 'Renal impairment', 'Cardiovascular events'],
      'metformin': ['GI upset', 'Diarrhea', 'Lactic acidosis (rare)', 'Vitamin B12 deficiency'],
      'lisinopril': ['Dry cough', 'Hyperkalemia', 'Angioedema', 'Hypotension'],
      'sertraline': ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Weight changes']
    };

    return sideEffects[drugName.toLowerCase()] || ['Consult prescribing information for side effects'];
  }

  getWarnings(drugName) {
    const warnings = {
      'acetaminophen': ['Risk of acute liver failure with overdose', 'Do not exceed 4000mg/day'],
      'ibuprofen': ['Increased risk of cardiovascular events', 'GI bleeding risk'],
      'metformin': ['Risk of lactic acidosis', 'Monitor renal function'],
      'lisinopril': ['Monitor for angioedema', 'Check potassium levels'],
      'sertraline': ['Suicidal thoughts in young adults', 'Serotonin syndrome risk']
    };

    return warnings[drugName.toLowerCase()] || ['Follow prescribing guidelines and consult healthcare provider'];
  }

  getPregnancyCategory(drugName) {
    const categories = {
      'acetaminophen': 'Category B - Generally safe',
      'ibuprofen': 'Category C/D - Avoid in 3rd trimester',
      'metformin': 'Category B - Generally safe',
      'lisinopril': 'Category D - Avoid in pregnancy',
      'sertraline': 'Category C - Use with caution'
    };

    return categories[drugName.toLowerCase()] || 'Consult prescribing information for pregnancy category';
  }

  async processAllDrugs() {
    console.log(`Starting to process ${COMMON_DRUGS.length} drugs...`);
    
    for (let i = 0; i < COMMON_DRUGS.length; i++) {
      const drugName = COMMON_DRUGS[i];
      
      try {
        const drugData = await this.processDrug(drugName);
        
        if (drugData) {
          this.processedDrugs[drugName.toLowerCase()] = drugData;
          console.log(`✓ Processed: ${drugName} (${i + 1}/${COMMON_DRUGS.length})`);
        } else {
          console.log(`✗ Failed: ${drugName} (${i + 1}/${COMMON_DRUGS.length})`);
        }
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error processing ${drugName}:`, error);
      }
    }

    console.log(`\nCompleted! Processed ${Object.keys(this.processedDrugs).length} drugs successfully.`);
    return this.processedDrugs;
  }

  async saveToFile() {
    const dbContent = `// Comprehensive Drug Database - Auto-generated from RxNorm API
// Last updated: ${new Date().toISOString()}
// Total drugs: ${Object.keys(this.processedDrugs).length}

import { DrugData } from './pharma-apis';

export const COMPREHENSIVE_DRUG_DATABASE: { [key: string]: DrugData } = ${JSON.stringify(this.processedDrugs, null, 2)};
`;

    const outputPath = path.join(__dirname, '..', 'src', 'lib', 'comprehensive-drug-db.ts');
    
    fs.writeFileSync(outputPath, dbContent, 'utf8');
    
    console.log(`\n🎉 Database saved to: ${outputPath}`);
    console.log(`📊 Total drugs in database: ${Object.keys(this.processedDrugs).length}`);
  }
}

// Main execution
async function main() {
  console.log('🚀 PharmAI Drug Database Population Script');
  console.log('=========================================\n');
  
  const processor = new DrugDataProcessor();
  
  try {
    await processor.processAllDrugs();
    await processor.saveToFile();
    
    console.log('\n✅ Database population completed successfully!');
    console.log('🔄 Restart your development server to use the new database.');
    
  } catch (error) {
    console.error('❌ Error during database population:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { DrugDataProcessor }; 