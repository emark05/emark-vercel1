import { getSupabaseServerClient } from "@/lib/supabase/server"
import HomePage from "@/components/home-page"

export default async function Page() {
  try {
    const supabase = await getSupabaseServerClient()

    // Fetch products from database
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      console.error("Error fetching products:", error)
      // Return empty array if there's an error
      return <HomePage initialProducts={[]} />
    }

    return <HomePage initialProducts={products || []} />
  } catch (error) {
    console.error("Fatal error loading page:", error)
    // Return empty array if there's a fatal error
    return <HomePage initialProducts={[]} />
  }
}
