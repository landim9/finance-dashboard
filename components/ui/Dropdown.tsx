"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export function CustomSelect({
  name,
  options,
  placeholder = "Selecione...",
  required,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Input hidden para o form/server action funcionar */}
      <input
        type="hidden"
        name={name}
        value={selected?.value ?? ""}
        required={required}
      />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "bg-white/5 border rounded-lg px-3 py-2 text-sm font-mono",
          "transition-all duration-200 cursor-pointer",
          open
            ? "border-emerald-300/40 ring-2 ring-emerald-500/20 text-slate-100"
            : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
        )}
      >
        <span className={selected ? "text-slate-100" : ""}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            "text-slate-400 transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className={cn(
            "absolute z-50 w-full mt-1 py-1 overflow-hidden",
            "bg-[#0b111e] border border-white/10 rounded-lg shadow-xl",
            "animate-in fade-in-0 zoom-in-95 duration-100"
          )}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-mono cursor-pointer transition-colors",
                selected?.value === opt.value
                  ? "text-emerald-300 bg-emerald-300/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              {selected?.value === opt.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_rgba(61,217,180,0.8)]" />
              )}
              <span className={selected?.value === opt.value ? "" : "ml-3.5"}>
                {opt.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}