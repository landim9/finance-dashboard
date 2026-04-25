"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { autenticar } from "@/app/actions/auth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultado = await autenticar({ email, senha });
    if (resultado.error) {
      return setErro(resultado.error);
    }

    router.push("/dashboard");
  };

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-6 bg-grid">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">
        <section className="glass edge-line rounded-3xl p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-300 mb-4">
              Finance cockpit
            </p>
            <h1 className="text-4xl font-semibold text-slate-50 leading-tight">
              Entre e acompanhe suas financas com clareza.
            </h1>
            <p className="text-slate-300/80 mt-4 text-sm">
              Uma visao completa de fluxo de caixa, categorias e tendencia de gastos.
            </p>
          </div>
          <div className="mt-8 text-xs text-slate-400 font-mono">
            Controle financeiro pessoal com visual moderno e foco em decisao.
          </div>
        </section>

        <section className="glass edge-line rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-slate-100 mb-2">Acessar conta</h2>
          <p className="text-sm text-slate-300/80 mb-6">Use seu e-mail e senha para continuar.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="login-email" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
            />
            <label htmlFor="login-password" className="text-xs text-slate-300 font-mono uppercase tracking-wider">
              Senha
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-11 border-white/20 bg-black/20 text-slate-100 placeholder:text-slate-400"
            />
            <Button
              type="submit"
              className="h-11 bg-gradient-to-r from-emerald-300 to-cyan-300 text-slate-950 hover:from-emerald-200 hover:to-cyan-200"
            >
              Entrar
            </Button>
            {erro && <p className="text-rose-300 text-sm text-center">{erro}</p>}
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">ou</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <Button type="button" variant="outline" className="w-full h-11 border-white/20 bg-transparent text-slate-100 hover:bg-white/10" onClick={() => router.push("/registro")}>
            Criar nova conta
          </Button>

          <p className="text-xs text-slate-400 mt-5 text-center">
            Ao entrar, voce concorda com os termos de uso.
          </p>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Voltar para <Link href="/" className="text-slate-300 hover:text-white underline underline-offset-4">inicio</Link>
          </p>
        </section>
      </div>
    </main>
  );
}