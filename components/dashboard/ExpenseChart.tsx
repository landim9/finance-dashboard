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

const PREMIUM_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

export function ExpenseChart({ transactions }: ExpenseChartProps) {
  const despesas = transactions.filter((t) => t.tipo === "DESPESA");

  const agrupado = despesas.reduce((acc, t) => {
    const key = t.categoria.nome;
    acc[key] = (acc[key] || 0) + t.valor;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(agrupado).map(([name, value]) => ({ name, value }));

  return (
    <div className="glass glow-hover rounded-2xl p-5 animate-fade-up delay-400">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-mono text-zinc-300 tracking-wide">
          Despesas por Categoria
        </h2>
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
          {data.length} categorias
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <defs>
            {data.map((_, i) => (
              <radialGradient key={i} id={`grad-${i}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={PREMIUM_COLORS[i % PREMIUM_COLORS.length]} stopOpacity={0.9} />
                <stop offset="100%" stopColor={PREMIUM_COLORS[i % PREMIUM_COLORS.length]} stopOpacity={0.6} />
              </radialGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={`url(#grad-${i})`} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0f0f1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#e8e8f0",
              boxShadow: "0 0 30px rgba(0,0,0,0.5)",
            }}
            formatter={(value) => {
              if (typeof value !== "number") return [String(value), ""];
              return [
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(value),
                "",
              ];
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: "#a0a0b8", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}