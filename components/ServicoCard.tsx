"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Servico } from "@/lib/types";
import { IconCheck } from "./Icons";
import { getPrecosOverride } from "@/lib/db";

const corBorda: Record<string, string> = {
  gold: "ring-brand-gold/40",
  darkBlue: "ring-brand-darkBlue",
  silver: "ring-brand-silver/40",
  bronze: "ring-brand-bronze/40",
  mint: "ring-brand-mint/50",
};

const corBadge: Record<string, string> = {
  gold: "bg-brand-gold/10 text-yellow-700",
  darkBlue: "bg-brand-darkBlue/10 text-brand-darkBlue",
  silver: "bg-brand-silver/10 text-brand-gray-700",
  bronze: "bg-brand-bronze/10 text-brand-bronze",
  mint: "bg-brand-mint/15 text-brand-mintDark",
};

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR");
}

export default function ServicoCard({ servico, ctaHref = "/contato" }: { servico: Servico; ctaHref?: string }) {
  const [faixa, setFaixa] = useState({ min: servico.precoMin, max: servico.precoMax });

  useEffect(() => {
    const overrides = getPrecosOverride();
    const override = overrides[servico.id];
    if (override) setFaixa(override);
  }, [servico.id]);

  return (
    <div
      className={`relative flex flex-col rounded-xl2 bg-white p-8 shadow-card ring-1 transition hover:-translate-y-1 hover:shadow-premium ${
        corBorda[servico.cor] ?? "ring-black/5"
      } ${servico.destaque ? "ring-2 lg:scale-105" : ""}`}
    >
      {servico.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-mint px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
          {servico.badge}
        </span>
      )}
      <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${corBadge[servico.cor]}`}>
        {servico.nome}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-brand-gray-900">{servico.tagline}</h3>
      <p className="mt-2 text-sm text-brand-gray-600">{servico.descricao}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-gray-500">{servico.duracao}</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-sm text-brand-gray-600">a partir de</span>
        <span className="font-display text-3xl font-extrabold text-brand-gray-900">
          R$ {formatarPreco(faixa.min)}
        </span>
        <span className="text-sm text-brand-gray-600">{servico.precoLabel}</span>
      </div>
      <p className="text-xs text-brand-gray-600">
        Faixa de R$ {formatarPreco(faixa.min)} a R$ {formatarPreco(faixa.max)}, conforme porte da clínica.
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {servico.inclui.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-brand-gray-700">
            <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl bg-brand-gray-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-gray-600">Diferenciais</p>
        <ul className="mt-2 space-y-1">
          {servico.diferenciais.map((d) => (
            <li key={d} className="text-xs text-brand-gray-600">• {d}</li>
          ))}
        </ul>
      </div>

      <Link
        href={ctaHref}
        className={`mt-8 w-full text-center ${servico.destaque ? "btn-mint" : "btn-secondary"}`}
      >
        Contratar {servico.nome}
      </Link>
    </div>
  );
}
