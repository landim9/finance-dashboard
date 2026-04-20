"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Transaction {
  type: string;
  amount: number;
  category: { name: string; color: string };
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const expenses = transactions.filter((t) => t.type === "EXPENSE");

  const grouped = expenses.reduce((acc, t) => {
    const key = t.category.name;
    acc[key] = (acc[key] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  const colors = expenses.reduce((acc, t) => {
    acc[t.category.name] = t.category.color;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
      <h2 className="text-sm font-semibold text-zinc-700 mb-4">Despesas por Categoria</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name] ?? "#6366f1"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              typeof value === "number"
                ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
                : value
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}