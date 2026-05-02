"use server";

import { prisma } from "@/lib/prisma";
import { getUsuarioId } from "@/lib/sessions";
import { revalidatePath } from "next/cache";

export async function criarTransacao(formData: FormData) {
    const usuarioId = await getUsuarioId();

    await prisma.transacao.create({
        data: {
            titulo: formData.get("titulo") as string,
            valor: parseFloat(formData.get("valor") as string),
            tipo: formData.get("tipo") as "RECEITA" | "DESPESA",
            data: new Date(formData.get("data") as string),
            descricao: formData.get("descricao") as string | undefined,
            categoriaId: formData.get("categoriaId") as string,
            contaId: formData.get("contaId") as string,
            usuarioId,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/transacoes");
}