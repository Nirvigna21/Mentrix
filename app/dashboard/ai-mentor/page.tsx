'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChatMessage } from '@/types'

const SUGGESTIONS = [
  'What should I focus on for GenAI internship prep?',
  'Explain Dynamic Programming with examples',
  'Review my NyayaMitra and LinguaBot projects — how strong is my portfolio?',
  'Give me a 30-day placement prep plan',
]

export default function AIMentorPage() {
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-fire prompt from URL (quick action links)
  useEffect(() => {
    const prompt = searchParams.get('prompt')
    if (prompt && messages.length === 0) {
      sendMessage(prompt)
    } else if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hey! I'm your AI Mentor 👋 I can help with DSA, GenAI, placement prep, project advice, and more. What are you working on today?",
        timestamp: Date.now(),
      }])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const msg = text ?? input.trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: ChatMessage = { role: 'user', content: msg, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      // Build history (exclude initial greeting from API call)
      const history = [...messages.filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0), userMsg]
        .map(({ role, content }) => ({ role, content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()
      const reply = data.reply ?? data.error ?? 'Something went wrong. Try again!'

      setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: Date.now() }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Network error — please check your connection and try again.',
        timestamp: Date.now(),
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-7rem)] flex flex-col">

      {/* Header */}
      <div className="bg-surface-1 border border-border-1 rounded-t-2xl px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-blue-purple flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">Mentor AI</div>
          <div className="text-[10px] text-white/35">Powered by Groq · LLaMA 3.3 70B</div>
        </div>
        <div className="ml-auto w-2 h-2 bg-accent-green rounded-full" title="online" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-surface-1 border-x border-border-1 px-4 py-4 flex flex-col gap-3 min-h-0">
        {messages.map((m, i) => (
          <div key={i} className={cn('flex animate-fade-in', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn(
              'max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
              m.role === 'user'
                ? 'bg-accent-blue/15 border border-accent-blue/25 text-white'
                : 'bg-surface-2 border border-border-1 text-white'
            )}>
              {m.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-surface-2 border border-border-1 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion chips */}
      {messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap px-4 py-3 bg-surface-1 border-x border-border-1">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-[11px] px-3 py-1.5 bg-surface-2 border border-border-1 hover:border-border-2 rounded-lg text-white/50 hover:text-white transition-colors"
            >
              {s.length > 40 ? s.slice(0, 38) + '…' : s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="bg-surface-1 border border-border-1 rounded-b-2xl px-3 py-3 flex gap-2 flex-shrink-0">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask anything — DSA, GenAI, internships, resume..."
          className="flex-1 bg-surface-2 border border-border-2 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent-blue/45 transition-colors placeholder:text-white/25"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 bg-accent-blue hover:bg-accent-blue/85 disabled:opacity-40 disabled:cursor-default rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
        </button>
      </div>
    </div>
  )
}
