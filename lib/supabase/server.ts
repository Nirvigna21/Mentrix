import { createBrowserClient } from '@supabase/ssr'

// Use browser client on server too — simpler, works everywhere
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}