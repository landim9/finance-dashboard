"use server";

import bcrypt from "bcryptjs";
import { salvarSessao, deletarSessao  } from "@/lib/cookies";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type Payload = {
    email: string;
    senha: string;
}

type Result = {
    error?: string
    success?: boolean
}

export async function autenticar({
    email,
    senha,
}: Payload): Promise<Result>{
    const usuario = await prisma.usuario.findUnique({
        where: { email },
        select: { id: true, senha: true }
    })

    if (!usuario) {
        return { error: "Credenciais invalidas."};
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) {
        return { error: "Credenciais invalidas."};
    }

    await salvarSessao(usuario.id)

    return { success: true } 
}
    
export async function logout() {
    await deletarSessao()
    redirect('/login')
  }
