import { getSupabaseServerClient } from "@/lib/supabase/server"
import HomePage from "@/components/home-page"

export default async function Page() {
  const supabase = await getSupabaseServerClient()

  // Fetch products from database
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    console.error("Error fetching products:", error)
  }

  return <HomePage initialProducts={products || []} />
}
