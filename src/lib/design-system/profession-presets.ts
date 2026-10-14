export interface PresetService {
  title: string;
  shortDescription: string;
  icon: string;
  ctaText: string;
}

export interface PresetGalleryItem {
  url: string;
  title: string;
  caption: string;
}

export interface PresetTestimonial {
  clientName: string;
  role: string;
  content: string;
  photoUrl: string;
  rating: number;
}

export interface ProfessionPreset {
  id: string;
  label: string;
  category: string;
  professionTitle: string;
  defaultSpecialty: string;
  summaryTemplate: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  suggestedCouncil?: {
    hasCouncil: boolean;
    councilAcronym: string;
    councilFullName: string;
    exampleNumber?: string;
    exampleFormat?: string;
  };
  services: PresetService[];
  images: {
    hero: string;
    about: string;
    practicePattern: string;
    fallbackHero: string;
  };
  gallery: PresetGalleryItem[];
  testimonials: PresetTestimonial[];
}

export const PRESET_PROFESSIONS: ProfessionPreset[] = [
  // ==========================================
  // TOP NICHES COM CRM & ALTA CONVERSÃO
  // ==========================================
  {
    id: 'barbearia',
    label: 'Barbearia / Barber Shop',
    category: 'Beleza & Cuidados Masculinos',
    professionTitle: 'Barbearia & Estética Masculina',
    defaultSpecialty: 'Cortes Modernos, Barboterapia, Degradê e Alinhamento',
    summaryTemplate: 'Estilo é confiança. Mais que um corte de cabelo e barba, proporcionamos uma experiência de cuidado, toalha quente e atendimento de primeira.',
    colors: {
      primary: '#18181b',
      secondary: '#b45309',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Corte Tradicional & Degradê (Fade)',
        shortDescription: 'Corte tesoura ou máquina com acabamento milimétrico e alinhamento na navalha descartável.',
        icon: 'Scissors',
        ctaText: 'Agendar Horário',
      },
      {
        title: 'Barboterapia & Toalha Quente',
        shortDescription: 'Barbear clássico com toalha quente aromatizada, óleos essenciais e massagem facial relaxante.',
        icon: 'UserCheck',
        ctaText: 'Agendar Barba',
      },
      {
        title: 'Combo Cabelo + Barba + Sobrancelha',
        shortDescription: 'Visual renovado completo com higienização, esfoliação leve e finalização com pomada matte.',
        icon: 'Sparkles',
        ctaText: 'Garantir Combo',
      },
      {
        title: 'Camuflagem de Fios Brancos & Hidratação',
        shortDescription: 'Pigmentação natural e discreta dos fios brancos da barba ou cabelo com hidratação profunda.',
        icon: 'Heart',
        ctaText: 'Avaliar Fios',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', title: 'Bancada e Estação de Trabalho', caption: 'Poltronas de couro legítimo e ambiente climatizado' },
      { url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80', title: 'Cortes Modernos Masculinos', caption: 'Degradê impecável e texturização de topo' },
      { url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80', title: 'Barboterapia Tradicional', caption: 'Toalha quente e navalhete descartável para sua segurança' },
      { url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80', title: 'Produtos Premium e Pomadas', caption: 'Linha exclusiva de pós-barba, balms e pomadas modeladoras' },
    ],
    testimonials: [
      { clientName: 'Rodrigo Medeiros', role: 'Cliente Frequente', content: 'Melhor barbearia da cidade. Cerveja gelada, pontualidade no horário marcado e o degradê fica perfeito.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Felipe Santana', role: 'Cliente Semanal', content: 'A barboterapia é revigorante! Saio relaxado e alinhado para a semana de trabalho.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'clinica',
    label: 'Clínica Médica / Consultório de Saúde',
    category: 'Medicina & Saúde',
    professionTitle: 'Clínica Integrada de Saúde & Diagnóstico',
    defaultSpecialty: 'Consultas Médicas, Exames, Check-up e Telemedicina',
    summaryTemplate: 'Cuidando do que mais importa: você. Atendimento médico humanizado, tecnologia diagnóstica avançada e agendamento online simplificado.',
    colors: {
      primary: '#0891b2',
      secondary: '#0284c7',
      accent: '#10b981',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRM',
      councilFullName: 'Conselho Regional de Medicina',
      exampleNumber: 'CRM/SP 123456',
    },
    services: [
      {
        title: 'Consultas Médicas & Especialidades',
        shortDescription: 'Atendimento clínico com médicos especialistas, escuta empática e planos terapêuticos individuais.',
        icon: 'Heart',
        ctaText: 'Agendar Consulta',
      },
      {
        title: 'Exames Laboratoriais & Check-up',
        shortDescription: 'Coleta rápida e confortável com resultados disponibilizados de forma digital e sigilosa.',
        icon: 'Activity',
        ctaText: 'Ver Exames',
      },
      {
        title: 'Telemedicina em Todo o Brasil',
        shortDescription: 'Consultas médicas por videochamada criptografada com emissão de receitas digitais e atestados.',
        icon: 'Globe',
        ctaText: 'Consulta Online',
      },
      {
        title: 'Acompanhamento Preventivo Contínuo',
        shortDescription: 'Programas de prevenção de doenças crônicas, hipertensão, diabetes e saúde da família.',
        icon: 'Shield',
        ctaText: 'Conhecer Programas',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', title: 'Consultório Clínico Acolhedor', caption: 'Estrutura acessível com equipamentos modernos de diagnóstico' },
      { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', title: 'Equipe Multidisciplinar', caption: 'Médicos e profissionais integrados para cuidar de você' },
      { url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80', title: 'Sala de Coleta e Exames', caption: 'Ambiente higienizado e confortável para todas as idades' },
      { url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Humanizado', caption: 'Respeito, ética e atenção plena à sua saúde' },
    ],
    testimonials: [
      { clientName: 'Dra. Márcia Fagundes', role: 'Paciente Check-up', content: 'Fui atendida sem atrasos, o médico foi super atencioso e os resultados dos exames saíram no mesmo dia no aplicativo.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Carlos Eduardo Ramos', role: 'Paciente Telemedicina', content: 'A consulta online funcionou perfeitamente. Recebi minha receita digital no celular em minutos.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'imobiliaria',
    label: 'Imobiliária / Gestão de Imóveis',
    category: 'Mercado Imobiliário',
    professionTitle: 'Imobiliária & Consultoria Patrimonial',
    defaultSpecialty: 'Venda, Locação, Captação de Imóveis e Lançamentos',
    summaryTemplate: 'O imóvel ideal para o seu novo começo. Encontre as melhores oportunidades residenciais e comerciais com assessoria jurídica completa.',
    colors: {
      primary: '#0f172a',
      secondary: '#0284c7',
      accent: '#10b981',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRECI',
      councilFullName: 'Conselho Regional de Corretores de Imóveis',
      exampleNumber: 'CRECI-SP 123456-J',
    },
    services: [
      {
        title: 'Compra & Venda de Imóveis Residenciais',
        shortDescription: 'Casas, apartamentos e coberturas selecionadas com análise minuciosa de certidões e histórico.',
        icon: 'Home',
        ctaText: 'Ver Imóveis',
      },
      {
        title: 'Locação Sem Burocracia',
        shortDescription: 'Contratos ágeis com garantia locatícia, vistorias detalhadas e repasse pontual ao proprietário.',
        icon: 'Key',
        ctaText: 'Alugar Imóvel',
      },
      {
        title: 'Lançamentos & Oportunidades na Planta',
        shortDescription: 'Investimento imobiliário de alta rentabilidade com condições facilitadas de construtoras.',
        icon: 'TrendingUp',
        ctaText: 'Conhecer Projetos',
      },
      {
        title: 'Avaliação Mercadológica & Captação',
        shortDescription: 'Quer vender ou alugar seu imóvel rápido? Conte com nossa curadoria de clientes qualificados.',
        icon: 'Award',
        ctaText: 'Cadastrar Imóvel',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Casas em Condomínio Fechado', caption: 'Segurança, áreas verdes e lazer completo para sua família' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Apartamentos de Alto Padrão', caption: 'Acabamentos nobres, varanda gourmet e vista panorâmica' },
      { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', title: 'Atendimento & Sala de Negociação', caption: 'Assessoria jurídica do pré-contrato à escritura' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', title: 'Oportunidades de Investimento', caption: 'Rentabilidade consistente e liquidez garantida' },
    ],
    testimonials: [
      { clientName: 'Bruno Alencar', role: 'Comprador', content: 'Encontrei meu apartamento dos sonhos em 2 semanas. A assessoria na documentação bancária foi nota 10.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Juliana Vasconcelos', role: 'Proprietária', content: 'Alugaram minha casa sem dor de cabeça e cuidam de toda a cobrança e vistoria.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'academia',
    label: 'Academia / Centro Fitness',
    category: 'Fitness & Treinamento Físico',
    professionTitle: 'Centro de Treinamento & Academia Fitness',
    defaultSpecialty: 'Musculação, Aulas Coletivas, Funcional e Personal',
    summaryTemplate: 'Disciplina hoje. Resultados sempre. Estrutura completa de musculação, professores certificados, ambiente climatizado e planos flexíveis.',
    colors: {
      primary: '#09090b',
      secondary: '#dc2626',
      accent: '#ef4444',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CREF',
      councilFullName: 'Conselho Regional de Educação Física',
      exampleNumber: 'CREF 123456-G/SP',
    },
    services: [
      {
        title: 'Musculação & Equipamentos de Ponta',
        shortDescription: 'Aparelhos ergonômicos modernos com biomecânica avançada para hipertrofia e fortalecimento seguro.',
        icon: 'Activity',
        ctaText: 'Matricular Agora',
      },
      {
        title: 'Aulas Coletivas Dinâmicas',
        shortDescription: 'Spinning, Cross Training, Dança, Pilates e Funcional para acelerar queima calórica com motivação.',
        icon: 'Flame',
        ctaText: 'Ver Grade de Aulas',
      },
      {
        title: 'Acompanhamento com Personal Trainer',
        shortDescription: 'Treinos exclusivos montados sob medida para o seu objetivo com foco total em evolução constante.',
        icon: 'UserCheck',
        ctaText: 'Falar com Personal',
      },
      {
        title: 'Avaliação Física Bioimpedância 3D',
        shortDescription: 'Mapeamento preciso de percentual de gordura, massa magra e assimetrias para guiar seu progresso.',
        icon: 'Award',
        ctaText: 'Agendar Avaliação',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', title: 'Área Ampla de Musculação', caption: 'Halteres, anilhas olímpicas e máquinas de alta performance' },
      { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', title: 'Sala de Aulas Coletivas & Spinning', caption: 'Sonorização imersiva e instrutores motivadores' },
      { url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', title: 'Espaço Funcional & Pesos Livres', caption: 'Piso amortecedor para treinos de alta intensidade' },
      { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80', title: 'Vestiários e Armários Confortáveis', caption: 'Chuveiros aquecidos, lockers privativos e limpeza rigorosa' },
    ],
    testimonials: [
      { clientName: 'Lucas Brandão', role: 'Aluno Plano Black', content: 'Treino aqui há 1 ano e os resultados foram visíveis. Os professores sempre ajudam na postura.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Priscila Fontes', role: 'Aluna de Aulas Coletivas', content: 'As aulas de spinning e funcional são viciantes! Ambiente acolhedor sem julgamentos.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'petshop',
    label: 'Pet Shop / Banho, Tosa & Veterinária',
    category: 'Cuidados Animais & Veterinária',
    professionTitle: 'Centro de Estética Canina & Pet Shop',
    defaultSpecialty: 'Banho & Tosa, Táxi Dog, Hidratação e Acessórios',
    summaryTemplate: 'Amor, cuidado e carinho para o seu melhor amigo. Banho relaxante com água morna, tosas especializadas da raça e serviço de leva-e-traz com total segurança.',
    colors: {
      primary: '#0d9488',
      secondary: '#ea580c',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Banho Relaxante com Água Morna & Ozônio',
        shortDescription: 'Shampoos dermatológicos hipoalergênicos, toalhas higienizadas individuais e secagem cuidadosa.',
        icon: 'Sparkles',
        ctaText: 'Agendar Banho',
      },
      {
        title: 'Tosa Higiênica & Tosa da Raça',
        shortDescription: 'Corte preciso na tesoura ou máquina respeitando o padrão da raça e o conforto do pet.',
        icon: 'Scissors',
        ctaText: 'Agendar Tosa',
      },
      {
        title: 'Táxi Dog (Leva e Traz Seguro)',
        shortDescription: 'Buscamos e levamos seu pet na sua residência em veículo climatizado com caixas de transporte higienizadas.',
        icon: 'Package',
        ctaText: 'Solicitar Táxi Dog',
      },
      {
        title: 'Consulta Veterinária & Vacinas',
        shortDescription: 'Check-up clínico veterinário preventivo, vermifugação e aplicação de vacinas éticas importadas.',
        icon: 'Heart',
        ctaText: 'Consulta Pet',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80', title: 'Área Envidraçada de Banho & Tosa', caption: 'Acompanhe todo o atendimento do seu pet com transparência' },
      { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80', title: 'Cuidado Acolhedor e Sem Gaiolas', caption: 'Manejo livre de estresse com muito carinho e petiscos' },
      { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80', title: 'Tosa na Tesoura Especializada', caption: 'Acabamento fofinho e pelo hidratado com cheirinho delicioso' },
      { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80', title: 'Boutique Pet & Farmácia', caption: 'Rações super premium, brinquedos educativos e medicamentos' },
    ],
    testimonials: [
      { clientName: 'Fernanda Guimarães', role: 'Tutora do Thor (Golden)', content: 'Meu cachorro ama vir aqui! Ele volta cheiroso, calmo e a tosa na tesoura é impecável.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Marcelo Neves', role: 'Tutor da Luna (Shih Tzu)', content: 'O serviço de leva e traz é muito pontual e salva meu dia a dia. Super recomendo a todos.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 1. BELEZA & CUIDADOS PESSOAIS
  // ==========================================
  {
    id: 'cabeleireiro',
    label: 'Cabeleireiro(a) / Barbeiro(a)',
    category: 'Beleza & Cuidados Pessoais',
    professionTitle: 'Cabeleireiro(a) & Hair Stylist',
    defaultSpecialty: 'Corte, Escova, Coloração, Tratamentos e Barba',
    summaryTemplate: 'Especialista em visagismo, transformação capilar e cuidados masculinos e femininos com atendimento personalizado.',
    colors: {
      primary: '#18181b',
      secondary: '#b45309',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Corte Personalizado & Visagismo',
        shortDescription: 'Cortes masculinos e femininos modernos adequados ao formato do seu rosto e estilo de vida.',
        icon: 'Scissors',
        ctaText: 'Agendar Horário',
      },
      {
        title: 'Coloração, Mechas & Iluminação',
        shortDescription: 'Técnicas de morena iluminada, luzes, coloração global e tonalização com proteção dos fios.',
        icon: 'Sparkles',
        ctaText: 'Consultar Tons',
      },
      {
        title: 'Cronograma & Tratamentos Capilares',
        shortDescription: 'Hidratação profunda, nutrição, reconstrução e reposição de massa para cabelos saudáveis.',
        icon: 'Heart',
        ctaText: 'Avaliar Cabelo',
      },
      {
        title: 'Barboterapia & Barba Alinhada',
        shortDescription: 'Desenho preciso de barba, toalha quente, hidratação e alinhamento com navalha descartável.',
        icon: 'UserCheck',
        ctaText: 'Agendar Barba',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', title: 'Espaço & Bancada de Atendimento', caption: 'Ambiente climatizado com produtos profissionais' },
      { url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80', title: 'Cortes & Finalizações Masculinas', caption: 'Acabamento impecável com navalha e pomada' },
      { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80', title: 'Coloração & Morena Iluminada', caption: 'Fios luminosos com brilho espelhado' },
      { url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80', title: 'Tratamentos Capilares Intensivos', caption: 'Cabelos nutridos, sedosos e protegidos' },
    ],
    testimonials: [
      { clientName: 'Lucas Ramos', role: 'Cliente Frequente', content: 'Melhor corte e barba da região. Pontualidade britânica e o atendimento é sensacional.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Camila Ferreira', role: 'Cliente de Mechas', content: 'Fiz morena iluminada e meu cabelo continuou super macio e brilhoso. Profissional nota 10!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'manicure',
    label: 'Manicure / Nail Designer',
    category: 'Beleza & Cuidados Pessoais',
    professionTitle: 'Nail Designer & Manicure',
    defaultSpecialty: 'Manicure, Pedicure, Alongamento e Esmaltação em Gel',
    summaryTemplate: 'Cuidados dedicados para a saúde e beleza das suas mãos e pés, com biossegurança e técnicas de durabilidade prolongada.',
    colors: {
      primary: '#831843',
      secondary: '#db2777',
      accent: '#f43f5e',
    },
    services: [
      {
        title: 'Alongamento em Gel & Fibra',
        shortDescription: 'Unhas longas, naturais e resistentes feitas com gel esculpido ou fibra de vidro.',
        icon: 'Sparkles',
        ctaText: 'Agendar Alongamento',
      },
      {
        title: 'Esmaltação em Gel de Longa Duração',
        shortDescription: 'Brilho espelhado e unhas perfeitas por 15 a 21 dias sem descascar.',
        icon: 'Heart',
        ctaText: 'Escolher Cores',
      },
      {
        title: 'Manicure & Pedicure Clássica',
        shortDescription: 'Cutilagem russa ou tradicional com alicates e materiais 100% esterilizados em autoclave.',
        icon: 'CheckCircle',
        ctaText: 'Marcar Horário',
      },
      {
        title: 'Spa dos Pés & Hidratação Profunda',
        shortDescription: 'Esfoliação, hidratação profunda e massagem relaxante para pés macios e descansados.',
        icon: 'Smile',
        ctaText: 'Conhecer Spa',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', title: 'Alongamento com Curvatura Natural', caption: 'Resistência e acabamento fino de alta qualidade' },
      { url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80', title: 'Esmaltação em Gel Impecável', caption: 'Cores vibrantes que duram semanas' },
      { url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80', title: 'Nail Art Delicada & Francesinha', caption: 'Designs exclusivos para datas especiais' },
      { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', title: 'Materiais Esterilizados e Seguros', caption: 'Biossegurança total com autoclave e descartáveis' },
    ],
    testimonials: [
      { clientName: 'Beatriz Lima', role: 'Advogada', content: 'Minhas unhas em gel duram quase um mês intactas! Ambiente limpo, cheiroso e super acolhedor.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Juliana Prado', role: 'Cliente Mensal', content: 'A melhor manicure da cidade. O spa dos pés é relaxante demais, recomendo muito!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'esteticista',
    label: 'Esteticista / Designer de Sobrancelhas',
    category: 'Beleza & Cuidados Pessoais',
    professionTitle: 'Esteticista & Designer de Sobrancelhas',
    defaultSpecialty: 'Sobrancelhas, Cílios, Limpeza de Pele e Estética Facial',
    summaryTemplate: 'Realçando a beleza natural do seu olhar e da sua pele com tratamentos estéticos faciais e corporais não invasivos.',
    colors: {
      primary: '#4c1d95',
      secondary: '#9333ea',
      accent: '#ec4899',
    },
    services: [
      {
        title: 'Design de Sobrancelhas & Henna',
        shortDescription: 'Mapeamento facial com paquímetro para desenhar o arco perfeito para o seu rosto.',
        icon: 'Sparkles',
        ctaText: 'Agendar Design',
      },
      {
        title: 'Extensão de Cílios (Lash Lifting / Fio a Fio)',
        shortDescription: 'Olhar marcante com curvatura natural ou volume russo com isolamento perfeito dos fios.',
        icon: 'Eye',
        ctaText: 'Conhecer Técnicas',
      },
      {
        title: 'Limpeza de Pele Profunda',
        shortDescription: 'Remoção de cravos, esfoliação ultrassônica, máscara calmante e hidratação profunda.',
        icon: 'Heart',
        ctaText: 'Agendar Limpeza',
      },
      {
        title: 'Drenagem Facial & Revitalização',
        shortDescription: 'Estimulação da circulação, redução do inchaço e luminosidade imediata para sua pele.',
        icon: 'Smile',
        ctaText: 'Saber Mais',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1512290900672-1f02f9e4293f?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', title: 'Consultório de Estética Aconchegante', caption: 'Maca confortável com biossegurança total' },
      { url: 'https://images.unsplash.com/photo-1512290900672-1f02f9e4293f?auto=format&fit=crop&w=800&q=80', title: 'Design de Sobrancelhas Perfeito', caption: 'Simetria e alinhamento do olhar' },
      { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', title: 'Limpeza de Pele Sem Marcas', caption: 'Pele renovada, limpa e profundamente hidratada' },
      { url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80', title: 'Extensão de Cílios Leve e Confortável', caption: 'Acabamento natural que não pesa nos olhos' },
    ],
    testimonials: [
      { clientName: 'Renata Albuquerque', role: 'Cliente', content: 'Fiz limpeza de pele e lash lifting. O resultado ficou incrível, não preciso nem passar rímel mais!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Larissa Moura', role: 'Cliente', content: 'Mão super leve! Meu design de sobrancelha nunca foi tão elogiado.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 2. GASTRONOMIA & ALIMENTAÇÃO
  // ==========================================
  {
    id: 'confeitaria',
    label: 'Confeiteiro(a) / Doceiro(a)',
    category: 'Gastronomia & Alimentação',
    professionTitle: 'Confeiteiro(a) Artesanal',
    defaultSpecialty: 'Bolos, Brigadeiros, Doces Gourmet, Brownies e Sobremesas',
    summaryTemplate: 'Bolos decorados e doces gourmet artesanais feitos com ingredientes nobres e muito afeto para celebrar seus momentos especiais.',
    colors: {
      primary: '#701a75',
      secondary: '#c026d3',
      accent: '#f43f5e',
    },
    services: [
      {
        title: 'Bolos Artísticos & Festas',
        shortDescription: 'Bolos confeitados com chantininho ou brigadeiro, massa fofinha e recheios generosos.',
        icon: 'Gift',
        ctaText: 'Encomendar Bolo',
      },
      {
        title: 'Brigadeiros & Doces Gourmet',
        shortDescription: 'Feitos com chocolate nobre e enrolados artesanalmente com sabores tradicionais e autorais.',
        icon: 'Sparkles',
        ctaText: 'Ver Sabores',
      },
      {
        title: 'Brownies & Sobremesas na Taça',
        shortDescription: 'Brownies recheados super úmidos, copo da felicidade e fatias para seu café da tarde.',
        icon: 'Coffee',
        ctaText: 'Pedir Pronta Entrega',
      },
      {
        title: 'Kits Festa & Lembrancinhas',
        shortDescription: 'Combinações completas com bolo, doces finos e salgados para celebrar aniversários sem preocupação.',
        icon: 'Package',
        ctaText: 'Montar Kit',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', title: 'Bolo de Festa Decorado', caption: 'Decoração em chantininho com acabamento impecável' },
      { url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80', title: 'Doces Finos e Brigadeiros', caption: 'Textura aveludada com ingredientes selecionados' },
      { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', title: 'Brownies Recheados', caption: 'Casquinha crocante e interior cremoso' },
      { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', title: 'Produção Artesanal & Afeto', caption: 'Cozinha certificada e higiene rigorosa' },
    ],
    testimonials: [
      { clientName: 'Ana Paula Costa', role: 'Aniversariante', content: 'O bolo do aniversário da minha filha foi o maior sucesso! Molhadinho, recheio na medida certa e lindo.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Marcelo Dias', role: 'Cliente', content: 'Os brigadeiros gourmet são de outro mundo. Encomendo para todas as reuniões de família.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'marmitas',
    label: 'Marmitas Caseiras / Alimentação',
    category: 'Gastronomia & Alimentação',
    professionTitle: 'Alimentação Caseira & Marmitas',
    defaultSpecialty: 'Marmitas Tradicionais, Fitness, Congeladas e por Encomenda',
    summaryTemplate: 'Comida de verdade, saborosa e prática. Marmitas frescas e congeladas com tempero caseiro para facilitar o seu dia a dia.',
    colors: {
      primary: '#14532d',
      secondary: '#16a34a',
      accent: '#eab308',
    },
    services: [
      {
        title: 'Marmitas do Dia (Comida Caseira)',
        shortDescription: 'Refeições quentes entregues na hora do almoço com cardápio variado todos os dias.',
        icon: 'Utensils',
        ctaText: 'Ver Cardápio do Dia',
      },
      {
        title: 'Linha Fitness & Low Carb',
        shortDescription: 'Opções balanceadas com proteínas magras, legumes selecionados e controle de calorias.',
        icon: 'Activity',
        ctaText: 'Consultar Linha Fit',
      },
      {
        title: 'Combos Semanais Congelados',
        shortDescription: 'Kits com 5, 10 ou 15 marmitas ultracongeladas prontas para aquecer no micro-ondas em 5 minutos.',
        icon: 'Package',
        ctaText: 'Montar Combo',
      },
      {
        title: 'Alimentação para Empresas',
        shortDescription: 'Fornecimento diário de refeições corporativas com pontualidade e padrão de qualidade.',
        icon: 'Briefcase',
        ctaText: 'Solicitar Proposta',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', title: 'Marmitas Equilibradas & Frescas', caption: 'Ingredientes selecionados e tempero natural' },
      { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', title: 'Embalagens Próprias para Micro-ondas', caption: 'Segurança e praticidade no consumo diário' },
      { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80', title: 'Comida Caseira com Sabor de Casa', caption: 'Feita com higiene rigorosa todos os dias' },
      { url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80', title: 'Combos de Marmitas Congeladas', caption: 'Sua semana inteira de almoço resolvida' },
    ],
    testimonials: [
      { clientName: 'Rodrigo Antunes', role: 'Cliente Mensal', content: 'Salvou minha rotina! A comida é deliciosa, parece que foi feita na hora pela minha avó.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Patrícia Gomes', role: 'Cliente Linha Fit', content: 'As marmitas fitness são muito saborosas e me ajudaram muito a manter a dieta no trabalho.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'salgadeiro',
    label: 'Salgadeiro(a) / Salgados para Festas',
    category: 'Gastronomia & Alimentação',
    professionTitle: 'Salgadeiro(a) Especialista em Festas',
    defaultSpecialty: 'Salgados para Festas, Kits, Congelados e Encomendas',
    summaryTemplate: 'Salgadinhos sequinhos, crocantes e bem recheados para suas comemorações, eventos corporativos e reuniões de amigos.',
    colors: {
      primary: '#7c2d12',
      secondary: '#ea580c',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Salgados Fritos na Hora (Cento)',
        shortDescription: 'Coxinhas de frango com catupiry, kibes, bolinhas de queijo, risoles e croquetes super sequinhos.',
        icon: 'Flame',
        ctaText: 'Pedir Cento de Salgados',
      },
      {
        title: 'Salgados Assados & Folhados',
        shortDescription: 'Esfihas de carne, empadinhas amanteigadas, enroladinhos e folhados leves e saborosos.',
        icon: 'Package',
        ctaText: 'Ver Opções Assadas',
      },
      {
        title: 'Kits Festa & Comemorações',
        shortDescription: 'Combinações práticas com salgados, mini lanches e refrigerantes para reuniões e aniversários.',
        icon: 'Gift',
        ctaText: 'Montar Kit Festa',
      },
      {
        title: 'Salgados Congelados para Fritar',
        shortDescription: 'Tenha sempre em casa no freezer salgados prontos para fritar ou assar rapidamente.',
        icon: 'CheckCircle',
        ctaText: 'Encomendar Congelados',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80', title: 'Coxinhas Crocantes e Sequinhas', caption: 'Massa leve e recheio cremoso e generoso' },
      { url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80', title: 'Bandejas Prontas para Servir', caption: 'Embaladas com carinho e temperatura ideal' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', title: 'Assados e Folhados Especiais', caption: 'Empadas e esfihas feitas artesanalmente' },
      { url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80', title: 'Salgados para Grandes Eventos', caption: 'Capacidade de atendimento para festas de todos os portes' },
    ],
    testimonials: [
      { clientName: 'Felipe Vasconcelos', role: 'Organizador de Festa', content: 'As coxinhas chegaram quentinhas e sequinhas! Todos os convidados elogiaram demais.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Silvia Menezes', role: 'Cliente', content: 'Comprei o kit festa completo com bolo e salgados. Facilitou minha vida e estava tudo impecável.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 3. SERVIÇOS RESIDENCIAIS & REFORMAS
  // ==========================================
  {
    id: 'eletricista',
    label: 'Eletricista Residencial',
    category: 'Serviços Residenciais & Reformas',
    professionTitle: 'Eletricista Residencial & Comercial',
    defaultSpecialty: 'Instalações, Manutenção, Troca de Tomadas, Iluminação e Reparos',
    summaryTemplate: 'Serviços elétricos com máxima segurança, conformidade com a norma NBR 5410 e atendimento rápido para emergências e reformas.',
    colors: {
      primary: '#0f172a',
      secondary: '#d97706',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Instalação de Tomadas & Disjuntores',
        shortDescription: 'Troca de tomadas padrão novo, disjuntores, chuveiros elétricos e fiação com dimensionamento seguro.',
        icon: 'Zap',
        ctaText: 'Solicitar Orçamento',
      },
      {
        title: 'Iluminação em LED & Lustres',
        shortDescription: 'Instalação de fitas LED, trilhos eletrificados, pendentes, sensores de presença e automação básica.',
        icon: 'Sun',
        ctaText: 'Agendar Instalação',
      },
      {
        title: 'Revisão do Quadro de Distribuição',
        shortDescription: 'Equilíbrio de fases, troca de barramentos, eliminação de quedas de energia e prevenção de curtos.',
        icon: 'Shield',
        ctaText: 'Solicitar Vistoria',
      },
      {
        title: 'Atendimento Elétrico de Urgência',
        shortDescription: 'Solução rápida para quedas de disjuntor, tomadas em curto ou falta de luz localizada.',
        icon: 'PhoneCall',
        ctaText: 'Chamar no WhatsApp',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', title: 'Quadro Elétrico Organizado e Seguro', caption: 'Identificação de disjuntores e cabeamento padronizado' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', title: 'Instalação de Iluminação Moderna em LED', caption: 'Acabamento limpo sem danificar gesso ou pintura' },
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', title: 'Ferramental e Equipamentos de Precisão', caption: 'Medições técnicas de tensão e amperagem corretas' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', title: 'Instalações Comerciais e Residenciais', caption: 'Segurança elétrica garantida para sua família' },
    ],
    testimonials: [
      { clientName: 'Gustavo Moreira', role: 'Proprietário de Imóvel', content: 'Trocou todo o quadro de disjuntores da minha casa. Muito caprichoso, pontual e honesto no orçamento.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Eliana Duarte', role: 'Síndica', content: 'Fez a iluminação da garagem do condomínio. Serviço impecável e deixou tudo limpo no final.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'encanador',
    label: 'Encanador / Marido de Aluguel',
    category: 'Serviços Residenciais & Reformas',
    professionTitle: 'Encanador & Reparos Residenciais (Marido de Aluguel)',
    defaultSpecialty: 'Reparos Hidráulicos, Instalações e Manutenção Residencial',
    summaryTemplate: 'Soluções rápidas e eficientes para consertos de encanamento, vazamentos, torneiras, montagem de móveis e pequenos reparos.',
    colors: {
      primary: '#0369a1',
      secondary: '#0284c7',
      accent: '#38bdf8',
    },
    services: [
      {
        title: 'Conserto de Vazamentos & Canos',
        shortDescription: 'Localização e reparo de canos furados, sifões, registros e caixas acopladas com vazamento.',
        icon: 'Droplet',
        ctaText: 'Solicitar Reparo',
      },
      {
        title: 'Desentupimentos Rápidos',
        shortDescription: 'Desobstrução de pias de cozinha, lavatórios, ralos e vasos sanitários sem quebra-quebra.',
        icon: 'Wrench',
        ctaText: 'Chamar Encanador',
      },
      {
        title: 'Instalação de Louças & Torneiras',
        shortDescription: 'Troca de torneiras, cubas, instalação de máquina de lavar roupas e purificadores de água.',
        icon: 'CheckCircle',
        ctaText: 'Agendar Serviço',
      },
      {
        title: 'Marido de Aluguel & Reparos Gerais',
        shortDescription: 'Instalação de varais, cortinas, suportes de TV, espelhos, prateleiras e pequenos consertos.',
        icon: 'Tool',
        ctaText: 'Pedir Orçamento',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', title: 'Instalação Hidráulica Perfeita', caption: 'Sem vazamentos, com vedação técnica profissional' },
      { url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80', title: 'Troca de Sifões e Registros', caption: 'Materiais adequados para cada tipo de tubulação' },
      { url: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=800&q=80', title: 'Instalações de Suportes e Utilidades', caption: 'Furos precisos e alinhamento milimétrico' },
      { url: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80', title: 'Ferramentas Completas para Reparos', caption: 'Solução no mesmo dia para problemas urgentes' },
    ],
    testimonials: [
      { clientName: 'Mariana Rios', role: 'Moradora', content: 'Minha pia estava vazando horrores. Chegou em 40 minutos e resolveu na hora com preço justo.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Bruno Castilho', role: 'Cliente', content: 'Instalou suporte de TV, prateleiras e trocou a torneira da cozinha. Tudo perfeito e alinhado.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'diarista',
    label: 'Diarista / Serviços de Limpeza',
    category: 'Serviços Residenciais & Reformas',
    professionTitle: 'Especialista em Limpeza Residencial & Comercial',
    defaultSpecialty: 'Residências, Apartamentos, Escritórios e Limpeza Pós-Obra',
    summaryTemplate: 'Cuidado minucioso, zelo e pontualidade na limpeza do seu lar ou empresa, proporcionando bem-estar e ambiente renovado.',
    colors: {
      primary: '#0f766e',
      secondary: '#14b8a6',
      accent: '#2dd4bf',
    },
    services: [
      {
        title: 'Faxina Residencial Completa',
        shortDescription: 'Limpeza minuciosa de quartos, banheiros, cozinha, sala, janelas e pisos com produtos apropriados.',
        icon: 'Sparkles',
        ctaText: 'Agendar Faxina',
      },
      {
        title: 'Limpeza Pré e Pós-Mudança',
        shortDescription: 'Higienização profunda de armários, paredes e pisos para entrar no novo imóvel com tranquilidade.',
        icon: 'Package',
        ctaText: 'Solicitar Orçamento',
      },
      {
        title: 'Limpeza Pós-Obra Detalhada',
        shortDescription: 'Remoção de resíduos de tinta, rejunte, pó fino e cimento sem arranhar pisos ou vidros.',
        icon: 'Shield',
        ctaText: 'Consultar Pós-Obra',
      },
      {
        title: 'Limpeza Comercial & Escritórios',
        shortDescription: 'Manutenção periódica de salas comerciais, recepções e consultórios com discrição.',
        icon: 'Briefcase',
        ctaText: 'Agendar Período',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', title: 'Ambiente Impecável e Cheiroso', caption: 'Pisos brilhantes e higienização completa' },
      { url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', title: 'Cozinha e Eletrodomésticos Limpos', caption: 'Desengorduramento detalhado de fogão e bancada' },
      { url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80', title: 'Banheiros Higienizados a Fundo', caption: 'Vidros de box sem manchas e desinfecção' },
      { url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', title: 'Organização e Detalhes', caption: 'Zelo absoluto pelos seus móveis e pertences' },
    ],
    testimonials: [
      { clientName: 'Carolina Paes', role: 'Cliente Semanal', content: 'Extremamente de confiança, caprichosa e pontual. Minha casa fica um brinco toda semana.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Diego Brandão', role: 'Cliente Pós-Mudança', content: 'Contratei para limpeza pós-mudança e o apartamento ficou impecável. Super indico!', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'costureira',
    label: 'Costureiro(a) / Ajustes de Roupas',
    category: 'Serviços Residenciais & Reformas',
    professionTitle: 'Costureiro(a) & Alfaiataria de Ajustes',
    defaultSpecialty: 'Reformas, Barras, Consertos, Customização e Sob Medida',
    summaryTemplate: 'O caimento perfeito para suas roupas. Ajustes finos, reformas de peças favoritas e confecção sob medida com acabamento de alta costura.',
    colors: {
      primary: '#334155',
      secondary: '#475569',
      accent: '#0ea5e9',
    },
    services: [
      {
        title: 'Barras de Calças, Saias e Vestidos',
        shortDescription: 'Barra original de jeans, barra invisível social, barra italiana e bainha simples.',
        icon: 'Scissors',
        ctaText: 'Consultar Barras',
      },
      {
        title: 'Ajustes de Cintura, Mangas e Ombros',
        shortDescription: 'Ajuste fino de paletós, camisas sociais, vestidos de festa e calças para o caimento exato.',
        icon: 'CheckCircle',
        ctaText: 'Agendar Prova',
      },
      {
        title: 'Troca de Zíperes & Consertos Gerais',
        shortDescription: 'Substituição de fechos estragados, botões, forros rasgados e reforço de costuras.',
        icon: 'Tool',
        ctaText: 'Solicitar Conserto',
      },
      {
        title: 'Roupas Sob Medida & Customização',
        shortDescription: 'Transformação de peças antigas em modelos atuais e confecção personalizada sob medida.',
        icon: 'Sparkles',
        ctaText: 'Fazer Orçamento',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=800&q=80', title: 'Ateliê com Máquinas Industriais', caption: 'Pontos precisos e acabamento resistente' },
      { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', title: 'Ajustes Finos de Roupas Sociais', caption: 'Caimento sob medida que valoriza sua elegância' },
      { url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', title: 'Tecidos Nobres e Aviamentos', caption: 'Linhas e zíperes de alta qualidade e durabilidade' },
      { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80', title: 'Reformas e Customizações Criativas', caption: 'Dê vida nova para suas roupas prediletas' },
    ],
    testimonials: [
      { clientName: 'Flávia Nogueira', role: 'Cliente', content: 'Ajustou um vestido de festa que estava enorme em mim. Ficou perfeito, parecia feito no meu corpo!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Leandro Siqueira', role: 'Cliente', content: 'Barra de calça jeans com acabamento original idêntico ao de fábrica. Excelente profissional.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 4. EDUCAÇÃO, TREINAMENTO & CONTEÚDO
  // ==========================================
  {
    id: 'professor_particular',
    label: 'Professor particular / Reforço escolar',
    category: 'Educação, Treinamento & Conteúdo',
    professionTitle: 'Professor(a) Particular & Mentor(a) Pedagógico(a)',
    defaultSpecialty: 'Aulas Presenciais ou Online, Idiomas, Matemática e Reforço',
    summaryTemplate: 'Metodologia didática e acolhedora para destravar o aprendizado, recuperar notas, passar em provas ou dominar novos idiomas.',
    colors: {
      primary: '#1e3a8a',
      secondary: '#2563eb',
      accent: '#38bdf8',
    },
    services: [
      {
        title: 'Reforço Escolar (Fundamental e Médio)',
        shortDescription: 'Acompanhamento nas tarefas escolares, preparação para provas bimestrais e recuperação de notas.',
        icon: 'BookOpen',
        ctaText: 'Agendar Aula Teste',
      },
      {
        title: 'Aulas de Matemática, Física e Química',
        shortDescription: 'Didática simplificada passo a passo para perder o medo das ciências exatas.',
        icon: 'Award',
        ctaText: 'Ver Metodologia',
      },
      {
        title: 'Idiomas (Inglês e Espanhol do Zero à Fluência)',
        shortDescription: 'Aulas dinâmicas com foco em conversação real para viagens, carreira ou intercâmbio.',
        icon: 'Globe',
        ctaText: 'Começar Agora',
      },
      {
        title: 'Preparatório para ENEM & Vestibulares',
        shortDescription: 'Resolução orientada de questões anteriores, redação nota 1000 e plano de estudos personalizado.',
        icon: 'Star',
        ctaText: 'Plano de Estudos',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', title: 'Aulas Online Interativas', caption: 'Plataforma digital com materiais didáticos compartilhados' },
      { url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Individualizado', caption: 'Foco total no ritmo e nas dificuldades do aluno' },
      { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', title: 'Materiais Exclusivos e Resumos', caption: 'Mapas mentais e exercícios práticos para fixação' },
      { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', title: 'Resultados Comprovados em Notas', caption: 'Evolução real na confiança e no desempenho escolar' },
    ],
    testimonials: [
      { clientName: 'Sônia Medeiros', role: 'Mãe de Aluno', content: 'Meu filho recuperou a nota de matemática em apenas 3 semanas de aula. Paciência e didática impecáveis!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Gabriel Peixoto', role: 'Aluno de Inglês', content: 'Perdi a vergonha de falar inglês. As aulas são leves e muito práticas.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'personal_trainer',
    label: 'Personal trainer / Instrutor particular',
    category: 'Educação, Treinamento & Conteúdo',
    professionTitle: 'Personal Trainer & Preparador(a) Físico(a)',
    defaultSpecialty: 'Treinos Individuais, Emagrecimento, Hipertrofia e Consultoria',
    summaryTemplate: 'Treinamento físico personalizado com respaldo científico para você alcançar saúde, emagrecimento ou ganho de massa com segurança.',
    colors: {
      primary: '#18181b',
      secondary: '#ea580c',
      accent: '#22c55e',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CREF',
      councilFullName: 'Conselho Regional de Educação Física',
      exampleNumber: 'CREF 123456-G/SP',
    },
    services: [
      {
        title: 'Acompanhamento Presencial 1 a 1',
        shortDescription: 'Orientação postural na academia, condomínio ou ao ar livre com correção de movimentos.',
        icon: 'Activity',
        ctaText: 'Agendar Avaliação',
      },
      {
        title: 'Consultoria Online com Aplicativo',
        shortDescription: 'Planilhas de treino detalhadas com vídeos demonstrativos de cada exercício no seu celular.',
        icon: 'Smartphone',
        ctaText: 'Conhecer Consultoria',
      },
      {
        title: 'Programa de Emagrecimento & Definição',
        shortDescription: 'Metodologia combinada de força e gasto calórico para queima de gordura consistente.',
        icon: 'Flame',
        ctaText: 'Iniciar Desafio',
      },
      {
        title: 'Hipertrofia & Força Muscular',
        shortDescription: 'Periodização de carga e estímulos progressivos para ganho real de massa magra.',
        icon: 'Award',
        ctaText: 'Plano de Treino',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', title: 'Treinamento com Foco em Resultados', caption: 'Metodologia individualizada respeitando seus limites' },
      { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80', title: 'Correção de Postura e Execução', caption: 'Segurança contra lesões com técnica perfeita' },
      { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', title: 'Avaliação Física Periódica', caption: 'Acompanhamento de bioimpedância e medidas' },
      { url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80', title: 'Motivação e Consistência', caption: 'Suporte diário pelo WhatsApp para você não desistir' },
    ],
    testimonials: [
      { clientName: 'Felipe Santana', role: 'Aluno Presencial', content: 'Perdi 12kg em 4 meses com treinos dinâmicos e sem passar fome. Melhor investimento da minha vida.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Vanessa Castro', role: 'Aluna de Consultoria', content: 'A consultoria online é muito completa! O app é fácil e os treinos dão muito resultado.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'fotografo',
    label: 'Fotógrafo(a) / Criador de conteúdo',
    category: 'Educação, Treinamento & Conteúdo',
    professionTitle: 'Fotógrafo(a) Profissional & Creator',
    defaultSpecialty: 'Festas, Ensaios, Produtos, Redes Sociais e Pequenos Negócios',
    summaryTemplate: 'Contando histórias e valorizando marcas através de fotos e vídeos de alto impacto visual, iluminação profissional e edição refinada.',
    colors: {
      primary: '#18181b',
      secondary: '#4f46e5',
      accent: '#6366f1',
    },
    services: [
      {
        title: 'Ensaios Pessoais & Família',
        shortDescription: 'Ensaios externos ou em estúdio para aniversários, gestantes, casais e retratos femininos.',
        icon: 'Camera',
        ctaText: 'Ver Portfólio',
      },
      {
        title: 'Fotografia de Produtos (E-commerce & Catálogo)',
        shortDescription: 'Fotos nítidas em fundo branco e ambientadas para valorizar suas vendas em sites e marketplaces.',
        icon: 'ShoppingBag',
        ctaText: 'Orçamento Comercial',
      },
      {
        title: 'Produção de Conteúdo para Redes Sociais',
        shortDescription: 'Fotos e vídeos em formato vertical (Reels/TikTok) para médicos, lojas, salões e profissionais.',
        icon: 'Video',
        ctaText: 'Pacote de Conteúdo',
      },
      {
        title: 'Cobertura de Eventos & Comemorações',
        shortDescription: 'Registro espontâneo e emocionante de aniversários infantis, batizados e eventos corporativos.',
        icon: 'Sparkles',
        ctaText: 'Consultar Data',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80', title: 'Equipamento Profissional de Ponta', caption: 'Câmeras full frame e lentes de altíssima nitidez' },
      { url: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80', title: 'Retratos e Ensaios Expressivos', caption: 'Direção de poses leve para você se sentir à vontade' },
      { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', title: 'Fotografia Gastronômica e de Produtos', caption: 'Cores reais e texturas que abrem o apetite' },
      { url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80', title: 'Edição e Tratamento de Cor Autoral', caption: 'Entrega rápida em galeria online privativa' },
    ],
    testimonials: [
      { clientName: 'Jéssica Toledo', role: 'Ensaio de Gestante', content: 'As fotos ficaram mágicas! Ela conseguiu captar toda a nossa emoção com muita delicadeza.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Márcio Linhares', role: 'Dono de Restaurante', content: 'Nossas vendas no delivery aumentaram 40% depois das fotos profissionais do cardápio.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 5. ARTESANATO, VENDAS & COMÉRCIO
  // ==========================================
  {
    id: 'artesao',
    label: 'Artesão / Personalizados',
    category: 'Artesanato, Vendas & Comércio',
    professionTitle: 'Artesão(ã) & Ateliê de Personalizados',
    defaultSpecialty: 'Lembrancinhas, Papelaria Personalizada, Velas, Sabonetes e Presentes',
    summaryTemplate: 'Peças artesanais únicas feitas à mão com riqueza de detalhes, pensadas para encantar convidados e criar memórias afetivas.',
    colors: {
      primary: '#78350f',
      secondary: '#b45309',
      accent: '#f59e0b',
    },
    services: [
      {
        title: 'Papelaria Personalizada & Caixas Luxo',
        shortDescription: 'Kits para aniversários, batizados e casamentos com cortes a laser e apliques 3D.',
        icon: 'Gift',
        ctaText: 'Ver Modelos',
      },
      {
        title: 'Velas Aromáticas & Sabonetes Artesanais',
        shortDescription: 'Produzidas com ceras vegetais e essências nobres para brindes corporativos e presentes.',
        icon: 'Sparkles',
        ctaText: 'Conhecer Aromas',
      },
      {
        title: 'Lembrancinhas Afetivas Sob Encomenda',
        shortDescription: 'Chaveiros, aromatizadores, necessaires e peças personalizadas com nome ou logotipo.',
        icon: 'Heart',
        ctaText: 'Montar Encomenda',
      },
      {
        title: 'Peças de Decoração em Madeira & Resina',
        shortDescription: 'Objetos decorativos feitos à mão que transformam e aconchegam qualquer espaço.',
        icon: 'Package',
        ctaText: 'Orçamento Sob Medida',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', title: 'Detalhes Feitos com Paciência e Amor', caption: 'Acabamentos minuciosos e materiais sustentáveis' },
      { url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80', title: 'Ateliê Criativo em Ação', caption: 'Produção manual personalizada com exclusividade' },
      { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', title: 'Lembrancinhas Delicadas', caption: 'Embalagens especiais prontas para presentear' },
      { url: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=800&q=80', title: 'Velas e Aromas Terapêuticos', caption: 'Fragrâncias acolhedoras que marcam momentos' },
    ],
    testimonials: [
      { clientName: 'Letícia Fontana', role: 'Noiva', content: 'As lembrancinhas do meu casamento arrancaram elogios de todos os convidados. Emocionante!', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Cláudia Zanin', role: 'Cliente', content: 'Comprei velas e sabonetes para presentear no fim de ano. Qualidade e aroma incomparáveis.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'vendedor_online',
    label: 'Vendedor online / Revendedor',
    category: 'Artesanato, Vendas & Comércio',
    professionTitle: 'Revendedor(a) & Consultor(a) de Produtos',
    defaultSpecialty: 'Roupas, Cosméticos, Acessórios e Produtos Selecionados',
    summaryTemplate: 'Curadoria exclusiva de produtos originais com pronta entrega, pagamento facilitado e envio seguro para todo o Brasil.',
    colors: {
      primary: '#0f172a',
      secondary: '#be185d',
      accent: '#f43f5e',
    },
    services: [
      {
        title: 'Catálogo Pronta Entrega',
        shortDescription: 'Linha completa com novidades semanais disponíveis para envio imediato com frete ágil.',
        icon: 'ShoppingBag',
        ctaText: 'Ver Catálogo',
      },
      {
        title: 'Cosméticos & Linha Skincare',
        shortDescription: 'Marcas renomadas de perfumes, maquiagem e cuidados com a pele 100% originais.',
        icon: 'Sparkles',
        ctaText: 'Consultar Itens',
      },
      {
        title: 'Moda, Bolsas & Acessórios',
        shortDescription: 'Tendências atuais em peças de vestuário e acessórios que combinam estilo e conforto.',
        icon: 'Heart',
        ctaText: 'Ver Novidades',
      },
      {
        title: 'Atendimento Personalizado no WhatsApp',
        shortDescription: 'Tire dúvidas sobre tamanhos, fragrâncias e combinações diretamente com nosso especialista.',
        icon: 'MessageSquare',
        ctaText: 'Falar no WhatsApp',
      },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', title: 'Vitrine de Novidades Selecionadas', caption: 'Produtos testados e aprovados para você' },
      { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80', title: 'Embalagens Caprichadas com Mimos', caption: 'Experiência de unboxing inesquecível' },
      { url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80', title: 'Estoque com Pronta Entrega', caption: 'Envio no mesmo dia para compras confirmadas' },
      { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80', title: 'Pagamento Seguro e Facilitado', caption: 'PIX com desconto ou cartão em até 12x' },
    ],
    testimonials: [
      { clientName: 'Roberta Matos', role: 'Cliente Frequente', content: 'Minhas encomendas chegam super rápido e com um cheirinho maravilhoso na caixa!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Thiago Valente', role: 'Cliente', content: 'Atendimento no WhatsApp é excelente, tirou todas as dúvidas antes de eu finalizar a compra.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  // ==========================================
  // 6. PROFISSÕES REGULAMENTADAS (EXISTENTES)
  // ==========================================
  {
    id: 'advocacia',
    label: 'Advogado(a) / Escritório Jurídico',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Advogado(a)',
    defaultSpecialty: 'Atuação Jurídica Estratégica & Assessoria Contratual',
    summaryTemplate: 'Defesa ética e estratégica de direitos com rigor técnico e foco em resultados sólidos para pessoas físicas e empresas.',
    colors: {
      primary: '#0f172a',
      secondary: '#1e3a8a',
      accent: '#d97706',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'OAB',
      councilFullName: 'Ordem dos Advogados do Brasil',
      exampleNumber: 'OAB/SP 123.456',
    },
    services: [
      { title: 'Assessoria Jurídica Consultiva', shortDescription: 'Análise preventiva de riscos, contratos e alinhamento estratégico.', icon: 'Scale', ctaText: 'Agendar Consulta' },
      { title: 'Atuação Contenciosa Especializada', shortDescription: 'Defesa rigorosa dos seus interesses em ações judiciais e recursos.', icon: 'Shield', ctaText: 'Falar com Advogado' },
      { title: 'Elaboração e Revisão de Contratos', shortDescription: 'Documentos blindados com segurança e clareza para suas transações.', icon: 'FileText', ctaText: 'Analisar Contrato' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', title: 'Sala de Reuniões & Negociação', caption: 'Estrutura reservada para alinhamentos estratégicos' },
      { url: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&w=800&q=80', title: 'Acervo Técnico e Biblioteca', caption: 'Pesquisa jurisprudencial sólida' },
      { url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80', title: 'Análise Documental Rigorosa', caption: 'Auditoria minuciosa e segurança jurídica' },
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Sede Corporativa', caption: 'Localização privilegiada e fácil acesso' },
    ],
    testimonials: [
      { clientName: 'Eduardo Martins', role: 'Empresário', content: 'Assessoria jurídica precisa e ética. Resolveram uma disputa contratual delicada com total maestria.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Helena Carvalho', role: 'Cliente', content: 'Transparência desde o primeiro dia. Senti muita segurança em todo o processo.', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'odontologia',
    label: 'Dentista / Cirurgião(ã) Dentista',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Cirurgião(ã) Dentista',
    defaultSpecialty: 'Odontologia Integrada & Estética Dental',
    summaryTemplate: 'Tecnologia odontológica avançada com atendimento humanizado, sem dor e focado na transformação natural do seu sorriso.',
    colors: {
      primary: '#0f172a',
      secondary: '#0284c7',
      accent: '#10b981',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRO',
      councilFullName: 'Conselho Regional de Odontologia',
      exampleNumber: 'CRO/SP 123456',
    },
    services: [
      { title: 'Implantes Dentários Guiados', shortDescription: 'Procedimento preciso, seguro e com pós-operatório rápido e confortável.', icon: 'Shield', ctaText: 'Agendar Avaliação' },
      { title: 'Lentes de Contato em Resina & Porcelana', shortDescription: 'Design digital do sorriso para corrigir formato, cor e harmonia dental.', icon: 'Sparkles', ctaText: 'Conhecer Tratamento' },
      { title: 'Alinhadores Invisíveis', shortDescription: 'Ortodontia moderna e discreta, sem braquetes metálicos.', icon: 'Activity', ctaText: 'Falar no WhatsApp' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', title: 'Consultório Moderno e Equipado', caption: 'Tecnologia odontológica de ponta' },
      { url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80', title: 'Estética Dental e Harmonização', caption: 'Sorrisos naturais e alinhados' },
      { url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80', title: 'Biossegurança Total', caption: 'Esterilização hospitalar e conforto' },
      { url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Humanizado Sem Dor', caption: 'Cuidado acolhedor para toda a família' },
    ],
    testimonials: [
      { clientName: 'Patrícia Prado', role: 'Paciente', content: 'Fiz minhas lentes e o resultado ficou super natural. Atendimento nota mil!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Fábio Meirelles', role: 'Paciente de Implante', content: 'Zero dor durante o procedimento e a recuperação foi excelente. Muito grato!', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'psicologia',
    label: 'Psicólogo(a) / Terapeuta',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Psicólogo(a) Clínico(a)',
    defaultSpecialty: 'Psicoterapia Individual, Ansiedade e Autoconhecimento',
    summaryTemplate: 'Espaço acolhedor e confidencial para elaboração emocional, redução da ansiedade e desenvolvimento pessoal.',
    colors: {
      primary: '#1c1917',
      secondary: '#0f766e',
      accent: '#14b8a6',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRP',
      councilFullName: 'Conselho Regional de Psicologia',
      exampleNumber: 'CRP 06/123456',
    },
    services: [
      { title: 'Psicoterapia Individual (Adultos & Jovens)', shortDescription: 'Sessões semanais voltadas para ansiedade, estresse e regulação emocional.', icon: 'Heart', ctaText: 'Agendar Sessão' },
      { title: 'Atendimento Online Seguro (CFP)', shortDescription: 'Terapia no conforto da sua casa com sigilo absoluto e flexibilidade.', icon: 'Globe', ctaText: 'Saber Mais' },
      { title: 'Desenvolvimento Pessoal & Carreira', shortDescription: 'Autoconhecimento, inteligência emocional e superação de bloqueios.', icon: 'Sparkles', ctaText: 'Falar no WhatsApp' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80', title: 'Consultório Acolhedor', caption: 'Ambiente tranquilo planejado para escuta ativa' },
      { url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80', title: 'Sigilo e Privacidade', caption: 'Atendimento humanizado e ético' },
      { url: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80', title: 'Sessões Online Seguras', caption: 'Conexão estável e plataforma criptografada' },
      { url: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80', title: 'Equilíbrio Emocional', caption: 'Caminho guiado para autocompreensão' },
    ],
    testimonials: [
      { clientName: 'Aline Souza', role: 'Paciente', content: 'A terapia mudou minha forma de lidar com a ansiedade no trabalho. Sou muito grata pelo acolhimento.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Guilherme Toledo', role: 'Paciente Online', content: 'Faço atendimento online há 8 meses e me sinto super conectado e seguro.', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'fisioterapia',
    label: 'Fisioterapeuta / Pilates',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Fisioterapeuta',
    defaultSpecialty: 'Fisioterapia Traumato-Ortopédica, Coluna e Pilates Clínico',
    summaryTemplate: 'Reabilitação motora e alívio de dores crônicas com técnicas modernas, terapia manual e exercícios terapêuticos.',
    colors: {
      primary: '#134e4a',
      secondary: '#0d9488',
      accent: '#2dd4bf',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CREFITO',
      councilFullName: 'Conselho Regional de Fisioterapia e Terapia Ocupacional',
      exampleNumber: 'CREFITO-3/123456-F',
    },
    services: [
      { title: 'Tratamento de Coluna & Dores Crônicas', shortDescription: 'Alívio de hérnia de disco, ciático e dores lombares com terapia manual.', icon: 'Activity', ctaText: 'Agendar Avaliação' },
      { title: 'Pilates Clínico & Reabilitação', shortDescription: 'Fortalecimento do core e correção postural em aparelhos de Pilates.', icon: 'Smile', ctaText: 'Conhecer Estúdio' },
      { title: 'Reabilitação Pós-Operatória & Ortopédica', shortDescription: 'Retorno seguro dos movimentos após cirurgias ortopédicas ou traumas.', icon: 'CheckCircle', ctaText: 'Falar no WhatsApp' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', title: 'Consultório de Fisioterapia', caption: 'Estrutura completa para reabilitação' },
      { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', title: 'Estúdio de Pilates com Aparelhos', caption: 'Exercícios orientados e seguros' },
      { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', title: 'Terapia Manual e Liberação', caption: 'Alívio imediato da tensão muscular' },
      { url: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80', title: 'Exercícios de Postura e Mobilidade', caption: 'Ganho sustentável de qualidade de vida' },
    ],
    testimonials: [
      { clientName: 'Valéria Peçanha', role: 'Paciente', content: 'Cheguei com uma crise de dor lombar terrível e saí aliviada já na primeira sessão.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Renato Lima', role: 'Aluno de Pilates', content: 'O Pilates clínico salvou minha postura. Acabaram as dores no pescoço do computador.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'nutricao',
    label: 'Nutricionista / Consultoria Nutricional',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Nutricionista Clínico(a) & Esportivo(a)',
    defaultSpecialty: 'Emagrecimento Saudável, Reeducação e Performance',
    summaryTemplate: 'Planos alimentares individualizados, sem restrições malucas, adaptados à sua rotina real para atingir sua melhor versão.',
    colors: {
      primary: '#14532d',
      secondary: '#16a34a',
      accent: '#84cc16',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRN',
      councilFullName: 'Conselho Regional de Nutricionistas',
      exampleNumber: 'CRN-3 12345',
    },
    services: [
      { title: 'Plano Alimentar Individualizado', shortDescription: 'Dieta calculada para suas preferências, orçamento e rotina diária.', icon: 'Utensils', ctaText: 'Agendar Consulta' },
      { title: 'Nutrição Esportiva & Performance', shortDescription: 'Estratégia de macronutrientes para ganho de massa, corrida ou treinos.', icon: 'Activity', ctaText: 'Otimizar Treinos' },
      { title: 'Bioimpedância & Acompanhamento', shortDescription: 'Avaliação de percentual de gordura, água e massa magra em cada retorno.', icon: 'CheckCircle', ctaText: 'Falar no WhatsApp' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80', title: 'Consultoria Nutricional Completa', caption: 'Alimentação equilibrada e saborosa' },
      { url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', title: 'Refeições Coloridas e Naturais', caption: 'Nutrição prática que cabe na sua rotina' },
      { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80', title: 'Acompanhamento e Metas Claras', caption: 'Evolução saudável com suporte contínuo' },
      { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', title: 'Receitas Práticas para o Dia a Dia', caption: 'Comida de verdade sem terrorismo nutricional' },
    ],
    testimonials: [
      { clientName: 'Carolina Viana', role: 'Paciente', content: 'Consegui emagrecer 8kg comendo o que gosto, sem dietas malucas. Atendimento maravilhoso!', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Marcos Vinícius', role: 'Paciente Atleta', content: 'Minha disposição nos treinos triplicou após o ajuste nutricional. Super recomendo.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },

  {
    id: 'corretor_imoveis',
    label: 'Corretor(a) de Imóveis',
    category: 'Profissões Regulamentadas & Consultoria',
    professionTitle: 'Consultor(a) Imobiliário(a)',
    defaultSpecialty: 'Compra, Venda, Locação e Avaliação de Imóveis',
    summaryTemplate: 'Assessoria completa e segura para você encontrar o imóvel ideal ou fechar o melhor negócio imobiliário com assessoria jurídica e bancária.',
    colors: {
      primary: '#0f172a',
      secondary: '#0284c7',
      accent: '#10b981',
    },
    suggestedCouncil: {
      hasCouncil: true,
      councilAcronym: 'CRECI',
      councilFullName: 'Conselho Regional de Corretores de Imóveis',
      exampleNumber: 'CRECI-SP 123456-F',
    },
    services: [
      { title: 'Intermediação de Compra e Venda', shortDescription: 'Curadoria dos melhores imóveis residenciais e comerciais com análise de documentação.', icon: 'Home', ctaText: 'Ver Imóveis' },
      { title: 'Avaliação Mercadológica Imobiliária', shortDescription: 'Laudos precisos de valor de mercado para venda rápida e justa do seu patrimônio.', icon: 'CheckCircle', ctaText: 'Avaliar Imóvel' },
      { title: 'Apoio em Financiamento Bancário', shortDescription: 'Assessoria para aprovação de crédito imobiliário nos principais bancos.', icon: 'Award', ctaText: 'Falar no WhatsApp' },
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    },
    gallery: [
      { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', title: 'Imóveis Selecionados de Alto Padrão', caption: 'Localizações privilegiadas e documentação em dia' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Casas e Apartamentos Prontos para Morar', caption: 'Visitas guiadas com transparência e ética' },
      { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Consultivo e Seguro', caption: 'Segurança jurídica do contrato à escritura' },
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', title: 'Oportunidades de Investimento', caption: 'Rentabilidade consistente e liquidez' },
    ],
    testimonials: [
      { clientName: 'Leandro Vasques', role: 'Comprador', content: 'Encontrou o apartamento exatamente como minha família sonhava e cuidou de toda a burocracia.', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', rating: 5 },
      { clientName: 'Tânia Resende', role: 'Vendedora', content: 'Vendeu minha casa em menos de 45 dias com negociação justa e total suporte.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', rating: 5 },
    ],
  },
];

/**
 * Busca preset por ID ou por termo/palavra-chave digitado pelo usuário
 */
export function findProfessionPreset(query?: string): ProfessionPreset | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // 1. Busca por ID direto
  const byId = PRESET_PROFESSIONS.find(p => p.id === q);
  if (byId) return byId;

  // 2. Busca por termos contidos
  return PRESET_PROFESSIONS.find(p => {
    const labelNorm = p.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const titleNorm = p.professionTitle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const specNorm = p.defaultSpecialty.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return labelNorm.includes(q) || q.includes(labelNorm) || titleNorm.includes(q) || specNorm.includes(q);
  });
}
