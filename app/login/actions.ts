"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

type LoginPayload = {
  email: string;
  senha: string;
};

type LoginResult = {
  error?: string;
};

export async function loginAction({
  email,
  senha,
}: LoginPayload): Promise<LoginResult> {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
    select: { senha: true },
  });

  if (!usuario) {
    return { error: "Credenciais invalidas." };
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return { error: "Credenciais invalidas." };
  }

  return {};
}
