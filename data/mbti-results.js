const results = {
  INTJ: {
    title: "O Arquiteto",
    description: "Você é estratégico, analítico e independente. Consegue ver o quadro geral e planejar com precisão.",
    image: "/cards/arquiteto.png",
    strengths: [
      "Visão de longo prazo e pensamento estratégico",
      "Autossuficiência e confiança em suas ideias",
      "Capacidade de planejar com eficiência",
      "Alto nível de concentração e foco"
    ],
    challenges: [
      "Pode parecer frio ou distante emocionalmente",
      "Impaciência com erros alheios",
      "Tendência ao perfeccionismo"
    ],
    recommendations: [
      "Pratique empatia ativa",
      "Busque equilibrar estratégia com flexibilidade",
      "Valorize colaborações com pessoas de perfis diferentes"
    ]
  },
  INTP: {
    title: "O Lógico",
    description: "Você é curioso, criativo e adora entender sistemas complexos e teorias inovadoras.",
    image: "/cards/mbti.png",
    strengths: [
      "Pensamento lógico e crítico",
      "Forte habilidade analítica",
      "Criatividade na resolução de problemas",
      "Independência intelectual"
    ],
    challenges: [
      "Dificuldade em aplicar ideias de forma prática",
      "Tendência a procrastinar",
      "Pode parecer emocionalmente distante"
    ],
    recommendations: [
      "Encontre formas práticas de aplicar seu conhecimento",
      "Estabeleça prazos claros para seus projetos",
      "Conecte-se emocionalmente com as pessoas ao seu redor"
    ]
  },
  ENTJ: {
    title: "O Comandante",
    description: "Você lidera com eficiência e adora planejar o futuro.",
    image: "/cards/mbti.png",
    strengths: [
      "Liderança natural e tomada de decisão firme",
      "Organização e planejamento eficientes",
      "Foco em resultados e metas claras"
    ],
    challenges: [
      "Tendência a ser controlador",
      "Dificuldade em lidar com emoções alheias",
      "Pode negligenciar o lado emocional das relações"
    ],
    recommendations: [
      "Escute com atenção ativa",
      "Valorize os sentimentos dos outros em decisões",
      "Pratique delegar com empatia"
    ]
  },
  ENTP: {
    title: "O Visionário",
    description: "Você é inovador, persuasivo e adora explorar novas ideias e desafios.",
    image: "/cards/mbti.png",
    strengths: [
      "Capacidade de improvisar e adaptar-se",
      "Habilidade para enxergar múltiplas possibilidades",
      "Carisma e comunicação eficaz"
    ],
    challenges: [
      "Dificuldade em finalizar projetos",
      "Tendência à impulsividade",
      "Pode se distrair com ideias demais"
    ],
    recommendations: [
      "Crie sistemas para acompanhar ideias até o fim",
      "Busque estabilidade sem perder a criatividade",
      "Desenvolva escuta ativa"
    ]
  },
  INFJ: {
    title: "O Conselheiro",
    description: "Você é sensível, idealista e motivado por um profundo senso de propósito.",
    image: "/cards/mbti.png",
    strengths: [
      "Intuição poderosa e empatia",
      "Comunicação inspiradora",
      "Capacidade de criar conexões profundas"
    ],
    challenges: [
      "Tende a se sobrecarregar emocionalmente",
      "Dificuldade em aceitar críticas",
      "Perfeccionismo idealista"
    ],
    recommendations: [
      "Pratique limites saudáveis",
      "Aceite imperfeições com compaixão",
      "Reserve tempo para recarregar sua energia"
    ]
  },
  INFP: {
    title: "O Idealista",
    description: "Você valoriza autenticidade, criatividade e vive com um profundo senso de significado.",
    image: "/cards/mbti.png",
    strengths: [
      "Imaginação vívida",
      "Profundo senso de empatia",
      "Paixão por causas significativas"
    ],
    challenges: [
      "Tendência a evitar conflitos",
      "Dificuldade em tomar decisões objetivas",
      "Pode sentir-se incompreendido"
    ],
    recommendations: [
      "Aprenda a equilibrar emoção com razão",
      "Expresse suas necessidades com clareza",
      "Busque ambientes que nutram sua sensibilidade"
    ]
  },
  ENFJ: {
    title: "O Protagonista",
    description: "Você inspira pessoas com empatia, liderança natural e forte senso de missão.",
    image: "/cards/mbti.png",
    strengths: [
      "Habilidade para motivar e unir pessoas",
      "Alta inteligência emocional",
      "Comprometimento com o bem coletivo"
    ],
    challenges: [
      "Colocar os outros antes de si mesmo",
      "Tendência a se preocupar demais com a opinião alheia",
      "Pode se sentir esgotado facilmente"
    ],
    recommendations: [
      "Priorize o autocuidado",
      "Pratique o 'não' com amor",
      "Delegue responsabilidades para evitar sobrecarga"
    ]
  },
  ENFP: {
    title: "O Inspirador",
    description: "Você é entusiasmado, criativo e tem facilidade em conectar com as pessoas.",
    image: "/cards/mbti.png",
    strengths: [
      "Entusiasmo contagiante",
      "Grande adaptabilidade",
      "Capacidade de ver o melhor nos outros"
    ],
    challenges: [
      "Pode se dispersar em muitos projetos",
      "Dificuldade em manter rotina",
      "Sensível a críticas"
    ],
    recommendations: [
      "Crie rituais de foco e disciplina",
      "Aceite os próprios limites",
      "Concentre-se em menos, com mais profundidade"
    ]
  },
  ISTJ: {
    title: "O Inspetor",
    description: "Você é responsável, organizado e comprometido com a lógica.",
    image: "/cards/mbti.png",
    strengths: [
      "Foco em dever e responsabilidade",
      "Organização e confiabilidade",
      "Pensamento lógico e estruturado"
    ],
    challenges: [
      "Tendência a ser inflexível",
      "Dificuldade em lidar com mudanças",
      "Excesso de autocrítica"
    ],
    recommendations: [
      "Pratique flexibilidade nos planos",
      "Abra espaço para novas ideias",
      "Reconheça suas conquistas sem culpa"
    ]
  },
  ISFJ: {
    title: "O Protetor",
    description: "Você é leal, gentil e comprometido com o bem-estar das pessoas ao seu redor.",
    image: "/cards/mbti.png",
    strengths: [
      "Empatia e dedicação",
      "Forte senso de dever",
      "Atenção aos detalhes"
    ],
    challenges: [
      "Tende a se sacrificar demais",
      "Dificuldade em expressar suas necessidades",
      "Resistência a mudanças"
    ],
    recommendations: [
      "Coloque-se em primeiro lugar quando necessário",
      "Pratique a assertividade",
      "Permita-se sair da zona de conforto"
    ]
  },
  ESTJ: {
    title: "O Executivo",
    description: "Você é prático, organizado e sabe liderar com eficiência e clareza.",
    image: "/cards/mbti.png",
    strengths: [
      "Liderança estruturada",
      "Organização impecável",
      "Determinação e foco"
    ],
    challenges: [
      "Pode parecer autoritário",
      "Resistência à inovação",
      "Dificuldade com emoções"
    ],
    recommendations: [
      "Pratique a escuta empática",
      "Seja flexível diante de novas abordagens",
      "Valorize a dimensão emocional do trabalho"
    ]
  },
  ESFJ: {
    title: "O Provedor",
    description: "Você é caloroso, confiável e comprometido com o bem-estar coletivo.",
    image: "/cards/mbti.png",
    strengths: [
      "Sensibilidade às necessidades alheias",
      "Boa comunicação interpessoal",
      "Alto nível de responsabilidade"
    ],
    challenges: [
      "Pode depender da aprovação dos outros",
      "Dificuldade em lidar com críticas",
      "Tendência ao excesso de zelo"
    ],
    recommendations: [
      "Desenvolva autovalidação",
      "Aceite falhas como parte do processo",
      "Pratique o autocuidado emocional"
    ]
  },
  ISTP: {
    title: "O Virtuoso",
    description: "Você é prático, analítico e gosta de resolver problemas com criatividade.",
    image: "/cards/mbti.png",
    strengths: [
      "Solução rápida de problemas",
      "Tranquilidade sob pressão",
      "Habilidade manual e técnica"
    ],
    challenges: [
      "Tendência a evitar compromissos emocionais",
      "Dificuldade em expressar sentimentos",
      "Impaciência com regras"
    ],
    recommendations: [
      "Explore sua criatividade em ambientes colaborativos",
      "Permita-se vulnerabilidades",
      "Cultive o autocuidado emocional"
    ]
  },
  ISFP: {
    title: "O Aventureiro",
    description: "Você é sensível, artístico e busca viver com liberdade e harmonia.",
    image: "/cards/mbti.png",
    strengths: [
      "Espírito livre e espontâneo",
      "Criatividade artística",
      "Forte empatia com o ambiente"
    ],
    challenges: [
      "Dificuldade em planejar a longo prazo",
      "Tendência à introspecção excessiva",
      "Fuga de conflitos"
    ],
    recommendations: [
      "Crie pequenos planos de ação",
      "Compartilhe sua sensibilidade com o mundo",
      "Aprenda a encarar conflitos com gentileza"
    ]
  },
  ESTP: {
    title: "O Empreendedor",
    description: "Você é ousado, prático e gosta de viver experiências intensas.",
    image: "/cards/mbti.png",
    strengths: [
      "Agilidade na tomada de decisões",
      "Habilidade para lidar com crises",
      "Energia e entusiasmo"
    ],
    challenges: [
      "Tendência a agir sem pensar",
      "Dificuldade em concluir projetos",
      "Busca constante por adrenalina"
    ],
    recommendations: [
      "Pratique foco e persistência",
      "Aprenda com pausas e reflexões",
      "Equilibre ação com propósito"
    ]
  },
  ESFP: {
    title: "O Animador",
    description: "Você é extrovertido, alegre e espalha luz por onde passa.",
    image: "/cards/mbti.png",
    strengths: [
      "Alegria contagiante",
      "Facilidade em socializar",
      "Presença marcante"
    ],
    challenges: [
      "Foco no presente em detrimento do futuro",
      "Busca excessiva por validação",
      "Dificuldade com rotinas"
    ],
    recommendations: [
      "Crie estruturas que apoiem sua liberdade",
      "Cultive momentos de introspecção",
      "Encontre propósito além da diversão"
    ]
  }
};

export default results;