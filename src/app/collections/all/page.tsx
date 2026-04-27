import type { Metadata } from "next";
import { ProductCollection } from "@/components/product/product-collection";
import { collectionProducts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Products | Krishna's Herbal & Ayurveda",
  description: "Browse Krishna's Herbal & Ayurveda products."
};

export default function ProductsCollectionPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-9 text-center md:py-12">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">Products</h1>
        </div>
      </section>

      <ProductCollection products={collectionProducts} totalCount={313} initialVisibleCount={20} />
    </main>
  );
}
