import { createBrowserClient } from "@supabase/ssr"

let client: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bhumjttmayejuvqjowgg.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodW1qdHRtYXllanV2cWpvd2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODU1NDgsImV4cCI6MjA3Njc2MTU0OH0.B4Ohpjy-AnS94fn3Ltx6LOJ62H6jzBnAKf_b6Wr5JHs"

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase credentials in browser")
    throw new Error("Missing Supabase environment variables")
  }

  client = createBrowserClient(supabaseUrl, supabaseAnonKey)

  return client
}
