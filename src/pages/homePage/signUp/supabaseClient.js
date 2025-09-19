import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://skspwpcnuapvrfuyojpl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrc3B3cGNudWFwdnJmdXlvanBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDc5NjIsImV4cCI6MjA3Mzg4Mzk2Mn0.rodSshyqlrhT3P2IkvwB9M7cEmAwieGdCNsYFIAwdRo"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
