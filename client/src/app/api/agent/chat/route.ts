import { NextResponse } from "next/server";
import { COMPREHENSIVE_DRUG_DATABASE } from "../../../../lib/comprehensive-drug-db";
import { DrugData } from "../../../../lib/pharma-apis";

// Define proper TypeScript interface for messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Drug classes and their examples
const DRUG_CLASSES = {
  'benzodiazepine': ['alprazolam', 'lorazepam', 'clonazepam', 'diazepam'],
  'nsaid': ['ibuprofen', 'naproxen', 'aspirin', 'celecoxib', 'diclofenac'],
  'ssri': ['sertraline', 'escitalopram', 'fluoxetine', 'paroxetine'],
  'beta blocker': ['metoprolol', 'propranolol', 'atenolol', 'carvedilol'],
  'ace inhibitor': ['lisinopril', 'enalapril', 'ramipril'],
  'statin': ['atorvastatin', 'simvastatin', 'rosuvastatin'],
  'antibiotic': ['amoxicillin', 'azithromycin', 'ciprofloxacin', 'doxycycline'],
  'opioid': ['tramadol', 'hydrocodone', 'oxycodone', 'morphine'],
  'antidepressant': ['sertraline', 'escitalopram', 'fluoxetine', 'venlafaxine', 'duloxetine'],
  'calcium channel blocker': ['amlodipine', 'nifedipine', 'diltiazem', 'verapamil'],
  'diuretic': ['hydrochlorothiazide', 'furosemide', 'spironolactone'],
  'proton pump inhibitor': ['omeprazole', 'lansoprazole', 'esomeprazole', 'pantoprazole']
};

// Drug interaction knowledge base
const DRUG_INTERACTIONS = {
  'ibuprofen+aspirin': {
    severity: 'moderate',
    description: "Taking ibuprofen and aspirin together can increase your risk of stomach irritation and bleeding. Both are NSAIDs that work similarly, so you're not getting much extra benefit but you are getting extra risk. I usually recommend picking one or the other - aspirin if you need heart protection, ibuprofen if you need stronger anti-inflammatory effects.",
    recommendation: "Generally avoid taking together. If you need both effects, talk to your doctor about safer alternatives."
  },
  'tramadol+sertraline': {
    severity: 'serious',
    description: "This combination can increase your risk of serotonin syndrome, which can be dangerous. Both medications affect serotonin levels in your brain. Watch for symptoms like agitation, confusion, rapid heart rate, or muscle stiffness.",
    recommendation: "Use with caution and close monitoring. Contact your doctor if you experience any unusual symptoms."
  },
  'aspirin+warfarin': {
    severity: 'major',
    description: "This combination significantly increases bleeding risk. Both medications affect blood clotting, so together they can make you bleed too easily. Even small cuts can bleed more than normal.",
    recommendation: "Requires very close monitoring by your doctor. Regular blood tests are essential."
  },
  'acetaminophen+alcohol': {
    severity: 'serious',
    description: "Alcohol and acetaminophen can both stress your liver. Taking them together, especially regularly, can increase your risk of liver damage. Even moderate drinking can be a concern with regular acetaminophen use.",
    recommendation: "Avoid alcohol when taking acetaminophen, especially if using it regularly."
  },
  'aspirin+ibuprofen': {
    severity: 'moderate',
    description: "Taking aspirin and ibuprofen together can increase your risk of stomach irritation and bleeding. Both are NSAIDs that work similarly, so you're not getting much extra benefit but you are getting extra risk. I usually recommend picking one or the other - aspirin if you need heart protection, ibuprofen if you need stronger anti-inflammatory effects.",
    recommendation: "Generally avoid taking together. If you need both effects, talk to your doctor about safer alternatives."
  }
};

// Get all drugs from our database
const getAllDrugs = () => {
  return COMPREHENSIVE_DRUG_DATABASE;
};

// Enhanced drug extraction that handles classes and interactions
const extractDrugNames = (query: string): string[] => {
  const allDrugs = Object.keys(COMPREHENSIVE_DRUG_DATABASE);
  const foundDrugs: string[] = [];
  const queryLower = query.toLowerCase();
  
  // Check for exact drug name matches
  allDrugs.forEach(drugName => {
    if (queryLower.includes(drugName.toLowerCase())) {
      foundDrugs.push(drugName);
    }
  });
  
  // Check for brand name matches
  Object.entries(COMPREHENSIVE_DRUG_DATABASE).forEach(([genericName, drugData]) => {
    const typedDrug = drugData as DrugData;
    if (typedDrug.brandNames && typedDrug.brandNames.length > 0) {
      typedDrug.brandNames.forEach(brandName => {
        if (queryLower.includes(brandName.toLowerCase()) && !foundDrugs.includes(genericName)) {
          foundDrugs.push(genericName);
        }
      });
    }
  });
  
  // Check for drug class mentions
  Object.entries(DRUG_CLASSES).forEach(([className, drugs]) => {
    if (queryLower.includes(className)) {
      drugs.forEach(drug => {
        if (allDrugs.includes(drug) && !foundDrugs.includes(drug)) {
          foundDrugs.push(drug);
        }
      });
    }
  });
  
  return foundDrugs;
};

// Create conversational response about specific drugs
const createDrugResponse = (drugNames: string[], userQuery: string): string => {
  const allDrugs = getAllDrugs();
  const queryLower = userQuery.toLowerCase();
  
  // Check if asking about drug interactions
  if (drugNames.length > 1 && (queryLower.includes('with') || queryLower.includes('together') || queryLower.includes('interaction'))) {
    return createInteractionResponse(drugNames, userQuery);
  }
  
  // Single drug information
  if (drugNames.length === 1) {
    const drugName = drugNames[0];
    const drug = allDrugs[drugName] as DrugData;
    
    if (!drug) {
      return createGeneralResponse(userQuery);
    }
    
    const brandNames = drug.brandNames && drug.brandNames.length > 0 
      ? ` (you might know it as ${drug.brandNames.slice(0, 3).join(', ')})`
      : '';
    
    // Determine what specific aspect they're asking about
    if (queryLower.includes('side effect') || queryLower.includes('adverse')) {
      return `Great question about ${drug.name}${brandNames}! 

The most common side effects I see people experience are: ${drug.sideEffects?.slice(0, 4).join(', ') || 'generally well-tolerated'}. 

Most people tolerate ${drug.name} pretty well, but everyone's different. If you notice anything unusual after starting it, definitely give me or your doctor a call. The key is to watch for any changes in how you feel and not to ignore them.

Is there something specific you're experiencing, or are you just wanting to know what to watch for? 😊`;
    }
    
    if (queryLower.includes('dosage') || queryLower.includes('dose') || queryLower.includes('how much')) {
      return `For ${drug.name}${brandNames}, the typical adult dosing is: ${drug.dosage?.adult || 'varies based on condition'}.

But here's the thing - dosing really depends on what you're treating, your weight, other medications you're taking, and your individual response. That's why I always tell people to stick with what their doctor prescribed specifically for them.

Are you wondering about a specific situation with your dosing? I'm happy to help you understand the basics! 😊`;
    }
    
    if (queryLower.includes('use') || queryLower.includes('for') || queryLower.includes('treat')) {
      return `${drug.name}${brandNames} is commonly used for: ${drug.indications?.slice(0, 4).join(', ') || 'various conditions'}.

It's in the ${drug.category} class of medications, so it works by ${getClassMechanism(drug.category)}. 

What I love about this medication is that it's been around for a while and we have lots of good data on how well it works. Are you taking it for one of these conditions, or did you have questions about how it might help with something specific? 😊`;
    }
    
    // General information about the drug
    return `Oh, ${drug.name}${brandNames}! That's one I help people with pretty regularly.

It's a ${drug.category} that's mainly used for ${drug.indications?.slice(0, 2).join(' and ') || 'various conditions'}. Most people do really well with it - typical adult dosing is ${drug.dosage?.adult || 'as prescribed by your doctor'}.

The main things I tell people to watch for are ${drug.sideEffects?.slice(0, 3).join(', ') || 'any unusual symptoms'}, and it's important to avoid it if you have ${drug.contraindications?.[0] || 'certain medical conditions'}.

What specific questions do you have about ${drug.name}? I'm here to help! 😊`;
  }
  
  // Multiple drugs mentioned
  return createGeneralResponse(userQuery);
};

// Create interaction response
const createInteractionResponse = (drugNames: string[], userQuery: string): string => {
  if (drugNames.length < 2) {
    return "I'd be happy to check drug interactions for you! Just tell me which specific medications you're wondering about taking together. 😊";
  }
  
  // Sort drug names for consistent interaction key lookup
  const sortedDrugs = drugNames.sort();
  const interactionKey = sortedDrugs.join('+');
  
  // Also check for reverse order
  const reverseKey = sortedDrugs.reverse().join('+');
  
  // Check our known interactions database
  const interaction = DRUG_INTERACTIONS[interactionKey] || DRUG_INTERACTIONS[reverseKey];
  
  if (interaction) {
    const severityText = interaction.severity === 'major' ? '🚨 Major concern' : 
                        interaction.severity === 'serious' ? '⚠️ Serious interaction' : 
                        '⚠️ Moderate interaction';
    
    return `Great question about taking ${drugNames.join(' and ')} together!

${severityText}: ${interaction.description}

My recommendation: ${interaction.recommendation}

Drug interactions are really important to get right, so I'm glad you're asking! If you're currently taking both of these, definitely check with your doctor or pharmacist to make sure it's the right approach for your situation.

Do you have any other questions about these medications? 😊`;
  }
  
  // General interaction guidance for unknown combinations
  const drugInfo = drugNames.map(name => {
    const drug = getAllDrugs()[name] as DrugData;
    return drug ? `${drug.name} (${drug.category})` : name;
  }).join(' and ');
  
  return `You're asking about taking ${drugInfo} together - that's exactly the kind of question I love helping with!

I don't have specific interaction data for this exact combination in my immediate knowledge, but here's what I can tell you: it's always smart to check when combining medications, especially if they're in similar drug classes or affect the same body systems.

I'd recommend checking with your pharmacist or doctor about this specific combination, especially if you're taking them regularly. They can look at your complete medication list and health conditions to give you the most accurate advice.

Are these medications you're currently taking, or are you planning to start them? 😊`;
};

// Get mechanism of action for drug classes
const getClassMechanism = (category: string): string => {
  const mechanisms = {
    'SSRI Antidepressant': 'increasing serotonin levels in your brain',
    'NSAID': 'reducing inflammation and blocking pain signals',
    'Beta Blocker': 'slowing your heart rate and reducing blood pressure',
    'ACE Inhibitor': 'relaxing blood vessels and lowering blood pressure',
    'Calcium Channel Blocker': 'relaxing blood vessels by blocking calcium',
    'Antibiotic': 'fighting bacterial infections',
    'Analgesic': 'blocking pain signals',
    'Diuretic': 'helping your kidneys remove excess fluid',
    'Proton Pump Inhibitor': 'reducing stomach acid production',
    'Statin': 'lowering cholesterol production in your liver'
  };
  
  return mechanisms[category] || 'its specific mechanism of action';
};

// Create response for drug classes
const createClassResponse = (className: string): string => {
  const drugs = DRUG_CLASSES[className];
  if (!drugs) {
    return createGeneralResponse(`Tell me about ${className}`);
  }
  
  const availableDrugs = drugs.filter(drug => getAllDrugs()[drug]);
  
  const classInfo = {
    'benzodiazepine': {
      description: 'work by enhancing GABA activity in your brain to reduce anxiety and promote relaxation',
      uses: 'anxiety, panic attacks, seizures, and sometimes sleep issues',
      notes: "They're effective but can be habit-forming, so they're usually prescribed for short-term use or specific situations."
    },
    'nsaid': {
      description: 'reduce inflammation, pain, and fever by blocking certain enzymes (COX-1 and COX-2)',
      uses: 'pain relief, reducing inflammation, and fever reduction',
      notes: "The main thing to watch with NSAIDs is stomach irritation and, with long-term use, effects on kidneys and heart."
    },
    'ssri': {
      description: 'work by increasing serotonin levels in your brain, which helps improve mood',
      uses: 'depression, anxiety disorders, panic disorder, and sometimes other conditions',
      notes: "They usually take a few weeks to show full effects, and it's important not to stop them suddenly."
    },
    'beta blocker': {
      description: 'block the effects of adrenaline on your heart and blood vessels',
      uses: 'high blood pressure, heart rhythm problems, and sometimes anxiety or migraine prevention',
      notes: "They can make you feel a bit tired at first, and you shouldn't stop them suddenly."
    }
  };
  
  const info = classInfo[className] || {
    description: 'have specific therapeutic effects',
    uses: 'various medical conditions',
    notes: 'Each medication in this class has its own specific properties.'
  };
  
  return `Great question about ${className}s! I help people with these medications all the time.

${className.charAt(0).toUpperCase() + className.slice(1)}s ${info.description}. They're commonly used for ${info.uses}.

I have detailed information on several ${className}s including ${availableDrugs.slice(0, 4).join(', ')}${availableDrugs.length > 4 ? ' and others' : ''}.

${info.notes}

Would you like me to tell you about any specific ${className}, or do you have questions about this class of medications in general? I'm here to help! 😊`;
};

// Create general helpful response
const createGeneralResponse = (userQuery: string): string => {
  const queryLower = userQuery.toLowerCase();
  
  // Check if asking about drug classes
  for (const [className, drugs] of Object.entries(DRUG_CLASSES)) {
    if (queryLower.includes(className)) {
      return createClassResponse(className);
    }
  }
  
  // Check if asking about interactions
  if (queryLower.includes('interaction') || queryLower.includes('together') || queryLower.includes('with')) {
    return `I love helping with drug interaction questions! That's such an important thing to check.

I can help you understand interactions between many common medications. Just tell me which specific medications you're wondering about taking together, and I'll give you the scoop on whether they play nicely or if there are any concerns to watch for.

Drug interactions can range from minor (like one medication being less effective) to serious (like increased side effects or dangerous complications), so it's always smart to ask!

What medications are you curious about? 😊`;
  }
  
  // Check if asking for other medicines
  if (queryLower.includes('other medicine') || queryLower.includes('alternative') || queryLower.includes('different medication')) {
    return `I'd be happy to help you explore different medication options! 

I have information on medications across many categories - from pain relievers and antibiotics to heart medications and antidepressants. The key is finding what works best for your specific situation.

What kind of condition or symptoms are you looking to treat? Or what medication are you currently taking that you'd like to know about alternatives for? That'll help me point you in the right direction! 😊`;
  }
  
  // General pharmacy help
  const totalDrugsCount = Object.keys(COMPREHENSIVE_DRUG_DATABASE).length;
  return `Hi there! I'm Alex, your friendly neighborhood pharmacist! 👋

I love helping people understand their medications better. I have comprehensive information on over ${totalDrugsCount} medications and can help with:
• Drug interactions and safety
• Side effects and what to watch for  
• Dosing questions and timing
• How medications work
• Alternatives and options

Whether you're wondering about a prescription you just picked up, over-the-counter options, or just want to understand something better - I'm here for you!

What medication questions can I help you with today? 😊`;
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    const userMessage = messages.filter((m: Message) => m.role === "user").pop()?.content || "";

    if (!userMessage) {
      return NextResponse.json({ error: "User message is empty" }, { status: 400 });
    }

    // Extract mentioned drugs from the query (including drug classes)
    const mentionedDrugs = extractDrugNames(userMessage);
    
    // Generate appropriate response
    let response: string;
    
    if (mentionedDrugs.length > 0) {
      response = createDrugResponse(mentionedDrugs, userMessage);
    } else {
      response = createGeneralResponse(userMessage);
    }

    return NextResponse.json({ reply: response });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ 
      reply: "Hi there! I'm experiencing a brief technical hiccup, but I'm still here to help with your medication questions! Feel free to ask me anything about drugs, interactions, or pharmacy topics. 😊",
      error: "Internal server error"
    }, { status: 500 });
  }
}