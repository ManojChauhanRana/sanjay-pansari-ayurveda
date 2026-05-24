import type { Metadata } from "next";
import Link from "next/link";
import { Star, Truck, ShieldCheck, PackageCheck, Home, Search, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { getProductBySlug, getRelatedProducts } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProductImage } from "@/components/product/product-image";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getProduct(slug: string) {
  // 1. Try hardcoded first
  const hardcoded = getProductBySlug(slug);
  if (hardcoded) return hardcoded;

  // 2. Try Database
  const supabase = await getSupabaseServerClient();
  const { data: dbProduct } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (dbProduct) {
    // Fetch category names for the IDs
    const { data: cats } = await supabase
      .from('categories')
      .select('name')
      .in('id', dbProduct.category_ids || []);

    return {
      id: dbProduct.id,
      name: dbProduct.name,
      concern: cats?.map(c => c.name).join(", ") || "Ayurveda",
      price: dbProduct.base_price,
      mrp: dbProduct.base_mrp,
      reviews: 0,
      image: dbProduct.image_url,
      badges: dbProduct.badges || [],
      unit: "Standard",
      description: dbProduct.description,
      benefits: dbProduct.benefits,
      how_to_use: dbProduct.how_to_use,
    };
  }

  return null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | Sanjay Pansari Ayurveda`,
    description: product.description || `Buy ${product.name} from Sanjay Pansari Ayurveda.`,
    openGraph: {
      title: product.name,
      images: [product.image]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  // ... rest of the logic

  if (!product) {
    return (
      <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#fbfaf4] px-6 text-center">
        <div className="relative mb-8">
          <h1 className="text-[120px] font-black leading-none text-[#305724] opacity-10 md:text-[200px]">404</h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img src="/images/client/logo.png" alt="Logo" className="mb-4 h-16 w-16 object-contain md:h-24 md:w-24" />
            <h2 className="text-2xl font-bold text-[#242424] md:text-3xl">Page Not Found</h2>
          </div>
        </div>
        <p className="max-w-md text-[#5d6258] md:text-lg">Oops! This product doesn't exist. Try searching or return home.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="flex items-center justify-center gap-2 rounded-full bg-[#305724] px-8 py-3 font-bold text-white transition-transform hover:scale-105">
            <Home size={18} /> Back to Home
          </Link>
          <Link href="/collections/all" className="flex items-center justify-center gap-2 rounded-full border-2 border-[#305724] px-8 py-3 font-bold text-[#305724] transition-transform hover:scale-105">
            <Search size={18} /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product as any);
  const price = Number(product.price);
  const mrp = product.mrp ? Number(product.mrp) : price + 100;
  const discount = Math.max(0, Math.round(((mrp - price) / mrp) * 100));

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-5 py-4 text-xs text-[#5d6258]">
          <Link href="/" className="hover:text-[#305724]">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/collections/all" className="hover:text-[#305724]">
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="line-clamp-1 text-[#242424]">{product.name}</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-5 py-8 lg:grid-cols-[58%_1fr] lg:gap-12 lg:py-12">
        <div className="grid gap-4 md:grid-cols-[88px_1fr]">
          {/* Only show thumbnails if there's a reason to (e.g. if we had an array of images) */}
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
            {/* For now, we only have one main image in the DB, so we hide thumbnails to keep it clean */}
          </div>

          <div className="order-1 md:order-2 col-span-full">
            <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#f7f7f7]">
              {product.image && (
                <ProductImage src={product.image} alt={product.name} className="object-cover" />
              )}
              {discount > 0 && <span className="absolute left-4 top-4 rounded-md bg-[#f26f21] px-3 py-1 text-xs font-bold text-white">{discount}% OFF</span>}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="mb-3 inline-flex rounded-full bg-[#eef5ea] px-3 py-1 text-xs font-semibold text-[#305724]">{product.concern}</div>
          <h1 className="text-[30px] font-semibold leading-tight text-[#242424] md:text-[38px]">{product.name}</h1>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-[#0fbd57]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="font-medium text-[#242424]">4.9</span>
            <span className="text-[#6e725f]">({product.reviews} reviews)</span>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <span className="text-[28px] font-semibold text-[#242424]">₹{price}</span>
            {mrp > price && <span className="pb-1 text-base text-[#7d806f] line-through">₹{mrp}</span>}
            <span className="pb-1 text-sm font-medium text-[#305724]">Inclusive of all taxes</span>
          </div>

          <div className="mt-6 rounded-md border border-[#e1e3e1] bg-[#fbfaf4] p-4">
            <p className="text-sm font-semibold text-[#242424]">Size</p>
            <button className="focus-ring mt-3 min-h-11 rounded-md border border-[#305724] bg-white px-4 text-sm font-semibold text-[#305724]">
              {product.unit ?? "1000 ml"}
            </button>
          </div>

          <div className="mt-6">
            <ProductPurchasePanel product={product as any} />
          </div>

          <div className="mt-6 grid gap-3 text-sm text-[#4d5149] sm:grid-cols-3">
            <TrustItem icon={<Truck size={18} />} label="Fast delivery" />
            <TrustItem icon={<ShieldCheck size={18} />} label="GMP certified" />
            <TrustItem icon={<PackageCheck size={18} />} label="Secure packing" />
          </div>
        </aside>
      </section>

      <section className="border-y border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 lg:grid-cols-3">
          <DetailBlock title="Product details">
            {product.description || `Sanjay Pansari ${product.name} is a premium Ayurvedic solution crafted for your wellness.`}
          </DetailBlock>
          <DetailBlock title="Benefits">
            {product.benefits || "Supports overall vitality and helps maintain natural balance in the body through traditional herbal wisdom."}
          </DetailBlock>
          <DetailBlock title="How to use">
            {product.how_to_use || "Follow the dosage instructions on the package or as directed by an Ayurvedic practitioner."}
          </DetailBlock>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="mx-auto max-w-[1400px] px-5 py-12">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#305724]">More from {product.concern}</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#242424]">Related products</h2>
            </div>
            <Link href="/collections/all" className="hidden text-sm font-semibold text-[#305724] hover:text-[#1e432b] md:inline">
              View all products
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex min-h-12 items-center gap-3 rounded-md bg-[#f3f6ef] px-3">
      <span className="text-[#305724]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article>
      <h2 className="mb-3 text-lg font-semibold text-[#242424]">{title}</h2>
      <p className="text-sm leading-7 text-[#4d5149]">{children}</p>
    </article>
  );
}
