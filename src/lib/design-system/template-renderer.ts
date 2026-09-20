import type { OnboardingData } from '../validation/onboarding';
import type { DesignSpec } from './specs';

/**
 * Mapeador de Imagens Contextuais de Alta Qualidade (Unsplash Editorial)
 * de acordo com a profissão / especialidade informada.
 */
/**
 * Mapeador de Imagens Contextuais Inteligente e Amplo (Unsplash Editorial)
 * de acordo com a profissão / nicho / especialidade informada.
 */
export function getContextualImages(profession?: string, specialty?: string, companyName?: string) {
  const rawText = `${profession || ''} ${specialty || ''} ${companyName || ''}`.toLowerCase();
  // Remove acentuação para garantir correspondência exata (ex: 'churrasqueiro', 'culinária' -> 'culinaria')
  const text = rawText.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Gastronomia, Churrasco, Churrasqueiro, Carnes, Culinária, Chef, Restaurante, Hamburgueria, Buffet
  if (
    text.includes('churrasc') || 
    text.includes('carne') || 
    text.includes('bbq') || 
    text.includes('barbecue') || 
    text.includes('gastro') || 
    text.includes('chef') || 
    text.includes('cozinh') || 
    text.includes('restauran') || 
    text.includes('buffet') || 
    text.includes('culinar') || 
    text.includes('hamburg') || 
    text.includes('assar') || 
    text.includes('assado') ||
    text.includes('parrilla') ||
    text.includes('picanha') ||
    text.includes('comida') ||
    text.includes('alimento') ||
    text.includes('evento')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80', // Churrasco / Grelhados artesanais
      about: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80', // Chef de cozinha / Mestre churrasqueiro
      practicePattern: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', // Cortes nobres de carne
    };
  }

  // 2. Advocacia, Direito, Jurídico
  if (
    text.includes('advoc') || 
    text.includes('jurid') || 
    text.includes('direito') || 
    text.includes('tribut') || 
    text.includes('penal') || 
    text.includes('trabalh') || 
    text.includes('civil') || 
    text.includes('inventari') || 
    text.includes('divorc') || 
    text.includes('oab') ||
    text.includes('lei') ||
    text.includes('process')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', // Balança / Direito
      about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', // Escritório Corporativo
      practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80', // Documentos e análise
    };
  }

  // 3. Medicina, Saúde, Consultório, Clínica Médica, Cirurgião
  if (
    text.includes('medic') || 
    text.includes('saude') || 
    text.includes('clinica') || 
    text.includes('doutor') || 
    text.includes('cirurg') || 
    text.includes('cardiolog') || 
    text.includes('dermatolog') || 
    text.includes('pediatr') ||
    text.includes('crm')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80', // Consultório Moderno
      about: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80', // Clínica / Ambiente Médico
      practicePattern: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 4. Odontologia, Dentista, Ortodontia
  if (
    text.includes('odont') || 
    text.includes('dentist') || 
    text.includes('implant') || 
    text.includes('sorriso') || 
    text.includes('ortodont') ||
    text.includes('cro')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80', // Consultório Odontológico
      about: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80', // Cuidado dental
      practicePattern: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 5. Psicologia, Psicoterapia, Terapia, Psiquiatria
  if (
    text.includes('psicol') || 
    text.includes('terap') || 
    text.includes('mente') || 
    text.includes('emocion') || 
    text.includes('psiquiatr') ||
    text.includes('crp')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80', // Ambiente acolhedor e escuta
      about: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80', // Atendimento humanizado
      practicePattern: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 6. Fisioterapia, Reabilitação, Pilates, Ortopedia
  if (
    text.includes('fisioter') || 
    text.includes('reabilit') || 
    text.includes('pilates') || 
    text.includes('postur') ||
    text.includes('crefito')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', // Sessão de Fisioterapia
      about: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80', // Reabilitação e movimento
      practicePattern: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 7. Nutrição, Dietética, Emagrecimento
  if (
    text.includes('nutri') || 
    text.includes('dieta') || 
    text.includes('aliment') || 
    text.includes('emagrec') ||
    text.includes('crn')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80', // Alimentação Saudável
      about: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1000&q=80', // Consultório Nutricional
      practicePattern: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 8. Educação Física, Personal Trainer, Academia, Fitness
  if (
    text.includes('personal') || 
    text.includes('treinador') || 
    text.includes('fitness') || 
    text.includes('academi') || 
    text.includes('musculac') ||
    text.includes('cref')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', // Treinamento / Fitness
      about: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80', // Personal Trainer
      practicePattern: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 9. Contabilidade, Finanças, Consultoria Financeira, Tributos
  if (
    text.includes('contab') || 
    text.includes('financ') || 
    text.includes('invest') || 
    text.includes('auditor') || 
    text.includes('fiscal') || 
    text.includes('perito') ||
    text.includes('crc')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', // Análise Financeira
      about: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80', // Dados e Gestão
      practicePattern: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 10. Engenharia, Construção, Obras, Reforma, Eletricista, Encanador
  if (
    text.includes('engenh') || 
    text.includes('obra') || 
    text.includes('construc') || 
    text.includes('eletric') || 
    text.includes('mecanic') || 
    text.includes('civil') || 
    text.includes('reform') ||
    text.includes('crea')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', // Engenharia / Projetos
      about: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80', // Planejamento e Obras
      practicePattern: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 11. Arquitetura, Design de Interiores, Urbanismo
  if (
    text.includes('arquitet') || 
    text.includes('interiores') || 
    text.includes('decorac') || 
    text.includes('urbanis') ||
    text.includes('cau')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Arquitetura Contemporânea
      about: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80', // Projeto Arquitetônico
      practicePattern: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 12. Estética, Beleza, Barbeiro, Cabelo, Spa, Maquiagem
  if (
    text.includes('estet') || 
    text.includes('belez') || 
    text.includes('barbear') || 
    text.includes('barbeir') || 
    text.includes('cabel') || 
    text.includes('spa') || 
    text.includes('maquiag') ||
    text.includes('manicur') ||
    text.includes('salao')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80', // Salão / Barbearia Premium
      about: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80', // Cuidados de Beleza
      practicePattern: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 13. Veterinária, Pet, Cuidados Animais
  if (
    text.includes('veterin') || 
    text.includes('pet') || 
    text.includes('animal') || 
    text.includes('cao') || 
    text.includes('cachorro') || 
    text.includes('gato') || 
    text.includes('banho e tosa') ||
    text.includes('crmv')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80', // Clínica Veterinária
      about: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80', // Médico Veterinário
      practicePattern: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 14. Fotografia, Vídeo, Produção Audiovisual
  if (
    text.includes('fotog') || 
    text.includes('video') || 
    text.includes('filmmak') || 
    text.includes('audiovisual') ||
    text.includes('ensaio') ||
    text.includes('camera')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80', // Câmera / Ensaio
      about: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1000&q=80', // Estúdio Fotográfico
      practicePattern: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    };
  }

  // 15. Tecnologia, Programação, Software, TI
  if (
    text.includes('program') || 
    text.includes('softwar') || 
    text.includes('ti') || 
    text.includes('tecnolog') || 
    text.includes('desenvolv') || 
    text.includes('sistem') ||
    text.includes('dev')
  ) {
    return {
      hero: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', // Código / Tecnologia
      about: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80', // Workspace Tech
      practicePattern: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    };
  }

  // Padrão Geral Executivo / Serviços Especializados
  return {
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', // Escritório Moderno
    about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
  };
}

/**
 * Gera o template completo, profissional e fiel ao Prompt Mestre com distinção visual real
 * entre os modelos (MODEL_A, MODEL_B, MODEL_C) e aplicação rigorosa das cores e imagens contextuais.
 */
export function renderCompleteSiteHtml(data: OnboardingData, spec?: DesignSpec, adminToken?: string): string {
  const name = data.professionalName || data.fullName || 'Nome do Profissional / Empresa';
  const profession = data.profession || 'Especialista / Consultoria';
  const specialty = data.mainSpecialty || 'Atendimento e Serviços Especializados';
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');
  const councilBadge = data.councilNumber 
    ? `${data.councilType || 'Registro'} ${data.councilNumber}` 
    : (data.hasProfessionalCouncil ? 'Registro Ativo' : 'Atendimento Certificado');
  const variant = spec?.variant || 'MODEL_A';
  
  // Imagens temáticas contextuais de acordo com a profissão digitada
  const images = getContextualImages(profession, specialty, data.companyName);
  const heroImage = data.coverPhotoUrl || images.hero;
  const aboutImage = data.profilePhotoUrl || images.about;

  // Cores personalizadas escolhidas pelo usuário
  const primary = data.primaryColor || '#0f172a';
  const secondary = data.secondaryColor || '#2563eb';
  const accent = data.accentColor || '#10b981';

  // Configurações visuais por variante
  const isConversion = variant === 'MODEL_D';
  const isEditorial = variant === 'MODEL_C';
  const isModern = variant === 'MODEL_B';
  const isInstitutional = variant === 'MODEL_A';

  const fontBody = isEditorial ? "'Playfair Display', Georgia, serif" : (isModern || isConversion) ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif";
  const fontHeading = isEditorial ? "'Playfair Display', Georgia, serif" : (isModern || isConversion) ? "'Plus Jakarta Sans', sans-serif" : "'Outfit', sans-serif";

  const servicesList = data.services && data.services.length > 0 ? data.services : [
    {
      title: 'Consultoria e Atendimento Especializado',
      shortDescription: 'Atendimento e orientação personalizada com análise aprofundada das suas necessidades e soluções sob medida.',
      icon: 'Briefcase',
      ctaText: 'Solicitar Atendimento'
    },
    {
      title: 'Diagnóstico e Planejamento',
      shortDescription: 'Avaliação técnica detalhada para estruturação das melhores etapas e estratégias práticas para o seu objetivo.',
      icon: 'Target',
      ctaText: 'Agendar Horário'
    },
    {
      title: 'Acompanhamento Contínuo',
      shortDescription: 'Suporte dedicado e acompanhamento próximo para garantir excelência, segurança e resultados consistentes.',
      icon: 'Shield',
      ctaText: 'Falar no WhatsApp'
    }
  ];

  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${profession} | ${specialty}</title>
  <meta name="description" content="${data.professionalSummary || 'Atuação de alto padrão, atendimento individualizado e compromisso com os melhores resultados para você.'}">
  
  <!-- Tailwind CSS & Fontes Google Stitch -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,400;1,600&family=Cinzel:wght@500;600;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --primary-color: ${primary};
      --secondary-color: ${secondary};
      --accent-color: ${accent};
    }
    body { font-family: ${fontBody}; }
    h1, h2, h3, h4, h5, h6 { font-family: ${fontHeading}; }
    .bg-custom-primary { background-color: ${primary}; }
    .text-custom-primary { color: ${primary}; }
    .border-custom-primary { border-color: ${primary}; }
    .bg-custom-secondary { background-color: ${secondary}; }
    .text-custom-secondary { color: ${secondary}; }
    .border-custom-secondary { border-color: ${secondary}; }
    .bg-custom-accent { background-color: ${accent}; }
    .text-custom-accent { color: ${accent}; }
    .border-custom-accent { border-color: ${accent}; }
  </style>
</head>
<body class="${isModern ? 'bg-slate-950 text-slate-100' : isEditorial ? 'bg-[#faf9f6] text-stone-900' : isConversion ? 'bg-slate-50 text-slate-900' : 'bg-slate-50 text-slate-900'} antialiased">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 ${isModern ? 'bg-slate-900/90 border-slate-800' : isEditorial ? 'bg-[#faf9f6]/95 border-stone-300' : isConversion ? 'bg-white/95 border-slate-200/80 shadow-sm' : 'bg-white/95 border-slate-200'} backdrop-blur border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-11 h-11 ${isEditorial ? 'rounded-none' : isConversion ? 'rounded-2xl' : 'rounded-xl'} text-white flex items-center justify-center font-bold text-lg shadow-md" style="background-color: ${primary}">
          ${name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span class="font-bold text-lg leading-tight block ${isModern ? 'text-white' : isEditorial ? 'text-stone-900 font-serif' : 'text-slate-900'}">${name}</span>
          <span class="text-xs font-medium block ${isModern ? 'text-slate-400' : 'text-slate-500'}">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold ${isModern ? 'text-slate-300' : isEditorial ? 'text-stone-700' : 'text-slate-600'}">
        <a href="#inicio" class="hover:opacity-80 transition">Início</a>
        <a href="#servicos" class="hover:opacity-80 transition">Serviços</a>
        <a href="#como-funciona" class="hover:opacity-80 transition">Como Funciona</a>
        <a href="#sobre" class="hover:opacity-80 transition">Sobre</a>
        <a href="#artigos" class="hover:opacity-80 transition">Informativos</a>
        <a href="#contato" class="hover:opacity-80 transition">Contato</a>
      </nav>

      <div class="flex items-center space-x-3">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-5 py-2.5 text-white text-sm font-bold ${isEditorial ? 'rounded-none uppercase tracking-wider' : isConversion ? 'rounded-2xl' : 'rounded-xl'} shadow-md transition-all flex items-center hover:opacity-90" style="background-color: ${isConversion ? accent : primary}">
          Agendar Atendimento
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION VARIANTES -->
  ${isConversion ? `
  <!-- HERO MODELO D (GOOGLE STITCH PULSE / ALTA CONVERSÃO & BENTO) -->
  <section id="inicio" class="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Disponível para Atendimento • ${data.city || 'São Paulo'} (${data.attendanceType === 'online' ? '100% Online' : data.attendanceType === 'presencial' ? 'Presencial' : 'Híbrido'})
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08] mb-6">
            ${data.companyName || specialty || 'Consultoria e Soluções Estratégicas de Alto Nível'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
            ${data.professionalSummary || 'Atendimento ágil, foco em resultados concretos e segurança técnica em cada detalhe.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 text-center flex items-center justify-center gap-2" style="background-color: ${accent}">
              <span>⚡</span> Falar no WhatsApp Agora
            </a>
            <a href="#contato" class="px-8 py-4 bg-white border-2 border-slate-300 text-slate-800 font-bold rounded-2xl hover:border-slate-900 transition text-center">
              Agendar Reunião / Proposta
            </a>
          </div>

          <div class="mt-8 flex items-center gap-6 text-xs text-slate-500 font-semibold">
            <span class="flex items-center gap-1.5">✓ Resposta Rápida</span>
            <span class="flex items-center gap-1.5">✓ Confidencialidade Total</span>
            <span class="flex items-center gap-1.5">✓ Atendimento Personalizado</span>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] lg:aspect-[4/5] group bg-slate-100">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 p-5 rounded-2xl backdrop-blur-md bg-white/95 border border-white/40 shadow-xl">
              <span class="text-xs font-bold text-emerald-700 uppercase tracking-wider block">${profession}</span>
              <span class="text-base font-extrabold text-slate-900 block mt-0.5">${name}</span>
              <span class="text-[11px] text-slate-500 block">${specialty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : isModern ? `
  <!-- HERO MODELO B (MODERNO PREMIUM / DARK COM IMAGEM) -->
  <section id="inicio" class="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border shadow-sm" style="background-color: ${primary}25; border-color: ${primary}66; color: #ffffff">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${accent}"></span>
            ${data.attendanceType === 'online' ? 'Atendimento 100% Online' : data.attendanceType === 'presencial' ? 'Atendimento Presencial' : 'Atendimento Online & Presencial'} • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            ${data.companyName || specialty || 'Soluções Estratégicas e Atendimento de Alta Performance'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            ${data.professionalSummary || 'Atuação dedicada, ética e com rigor técnico para entregar os melhores resultados com atendimento próximo e transparente.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105 text-center" style="background-color: ${accent}">
              Falar Diretamente no WhatsApp
            </a>
            <a href="#contato" class="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition text-center">
              Solicitar Contato
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/3] lg:aspect-[4/5] group">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-slate-900/80 border border-slate-700/60">
              <span class="text-xs font-bold text-amber-400 block">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}</span>
              <span class="text-sm font-semibold text-white block mt-0.5">${name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : isEditorial ? `
  <!-- HERO MODELO C (MINIMALISTA EDITORIAL / CLÁSSICO COM IMAGEM) -->
  <section id="inicio" class="py-20 md:py-28 border-b border-stone-300 bg-[#faf9f6]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <div class="border-l-4 pl-6 sm:pl-8 mb-6" style="border-color: ${primary}">
            <span class="text-xs uppercase tracking-widest font-semibold text-stone-500 block mb-2">${profession} • ${data.city || 'São Paulo'}/${data.state || 'SP'}</span>
            <h1 class="text-4xl sm:text-5xl font-serif text-stone-900 leading-tight">
              ${data.companyName || specialty || 'Excelência Profissional e Atendimento Dedicado'}
            </h1>
          </div>
          
          <p class="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 font-serif">
            ${data.professionalSummary || 'Atuação orientada por princípios de qualidade, clareza e dedicação para proporcionar as soluções mais adequadas.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold text-center tracking-wider text-xs shadow-sm transition hover:opacity-90" style="background-color: ${primary}">
              CONSULTAR VIA WHATSAPP
            </a>
            <a href="#contato" class="px-8 py-4 border border-stone-400 text-stone-900 font-bold text-center tracking-wider text-xs hover:bg-stone-200 transition">
              ENVIAR MENSAGEM
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="p-3 bg-white border border-stone-300 shadow-md">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-80 lg:h-96 object-cover grayscale contrast-125">
            <p class="text-[11px] font-serif text-stone-500 mt-2 text-center uppercase tracking-widest">${specialty} • ${data.city || 'Atuação Especializada'}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : `
  <!-- HERO MODELO A (INSTITUCIONAL CONFIÁVEL COM IMAGEM SPLIT) -->
  <section id="inicio" class="relative pt-16 pb-20 md:pt-20 md:pb-28 bg-white overflow-hidden border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border" style="background-color: ${secondary}15; border-color: ${secondary}40; color: ${primary}">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${accent}"></span>
            ${data.attendanceType === 'online' ? 'Atendimento 100% Online' : data.attendanceType === 'presencial' ? 'Atendimento Presencial' : 'Atendimento Online e Presencial'} • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15] mb-6">
            ${data.companyName || specialty || 'Serviços Especializados com Atendimento Individualizado'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            ${data.professionalSummary || 'Atuação com alto padrão técnico, responsabilidade e transparência em todas as etapas de atendimento.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-xl shadow-lg text-center transition hover:opacity-90" style="background-color: ${primary}">
              Falar pelo WhatsApp
            </a>
            <a href="#contato" class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center transition">
              Enviar Mensagem
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] lg:aspect-[4/4]">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-sm shadow-md border border-slate-100">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">${profession}</span>
              <span class="text-sm font-bold text-slate-900 block">${name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}

  <!-- SERVIÇOS / ÁREAS DE ATUAÇÃO -->
  <section id="servicos" class="py-20 ${isModern ? 'bg-slate-900 border-b border-slate-800' : isEditorial ? 'bg-[#f4f2eb] border-b border-stone-300' : isConversion ? 'bg-white border-b border-slate-200' : 'bg-slate-50 border-b border-slate-200'}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${secondary}">Serviços & Soluções</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Áreas de Atuação e Especialidades</p>
        <p class="mt-3 text-sm ${isModern ? 'text-slate-400' : 'text-slate-600'}">Soluções estruturadas para atender às necessidades específicas do seu perfil.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${servicesList.map((s, index) => `
          <div class="${isModern ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : isEditorial ? 'bg-white border-stone-300 rounded-none' : isConversion ? 'bg-slate-50 border-slate-200/80 rounded-3xl hover:bg-slate-100/80 hover:border-slate-300' : 'bg-white border-slate-200 rounded-2xl'} p-8 border shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 ${isEditorial ? 'rounded-none' : isConversion ? 'rounded-2xl' : 'rounded-xl'} text-white flex items-center justify-center font-bold mb-6 text-xl shadow-md" style="background-color: ${primary}">
              ${index === 0 ? '✨' : index === 1 ? '🎯' : '⭐'}
            </div>
            <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mb-3">${s.title}</h3>
            <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-6">${s.shortDescription}</p>
            <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, gostaria de informações sobre ' + s.title)}" target="_blank" class="text-sm font-bold inline-flex items-center hover:underline" style="color: ${primary}">
              ${s.ctaText || 'Saber mais'} →
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona" class="py-20 ${isModern ? 'bg-slate-950 border-b border-slate-800' : isEditorial ? 'bg-[#faf9f6] border-b border-stone-300' : isConversion ? 'bg-slate-50 border-b border-slate-200' : 'bg-white border-b border-slate-200'}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Processo</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Como Funciona o Atendimento</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : isConversion ? 'bg-white border-slate-200 rounded-3xl shadow-sm' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto ${isConversion ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">1</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Primeiro Contato</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Você entra em contato via WhatsApp ou formulário apresentando sua necessidade.</p>
        </div>
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : isConversion ? 'bg-white border-slate-200 rounded-3xl shadow-sm' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto ${isConversion ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">2</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Diagnóstico Personalizado</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Avaliamos seu caso detalhadamente para estruturar a abordagem mais eficiente e sob medida.</p>
        </div>
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : isConversion ? 'bg-white border-slate-200 rounded-3xl shadow-sm' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto ${isConversion ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">3</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Execução & Resultados</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Iniciamos os trabalhos com suporte contínuo, transparência e foco nos melhores resultados.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE O PROFISSIONAL / EMPRESA COM FOTO -->
  <section id="sobre" class="py-20 ${isModern ? 'bg-slate-900 border-b border-slate-800' : isEditorial ? 'bg-[#f4f2eb] border-b border-stone-300' : isConversion ? 'bg-white border-b border-slate-200' : 'bg-slate-50 border-b border-slate-200'}">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${isModern ? 'bg-slate-950 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : isConversion ? 'bg-slate-50 border-slate-200/80 rounded-3xl shadow-sm' : 'bg-white border-slate-200 rounded-3xl'} p-8 sm:p-12 border shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-4">
            <div class="${isConversion ? 'rounded-3xl' : 'rounded-2xl'} overflow-hidden border border-slate-200/80 shadow-md aspect-[3/4]">
              <img src="${aboutImage}" alt="${name}" class="w-full h-full object-cover">
            </div>
          </div>

          <div class="lg:col-span-8">
            <h2 class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${secondary}">Apresentação</h2>
            <h3 class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} mb-3">${name}</h3>
            <p class="text-sm font-semibold ${isModern ? 'text-slate-400' : 'text-slate-500'} mb-6">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''} • Atendimento em ${data.city || 'São Paulo'}/${data.state || 'SP'}</p>
            
            <p class="${isModern ? 'text-slate-300' : 'text-slate-700'} leading-relaxed mb-6">
              ${data.bio || data.professionalSummary || 'Dedicado a oferecer soluções de alto nível com rigor técnico, ética e transparência, proporcionando uma experiência diferenciada a cada cliente.'}
            </p>

            <div class="pt-6 border-t ${isModern ? 'border-slate-800' : 'border-slate-100'} flex flex-wrap gap-4 text-xs font-semibold ${isModern ? 'text-slate-300' : 'text-slate-600'}">
              <span class="px-3 py-1.5 ${isModern ? 'bg-slate-900' : 'bg-slate-100'} rounded-lg">🕒 Horário: ${data.businessHours || 'Segunda a Sexta, das 09h às 18h'}</span>
              <span class="px-3 py-1.5 ${isModern ? 'bg-slate-900' : 'bg-slate-100'} rounded-lg">📍 Atendimento: ${data.attendanceType === 'online' ? '100% Online' : data.attendanceType === 'presencial' ? 'Presencial' : 'Híbrido (Online e Presencial)'}</span>
              <span class="px-3 py-1.5 ${isModern ? 'bg-slate-900' : 'bg-slate-100'} rounded-lg">✉️ ${data.publicEmail || 'Atendimento Direto'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ARTIGOS E INFORMATIVOS -->
  <section id="artigos" class="py-20 ${isModern ? 'bg-slate-950 border-b border-slate-800' : isEditorial ? 'bg-[#faf9f6] border-b border-stone-300' : 'bg-white border-b border-slate-200'}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Conteúdo</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Artigos & Orientações</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border">
          <span class="text-xs font-bold uppercase" style="color: ${secondary}">Guia Informativo</span>
          <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mt-2 mb-3">Principais Cuidados e Estratégias para Escolher o Serviço Ideal</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-4">Entenda os fatores determinantes na tomada de decisão e como um planejamento adequado pode economizar tempo e recursos.</p>
          <span class="text-xs text-slate-500 font-medium">Leitura: 4 min • Por ${name}</span>
        </div>

        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border">
          <span class="text-xs font-bold uppercase" style="color: ${secondary}">Artigo Técnico</span>
          <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mt-2 mb-3">A Importância do Acompanhamento Especializado</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-4">Como a assistência profissional qualificada previne problemas e assegura a máxima eficiência em cada projeto.</p>
          <span class="text-xs text-slate-500 font-medium">Leitura: 3 min • Por ${name}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMULÁRIO DE CONTATO DIRETO -->
  <section id="contato" class="py-20 ${isModern ? 'bg-slate-900' : isEditorial ? 'bg-[#f4f2eb]' : 'bg-slate-50'}">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${isModern ? 'bg-slate-950 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} p-8 sm:p-12 border shadow-sm">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'}">Formulário de Contato Direto</h2>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm mt-2">Envie sua mensagem. Seus dados são confidenciais e retornaremos o mais breve possível.</p>
        </div>

        <form onsubmit="event.preventDefault(); alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');" class="space-y-4">
          <div>
            <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">Nome Completo *</label>
            <input type="text" required placeholder="Seu nome completo" class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">Telefone / WhatsApp *</label>
              <input type="tel" required placeholder="(11) 99999-9999" class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">E-mail *</label>
              <input type="email" required placeholder="seu@email.com" class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">Motivo do Contato *</label>
            <select class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none">
              <option>Solicitação de Orçamento / Proposta</option>
              <option>Agendamento de Consulta / Reunião</option>
              <option>Dúvidas Gerais sobre Serviços</option>
              <option>Outros Assuntos</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">Mensagem / Resumo *</label>
            <textarea rows="4" required placeholder="Descreva brevemente a sua solicitação..." class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none"></textarea>
          </div>

          <p class="text-xs text-slate-500">Ao enviar este formulário, você concorda com a política de privacidade e o tratamento confidencial das informações.</p>

          <button type="submit" class="w-full py-4 text-white font-bold ${isEditorial ? 'rounded-none' : 'rounded-xl'} shadow-md transition-all hover:opacity-90" style="background-color: ${primary}">
            Enviar Informações com Segurança
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="${isModern ? 'bg-black text-white' : 'bg-slate-950 text-white'} py-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <p class="font-bold text-lg">${name}</p>
        <p class="text-xs text-slate-400 mt-1">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}</p>
      </div>
      <p class="text-xs text-slate-500 text-center sm:text-right">
        © ${new Date().getFullYear()} ${name}. Todos os direitos reservados.<br>
        Tecnologia e infraestrutura por <strong>SitePronto</strong>.
      </p>
    </div>
  </footer>

</body>
</html>`;
}
