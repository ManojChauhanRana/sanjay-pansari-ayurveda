import type { Metadata } from "next";
import { SearchPage } from "@/components/search/search-page";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Search | Sanjay Pansari Assandh",
  description: "Search the current product catalog."
};

export default async function SearchRoute() {
  const supabase = await getSupabaseServerClient();
  const { data: dbProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products = (dbProducts || []).map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    concern: "",
    price: product.base_price,
    mrp: product.base_mrp,
    image: product.image_url,
    badge: product.badges?.[0] || "",
    badges: product.badges || [],
    reviews: 0,
    unit: "Standard"
  }));

  return <SearchPage products={products} />;
}
