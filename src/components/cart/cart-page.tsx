"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getCartQuantity, getCartSubtotal, useCartStore } from "@/lib/cart-store";

const freeShippingThreshold = 399;

export function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-16">
          <div className="h-48 animate-pulse rounded-md bg-[#f3f6ef]" />
        </div>
      </main>
    );
  }

  const subtotal = getCartSubtotal(items);
  const quantity = getCartQuantity(items);
  const remainingForShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <main className="bg-white">
      <section className="border-b border-[#e1e3e1] bg-[#fbfaf4]">
        <div className="mx-auto max-w-[1400px] px-5 py-9 text-center md:py-12">
          <h1 className="text-[32px] font-semibold leading-tight text-[#242424] md:text-[42px]">Your cart</h1>
          <p className="mt-2 text-sm text-[#5d6258]">{quantity ? `${quantity} item${quantity === 1 ? "" : "s"} ready for checkout` : "Your cart is currently empty"}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-8 lg:py-12">
        {items.length ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              <div className="hidden grid-cols-[1fr_140px_110px] gap-5 border-b border-[#e1e3e1] pb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#6e725f] md:grid">
                <span>Product</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
              </div>

              {items.map((item) => (
                <article key={item.id} className="grid gap-4 border-b border-[#e1e3e1] py-5 md:grid-cols-[1fr_140px_110px] md:items-center md:gap-5">
                  <div className="flex gap-4">
                    <Link href={item.href ?? `/products/${item.id}`} className="relative size-24 shrink-0 overflow-hidden rounded-[10px] bg-[#f7f7f7] md:size-28">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
                    </Link>
                    <div className="min-w-0">
                      <Link href={item.href ?? `/products/${item.id}`} className="font-semibold leading-6 text-[#242424] hover:text-[#305724]">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-[#6e725f]">{item.unit ?? "Default Title"}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-semibold">₹{item.price}</span>
                        {item.mrp ? <span className="text-sm text-[#7d806f] line-through">₹{item.mrp}</span> : null}
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="focus-ring mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#b3452f]">
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="inline-flex w-fit min-h-11 items-center overflow-hidden rounded-md border border-[#d8ddd4]">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="focus-ring flex size-11 items-center justify-center" aria-label={`Decrease ${item.name} quantity`}>
                      <Minus size={16} />
                    </button>
                    <span className="flex h-11 min-w-12 items-center justify-center border-x border-[#d8ddd4] text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="focus-ring flex size-11 items-center justify-center" aria-label={`Increase ${item.name} quantity`}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="text-right text-base font-semibold text-[#242424]">₹{item.price * item.quantity}</p>
                </article>
              ))}

              <button type="button" onClick={clearCart} className="focus-ring text-sm font-semibold text-[#b3452f]">
                Clear cart
              </button>
            </div>

            <aside className="h-fit rounded-md border border-[#e1e3e1] bg-[#fbfaf4] p-5 lg:sticky lg:top-36">
              <h2 className="text-xl font-semibold text-[#242424]">Order summary</h2>
              <div className="mt-5 space-y-3 border-b border-[#e1e3e1] pb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5d6258]">Subtotal</span>
                  <span className="font-semibold text-[#242424]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5d6258]">Shipping</span>
                  <span className="font-semibold text-[#305724]">{remainingForShipping === 0 ? "Free" : "Calculated later"}</span>
                </div>
              </div>

              <div className="mt-5 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="mt-5 rounded-md bg-white p-4 text-sm text-[#4d5149]">
                {remainingForShipping === 0 ? "Free delivery unlocked for this cart." : `Add ₹${remainingForShipping} more to unlock free delivery above ₹399.`}
              </div>

              <button type="button" className="focus-ring mt-5 min-h-12 w-full rounded-md bg-[#305724] px-6 text-sm font-semibold text-white transition hover:bg-[#1e432b]">
                Proceed to checkout
              </button>
              <p className="mt-3 text-xs leading-5 text-[#6e725f]">Payment provider is intentionally skipped for now. This checkout button is ready to connect in the next backend/payment phase.</p>
            </aside>
          </div>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#eef5ea] text-[#305724]">
              <ShoppingBag size={30} />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-[#242424]">Your cart is empty</h2>
            <p className="mt-3 text-sm leading-6 text-[#5d6258]">Browse the products collection and add ayurvedic wellness products to your cart.</p>
            <Link href="/collections/all" className="focus-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#305724] px-6 text-sm font-semibold text-white">
              Continue shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
