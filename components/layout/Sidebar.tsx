"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Tags, Settings } from "lucide-react";
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
    <aside className="w-64 min-h-screen bg-zinc-900 text-white flex flex-col p-4 gap-2">
      <div className="text-xl font-bold mb-6 flex items-center gap-2 px-2">
        💰 <span>FinanceApp</span>
      </div>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
            pathname === href
              ? "bg-indigo-600 text-white"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  );
}