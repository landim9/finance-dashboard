import { prisma } from "@/lib/prisma";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default async function CategoriesPage() {
  const categories = await prisma.categoria.findMany({
    include: { transacoes: true },
    orderBy: { nome: "asc" },
  });

  return (
    <main id="main-content" className="p-4 md:p-8 space-y-6 bg-grid">
      <section className="glass edge-line rounded-2xl p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
          Classificacao
        </p>
        <h1 className="text-3xl text-slate-50 font-semibold mt-2">Categorias</h1>
        <p className="text-slate-300/80 text-sm mt-2">
          Visualize o peso de cada categoria no seu fluxo financeiro.
        </p>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((category) => {
          const total = category.transacoes.reduce((acc, item) => acc + item.valor, 0);
          return (
            <article key={category.id} className="glass glow-hover rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: category.cor }}
                />
                <h2 className="text-slate-100 text-lg">{category.nome}</h2>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-4">
                Movimentacoes
              </p>
              <p className="text-2xl text-slate-100 font-semibold mt-1">
                {category.transacoes.length}
              </p>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-4">
                Volume total
              </p>
              <p className="text-lg text-cyan-200 font-semibold mt-1">{currency.format(total)}</p>
            </article>
          );
        })}
        {categories.length === 0 && (
          <article className="glass rounded-2xl p-5 md:col-span-2 xl:col-span-3">
            <p className="text-sm text-slate-300">Nenhuma categoria cadastrada.</p>
            <p className="text-xs text-slate-400 mt-1">
              Crie categorias para organizar melhor suas receitas e despesas.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
