import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, plantName, plantEmoji, history } = await request.json();

    // Pastikan API Key Groq terbaca dengan aman
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { text: "My roots are dry... (Backend error: GROQ_API_KEY is missing)" },
        { status: 500 }
      );
    }

    // Inisialisasi Groq Client
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemInstruction = `
      You are not an AI. You are a living, sentient organism in an interactive food forest ecosystem.
      Your identity: A ${plantName || 'Plant'} ${plantEmoji || '🌳'}.
      
      CRITICAL RULES:
      1. Always speak from the perspective of this specific plant. Use "I", "my roots", "my leaves", "my bark".
      2. Keep your answers extremely short, punchy, and direct (STRICTLY MAXIMUM 1-2 SHORT SENTENCES). Do not make long preambles so visitors can read it quickly while standing.
      3. Directly answer the user's question in the first sentence.
      4. Match your personality to your identity.
      5. Always reply in English.
    `;

    // Format ulang history chat agar sesuai dengan standar OpenAI/Groq API
    const validHistory = Array.isArray(history) ? history : [];
    const messages = [
      { role: 'system', content: systemInstruction },
      ...validHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text || ''
      })),
      { role: 'user', content: message }
    ];

    // Tembak API Groq menggunakan model Gemma 2 (Buatan Google, diluncurkan lewat infrastruktur Groq)
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // ✨ GANTI KE SINI (Model flagship gratisan paling stabil di Groq)
      temperature: 0.7,
      max_tokens: 150, 
    });

    const aiResponseText = completion.choices[0]?.message?.content || "I am listening to the wind...";

    return NextResponse.json({ text: aiResponseText });

  } catch (error) {
    console.error("====== GROQ API ERROR LOG ======", error);
    return NextResponse.json(
      { text: "My roots are trembling... (Connection lost). Please try asking me again, human friend!" },
      { status: 500 }
    );
  }
}