import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const DRUG_INTERACTION_PROMPT = `You are a specialized drug interaction checker for PharmAI. Your role is to:

🔍 **Primary Function:**
- Analyze potential drug-drug interactions
- Assess severity levels (Major, Moderate, Minor)
- Provide clinical significance and mechanisms
- Suggest monitoring parameters or alternatives

⚠️ **Interaction Assessment:**
- **MAJOR**: Life-threatening or requires immediate intervention
- **MODERATE**: May cause clinically significant effects, requires monitoring
- **MINOR**: Limited clinical significance, may require minor adjustments

📋 **Response Format:**
For each interaction found:
1. **Drugs Involved:** [Drug A] + [Drug B]
2. **Severity:** [Major/Moderate/Minor]
3. **Mechanism:** Brief explanation of how the interaction occurs
4. **Clinical Effect:** What happens to the patient
5. **Management:** Specific recommendations (avoid, monitor, adjust dose, timing)
6. **Monitoring:** What parameters to watch

**Important:** Always include a disclaimer that this is for informational purposes and clinical judgment should be applied.`;

export async function POST(req: Request) {
  try {
    const { drugs } = await req.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: "API configuration error"
      }, { status: 500 });
    }

    if (!drugs || !Array.isArray(drugs) || drugs.length < 2) {
      return NextResponse.json({ 
        error: "Please provide at least 2 drugs for interaction checking"
      }, { status: 400 });
    }

    const drugList = drugs.join(", ");
    const userQuery = `Check for drug interactions between: ${drugList}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: DRUG_INTERACTION_PROMPT },
          { role: 'user', content: userQuery }
        ],
        max_tokens: 800,
        temperature: 0.3, // Lower temperature for more consistent medical advice
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const analysis = data.choices[0]?.message?.content;

    return NextResponse.json({ 
      drugs: drugs,
      analysis: analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Drug Interaction API Error:', error);
    
    return NextResponse.json({ 
      error: "Unable to process drug interaction check at this time"
    }, { status: 500 });
  }
} 