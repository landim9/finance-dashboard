"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { BANCOS_BR, type Banco } from "@/lib/bancos";
import { cn } from "@/lib/utils";

export function BancoSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Banco | null>(null);
  const [customName, setCustomName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPersonalizado = selected?.id === "personalizado";
  const nomeFinal = isPersonalizado ? customName : selected?.nome ?? "";

  return (
    <div ref={ref} className="space-y-2">
      {}
      <input type="hidden" name="banco" value={selected?.id ?? ""} />
      <input type="hidden" name="cor" value={selected?.cor ?? "#64748b"} />
      <input type="hidden" name="nome" value={nomeFinal} />

      {}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "bg-white/5 border rounded-lg px-3 py-2 text-sm font-mono",
          "transition-all duration-200 cursor-pointer",
          open
            ? "border-emerald-300/40 ring-2 ring-emerald-500/20"
            : "border-white/10 hover:border-white/20"
        )}
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selected.cor }}
              />
              <span className="text-slate-100">{selected.nome}</span>
            </>
          ) : (
            <span className="text-slate-400">Selecione o banco...</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={cn("text-slate-400 transition-transform duration-200 shrink-0", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-50 w-full mt-1 py-1 bg-[#0b111e] border border-white/10 rounded-lg shadow-xl max-h-56 overflow-y-auto">
          {BANCOS_BR.map((banco) => (
            <li
              key={banco.id}
              onClick={() => { setSelected(banco); setOpen(false); }}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-mono cursor-pointer transition-colors",
                selected?.id === banco.id
                  ? "text-emerald-300 bg-emerald-300/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: banco.cor }}
              />
              {banco.nome}
            </li>
          ))}
        </ul>
      )}

      {/* Campo extra para banco personalizado */}
      {isPersonalizado && (
        <input
          type="text"
          placeholder="Nome do banco ou carteira"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      )}
    </div>
  );
}