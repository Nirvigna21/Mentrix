export type UserMode = 'guest' | 'authenticated'

export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
}

export interface DSATopic {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  solved: number
  total: number
  completed: boolean
  resources: {
    label: string
    url: string
  }[]
}

export interface SemesterData {
  sem: number
  sgpa: number
  credits?: number
}

export interface UserProgress {
  user_id: string
  dsa_completed: string[]          // topic IDs
  streak_count: number
  last_active: string              // ISO date
  cgpa_data: SemesterData[]
  roadmap_progress: Record<string, number>  // roadmap_id → pct
}
