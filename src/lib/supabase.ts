import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type UserRole = 'farmer' | 'admin'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  state: string
  farm_size: number
  livestock_type: 'pig' | 'poultry' | 'both'
  premium_user: boolean
  risk_level: 'low' | 'medium' | 'high'
  created_at: string
}