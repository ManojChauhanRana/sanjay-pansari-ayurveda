"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/site-data";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function addToCart() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  function buyNow() {
    addItem(product, quantity);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-medium text-[#242424]">Quantity</p>
        <div className="inline-flex min-h-12 items-center overflow-hidden rounded-md border border-[#d8ddd4]">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="focus-ring flex size-12 items-center justify-center bg-white text-[#242424]"
            aria-label="Decrease quantity"
          >
            <Minus size={17} />
          </button>
          <span className="flex h-12 min-w-14 items-center justify-center border-x border-[#d8ddd4] text-sm font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
            className="focus-ring flex size-12 items-center justify-center bg-white text-[#242424]"
            aria-label="Increase quantity"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={addToCart}
        className="focus-ring flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#f26f21] px-6 text-sm font-semibold text-white transition hover:bg-[#305724]"
      >
        <ShoppingBag size={18} />
        Add to cart
      </button>

      <button type="button" onClick={buyNow} className="focus-ring min-h-12 w-full rounded-md bg-[#305724] px-6 text-sm font-semibold text-white transition hover:bg-[#1e432b]">
        Buy it now
      </button>

      <p className="min-h-5 text-sm font-medium text-[#305724]" role="status">
        {added ? `${quantity} x ${product.name} added to cart preview.` : ""}
      </p>
    </div>
  );
}
