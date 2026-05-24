"use client";

import { AlertCircle, X } from "lucide-react";

interface FormErrorProps {
  message: string | null;
  onClear: () => void;
}

export function FormError({ message, onClear }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-3">
        <AlertCircle size={20} className="shrink-0 text-red-600" />
        <p className="font-medium">{message}</p>
      </div>
      <button 
        type="button" 
        onClick={onClear}
        className="rounded-md p-1 hover:bg-red-100 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
