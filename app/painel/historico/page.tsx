"use client";

import { useEffect, useState } from "react";
import { getSessao } from "@/lib/auth";
import { atualizarAgendamento, getAgendamentosPorClinica } from "@/lib/db";
import { Agendamento, StatusAgendamento } from "@/lib/types";
import { servicos } from "@/lib/content";

const statusEstilo: Record<StatusAgendamento, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  confirmado: "bg-brand-lightBlue text-brand-darkBlue",
  concluido: "bg-brand-mint/15 text-brand-mintDark",
  cancelado: "bg-red-100 text-red-700",
};

const frequenciaLabel: Record<string, string> = {
  unica: "Atendimento único",
  mensal: "Recorrência mensal",
};

export default function HistoricoPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [filtro, setFiltro] = useState<"todos" | StatusAgendamento>("todos");

  function carregar() {
    const sessao = getSessao();
    if (!sessao) return;
    setAgendamentos(getAgendamentosPorClinica(sessao.id));
  }

  useEffect(() => {
    carregar();
  }, []);

  function cancelar(id: string) {
    atualizarAgendamento(id, { status: "cancelado" });
    carregar();
  }

  const lista = agendamentos.filter((a) => filtro === "todos" || a.status === filtro);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Histórico de agendamentos</h1>
      <p className="mt-1 text-brand-gray-600">Acompanhe todos os serviços contratados e seus status.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["todos", "pendente", "confirmado", "concluido", "cancelado"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              filtro === f ? "bg-brand-darkBlue text-white" : "bg-white text-brand-gray-700 ring-1 ring-brand-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {lista.length === 0 && (
          <div className="card text-center text-sm text-brand-gray-600">Nenhum agendamento encontrado.</div>
        )}
        {lista.map((a) => (
          <div key={a.id} className="card flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-display font-bold text-brand-gray-900">
                {servicos.find((s) => s.id === a.servico)?.nome}
              </p>
              <p className="text-sm text-brand-gray-600">
                {new Date(a.data + "T00:00:00").toLocaleDateString("pt-BR")} às {a.horario} · {frequenciaLabel[a.frequencia]}
              </p>
              {a.observacoes && <p className="mt-1 text-xs text-brand-gray-500">Obs: {a.observacoes}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusEstilo[a.status]}`}>
                {a.status}
              </span>
              {(a.status === "pendente" || a.status === "confirmado") && (
                <button
                  onClick={() => cancelar(a.id)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
