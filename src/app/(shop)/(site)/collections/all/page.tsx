import type { Metadata } from "next";
import { ProductCollection } from "@/components/product/product-collection";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Products | Sanjay Pansari Ayurveda",
  description: "Browse our authentic Ayurvedic herbal products."
};

export default async function ProductsCollectionPage() {
  const supabase = await getSupabaseServerClient();
  
  // 1. Fetch products
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Fetch categories for filters
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');

  // 3. Map DB products to Frontend format
  const products = (dbProducts || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    concern: "", // We will populate this from categories if needed
    category_ids: p.category_ids || [],
    price: p.base_price,
    mrp: p.base_mrp,
    image: p.image_url,
    badge: p.badges?.[0] || "",
    badges: p.badges || [],
    reviews: 0,
    unit: "Standard"
  }));

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-9 text-center md:py-12">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">All Products</h1>
          <p className="mt-2 text-[#5d6258]">Discover our range of natural Ayurvedic solutions.</p>
        </div>
      </section>

      <ProductCollection 
        products={products as any} 
        categories={categories || []}
        totalCount={products.length} 
        initialVisibleCount={20} 
      />
    </main>
  );
}
