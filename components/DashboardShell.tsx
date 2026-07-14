"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSessao, logout } from "@/lib/auth";
import { seedDatabase } from "@/lib/db";
import { Sessao } from "@/lib/types";
import { marca } from "@/lib/content";

type MenuItem = { href: string; label: string; icon: string };

const iconesSvg: Record<string, JSX.Element> = {
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  history: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 109-9 9 9 0 00-8 5M3 4v5h5M12 7v5l4 2" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),
  star: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 19l1.3-6-4.6-4.1 6.1-.6L12 3z" />
  ),
  building: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V5a1 1 0 011-1h10a1 1 0 011 1v16M16 21V9h4a1 1 0 011 1v11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h.01M8 12h.01M8 16h.01M12 8h.01M12 12h.01M12 16h.01" />
    </>
  ),
  list: <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  tag: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.6 12.4L12.6 20.4a2 2 0 01-2.8 0l-6.2-6.2a2 2 0 010-2.8L11.6 3.4a2 2 0 011.4-.6H19a1 1 0 011 1v6.6a2 2 0 01-.4 1.4z" />
      <circle cx="16" cy="8" r="1.2" />
    </>
  ),
};

function IconRender({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      {iconesSvg[name] ?? iconesSvg.home}
    </svg>
  );
}

const menuClinica: MenuItem[] = [
  { href: "/painel", label: "Dashboard", icon: "home" },
  { href: "/painel/agendar", label: "Agendar serviço", icon: "calendar" },
  { href: "/painel/historico", label: "Histórico", icon: "history" },
  { href: "/painel/servicos", label: "Meus serviços", icon: "star" },
  { href: "/painel/perfil", label: "Perfil da clínica", icon: "user" },
];

const menuAdmin: MenuItem[] = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/clinicas", label: "Clínicas", icon: "building" },
  { href: "/admin/agendamentos", label: "Agendamentos", icon: "list" },
  { href: "/admin/servicos", label: "Serviços e preços", icon: "tag" },
];

export default function DashboardShell({
  role,
  children,
}: {
  role: "clinica" | "admin";
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sessao, setSessao] = useState<Sessao | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    seedDatabase();
    const s = getSessao();
    if (!s || s.tipo !== role) {
      router.replace(role === "admin" ? "/admin/login" : "/login");
      return;
    }
    setSessao(s);
  }, [role, router]);

  if (sessao === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-gray-50">
        <p className="text-brand-gray-600">Carregando…</p>
      </div>
    );
  }
  if (!sessao) return null;

  const menu = role === "admin" ? menuAdmin : menuClinica;

  function sair() {
    logout();
    router.push(role === "admin" ? "/admin/login" : "/");
  }

  return (
    <div className="flex min-h-screen bg-brand-gray-50">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-brand-gray-100 bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-brand-gray-100 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-darkBlue font-display text-lg font-bold text-white">
            M
          </span>
          <div>
            <p className="font-display text-base font-bold text-brand-gray-900">{marca.nome}</p>
            <p className="text-xs text-brand-gray-600">{role === "admin" ? "Painel interno" : "Área da clínica"}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menu.map((item) => {
            const ativo = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  ativo
                    ? "bg-brand-darkBlue text-white shadow-premium"
                    : "text-brand-gray-700 hover:bg-brand-lightBlue"
                }`}
              >
                <IconRender name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-brand-gray-100 p-4">
          <p className="truncate text-sm font-semibold text-brand-gray-900">{sessao.nome}</p>
          <p className="truncate text-xs text-brand-gray-600">{sessao.email}</p>
          <button onClick={sair} className="mt-3 w-full rounded-xl border border-brand-gray-200 py-2 text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-50">
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Topbar mobile */}
        <div className="flex items-center justify-between border-b border-brand-gray-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-darkBlue font-display text-sm font-bold text-white">M</span>
            <span className="font-display font-bold text-brand-gray-900">{marca.nome}</span>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-brand-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="border-b border-brand-gray-100 bg-white px-4 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-brand-gray-700 hover:bg-brand-lightBlue"
                >
                  <IconRender name={item.icon} />
                  {item.label}
                </Link>
              ))}
              <button onClick={sair} className="mt-2 rounded-xl border border-brand-gray-200 py-2 text-sm font-medium text-brand-gray-700">
                Sair
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
