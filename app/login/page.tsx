'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleGoogle() {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  function handleGuest() {
    // Store guest flag in sessionStorage, redirect to dashboard
    sessionStorage.setItem('guestMode', 'true')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background glows */}
      <div className="fixed top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-accent-blue/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-accent-purple/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-blue-purple flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Student<span className="text-accent-blue">OS</span>
          </span>
        </div>

        <div className="bg-surface-1 border border-border-2 rounded-2xl p-7">
          <h1 className="text-xl font-extrabold tracking-tight mb-1">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-white/40 mb-6">
            {isSignUp
              ? 'Join to track streaks, CGPA, and DSA progress'
              : 'Sign in to your personalized dashboard'}
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-surface-2 border border-border-2 rounded-xl py-2.5 text-sm font-medium hover:border-border-3 transition-colors mb-4 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border-1" />
            <span className="text-xs text-white/25">or</span>
            <div className="flex-1 h-px bg-border-1" />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleAuth} className="space-y-3">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-surface-2 border border-border-2 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-blue/50 transition-colors font-mono placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-surface-2 border border-border-2 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-accent-blue/50 transition-colors font-mono placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-blue hover:bg-accent-blue/85 text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignUp ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-3">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError('') }}
              className="text-accent-blue hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border-1" />
            <span className="text-xs text-white/25">or</span>
            <div className="flex-1 h-px bg-border-1" />
          </div>

          {/* Guest mode */}
          <button
            onClick={handleGuest}
            className="w-full bg-surface-2 border border-border-2 hover:border-border-3 rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            Continue as guest
          </button>
          <p className="text-center text-xs text-white/25 mt-2">
            Guest mode: full tools access, no saved progress
          </p>
        </div>
      </div>
    </div>
  )
}
