import { useState } from "react";
import { Edit, Trash2, ExternalLink, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { DeleteModal } from "./delete-modal";
import { ProductImage } from "@/components/product/product-image";

export function ProductListItem({ product, view = 'grid', allCategories = [] }: { product: any, view?: 'grid' | 'list', allCategories?: any[] }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const supabase = getSupabaseBrowserClient();

  const productCategoryNames = (product.category_ids || [])
    .map((id: string) => allCategories.find(c => c.id === id)?.name)
    .filter(Boolean);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    
    if (error) {
      alert("Error deleting product: " + error.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
    } else {
      window.location.reload();
    }
  };

  if (view === 'list') {
    return (
      <>
        <tr className={`hover:bg-[#fbfaf4] transition-colors ${isDeleting ? 'opacity-50' : ''}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded bg-[#f3f6ef] border border-[#e1e3e1]">
                {product.image_url ? (
                  <ProductImage src={product.image_url} alt={product.name} className="object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center text-[#c9c9c9]"><Package size={20} /></div>
                )}
              </div>
              <div className="font-bold text-[#242424]">{product.name}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {product.badges?.map((badge: string) => (
                <span key={badge} className="rounded-full bg-[#eef5ea] px-2 py-0.5 text-[10px] font-bold text-[#305724] border border-[#d8ddd4]">
                  {badge}
                </span>
              )) || <span className="text-[#c9c9c9] text-xs">No Badges</span>}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-[#305724]">
            ₹{product.base_price}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end gap-2">
              <Link href={`/products/${product.slug}`} target="_blank" className="p-1.5 text-[#5d6258] hover:text-[#305724] hover:bg-[#f3f6ef] rounded">
                <ExternalLink size={18} />
              </Link>
              <Link href={`/admin/products/edit/${product.id}`} className="p-1.5 text-[#305724] hover:bg-[#eef5ea] rounded">
                <Edit size={18} />
              </Link>
              <button onClick={() => setShowDeleteModal(true)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
        <DeleteModal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
          onConfirm={handleConfirmDelete} 
          title={product.name}
          loading={isDeleting}
        />
      </>
    );
  }

  return (
    <>
      <div className={`group relative overflow-hidden rounded-lg border border-[#e1e3e1] bg-white transition-shadow hover:shadow-md ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="aspect-square relative bg-[#fbfaf4]">
          {product.image_url ? (
            <ProductImage 
              src={product.image_url} 
              alt={product.name} 
              className="object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-[#c9c9c9]">
              <Package size={40} />
            </div>
          )}
          
          {/* Badge Overlay */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.badges.slice(0, 1).map((badge: string) => (
                <span key={badge} className="rounded bg-[#f26f21] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Link href={`/admin/products/edit/${product.id}`} className="rounded-full bg-white p-2 text-[#305724] hover:bg-[#f3f6ef]">
              <Edit size={18} />
            </Link>
            <button onClick={() => setShowDeleteModal(true)} className="rounded-full bg-white p-2 text-red-600 hover:bg-red-50">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1 overflow-hidden h-5">
            {productCategoryNames.length > 0 ? (
              productCategoryNames.map((name: string) => (
                <span key={name} className="text-[10px] font-bold uppercase tracking-wider text-[#305724]">
                  {name}
                </span>
              ))
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c9c9c9]">No Category</span>
            )}
          </div>
          <h3 className="mt-1 line-clamp-1 font-bold text-[#242424]">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-lg font-bold text-[#305724]">₹{product.base_price}</div>
            <Link href={`/products/${product.slug}`} target="_blank" className="text-[#5d6258] hover:text-[#305724]">
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        onConfirm={handleConfirmDelete} 
        title={product.name}
        loading={isDeleting}
      />
    </>
  );
}
