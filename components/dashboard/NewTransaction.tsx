"use client";

import { useRef, useState } from "react";   
import { criarTransacao } from "@/app/dashboard/transacoes/actions";
import { CustomSelect } from "../ui/Dropdown";


type Props = {
    categorias: { id:string; nome: string }[];
    contas: { id:string; nome: string }[];
};

export function NovaTransacaoModal({ categorias, contas }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
  
    async function handleSubmit(formData: FormData) {
      setLoading(true);
      await criarTransacao(formData);
      formRef.current?.reset();
      setLoading(false);
      setOpen(false);
    }
  
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="glass glow-hover rounded-xl px-4 py-2 text-sm text-slate-100"
        >
          + Nova Transação
        </button>
  
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="glass edge-line rounded-2xl p-6 w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-100">Nova Transação</h2>
                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-100">
                  ✕
                </button>
              </div>
  
              <form ref={formRef} action={handleSubmit} className="space-y-3">
                <input
                  name="titulo"
                  placeholder="Título"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                />
  
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="valor"
                    type="number"
                    step="0.01"
                    placeholder="Valor"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                  />
                  <input
                    name="data"
                    type="date"
                    required
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
  
                <CustomSelect
                    name="tipo"
                    placeholder="Tipo"
                    options={[
                        { value: "RECEITA", label: "Receita" },
                        { value: "DESPESA", label: "Despesa" },
                    ]}
                    required
                    />
  
                <CustomSelect
                name="categoriaId"
                placeholder="Categoria"
                options={categorias.map((c) => ({ value: c.id, label: c.nome }))}
                required
                />
  
            
                <CustomSelect
                name="contaId"
                placeholder="Conta"
                options={contas.map((c) => ({ value: c.id, label: c.nome }))}
                required
                />

  
                <textarea
                  name="descricao"
                  placeholder="Descrição (opcional)"
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
                />
  
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full glass glow-hover rounded-xl py-2 text-sm text-slate-100 disabled:opacity-50"
                >
                  {loading ? "Salvando..." : "Salvar Transação"}
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }