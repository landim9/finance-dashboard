"use client";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

interface SummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function AnimatedValue({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 800;
      const steps = 40;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(timer);
        } else {
          setDisplay(current);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <span className="font-mono tabular-nums">
      {formatCurrency(display)}
    </span>
  );
}

export function SummaryCards({ totalIncome, totalExpense, balance }: SummaryCardsProps) {
  const cards = [
    {
      title: "Saldo Total",
      value: balance,
      icon: Wallet,
      accent: balance >= 0 ? "emerald" : "red",
      delay: 100,
    },
    {
      title: "Receitas",
      value: totalIncome,
      icon: TrendingUp,
      accent: "emerald",
      delay: 200,
    },
    {
      title: "Despesas",
      value: totalExpense,
      icon: TrendingDown,
      accent: "red",
      delay: 300,
    },
  ];

  const accentMap: Record<string, { bg: string; border: string; text: string; icon: string; glow: string }> = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      icon: "text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.08)]",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      icon: "text-red-400",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.08)]",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ title, value, icon: Icon, accent, delay }, i) => {
        const a = accentMap[accent];
        return (
          <div
            key={title}
            className={`glass glow-hover rounded-2xl p-5 animate-fade-up delay-${delay} ${a.glow}`}
            style={{ animationDelay: `${delay}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
                {title}
              </p>
              <div className={`${a.bg} ${a.border} border p-2 rounded-xl`}>
                <Icon size={16} className={a.icon} />
              </div>
            </div>
            <p className={`text-2xl font-semibold ${a.text} animate-count`}>
              <AnimatedValue value={value} delay={delay} />
            </p>
            <div className={`mt-3 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10 ${a.text}`} />
          </div>
        );
      })}
    </div>
  );
}