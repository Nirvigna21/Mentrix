'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard',   href: '/dashboard',           icon: '⊞' },
  { label: 'CGPA',        href: '/dashboard/cgpa',      icon: '◎' },
  { label: 'DSA Roadmap', href: '/dashboard/dsa',       icon: '⑂' },
  { label: 'AI Mentor',   href: '/dashboard/ai-mentor', icon: '✦' },
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-56 border-r border-border-1 bg-bg hidden md:flex flex-col py-4 px-2">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(item => {
          const active = path === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-accent-blue/12 text-accent-blue border border-accent-blue/25'
                  : 'text-white/45 hover:text-white hover:bg-surface-2 border border-transparent'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-2">
        <div className="bg-surface-2 border border-border-1 rounded-xl p-3">
          <p className="text-[11px] font-bold text-white/60 mb-1">NyayaMitra 🚀</p>
          <p className="text-[10px] text-white/30 leading-relaxed">Your LangGraph project is live on Streamlit Cloud</p>
        </div>
      </div>
    </aside>
  )
}