import { prisma } from "@/lib/prisma";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";

export const dynamic = "force-dynamic";
async function getSummary() {
  const transacoes = await prisma.transacao.findMany();
  const totalReceitas = transacoes
    .filter((t) => t.tipo === "RECEITA")
    .reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoes
    .filter((t) => t.tipo === "DESPESA")
    .reduce((acc, t) => acc + t.valor, 0);
  return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
}

async function getRecentTransactions() {
  return prisma.transacao.findMany({
    take: 8,
    orderBy: { data: "desc" },
    include: { categoria: true, conta: true },
  });
}

export default async function DashboardPage() {
  const [resumo, transacoes] = await Promise.all([
    getSummary(),
    getRecentTransactions(),
  ]);

  return (
    <main id="main-content" className="p-4 md:p-8 space-y-7 bg-grid">
      <div className="glass edge-line rounded-2xl p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-3 font-mono">
          Painel principal
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
          Dashboard Financeiro
        </h1>
        <p className="text-slate-300/80 text-sm mt-2">
          Visao geral de receitas, despesas e movimentacoes recentes.
        </p>
      </div>
      <SummaryCards
        totalIncome={resumo.totalReceitas}
        totalExpense={resumo.totalDespesas}
        balance={resumo.saldo}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <ExpenseChart transactions={transacoes} />
        <TransactionTable transactions={transacoes} />
      </div>
      {transacoes.length === 0 && (
        <div className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-300">
            Nenhuma transacao recente encontrada. Cadastre uma movimentacao para ver os
            indicadores com mais contexto.
          </p>
        </div>
      )}
    </main>
  );
}