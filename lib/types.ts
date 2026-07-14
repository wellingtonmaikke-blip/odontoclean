// Tipos centrais do sistema OdontoClean.
// Alterar aqui reflete em todo o app (formularios, banco simulado, etc).

export type PlanoId = "bronze" | "prata" | "ouro";

export type Frequencia = "unica" | "semanal" | "quinzenal" | "mensal";

export type StatusAgendamento = "pendente" | "confirmado" | "concluido" | "cancelado";

export interface Plano {
  id: PlanoId;
  nome: string;
  tagline: string;
  preco: number; // preço sugerido em R$ (mensal ou por visita, editável)
  precoLabel: string; // ex: "/ visita" ou "/ mês"
  descricao: string;
  beneficios: string[];
  diferenciais: string[];
  destaque?: boolean;
  cor: string; // classe tailwind de cor de destaque
}

export interface Clinica {
  id: string;
  nomeClinica: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  responsavel: string;
  email: string;
  senhaHash: string;
  planoAtual: PlanoId | null;
  criadoEm: string;
}

export interface Agendamento {
  id: string;
  clinicaId: string;
  plano: PlanoId;
  data: string; // ISO yyyy-mm-dd
  horario: string; // HH:mm
  frequencia: Frequencia;
  status: StatusAgendamento;
  observacoes?: string;
  criadoEm: string;
}

export interface Sessao {
  tipo: "clinica" | "admin";
  id: string;
  nome: string;
  email: string;
  exp: number; // timestamp de expiração (simula JWT)
}
