"use client";

import { useEffect, useState } from "react";
import { atualizarAgendamento, getAgendamentos, getClinicaPorId } from "@/lib/db";
import { Agendamento, StatusAgendamento } from "@/lib/types";
import { servicos } from "@/lib/content";

const statusOptions: StatusAgendamento[] = ["pendente", "confirmado", "concluido", "cancelado"];

const statusEstilo: Record<StatusAgendamento, string> = {
  pendente: "bg-yellow-100 text-yellow-700",
  confirmado: "bg-brand-lightBlue text-brand-darkBlue",
  concluido: "bg-brand-mint/15 text-brand-mintDark",
  cancelado: "bg-red-100 text-red-700",
};

export default function AdminAgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  function carregar() {
    setAgendamentos(
      getAgendamentos().sort((a, b) => (a.data < b.data ? 1 : -1))
    );
  }

  useEffect(() => {
    carregar();
  }, []);

  function mudarStatus(id: string, status: StatusAgendamento) {
    atualizarAgendamento(id, { status });
    carregar();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-brand-gray-900">Todos os agendamentos</h1>
      <p className="mt-1 text-brand-gray-600">Gerencie o status de todos os serviços agendados pelas clínicas.</p>

      <div className="mt-6 overflow-x-auto rounded-xl2 bg-white shadow-card ring-1 ring-black/5">
        <table className="min-w-full divide-y divide-brand-gray-100 text-sm">
          <thead className="bg-brand-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Clínica</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Serviço</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Data / Horário</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Frequência</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-100">
            {agendamentos.map((a) => {
              const clinica = getClinicaPorId(a.clinicaId);
              return (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-brand-gray-900">{clinica?.nomeClinica ?? "—"}</td>
                  <td className="px-4 py-3 text-brand-gray-700">{servicos.find((s) => s.id === a.servico)?.nome}</td>
                  <td className="px-4 py-3 text-brand-gray-700">
                    {new Date(a.data + "T00:00:00").toLocaleDateString("pt-BR")} às {a.horario}
                  </td>
                  <td className="px-4 py-3 capitalize text-brand-gray-700">{a.frequencia === "mensal" ? "Mensal (recorrente)" : "Atendimento único"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => mudarStatus(a.id, e.target.value as StatusAgendamento)}
                      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold capitalize outline-none ${statusEstilo[a.status]}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
            {agendamentos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-brand-gray-500">
                  Nenhum agendamento registrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
