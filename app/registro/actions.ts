"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

type RegisterPayload = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  };

  type RegisterResult = {
    error?: string;
    success?: boolean;
  };


  export async function registerAction(
    data: RegisterPayload
  ): Promise<RegisterResult> {
    if (data.senha !== data.confirmarSenha){
      return { error: "As senhas não coincidem."};
    }
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: data.email},
    });
    
    if (usuarioExistente) {
      return { error: "Email já cadastrado." };
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    await prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
      },
    });
    
    return { success: true}
  }
