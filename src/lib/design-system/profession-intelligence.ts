/**
 * Inteligência de Profissões, Conselhos de Classe e Curadoria de Imagens Contextuais
 * Analisa e enriquece a profissão antes de renderizar imagens ou gerar o site.
 */

export interface ProfessionAnalysis {
  category: string;
  normalizedProfession: string;
  suggestedCouncil: {
    hasCouncil: boolean;
    councilAcronym: string;
    councilFullName: string;
    exampleNumber: string;
  };
  keywords: string[];
  images: {
    hero: string;
    about: string;
    practicePattern: string;
    fallbackHero: string;
  };
}

export interface CouncilDefinition {
  acronym: string;
  fullName: string;
  category: string;
  keywords: string[];
  exampleFormat: string;
}

// Catálogo Oficial dos Conselhos Profissionais de Classe no Brasil
export const BRAZILIAN_COUNCILS: CouncilDefinition[] = [
  {
    acronym: 'OAB',
    fullName: 'Ordem dos Advogados do Brasil',
    category: 'Direito & Advocacia',
    keywords: ['advogad', 'advocacia', 'jurid', 'direito', 'jurista', 'tributar', 'trabalhista', 'criminalista', 'penal', 'civilista', 'leis', 'oab'],
    exampleFormat: 'OAB/SP 123.456',
  },
  {
    acronym: 'CRM',
    fullName: 'Conselho Regional de Medicina',
    category: 'Medicina & Saúde',
    keywords: ['medic', 'doutor', 'cirurgi', 'pediatr', 'cardiolog', 'dermatolog', 'ginecolog', 'ortoped', 'clinico geral', 'psiquiatr', 'oftalmolog', 'urolog', 'crm'],
    exampleFormat: 'CRM/SP 123456',
  },
  {
    acronym: 'CRO',
    fullName: 'Conselho Regional de Odontologia',
    category: 'Odontologia',
    keywords: ['dentist', 'odontolog', 'ortodont', 'implantodont', 'endodont', 'periodont', 'harmonizacao orofacial', 'cro'],
    exampleFormat: 'CRO/SP 123456',
  },
  {
    acronym: 'CRP',
    fullName: 'Conselho Regional de Psicologia',
    category: 'Psicologia & Psicoterapia',
    keywords: ['psicolog', 'psicoterap', 'psicanal', 'terapeuta comportamental', 'saude mental', 'crp'],
    exampleFormat: 'CRP 06/123456',
  },
  {
    acronym: 'CREFITO',
    fullName: 'Conselho Regional de Fisioterapia e Terapia Ocupacional',
    category: 'Fisioterapia & Reabilitação',
    keywords: ['fisioterap', 'fisio', 'pilates clinico', 'terapia ocupacional', 'reabilitacao', 'quiropr', 'osteopat', 'crefito'],
    exampleFormat: 'CREFITO-3/123456-F',
  },
  {
    acronym: 'CRN',
    fullName: 'Conselho Regional de Nutricionistas',
    category: 'Nutrição & Dietética',
    keywords: ['nutricion', 'nutri', 'dietetic', 'nutrolog', 'dieta personalizada', 'emagrecimento saudavel', 'crn'],
    exampleFormat: 'CRN-3 12345',
  },
  {
    acronym: 'CREA',
    fullName: 'Conselho Regional de Engenharia e Agronomia',
    category: 'Engenharia & Agronomia',
    keywords: ['engenh', 'engenheiro', 'calculo estrutural', 'agronom', 'eletricista engenheiro', 'mecanico engenheiro', 'civil engenheiro', 'crea', 'confea'],
    exampleFormat: 'CREA-SP 123456789-0',
  },
  {
    acronym: 'CAU',
    fullName: 'Conselho de Arquitetura e Urbanismo',
    category: 'Arquitetura & Urbanismo',
    keywords: ['arquitet', 'urbanis', 'design de interiores', 'decorac', 'projetista arquitetura', 'cau'],
    exampleFormat: 'CAU/SP A123456-7',
  },
  {
    acronym: 'CRC',
    fullName: 'Conselho Regional de Contabilidade',
    category: 'Contabilidade & Finanças',
    keywords: ['contador', 'contabil', 'auditor fiscal', 'perito contabil', 'imposto de renda', 'crc'],
    exampleFormat: 'CRC-SP 1SP123456/O',
  },
  {
    acronym: 'CREF',
    fullName: 'Conselho Regional de Educação Física',
    category: 'Educação Física & Fitness',
    keywords: ['personal trainer', 'educador fisico', 'treinador', 'musculacao', 'preparador fisico', 'cref'],
    exampleFormat: 'CREF 123456-G/SP',
  },
  {
    acronym: 'CRMV',
    fullName: 'Conselho Regional de Medicina Veterinária',
    category: 'Medicina Veterinária',
    keywords: ['veterinar', 'medico veterinario', 'clinica pet', 'cirurgia animal', 'crmv'],
    exampleFormat: 'CRMV-SP 12345',
  },
  {
    acronym: 'CRF',
    fullName: 'Conselho Regional de Farmácia',
    category: 'Farmácia & Bioquímica',
    keywords: ['farmaceut', 'farmacia', 'bioquimic', 'analises clinicas', 'crf'],
    exampleFormat: 'CRF-SP 12345',
  },
  {
    acronym: 'COREN',
    fullName: 'Conselho Regional de Enfermagem',
    category: 'Enfermagem',
    keywords: ['enfermeir', 'enfermagem', 'cuidador especializado', 'coren'],
    exampleFormat: 'COREN-SP 123.456-ENF',
  },
  {
    acronym: 'CRECI',
    fullName: 'Conselho Regional de Corretores de Imóveis',
    category: 'Mercado Imobiliário',
    keywords: ['corretor de imoveis', 'consultor imobiliario', 'imobiliari', 'perito avaliador imoveis', 'creci'],
    exampleFormat: 'CRECI-SP 123456-F',
  },
  {
    acronym: 'CRA',
    fullName: 'Conselho Regional de Administração',
    category: 'Administração & Gestão',
    keywords: ['administrador', 'consultor administrativo', 'gestao empresarial', 'cra'],
    exampleFormat: 'CRA-SP 123456',
  }
];

// Helper para normalizar textos removendo acentos e caracteres especiais
function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Analisa a profissão e especialidade, identificando conselho e banco de imagens de alta relevância
 */
export function analyzeProfessionContext(
  profession?: string,
  specialty?: string,
  companyName?: string
): ProfessionAnalysis {
  const combined = `${profession || ''} ${specialty || ''} ${companyName || ''}`;
  const norm = normalizeText(combined);

  // 1. Detectar se existe conselho de classe aplicável
  let matchedCouncil: CouncilDefinition | null = null;
  for (const council of BRAZILIAN_COUNCILS) {
    if (council.keywords.some((kw) => norm.includes(normalizeText(kw)))) {
      matchedCouncil = council;
      break;
    }
  }

  // 2. Curadoria Visual Inteligente por Categoria Semântica
  // Categoria 1: Educação Física, Treinamento, Fitness, Musculação
  if (
    norm.includes('personal') ||
    norm.includes('trainer') ||
    norm.includes('treinad') ||
    norm.includes('fitness') ||
    norm.includes('academi') ||
    norm.includes('musculac') ||
    norm.includes('esport') ||
    norm.includes('emagrec') ||
    norm.includes('cref')
  ) {
    return {
      category: 'Educação Física & Fitness',
      normalizedProfession: profession || 'Personal Trainer',
      suggestedCouncil: matchedCouncil
        ? {
            hasCouncil: true,
            councilAcronym: matchedCouncil.acronym,
            councilFullName: matchedCouncil.fullName,
            exampleNumber: matchedCouncil.exampleFormat,
          }
        : { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
      keywords: ['fitness', 'workout', 'training', 'gym', 'health'],
      images: {
        hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 2: Gastronomia, Churrasco, Carnes, Parrilla, Chef, Restaurante, Buffet
  if (
    norm.includes('churrasc') ||
    norm.includes('carne') ||
    norm.includes('bbq') ||
    norm.includes('barbecue') ||
    norm.includes('gastro') ||
    norm.includes('chef') ||
    norm.includes('cozinh') ||
    norm.includes('restauran') ||
    norm.includes('buffet') ||
    norm.includes('culinar') ||
    norm.includes('hamburg') ||
    norm.includes('assar') ||
    norm.includes('assado') ||
    norm.includes('parrilla') ||
    norm.includes('picanha')
  ) {
    return {
      category: 'Gastronomia & Churrasco',
      normalizedProfession: profession || 'Chef & Mestre Churrasqueiro',
      suggestedCouncil: { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
      keywords: ['bbq', 'meat', 'chef', 'grill', 'gastronomy', 'restaurant'],
      images: {
        hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 3: Advocacia, Direito, Jurídico
  if (
    norm.includes('advoc') ||
    norm.includes('jurid') ||
    norm.includes('direito') ||
    norm.includes('tribut') ||
    norm.includes('penal') ||
    norm.includes('trabalh') ||
    norm.includes('civil') ||
    norm.includes('inventari') ||
    norm.includes('divorc') ||
    norm.includes('oab') ||
    norm.includes('lei ') ||
    norm.includes('leis') ||
    norm.includes('jurista')
  ) {
    return {
      category: 'Direito & Advocacia',
      normalizedProfession: profession || 'Advogado(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'OAB',
        councilFullName: 'Ordem dos Advogados do Brasil',
        exampleNumber: 'OAB/SP 123.456',
      },
      keywords: ['lawyer', 'law firm', 'legal', 'justice', 'court'],
      images: {
        hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 4: Medicina & Especialidades Médicas
  if (
    norm.includes('medic') ||
    norm.includes('doutor') ||
    norm.includes('cirurg') ||
    norm.includes('cardiolog') ||
    norm.includes('dermatolog') ||
    norm.includes('pediatr') ||
    norm.includes('ginecolog') ||
    norm.includes('ortoped') ||
    norm.includes('crm')
  ) {
    return {
      category: 'Medicina & Especialidades',
      normalizedProfession: profession || 'Médico(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRM',
        councilFullName: 'Conselho Regional de Medicina',
        exampleNumber: 'CRM/SP 123456',
      },
      keywords: ['doctor', 'medicine', 'hospital', 'physician', 'healthcare'],
      images: {
        hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 5: Odontologia & Estética Dental
  if (
    norm.includes('odont') ||
    norm.includes('dentist') ||
    norm.includes('implantodont') ||
    norm.includes('sorriso') ||
    norm.includes('ortodont') ||
    norm.includes('cro')
  ) {
    return {
      category: 'Odontologia',
      normalizedProfession: profession || 'Cirurgião(ã) Dentista',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRO',
        councilFullName: 'Conselho Regional de Odontologia',
        exampleNumber: 'CRO/SP 123456',
      },
      keywords: ['dentist', 'dental', 'smile', 'clinic', 'teeth'],
      images: {
        hero: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 6: Psicologia & Saúde Mental
  if (
    norm.includes('psicolog') ||
    norm.includes('terapeut') ||
    norm.includes('psicoterap') ||
    norm.includes('saude mental') ||
    norm.includes('psicanal') ||
    norm.includes('crp')
  ) {
    return {
      category: 'Psicologia & Psicoterapia',
      normalizedProfession: profession || 'Psicólogo(a) Clínico(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRP',
        councilFullName: 'Conselho Regional de Psicologia',
        exampleNumber: 'CRP 06/123456',
      },
      keywords: ['psychology', 'therapy', 'mental health', 'counseling', 'mind'],
      images: {
        hero: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 7: Fisioterapia, Pilates & Reabilitação
  if (
    norm.includes('fisio') ||
    norm.includes('pilates') ||
    norm.includes('reabilit') ||
    norm.includes('crefito') ||
    norm.includes('quiropr')
  ) {
    return {
      category: 'Fisioterapia & Reabilitação',
      normalizedProfession: profession || 'Fisioterapeuta',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CREFITO',
        councilFullName: 'Conselho Regional de Fisioterapia e Terapia Ocupacional',
        exampleNumber: 'CREFITO-3/123456-F',
      },
      keywords: ['physiotherapy', 'rehabilitation', 'pilates', 'recovery', 'health'],
      images: {
        hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 8: Nutrição & Bem-Estar
  if (
    norm.includes('nutri') ||
    norm.includes('dieta') ||
    norm.includes('alimentac') ||
    norm.includes('crn')
  ) {
    return {
      category: 'Nutrição & Saúde',
      normalizedProfession: profession || 'Nutricionista',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRN',
        councilFullName: 'Conselho Regional de Nutricionistas',
        exampleNumber: 'CRN-3 12345',
      },
      keywords: ['nutrition', 'healthy food', 'diet', 'wellness', 'organic'],
      images: {
        hero: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 9: Contabilidade, Auditoria & Finanças
  if (
    norm.includes('contab') ||
    norm.includes('contador') ||
    norm.includes('fiscal') ||
    norm.includes('auditor') ||
    norm.includes('crc') ||
    norm.includes('financ')
  ) {
    return {
      category: 'Contabilidade & Finanças',
      normalizedProfession: profession || 'Contador(a) / Auditor(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRC',
        councilFullName: 'Conselho Regional de Contabilidade',
        exampleNumber: 'CRC-SP 1SP123456/O',
      },
      keywords: ['accounting', 'finance', 'taxes', 'business', 'calculator'],
      images: {
        hero: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 10: Engenharia & Obras
  if (
    norm.includes('engenha') ||
    norm.includes('constru') ||
    norm.includes('mecanic') ||
    norm.includes('civil') ||
    norm.includes('reform') ||
    norm.includes('crea')
  ) {
    return {
      category: 'Engenharia & Construção',
      normalizedProfession: profession || 'Engenheiro(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CREA',
        councilFullName: 'Conselho Regional de Engenharia e Agronomia',
        exampleNumber: 'CREA-SP 123456789-0',
      },
      keywords: ['engineering', 'construction', 'architecture', 'building', 'blueprint'],
      images: {
        hero: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 11: Arquitetura & Design de Interiores
  if (
    norm.includes('arquitet') ||
    norm.includes('interiores') ||
    norm.includes('decorac') ||
    norm.includes('urbanis') ||
    norm.includes('cau')
  ) {
    return {
      category: 'Arquitetura & Design',
      normalizedProfession: profession || 'Arquiteto(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CAU',
        councilFullName: 'Conselho de Arquitetura e Urbanismo',
        exampleNumber: 'CAU/SP A123456-7',
      },
      keywords: ['architecture', 'interior design', 'modern home', 'decor', 'luxury'],
      images: {
        hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 12: Estética, Beleza, Barbeiro, Spa
  if (
    norm.includes('estet') ||
    norm.includes('belez') ||
    norm.includes('barbear') ||
    norm.includes('barbeir') ||
    norm.includes('cabel') ||
    norm.includes('spa') ||
    norm.includes('maquiag') ||
    norm.includes('manicur') ||
    norm.includes('salao')
  ) {
    return {
      category: 'Estética & Beleza',
      normalizedProfession: profession || 'Especialista em Estética & Beleza',
      suggestedCouncil: { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
      keywords: ['beauty', 'skincare', 'spa', 'barber', 'cosmetics', 'aesthetic'],
      images: {
        hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 13: Medicina Veterinária & Pet
  if (
    norm.includes('veterin') ||
    norm.includes('pet') ||
    norm.includes('animal') ||
    norm.includes('cao') ||
    norm.includes('cachorro') ||
    norm.includes('gato') ||
    norm.includes('banho e tosa') ||
    norm.includes('crmv')
  ) {
    return {
      category: 'Veterinária & Pet Care',
      normalizedProfession: profession || 'Médico(a) Veterinário(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRMV',
        councilFullName: 'Conselho Regional de Medicina Veterinária',
        exampleNumber: 'CRMV-SP 12345',
      },
      keywords: ['veterinarian', 'pet clinic', 'dog', 'cat', 'animal care'],
      images: {
        hero: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 14: Fotografia & Audiovisual
  if (
    norm.includes('fotog') ||
    norm.includes('video') ||
    norm.includes('filmmak') ||
    norm.includes('audiovisual') ||
    norm.includes('ensaio') ||
    norm.includes('camera')
  ) {
    return {
      category: 'Fotografia & Produção Visual',
      normalizedProfession: profession || 'Fotógrafo(a) / Filmmaker',
      suggestedCouncil: { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
      keywords: ['photographer', 'camera', 'photo studio', 'filmmaking', 'portrait'],
      images: {
        hero: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 15: Tecnologia, Programação & Consultoria de Software
  if (
    norm.includes('program') ||
    norm.includes('softwar') ||
    norm.includes('ti') ||
    norm.includes('tecnolog') ||
    norm.includes('desenvolv') ||
    norm.includes('sistem') ||
    norm.includes('dev')
  ) {
    return {
      category: 'Tecnologia & Desenvolvimento',
      normalizedProfession: profession || 'Especialista em Tecnologia & Software',
      suggestedCouncil: { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
      keywords: ['programming', 'software developer', 'technology', 'coding', 'modern tech'],
      images: {
        hero: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria 16: Imobiliário / Corretores
  if (
    norm.includes('imovel') ||
    norm.includes('imoveis') ||
    norm.includes('imobili') ||
    norm.includes('corretor') ||
    norm.includes('creci')
  ) {
    return {
      category: 'Mercado Imobiliário',
      normalizedProfession: profession || 'Consultor(a) Imobiliário(a)',
      suggestedCouncil: {
        hasCouncil: true,
        councilAcronym: 'CRECI',
        councilFullName: 'Conselho Regional de Corretores de Imóveis',
        exampleNumber: 'CRECI-SP 123456-F',
      },
      keywords: ['real estate', 'luxury home', 'property', 'architecture', 'realtor'],
      images: {
        hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
        about: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
        practicePattern: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        fallbackHero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      },
    };
  }

  // Categoria Padrão: Consultoria Corporativa / Negócios / Serviços Gerais
  return {
    category: 'Consultoria & Serviços Especializados',
    normalizedProfession: profession || 'Especialista / Consultor(a)',
    suggestedCouncil: matchedCouncil
      ? {
          hasCouncil: true,
          councilAcronym: matchedCouncil.acronym,
          councilFullName: matchedCouncil.fullName,
          exampleNumber: matchedCouncil.exampleFormat,
        }
      : { hasCouncil: false, councilAcronym: '', councilFullName: '', exampleNumber: '' },
    keywords: ['business', 'consulting', 'modern office', 'executive', 'meeting'],
    images: {
      hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      fallbackHero: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    },
  };
}

export interface GalleryImageSuggestion {
  url: string;
  title: string;
  caption?: string;
}

export interface TestimonialSuggestion {
  clientName: string;
  role: string;
  content: string;
  photoUrl: string;
  rating: number;
}

/**
 * Curadoria inteligente de fotos contextuais para a Galeria de Fotos
 */
export function getContextualGallery(profession?: string, specialty?: string, companyName?: string): GalleryImageSuggestion[] {
  const norm = normalizeText(`${profession || ''} ${specialty || ''} ${companyName || ''}`);

  if (norm.includes('psico') || norm.includes('terap') || norm.includes('saude mental')) {
    return [
      { url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80', title: 'Espaço de Escuta Acolhedor', caption: 'Ambiente planejado para sigilo e conforto' },
      { url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80', title: 'Consultório Humanizado', caption: 'Mobiliário ergonômico e luz natural' },
      { url: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Online Seguro', caption: 'Tecnologia criptografada e privacidade' },
      { url: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80', title: 'Harmonia & Bem-Estar', caption: 'Abordagem centrada na transformação da pessoa' }
    ];
  }

  if (norm.includes('advog') || norm.includes('jurid') || norm.includes('direito') || norm.includes('oab')) {
    return [
      { url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', title: 'Sala de Reuniões & Negociação', caption: 'Estrutura reservada para alinhamentos estratégicos' },
      { url: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?auto=format&fit=crop&w=800&q=80', title: 'Acervo Técnico e Biblioteca', caption: 'Pesquisa jurisprudencial e doutrinária sólida' },
      { url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80', title: 'Análise Documental Rigorosa', caption: 'Auditoria minuciosa e segurança jurídica' },
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', title: 'Sede Corporativa', caption: 'Localização privilegiada e fácil acesso' }
    ];
  }

  if (norm.includes('churras') || norm.includes('carne') || norm.includes('buffet') || norm.includes('gastronom')) {
    return [
      { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', title: 'Cortes Especiais na Parrilla', caption: 'Ponto perfeito e marmoreio nobre selecionado' },
      { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', title: 'Apresentação & Finalização', caption: 'Experiência gastronômica completa para convidados' },
      { url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80', title: 'Fogo de Chão & Tradição', caption: 'Técnicas artesanais de cocção lenta' },
      { url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', title: 'Eventos Corporativos e Sociais', caption: 'Buffet estruturado para grupos de alta exigência' }
    ];
  }

  if (norm.includes('medic') || norm.includes('clinica') || norm.includes('doutor') || norm.includes('dentist')) {
    return [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', title: 'Consultório Moderno', caption: 'Tecnologia avançada para seu diagnóstico' },
      { url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80', title: 'Recepção e Conforto', caption: 'Espaço climatizado e atendimento cordial' },
      { url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80', title: 'Equipamentos de Precisão', caption: 'Segurança sanitária e alto rigor técnico' },
      { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', title: 'Cuidado Humanizado', caption: 'Acolhimento empático em todas as etapas' }
    ];
  }

  // Padrão de Alta Qualidade Corporativa / Geral
  return [
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: 'Estrutura Executiva', caption: 'Ambiente corporativo de alta performance' },
    { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', title: 'Tecnologia & Inovação', caption: 'Ferramentas modernas para agilidade nos processos' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', title: 'Atendimento Consultivo', caption: 'Foco total no diagnóstico e metas do cliente' },
    { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', title: 'Reuniões Estratégicas', caption: 'Alinhamento periódico com relatórios e clareza' }
  ];
}

/**
 * Curadoria de Depoimentos Realistas e Humanizados
 */
export function getContextualTestimonials(profession?: string, specialty?: string, companyName?: string): TestimonialSuggestion[] {
  return [
    {
      clientName: 'Mariana Souza',
      role: 'Cliente Atendida',
      content: 'Atendimento impecável e de altíssimo nível. A escuta atenta, o preparo técnico e a clareza em cada orientação me trouxeram total confiança.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      rating: 5,
    },
    {
      clientName: 'Carlos Eduardo Mendes',
      role: 'Empresário / Gestor',
      content: 'Profissional pontual, ético e extremamente assertivo nas soluções. Conseguiu resolver com maestria o que há meses estávamos buscando.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      rating: 5,
    },
    {
      clientName: 'Fernanda Oliveira',
      role: 'Atendimento Individual',
      content: 'Superou todas as minhas expectativas. O ambiente é seguro, acolhedor e os resultados foram visíveis logo nas primeiras etapas. Recomendo de olhos fechados!',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      rating: 5,
    }
  ];
}

