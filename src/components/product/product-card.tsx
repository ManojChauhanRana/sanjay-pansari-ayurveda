"use client";

import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  const productHref = product.href ?? `/products/${product.id}`;
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group overflow-hidden rounded-[10px] bg-white pb-4 transition">
      <div className="relative aspect-square overflow-hidden rounded-[10px] bg-[#f7f7f7]">
        <Link href={productHref} className="absolute inset-0" aria-label={product.name}>
          <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
        </Link>
        {product.badge ? <span className="absolute left-3 top-3 rounded-md bg-[#de9d26] px-3 py-1 text-xs font-black text-white">{product.badge}</span> : null}
        <button
          type="button"
          onClick={addToCart}
          className="focus-ring absolute inset-x-4 bottom-4 hidden min-h-11 items-center justify-center rounded-md bg-[#f26f21] text-sm font-semibold text-white group-hover:flex"
        >
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
      <div className="px-2 pt-5 text-center">
        <Link href={productHref}>
          <h3 className="min-h-10 text-sm font-semibold leading-5 text-[#1d1d1d] md:text-base">{product.name}</h3>
        </Link>
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#0cd25b]">
          <Star size={15} fill="currentColor" />
          <span>4.9</span>
          <span className="text-[#6e725f]">({product.reviews})</span>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-center gap-2">
          <span className="text-sm font-semibold md:text-base">From ₹{product.price}</span>
          {product.mrp ? <span className="text-sm text-[#7d806f] line-through">₹{product.mrp}</span> : null}
        </div>
        <button type="button" onClick={addToCart} className="focus-ring mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[#f26f21] px-3 py-2 text-xs font-semibold text-white hover:bg-[#305724] md:hidden">
          <ShoppingCart size={17} />
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
