import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCollection } from "@/components/product/product-collection";
import { getCollectionPageConfig } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type CollectionRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getCollectionPageConfig(slug);
  const supabase = await getSupabaseServerClient();
  const { data: category } = await supabase.from('categories').select('name').eq('slug', slug).single();

  if (!config && !category) return { title: "Collection not found" };

  return {
    title: `${config?.title || category?.name} | Sanjay Pansari Ayurveda`,
    description: config?.description || `Authentic Ayurvedic products for ${category?.name}.`
  };
}

export default async function CollectionRoute({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const config = getCollectionPageConfig(slug);
  const supabase = await getSupabaseServerClient();

  // 1. Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('id, name, description')
    .eq('slug', slug)
    .single();

  if (!category && !config) notFound();

  // 2. Fetch products in this category
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .contains('category_ids', [category?.id])
    .order('created_at', { ascending: false });

  // 3. Fetch all categories for filtering sidebar
  const { data: allCategories } = await supabase
    .from('categories')
    .select('id, name');

  const products = (dbProducts || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.base_price,
    mrp: p.base_mrp,
    image: p.image_url,
    badge: p.badges?.[0] || "",
    category_ids: p.category_ids || [],
    reviews: 0,
    unit: "Standard"
  }));

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1040px] px-5 py-10 text-center md:py-14">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">
            {config?.title || category?.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6258]">
            {config?.description || category?.description}
          </p>
        </div>
      </section>
      <ProductCollection products={products as any} categories={allCategories || []} />
    </main>
  );
}
