'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface NavbarProps {
  user: { email?: string | null; user_metadata?: { full_name?: string } } | null
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const supabase = createClient()

  const displayName = user?.user_metadata?.full_name
    ?? user?.email?.split('@')[0]
    ?? null

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-bg/90 backdrop-blur border-b border-border-1 flex items-center justify-between px-4">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-blue-purple flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
        <span className="text-sm font-bold tracking-tight hidden sm:block">
          Stack<span className="text-accent-blue">d</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="flex items-center gap-2 bg-surface-2 border border-border-1 rounded-full px-3 py-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-blue-purple flex items-center justify-center text-[10px] font-bold text-white">
                {displayName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-white/70 hidden sm:block">{displayName}</span>
            </div>
            <button onClick={signOut} className="text-xs px-3 py-1.5 bg-surface-2 border border-border-1 rounded-lg text-white/50 hover:text-white transition-colors">
              Sign out
            </button>
          </>
        ) : (
          <>
            <span className="text-xs font-mono text-white/30 bg-surface-2 border border-border-1 rounded-full px-2.5 py-1">
              exploring
            </span>
            <Link href="/login" className="text-xs font-bold bg-accent-blue hover:bg-accent-blue/85 text-white px-3 py-1.5 rounded-lg transition-colors">
              Sign in ↗
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}