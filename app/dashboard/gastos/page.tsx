import { prisma } from "@/lib/prisma";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default async function GastoPage() {
  const expenses = await prisma.transacao.findMany({
    where: { tipo: "DESPESA" },
    include: { categoria: true },
    orderBy: { data: "desc" },
    take: 12,
  });

  const total = expenses.reduce((acc, item) => acc + item.valor, 0);

  return (
    <main id="main-content" className="p-4 md:p-8 space-y-6 bg-grid">
      <section className="glass edge-line rounded-2xl p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
          Analise
        </p>
        <h1 className="text-3xl text-slate-50 font-semibold mt-2">Painel de gastos</h1>
        <p className="text-slate-300/80 text-sm mt-2">
          Monitoramento de despesas recentes por categoria.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <article className="glass rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total em despesas</p>
          <p className="text-2xl mt-2 text-rose-200 font-semibold">{currency.format(total)}</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Lancamentos</p>
          <p className="text-2xl mt-2 text-slate-100 font-semibold">{expenses.length}</p>
        </article>
        <article className="glass rounded-2xl p-5">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Ticket medio</p>
          <p className="text-2xl mt-2 text-amber-200 font-semibold">
            {currency.format(expenses.length ? total / expenses.length : 0)}
          </p>
        </article>
      </section>

      <section className="glass edge-line rounded-2xl p-5">
        <h2 className="text-sm font-mono text-slate-200 uppercase tracking-[0.2em] mb-4">
          Ultimas despesas
        </h2>
        <div className="space-y-2">
          {expenses.map((expense) => (
            <div key={expense.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-slate-100 font-mono text-sm">{expense.titulo}</p>
                <p className="text-xs text-slate-400 mt-1">{expense.categoria.nome}</p>
              </div>
              <span className="text-rose-200 font-mono text-sm">{currency.format(expense.valor)}</span>
            </div>
          ))}
          {expenses.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma despesa cadastrada ate o momento.</p>
          )}
        </div>
      </section>
    </main>
  );
}