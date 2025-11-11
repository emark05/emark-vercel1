import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bhumjttmayejuvqjowgg.supabase.co"
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodW1qdHRtYXllanV2cWpvd2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExODU1NDgsImV4cCI6MjA3Njc2MTU0OH0.B4Ohpjy-AnS94fn3Ltx6LOJ62H6jzBnAKf_b6Wr5JHs"

    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*&limit=1`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    })

    const responseText = await response.text()

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText.substring(0, 200),
      fullResponse: responseText,
      url: supabaseUrl,
    })
  } catch (error) {
    return NextResponse.json({
      error: String(error),
    })
  }
}
