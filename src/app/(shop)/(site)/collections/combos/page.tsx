import type { Metadata } from "next";
import Image from "next/image";
import { ProductCollection } from "@/components/product/product-collection";
import { comboProducts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Combos | Krishna's Herbal & Ayurveda",
  description: "Curated combo packs and bundled ayurvedic wellness pairings."
};

export default function CombosPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:py-10">
          <div className="overflow-hidden rounded-[8px] bg-white shadow-sm">
            <div className="relative aspect-[16/5] w-full">
              <Image
                src="https://krishnaayurved.com/cdn/shop/collections/1200x1200-11.jpg?v=1623838524"
                alt="Combos"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[900px] px-2 py-8 text-center">
            <h1 className="text-[30px] font-semibold leading-tight text-[#242424] md:text-[42px]">Combos</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#5d6258]">
              Ayurveda-led product pairings for daily wellness routines, digestive balance, heart care, skin support, and value packs inspired by the source collection.
            </p>
          </div>
        </div>
      </section>

      <ProductCollection products={comboProducts} totalCount={110} initialVisibleCount={20} />
    </main>
  );
}
