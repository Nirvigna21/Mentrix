'use client'

import { useState } from 'react'
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DSA_TOPICS } from '@/lib/dsa-data'
import { DSATopic } from '@/types'

type Difficulty = 'all' | 'easy' | 'medium' | 'hard'

const DIFF_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  easy:   { bg: 'bg-accent-cyan/10',   text: 'text-accent-cyan',   border: 'border-accent-cyan/25'   },
  medium: { bg: 'bg-accent-blue/10',   text: 'text-accent-blue',   border: 'border-accent-blue/25'   },
  hard:   { bg: 'bg-accent-pink/10',   text: 'text-accent-pink',   border: 'border-accent-pink/25'   },
}

export default function DSAPage() {
  const [topics, setTopics]   = useState<DSATopic[]>(DSA_TOPICS)
  const [filter, setFilter]   = useState<Difficulty>('all')

  const filtered = filter === 'all' ? topics : topics.filter(t => t.difficulty === filter)
  const doneCount = topics.filter(t => t.completed).length

  function toggle(id: string) {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-extrabold tracking-tight">DSA Roadmap</h1>
        <span className="text-xs font-mono text-white/40">
          {doneCount}/{topics.length} topics
        </span>
      </div>

      {/* Overall progress bar */}
      <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold">Overall progress</span>
          <span className="text-xs font-mono text-white/40">{Math.round((doneCount / topics.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / topics.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'text-xs px-3 py-1.5 rounded-lg border font-medium transition-all',
              filter === f
                ? 'bg-accent-blue/12 text-accent-blue border-accent-blue/30'
                : 'bg-surface-2 text-white/40 border-border-1 hover:text-white hover:border-border-2'
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Topic list */}
      <div className="flex flex-col gap-2">
        {filtered.map(topic => {
          const dc = DIFF_COLORS[topic.difficulty]
          const pct = Math.round((topic.solved / topic.total) * 100)
          return (
            <div
              key={topic.id}
              className={cn(
                'bg-surface-1 border rounded-2xl p-4 transition-all hover:border-border-2 cursor-pointer',
                topic.completed ? 'border-accent-cyan/20' : 'border-border-1'
              )}
              onClick={() => toggle(topic.id)}
            >
              <div className="flex items-center gap-3">
                {topic.completed
                  ? <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  : <Circle className="w-5 h-5 text-white/20 flex-shrink-0" />}
                <span className="font-semibold text-sm flex-1">{topic.name}</span>
                <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', dc.bg, dc.text, dc.border)}>
                  {topic.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 pl-8">
                <span className="text-[10px] text-white/35">{topic.solved}/{topic.total} solved</span>
                <span className="text-[10px] text-white/35">{pct}% done</span>
                {topic.resources.map(r => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1 text-[10px] text-accent-blue hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />{r.label}
                  </a>
                ))}
              </div>

              <div className="h-1 bg-surface-2 rounded-full mt-3 ml-8 overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all', topic.completed ? 'bg-accent-cyan' : dc.text.replace('text-', 'bg-'))}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
