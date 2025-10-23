import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://bhumjttmayejuvqjowgg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodW1qdHRtYXllanV2cWpvd2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODU1NDgsImV4cCI6MjA3Njc2MTU0OH0.B4Ohpjy-AnS94fn3Ltx6LOJ62H6jzBnAKf_b6Wr5JHs",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Server component
          }
        },
      },
    },
  )
}
