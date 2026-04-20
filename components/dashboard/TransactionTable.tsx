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
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
      <h2 className="text-sm font-semibold text-zinc-700 mb-4">Transações Recentes</h2>
      <div className="space-y-3">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
            <div className="flex items-center gap-3">
              {t.tipo === "RECEITA" ? (
                <ArrowUpCircle size={20} className="text-green-500 shrink-0" />
              ) : (
                <ArrowDownCircle size={20} className="text-red-500 shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-zinc-800">{t.titulo}</p>
                <p className="text-xs text-zinc-400">{t.categoria.nome} · {formatDate(t.data)}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${t.tipo === "RECEITA" ? "text-green-600" : "text-red-600"}`}>
              {t.tipo === "RECEITA" ? "+" : "-"}{formatCurrency(t.valor)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}