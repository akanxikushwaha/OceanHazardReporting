import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fqjoohzcvsvlfmjcucmq.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxam9vaHpjdnN2bGZtamN1Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTEzODIsImV4cCI6MjA3Mzg4NzM4Mn0.BjnGZLiXBRBTSO7uYFxsE4mqA5G_l_WVN5g1vsvMvvw"


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
