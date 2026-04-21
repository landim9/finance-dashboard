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
    <div className="glass glow-hover rounded-2xl p-5 animate-fade-up delay-500">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-mono text-zinc-300 tracking-wide">
          Transações Recentes
        </h2>
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
          {transactions.length} registros
        </span>
      </div>

      <div className="space-y-1">
        {transactions.map((t, i) => (
          <div
            key={t.id}
            className="group flex items-center justify-between px-3 py-3 rounded-xl border border-transparent hover:bg-white/[0.03] hover:border-white/5 transition-all duration-150"
            style={{ animationDelay: `${500 + i * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${t.tipo === "RECEITA" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                {t.tipo === "RECEITA" ? (
                  <ArrowUpCircle size={16} className="text-emerald-400" />
                ) : (
                  <ArrowDownCircle size={16} className="text-red-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-mono text-zinc-200 leading-tight">{t.titulo}</p>
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
                  <span className="text-[10px] font-mono text-zinc-600">
                    {formatDate(t.data)}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`text-sm font-mono font-semibold tabular-nums ${
                t.tipo === "RECEITA" ? "text-emerald-400" : "text-red-400"
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