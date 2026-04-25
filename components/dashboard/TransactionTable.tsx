import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Transacao {
  id: string;
  titulo: string;
  valor: number;
  tipo: string;
  data: Date;
  categoria: { nome: string; cor: string };
  conta: { nome: string };
}

interface TransactionTableProps {
  transactions: Transacao[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR").format(new Date(date));

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="glass edge-line glow-hover rounded-2xl p-5 animate-fade-up delay-500">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-mono text-slate-100 tracking-wide uppercase tracking-[0.18em]">
          Transações Recentes
        </h2>
        <span className="text-[10px] font-mono text-slate-300/80 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/10">
          {transactions.length} registros
        </span>
      </div>

      <div className="space-y-1.5">
        {transactions.map((t, i) => (
          <div
            key={t.id}
            className="group flex items-center justify-between px-3 py-3 rounded-xl border border-white/0 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-150"
            style={{ animationDelay: `${500 + i * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg border ${t.tipo === "RECEITA" ? "bg-emerald-400/10 border-emerald-300/30" : "bg-rose-400/10 border-rose-300/30"}`}>
                {t.tipo === "RECEITA" ? (
                  <ArrowUpCircle size={16} className="text-emerald-300" />
                ) : (
                  <ArrowDownCircle size={16} className="text-rose-300" />
                )}
              </div>
              <div>
                <p className="text-sm font-mono text-slate-100 leading-tight">{t.titulo}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded-md border"
                    style={{
                      color: t.categoria.cor,
                      borderColor: `${t.categoria.cor}30`,
                      backgroundColor: `${t.categoria.cor}10`,
                    }}
                  >
                    {t.categoria.nome}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {formatDate(t.data)}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`text-sm font-mono font-semibold tabular-nums ${
                t.tipo === "RECEITA" ? "text-emerald-200" : "text-rose-200"
              }`}
            >
              {t.tipo === "RECEITA" ? "+" : "−"}{formatCurrency(t.valor)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}