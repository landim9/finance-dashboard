import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { NovaTransacaoModal } from "@/components/dashboard/NewTransaction";
import { NovaConta } from "@/components/dashboard/NovaConta";

export const dynamic = "force-dynamic";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);


async function getSummary(usuarioId: string) {
  const transacoes = await prisma.transacao.findMany({
    where: { usuarioId }, 
  });
  const totalReceitas = transacoes
    .filter((t) => t.tipo === "RECEITA")
    .reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoes
    .filter((t) => t.tipo === "DESPESA")
    .reduce((acc, t) => acc + t.valor, 0);
  return { totalReceitas, totalDespesas, saldo: totalReceitas - totalDespesas };
}

async function getRecentTransactions(usuarioId: string) {
  return prisma.transacao.findMany({
    where: { usuarioId }, 
    take: 8,
    orderBy: { data: "desc" },
    include: { categoria: true, conta: true },
  });
}

export default async function DashboardPage() {
  // 1. Lê e valida o token do cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("sessao")?.value;
  if (!token) redirect("/login");

  const { payload } = await jwtVerify(token, secret);
  const { usuarioId } = payload as { usuarioId: string };

  // 2. Passa o usuarioId para as funções
  const [resumo, transacoes] = await Promise.all([
    getSummary(usuarioId),
    getRecentTransactions(usuarioId),
  ]);

  const [categorias, contas] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nome: "asc" } }),
    prisma.conta.findMany({ where: { usuarioId }, orderBy: { nome: "asc" } }),
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

      <div className="gap-5 flex flex-col md:flex-row">
          <NovaConta />
          <NovaTransacaoModal categorias={categorias} contas={contas} />
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