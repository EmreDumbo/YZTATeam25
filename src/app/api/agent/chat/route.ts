import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Define proper TypeScript interface for messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Securely get the API key from environment variables.
// Keeping this line outside the function prevents it from being re-initialized on every request.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    // Get the message history from the frontend.
    const { messages }: { messages: Message[] } = await req.json();

    // Get the last user message (same logic as before).
    const userMessage = messages.filter((m: Message) => m.role === "user").pop()?.content || "";

    if (!userMessage) {
      return NextResponse.json({ error: "User message is empty" }, { status: 400 });
    }

    // Initialize the Gemini model.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // The instruction (prompt) that tells Gemini who it is and how it should behave.
    // This part is crucial for generating responses that align with your project's vision.
    const prompt = `
      You are an AI pharmacy assistant named PharmAI. Your primary task is to answer users' 
      questions about medications in a reliable, understandable, and professional tone.
      
      Your focus should be on these topics:
      - Drug interactions
      - Dosage calculations and recommendations
      - Common side effects of drugs
      - Clinical guidelines and usage recommendations
      
      Do not give medical advice under any circumstances. Only summarize information from drug 
      leaflets and general clinical data.
      Do not prefix your answers with "PharmAI:". Provide the answer directly.
      Only answer questions related to health and medication. For irrelevant questions, respond with 
      something like, "I am a pharmacy assistant and can only help with health-related topics."

      The user's question is: "${userMessage}"
    `;

    // Send the prepared prompt to the Gemini API.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Return the response in the format expected by the frontend ({ reply: "..." }).
    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    // In case of an error, send an informative message to the user.
    const reply = "I'm sorry, I encountered a problem while processing your request. Please try again later.";
    return NextResponse.json({ reply }, { status: 500 });
  }
}