"use client";

import { useState } from "react";
import { Grid, List, Package } from "lucide-react";
import Link from "next/link";
import { ProductListItem } from "./product-list-item";

export function ProductListContainer({ products, allCategories }: { products: any[], allCategories: any[] }) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBadge, setFilterBadge] = useState("all");
  const [sortPrice, setSortPrice] = useState("none");

  // Get unique categories and badges for filters
  const usedCategoryIds = Array.from(new Set(products.flatMap(p => p.category_ids || [])));
  const allBadges = Array.from(new Set(products.flatMap(p => p.badges || [])));

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || (p.category_ids && p.category_ids.includes(filterCategory));
    const matchesBadge = filterBadge === "all" || (p.badges && p.badges.includes(filterBadge));
    return matchesSearch && matchesCategory && matchesBadge;
  }).sort((a, b) => {
    if (sortPrice === "low") return a.base_price - b.base_price;
    if (sortPrice === "high") return b.base_price - a.base_price;
    return 0;
  });

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e1e3e1] py-20 text-center">
        <Package size={48} className="text-[#c9c9c9]" />
        <p className="mt-4 font-semibold text-[#242424]">No products found</p>
        <p className="mt-1 text-sm text-[#5d6258]">Get started by adding your first product.</p>
        <Link href="/admin/products/new" className="mt-6 text-sm font-bold text-[#305724] hover:underline">
          Add a product now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#e1e3e1] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#305724] focus:outline-none"
            />
            <Package className="absolute left-3 top-2.5 text-[#c9c9c9]" size={18} />
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-[#e1e3e1] bg-white py-2 px-3 text-sm focus:border-[#305724] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {allCategories.filter(cat => usedCategoryIds.includes(cat.id)).map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select 
            value={filterBadge}
            onChange={(e) => setFilterBadge(e.target.value)}
            className="rounded-lg border border-[#e1e3e1] bg-white py-2 px-3 text-sm focus:border-[#305724] focus:outline-none"
          >
            <option value="all">All Badges</option>
            {allBadges.map(badge => <option key={badge} value={badge}>{badge}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <select 
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="rounded-lg border border-[#e1e3e1] bg-white py-2 px-3 text-sm focus:border-[#305724] focus:outline-none"
          >
            <option value="none">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          <div className="flex items-center gap-1 rounded-lg border border-[#e1e3e1] bg-white p-1">
            <button 
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${view === 'grid' ? 'bg-[#305724] text-white' : 'text-[#5d6258] hover:bg-[#f3f6ef]'}`}
            >
              <Grid size={14} />
              Grid
            </button>
            <button 
              onClick={() => setView('list')}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${view === 'list' ? 'bg-[#305724] text-white' : 'text-[#5d6258] hover:bg-[#f3f6ef]'}`}
            >
              <List size={14} />
              List
            </button>
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} view="grid" allCategories={allCategories} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#e1e3e1] bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-[#f3f6ef] text-xs font-bold uppercase tracking-wider text-[#305724]">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Badges</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e3e1]">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} view="list" allCategories={allCategories} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
