"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/site-data";

export function SearchPage({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return products.slice(0, 12);

    return products.filter((product) => {
      return [product.name, product.concern, product.unit ?? ""].some((value) => value.toLowerCase().includes(normalizedQuery));
    });
  }, [products, query]);

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1040px] px-5 py-10 text-center md:py-14">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">Search</h1>
          <div className="mx-auto mt-6 flex min-h-14 max-w-[680px] items-center rounded-[10px] border border-[#d8ddd4] bg-white px-4">
            <Search size={20} className="text-[#6e725f]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
            />
          </div>
          <p className="mt-3 text-sm text-[#5d6258]">{query ? `${results.length} results for "${query}"` : "Start typing to search the catalog"}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-8 md:py-12">
        {results.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-md border border-dashed border-[#d8ddd4] text-center">
            <h2 className="text-2xl font-semibold text-[#242424]">No matching products</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#5d6258]">Try a simpler keyword like aloe, acidity, combo, or shampoo.</p>
          </div>
        )}
      </section>
    </main>
  );
}
