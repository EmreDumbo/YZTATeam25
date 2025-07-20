import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { COMPREHENSIVE_DRUG_DATABASE } from "../../../../lib/comprehensive-drug-db";
import { DrugData } from "../../../../lib/pharma-apis";

// Define proper TypeScript interface for messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Securely get the API key from environment variables.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Enhanced comprehensive pharmacy response system
const getComprehensiveDrugResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase();
  
  // Extract potential drug names using common patterns
  const drugKeywords = Object.keys(COMPREHENSIVE_DRUG_DATABASE);
  const mentionedDrugs = drugKeywords.filter(drug => 
    message.includes(drug.toLowerCase()) || 
    COMPREHENSIVE_DRUG_DATABASE[drug as keyof typeof COMPREHENSIVE_DRUG_DATABASE].brandNames?.some((brand: string) => 
      message.includes(brand.toLowerCase())
    )
  );

  // If specific drug mentioned, get comprehensive info
  if (mentionedDrugs.length > 0) {
    const drugName = mentionedDrugs[0];
    const drugData = COMPREHENSIVE_DRUG_DATABASE[drugName as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    
    if (drugData) {
      return formatDrugResponse(drugData as DrugData);
    }
  }

  // Handle drug interaction queries
  if (message.includes('interaction') || message.includes('together') || message.includes('combine')) {
    return handleInteractionQuery(message);
  }

  // Handle dosage queries
  if (message.includes('dosage') || message.includes('dose') || message.includes('how much')) {
    return handleDosageQuery(message);
  }

  // Handle side effects queries
  if (message.includes('side effect') || message.includes('adverse') || message.includes('reaction')) {
    return handleSideEffectQuery(message);
  }

  // General pharmaceutical search for unknown drugs
  const potentialDrugName = extractDrugNameFromQuery(message);
  if (potentialDrugName) {
    const drugData = COMPREHENSIVE_DRUG_DATABASE[potentialDrugName as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    if (drugData) {
      return formatDrugResponse(drugData as DrugData);
    }
  }

  return getGeneralPharmacyGuidance();
};

// Format comprehensive drug response
const formatDrugResponse = (drugData: DrugData): string => {
  const brandNamesStr = drugData.brandNames?.length > 0 ? 
    ` (Brand names: ${drugData.brandNames.slice(0, 5).join(', ')})` : '';

  return `💊 **${drugData.name}**${brandNamesStr}
      
**Generic Name**: ${drugData.genericName || drugData.name}
**Category**: ${drugData.category}

**💊 DOSAGE INFORMATION**:
• **Adults**: ${drugData.dosage?.adult || 'Consult prescribing information'}
• **Pediatric**: ${drugData.dosage?.pediatric || 'Weight-based dosing required'}
• **Elderly**: ${drugData.dosage?.elderly || 'Consider dose reduction'}
• **Renal Impairment**: ${drugData.dosage?.renal || 'Adjustment may be needed'}
• **Hepatic Impairment**: ${drugData.dosage?.hepatic || 'Use with caution'}

**🎯 INDICATIONS**:
${drugData.indications?.map((indication: string) => `• ${indication}`).join('\n') || '• See prescribing information'}

**⚠️ SIDE EFFECTS**:
${drugData.sideEffects?.map((effect: string) => `• ${effect}`).join('\n') || '• Common: GI upset, drowsiness\n• Monitor for unusual symptoms'}

**🚫 CONTRAINDICATIONS**:
${drugData.contraindications?.map((contra: string) => `• ${contra}`).join('\n') || '• Known hypersensitivity\n• See full prescribing information'}

**⚡ DRUG INTERACTIONS**:
${drugData.interactions?.slice(0, 5).map((interaction: string) => `• ${interaction}`).join('\n') || '• Monitor for interactions\n• Check with pharmacist'}

**🚨 IMPORTANT WARNINGS**:
${drugData.warnings?.map((warning: string) => `• ${warning}`).join('\n') || '• Follow prescribing guidelines\n• Monitor for adverse effects'}

${drugData.pregnancyCategory ? `**🤰 Pregnancy Category**: ${drugData.pregnancyCategory}` : ''}

*This information is for educational purposes. Always consult healthcare professionals for medical decisions.*`;
};

// Handle drug interaction queries
const handleInteractionQuery = (query: string): string => {
  // Extract drug names from query
  const drugNames = extractMultipleDrugNames(query);
  
  if (drugNames.length >= 2) {
    const drug1Data = COMPREHENSIVE_DRUG_DATABASE[drugNames[0] as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    const drug2Data = COMPREHENSIVE_DRUG_DATABASE[drugNames[1] as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    
    if (drug1Data && drug2Data) {
      // Check if either drug lists the other as an interaction
      const interactions = [
        ...(drug1Data.interactions || []),
        ...(drug2Data.interactions || [])
      ].filter((interaction: string) => 
        drugNames.some(drug => interaction.toLowerCase().includes(drug.toLowerCase()))
      );
      
      if (interactions.length > 0) {
        return `🚨 **DRUG INTERACTION ANALYSIS**

**Drugs Analyzed**: ${drugNames.join(' + ')}

**⚠️ IDENTIFIED INTERACTIONS**:
${interactions.map((interaction: string, i: number) => `${i + 1}. ${interaction}`).join('\n')}

**🚨 RECOMMENDATIONS**:
• Consult your healthcare provider immediately
• Do not start/stop medications without supervision
• Monitor for symptoms of interactions
• Keep complete medication list updated
• Consider alternative treatments if available

**🆘 EMERGENCY SIGNS**:
• Unusual bleeding or bruising
• Severe allergic reactions
• Difficulty breathing
• Chest pain or heart palpitations

*CRITICAL: This analysis is based on known interactions. Always consult healthcare professionals.*`;
      }
    }
  }

  return `🔍 **Drug Interaction Checker**

To check for interactions, please specify the medications you're asking about.

**Available in our database**: ${Object.keys(COMPREHENSIVE_DRUG_DATABASE).slice(0, 10).join(', ')}... and 90+ more

**Example queries**:
• "Interaction between warfarin and aspirin"
• "Can I take ibuprofen with blood pressure medication?"
• "Metformin and alcohol interaction"

**⚠️ Always consult your pharmacist or doctor before combining medications.**`;
};

// Handle dosage queries
const handleDosageQuery = (query: string): string => {
  const drugName = extractDrugNameFromQuery(query);
  
  if (drugName) {
    const drugData = COMPREHENSIVE_DRUG_DATABASE[drugName as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    
    if (drugData?.dosage) {
      return `📊 **${drugData.name} - Dosage Guidelines**

**👨‍⚕️ ADULT DOSING**:
${drugData.dosage.adult}

**👶 PEDIATRIC DOSING**:
${drugData.dosage.pediatric || 'Requires weight-based calculation - consult pediatrician'}

**👴 ELDERLY CONSIDERATIONS**:
${drugData.dosage.elderly || 'May require dose reduction - consult physician'}

**🫘 RENAL IMPAIRMENT**:
${drugData.dosage.renal || 'Dose adjustment may be required'}

**🫀 HEPATIC IMPAIRMENT**:
${drugData.dosage.hepatic || 'Use with caution - monitor closely'}

**⚠️ CRITICAL REMINDERS**:
• Never exceed maximum daily dose
• Space doses evenly throughout day
• Take with food if stomach upset occurs
• Do not double dose if you miss one
• Consult healthcare provider for personalized dosing

*Individual dosing may vary based on medical conditions and other medications.*`;
    }
  }

  return `📊 **Dosage Information Service**

**Available medications in our database**: ${Object.keys(COMPREHENSIVE_DRUG_DATABASE).length}+ drugs

Please specify which medication you need dosage information for.

**Popular medications**: Acetaminophen, Ibuprofen, Metformin, Lisinopril, Atorvastatin, Sertraline...

**For any medication, we provide**:
• Adult dosing guidelines
• Pediatric weight-based dosing
• Special population considerations
• Maximum daily limits
• Timing recommendations`;
};

// Handle side effect queries
const handleSideEffectQuery = (query: string): string => {
  const drugName = extractDrugNameFromQuery(query);
  
  if (drugName) {
    const drugData = COMPREHENSIVE_DRUG_DATABASE[drugName as keyof typeof COMPREHENSIVE_DRUG_DATABASE];
    
    if (drugData?.sideEffects) {
      return `⚠️ **${drugData.name} - Side Effect Profile**

**🔴 COMMON SIDE EFFECTS**:
${drugData.sideEffects.map((effect: string) => `• ${effect}`).join('\n')}

**🚨 SERIOUS SIDE EFFECTS - SEEK IMMEDIATE CARE**:
• Severe allergic reactions (rash, swelling, difficulty breathing)
• Signs of liver problems (yellowing of skin/eyes, dark urine)
• Severe stomach pain or bleeding
• Irregular heartbeat or chest pain

**📞 WHEN TO CONTACT HEALTHCARE PROVIDER**:
• Side effects persist or worsen
• New unusual symptoms develop
• Difficulty with daily activities
• Concerns about medication effects

**💡 SIDE EFFECT MANAGEMENT**:
• Take with food if stomach upset
• Stay hydrated
• Monitor symptoms closely
• Keep symptom diary
• Report patterns to healthcare provider

*Most side effects are mild and temporary. Serious reactions are rare but require immediate attention.*`;
    }
  }

  return `⚠️ **Side Effect Information Center**

**Common Drug Categories & Their Side Effects**:

**💊 Pain Relievers (NSAIDs)**:
• Stomach upset, bleeding risk, kidney effects

**🧠 Antibiotics**:
• Digestive upset, yeast infections, allergic reactions

**❤️ Blood Pressure Medications**:
• Dizziness, fatigue, electrolyte changes

**🔥 Allergy Medications**:
• Drowsiness, dry mouth, blurred vision

**When to Seek Help**: Severe reactions, persistent symptoms, or anything unusual.`;
};

// Extract drug name from natural language query
const extractDrugNameFromQuery = (query: string): string | null => {
  const words = query.toLowerCase().split(' ');
  
  // Check against known drug names
  for (const word of words) {
    if (COMPREHENSIVE_DRUG_DATABASE[word as keyof typeof COMPREHENSIVE_DRUG_DATABASE]) {
      return word;
    }
    
    // Check brand names
    for (const [genericName, drugData] of Object.entries(COMPREHENSIVE_DRUG_DATABASE)) {
      const typedDrugData = drugData as DrugData;
      if (typedDrugData.brandNames?.some((brand: string) => brand.toLowerCase().includes(word))) {
        return genericName;
      }
    }
  }
  
  return null;
};

// Extract multiple drug names for interaction checking
const extractMultipleDrugNames = (query: string): string[] => {
  const foundDrugs: string[] = [];
  const words = query.toLowerCase().split(' ');
  
  for (const word of words) {
    if (COMPREHENSIVE_DRUG_DATABASE[word as keyof typeof COMPREHENSIVE_DRUG_DATABASE]) {
      foundDrugs.push(word);
    }
  }
  
  return foundDrugs;
};

// General pharmacy guidance
const getGeneralPharmacyGuidance = (): string => {
  return `💊 **PharmAI - Comprehensive Pharmacy Assistant**

**🗄️ Our Extensive Database Includes**:
• **${Object.keys(COMPREHENSIVE_DRUG_DATABASE).length}** FDA-approved medications
• **Real-time** drug interaction checking
• **Clinical dosing** guidelines for all age groups
• **Side effect** profiles and management
• **Contraindications** and safety warnings

**🔍 What You Can Ask**:
• "What is the dosage for [any medication]?"
• "Interactions between [drug A] and [drug B]"
• "Side effects of [medication name]"
• "Is [drug] safe during pregnancy?"
• "How to take [medication] properly?"

**🚀 Available Drug Categories**:
• 💊 **Pain Relief**: Acetaminophen, Ibuprofen, Tramadol, Morphine
• ❤️ **Cardiovascular**: Amlodipine, Lisinopril, Metoprolol, Atorvastatin
• 🧠 **Mental Health**: Sertraline, Fluoxetine, Alprazolam, Quetiapine
• 🦠 **Antibiotics**: Amoxicillin, Azithromycin, Ciprofloxacin
• 🫁 **Respiratory**: Albuterol, Fluticasone, Montelukast
• And many more categories!

**Example Searches**:
• "Metformin dosage for diabetes"
• "Can I take blood thinners with aspirin?"
• "Amoxicillin side effects in children"

*Professional pharmaceutical information at your fingertips. Always consult healthcare providers for medical decisions.*`;
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    const userMessage = messages.filter((m: Message) => m.role === "user").pop()?.content || "";

    if (!userMessage) {
      return NextResponse.json({ error: "User message is empty" }, { status: 400 });
    }

    // Get comprehensive response using our database
    const comprehensiveResponse = await getComprehensiveDrugResponse(userMessage);
    
    // Check if we found specific drug information
    const hasSpecificDrugInfo = comprehensiveResponse.includes('**Generic Name**') || 
                               comprehensiveResponse.includes('DRUG INTERACTION ANALYSIS') ||
                               comprehensiveResponse.includes('Dosage Guidelines');
    
    if (hasSpecificDrugInfo) {
      return NextResponse.json({ reply: comprehensiveResponse });
    }

    // For complex pharmaceutical queries, enhance with Gemini AI
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are PharmAI, a professional pharmacy assistant with access to comprehensive drug databases.
        
        Our database includes ${Object.keys(COMPREHENSIVE_DRUG_DATABASE).length}+ medications including:
        - Pain relievers (Acetaminophen, Ibuprofen, Tramadol)
        - Cardiovascular drugs (Amlodipine, Lisinopril, Metoprolol)
        - Mental health medications (Sertraline, Fluoxetine, Alprazolam)
        - Antibiotics (Amoxicillin, Azithromycin, Ciprofloxacin)
        - And many more categories
        
        User question: "${userMessage}"
        
        Provide accurate, evidence-based pharmaceutical information. Include:
        - Specific dosing recommendations
        - Clinical safety warnings
        - Drug interaction alerts
        - Professional references when possible
        
        Always emphasize consulting healthcare professionals for medical decisions.
        Be comprehensive but prioritize patient safety above all.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ reply: text });

    } catch (geminiError) {
      console.log("Gemini API failed, using comprehensive local response:", geminiError);
      return NextResponse.json({ reply: comprehensiveResponse });
    }

  } catch (error) {
    console.error("Comprehensive API Error:", error);
    const reply = "I'm experiencing technical difficulties accessing the pharmaceutical databases. Please try again or consult your pharmacist directly.";
    return NextResponse.json({ reply }, { status: 500 });
  }
}