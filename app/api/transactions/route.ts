import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("limit") ?? "10");
  const skip = parseInt(searchParams.get("offset") ?? "0");

  const transactions = await prisma.transaction.findMany({
    take,
    skip,
    orderBy: { date: "desc" },
    include: { category: true, account: true },
  });

  const total = await prisma.transaction.count();

  return NextResponse.json({ transactions, total });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const transaction = await prisma.transaction.create({
    data: {
      title: body.title,
      amount: body.amount,
      type: body.type,
      date: new Date(body.date),
      description: body.description,
      userId: body.userId,
      accountId: body.accountId,
      categoryId: body.categoryId,
    },
    include: { category: true, account: true },
  });

  return NextResponse.json(transaction, { status: 201 });
}