import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pegarUsuarioId } from "@/lib/cookies";

export async function GET() {
  const transacoes = await prisma.transacao.findMany();

  const totalReceitas = transacoes
    .filter((t) => t.tipo === "RECEITA")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => t.tipo === "DESPESA")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return NextResponse.json({ totalReceitas, totalDespesas, saldo });
}