"use client";

import { useEffect, useState } from "react";
import { getSessao } from "@/lib/auth";
import { atualizarClinica, getClinicaPorId } from "@/lib/db";
import { planos } from "@/lib/content";
import { Clinica, PlanoId } from "@/lib/types";
import { IconCheck } from "@/components/Icons";

export default function MeusPlanosPage() {
  const [clinica, setClinica] = useState<Clinica | null>(null);

  function carregar() {
    const sessao = getSessao();
    if (!sessao) return;
    setClinica(getClinicaPorId(sessao.id) ?? null);
  }

  useEffect(() => {
    carregar();
  }, []);

  function trocarPlano(planoId: PlanoId) {
    if (!clinica) return;
    atualizarClinica(clinica.id, { planoAtual: planoId });
    carregar();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Meus planos</h1>
      <p className="mt-1 text-brand-gray-600">Veja seu plano atual e explore outras opções de upgrade.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {planos.map((p) => {
          const atual = clinica?.planoAtual === p.id;
          return (
            <div
              key={p.id}
              className={`card flex flex-col ${atual ? "ring-2 ring-brand-mint" : ""}`}
            >
              {atual && (
                <span className="mb-3 w-fit rounded-full bg-brand-mint/15 px-3 py-1 text-xs font-bold text-brand-mintDark">
                  Plano atual
                </span>
              )}
              <p className="font-display text-lg font-bold text-brand-gray-900">{p.nome}</p>
              <p className="text-sm text-brand-gray-600">{p.tagline}</p>
              <p className="mt-4 font-display text-2xl font-extrabold text-brand-gray-900">
                R$ {p.preco.toLocaleString("pt-BR")} <span className="text-sm font-normal text-brand-gray-600">{p.precoLabel}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {p.beneficios.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-brand-gray-700">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-mint" />
                    {b}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => trocarPlano(p.id)}
                disabled={atual}
                className={`mt-6 w-full ${atual ? "btn-secondary opacity-60" : "btn-primary"}`}
              >
                {atual ? "Plano ativo" : "Mudar para este plano"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
