"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/app/registro/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultado = await registerAction({ nome, email, senha, confirmarSenha });
    if (resultado.error) {
      return setErro(resultado.error);
    }
    router.push("/login");
  };

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-6 bg-grid">
      <section className="w-full max-w-lg glass edge-line rounded-3xl p-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 mb-3">
          Cadastro
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Crie sua conta</h1>
        <p className="text-sm text-slate-300/80 mt-2 mb-6">
          Configure seu perfil para comecar a acompanhar suas financas.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="register-name" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
            Nome
          </label>
          <Input
            id="register-name"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
          />
          <label htmlFor="register-email" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
          />
          <label htmlFor="register-password" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
            Senha
          </label>
          <Input
            id="register-password"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
          />
          <label htmlFor="register-confirm-password" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
            Confirmar senha
          </label>
          <Input
            id="register-confirm-password"
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
          />
          <Button
            type="submit"
            className="h-11 bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-950 hover:from-emerald-200 hover:to-cyan-200"
          >
            Registrar
          </Button>
          {erro && <p className="text-rose-300 text-sm text-center">{erro}</p>}
        </form>

        <Button
          type="button"
          variant="outline"
          className="w-full h-11 mt-4 border-white/20 bg-transparent text-slate-100 hover:bg-white/10"
          onClick={() => router.push("/login")}
        >
          Ja tenho conta
        </Button>
      </section>
    </main>
  );
}