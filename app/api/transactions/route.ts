import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req: NextRequest) {

  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized"}, { status: 401});
  }

  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("limit") ?? "10");
  const skip = parseInt(searchParams.get("offset") ?? "0");

  try {
    const [transacoes, total] = await prisma.$transaction([
      prisma.transacao.findMany({
        where: { usuarioId: user.usuarioId},
        take,
        skip,
        orderBy: { data: "desc"},
        include: { categoria: true, conta: true},
      }),
      prisma.transacao.count({ where: { usuarioId: user.usuarioId } })
    ]);
    

    return NextResponse.json({ transacoes, total});
  } catch { 
    return NextResponse.json({ error: "Erro ao buscar transações"}, { status: 500})
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized"}, {status:401})
  }

  try {
    const body = await req.json();
    const transacao = await prisma.transacao.create({
      data: {
        titulo: body.titulo,
        valor: body.valor,
        tipo: body.tipo,
        data: new Date(body.data),
        descricao: body.descricao,
        usuarioId: user.usuarioId,
        contaId: body.contaId,
        categoriaId: body.categoriaId,
      },
      include: { categoria: true, conta: true },
    });

    return NextResponse.json(transacao, { status: 201})
  } catch {
    return NextResponse.json({ error: "Erro ao criar transação" }, {status: 500})
  }
}