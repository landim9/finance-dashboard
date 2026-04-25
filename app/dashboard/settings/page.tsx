import Link from "next/link";
import { Bell, LockKeyhole, UserRound } from "lucide-react";

const settingsBlocks = [
  {
    title: "Perfil",
    description: "Atualize nome, email e preferencias de visualizacao da conta.",
    icon: UserRound,
    action: "Editar perfil",
  },
  {
    title: "Seguranca",
    description: "Gerencie senha, autenticacao e atividade de sessoes.",
    icon: LockKeyhole,
    action: "Revisar seguranca",
  },
  {
    title: "Notificacoes",
    description: "Defina alertas de movimentacoes e lembretes financeiros.",
    icon: Bell,
    action: "Configurar alertas",
  },
];

export default function SettingsPage() {
  return (
    <main id="main-content" className="p-4 md:p-8 space-y-6 bg-grid">
      <section className="glass edge-line rounded-2xl p-6">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-300 font-mono">
          Preferencias
        </p>
        <h1 className="text-3xl text-slate-50 font-semibold mt-2">Configuracoes</h1>
        <p className="text-slate-300/80 text-sm mt-2">
          Ajuste sua experiencia e mantenha sua conta segura.
        </p>
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {settingsBlocks.map(({ title, description, action, icon: Icon }) => (
          <article key={title} className="glass glow-hover rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-300/20 to-cyan-300/20 border border-emerald-300/30 flex items-center justify-center mb-4">
              <Icon size={18} className="text-emerald-200" />
            </div>
            <h2 className="text-slate-100 text-lg">{title}</h2>
            <p className="text-sm text-slate-300/80 mt-2">{description}</p>
            <button
              type="button"
              aria-disabled="true"
              disabled
              className="mt-5 w-full h-11 rounded-xl border border-white/15 text-slate-400 font-mono text-sm bg-white/5 cursor-not-allowed"
            >
              {action} (em breve)
            </button>
          </article>
        ))}
      </section>

      <p className="text-sm text-slate-400">
        Para voltar ao painel principal, acesse{" "}
        <Link href="/dashboard" className="underline underline-offset-4 text-slate-200">
          Dashboard
        </Link>
        .
      </p>
    </main>
  );
}
