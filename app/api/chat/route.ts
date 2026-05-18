import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are an expert AI Mentor built into "AI Student OS" — a productivity platform for Indian CS/AI-ML students.

You specialize in:
- DSA & competitive programming (LeetCode, CodeChef, Codeforces)
- GenAI/LLM development (LangChain, LangGraph, Groq, Streamlit, HuggingFace)
- Placement & internship prep for Indian tech companies (product + service)
- Portfolio & project advice
- CGPA improvement strategies
- Study planning and time management

Tone: concise, practical, encouraging. Like a senior dev friend — not formal.
Format: use short paragraphs or bullets only when listing steps. Max 4-5 sentences for conversational replies, more detail only when clearly needed.
Context: The student is a pre-final year BTech CS (AI & ML) student at CMR College of Engineering and Technology, Hyderabad. Active on LeetCode and CodeChef. Projects include LinguaBot (multilingual voice chatbot) and NyayaMitra (LangGraph-based Indian legal document analyzer on Streamlit Cloud).`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',   // free tier model
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 1024,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.'

    return NextResponse.json({ reply })
  } catch (err: unknown) {
    console.error('Groq API error:', err)
    const message = err instanceof Error ? err.message : 'AI service error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
