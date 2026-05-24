"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Package, Image as ImageIcon, CheckCircle2, Upload, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { getFriendlyErrorMessage } from "@/lib/error-utils";
import { FormError } from "@/components/admin/form-error";

export default function NewProductPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
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
    benefits: "",
    how_to_use: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase.from("categories").select("id, name");
    if (data) setCategories(data);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError(null);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "name" && !formData.slug ? value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : name === "slug" ? value : prev.slug
    }));
  };

  const toggleCategory = (id: string) => {
    setFormData(prev => ({
      ...prev,
      category_ids: prev.category_ids.includes(id) 
        ? prev.category_ids.filter(item => item !== id)
        : [...prev.category_ids, id]
    }));
  };

  const addBadge = () => {
    if (!badgeInput || formData.badges.includes(badgeInput)) return;
    setFormData(prev => ({ ...prev, badges: [...prev.badges, badgeInput] }));
    setBadgeInput("");
  };

  const removeBadge = (badge: string) => {
    setFormData(prev => ({ ...prev, badges: prev.badges.filter(b => b !== badge) }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sanjay-pansari-products-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('sanjay-pansari-products-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return;
    setError(null);
    const slug = newCategoryName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data, error: catError } = await supabase.from("categories").insert([{ name: newCategoryName, slug }]).select();
    if (catError) {
      setError(getFriendlyErrorMessage(catError));
    } else {
      const newCat = data[0];
      setCategories([...categories, newCat]);
      setFormData(prev => ({ ...prev, category_ids: [...prev.category_ids, newCat.id] }));
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from("products").insert([
        {
          ...formData,
          base_price: parseFloat(formData.base_price),
          base_mrp: formData.base_mrp ? parseFloat(formData.base_mrp) : null,
        },
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-4 text-green-600">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-[#242424]">Product Created!</h2>
        <p className="mt-2 text-[#5d6258]">The new product has been successfully added to the store.</p>
        <p className="mt-4 text-sm font-medium text-[#305724]">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="rounded-full p-2 hover:bg-[#f3f6ef]">
          <ArrowLeft size={20} className="text-[#5d6258]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#242424]">Add New Product</h1>
          <p className="text-sm text-[#5d6258]">Create a dynamic Ayurvedic product listing.</p>
        </div>
      </div>

      <FormError message={error} onClear={() => setError(null)} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Basic Details</h2>
          
          <div>
            <label className="block text-sm font-bold text-[#242424]">Product Name</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
              placeholder="e.g. She Care Juice"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#242424]">Slug (URL Path)</label>
            <input
              required
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#242424]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#242424]">Benefits</label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#242424]">How to Use</label>
            <textarea
              name="how_to_use"
              value={formData.how_to_use}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
            />
          </div>
        </div>

        {/* Categories & Badges */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Categories & Badges</h2>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-[#242424]">Select Categories (Multiple)</label>
              <button 
                type="button" 
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="text-xs font-bold text-[#305724] flex items-center gap-1"
              >
                {showAddCategory ? <X size={14} /> : <Plus size={14} />}
                {showAddCategory ? "Cancel" : "New Category"}
              </button>
            </div>
            
            {showAddCategory && (
              <div className="mb-4 flex gap-2">
                <input 
                  type="text" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 rounded-md border border-[#305724] px-3 py-1.5 text-sm focus:outline-none"
                  placeholder="New Category Name..."
                />
                <button 
                  type="button" 
                  onClick={handleAddCategory}
                  className="bg-[#305724] text-white px-4 py-1.5 rounded text-sm font-bold"
                >
                  Add
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition-colors ${
                    formData.category_ids.includes(cat.id)
                      ? "bg-[#305724] text-white border-[#305724]"
                      : "bg-white text-[#5d6258] border-[#e1e3e1] hover:border-[#305724]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#f3f6ef]">
            <label className="block text-sm font-bold text-[#242424] mb-2">Badges (e.g. Best Seller, Organic)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBadge())}
                className="flex-1 rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
                placeholder="Type and press enter..."
              />
              <button 
                type="button" 
                onClick={addBadge}
                className="bg-[#f3f6ef] text-[#305724] px-4 py-2 rounded text-sm font-bold border border-[#e1e3e1]"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.badges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-[#eef5ea] px-3 py-1 text-xs font-bold text-[#305724]">
                  {badge}
                  <button type="button" onClick={() => removeBadge(badge)} className="hover:text-red-500">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-[#242424]">Selling Price (₹)</label>
              <input
                required
                type="number"
                name="base_price"
                value={formData.base_price}
                onChange={handleInputChange}
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

        {/* Media */}
        <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#305724]">Product Image</h2>
          <div className="grid gap-6 sm:grid-cols-2 items-start">
            <div className="space-y-4">
              <label className="mt-1 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#305724] bg-[#f3f6ef] py-8 text-sm font-semibold text-[#305724] transition-colors hover:bg-[#eef5ea]">
                {uploading ? <Loader2 className="animate-spin" size={24} /> : <Upload size={24} />}
                {uploading ? "Uploading..." : "Upload from Device"}
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </label>
              <div className="relative text-center">
                <span className="bg-white px-2 text-xs text-[#5d6258] uppercase">Or URL</span>
                <div className="absolute inset-0 -z-10 flex items-center"><span className="w-full border-t border-[#e1e3e1]" /></div>
              </div>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="aspect-square flex items-center justify-center rounded-lg border border-[#e1e3e1] bg-[#fbfaf4] overflow-hidden">
              {formData.image_url ? (
                <img src={formData.image_url} alt="Preview" className="size-full object-contain" />
              ) : (
                <div className="text-center text-[#c9c9c9]">
                  <ImageIcon size={40} className="mx-auto opacity-20" />
                  <p className="mt-2 text-xs">Preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#305724] py-4 text-lg font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save Product
        </button>
      </form>
    </div>
  );
}
