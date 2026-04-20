import { prisma } from "@/lib/prisma";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Dashboard Financeiro</h1>
        <p className="text-zinc-500 text-sm">Visão geral das suas finanças</p>
      </div>
      <SummaryCards
        totalIncome={resumo.totalReceitas}
        totalExpense={resumo.totalDespesas}
        balance={resumo.saldo}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExpenseChart transactions={transacoes} />
        <TransactionTable transactions={transacoes} />
      </div>
    </div>
  );
}