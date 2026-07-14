"use client";

import { useEffect, useState } from "react";
import { servicos as servicosBase } from "@/lib/content";
import { getPrecosOverride, salvarPrecoServico, FaixaPreco } from "@/lib/db";

export default function AdminServicosPage() {
  const [faixas, setFaixas] = useState<Record<string, FaixaPreco>>({});
  const [salvoId, setSalvoId] = useState<string | null>(null);

  useEffect(() => {
    const overrides = getPrecosOverride();
    const iniciais: Record<string, FaixaPreco> = {};
    servicosBase.forEach((s) => {
      iniciais[s.id] = overrides[s.id] ?? { min: s.precoMin, max: s.precoMax };
    });
    setFaixas(iniciais);
  }, []);

  function atualizarCampo(servicoId: string, campo: "min" | "max", valor: number) {
    setFaixas((prev) => ({ ...prev, [servicoId]: { ...prev[servicoId], [campo]: valor } }));
  }

  function salvar(servicoId: string) {
    salvarPrecoServico(servicoId, faixas[servicoId]);
    setSalvoId(servicoId);
    setTimeout(() => setSalvoId(null), 2000);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Serviços e preços</h1>
      <p className="mt-1 text-brand-gray-600">
        Ajuste rapidamente a faixa de preço sugerida de cada serviço. Para editar nomes, descrições e
        itens inclusos, altere o arquivo <code className="rounded bg-brand-gray-100 px-1.5 py-0.5 text-xs">lib/content.ts</code>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {servicosBase.map((s) => (
          <div key={s.id} className="card">
            <p className="font-display text-lg font-bold text-brand-gray-900">{s.nome}</p>
            <p className="text-sm text-brand-gray-600">{s.tagline}</p>
            <p className="mt-1 text-xs font-semibold uppercase text-brand-gray-500">
              {s.tipo === "recorrente" ? "Serviço recorrente" : "Serviço avulso"}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="label-field">Preço mínimo (R$)</label>
                <input
                  type="number"
                  className="input-field"
                  value={faixas[s.id]?.min ?? s.precoMin}
                  onChange={(e) => atualizarCampo(s.id, "min", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="label-field">Preço máximo (R$)</label>
                <input
                  type="number"
                  className="input-field"
                  value={faixas[s.id]?.max ?? s.precoMax}
                  onChange={(e) => atualizarCampo(s.id, "max", Number(e.target.value))}
                />
              </div>
            </div>
            {s.precoLabel && <p className="mt-1 text-xs text-brand-gray-500">Label: {s.precoLabel}</p>}

            <button onClick={() => salvar(s.id)} className="btn-primary mt-4 w-full">
              Salvar faixa de preço
            </button>
            {salvoId === s.id && (
              <p className="mt-2 text-center text-xs font-medium text-brand-mintDark">Preço atualizado!</p>
            )}

            <div className="mt-5 border-t border-brand-gray-100 pt-4">
              <p className="text-xs font-semibold uppercase text-brand-gray-500">O que inclui</p>
              <ul className="mt-2 space-y-1">
                {s.inclui.map((b) => (
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
