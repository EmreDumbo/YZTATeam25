import {NextResponse } from "next/server";

export async function POST(req: Request) {

    const { messages } = await req.json();

    const last = messages.filter((m: any) => m.role === "user").pop()?.content || "";

    let reply = "Stub Ai Assistant Response";
    if (/birlikte alınırsa/i.test(last))
        reply = 'Stub: Birlikte alımda kanama riski artar.';
      else if (/yan etki/i.test(last))
        reply = 'Stub: Yaygın yan etkiler mide bulantısı ve baş ağrısıdır.';
      else
        reply = 'Stub: PharmAI size nasıl yardımcı olabilir?';
    
      return NextResponse.json({ reply });

}