// /data/mbti-results.js

const results = {
  INTJ: {
    title: "O Arquiteto",
    description: "Você é estratégico, analítico e movido por grandes visões.",
    image: "/cards/mbti.png",
    strengths: [
      "Pensamento estratégico e visão de longo prazo",
      "Autossuficiência e foco em resultados",
      "Capacidade de resolver problemas complexos",
      "Criatividade intelectual e lógica refinada"
    ],
    challenges: [
      "Dificuldade em lidar com emoções alheias",
      "Tendência à perfeição e controle",
      "Pode parecer distante ou crítico demais"
    ],
    recommendations: [
      "Pratique empatia nas interações",
      "Valorize a contribuição emocional de outras pessoas",
      "Equilibre perfeccionismo com ação prática"
    ]
  },
  INTP: {
    title: "O Lógico",
    description: "Você é curioso, inventivo e motivado a entender o mundo de forma profunda.",
    image: "/cards/mbti.png",
    strengths: [
      "Pensamento lógico e analítico",
      "Criatividade para ideias e sistemas inovadores",
      "Autonomia intelectual",
      "Flexibilidade para explorar múltiplas teorias"
    ],
    challenges: [
      "Pode se perder em ideias e não finalizar projetos",
      "Tendência à procrastinação",
      "Dificuldade em expressar emoções"
    ],
    recommendations: [
      "Defina metas práticas para suas ideias",
      "Busque parcerias com perfis organizados",
      "Trabalhe a comunicação emocional"
    ]
  },
  ENTJ: {
    title: "O Comandante",
    description: "Você é um líder nato, determinado e focado em transformar ideias em ação.",
    image: "/cards/mbti.png",
    strengths: [
      "Liderança e tomada de decisão confiantes",
      "Visão estratégica com foco em resultados",
      "Motivação para desafios e crescimento constante"
    ],
    challenges: [
      "Pode parecer autoritário",
      "Impaciência com erros ou lentidão",
      "Tendência a negligenciar o lado emocional"
    ],
    recommendations: [
      "Desenvolva escuta ativa e empatia",
      "Valorize as emoções no processo de liderança",
      "Pratique a humildade em decisões coletivas"
    ]
  },
  ENTP: {
    title: "O Visionário",
    description: "Você é entusiasmado, criativo e motivado por novas possibilidades.",
    image: "/cards/mbti.png",
    strengths: [
      "Adaptabilidade e agilidade mental",
      "Criatividade e inovação constante",
      "Carisma e persuasão em ideias"
    ],
    challenges: [
      "Dificuldade em seguir rotinas",
      "Tende a abandonar projetos pela metade",
      "Dispersão em muitos interesses ao mesmo tempo"
    ],
    recommendations: [
      "Crie um sistema para concluir projetos",
      "Trabalhe o foco e a disciplina",
      "Valorize a escuta ativa nas conversas"
    ]
  },
  INFJ: {
    title: "O Conselheiro",
    description: "Você é idealista, sensível e movido por causas profundas.",
    image: "/cards/mbti.png",
    strengths: [
      "Empatia e profunda compreensão humana",
      "Capacidade de escutar e aconselhar",
      "Determinação silenciosa para alcançar objetivos significativos"
    ],
    challenges: [
      "Tende a absorver os problemas dos outros",
      "Dificuldade em impor limites",
      "Pode guardar emoções por muito tempo"
    ],
    recommendations: [
      "Estabeleça autocuidado emocional",
      "Aprenda a dizer não com amor",
      "Compartilhe suas próprias vulnerabilidades"
    ]
  },
  INFP: {
    title: "O Idealista",
    description: "Você valoriza autenticidade, profundidade e conexão emocional.",
    image: "/cards/mbti.png",
    strengths: [
      "Criatividade emocional e artística",
      "Forte senso de valores",
      "Capacidade de empatia e escuta ativa"
    ],
    challenges: [
      "Pode evitar conflitos a todo custo",
      "Dificuldade em lidar com críticas",
      "Oscilações de motivação"
    ],
    recommendations: [
      "Abrace a imperfeição sem culpa",
      "Expresse ideias com coragem",
      "Busque rotinas que alimentem seu propósito"
    ]
  },
  ENFJ: {
    title: "O Protagonista",
    description: "Você inspira e motiva os outros com empatia e liderança natural.",
    image: "/cards/mbti.png",
    strengths: [
      "Carisma e liderança empática",
      "Forte habilidade de comunicação",
      "Compromisso com o bem coletivo"
    ],
    challenges: [
      "Pode negligenciar as próprias necessidades",
      "Excesso de responsabilidade pelos outros",
      "Dificuldade em lidar com decepções"
    ],
    recommendations: [
      "Reserve tempo para seu autocuidado",
      "Delegue com confiança",
      "Estabeleça limites saudáveis"
    ]
  },
  ENFP: {
    title: "O Inspirador",
    description: "Você é espontâneo, criativo e movido por conexões humanas.",
    image: "/cards/mbti.png",
    strengths: [
      "Entusiasmo e energia contagiante",
      "Capacidade de enxergar potencial nas pessoas",
      "Criatividade e otimismo em projetos novos"
    ],
    challenges: [
      "Tende a se sobrecarregar com novas ideias",
      "Dificuldade em finalizar tarefas",
      "Oscilações de humor e foco"
    ],
    recommendations: [
      "Crie sistemas simples de organização",
      "Pratique a escuta sem interrupção",
      "Mantenha consistência sem perder liberdade"
    ]
  },
  ISTJ: {
    title: "O Inspetor",
    description: "Você é confiável, disciplinado e leal às responsabilidades.",
    image: "/cards/mbti.png",
    strengths: [
      "Responsabilidade e comprometimento",
      "Organização e consistência",
      "Memória excelente e atenção aos detalhes"
    ],
    challenges: [
      "Resistência a mudanças inesperadas",
      "Dificuldade em lidar com ideias abstratas",
      "Pode parecer rígido ou inflexível"
    ],
    recommendations: [
      "Seja mais aberto a novas abordagens",
      "Valorize o inesperado como aprendizado",
      "Exercite a flexibilidade emocional"
    ]
  },
  ISFJ: {
    title: "O Protetor",
    description: "Você é dedicado, gentil e focado no bem-estar alheio.",
    image: "/cards/mbti.png",
    strengths: [
      "Altruísmo e atenção ao próximo",
      "Detalhismo e confiabilidade",
      "Memória afetiva marcante"
    ],
    challenges: [
      "Tende a se anular pelos outros",
      "Pode evitar confrontos importantes",
      "Resistência a mudanças radicais"
    ],
    recommendations: [
      "Priorize suas próprias necessidades também",
      "Aprenda a comunicar desconfortos",
      "Abrace o novo com confiança"
    ]
  },
  ESTJ: {
    title: "O Executivo",
    description: "Você é prático, direto e excelente em organizar pessoas e processos.",
    image: "/cards/executivo.png",
    strengths: [
      "Forte senso de dever e estrutura",
      "Liderança clara e objetiva",
      "Habilidade para organizar tarefas complexas"
    ],
    challenges: [
      "Tendência ao autoritarismo",
      "Foco excessivo em regras",
      "Dificuldade em lidar com subjetividade"
    ],
    recommendations: [
      "Seja mais flexível com novas ideias",
      "Desenvolva empatia nas lideranças",
      "Valorize a intuição dos outros"
    ]
  },
  ESFJ: {
    title: "O Provedor",
    description: "Você é caloroso, sociável e comprometido com a harmonia.",
    image: "/cards/mbti.png",
    strengths: [
      "Empatia e atenção social",
      "Comprometimento com a comunidade",
      "Apoio emocional e incentivo constante"
    ],
    challenges: [
      "Tende a buscar aprovação externa",
      "Pode ignorar suas próprias necessidades",
      "Medo de rejeição ou confronto"
    ],
    recommendations: [
      "Acredite mais na sua autenticidade",
      "Aprenda a dizer não com amor",
      "Equilibre dar e receber"
    ]
  },
  ISTP: {
    title: "O Virtuoso",
    description: "Você é prático, objetivo e adora explorar como as coisas funcionam.",
    image: "/cards/mbti.png",
    strengths: [
      "Independência e adaptabilidade",
      "Solução criativa de problemas",
      "Habilidade manual e técnica"
    ],
    challenges: [
      "Tende a evitar compromissos longos",
      "Pouca paciência com teorias",
      "Dificuldade em expressar sentimentos"
    ],
    recommendations: [
      "Pratique constância em relacionamentos",
      "Abrace projetos de longo prazo",
      "Valorize o impacto emocional nas decisões"
    ]
  },
  ISFP: {
    title: "O Aventureiro",
    description: "Você é sensível, artístico e vive no momento presente.",
    image: "/cards/mbti.png",
    strengths: [
      "Criatividade estética e emocional",
      "Gentileza e empatia",
      "Capacidade de viver o agora com autenticidade"
    ],
    challenges: [
      "Fuga de situações desconfortáveis",
      "Dificuldade em tomar decisões firmes",
      "Tende a se esconder em vez de se expressar"
    ],
    recommendations: [
      "Traga sua arte para o mundo",
      "Enfrente os conflitos com suavidade",
      "Cultive coragem para se posicionar"
    ]
  },
  ESTP: {
    title: "O Empreendedor",
    description: "Você é ousado, energético e movido por experiências reais.",
    image: "/cards/mbti.png",
    strengths: [
      "Iniciativa rápida e mente prática",
      "Coragem para desafios e riscos",
      "Facilidade em influenciar os outros"
    ],
    challenges: [
      "Busca constante por adrenalina",
      "Desinteresse por rotinas",
      "Pode negligenciar reflexões profundas"
    ],
    recommendations: [
      "Equilibre ação com planejamento",
      "Desenvolva escuta ativa",
      "Pratique presença emocional"
    ]
  },
  ESFP: {
    title: "O Animador",
    description: "Você é alegre, expressivo e adora celebrar a vida com intensidade.",
    image: "/cards/mbti.png",
    strengths: [
      "Carisma e sociabilidade",
      "Alegria contagiante",
      "Espontaneidade e amor pela vida"
    ],
    challenges: [
      "Pode evitar responsabilidades",
      "Busca constante por aprovação",
      "Dificuldade em lidar com o silêncio"
    ],
    recommendations: [
      "Traga leveza com profundidade",
      "Aprenda a aproveitar o silêncio",
      "Cuide do seu bem-estar emocional com carinho"
    ]
  }
};

export default results;
