import { getSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    // Test connection
    const { data: testData, error: testError } = await supabase.from("products").select("count", { count: "exact" })

    if (testError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Error connecting to products table",
          error: testError,
          details: testError.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "success",
      message: "Supabase connection successful",
      data: testData,
    })
  } catch (error) {
    console.error("[v0] Debug endpoint error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Fatal error",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
