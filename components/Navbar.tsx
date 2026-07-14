"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { marca } from "@/lib/content";
import { getSessao } from "@/lib/auth";

const links = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/diferenciais", label: "Diferenciais" },
  { href: "/missao-visao", label: "Missão e Visão" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    setLogado(!!getSessao());
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-darkBlue font-display text-lg font-bold text-white">
            M
          </span>
          <span className="font-display text-xl font-bold text-brand-gray-900">
            {marca.nome}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-brand-gray-700 transition hover:text-brand-darkBlue"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={logado ? "/painel" : "/login"}
            className="text-sm font-semibold text-brand-darkBlue hover:underline"
          >
            {logado ? "Meu painel" : "Login clínicas"}
          </Link>
          <Link href="/servicos" className="btn-primary text-sm">
            Solicitar diagnóstico
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-gray-700 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-gray-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-brand-gray-700"
              >
                {l.label}
              </Link>
            ))}
            <hr className="border-brand-gray-100" />
            <Link href={logado ? "/painel" : "/login"} onClick={() => setOpen(false)} className="text-sm font-semibold text-brand-darkBlue">
              {logado ? "Meu painel" : "Login clínicas"}
            </Link>
            <Link href="/servicos" onClick={() => setOpen(false)} className="btn-primary text-sm w-full">
              Solicitar diagnóstico
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
