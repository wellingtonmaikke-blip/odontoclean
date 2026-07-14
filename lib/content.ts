// =============================================================================
// CONTEÚDO EDITÁVEL DO SITE MÉTODO FLUXO
// Todos os textos institucionais, serviços e preços ficam centralizados aqui.
// Para alterar qualquer texto do site, edite apenas este arquivo.
// =============================================================================

import { Servico } from "./types";

export const marca = {
  nome: "Método Fluxo",
  slogan: "Consultoria de eficiência operacional para clínicas odontológicas",
};

// -----------------------------------------------------------------------------
// HOME / HERO
// -----------------------------------------------------------------------------
export const hero = {
  titulo: "Nós organizamos a operação da sua clínica para que cada atendimento aconteça com mais agilidade, segurança e previsibilidade.",
  subtitulo:
    "Somos uma consultoria de eficiência operacional para clínicas odontológicas. Organizamos processos, implantamos protocolos e treinamos equipes para reduzir desperdícios, atrasos e estresse no consultório — sem vender apenas \"treinamento\", e sim resultado.",
  ctaPrimario: "Solicitar diagnóstico",
  ctaSecundario: "Conheça os serviços",
  imagemAlt: "Clínica odontológica organizada e com processos padronizados",
  selo: "Método aplicado em clínicas odontológicas de todos os portes",
};

export const homeStats = [
  { numero: "+80", label: "clínicas organizadas" },
  { numero: "98%", label: "de satisfação dos clientes" },
  { numero: "9", label: "módulos no treinamento de ASBs" },
  { numero: "0–100", label: "pontuação no diagnóstico operacional" },
];

export const homeChamada = {
  titulo: "Você não compra organização. Você compra resultado.",
  texto:
    "Menos tempo perdido, menos erros, menos estresse da equipe, mais produtividade e uma experiência melhor para o paciente. A organização é apenas o meio — o resultado é uma clínica que funciona com previsibilidade, do primeiro ao último atendimento do dia.",
};

// -----------------------------------------------------------------------------
// SERVIÇOS
// Preços e descrições 100% editáveis. Use este array em toda a aplicação.
// -----------------------------------------------------------------------------
export const servicos: Servico[] = [
  {
    id: "diagnostico",
    nome: "Diagnóstico Operacional",
    tagline: "A porta de entrada: descubra o que está travando a produtividade da sua clínica",
    tipo: "avulso",
    precoMin: 300,
    precoMax: 700,
    precoLabel: "",
    duracao: "Visita de 1 hora",
    descricao:
      "Uma avaliação rápida e objetiva da operação da sua clínica. Analisamos organização, esterilização, fluxo de atendimento, atuação das ASBs/TSBs e controle de materiais — e entregamos um relatório com pontuação de 0 a 100 e um plano de ação.",
    inclui: [
      "Avaliação da organização geral do consultório",
      "Avaliação do fluxo de esterilização",
      "Avaliação do fluxo de atendimento",
      "Avaliação da atuação das ASBs/TSBs",
      "Avaliação de materiais e estoque",
      "Relatório com pontuação (0 a 100)",
      "Plano de ação com prioridades",
    ],
    entrega: "Relatório de diagnóstico com pontuação e plano de ação.",
    diferenciais: [
      "Baixo investimento inicial",
      "Reduz a resistência antes da implantação completa",
      "Primeiro passo antes da Implantação Completa",
    ],
    badge: "Porta de entrada",
    cor: "gold",
  },
  {
    id: "implantacao",
    nome: "Implantação Completa",
    tagline: "O serviço principal: sua clínica organizada, documentada e pronta para funcionar",
    tipo: "avulso",
    precoMin: 2500,
    precoMax: 6000,
    precoLabel: "",
    duracao: "1 a 2 dias na clínica",
    descricao:
      "Vamos até a sua clínica e organizamos toda a operação: instrumentais, bandejas, estoque e esterilização, com a documentação de protocolos e o treinamento da equipe. Ao final, sua clínica recebe o selo Clínica Organizada®.",
    inclui: [
      "Organização dos instrumentais por especialidade",
      "Padronização das bandejas",
      "Organização de gavetas e armários",
      "Identificação com etiquetas",
      "Organização e controle de estoque",
      "Padronização do fluxo de esterilização",
      "Checklist de abertura e fechamento",
      "Organização do carrinho clínico",
      "Manual da clínica personalizado",
      "Treinamento da equipe",
    ],
    entrega: "Consultório pronto para trabalhar, com manual da clínica, checklists e equipe treinada.",
    diferenciais: [
      "Inclui o selo Clínica Organizada®",
      "Reduz tempo de atendimento e erros",
      "Padronização que facilita a integração de novas ASBs",
    ],
    badge: "Mais contratado",
    destaque: true,
    cor: "darkBlue",
  },
  {
    id: "treinamento",
    nome: "Treinamento de ASBs",
    tagline: "Equipe capacitada em biossegurança, instrumentação e atendimento",
    tipo: "avulso",
    precoMin: 1500,
    precoMax: 4000,
    precoLabel: "",
    duracao: "Treinamento prático presencial",
    descricao:
      "Formação prática para ASBs e TSBs, em 9 módulos que cobrem os fundamentos de uma operação clínica eficiente e segura — da biossegurança à fotografia clínica.",
    inclui: [
      "Módulo 1 — Biossegurança",
      "Módulo 2 — Instrumentação",
      "Módulo 3 — Ergonomia",
      "Módulo 4 — Organização",
      "Módulo 5 — Atendimento ao paciente",
      "Módulo 6 — Controle de estoque",
      "Módulo 7 — Esterilização",
      "Módulo 8 — Fotografia clínica",
      "Módulo 9 — Fluxo de pacientes",
    ],
    entrega: "Certificado de conclusão para cada participante.",
    diferenciais: [
      "Conteúdo 100% prático",
      "Aplicável desde o primeiro dia de trabalho",
      "Pode ser contratado junto com a Implantação Completa",
    ],
    cor: "silver",
  },
  {
    id: "manual",
    nome: "Manual e Documentação de Protocolos",
    tagline: "Toda a operação da clínica documentada em POPs, manuais e checklists",
    tipo: "avulso",
    precoMin: 1500,
    precoMax: 3000,
    precoLabel: "",
    duracao: "Entrega em documento",
    descricao:
      "Criamos toda a documentação que sustenta a padronização da sua clínica: procedimentos operacionais padrão, manuais e checklists de rotina.",
    inclui: [
      "POPs (Procedimentos Operacionais Padrão)",
      "Manual do ASB",
      "Checklist diário",
      "Checklist semanal",
      "Checklist mensal",
      "Manual de esterilização",
      "Manual de limpeza",
      "Controle de validade",
      "Controle de estoque",
    ],
    entrega: "Conjunto completo de manuais e checklists prontos para uso.",
    diferenciais: [
      "Pode ser contratado separadamente ou junto com a Implantação",
      "Documentação sob medida para a rotina da sua clínica",
    ],
    cor: "bronze",
  },
  {
    id: "mentoria",
    nome: "Mentoria Mensal",
    tagline: "Acompanhamento contínuo para manter a operação sempre em dia",
    tipo: "recorrente",
    precoMin: 700,
    precoMax: 2000,
    precoLabel: "/ mês",
    duracao: "Uma visita por mês",
    descricao:
      "Depois de organizar tudo, visitamos sua clínica uma vez por mês para auditoria, reciclagem, treinamento e acompanhamento — garantindo que os processos continuem funcionando.",
    inclui: [
      "Auditoria mensal dos processos",
      "Reciclagem de conteúdo com a equipe",
      "Treinamento contínuo",
      "Acompanhamento de indicadores",
      "Cronograma de auditoria do selo Clínica Organizada®",
    ],
    entrega: "Relatório mensal de acompanhamento.",
    diferenciais: [
      "Modelo de recorrência",
      "O serviço mais estratégico para o relacionamento de longo prazo",
      "Ideal para clínicas que já passaram pela Implantação Completa",
    ],
    badge: "Assinatura mensal",
    cor: "mint",
  },
];

// -----------------------------------------------------------------------------
// DIFERENCIAIS
// -----------------------------------------------------------------------------
export const diferenciais = [
  {
    icone: "clock",
    titulo: "Redução do tempo de atendimento",
    texto:
      "Processos padronizados eliminam gargalos e deixam a rotina de atendimento mais ágil, do início ao fim do dia.",
  },
  {
    icone: "shield",
    titulo: "Diminuição de erros e mais segurança",
    texto:
      "Protocolos claros de biossegurança e esterilização reduzem falhas e aumentam a segurança de pacientes e equipe.",
  },
  {
    icone: "calendar",
    titulo: "Aumento de produtividade",
    texto:
      "Com fluxos e checklists definidos, a equipe realiza mais atendimentos com menos retrabalho.",
  },
  {
    icone: "flask",
    titulo: "Economia de materiais e estoque",
    texto:
      "Organização e controle de validade reduzem desperdício e evitam compras desnecessárias.",
  },
  {
    icone: "heart",
    titulo: "Melhor experiência do paciente",
    texto:
      "Uma clínica organizada e previsível transmite confiança e eleva a percepção de qualidade pelo paciente.",
  },
  {
    icone: "document",
    titulo: "Facilidade para novos funcionários",
    texto:
      "Manuais e POPs tornam a integração de novas ASBs mais rápida e reduzem a dependência de pessoas específicas.",
  },
];

// -----------------------------------------------------------------------------
// MISSÃO E VISÃO
// -----------------------------------------------------------------------------
export const missaoVisao = {
  missao: {
    titulo: "Nossa Missão",
    texto:
      "Transformar equipes desorganizadas em equipes produtivas, reduzindo desperdícios, atrasos e estresse no consultório, para que cada atendimento aconteça com mais agilidade, segurança e previsibilidade.",
  },
  visao: {
    titulo: "Nossa Visão",
    texto:
      "Ser a referência em eficiência operacional para clínicas odontológicas, ampliando o conceito de organização para estoque, protocolos clínicos, onboarding de equipes e gestão operacional.",
  },
  valores: [
    "Segurança do paciente e biossegurança em primeiro lugar",
    "Organização e padronização como base da produtividade",
    "Transparência com nossos clientes",
    "Economia de tempo e de materiais",
    "Melhoria contínua dos processos e protocolos",
  ],
};

// -----------------------------------------------------------------------------
// SOBRE NÓS
// -----------------------------------------------------------------------------
export const sobre = {
  titulo: "Sobre o Método Fluxo",
  paragrafos: [
    "Depois de anos de experiência no dia a dia de clínicas odontológicas, percebemos que muitos problemas não acontecem por falta de bons profissionais, mas pela ausência de processos. A partir dessa percepção, desenvolvemos um método para organizar consultórios e treinar equipes, tornando a rotina mais eficiente.",
    "Não vendemos apenas organização ou treinamento: vendemos mais produtividade, menos desperdício, menos estresse da equipe, padronização dos processos, integração mais rápida de novas ASBs e uma experiência melhor para o paciente.",
    "Hoje atendemos clínicas de todos os portes, do consultório individual às redes odontológicas, sempre com o mesmo compromisso: organizar a operação para que o dentista possa focar no que faz de melhor — cuidar dos seus pacientes.",
  ],
};

// -----------------------------------------------------------------------------
// CONTATO
// -----------------------------------------------------------------------------
export const contato = {
  titulo: "Vamos falar sobre a eficiência operacional da sua clínica?",
  texto:
    "Preencha o formulário ou fale diretamente com a nossa equipe. Retornamos em até 1 dia útil.",
  telefone: "(41) 3000-0000",
  whatsapp: "(41) 90000-0000",
  email: "contato@metodofluxo.com.br",
  endereco: "Rua das Clínicas, 123 — Curitiba, PR",
  horario: "Segunda a sexta, 8h às 18h",
};

// -----------------------------------------------------------------------------
// RODAPÉ
// -----------------------------------------------------------------------------
export const footerTexto = {
  descricao:
    "Consultoria de eficiência operacional para clínicas odontológicas: diagnóstico, implantação de processos, treinamento de equipes e mentoria contínua.",
  copyright: `© ${new Date().getFullYear()} Método Fluxo. Todos os direitos reservados.`,
};
