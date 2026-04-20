import { prisma } from "@/lib/prisma";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";

async function getSummary() {
  const transactions = await prisma.transaction.findMany();
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);
  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
}

async function getRecentTransactions() {
  return prisma.transaction.findMany({
    take: 8,
    orderBy: { date: "desc" },
    include: { category: true, account: true },
  });
}

export default async function DashboardPage() {
  const [summary, transactions] = await Promise.all([
    getSummary(),
    getRecentTransactions(),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Dashboard Financeiro</h1>
        <p className="text-zinc-500 text-sm">Visão geral das suas finanças</p>
      </div>
      <SummaryCards {...summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExpenseChart transactions={transactions} />
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}