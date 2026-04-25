"use client";

import { useEffect, useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";

const SIDEBAR_COLLAPSED_KEY = "finance-dashboard:sidebar-collapsed";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const savedState = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      return savedState === "true";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed));
    } catch {
      // Ignore storage access failures (private mode/restricted environments).
    }
  }, [collapsed]);

  return (
    <div className="min-h-screen md:flex">
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 h-11 w-11 rounded-xl border border-white/20 bg-[#0b111e]/90 text-slate-100 flex items-center justify-center"
        aria-label={mobileOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu ao clicar no fundo"
          className="md:hidden fixed inset-0 bg-black/55 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed md:static top-0 left-0 z-50 md:z-auto h-screen transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <Sidebar collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="flex-1 bg-gradient-to-b from-transparent to-black/10">
        <div className="hidden md:flex items-center justify-end px-4 pt-4">
          <button
            type="button"
            className="h-10 px-3 rounded-xl border border-white/15 bg-[#0b111e]/50 text-slate-200 flex items-center gap-2 text-sm font-mono hover:bg-white/10 transition"
            aria-label={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            {collapsed ? "Expandir menu" : "Recolher menu"}
          </button>
        </div>
        <main className="pt-16 md:pt-0">{children}</main>
      </div>
    </div>
  );
}
