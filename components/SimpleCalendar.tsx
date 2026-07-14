"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export default function SimpleCalendar({
  value,
  onChange,
}: {
  value: string | null; // yyyy-MM-dd
  onChange: (data: string) => void;
}) {
  const [cursor, setCursor] = useState(new Date());
  const hoje = startOfToday();

  const inicio = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 });
  const fim = endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: inicio, end: fim });

  const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="rounded-xl2 border border-brand-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(subMonths(cursor, 1))}
          className="rounded-lg p-2 text-brand-gray-600 hover:bg-brand-gray-50"
          aria-label="Mês anterior"
        >
          ‹
        </button>
        <p className="font-display font-semibold capitalize text-brand-gray-900">
          {format(cursor, "MMMM yyyy", { locale: ptBR })}
        </p>
        <button
          type="button"
          onClick={() => setCursor(addMonths(cursor, 1))}
          className="rounded-lg p-2 text-brand-gray-600 hover:bg-brand-gray-50"
          aria-label="Próximo mês"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-brand-gray-600">
        {diasSemana.map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dias.map((dia) => {
          const iso = format(dia, "yyyy-MM-dd");
          const foraDoMes = !isSameMonth(dia, cursor);
          const passado = isBefore(dia, hoje);
          const selecionado = value === iso;

          return (
            <button
              key={iso}
              type="button"
              disabled={passado}
              onClick={() => onChange(iso)}
              className={`aspect-square rounded-lg text-sm transition ${
                selecionado
                  ? "bg-brand-darkBlue font-bold text-white shadow-premium"
                  : passado
                  ? "cursor-not-allowed text-brand-gray-300"
                  : foraDoMes
                  ? "text-brand-gray-300 hover:bg-brand-gray-50"
                  : isSameDay(dia, hoje)
                  ? "bg-brand-lightBlue font-semibold text-brand-darkBlue"
                  : "text-brand-gray-700 hover:bg-brand-lightBlue"
              }`}
            >
              {format(dia, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
