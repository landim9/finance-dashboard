import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-grid px-6 py-10 md:py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="glass edge-line rounded-3xl p-8 md:p-12">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 mb-4">
            Finance cockpit
          </p>
          <h1 className="text-4xl md:text-6xl leading-tight font-semibold text-slate-50 max-w-4xl">
            Tenha controle total das suas financas com um painel claro e elegante.
          </h1>
          <p className="text-slate-300/85 mt-5 max-w-2xl">
            Centralize receitas, despesas e tendencias em um fluxo intuitivo para tomar
            decisoes melhores todos os meses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl px-5 h-11 bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-950 font-mono text-sm hover:from-emerald-200 hover:to-cyan-200 transition"
            >
              Abrir dashboard
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center rounded-xl px-5 h-11 border border-white/20 text-slate-100 font-mono text-sm hover:bg-white/10 transition"
            >
              Entrar na conta
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Visao em tempo real",
              description: "Acompanhe saldo e movimentacoes com leitura imediata.",
              icon: BarChart3,
            },
            {
              title: "Organizacao por categorias",
              description: "Entenda onde seu dinheiro vai e ajuste prioridades.",
              icon: Sparkles,
            },
            {
              title: "Experiencia segura",
              description: "Acesso autenticado e fluxo de uso objetivo.",
              icon: ShieldCheck,
            },
          ].map(({ title, description, icon: Icon }) => (
            <article key={title} className="glass glow-hover rounded-2xl p-5">
              <div className="mb-3 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/20 border border-emerald-300/30 flex items-center justify-center">
                <Icon size={18} className="text-emerald-200" />
              </div>
              <h2 className="text-lg text-slate-100">{title}</h2>
              <p className="text-sm text-slate-300/80 mt-2">{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}