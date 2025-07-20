import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const DOSAGE_CALCULATOR_PROMPT = `You are a specialized dosage calculator for PharmAI. Your expertise includes:

📊 **Dosage Calculation Types:**
- Pediatric dosing (weight-based, age-based, BSA-based)
- Geriatric adjustments and special considerations
- Renal dosing adjustments (CrCl-based)
- Hepatic dosing adjustments (Child-Pugh scoring)
- IV to PO conversions
- Unit conversions (mg/kg, mcg/kg, units/kg)

🧮 **Calculation Methodology:**
- Always show step-by-step calculations
- Include safety ranges and maximum doses
- Consider patient-specific factors
- Provide dosing intervals and duration recommendations

⚠️ **Safety Considerations:**
- Flag doses outside normal ranges
- Highlight contraindications or precautions
- Suggest monitoring parameters
- Include loading dose vs maintenance dose when applicable

📋 **Response Format:**
1. **Patient Information:** Age, weight, condition summary
2. **Medication:** Drug name, indication, route
3. **Calculation Steps:** Show mathematical work
4. **Recommended Dose:** Final calculated dose with range
5. **Dosing Schedule:** Frequency and timing
6. **Safety Notes:** Warnings, monitoring, alternatives
7. **References:** Cite dosing guidelines when possible

**Important:** All calculations are for informational purposes. Clinical judgment and institutional protocols should always take precedence.`;

export async function POST(req: Request) {
  try {
    const { 
      medication, 
      patientWeight, 
      patientAge, 
      indication, 
      renalFunction,
      hepaticFunction,
      route = 'oral',
      additionalInfo = ''
    } = await req.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: "API configuration error"
      }, { status: 500 });
    }

    if (!medication || !patientWeight || !patientAge) {
      return NextResponse.json({ 
        error: "Please provide medication name, patient weight, and age"
      }, { status: 400 });
    }

    const calculationRequest = `
    Calculate dosage for:
    - Medication: ${medication}
    - Patient Weight: ${patientWeight} kg
    - Patient Age: ${patientAge} years
    - Indication: ${indication || 'General use'}
    - Route: ${route}
    - Renal Function: ${renalFunction || 'Normal'}
    - Hepatic Function: ${hepaticFunction || 'Normal'}
    - Additional Information: ${additionalInfo}
    
    Please provide a complete dosage calculation with safety considerations.
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
          { role: 'system', content: DOSAGE_CALCULATOR_PROMPT },
          { role: 'user', content: calculationRequest }
        ],
        max_tokens: 1000,
        temperature: 0.2, // Very low temperature for consistent calculations
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const calculation = data.choices[0]?.message?.content;

    return NextResponse.json({ 
      patientInfo: {
        weight: patientWeight,
        age: patientAge,
        renalFunction,
        hepaticFunction
      },
      medication,
      indication,
      route,
      calculation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dosage Calculator API Error:', error);
    
    return NextResponse.json({ 
      error: "Unable to process dosage calculation at this time"
    }, { status: 500 });
  }
} 