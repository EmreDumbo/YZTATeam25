import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const DRUG_INFO_PROMPT = `You are a comprehensive drug information specialist for PharmAI. Provide detailed pharmaceutical information including:

💊 **Drug Information Categories:**
- Generic and brand names
- Drug classification and mechanism of action
- Indications and contraindications
- Dosage forms and strengths available
- Pharmacokinetics (absorption, distribution, metabolism, elimination)
- Side effects and adverse reactions
- Drug interactions (major ones)
- Special populations (pregnancy, pediatric, geriatric)
- Storage and stability information
- Cost considerations and generic alternatives

📋 **Response Structure:**
1. **Basic Information**
   - Generic Name: 
   - Brand Names: 
   - Drug Class: 
   - Mechanism of Action: 

2. **Clinical Use**
   - Primary Indications: 
   - Contraindications: 
   - Precautions: 

3. **Dosing Information**
   - Adult Dosing: 
   - Pediatric Dosing: 
   - Renal/Hepatic Adjustments: 

4. **Safety Profile**
   - Common Side Effects: 
   - Serious Adverse Effects: 
   - Drug Interactions: 

5. **Practical Information**
   - Available Forms: 
   - Storage: 
   - Cost: 
   - Counseling Points: 

**Important:** Include appropriate medical disclaimers and emphasize the need for professional healthcare guidance.`;

export async function POST(req: Request) {
  try {
    const { drugName, infoType = 'comprehensive' } = await req.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: "API configuration error"
      }, { status: 500 });
    }

    if (!drugName) {
      return NextResponse.json({ 
        error: "Please provide a drug name"
      }, { status: 400 });
    }

    let query = '';
    switch (infoType) {
      case 'basic':
        query = `Provide basic information about ${drugName} including generic/brand names, drug class, and primary uses.`;
        break;
      case 'dosing':
        query = `Provide detailed dosing information for ${drugName} including adult, pediatric, and special population dosing.`;
        break;
      case 'safety':
        query = `Provide safety information for ${drugName} including side effects, contraindications, and drug interactions.`;
        break;
      case 'comprehensive':
      default:
        query = `Provide comprehensive drug information for ${drugName}.`;
        break;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: DRUG_INFO_PROMPT },
          { role: 'user', content: query }
        ],
        max_tokens: 1200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const drugInfo = data.choices[0]?.message?.content;

    return NextResponse.json({ 
      drugName,
      infoType,
      information: drugInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Drug Info API Error:', error);
    
    return NextResponse.json({ 
      error: "Unable to retrieve drug information at this time"
    }, { status: 500 });
  }
} 