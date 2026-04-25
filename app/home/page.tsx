import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-grid">
      <section className="glass edge-line rounded-3xl p-8 w-full max-w-2xl text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 mb-3">
          Bem-vindo
        </p>
        <h1 className="text-3xl md:text-4xl text-slate-50 font-semibold">
          Sua central financeira esta pronta.
        </h1>
        <p className="mt-4 text-slate-300/80">
          Continue para o painel e acompanhe saldo, categorias e historico de transacoes.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-xl px-5 h-11 bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-950 font-mono text-sm"
          >
            Ir para dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-xl px-5 h-11 border border-white/20 text-slate-100 font-mono text-sm hover:bg-white/10 transition"
          >
            Pagina inicial
          </Link>
        </div>
      </section>
    </main>
  );
}
