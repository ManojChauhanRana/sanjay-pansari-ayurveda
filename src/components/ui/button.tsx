import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition",
        variant === "primary" && "bg-[#315f3f] text-white hover:bg-[#1e432b]",
        variant === "secondary" && "border border-[#315f3f] bg-[#fffdf7] text-[#315f3f] hover:bg-[#edf3e8]",
        variant === "ghost" && "text-[#315f3f] hover:bg-[#edf3e8]",
        className
      )}
      {...props}
    />
  );
}
