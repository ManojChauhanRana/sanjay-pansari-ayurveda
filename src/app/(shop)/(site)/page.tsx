import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { categoryTiles, heroSlides, trustBadges } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await getSupabaseServerClient();

  // 1. Fetch live products
  const { data: dbProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Fetch categories for "Select Your Concern"
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .limit(8);

  const products = (dbProducts || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.base_price,
    mrp: p.base_mrp,
    image: p.image_url,
    badge: p.badges?.[0] || "",
    badges: p.badges || [],
    reviews: 0,
    unit: "Standard"
  }));

  return (
    <main className="bg-[#fbfaf4]">
      <section className="bg-white">
        <div className="px-0 py-0 md:px-5">
          <a href={heroSlides[0].href} className="relative block aspect-[682/1024] overflow-hidden bg-[#c9c9c9] md:rounded-[10px] max-w-[600px] mx-auto w-full">
            <Image
              src={heroSlides[0].image}
              alt="Ayurveda banner"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 600px"
            />
            {heroSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((slide, index) => (
                  <span key={slide.href} className={`h-1.5 w-14 rounded-full ${index === 0 ? "bg-white" : "bg-white/45"}`} />
                ))}
              </div>
            )}
          </a>
        </div>
      </section>

      {/* Dynamic Concerns (Categories) */}
      <section className="bg-white py-7 md:py-10">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#1d1d1d] md:text-[2.025rem]">Select Your Concern</h2>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 md:justify-center">
            <Link href="/collections/all" className="focus-ring flex min-w-max items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-[#d1e1cd] text-[#305724]">
              Best Solutions
            </Link>
            {categories?.map((category) => (
              <Link 
                key={category.id} 
                href={`/collections/${category.slug}`} 
                className="focus-ring flex min-w-max items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-[#f3f6ef] text-[#1d1d1d] hover:bg-[#d1e1cd]"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-2 gap-[5px] md:grid-cols-4 md:gap-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={`concern-${product.id}`} product={product as any} />
            ))}
          </div>
        </div>
      </section>

      <ScrollingBanner />

      <section className="bg-[#f3f6ef] py-8">
        <div className="container grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categoryTiles.map((category) => {
            const Icon = category.icon;
            return (
              <a key={category.label} href={category.href} className="focus-ring rounded-md border border-[#dce5d1] bg-white p-5 text-center shadow-sm hover:border-[#2d5e35]">
                <Icon className="mx-auto text-[#2d5e35]" size={30} />
                <p className="mt-3 text-sm font-black text-[#263622]">{category.label}</p>
              </a>
            );
          })}
        </div>
      </section>

      <ProductSection title="New Arrivals" products={products.slice(0, 8)} />

      <section className="bg-white py-8">
        <div className="container">
          <div className="relative min-h-[260px] overflow-hidden rounded-md border border-[#e6dfcf] bg-[#eaf2df] md:min-h-[340px]">
            <Image
              src="https://images.unsplash.com/photo-1600428877878-1a0fd85beda0?auto=format&fit=crop&w=1600&q=80"
              alt="Natural herbs and Ayurveda ingredients"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center bg-white/92 p-6 md:p-10">
              <p className="text-xs font-black uppercase text-[#9a6b18]">Quality First</p>
              <h2 className="mt-3 text-3xl font-black text-[#244d2b]">From farm to formulation</h2>
              <p className="mt-3 text-sm leading-6 text-[#4f5a48]">
                Authentic Ayurvedic products crafted with tradition and modern science. Lab-tested and GMP certified for your wellness.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-[#244d2b]">
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={18} /> GMP Certified</span>
                <span className="inline-flex items-center gap-2"><ShieldAlert size={18} /> Lab Tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSection title="Customer Bestsellers" products={[...products].reverse().slice(0, 4)} />

      <section className="bg-[#eef2e7] py-10">
        <div className="container grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="rounded-md border border-[#d9decf] bg-[#fffdf7] p-4 text-center">
                <Icon className="mx-auto text-[#315f3f]" size={26} />
                <p className="mt-3 text-sm font-bold text-[#263622]">{badge.label}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function ProductSection({ title, products: sectionProducts }: { title: string; products: any[] }) {
  return (
    <section className="bg-white py-10">
      <div className="container">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-2xl font-semibold text-[#1d1d1d] md:text-[2.025rem]">{title}</h2>
          <Link href="/collections/all" className="focus-ring hidden h-11 items-center gap-2 rounded-md bg-[#f3f6ef] px-6 text-sm font-bold text-[#305724] md:inline-flex">
            View all products <ArrowRight size={17} />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {sectionProducts.map((product) => (
            <ProductCard key={`${title}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollingBanner() {
  const items = ["ISO certified", "No added sugar", "GMP Certified", "No extracts used", "BPA Free", "Best in Quality"];

  return (
    <section className="overflow-hidden bg-[#305724] py-5 text-white md:py-6">
      <div className="flex min-w-max animate-[scroll-left_24s_linear_infinite] items-center gap-12 whitespace-nowrap text-base font-medium md:text-lg">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-10">
            {item}
            <span className="text-xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
