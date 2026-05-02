// components/dashboard/NovaConta.tsx
"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { criarConta } from "@/app/actions/contas";
import { BancoSelect } from "@/components/ui/BancoSelect";
import { CustomSelect } from "../ui/Dropdown";

export function NovaConta() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await criarConta(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      formRef.current?.reset();
      setOpen(false);
    }

    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass glow-hover rounded-xl px-4 py-2 text-sm text-slate-100 font-mono"
      >
        + Nova Conta
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass edge-line rounded-2xl p-6 w-full max-w-md space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100 font-mono">Nova Conta</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form ref={formRef} action={handleSubmit} className="space-y-3">
              {/* Banco */}
              <div className="relative">
                <BancoSelect />
              </div>

              {/* Saldo inicial */}
              <input
                name="saldo"
                type="number"
                step="0.01"
                min="0"
                placeholder="Saldo inicial (opcional)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />

            <CustomSelect
            name="tipo"
            placeholder="Tipo de conta"
            options={[
                { value: "CORRENTE",     label: "Conta Corrente" },
                { value: "POUPANCA",     label: "Poupança" },
                { value: "INVESTIMENTO", label: "Investimento" },
                { value: "CREDITO",      label: "Crédito" },  // ← substituído
            ]}
            required
            />

              {/* Erro */}
              {error && (
                <p className="text-xs text-red-400 font-mono">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full glass glow-hover rounded-xl py-2 text-sm font-mono text-slate-100 disabled:opacity-50 transition-all"
              >
                {loading ? "Salvando..." : "Criar Conta"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}