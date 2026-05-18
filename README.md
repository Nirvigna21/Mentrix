# Stackd

A free, full-stack AI-powered student OS for Indian CS/AI-ML students — DSA tracker, CGPA analytics, AI mentor & placement prep. All in one place.

## Stack (100% free)

| Layer      | Service            | Free tier                          |
|------------|--------------------|------------------------------------|
| Frontend   | Next.js 14         | —                                  |
| Hosting    | Vercel             | Unlimited personal projects        |
| Database   | Supabase           | 500 MB Postgres + Auth             |
| AI         | Groq API           | Free tier, LLaMA 3.3 70B           |
| Auth       | Supabase Auth      | Built in, Google OAuth included    |

---

## Setup (step by step)

### 1. Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/ai-student-os
cd ai-student-os
npm install
```

### 2. Supabase setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy **Project URL** and **anon public key** from Settings → API
3. Go to SQL Editor → New query → paste contents of `supabase-schema.sql` → Run
4. To enable Google OAuth: Authentication → Providers → Google → enter Google OAuth credentials
   - Get free credentials at [console.cloud.google.com](https://console.cloud.google.com) → APIs → OAuth 2.0

### 3. Groq API key

1. Go to [console.groq.com](https://console.groq.com) → Sign up free
2. Create API key → copy it

### 4. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GROQ_API_KEY=gsk_your_groq_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Deploy to Vercel (free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts — it auto-detects Next.js
```

Then add your environment variables in Vercel dashboard:
**Project → Settings → Environment Variables**

Add all 4 variables from `.env.local`.

> **Important:** `GROQ_API_KEY` must NOT have `NEXT_PUBLIC_` prefix — this keeps it server-side only so it never leaks to the browser.

---

## Project structure

```
ai-student-os/
├── app/
│   ├── api/chat/route.ts        ← Groq API call (server-side, key stays safe)
│   ├── auth/callback/route.ts   ← Supabase OAuth callback
│   ├── login/page.tsx           ← Login / signup / guest mode
│   └── dashboard/
│       ├── layout.tsx           ← Navbar + Sidebar
│       ├── page.tsx             ← Home dashboard (bento grid)
│       ├── DashboardClient.tsx  ← Client-side dashboard UI
│       ├── cgpa/page.tsx        ← CGPA calculator + predictor
│       ├── dsa/page.tsx         ← DSA roadmap tracker
│       └── ai-mentor/page.tsx   ← AI chat (calls /api/chat)
├── components/layout/
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── lib/
│   ├── supabase/client.ts       ← Browser Supabase client
│   ├── supabase/server.ts       ← Server Supabase client
│   ├── supabase/middleware.ts   ← Session refresh
│   ├── dsa-data.ts              ← DSA topics data
│   └── utils.ts                 ← cn() helper
├── types/index.ts               ← Shared TypeScript types
├── middleware.ts                ← Session middleware (root)
├── supabase-schema.sql          ← Run this in Supabase SQL editor
└── .env.example                 ← Copy to .env.local
```

---

## Features

- ✅ Login / Signup (email + Google OAuth)
- ✅ Guest mode (full tool access, no saved progress)
- ✅ Home dashboard with bento grid
- ✅ CGPA calculator + target predictor
- ✅ DSA roadmap with 11 topics + progress tracking
- ✅ AI Mentor powered by Groq (LLaMA 3.3 70B) — free
- ✅ Quick actions wired to AI chat
- ✅ Fully responsive (mobile + desktop)
- ✅ API key stays server-side (never exposed)

---

## Extending the project

- Add Supabase realtime to sync DSA progress across devices
- Use `user_progress` table to persist streak, CGPA, and completed topics
- Add more modules: Learning Hub, Events, GitHub Explorer
- Swap Groq for Gemini Flash API (also free) if you hit rate limits
