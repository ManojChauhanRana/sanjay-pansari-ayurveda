import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Cart | Krishna's Herbal & Ayurveda",
  description: "Review products in your cart."
};

export default function CartRoute() {
  return <CartPage />;
}
