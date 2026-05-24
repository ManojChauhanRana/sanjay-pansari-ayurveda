"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Package, Image as ImageIcon, CheckCircle2, Upload, Loader2, Plus, X, Search, IndianRupee } from "lucide-react";
import Link from "next/link";
import { getFriendlyErrorMessage } from "@/lib/error-utils";
import { FormError } from "@/components/admin/form-error";

export default function NewComboPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [badgeInput, setBadgeInput] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category_ids: [] as string[],
    base_price: "",
    base_mrp: "",
    badges: [] as string[],
    image_url: "",
    is_combo: true,
  });

  // Selected Products for Combo
  const [selectedItems, setSelectedItems] = useState<{ id: string, name: string, price: number, quantity: number }[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data: cats } = await supabase.from("categories").select("id, name");
      if (cats) setCategories(cats);

      const { data: prods } = await supabase.from("products").select("id, name, base_price").eq('is_combo', false);
      if (prods) setAllProducts(prods);
    }
    loadData();
  }, [supabase]);

  const individualSum = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

  const filteredSearchProducts = useMemo(() => {
    if (!searchTerm) return [];
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !selectedItems.some(item => item.id === p.id)
    ).slice(0, 5);
  }, [searchTerm, allProducts, selectedItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      slug: name === "name" && !formData.slug ? value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : name === "slug" ? value : prev.slug
    }));
  };

  const addItem = (product: any) => {
    setSelectedItems(prev => [...prev, { id: product.id, name: product.name, price: product.base_price, quantity: 1 }]);
    setSearchTerm("");
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const toggleCategory = (id: string) => {
    setFormData(prev => ({
      ...prev,
      category_ids: prev.category_ids.includes(id) ? prev.category_ids.filter(i => i !== id) : [...prev.category_ids, id]
    }));
  };

  const addBadge = () => {
    if (!badgeInput || formData.badges.includes(badgeInput)) return;
    setFormData(prev => ({ ...prev, badges: [...prev.badges, badgeInput] }));
    setBadgeInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `products/combos/${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('sanjay-pansari-products-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('sanjay-pansari-products-images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      setError("Please add at least one product to the combo.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // 1. Create the Combo "Product"
      const { data: combo, error: comboErr } = await supabase.from("products").insert([
        {
          ...formData,
          base_price: parseFloat(formData.base_price),
          base_mrp: formData.base_mrp ? parseFloat(formData.base_mrp) : null,
        },
      ]).select().single();

      if (comboErr) throw comboErr;

      // 2. Link items in combo_items
      const itemLinks = selectedItems.map(item => ({
        combo_id: combo.id,
        product_id: item.id,
        quantity: item.quantity
      }));

      const { error: linkErr } = await supabase.from("combo_items").insert(itemLinks);
      if (linkErr) throw linkErr;

      setSuccess(true);
      setTimeout(() => router.push("/admin/combos"), 1500);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-4 text-green-600"><CheckCircle2 size={48} /></div>
        <h2 className="mt-4 text-2xl font-bold">Combo Created!</h2>
        <p className="mt-2 text-[#5d6258]">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/combos" className="rounded-full p-2 hover:bg-[#f3f6ef]">
          <ArrowLeft size={20} className="text-[#5d6258]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#242424]">New Combo Bundle</h1>
          <p className="text-sm text-[#5d6258]">Combine products into a single discounted offer.</p>
        </div>
      </div>

      <FormError message={error} onClear={() => setError(null)} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Combo Items Picker */}
        <div className="rounded-lg border border-[#305724] bg-[#fbfaf4] p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Bundle Items</h2>
          
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 text-[#c9c9c9]" size={18} />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products to add..."
                  className="w-full rounded-md border border-[#e1e3e1] pl-10 pr-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
                />
              </div>
            </div>
            {filteredSearchProducts.length > 0 && (
              <div className="absolute z-10 mt-1 w-full rounded-md border border-[#e1e3e1] bg-white shadow-lg overflow-hidden">
                {filteredSearchProducts.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => addItem(p)}
                    className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-[#f3f6ef]"
                  >
                    <span>{p.name}</span>
                    <span className="font-bold text-[#305724]">₹{p.base_price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            {selectedItems.map(item => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-[#e1e3e1] bg-white p-3">
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#242424]">{item.name}</p>
                  <p className="text-xs text-[#5d6258]">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-md border border-[#e1e3e1]">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-[#5d6258] hover:bg-[#f3f6ef]">-</button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-[#5d6258] hover:bg-[#f3f6ef]">+</button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
            {selectedItems.length === 0 && (
              <p className="text-center py-4 text-xs text-[#c9c9c9] border-2 border-dashed border-[#e1e3e1] rounded-md">No items added yet.</p>
            )}
          </div>

          <div className="pt-2 border-t border-[#305724]/20 flex justify-between items-center">
            <span className="text-sm font-medium text-[#5d6258]">Individual Sum:</span>
            <span className="text-lg font-black text-[#305724]">₹{individualSum}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Bundle Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-[#242424]">Combo Price (₹)</label>
              <input
                required
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={handleInputChange}
                placeholder={individualSum.toString()}
                className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#242424]">MRP (₹)</label>
              <input
                type="number"
                name="base_mrp"
                value={formData.base_mrp}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Categories & Badges */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Categories & Badges</h2>
          <div>
            <label className="block text-sm font-bold text-[#242424] mb-2">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border ${formData.category_ids.includes(cat.id) ? "bg-[#305724] text-white border-[#305724]" : "bg-white text-[#5d6258] border-[#e1e3e1]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-[#f3f6ef]">
            <label className="block text-sm font-bold text-[#242424] mb-2">Badges</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                placeholder="Type and press enter..."
                className="flex-1 rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.badges.map(badge => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-[#eef5ea] px-3 py-1 text-xs font-bold text-[#305724]">
                  {badge}
                  <button type="button" onClick={() => setFormData(p => ({ ...p, badges: p.badges.filter(b => b !== badge) }))}><X size={14}/></button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">General Details</h2>
          <div>
            <label className="block text-sm font-bold text-[#242424]">Combo Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#242424]">Slug</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#242424]">Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none" />
          </div>
        </div>

        {/* Media */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Image</h2>
          <div className="grid gap-6 sm:grid-cols-2 items-start">
            <div className="space-y-4">
              <label className="mt-1 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#305724] bg-[#f3f6ef] py-8 text-sm font-semibold text-[#305724] hover:bg-[#eef5ea]">
                {uploading ? <Loader2 className="animate-spin" /> : <Upload size={24} />}
                {uploading ? "Uploading..." : "Upload Bundle Image"}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </label>
              <input type="text" name="image_url" value={formData.image_url} onChange={handleInputChange} className="w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none" placeholder="Or paste image URL..." />
            </div>
            <div className="aspect-square flex items-center justify-center rounded-lg border border-[#e1e3e1] bg-[#fbfaf4] overflow-hidden">
              {formData.image_url ? <img src={formData.image_url} alt="Preview" className="size-full object-contain" /> : <ImageIcon size={40} className="opacity-20" />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#305724] py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save Combo
        </button>
      </form>
    </div>
  );
}
