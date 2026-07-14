"use client";

import { useEffect, useState } from "react";
import { planos as planosBase } from "@/lib/content";
import { getPrecosOverride, salvarPrecoPlano } from "@/lib/db";

export default function AdminServicosPage() {
  const [precos, setPrecos] = useState<Record<string, number>>({});
  const [salvoId, setSalvoId] = useState<string | null>(null);

  useEffect(() => {
    const overrides = getPrecosOverride();
    const iniciais: Record<string, number> = {};
    planosBase.forEach((p) => {
      iniciais[p.id] = overrides[p.id] ?? p.preco;
    });
    setPrecos(iniciais);
  }, []);

  function salvar(planoId: string) {
    salvarPrecoPlano(planoId, precos[planoId]);
    setSalvoId(planoId);
    setTimeout(() => setSalvoId(null), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Planos e preços</h1>
      <p className="mt-1 text-brand-gray-600">
        Ajuste rapidamente o preço sugerido de cada plano. Para editar nomes, descrições e
        benefícios, altere o arquivo <code className="rounded bg-brand-gray-100 px-1.5 py-0.5 text-xs">lib/content.ts</code>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {planosBase.map((p) => (
          <div key={p.id} className="card">
            <p className="font-display text-lg font-bold text-brand-gray-900">{p.nome}</p>
            <p className="text-sm text-brand-gray-600">{p.tagline}</p>

            <div className="mt-4">
              <label className="label-field">Preço sugerido (R$)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="input-field"
                  value={precos[p.id] ?? p.preco}
                  onChange={(e) =>
                    setPrecos((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))
                  }
                />
                <span className="whitespace-nowrap text-sm text-brand-gray-500">{p.precoLabel}</span>
              </div>
            </div>

            <button onClick={() => salvar(p.id)} className="btn-primary mt-4 w-full">
              Salvar preço
            </button>
            {salvoId === p.id && (
              <p className="mt-2 text-center text-xs font-medium text-brand-mintDark">Preço atualizado!</p>
            )}

            <div className="mt-5 border-t border-brand-gray-100 pt-4">
              <p className="text-xs font-semibold uppercase text-brand-gray-500">Benefícios inclusos</p>
              <ul className="mt-2 space-y-1">
                {p.beneficios.map((b) => (
                  <li key={b} className="text-xs text-brand-gray-600">• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
