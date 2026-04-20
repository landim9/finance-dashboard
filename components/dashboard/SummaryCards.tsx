import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
  const cards = [
    {
      title: "Saldo Total",
      value: balance,
      icon: Wallet,
      color: "bg-indigo-500",
      textColor: balance >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Total de Receitas",
      value: totalIncome,
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Total de Despesas",
      value: totalExpense,
      icon: TrendingDown,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ title, value, icon: Icon, color, textColor }) => (
        <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-500 font-medium">{title}</span>
            <div className={`${color} p-2 rounded-xl`}>
              <Icon size={18} className="text-white" />
            </div>
          </div>
          <p className={`text-2xl font-bold ${textColor}`}>{formatCurrency(value)}</p>
        </div>
      ))}
    </div>
  );
}