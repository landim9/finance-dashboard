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

  const accentMap: Record<string, { badge: string; text: string; icon: string; glow: string }> = {
    emerald: {
      badge: "from-emerald-300/20 to-cyan-300/20 border-emerald-300/30",
      text: "text-emerald-200",
      icon: "text-emerald-300",
      glow: "shadow-[0_0_24px_rgba(61,217,180,0.12)]",
    },
    red: {
      badge: "from-rose-300/20 to-amber-300/20 border-rose-300/30",
      text: "text-rose-200",
      icon: "text-rose-300",
      glow: "shadow-[0_0_24px_rgba(255,95,122,0.12)]",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ title, value, icon: Icon, accent, delay }) => {
        const a = accentMap[accent];
        return (
          <div
            key={title}
            className={`glass edge-line glow-hover rounded-2xl p-5 animate-fade-up delay-${delay} ${a.glow}`}
            style={{ animationDelay: `${delay}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-mono text-slate-300 uppercase tracking-[0.2em]">
                {title}
              </p>
              <div className={`bg-gradient-to-br ${a.badge} border p-2 rounded-xl`}>
                <Icon size={16} className={a.icon} />
              </div>
            </div>
            <p className={`text-2xl lg:text-3xl font-semibold ${a.text} animate-count`}>
              <AnimatedValue value={value} delay={delay} />
            </p>
            <div className={`mt-4 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-25 ${a.text}`} />
          </div>
        );
      })}
    </div>
  );
}