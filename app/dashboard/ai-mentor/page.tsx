'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Msg { role: 'user' | 'assistant'; content: string }

const SUGS = [
  'What should I focus on for GenAI internship prep?',
  'Explain Dynamic Programming with examples',
  'Review my NyayaMitra and LinguaBot projects',
  'Give me a 30-day placement prep plan',
]

export default function AIMentorPage() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMsgs([{ role: 'assistant', content: "Hey! I'm your AI Mentor 👋 Ask me anything about DSA, GenAI, placement prep, or your projects!" }])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    const next: Msg[] = [...msgs, { role: 'user', content: msg }]
    setMsgs(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      const data = await res.json()
      setMsgs(p => [...p, { role: 'assistant', content: data.reply ?? 'Something went wrong.' }])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: 'Network error — try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      <div className="bg-surface-1 border border-border-1 rounded-t-2xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-blue-purple flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">Mentor AI</div>
          <div className="text-[10px] text-white/35">Powered by Groq · LLaMA 3.3 70B</div>
        </div>
        <div className="ml-auto w-2 h-2 bg-accent-green rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto bg-surface-1 border-x border-border-1 px-4 py-4 flex flex-col gap-3 min-h-0">
        {msgs.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              m.role === 'user' ? 'bg-accent-blue/15 border border-accent-blue/25' : 'bg-surface-2 border border-border-1')}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface-2 border border-border-1 rounded-2xl px-4 py-3 flex gap-1.5">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {msgs.length <= 1 && (
        <div className="flex gap-2 flex-wrap px-4 py-3 bg-surface-1 border-x border-border-1">
          {SUGS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-[11px] px-3 py-1.5 bg-surface-2 border border-border-1 hover:border-border-2 rounded-lg text-white/50 hover:text-white transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="bg-surface-1 border border-border-1 rounded-b-2xl px-3 py-3 flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask anything — DSA, GenAI, internships, resume..."
          className="flex-1 bg-surface-2 border border-border-2 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent-blue/45 transition-colors placeholder:text-white/25"
        />
        <button onClick={() => send()} disabled={!input.trim() || loading}
          className="w-9 h-9 bg-accent-blue disabled:opacity-40 rounded-xl flex items-center justify-center flex-shrink-0">
          {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
        </button>
      </div>
    </div>
  )
}