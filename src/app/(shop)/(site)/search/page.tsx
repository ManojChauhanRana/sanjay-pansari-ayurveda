import type { Metadata } from "next";
import { SearchPage } from "@/components/search/search-page";
import { collectionProducts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Search | Krishna's Herbal & Ayurveda",
  description: "Search the current product catalog."
};

export default function SearchRoute() {
  return <SearchPage products={collectionProducts} />;
}
