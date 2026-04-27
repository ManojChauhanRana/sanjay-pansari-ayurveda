import type { Metadata } from "next";
import Image from "next/image";
import { ProductCollection } from "@/components/product/product-collection";
import { offerProducts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Offers | Krishna's Herbal & Ayurveda",
  description: "Discount-led ayurvedic wellness picks and promotional product highlights."
};

export default function OffersPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:py-10">
          <div className="overflow-hidden rounded-[8px] bg-white shadow-sm">
            <div className="relative aspect-[16/5] w-full">
              <Image
                src="https://krishnaayurved.com/cdn/shop/collections/super-sale-and-special-offer-banner-design-png_227619.jpg?v=1623839850"
                alt="Offers"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[900px] px-2 py-8 text-center">
            <h1 className="text-[30px] font-semibold leading-tight text-[#242424] md:text-[42px]">Offers</h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#5d6258]">
              Quality health supplements, herbal juices, tablets, and wellness essentials presented in the same offer-led structure as the reference collection page.
            </p>
          </div>
        </div>
      </section>

      <ProductCollection products={offerProducts} totalCount={168} initialVisibleCount={20} />
    </main>
  );
}
