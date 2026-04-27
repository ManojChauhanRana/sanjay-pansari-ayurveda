import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { collectionProducts, getProductBySlug, getProductSlug, getRelatedProducts } from "@/lib/site-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return collectionProducts.map((product) => ({
    slug: getProductSlug(product)
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: `${product.name} | Krishna's Herbal & Ayurveda`,
    description: `Buy ${product.name} from Krishna's Herbal & Ayurveda.`,
    openGraph: {
      title: product.name,
      images: [product.image]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);
  const compareAt = product.mrp ?? product.price + 2;
  const discount = Math.max(0, Math.round(((compareAt - product.price) / compareAt) * 100));

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
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
            {[product.image, product.image, product.image].map((image, index) => (
              <button key={`${product.id}-thumb-${index}`} className="focus-ring relative size-20 shrink-0 overflow-hidden rounded-[10px] border border-[#d8ddd4] bg-[#f7f7f7]">
                <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>

          <div className="order-1 md:order-2">
            <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#f7f7f7]">
              <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
              {discount ? <span className="absolute left-4 top-4 rounded-md bg-[#f26f21] px-3 py-1 text-xs font-bold text-white">{discount}% OFF</span> : null}
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
            <span className="text-[28px] font-semibold text-[#242424]">₹{product.price}</span>
            {product.mrp ? <span className="pb-1 text-base text-[#7d806f] line-through">₹{product.mrp}</span> : null}
            <span className="pb-1 text-sm font-medium text-[#305724]">Inclusive of all taxes</span>
          </div>

          <div className="mt-6 rounded-md border border-[#e1e3e1] bg-[#fbfaf4] p-4">
            <p className="text-sm font-semibold text-[#242424]">Size</p>
            <button className="focus-ring mt-3 min-h-11 rounded-md border border-[#305724] bg-white px-4 text-sm font-semibold text-[#305724]">
              {product.unit ?? "Default Title"}
            </button>
          </div>

          <div className="mt-6">
            <ProductPurchasePanel product={product} />
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
            {product.name} is part of Krishna's Herbal & Ayurveda {product.concern.toLowerCase()} range. This page is prepared from the current collection data and will later connect to the product database for full ingredients, usage, and inventory.
          </DetailBlock>
          <DetailBlock title="Benefits">
            Supports daily wellness routines with an ayurvedic product experience, clear product pricing, and simple quantity selection for checkout readiness.
          </DetailBlock>
          <DetailBlock title="How to use">
            Follow the dosage and usage guidance printed on the original product label. For health-specific questions, consult a qualified vaidya or healthcare professional.
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
