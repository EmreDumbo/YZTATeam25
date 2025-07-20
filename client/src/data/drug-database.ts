// Comprehensive Turkish Drug Database
export interface DrugInfo {
  ticariAd: string;
  etkenMadde: string;
  kullanim: string;
  dozaj?: string;
  yanetkileri?: string[];
  etkileşimler?: string[];
  kategori: string;
  uyarilar?: string[];
}

export const DRUG_DATABASE: DrugInfo[] = [
  {
    ticariAd: "Arveles",
    etkenMadde: "Dexketoprofen",
    kullanim: "Ağrı kesici",
    dozaj: "25mg günde 2-3 kez, yemeklerden önce",
    yanetkileri: ["Mide bulantısı", "Baş ağrısı", "Mide yanması"],
    etkileşimler: ["Warfarin", "ACE inhibitörleri"],
    kategori: "NSAİİ",
    uyarilar: ["Böbrek hastalarında dikkatli kullanın", "Mide ülseri varsa kullanmayın"]
  },
  {
    ticariAd: "Parol",
    etkenMadde: "Parasetamol",
    kullanim: "Ateş düşürücü ve ağrı kesici",
    dozaj: "500-1000mg, günde 4 kez, en az 4 saat arayla",
    yanetkileri: ["Nadiren karaciğer hasarı", "Alerjik reaksiyonlar"],
    etkileşimler: ["Warfarin", "Alkol"],
    kategori: "Analjezik",
    uyarilar: ["Günlük 4g'ı aşmayın", "Karaciğer hastalarında dikkatli kullanın"]
  },
  {
    ticariAd: "Augmentin",
    etkenMadde: "Amoksisilin + Klavulanik Asit",
    kullanim: "Antibiyotik",
    dozaj: "625mg günde 2-3 kez, yemekle birlikte",
    yanetkileri: ["İshal", "Bulantı", "Vajinal mantar enfeksiyonu"],
    etkileşimler: ["Methotrexate", "Probenesid"],
    kategori: "Beta-laktam Antibiyotik",
    uyarilar: ["Kür süresini tamamlayın", "Alerjiniz varsa kullanmayın"]
  },
  {
    ticariAd: "Ventolin",
    etkenMadde: "Salbutamol",
    kullanim: "Astım, bronşit",
    dozaj: "İnhaler: gerektiğinde 1-2 puff",
    yanetkileri: ["Kalp çarpıntısı", "Titreme", "Baş ağrısı"],
    etkileşimler: ["Beta-blokörler", "Digoksin"],
    kategori: "Bronkodilatör",
    uyarilar: ["Günde 8 puff'ı aşmayın", "Kalp hastalığında dikkatli kullanın"]
  },
  {
    ticariAd: "Nurofen",
    etkenMadde: "İbuprofen",
    kullanim: "Ağrı ve ateş",
    dozaj: "400mg günde 3 kez, yemekten sonra",
    yanetkileri: ["Mide ağrısı", "Böbrek fonksiyon bozukluğu"],
    etkileşimler: ["Warfarin", "ACE inhibitörleri", "Methotrexate"],
    kategori: "NSAİİ",
    uyarilar: ["Mide ülseri varsa kullanmayın", "Hamilelikte son trimesterde kullanmayın"]
  }
];

// Drug interaction checker
export const DRUG_INTERACTIONS = {
  "Parasetamol": {
    "Warfarin": "Kanama riskini artırabilir, INR takibi gerekir",
    "Alkol": "Karaciğer hasarı riskini artırır"
  },
  "İbuprofen": {
    "Warfarin": "Ciddi kanama riski, birlikte kullanımdan kaçının",
    "ACE inhibitörleri": "Böbrek fonksiyonunu bozabilir",
    "Methotrexate": "Methotrexate toksisitesini artırır"
  },
  "Dexketoprofen": {
    "Warfarin": "Kanama riskini artırır",
    "Diüretikler": "Böbrek fonksiyonunu etkileyebilir"
  }
};

// Common side effects database
export const SIDE_EFFECTS_DB = {
  "NSAİİ": ["Mide ağrısı", "Böbrek problemi", "Kardiyovasküler risk"],
  "Analjezik": ["Karaciğer hasarı (yüksek doz)", "Alerjik reaksiyon"],
  "Antibiyotik": ["İshal", "Mantar enfeksiyonu", "Antibiyotik direnci"],
  "Bronkodilatör": ["Kalp çarpıntısı", "Titreme", "Uyku bozukluğu"]
};

// Dosage calculator
export interface DosageInfo {
  minDose: number;
  maxDose: number;
  frequency: string;
  unit: string;
  weightBased?: boolean;
  pediatricDose?: string;
}

export const DOSAGE_DATABASE: Record<string, DosageInfo> = {
  "Parasetamol": {
    minDose: 500,
    maxDose: 1000,
    frequency: "Her 4-6 saatte bir",
    unit: "mg",
    weightBased: true,
    pediatricDose: "10-15mg/kg"
  },
  "İbuprofen": {
    minDose: 200,
    maxDose: 400,
    frequency: "Günde 3-4 kez",
    unit: "mg",
    weightBased: true,
    pediatricDose: "5-10mg/kg"
  }
}; 