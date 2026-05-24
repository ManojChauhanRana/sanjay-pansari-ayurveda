"use client";

import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  loading?: boolean;
}

export function DeleteModal({ isOpen, onClose, onConfirm, title, loading }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-[#5d6258] hover:text-[#242424]"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={28} />
          </div>
          
          <h3 className="text-xl font-bold text-[#242424]">Delete Product?</h3>
          <p className="mt-2 text-[#5d6258]">
            Are you sure you want to delete <span className="font-bold text-[#242424]">"{title}"</span>? This action cannot be undone.
          </p>

          <div className="mt-8 flex w-full gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-[#e1e3e1] py-2.5 font-bold text-[#242424] hover:bg-[#f3f6ef] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 py-2.5 font-bold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
