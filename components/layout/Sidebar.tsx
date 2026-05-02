"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Tags, Settings, TrendingUp, UserRoundPlus, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transacoes", label: "Transações", icon: ArrowLeftRight },
  { href: "/dashboard/categorias", label: "Categorias", icon: Tags },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

const publicItems = [
  { href: "/registro", label: "Registro", icon: UserRoundPlus },
  { href: "/login", label: "Login", icon: User },
];

type SidebarProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
};

export function Sidebar({ collapsed = false, onNavigate, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "min-h-screen border-r border-white/10 bg-[#0b111e]/90 backdrop-blur-xl p-4 md:p-6 flex flex-col transition-all duration-300",
        collapsed ? "w-24" : "w-72",
        className
      )}
    >
      <div className="edge-line rounded-2xl bg-gradient-to-br from-white/10 via-white/[0.06] to-transparent border border-white/10 p-3 mb-6">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-300/30 to-cyan-300/20 border border-emerald-300/30 flex items-center justify-center shadow-[0_0_24px_rgba(61,217,180,0.25)]">
            <TrendingUp size={18} className="text-emerald-200" />
          </div>
          <div className={cn("flex flex-col leading-tight", collapsed && "hidden")}>
            <span className="text-sm font-semibold text-white tracking-wide font-mono">
              Finance
            </span>
            <span className="text-sm font-semibold text-emerald-300 tracking-wide font-mono">
              cockpit
            </span>
          </div>
        </div>
      </div>

      <p className={cn("text-[11px] font-mono text-slate-400 uppercase tracking-[0.25em] px-2 mb-2", collapsed && "hidden")}>
        Area logada
      </p>

      <nav className="flex flex-col gap-2" aria-label="Navegacao principal">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center px-3 py-3 rounded-xl text-sm font-mono transition-all duration-200 border",
                collapsed ? "justify-center" : "gap-3",
                active
                  ? "bg-gradient-to-r from-emerald-300/10 to-cyan-300/10 text-emerald-200 border-emerald-300/30 shadow-[0_0_26px_rgba(61,217,180,0.15)]"
                  : "text-slate-300/80 border-transparent hover:text-white hover:bg-white/5 hover:border-white/15"
              )}
            >
              <Icon size={16} className={active ? "text-emerald-300" : "text-slate-400"} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      <p className={cn("text-[11px] font-mono text-slate-400 uppercase tracking-[0.25em] px-2 mb-2 mt-5", collapsed && "hidden")}>
        Acesso
      </p>
      <nav className="flex flex-col gap-2" aria-label="Navegacao publica">
        {publicItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center px-3 py-3 rounded-xl text-sm font-mono transition-all duration-200 border",
                collapsed ? "justify-center" : "gap-3",
                active
                  ? "bg-gradient-to-r from-emerald-300/10 to-cyan-300/10 text-emerald-200 border-emerald-300/30 shadow-[0_0_26px_rgba(61,217,180,0.15)]"
                  : "text-slate-300/80 border-transparent hover:text-white hover:bg-white/5 hover:border-white/15"
              )}
            >
              <Icon size={16} className={active ? "text-emerald-300" : "text-slate-400"} />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      <div className={cn("mt-auto rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3", collapsed && "px-2")}>
        {!collapsed && (
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-2">
            Sessao
          </p>
        )}
        <div className={cn("rounded-xl bg-black/20 border border-white/10 mb-3", collapsed ? "px-2 py-2" : "px-3 py-2")}>
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}>
            <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-2")}>
              <span className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(61,217,180,0.9)]" />
              {!collapsed && <span className="text-xs font-mono text-slate-300">Online</span>}
            </div>
            {!collapsed && <span className="text-[10px] uppercase tracking-wider text-slate-400">Ativo</span>}
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className={cn(
              "w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 border border-white/10 py-2.5 text-sm font-mono text-slate-200 hover:from-slate-700 hover:to-slate-600 transition-all",
              collapsed ? "px-0" : "gap-2 px-3"
            )}
          >
            <LogOut size={15} />
            {!collapsed && "Sair"}
          </button>
        </form>
      </div>
    </aside>
  );
}