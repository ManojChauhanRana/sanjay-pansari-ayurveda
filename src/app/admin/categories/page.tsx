"use client";

import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Plus, Edit, Trash2, Save, X, Loader2, Tag } from "lucide-react";
import { getFriendlyErrorMessage } from "@/lib/error-utils";
import { FormError } from "@/components/admin/form-error";

export default function AdminCategoriesPage() {
  const supabase = getSupabaseBrowserClient();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editImage, setEditImage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("name");
    if (data) setCategories(data);
    setLoading(false);
  }

  const handleFileUpload = async (file: File, isNew: boolean) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `categories/${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('sanjay-pansari-products-images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('sanjay-pansari-products-images').getPublicUrl(filePath);
      if (isNew) setNewImage(publicUrl);
      else setEditImage(publicUrl);
    } catch (err: any) {
      setError(getFriendlyErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    if (!newName) return;
    setAdding(true);
    setError(null);
    const slug = newName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { data, error: addError } = await supabase.from("categories").insert([{ name: newName, slug, image_url: newImage }]).select();
    if (addError) {
      setError(getFriendlyErrorMessage(addError));
    } else {
      setCategories([...categories, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      setNewImage("");
    }
    setAdding(false);
  };

  const handleUpdate = async (id: string) => {
    if (!editName) return;
    setError(null);
    const slug = editName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { error: updateError } = await supabase.from("categories").update({ 
      name: editName, 
      slug, 
      image_url: editImage 
    }).eq("id", id);

    if (updateError) {
      setError(getFriendlyErrorMessage(updateError));
    } else {
      setCategories(categories.map(c => c.id === id ? { ...c, name: editName, slug, image_url: editImage } : c));
      setEditingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This may affect products in this category.")) return;
    setError(null);
    const { error: delError } = await supabase.from("categories").delete().eq("id", id);
    if (delError) {
      setError(getFriendlyErrorMessage(delError));
    } else {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-[#242424]">Manage Categories</h1>
        <p className="text-sm text-[#5d6258]">Create and manage the product categories and their showcase images.</p>
      </div>

      <FormError message={error} onClear={() => setError(null)} />

      {/* Add New Category */}
      <div className="rounded-lg border border-[#e1e3e1] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#305724]">Add New Category</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-[#5d6258] mb-1 uppercase">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
              placeholder="e.g. Brain Wellness"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-[#5d6258] mb-1 uppercase">Image URL (or upload)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="flex-1 rounded-md border border-[#e1e3e1] px-4 py-2 text-sm focus:border-[#305724] focus:outline-none"
                placeholder="https://..."
              />
              <label className="cursor-pointer bg-[#f3f6ef] p-2 rounded-md hover:bg-[#d1e1cd] transition-colors">
                <Plus size={20} className="text-[#305724]" />
                <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], true)} />
              </label>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !newName || uploading}
            className="flex items-center gap-2 rounded-md bg-[#305724] h-[38px] px-6 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {adding || uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            Add
          </button>
        </div>
        {newImage && (
          <div className="mt-4 flex items-center gap-3 p-2 border border-dashed border-[#d1e1cd] rounded-lg bg-[#fbfaf4]">
            <img src={newImage} alt="Preview" className="h-10 w-10 rounded-md object-cover" />
            <span className="text-xs text-[#5d6258] truncate">{newImage}</span>
            <button onClick={() => setNewImage("")} className="ml-auto text-red-500"><X size={14}/></button>
          </div>
        )}
      </div>

      {/* Categories List */}
      <div className="rounded-lg border border-[#e1e3e1] bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f3f6ef] text-xs font-bold uppercase tracking-wider text-[#305724]">
            <tr>
              <th className="px-6 py-4 w-16">Image</th>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e1e3e1]">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-[#5d6258]">
                  <Loader2 className="mx-auto animate-spin" size={24} />
                  <p className="mt-2">Loading categories...</p>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-[#5d6258]">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-[#fbfaf4]">
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-md bg-[#f3f6ef] overflow-hidden border border-[#e1e3e1] flex items-center justify-center">
                      {editingId === category.id ? (
                        <label className="cursor-pointer size-full flex items-center justify-center">
                           {editImage ? <img src={editImage} className="size-full object-cover" /> : <Plus size={16} />}
                           <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], false)} />
                        </label>
                      ) : (
                        category.image_url ? <img src={category.image_url} alt={category.name} className="h-full w-full object-cover" /> : <Tag size={16} className="text-[#c9c9c9]" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full rounded border border-[#305724] px-2 py-1 text-sm focus:outline-none"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          className="w-full rounded border border-[#e1e3e1] px-2 py-1 text-[10px] focus:outline-none"
                          placeholder="Image URL"
                        />
                      </div>
                    ) : (
                      <div className="font-medium text-[#242424]">
                        {category.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#5d6258]">
                    /{category.slug}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editingId === category.id ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleUpdate(category.id)} className="text-[#305724] hover:bg-green-50 p-1 rounded">
                          <Save size={18} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => { setEditingId(category.id); setEditName(category.name); setEditImage(category.image_url || ""); }} 
                          className="text-[#5d6258] hover:text-[#305724] hover:bg-[#f3f6ef] p-1 rounded"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)} 
                          className="text-[#5d6258] hover:text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
