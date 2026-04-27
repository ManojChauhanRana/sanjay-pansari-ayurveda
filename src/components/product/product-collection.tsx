"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Filter, Grid2X2, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type SortOption = "Best selling" | "Alphabetically, A-Z" | "Price, low to high" | "Price, high to low";

type FilterGroup = {
  title: "Availability" | "Price" | "Product type";
  options: string[];
};

const filterGroups: FilterGroup[] = [
  {
    title: "Availability",
    options: ["In stock", "Out of stock"]
  },
  {
    title: "Price",
    options: ["₹0 - ₹250", "₹250 - ₹500", "₹500 - ₹750", "₹750+"]
  },
  {
    title: "Product type",
    options: ["Juices", "Combos", "Cosmetics", "Herbal Powders/Churna"]
  }
];

const sortOptions: SortOption[] = ["Best selling", "Alphabetically, A-Z", "Price, low to high", "Price, high to low"];

export function ProductCollection({
  products,
  totalCount = products.length,
  initialVisibleCount = 12
}: {
  products: Product[];
  totalCount?: number;
  initialVisibleCount?: number;
}) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState<SortOption>("Best selling");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeFilterCount = Object.values(selectedFilters).reduce((sum, options) => sum + options.length, 0);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const availability = selectedFilters.Availability ?? [];
        if (availability.includes("Out of stock")) return false;
        return true;
      })
      .filter((product) => {
        const priceRanges = selectedFilters.Price ?? [];
        if (!priceRanges.length) return true;

        return priceRanges.some((range) => {
          if (range === "₹0 - ₹250") return product.price <= 250;
          if (range === "₹250 - ₹500") return product.price > 250 && product.price <= 500;
          if (range === "₹500 - ₹750") return product.price > 500 && product.price <= 750;
          return product.price > 750;
        });
      })
      .filter((product) => {
        const productTypes = selectedFilters["Product type"] ?? [];
        if (!productTypes.length) return true;
        return productTypes.includes(product.concern);
      })
      .sort((a, b) => {
        if (sort === "Alphabetically, A-Z") return a.name.localeCompare(b.name);
        if (sort === "Price, low to high") return a.price - b.price;
        if (sort === "Price, high to low") return b.price - a.price;
        return products.findIndex((product) => product.id === a.id) - products.findIndex((product) => product.id === b.id);
      });
  }, [products, selectedFilters, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProducts.length;

  function toggleFilter(group: string, option: string) {
    setVisibleCount(initialVisibleCount);
    setSelectedFilters((current) => {
      const groupFilters = current[group] ?? [];
      const nextGroupFilters = groupFilters.includes(option) ? groupFilters.filter((item) => item !== option) : [...groupFilters, option];
      return { ...current, [group]: nextGroupFilters };
    });
  }

  function clearFilters() {
    setSelectedFilters({});
    setVisibleCount(initialVisibleCount);
  }

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-6 md:py-9">
      <div className="mb-6 flex flex-col gap-4 border-b border-[#e1e3e1] pb-5 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="focus-ring flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#d8ddd4] bg-white px-4 text-sm font-medium text-[#242424] lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filter and sort
          {activeFilterCount ? <span className="rounded-full bg-[#305724] px-2 py-0.5 text-xs text-white">{activeFilterCount}</span> : null}
        </button>

        <div className="hidden items-center gap-3 text-sm text-[#5d6258] lg:flex">
          <Filter size={18} />
          <span>Filter:</span>
          {filterGroups.map((group) => (
            <button key={group.title} type="button" className="focus-ring flex min-h-10 items-center gap-2 rounded-md border border-[#d8ddd4] px-4 font-medium text-[#242424]">
              {group.title}
              <ChevronDown size={16} />
            </button>
          ))}
          {activeFilterCount ? (
            <button type="button" onClick={clearFilters} className="focus-ring min-h-10 rounded-md px-3 text-sm font-medium text-[#305724]">
              Clear all
            </button>
          ) : null}
        </div>

        <SortAndCount sort={sort} setSort={setSort} filteredCount={filteredProducts.length} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-36 space-y-7">
            <FilterControls selectedFilters={selectedFilters} onToggle={toggleFilter} />
          </div>
        </aside>

        <div>
          {visibleProducts.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-md border border-dashed border-[#d8ddd4] px-5 text-center">
              <h2 className="text-xl font-semibold text-[#242424]">No products found</h2>
              <p className="mt-2 max-w-md text-sm text-[#5d6258]">Try clearing filters or selecting a different price range.</p>
              <button type="button" onClick={clearFilters} className="focus-ring mt-5 min-h-11 rounded-md bg-[#305724] px-6 text-sm font-semibold text-white">
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p className="mb-3 text-sm text-[#4d5149]">Showing {visibleProducts.length}/{totalCount}</p>
            <div className="h-1 w-56 overflow-hidden rounded-full bg-[#e1e3e1]">
              <div className="h-full rounded-full bg-[#305724]" style={{ width: `${Math.min((visibleProducts.length / totalCount) * 100, 100)}%` }} />
            </div>
            {canLoadMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + 8)}
                className="focus-ring mt-6 min-h-11 rounded-md bg-[#305724] px-6 text-sm font-semibold text-white transition hover:bg-[#1e432b]"
              >
                Load more
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className={cn("fixed inset-0 z-[70] bg-black/40 transition lg:hidden", mobileFiltersOpen ? "visible opacity-100" : "invisible opacity-0")} aria-hidden={!mobileFiltersOpen}>
        <div className={cn("ml-auto flex h-full w-[min(420px,92vw)] flex-col bg-white transition duration-300", mobileFiltersOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex min-h-16 items-center justify-between border-b border-[#e1e3e1] px-5">
            <div>
              <p className="text-sm font-semibold text-[#242424]">Filter and sort</p>
              <p className="text-xs text-[#5d6258]">{filteredProducts.length} products</p>
            </div>
            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="focus-ring flex size-10 items-center justify-center rounded-full bg-[#f3f6ef]" aria-label="Close filters">
              <X size={19} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <SortAndCount sort={sort} setSort={setSort} filteredCount={filteredProducts.length} compact />
            <div className="mt-6 space-y-7">
              <FilterControls selectedFilters={selectedFilters} onToggle={toggleFilter} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-[#e1e3e1] p-5">
            <button type="button" onClick={clearFilters} className="focus-ring min-h-11 rounded-md border border-[#305724] text-sm font-semibold text-[#305724]">
              Clear all
            </button>
            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="focus-ring min-h-11 rounded-md bg-[#305724] text-sm font-semibold text-white">
              Apply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SortAndCount({
  sort,
  setSort,
  filteredCount,
  compact = false
}: {
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  filteredCount: number;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", compact && "items-start")}>
      <label className={cn("flex items-center gap-3 text-sm text-[#5d6258]", compact && "w-full flex-col items-start gap-2")}>
        <span>Sort by:</span>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortOption)}
          className="focus-ring min-h-10 rounded-md border border-[#d8ddd4] bg-white px-3 text-sm font-medium text-[#242424]"
        >
          {sortOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      {!compact ? (
        <div className="hidden items-center gap-2 text-sm text-[#5d6258] md:flex">
          <Grid2X2 size={18} />
          <span>{filteredCount} products</span>
        </div>
      ) : null}
    </div>
  );
}

function FilterControls({
  selectedFilters,
  onToggle
}: {
  selectedFilters: Record<string, string[]>;
  onToggle: (group: string, option: string) => void;
}) {
  return (
    <>
      {filterGroups.map((group) => (
        <div key={group.title} className="border-b border-[#e1e3e1] pb-6">
          <h2 className="mb-4 text-sm font-semibold text-[#242424]">{group.title}</h2>
          <div className="space-y-3">
            {group.options.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-3 text-sm text-[#4d5149]">
                <input
                  type="checkbox"
                  checked={(selectedFilters[group.title] ?? []).includes(option)}
                  onChange={() => onToggle(group.title, option)}
                  className="size-4 accent-[#305724]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
