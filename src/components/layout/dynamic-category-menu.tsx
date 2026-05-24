import { getSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProductImage } from "@/components/product/product-image";

export async function DynamicCategoryMenu() {
  const supabase = await getSupabaseServerClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, image_url")
    .order("name");

  if (!categories || categories.length === 0) return null;

  return (
    <li className="group px-4">
      <Link href="/collections/all" className="flex items-center gap-2 py-4 transition hover:text-[#305724]">
        <span>Category</span>
        <ChevronDown size={15} strokeWidth={2} className="transition duration-300 group-hover:rotate-180" />
      </Link>
      
      {/* Mega Menu Dropdown */}
      <div className="invisible absolute left-0 top-[100%] w-full overflow-hidden bg-white text-[#1d1d1d] opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100 z-[100]">
        <div className="mx-auto max-h-[85vh] max-w-[1400px] overflow-y-auto px-10 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/collections/${cat.slug}`} 
                className="group/item flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#f7f7f7] transition-all duration-300 group-hover/item:shadow-lg group-hover/item:scale-[1.02]">
                  {cat.image_url ? (
                    <ProductImage 
                      src={cat.image_url} 
                      alt={cat.name} 
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f3f6ef] text-[#305724] font-bold">
                      {cat.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="mt-3 text-sm font-bold text-[#242424] transition-colors group-hover/item:text-[#305724]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
