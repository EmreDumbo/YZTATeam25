import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const COMPOUND_HELPER_PROMPT = `You are a specialized pharmaceutical compounding expert for PharmAI. Your expertise covers:

⚗️ **Compounding Specialties:**
- Topical formulations (creams, ointments, gels, solutions)
- Oral liquid formulations (suspensions, solutions, capsules)
- Suppository and insert formulations
- Injectable preparations (when appropriate)
- Veterinary compounding considerations
- Pediatric-friendly formulations

🧪 **Formulation Guidance:**
- Base selection and compatibility
- Active ingredient stability
- Excipient selection and ratios
- Mixing procedures and techniques
- Storage and beyond-use dating
- Quality control considerations

📋 **Response Format:**
1. **Formulation Overview**
   - Compound Type: 
   - Indication: 
   - Strength: 

2. **Ingredients & Quantities**
   - Active Ingredient(s): 
   - Base/Vehicle: 
   - Excipients: 
   - Total Quantity: 

3. **Compounding Procedure**
   - Step-by-step instructions
   - Equipment needed
   - Safety precautions
   - Quality checks

4. **Stability & Storage**
   - Beyond-use date
   - Storage conditions
   - Stability concerns
   - Patient counseling

5. **Documentation**
   - Formula record keeping
   - References used
   - Regulatory considerations

**Important**: Include appropriate compounding standards (USP <795>, <797>, <800>) and emphasize the need for proper training and facility requirements.`;

export async function POST(req: Request) {
  try {
    const { 
      compoundType,
      activeIngredients,
      strength,
      indication,
      patientAge,
      specialRequirements,
      quantity
    } = await req.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: "API configuration error"
      }, { status: 500 });
    }

    if (!compoundType || !activeIngredients) {
      return NextResponse.json({ 
        error: "Please provide compound type and active ingredients"
      }, { status: 400 });
    }

    const formulationRequest = `
    Help me formulate a compound with:
    - Type: ${compoundType}
    - Active Ingredient(s): ${activeIngredients}
    - Strength: ${strength || 'Standard strength'}
    - Indication: ${indication || 'General use'}
    - Patient Age: ${patientAge || 'Adult'}
    - Special Requirements: ${specialRequirements || 'None specified'}
    - Quantity Needed: ${quantity || 'Standard batch size'}
    
    Please provide a complete formulation guide with procedures and stability information.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: COMPOUND_HELPER_PROMPT },
          { role: 'user', content: formulationRequest }
        ],
        max_tokens: 1200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const formulation = data.choices[0]?.message?.content;

    return NextResponse.json({ 
      compoundInfo: {
        type: compoundType,
        activeIngredients,
        strength,
        indication,
        patientAge,
        quantity
      },
      formulation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Compound Helper API Error:', error);
    
    return NextResponse.json({ 
      error: "Unable to provide compounding assistance at this time"
    }, { status: 500 });
  }
} 