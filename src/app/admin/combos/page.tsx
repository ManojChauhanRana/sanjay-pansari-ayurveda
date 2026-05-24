import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProductListContainer } from "@/components/admin/product-list-container";

export default async function AdminCombosPage() {
  const supabase = await getSupabaseServerClient();
  
  // 1. Fetch combos (is_combo = true)
  const { data: combos, error: comboError } = await supabase
    .from('products')
    .select('*')
    .eq('is_combo', true)
    .order('created_at', { ascending: false });

  // 2. Fetch categories for mapping
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');

  if (comboError) {
    return <div className="text-red-500">Error loading combos: {comboError.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#242424]">Combo Management</h1>
          <p className="text-sm text-[#5d6258]">Create and manage bundled product offers.</p>
        </div>
        <Link 
          href="/admin/combos/new"
          className="focus-ring inline-flex items-center gap-2 rounded-md bg-[#305724] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          Create Combo
        </Link>
      </div>

      <ProductListContainer products={combos || []} allCategories={categories || []} />
    </div>
  );
}
