"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Transacao {
  tipo: string;
  valor: number;
  categoria: { nome: string; cor: string };
}

interface ExpenseChartProps {
  transactions: Transacao[];
}

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const despesas = transactions.filter((t) => t.tipo === "DESPESA");

  const agrupado = despesas.reduce((acc, t) => {
    const key = t.categoria.nome;
    acc[key] = (acc[key] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(agrupado).map(([name, value]) => ({ name, value }));

  const cores = despesas.reduce((acc, t) => {
    acc[t.categoria.nome] = t.categoria.cor;
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
              <Cell key={entry.name} fill={cores[entry.name] ?? "#6366f1"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}