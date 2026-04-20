import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("limit") ?? "10");
  const skip = parseInt(searchParams.get("offset") ?? "0");

  const transacoes = await prisma.transacao.findMany({
    take,
    skip,
    orderBy: { data: "desc" },
    include: { categoria: true, conta: true },
  });

  const total = await prisma.transacao.count();

  return NextResponse.json({ transacoes, total });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const transacao = await prisma.transacao.create({
    data: {
      titulo: body.titulo,
      valor: body.valor,
      tipo: body.tipo,
      data: new Date(body.data),
      descricao: body.descricao,
      usuarioId: body.usuarioId,
      contaId: body.contaId,
      categoriaId: body.categoriaId,
    },
    include: { categoria: true, conta: true },
  });

  return NextResponse.json(transacao, { status: 201 });
}