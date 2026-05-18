'use client'

import Link from 'next/link'
import { Flame, PieChart, Sparkles, BarChart2, Rocket, CalendarDays, Zap, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  userName: string | null
  isLoggedIn: boolean
}

const STREAK_DAYS = 14

const RECS = [
  { icon: '🌐', title: 'Graph Theory', sub: 'DSA · 3 topics pending', color: 'text-accent-blue', bg: 'bg-accent-blue/10', href: '/dashboard/dsa' },
  { icon: '🦜', title: 'LangGraph deep dive', sub: 'GenAI · agents & memory', color: 'text-accent-purple', bg: 'bg-accent-purple/10', href: '/dashboard/ai-mentor' },
  { icon: '📄', title: 'Resume polish', sub: 'Internship prep · urgent', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', href: '/dashboard/ai-mentor' },
  { icon: '🐙', title: 'Open source PR', sub: 'Community · good first issue', color: 'text-accent-pink', bg: 'bg-accent-pink/10', href: '/dashboard/ai-mentor' },
]

const EVENTS = [
  { name: 'Smart India Hack', time: 'May 20', color: 'bg-accent-blue', tag: 'Hackathon', tagColor: 'text-accent-blue bg-accent-blue/10' },
  { name: 'Groq API Webinar', time: 'May 15', color: 'bg-accent-cyan',  tag: 'Webinar',   tagColor: 'text-accent-cyan bg-accent-cyan/10'   },
  { name: 'ICPC Regionals',   time: 'Jun 3',  color: 'bg-accent-purple', tag: 'Contest',  tagColor: 'text-accent-purple bg-accent-purple/10' },
]

const ACT_BARS = [
  { day: 'M', val: 4, color: 'bg-accent-blue' },
  { day: 'T', val: 7, color: 'bg-accent-purple' },
  { day: 'W', val: 5, color: 'bg-accent-cyan' },
  { day: 'T', val: 9, color: 'bg-accent-blue' },
  { day: 'F', val: 6, color: 'bg-accent-purple' },
  { day: 'S', val: 3, color: 'bg-accent-cyan' },
  { day: 'S', val: 2, color: 'bg-white/10' },
]

const PROGS = [
  { name: 'LangGraph Agents', pct: 72, color: 'bg-accent-blue' },
  { name: 'DSA — Graphs',     pct: 45, color: 'bg-accent-purple' },
  { name: 'System Design',    pct: 28, color: 'bg-accent-cyan' },
]

const QUICK_ACTIONS = [
  { label: 'Mock interview',  prompt: 'Run a mock DSA interview — start with an easy array problem', icon: '🧠' },
  { label: 'Daily problem',   prompt: 'Give me a LeetCode-style daily problem with hints',           icon: '💡' },
  { label: 'Gen timetable',   prompt: 'Build a focused 7-day study timetable for GenAI internship prep', icon: '📅' },
  { label: 'Find internships',prompt: 'List top GenAI internships hiring in India right now for BTech students', icon: '💼' },
]

export default function DashboardClient({ userName, isLoggedIn }: Props) {
  const greeting = userName
    ? `Good morning, ${userName} 👾`
    : 'Welcome to AI Student OS 👾'

  return (
    <div className="max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-5">
        <h1 className="text-[22px] font-extrabold tracking-tight">
          {userName
            ? <><span className="gradient-text">{greeting.split(',')[0] + ','}</span>{' ' + greeting.split(',')[1]}</>
            : <span className="gradient-text">{greeting}</span>}
        </h1>
        <p className="text-xs font-mono text-white/35 mt-1">
          {isLoggedIn
            ? '// Tuesday · Week 19 · 12 days to placement season'
            : '// Sign in to unlock streaks, CGPA tracking & personalized AI'}
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        {/* Streak */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-2">
            <Flame className="w-3 h-3" /> Study Streak
          </div>
          {isLoggedIn ? (
            <>
              <div className="text-4xl font-extrabold tracking-tighter text-accent-cyan">🔥 {STREAK_DAYS}</div>
              <div className="text-xs text-white/35 mt-1">days in a row · best: 21</div>
              <div className="flex gap-1 flex-wrap mt-3">
                {Array.from({ length: 21 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-5 h-5 rounded-[5px] flex items-center justify-center text-[8px] font-bold',
                      i === STREAK_DAYS - 1 ? 'bg-accent-cyan text-bg' :
                      i < STREAK_DAYS - 1 ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25' :
                      'bg-surface-2 text-white/20'
                    )}
                  >
                    {'MTWTFSS'[i % 7]}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-2">
              <div className="text-3xl font-extrabold text-white/20">—</div>
              <p className="text-xs text-white/30 mt-1">Sign in to track your streak</p>
            </div>
          )}
        </div>

        {/* CGPA */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-2">
            <PieChart className="w-3 h-3" /> CGPA
          </div>
          <div className="flex items-center gap-4 mt-1">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
              <circle cx="32" cy="32" r="26" fill="none" stroke="#4f7dff" strokeWidth="6"
                strokeDasharray="163.4" strokeDashoffset={isLoggedIn ? "32.7" : "163.4"}
                strokeLinecap="round" transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div>
              <div className="text-3xl font-extrabold tracking-tighter">
                {isLoggedIn ? <>8.05<span className="text-base font-normal text-white/35">/10</span></> : <span className="text-white/25">—</span>}
              </div>
              {isLoggedIn
                ? <div className="flex items-center gap-1 text-xs text-accent-green mt-1"><TrendingUp className="w-3 h-3" />+0.12 this sem</div>
                : <div className="text-xs text-white/30 mt-1">Calculate in CGPA tab</div>}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] px-2 py-0.5 bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-full">Sem 6 active</span>
            <span className="text-[10px] px-2 py-0.5 bg-accent-purple/10 text-accent-purple border border-accent-purple/20 rounded-full">Target: 8.5</span>
          </div>
        </div>

        {/* AI Recs - tall */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors row-span-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-accent-purple bg-accent-purple/10 border border-accent-purple/20 rounded-full px-2.5 py-1 mb-2">
            <Sparkles className="w-3 h-3" /> AI Mentor picks
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {RECS.map(r => (
              <Link key={r.title} href={r.href} className="flex items-center gap-2.5 bg-surface-2 border border-border-1 hover:border-border-2 rounded-xl p-2.5 transition-colors group">
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0', r.bg)}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{r.title}</div>
                  <div className="text-[10px] text-white/35">{r.sub}</div>
                </div>
                <span className="text-white/20 group-hover:text-white/50 text-xs">›</span>
              </Link>
            ))}
          </div>
          <Link href="/dashboard/ai-mentor" className="mt-3 flex items-center justify-center gap-1.5 w-full bg-surface-2 border border-border-1 hover:border-border-2 rounded-xl py-2 text-xs font-medium transition-colors">
            <Sparkles className="w-3 h-3 text-accent-purple" /> Open AI Mentor chat
          </Link>
        </div>

        {/* Activity bars */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors col-span-1 sm:col-span-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-2">
            <BarChart2 className="w-3 h-3" /> Coding activity — this week
          </div>
          <div className="flex items-end gap-1.5 h-14 mt-2">
            {ACT_BARS.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={cn('w-full rounded-t-[3px]', b.color)} style={{ height: `${b.val * 7}px`, opacity: i === 6 ? 0.3 : 0.8 }} />
                <span className="text-[8px] text-white/30 font-mono">{b.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-white/35">LeetCode: <span className="text-white font-semibold">34</span></span>
            <span className="text-[10px] text-white/35">CodeChef: <span className="text-accent-blue font-semibold">1420</span></span>
            <span className="text-[10px] text-white/35">Commits: <span className="text-accent-cyan font-semibold">28</span></span>
          </div>
        </div>

        {/* Roadmap progress */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-3">
            <Rocket className="w-3 h-3" /> Roadmap progress
          </div>
          <div className="flex flex-col gap-3">
            {PROGS.map(p => (
              <div key={p.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold">{p.name}</span>
                  <span className="text-[10px] font-mono text-white/35">{p.pct}%</span>
                </div>
                <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', p.color)} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-3">
            <CalendarDays className="w-3 h-3" /> Upcoming events
          </div>
          <div className="flex flex-col gap-3">
            {EVENTS.map(e => (
              <div key={e.name} className="flex items-center gap-2">
                <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', e.color)} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{e.name}</div>
                  <div className="text-[10px] text-white/35 font-mono">{e.time}</div>
                </div>
                <span className={cn('text-[9px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap', e.tagColor)}>
                  {e.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-4 hover:border-border-2 transition-colors col-span-1 sm:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/35 mb-3">
            <Zap className="w-3 h-3" /> Quick actions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {QUICK_ACTIONS.map(a => (
              <Link
                key={a.label}
                href={`/dashboard/ai-mentor?prompt=${encodeURIComponent(a.prompt)}`}
                className="flex items-center gap-2 bg-surface-2 border border-border-1 hover:border-border-2 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors"
              >
                <span className="text-base">{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
