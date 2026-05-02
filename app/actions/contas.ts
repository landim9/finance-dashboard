"use server";

import { prisma } from "@/lib/prisma";
import { getUsuarioId } from "@/lib/sessions";
import { revalidatePath } from "next/cache";


type TipoConta = "CORRENTE" | "POUPANCA" | "INVESTIMENTO" | "CREDITO";
export async function criarConta(formData: FormData) {
  const usuarioId = await getUsuarioId();

  const banco = formData.get("banco") as string;
  const cor = formData.get("cor") as string;
  const nomeCustom = formData.get("nome") as string;

  // Se banco personalizado, usa o nome digitado; senão usa o nome do banco
  const nome = nomeCustom?.trim() || banco;

  if (!nome) {
    return { error: "Nome da conta é obrigatório." };
  }

  try {
    await prisma.conta.create({
        data: {
            nome,
            banco: banco || "personalizado",
            cor: cor || "#64748b",
            tipo: formData.get("tipo") as TipoConta,
            saldo: parseFloat((formData.get("saldo") as string) || "0"),
            usuarioId,
          },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/contas");

    return { success: true };
  } catch {
    return { error: "Erro ao criar conta. Tente novamente." };
  }
}