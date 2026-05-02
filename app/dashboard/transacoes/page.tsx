import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUsuarioId } from "@/lib/sessions";
import { NovaTransacaoModal } from "@/components/dashboard/NewTransaction";
import { NovaConta } from "@/components/dashboard/NovaConta";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormat = new Intl.DateTimeFormat("pt-BR");

export default async function TransacoesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessao")?.value;
  if (!token) redirect("/login");

  const usuarioId = await getUsuarioId();
  const transactions = await prisma.transacao.findMany({
    where: { usuarioId },
    include: { categoria: true, conta: true },
    orderBy: { data: "desc" },
    take: 20,
  });

  const [categorias, contas] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nome: "asc" } }),
    prisma.conta.findMany({ where: { usuarioId }, orderBy: { nome: "asc" } }),
  ]);

  return (
    <main id="main-content" className="p-4 md:p-8 space-y-6 bg-grid">
      <section className="glass edge-line rounded-2xl p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
          Operacoes
        </p>
        <h1 className="text-3xl text-slate-50 font-semibold mt-2">Transacoes</h1>
        <p className="text-slate-300/80 text-sm mt-2">
          Historico completo das suas movimentacoes financeiras.
        </p>
      </section>

      <div className="gap-5 flex flex-col md:flex-row">
          <NovaConta />
          <NovaTransacaoModal categorias={categorias} contas={contas} />
      </div>

      <section className="glass edge-line rounded-2xl p-5">
        <div className="hidden md:grid grid-cols-5 gap-3 px-3 pb-2 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
          <span>Titulo</span>
          <span>Categoria</span>
          <span>Conta</span>
          <span>Data</span>
          <span className="text-right">Valor</span>
        </div>
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <article key={transaction.id} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3 text-sm">
              <div className="md:hidden space-y-1">
                <p className="text-slate-100 font-mono">{transaction.titulo}</p>
                <p className="text-slate-300 text-xs">
                  {transaction.categoria.nome} · {transaction.conta.nome}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">
                    {dateFormat.format(new Date(transaction.data))}
                  </span>
                  <span
                    className={`font-mono ${
                      transaction.tipo === "RECEITA" ? "text-emerald-200" : "text-rose-200"
                    }`}
                  >
                    {transaction.tipo === "RECEITA" ? "+" : "-"}
                    {currency.format(transaction.valor)}
                  </span>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-5 gap-3">
                <span className="text-slate-100 font-mono">{transaction.titulo}</span>
                <span className="text-slate-300">{transaction.categoria.nome}</span>
                <span className="text-slate-300">{transaction.conta.nome}</span>
                <span className="text-slate-400">{dateFormat.format(new Date(transaction.data))}</span>
                <span
                  className={`text-right font-mono ${
                    transaction.tipo === "RECEITA" ? "text-emerald-200" : "text-rose-200"
                  }`}
                >
                  {transaction.tipo === "RECEITA" ? "+" : "-"}
                  {currency.format(transaction.valor)}
                </span>
              </div>
            </article>
          ))}
          {transactions.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
              <p className="text-sm text-slate-300">
                Ainda nao existem transacoes cadastradas.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Adicione uma receita ou despesa para visualizar seu historico aqui.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
