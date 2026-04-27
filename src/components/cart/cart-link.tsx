"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCartQuantity, useCartStore } from "@/lib/cart-store";

export function CartLink() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const quantity = mounted ? getCartQuantity(items) : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" className="focus-ring relative flex size-11 items-center justify-center" aria-label={`Cart with ${quantity} items`}>
      <ShoppingBag size={24} strokeWidth={2} />
      {quantity ? (
        <span className="absolute right-0 top-1 flex size-5 items-center justify-center rounded-full bg-[#f26f21] text-[10px] font-medium text-white">{quantity}</span>
      ) : null}
    </Link>
  );
}
