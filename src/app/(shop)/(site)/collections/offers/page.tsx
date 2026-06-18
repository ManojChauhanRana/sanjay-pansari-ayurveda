import type { Metadata } from "next";
import { ProductCollection } from "@/components/product/product-collection";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Offers | Sanjay Pansari Assandh",
  description: "Discount-led ayurvedic wellness picks and promotional product highlights."
};

export default async function OffersPage() {
  const supabase = await getSupabaseServerClient();
  const { data: dbProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products = (dbProducts || [])
    .filter((product) => {
      const hasDiscount = Number(product.base_mrp) > Number(product.base_price);
      const hasOfferBadge = product.badges?.some((badge: string) => /offer|sale|discount/i.test(badge));
      return hasDiscount || hasOfferBadge;
    })
    .map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.base_price,
      mrp: product.base_mrp,
      image: product.image_url,
      badge: product.badges?.[0] || "",
      badges: product.badges || [],
      category_ids: product.category_ids || [],
      reviews: 0,
      unit: "Standard"
    }));

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:py-10">
          <div className="mx-auto max-w-[900px] px-2 py-8 text-center">
            <h1 className="text-[30px] font-semibold leading-tight text-[#242424] md:text-[42px]">Offers</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#5d6258]">
              Current discounts and promotional Ayurvedic wellness essentials.
            </p>
          </div>
        </div>
      </section>

      <ProductCollection products={products} totalCount={products.length} initialVisibleCount={20} />
    </main>
  );
}
