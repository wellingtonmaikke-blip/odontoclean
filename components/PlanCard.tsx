"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plano } from "@/lib/types";
import { IconCheck } from "./Icons";
import { getPrecosOverride } from "@/lib/db";

const corBorda: Record<string, string> = {
  bronze: "ring-brand-bronze/40",
  silver: "ring-brand-darkBlue",
  gold: "ring-brand-gold/50",
};

const corBadge: Record<string, string> = {
  bronze: "bg-brand-bronze/10 text-brand-bronze",
  silver: "bg-brand-darkBlue/10 text-brand-darkBlue",
  gold: "bg-brand-gold/10 text-yellow-700",
};

export default function PlanCard({ plano, ctaHref = "/contato" }: { plano: Plano; ctaHref?: string }) {
  const [preco, setPreco] = useState(plano.preco);

  useEffect(() => {
    const overrides = getPrecosOverride();
    if (overrides[plano.id] !== undefined) setPreco(overrides[plano.id]);
  }, [plano.id]);

  return (
    <div
      className={`relative flex flex-col rounded-xl2 bg-white p-8 shadow-card ring-1 transition hover:-translate-y-1 hover:shadow-premium ${
        corBorda[plano.cor] ?? "ring-black/5"
      } ${plano.destaque ? "ring-2 lg:scale-105" : ""}`}
    >
      {plano.destaque && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-mint px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
          Mais escolhido
        </span>
      )}
      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${corBadge[plano.cor]}`}>
        {plano.nome}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-brand-gray-900">{plano.tagline}</h3>
      <p className="mt-2 text-sm text-brand-gray-600">{plano.descricao}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-3xl font-extrabold text-brand-gray-900">
          R$ {preco.toLocaleString("pt-BR")}
        </span>
        <span className="text-sm text-brand-gray-600">{plano.precoLabel}</span>
      </div>
      <p className="text-xs text-brand-gray-600">Preço sugerido — ajuste conforme porte da clínica.</p>

      <ul className="mt-6 flex-1 space-y-3">
        {plano.beneficios.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-brand-gray-700">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl bg-brand-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray-600">Diferenciais</p>
        <ul className="mt-2 space-y-1">
          {plano.diferenciais.map((d) => (
            <li key={d} className="text-xs text-brand-gray-600">• {d}</li>
          ))}
        </ul>
      </div>

      <Link
        href={ctaHref}
        className={`mt-8 w-full text-center ${plano.destaque ? "btn-mint" : "btn-secondary"}`}
      >
        Contratar plano {plano.nome}
      </Link>
    </div>
  );
}
