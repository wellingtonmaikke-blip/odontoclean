// Tipos centrais do sistema Método Fluxo.
// Alterar aqui reflete em todo o app (formulários, banco simulado, etc).

export type ServicoId = "diagnostico" | "implantacao" | "treinamento" | "manual" | "mentoria";

export type TipoServico = "avulso" | "recorrente";

export type Frequencia = "unica" | "mensal";

export type StatusAgendamento = "pendente" | "confirmado" | "concluido" | "cancelado";

export interface Servico {
  id: ServicoId;
  nome: string;
  tagline: string;
  tipo: TipoServico; // "avulso" (atendimento único) ou "recorrente" (mensal)
  precoMin: number; // faixa de preço sugerida em R$
  precoMax: number;
  precoLabel: string; // ex: "/ mês" para recorrente, "" para avulso
  duracao: string; // ex: "Visita de 1 hora", "1 a 2 dias na clínica"
  descricao: string;
  inclui: string[]; // o que está incluso no serviço
  entrega: string; // o que a clínica recebe ao final
  diferenciais: string[];
  badge?: string; // texto de destaque no card, ex: "Porta de entrada"
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
  servicoAtual: ServicoId | null;
  criadoEm: string;
}

export interface Agendamento {
  id: string;
  clinicaId: string;
  servico: ServicoId;
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
