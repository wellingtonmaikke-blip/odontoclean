// =============================================================================
// CONTEÚDO EDITÁVEL DO SITE ODONTOCLEAN
// Todos os textos institucionais, planos e preços ficam centralizados aqui.
// Para alterar qualquer texto do site, edite apenas este arquivo.
// =============================================================================

import { Plano } from "./types";

export const marca = {
  nome: "OdontoClean",
  slogan: "Limpeza e higienização profissional para clínicas odontológicas",
};

// -----------------------------------------------------------------------------
// HOME / HERO
// -----------------------------------------------------------------------------
export const hero = {
  titulo: "Sua clínica impecavelmente limpa. Seus pacientes, mais seguros.",
  subtitulo:
    "A OdontoClean é especializada em limpeza profunda e higienização hospitalar de clínicas odontológicas. Protocolos técnicos, produtos hospitalares e uma equipe treinada para elevar o padrão de biossegurança da sua clínica.",
  ctaPrimario: "Contrate agora",
  ctaSecundario: "Conheça os planos",
  imagemAlt: "Clínica odontológica limpa e organizada",
  selo: "Protocolos de biossegurança certificados",
};

export const homeStats = [
  { numero: "+250", label: "clínicas atendidas" },
  { numero: "98%", label: "de satisfação dos clientes" },
  { numero: "+10", label: "anos de experiência" },
  { numero: "100%", label: "produtos hospitalares" },
];

export const homeChamada = {
  titulo: "Higienização é cuidado. Cuidado gera confiança.",
  texto:
    "Pacientes percebem — e valorizam — uma clínica limpa e organizada. Terceirizar a limpeza e a higienização com a OdontoClean significa mais segurança para sua equipe, mais tranquilidade para seus pacientes e mais tempo para você focar no que faz de melhor: cuidar de sorrisos.",
};

// -----------------------------------------------------------------------------
// PLANOS / SERVIÇOS
// Preços e descrições 100% editáveis. Use este array em toda a aplicação.
// -----------------------------------------------------------------------------
export const planos: Plano[] = [
  {
    id: "bronze",
    nome: "Bronze",
    tagline: "Limpeza completa da infraestrutura",
    preco: 890,
    precoLabel: "/ mês",
    cor: "bronze",
    descricao:
      "Ideal para clínicas que precisam de uma rotina de limpeza confiável e profissional em todos os ambientes, mantendo o padrão de apresentação e higiene que seus pacientes esperam.",
    beneficios: [
      "Limpeza completa de pisos, paredes e superfícies",
      "Higienização de banheiros e copa",
      "Organização e limpeza da recepção e sala de espera",
      "Remoção de resíduos comuns conforme normas sanitárias",
      "Uso de produtos de limpeza profissionais",
    ],
    diferenciais: [
      "Equipe uniformizada e treinada",
      "Checklist de limpeza por ambiente",
      "Flexibilidade de horários",
    ],
  },
  {
    id: "prata",
    nome: "Prata",
    tagline: "Infraestrutura + Higienização de materiais odontológicos",
    preco: 1490,
    precoLabel: "/ mês",
    cor: "silver",
    destaque: true,
    descricao:
      "Tudo do plano Bronze, somado à desinfecção profunda de instrumentais, cadeiras e equipamentos — elevando o nível de biossegurança clínica e reduzindo riscos de contaminação cruzada.",
    beneficios: [
      "Tudo do plano Bronze",
      "Desinfecção de cadeiras odontológicas e equipos",
      "Higienização de instrumentais conforme protocolo hospitalar",
      "Desinfecção de superfícies de contato clínico",
      "Uso de produtos hospitalares certificados (EPA/Anvisa)",
      "Relatório simplificado de higienização",
    ],
    diferenciais: [
      "Protocolos de biossegurança hospitalar",
      "Equipe especializada em ambientes de saúde",
      "Redução de risco de contaminação cruzada",
    ],
  },
  {
    id: "ouro",
    nome: "Ouro",
    tagline: "Higienização completa + Organização de estoque",
    preco: 2190,
    precoLabel: "/ mês",
    cor: "gold",
    descricao:
      "A experiência completa OdontoClean: infraestrutura impecável, instrumentais e equipamentos desinfetados, e a organização e otimização dos seus materiais e estoque — máxima eficiência operacional com máxima segurança.",
    beneficios: [
      "Tudo do plano Prata",
      "Organização de armários e estoque de materiais",
      "Controle de validade de insumos odontológicos",
      "Otimização de layout de materiais por sala",
      "Laudo de higienização emitido mensalmente",
      "Atendimento prioritário e agendamento flexível",
    ],
    diferenciais: [
      "Consultoria de organização de estoque",
      "Laudo técnico de higienização",
      "Suporte prioritário e visitas emergenciais",
    ],
  },
];

// -----------------------------------------------------------------------------
// DIFERENCIAIS
// -----------------------------------------------------------------------------
export const diferenciais = [
  {
    icone: "shield",
    titulo: "Equipe especializada",
    texto:
      "Profissionais treinados especificamente em ambientes clínicos e protocolos de biossegurança odontológica.",
  },
  {
    icone: "flask",
    titulo: "Produtos hospitalares",
    texto:
      "Utilizamos apenas produtos de grau hospitalar, certificados e seguros para ambientes de saúde.",
  },
  {
    icone: "calendar",
    titulo: "Agendamento flexível",
    texto:
      "Frequência única, semanal, quinzenal ou mensal — você escolhe o que faz sentido para sua rotina.",
  },
  {
    icone: "document",
    titulo: "Laudo de higienização",
    texto:
      "Emitimos laudos técnicos que comprovam o padrão de limpeza e higienização da sua clínica.",
  },
  {
    icone: "clock",
    titulo: "Pontualidade garantida",
    texto:
      "Cumprimos rigorosamente os horários agendados, sem impactar a rotina de atendimentos da clínica.",
  },
  {
    icone: "heart",
    titulo: "Cuidado e confiança",
    texto:
      "Tratamos sua clínica como tratamos um ambiente de saúde: com respeito, atenção e responsabilidade.",
  },
];

// -----------------------------------------------------------------------------
// MISSÃO E VISÃO
// -----------------------------------------------------------------------------
export const missaoVisao = {
  missao: {
    titulo: "Nossa Missão",
    texto:
      "Elevar o padrão de biossegurança e higienização das clínicas odontológicas brasileiras, oferecendo serviços técnicos, confiáveis e humanizados que protegem pacientes, profissionais e a reputação de cada clínica atendida.",
  },
  visao: {
    titulo: "Nossa Visão",
    texto:
      "Ser reconhecida como a referência nacional em limpeza e higienização especializada para o setor odontológico, ampliando o conceito de cuidado para muito além da cadeira de atendimento.",
  },
  valores: [
    "Segurança e biossegurança em primeiro lugar",
    "Excelência técnica em cada detalhe",
    "Transparência com nossos clientes",
    "Respeito ao tempo e à rotina da clínica",
    "Melhoria contínua dos nossos protocolos",
  ],
};

// -----------------------------------------------------------------------------
// SOBRE NÓS
// -----------------------------------------------------------------------------
export const sobre = {
  titulo: "Sobre a OdontoClean",
  paragrafos: [
    "A OdontoClean nasceu da percepção de que clínicas odontológicas precisam de muito mais do que uma limpeza convencional: elas exigem protocolos de higienização hospitalar, produtos adequados e uma equipe que entenda a importância da biossegurança no dia a dia clínico.",
    "Ao longo dos anos, desenvolvemos processos específicos para pisos, superfícies, instrumentais e equipamentos odontológicos, sempre alinhados às boas práticas do setor de saúde. Hoje, atendemos clínicas de todos os portes, do consultório individual às grandes redes odontológicas.",
    "Nosso compromisso é simples: entregar tranquilidade. Enquanto cuidamos da limpeza e da higienização, você foca em cuidar dos seus pacientes.",
  ],
};

// -----------------------------------------------------------------------------
// CONTATO
// -----------------------------------------------------------------------------
export const contato = {
  titulo: "Vamos conversar sobre a limpeza da sua clínica?",
  texto:
    "Preencha o formulário ou fale diretamente com nossa equipe comercial. Retornamos em até 1 dia útil.",
  telefone: "(41) 3000-0000",
  whatsapp: "(41) 90000-0000",
  email: "contato@odontoclean.com.br",
  endereco: "Rua das Clínicas, 123 — Curitiba, PR",
  horario: "Segunda a sexta, 8h às 18h",
};

// -----------------------------------------------------------------------------
// RODAPÉ
// -----------------------------------------------------------------------------
export const footerTexto = {
  descricao:
    "Limpeza e higienização profissional especializada em clínicas odontológicas, com protocolos de biossegurança e produtos hospitalares.",
  copyright: `© ${new Date().getFullYear()} OdontoClean. Todos os direitos reservados.`,
};
