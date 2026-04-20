import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { transacoes: true } } },
  });
  return NextResponse.json(categorias);
}