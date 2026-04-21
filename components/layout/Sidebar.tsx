"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Tags, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transações", icon: ArrowLeftRight },
  { href: "/dashboard/categories", label: "Categorias", icon: Tags },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#0a0a14] flex flex-col p-5 gap-1 border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8 mt-1">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <TrendingUp size={16} className="text-emerald-400" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white tracking-wide font-mono">
            Finance
          </span>
          <span className="text-sm font-semibold text-emerald-400 tracking-wide font-mono">
            .app
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest px-3 mb-2">
        Menu
      </p>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-mono transition-all duration-200",
                active
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent"
              )}
            >
              <Icon size={16} className={active ? "text-emerald-400" : "text-zinc-600"} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto px-3 py-3 rounded-xl border border-white/5 bg-white/[0.02]">
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
          Status
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
          <span className="text-xs font-mono text-zinc-400">Online</span>
        </div>
      </div>
    </aside>
  );
}