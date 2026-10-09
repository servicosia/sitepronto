import type { OnboardingData } from '../validation/onboarding';
import type { DesignSpec } from './specs';
import { 
  analyzeProfessionContext, 
  getContextualGallery, 
  getContextualTestimonials 
} from './profession-intelligence';

/**
 * Mapeador de Imagens Contextuais Inteligente e Amplo (Unsplash Editorial)
 * de acordo com a profissão / nicho / especialidade informada.
 */
export function getContextualImages(profession?: string, specialty?: string, companyName?: string) {
  const analysis = analyzeProfessionContext(profession, specialty, companyName);
  return analysis.images;
}


/**
 * Renderiza o corpo do site para uma variante específica (MODEL_A, MODEL_B, MODEL_C, MODEL_D)
 */
export function renderSingleTemplateHtml(data: OnboardingData, variantName: 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D' = 'MODEL_A'): string {
  const name = data.professionalName || data.fullName || 'Nome do Profissional';
  const profession = data.profession || 'Especialista';
  const specialty = data.mainSpecialty || 'Atendimento Especializado';
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');
  const councilBadge = data.councilNumber 
    ? `${data.councilType || 'Registro'} ${data.councilNumber}` 
    : (data.hasProfessionalCouncil ? 'Registro Ativo' : 'Atendimento Certificado');
  
  const images = getContextualImages(profession, specialty, data.companyName);
  const heroImage = data.coverPhotoUrl || images.hero;
  const aboutImage = data.profilePhotoUrl || images.about;

  const galleryList = (data.gallery && data.gallery.length > 0)
    ? data.gallery
    : getContextualGallery(profession, specialty, data.companyName);

  const testimonialsList = (data.testimonials && data.testimonials.length > 0)
    ? data.testimonials
    : getContextualTestimonials(profession, specialty, data.companyName);

  const isModelA = variantName === 'MODEL_A'; // Serene Haven (Inspirado em psicologia.servicos.ia.br)
  const isModelB = variantName === 'MODEL_B'; // Midnight Luminescence (Dark Stitch)
  const isModelC = variantName === 'MODEL_C'; // Atelier Editorial (Nobility & Warmth)
  const isModelD = variantName === 'MODEL_D'; // Modern Bento Pulse (SaaS / Conversão)

  // Cores personalizadas ou da paleta do Stitch
  const primary = data.primaryColor && data.primaryColor !== '#0f172a' 
    ? data.primaryColor 
    : (isModelA ? '#2e4f43' : isModelB ? '#0f172a' : isModelC ? '#1c1917' : '#0f172a');

  const secondary = data.secondaryColor && data.secondaryColor !== '#3b82f6'
    ? data.secondaryColor
    : (isModelA ? '#c88770' : isModelB ? '#38bdf8' : isModelC ? '#78716c' : '#2563eb');

  const accent = data.accentColor && data.accentColor !== '#10b981'
    ? data.accentColor
    : (isModelA ? '#3b6154' : isModelB ? '#10b981' : isModelC ? '#b45309' : '#10b981');

  const fontBody = (isModelA || isModelC) ? "'Plus Jakarta Sans', sans-serif" : (isModelB || isModelD) ? "'Inter', sans-serif" : "'Inter', sans-serif";
  const fontHeading = (isModelA || isModelC) ? "'Playfair Display', Georgia, serif" : "'Plus Jakarta Sans', sans-serif";

  const servicesList = data.services && data.services.length > 0 ? data.services : [
    {
      title: 'Consultoria e Atendimento Individual',
      shortDescription: 'Sessões personalizadas e diagnóstico aprofundado com suporte contínuo para alcançar seus objetivos com clareza.',
      icon: 'Briefcase',
      ctaText: 'Agendar Sessão'
    },
    {
      title: 'Avaliação & Diagnóstico Técnico',
      shortDescription: 'Estruturação estratégica, mapeamento de prioridades e plano de ação estruturado de alta eficácia.',
      icon: 'Target',
      ctaText: 'Solicitar Avaliação'
    },
    {
      title: 'Acompanhamento e Mentoria',
      shortDescription: 'Suporte dedicado e orientação periódica para garantir segurança, evolução sustentável e excelência nos resultados.',
      icon: 'Shield',
      ctaText: 'Falar no WhatsApp'
    }
  ];

  const productsList = (data.products && data.products.length > 0) ? data.products : [
    {
      title: 'Kit de Boas-Vindas & Acompanhamento',
      description: 'Material exclusivo com guia de orientações, diário de hábitos e suporte prático dedicado.',
      price: 'R$ 89,00',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Pedir no WhatsApp',
    },
    {
      title: 'Guia Prático Estratégico',
      description: 'Manual completo passo a passo com metodologia consolidada e orientações essenciais.',
      price: 'R$ 59,90',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Pedir no WhatsApp',
    },
    {
      title: 'Mentoria & Pacote de Atendimento',
      description: 'Acompanhamento estruturado com diagnóstico aprofundado e metas personalizadas.',
      price: '',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Consultar Valores',
    }
  ];

  const faqList = (data.faq && data.faq.length > 0) ? data.faq : [
    { question: 'Como funciona o primeiro atendimento ou consulta?', answer: 'Realizamos um diagnóstico detalhado das suas necessidades, com escuta atenta, ética e um plano de trabalho totalmente personalizado.' },
    { question: 'Vocês atendem de forma online ou presencial?', answer: 'Oferecemos formatos flexíveis: atendimento 100% online para todo o Brasil e atendimento presencial com estrutura acolhedora e climatizada.' },
    { question: 'Qual o tempo médio de resposta para agendamentos?', answer: 'Normalmente retornamos em até poucas horas pelo WhatsApp comercial. Você escolhe o melhor dia e horário na agenda.' },
    { question: 'Quais são as opções de pagamento aceitas?', answer: 'Trabalhamos com PIX, cartões de crédito em até 12x e faturamento corporativo para empresas e contratos mensais.' }
  ];

  const plansList = (data.plans && data.plans.length > 0) ? data.plans : [
    {
      title: 'Atendimento Pontual',
      badge: 'Início Rápido',
      price: 'R$ 250',
      period: 'por sessão',
      description: 'Ideal para alinhamento rápido de demandas específicas e orientações imediatas.',
      features: ['Diagnóstico aprofundado', 'Plano de ação estruturado', 'Suporte pós-atendimento'],
      ctaText: 'Agendar Sessão',
      highlight: false
    },
    {
      title: 'Acompanhamento Estruturado',
      badge: 'Mais Escolhido',
      price: 'R$ 690',
      period: 'por mês',
      description: 'Plano com acompanhamento periódico para evolução contínua e resultados consistentes.',
      features: ['4 Atendimentos mensais', 'Suporte prioritário via WhatsApp', 'Ajustes contínuos de metas', 'Materiais e relatórios exclusivos'],
      ctaText: 'Contratar Pacote',
      highlight: true
    },
    {
      title: 'Assessoria Completa & VIP',
      badge: 'Exclusivo',
      price: 'Sob Consulta',
      period: 'sob medida',
      description: 'Atendimento dedicado com foco estratégico de alta intensidade para máxima segurança.',
      features: ['Acesso prioritário irrestrito', 'Consultoria e alinhamento', 'Análise preventiva contínua', 'Atendimento presencial e online'],
      ctaText: 'Falar com Especialista',
      highlight: false
    }
  ];

  const casesList = (data.cases && data.cases.length > 0) ? data.cases : [
    {
      title: 'Reestruturação Estratégica e Crescimento Seguro',
      category: 'Consultoria & Estratégia',
      resultBadge: '+140% em Resultados',
      description: 'Mapeamento minucioso dos desafios e implementação de metodologia prática para destravar objetivos.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Conhecer Caso'
    },
    {
      title: 'Atendimento Especializado com Resolução Eficaz',
      category: 'Atendimento Direto',
      resultBadge: '100% Satisfação',
      description: 'Acompanhamento humanizado e técnico para resolução de demandas complexas com total transparência.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Conhecer Caso'
    }
  ];

  const partnersList = (data.partners && data.partners.length > 0) ? data.partners : [
    { name: 'Empresa Líder Regional', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Cliente' },
    { name: 'Grupo Inovação & Saúde', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Parceiro' },
    { name: 'Certificação de Qualidade Técnica', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Certificação' }
  ];

  const announcementConfig = data.announcement || {
    active: false,
    text: 'Aviso: Agenda aberta para novos atendimentos este mês com horários flexíveis!',
    badge: 'COMUNICADO',
    linkText: 'Falar no WhatsApp',
    linkUrl: `https://wa.me/${whatsappDigits}`
  };

  const simulatorConfig = data.simulator || {
    active: false,
    title: 'Simulador de Atendimento Personalizado',
    subtitle: 'Escolha suas preferências e envie uma solicitação pronta no WhatsApp com 1 clique'
  };

  const defaultOffModules = ['catalogo', 'faq', 'planos', 'cases', 'biolinks', 'comunicado', 'parceiros', 'simulador'];

  const isSectionActive = (sec: string): boolean => {
    if (!data.sectionsConfig) return !defaultOffModules.includes(sec);
    if (defaultOffModules.includes(sec)) {
      return (data.sectionsConfig as any)?.[sec] === true;
    }
    return (data.sectionsConfig as any)[sec] !== false;
  };

  return `
<div class="template-wrapper ${
    isModelA ? 'bg-[#fbf9f6] text-[#1e2824]' : 
    isModelB ? 'bg-[#090d16] text-[#f8fafc]' : 
    isModelC ? 'bg-[#faf7f2] text-[#1c1917]' : 
    'bg-[#f8fafc] text-[#0f172a]'
  } antialiased min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900" style="font-family: ${fontBody};">

  <!-- ==================== BARRA DE AVISOS / COMUNICADO ==================== -->
  <div id="comunicado" data-section-id="comunicado" style="${!isSectionActive('comunicado') ? 'display: none !important;' : ''}" class="py-2.5 px-4 text-xs font-medium text-center transition-all flex items-center justify-center gap-3 relative z-50 overflow-hidden ${
    isModelB ? 'bg-sky-950 text-sky-200 border-b border-sky-800' : 
    isModelA ? 'bg-[#2e4f43] text-white' : 
    isModelC ? 'bg-stone-900 text-stone-100' : 
    'bg-slate-900 text-white'
  }">
    <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
      isModelB ? 'bg-sky-800 text-white' : 
      isModelA ? 'bg-[#c88770] text-white' : 
      isModelC ? 'bg-stone-700 text-white' : 
      'bg-emerald-500 text-slate-950'
    }">${announcementConfig.badge || 'COMUNICADO'}</span>
    <span class="truncate max-w-xl announcement-text-display">${announcementConfig.text || ''}</span>
    ${announcementConfig.linkText ? `
      <a href="${announcementConfig.linkUrl || `https://wa.me/${whatsappDigits}`}" target="_blank" class="announcement-link-display underline font-bold hover:opacity-80 ml-1 shrink-0">
        ${announcementConfig.linkText} ↗
      </a>
    ` : ''}
  </div>

  <!-- ==================== HEADER / NAVEGAÇÃO ==================== -->
  <header class="sticky top-0 z-40 ${
    isModelA ? 'bg-[#fbf9f6]/95 border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16]/95 border-slate-800/80' : 
    isModelC ? 'bg-[#faf7f2]/95 border-stone-300' : 
    'bg-white/95 border-slate-200/80 shadow-sm'
  } backdrop-blur-md border-b transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      
      <!-- Brand Logo / Badge -->
      <a href="#inicio" class="flex items-center space-x-3 group shrink-0 min-w-0 max-w-[240px] sm:max-w-[280px] xl:max-w-[320px]">
        <div class="w-11 h-11 ${isModelC ? 'rounded-none' : isModelD ? 'rounded-2xl' : 'rounded-2xl'} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 transition-transform group-hover:scale-105" style="background-color: ${primary}">
          ${(data.companyName || name).slice(0, 2).toUpperCase()}
        </div>
        <div class="min-w-0 overflow-hidden leading-tight">
          <span class="font-bold text-sm sm:text-base block truncate ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}">${data.companyName || name}</span>
          <span class="text-[11px] font-medium block truncate ${isModelB ? 'text-slate-400' : 'text-stone-500'}">
            ${data.companyName ? `${name} • ` : ''}${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden xl:flex items-center space-x-3 2xl:space-x-5 text-xs 2xl:text-sm font-semibold shrink min-w-0 ${isModelB ? 'text-slate-300' : isModelC ? 'text-stone-700 tracking-wider text-xs uppercase' : 'text-stone-600'}">
        <a href="#inicio" data-nav-section="inicio" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}">Início</a>
        <a href="#parceiros" data-nav-section="parceiros" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('parceiros') ? 'display: none !important;' : ''}">Parceiros</a>
        <a href="#servicos" data-nav-section="servicos" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('servicos') ? 'display: none !important;' : ''}">Atuação</a>
        <a href="#catalogo" data-nav-section="catalogo" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('catalogo') ? 'display: none !important;' : ''}">Catálogo</a>
        <a href="#planos" data-nav-section="planos" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('planos') ? 'display: none !important;' : ''}">Planos</a>
        <a href="#cases" data-nav-section="cases" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('cases') ? 'display: none !important;' : ''}">Casos</a>
        <a href="#como-funciona" data-nav-section="como-funciona" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('como-funciona') ? 'display: none !important;' : ''}">Como Funciona</a>
        <a href="#sobre" data-nav-section="sobre" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('sobre') ? 'display: none !important;' : ''}">Sobre</a>
        <a href="#galeria" data-nav-section="galeria" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('galeria') ? 'display: none !important;' : ''}">Galeria</a>
        <a href="#depoimentos" data-nav-section="depoimentos" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('depoimentos') ? 'display: none !important;' : ''}">Depoimentos</a>
        <a href="#faq" data-nav-section="faq" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('faq') ? 'display: none !important;' : ''}">Dúvidas</a>
        <a href="#simulador" data-nav-section="simulador" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('simulador') ? 'display: none !important;' : ''}">Simulador</a>
        <a href="#artigos" data-nav-section="artigos" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('artigos') ? 'display: none !important;' : ''}">Orientações</a>
        <a href="#contato" data-nav-section="contato" class="hover:opacity-80 transition py-1 shrink-0" style="${!isSectionActive('contato') ? 'display: none !important;' : ''}">Contato</a>
      </nav>

      <!-- CTA Action & Mobile Toggle -->
      <div class="flex items-center space-x-3 shrink-0">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="hidden sm:inline-flex px-5 2xl:px-6 py-2.5 text-white text-xs 2xl:text-sm font-bold ${
          isModelC ? 'rounded-none uppercase tracking-widest text-xs' : isModelA ? 'rounded-full' : isModelD ? 'rounded-2xl' : 'rounded-xl'
        } shadow-sm transition-all items-center hover:opacity-95 hover:shadow-md active:scale-95" style="background-color: ${primary}">
          ${isModelA ? 'Agendar Consulta' : isModelC ? 'CONSULTAR AGORA' : 'Agendar Atendimento'}
        </a>
        
        <!-- Mobile Menu Toggle -->
        <button type="button" onclick="toggleMobileNav(this)" aria-label="Abrir Menu" class="xl:hidden p-2 rounded-xl border ${isModelB ? 'border-slate-800 text-slate-200 hover:bg-slate-800' : 'border-stone-200 text-stone-700 hover:bg-stone-100'} transition flex items-center justify-center">
          <svg class="w-6 h-6 hamburger-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg class="w-6 h-6 close-icon hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div class="mobile-nav-menu hidden xl:hidden border-t ${isModelB ? 'bg-[#090d16] border-slate-800' : isModelC ? 'bg-[#faf7f2] border-stone-300' : 'bg-white border-stone-200'} px-4 pt-3 pb-6 space-y-3 shadow-xl">
      <div class="flex flex-col space-y-2 text-sm font-semibold ${isModelB ? 'text-slate-200' : 'text-stone-800'}">
        <a href="#inicio" data-nav-section="inicio" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}">Início</a>
        <a href="#parceiros" data-nav-section="parceiros" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('parceiros') ? 'display: none !important;' : ''}">Parceiros</a>
        <a href="#servicos" data-nav-section="servicos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('servicos') ? 'display: none !important;' : ''}">Atuação</a>
        <a href="#catalogo" data-nav-section="catalogo" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('catalogo') ? 'display: none !important;' : ''}">Catálogo</a>
        <a href="#planos" data-nav-section="planos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('planos') ? 'display: none !important;' : ''}">Planos</a>
        <a href="#cases" data-nav-section="cases" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('cases') ? 'display: none !important;' : ''}">Casos</a>
        <a href="#como-funciona" data-nav-section="como-funciona" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('como-funciona') ? 'display: none !important;' : ''}">Como Funciona</a>
        <a href="#sobre" data-nav-section="sobre" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('sobre') ? 'display: none !important;' : ''}">Sobre</a>
        <a href="#galeria" data-nav-section="galeria" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('galeria') ? 'display: none !important;' : ''}">Galeria</a>
        <a href="#depoimentos" data-nav-section="depoimentos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('depoimentos') ? 'display: none !important;' : ''}">Depoimentos</a>
        <a href="#faq" data-nav-section="faq" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('faq') ? 'display: none !important;' : ''}">Dúvidas</a>
        <a href="#simulador" data-nav-section="simulador" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('simulador') ? 'display: none !important;' : ''}">Simulador</a>
        <a href="#artigos" data-nav-section="artigos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('artigos') ? 'display: none !important;' : ''}">Orientações</a>
        <a href="#contato" data-nav-section="contato" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('contato') ? 'display: none !important;' : ''}">Contato</a>
      </div>
      <div class="pt-2">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="w-full text-center px-5 py-3 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2" style="background-color: ${primary}">
          <span>⚡</span> Falar pelo WhatsApp
        </a>
      </div>
    </div>
  </header>


  <!-- ==================== HERO SECTION ==================== -->
  ${isModelA ? `
  <!-- HERO MODELO A (SERENE HAVEN / STITCH PSICOLOGIA) -->
  <section id="inicio" data-section-id="inicio" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}" class="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden border-b border-[#e8e2d9]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <!-- Left Column (Content) -->
        <div class="lg:col-span-7 text-left space-y-6">
          <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#f3efea] border border-[#e8e2d9] text-[#2e4f43]">
            <span class="w-2 h-2 rounded-full bg-[#2e4f43] animate-pulse"></span>
            ${data.attendanceType === 'online' ? 'Atendimento Online Nacional' : data.attendanceType === 'presencial' ? 'Atendimento Presencial' : 'Atendimento Online & Presencial'} • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#17382d] leading-[1.14]" style="font-family: ${fontHeading}">
            ${data.companyName || specialty || 'Cuidado, escuta atenta e transformação humana'}
          </h1>
          
          <p class="text-base sm:text-lg text-[#414845] leading-relaxed max-w-xl font-normal">
            ${data.professionalSummary || 'Um espaço seguro e acolhedor para o seu desenvolvimento, com rigor ético, método humanizado e total confidencialidade.'}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-full shadow-lg shadow-[#2e4f43]/15 transition-all hover:opacity-95 hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center gap-2" style="background-color: ${primary}">
              <span>💬</span> Agendar Primeira Sessão
            </a>
            <a href="#sobre" class="px-7 py-4 bg-transparent border border-[#2e4f43]/30 text-[#2e4f43] font-bold rounded-full hover:bg-[#f3efea] transition text-center">
              Conhecer Abordagem
            </a>
          </div>

          <!-- Micro Credenciais do Stitch -->
          <div class="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#5f6864] font-medium">
            <span class="flex items-center gap-1.5"><span class="text-[#c88770]">✦</span> ${councilBadge}</span>
            <span class="flex items-center gap-1.5"><span class="text-[#c88770]">✦</span> Sigilo Ético Rigoroso</span>
            <span class="flex items-center gap-1.5"><span class="text-[#c88770]">✦</span> Horários Flexíveis</span>
          </div>
        </div>

        <!-- Right Column (Stitch Organic Card Image) -->
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl overflow-hidden shadow-xl border border-[#e8e2d9] aspect-[4/5] bg-[#f3efea] group">
            <img src="${heroImage}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-[#17382d]/80 via-transparent to-transparent"></div>
            
            <!-- Floating Overlay Card -->
            <div class="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg">
              <span class="text-xs font-bold text-[#c88770] uppercase tracking-wider block">${profession}</span>
              <span class="text-base font-bold text-[#17382d] block mt-0.5" style="font-family: ${fontHeading}">${name}</span>
              <span class="text-xs text-[#5f6864] block mt-1">${specialty}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
  ` : isModelB ? `
  <!-- HERO MODELO B (MIDNIGHT LUMINESCENCE / DARK STITCH) -->
  <section id="inicio" data-section-id="inicio" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}" class="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800 bg-[#090d16]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm bg-slate-900/80 border-slate-700 text-sky-400">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ${data.attendanceType === 'online' ? 'Atendimento 100% Online' : 'Atendimento Especializado'} • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]" style="font-family: ${fontHeading}">
            ${data.companyName || specialty || 'Soluções Estratégicas de Alto Nível'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            ${data.professionalSummary || 'Atuação dedicada com rigor técnico, tecnologia de ponta e foco total nos seus melhores resultados.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-xl shadow-xl shadow-sky-500/10 transition-all hover:scale-105 text-center flex items-center justify-center gap-2" style="background-color: ${accent}">
              <span>⚡</span> Falar no WhatsApp
            </a>
            <a href="#contato" class="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition text-center">
              Enviar Mensagem
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/5] group bg-slate-950">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-5 p-4 rounded-xl backdrop-blur-md bg-slate-900/90 border border-slate-700">
              <span class="text-xs font-bold text-sky-400 block">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}</span>
              <span class="text-base font-bold text-white block mt-0.5">${name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : isModelC ? `
  <!-- HERO MODELO C (ATELIER EDITORIAL / NOBREZA CLÁSSICA) -->
  <section id="inicio" data-section-id="inicio" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}" class="py-20 md:py-32 border-b border-stone-300 bg-[#faf7f2]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <div class="border-l-2 pl-6 border-stone-800">
            <span class="text-xs uppercase tracking-widest font-bold text-stone-500 block mb-2">${profession} • ${data.city || 'São Paulo'}</span>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.12]" style="font-family: ${fontHeading}">
              ${data.companyName || specialty || 'Excelência e Rigor Profissional'}
            </h1>
          </div>
          
          <p class="text-base sm:text-lg text-stone-700 leading-relaxed font-serif">
            ${data.professionalSummary || 'Trabalho pautado na ética irrestrita, precisão técnica e compromisso individualizado em cada etapa.'}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold text-center tracking-widest text-xs uppercase shadow-sm transition hover:opacity-90" style="background-color: ${primary}">
              AGENDAR CONSULTA
            </a>
            <a href="#contato" class="px-8 py-4 border border-stone-400 text-stone-900 font-bold text-center tracking-widest text-xs uppercase hover:bg-stone-200 transition">
              ENVIAR MENSAGEM
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="p-3 bg-white border border-stone-300 shadow-md">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-80 lg:h-96 object-cover grayscale contrast-125">
            <p class="text-[11px] font-serif text-stone-500 mt-2 text-center uppercase tracking-widest">${specialty} • ${councilBadge}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  ` : `
  <!-- HERO MODELO D (MODERN BENTO PULSE / ALTA CONVERSÃO) -->
  <section id="inicio" data-section-id="inicio" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}" class="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Disponível para Atendimento • ${data.city || 'São Paulo'} (${data.attendanceType === 'online' ? '100% Online' : 'Presencial'})
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]" style="font-family: ${fontHeading}">
            ${data.companyName || specialty || 'Soluções Estratégicas com Agilidade e Foco'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            ${data.professionalSummary || 'Atendimento ágil, foco em resultados concretos e segurança técnica em cada detalhe.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 text-center flex items-center justify-center gap-2" style="background-color: ${accent}">
              <span>⚡</span> Falar no WhatsApp Agora
            </a>
            <a href="#contato" class="px-8 py-4 bg-white border-2 border-slate-300 text-slate-800 font-bold rounded-2xl hover:border-slate-900 transition text-center">
              Agendar Reunião
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group bg-slate-100">
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
  `}

  <!-- ==================== PARCEIROS, CLIENTES & CERTIFICAÇÕES ==================== -->
  <section id="parceiros" data-section-id="parceiros" style="${!isSectionActive('parceiros') ? 'display: none !important;' : ''}" class="py-12 border-b ${
    isModelA ? 'bg-white border-[#e8e2d9]' : 
    isModelB ? 'bg-slate-950 border-slate-800' : 
    isModelC ? 'bg-white border-stone-300' : 
    'bg-slate-50 border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-6">
        <span class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Confiança, Parcerias & Prova Social
        </span>
      </div>
      <div class="partners-logos-grid flex flex-wrap items-center justify-center gap-8 md:gap-14">
        ${partnersList.map((item) => `
          <div class="flex items-center gap-3 p-3 rounded-2xl transition hover:opacity-100 ${isModelB ? 'opacity-70 text-slate-300' : 'opacity-80 text-slate-700'}">
            <img src="${item.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'}" alt="${item.name}" class="w-8 h-8 rounded-lg object-cover ${isModelB ? 'grayscale invert' : 'grayscale'}">
            <div>
              <span class="text-xs font-bold block leading-tight">${item.name}</span>
              <span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">${item.type || 'Parceiro'}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ==================== ÁREAS DE ATUAÇÃO / SERVIÇOS ==================== -->
  <section id="servicos" data-section-id="servicos" style="${!isSectionActive('servicos') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/60 border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#0f172a] border-b border-slate-800' : 
    isModelC ? 'bg-[#f0ece1] border-b border-stone-300' : 
    'bg-white border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          ${isModelA ? 'Especialidades Clínicas & Serviços' : 'Áreas de Atuação'}
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Como Posso Ajudar Você
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Soluções e acompanhamento estruturado para o seu momento e necessidades.
        </p>
      </div>

      <div class="services-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${servicesList.map((s, index) => `
          <div class="${
            isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl p-8 hover:shadow-lg transition-all border' : 
            isModelB ? 'bg-slate-900/80 border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all border' : 
            isModelC ? 'bg-white border-stone-300 p-8 rounded-none border shadow-sm' : 
            'bg-slate-50 border-slate-200 rounded-3xl p-8 hover:bg-slate-100 transition-all border'
          }">
            <div class="w-12 h-12 ${isModelC ? 'rounded-none' : isModelA ? 'rounded-2xl' : 'rounded-xl'} text-white flex items-center justify-center font-bold mb-6 text-xl shadow-sm" style="background-color: ${primary}">
              ${index === 0 ? '✦' : index === 1 ? '✧' : '❖'}
            </div>
            <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'} mb-3" style="font-family: ${fontHeading}">
              ${s.title}
            </h3>
            <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed mb-6">
              ${s.shortDescription}
            </p>
            <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, gostaria de saber mais sobre ' + s.title)}" target="_blank" class="text-sm font-bold inline-flex items-center gap-1 hover:underline" style="color: ${isModelB ? secondary : primary}">
              ${s.ctaText || 'Saber mais'} <span>→</span>
            </a>
          </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ==================== CATÁLOGO DE PRODUTOS (ATÉ 50 ITENS - INICIA DESLIGADO) ==================== -->
  <section id="catalogo" data-section-id="catalogo" style="${!isSectionActive('catalogo') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-slate-50 border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          ${isModelA ? 'Catálogo & Linha de Produtos' : 'Catálogo de Produtos'}
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Produtos & Materiais Exclusivos
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Conheça nossos produtos selecionados e faça o pedido direto pelo WhatsApp.
        </p>
      </div>

      <div class="catalog-products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${productsList.map((p) => {
          const img = p.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
          const hasPrice = p.price && p.price.trim().length > 0;
          return `
          <div class="${
            isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl p-6 hover:shadow-xl transition-all border flex flex-col justify-between group shadow-sm' : 
            isModelB ? 'bg-slate-900/80 border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:shadow-2xl transition-all border flex flex-col justify-between group shadow-sm' : 
            isModelC ? 'bg-white border-stone-300 p-6 rounded-none border shadow-sm flex flex-col justify-between group' : 
            'bg-white border-slate-200 rounded-3xl p-6 hover:shadow-lg transition-all border flex flex-col justify-between group shadow-sm'
          }">
            <div class="space-y-4">
              <div class="aspect-[4/3] w-full ${isModelC ? 'rounded-none' : isModelA ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden bg-slate-100 border ${isModelB ? 'border-slate-800' : 'border-slate-200'} relative">
                <img src="${img}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                ${hasPrice ? `
                  <div class="absolute top-3 right-3 px-3 py-1 ${isModelC ? 'rounded-none font-serif' : 'rounded-full'} text-xs font-bold shadow-md ${
                    isModelB ? 'bg-slate-950/90 text-sky-300 border border-slate-700' :
                    isModelA ? 'bg-[#2e4f43] text-white' :
                    isModelC ? 'bg-stone-900 text-white' :
                    'bg-slate-900 text-white'
                  }">
                    ${p.price}
                  </div>
                ` : ''}
              </div>
              <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
                ${p.title}
              </h3>
              <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">
                ${p.description}
              </p>
            </div>
            <div class="pt-6 mt-6 border-t ${isModelB ? 'border-slate-800' : 'border-stone-100'} flex items-center justify-between gap-3">
              ${hasPrice ? `
                <div class="text-base font-extrabold ${isModelB ? 'text-sky-300' : 'text-slate-900'} font-mono">
                  ${p.price}
                </div>
              ` : `
                <span class="text-xs font-semibold text-slate-500 italic">Sob Consulta</span>
              `}
              <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, tenho interesse no produto ' + p.title + (hasPrice ? ' (' + p.price + ')' : '') + '. Poderia me dar mais informações?')}" target="_blank" class="px-4 py-2 text-white text-xs font-bold ${
                isModelC ? 'rounded-none uppercase tracking-wider' : isModelA ? 'rounded-full' : 'rounded-xl'
              } transition-all hover:opacity-90 inline-flex items-center gap-1.5 shadow-sm" style="background-color: ${primary}">
                <span>💬</span> ${p.ctaText || 'Pedir no WhatsApp'}
              </a>
            </div>
          </div>
          `;
        }).join('')}
      </div>

    </div>
  </section>

  <!-- ==================== TABELA DE PLANOS & PREÇOS ==================== -->
  <section id="planos" data-section-id="planos" style="${!isSectionActive('planos') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/40 border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#f5f2eb] border-b border-stone-300' : 
    'bg-white border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Investimento & Pacotes
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Planos Claros e Sob Medida
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Escolha o formato ideal para as suas necessidades com total transparência e acompanhamento dedicado.
        </p>
      </div>

      <div class="plans-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        ${plansList.map((p) => {
          const isHighlight = p.highlight;
          const features = Array.isArray(p.features) ? p.features : [];
          return `
          <div class="relative flex flex-col justify-between p-8 ${
            isModelA ? (isHighlight ? 'bg-white border-2 border-[#2e4f43] rounded-3xl shadow-xl' : 'bg-white/80 border border-[#e8e2d9] rounded-3xl') :
            isModelB ? (isHighlight ? 'bg-slate-900/90 border-2 border-sky-500 rounded-2xl shadow-2xl' : 'bg-slate-900/50 border border-slate-800 rounded-2xl') :
            isModelC ? (isHighlight ? 'bg-white border-2 border-stone-900 rounded-none shadow-md' : 'bg-white border border-stone-300 rounded-none') :
            (isHighlight ? 'bg-white border-2 border-slate-900 rounded-3xl shadow-xl' : 'bg-slate-50 border border-slate-200 rounded-3xl')
          } transition-all">
            ${p.badge ? `
              <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ${
                isHighlight ? (isModelB ? 'bg-sky-500 text-slate-950' : isModelA ? 'bg-[#2e4f43] text-white' : 'bg-slate-900 text-white') : 'bg-slate-200 text-slate-700'
              }">
                ${p.badge}
              </div>
            ` : ''}
            <div>
              <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'} mb-2" style="font-family: ${fontHeading}">
                ${p.title}
              </h3>
              <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-xs leading-relaxed mb-6">
                ${p.description || ''}
              </p>
              <div class="mb-6 flex items-baseline gap-1">
                <span class="text-3xl font-extrabold ${isModelB ? 'text-sky-300' : 'text-slate-900'} font-mono">${p.price}</span>
                ${p.period ? `<span class="text-xs text-slate-500">/${p.period}</span>` : ''}
              </div>
              <ul class="space-y-3 mb-8 text-xs ${isModelB ? 'text-slate-300' : 'text-stone-700'}">
                ${features.map(f => `
                  <li class="flex items-center gap-2">
                    <span class="text-emerald-500 font-bold">✓</span>
                    <span>${f}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, tenho interesse no plano ' + p.title + ' (' + p.price + '). Como podemos prosseguir?')}" target="_blank" class="w-full text-center py-3.5 text-xs font-bold text-white transition hover:opacity-90 ${
              isModelC ? 'rounded-none uppercase tracking-wider' : isModelA ? 'rounded-full' : 'rounded-xl'
            } shadow-sm" style="background-color: ${primary}">
              ${p.ctaText || 'Contratar Plano'}
            </a>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- ==================== CASOS DE SUCESSO / PORTFÓLIO ==================== -->
  <section id="cases" data-section-id="cases" style="${!isSectionActive('cases') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#0b101d] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-slate-50 border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Resultados Reais & Casos
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Casos de Sucesso Comprovados
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Conheça projetos e atendimentos que transformaram a realidade dos nossos clientes.
        </p>
      </div>

      <div class="cases-cards-grid grid grid-cols-1 md:grid-cols-2 gap-8">
        ${casesList.map((c) => {
          const img = c.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
          return `
          <div class="p-6 md:p-8 ${
            isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl shadow-sm' : 
            isModelB ? 'bg-slate-900/80 border-slate-800 rounded-2xl shadow-sm' : 
            isModelC ? 'bg-white border-stone-300 rounded-none shadow-sm' : 
            'bg-white border-slate-200 rounded-3xl shadow-sm'
          } border flex flex-col justify-between group hover:shadow-xl transition-all">
            <div class="space-y-4">
              <div class="aspect-[16/9] w-full ${isModelC ? 'rounded-none' : isModelA ? 'rounded-2xl' : 'rounded-xl'} overflow-hidden relative bg-slate-200">
                <img src="${img}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                ${c.resultBadge ? `
                  <div class="absolute bottom-3 left-3 px-3 py-1 bg-slate-950/90 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">
                    ${c.resultBadge}
                  </div>
                ` : ''}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] uppercase tracking-wider font-bold ${isModelB ? 'text-sky-400' : 'text-stone-500'}">${c.category || 'Atendimento'}</span>
              </div>
              <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
                ${c.title}
              </h3>
              <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">
                ${c.description}
              </p>
            </div>
            <div class="pt-6 mt-6 border-t ${isModelB ? 'border-slate-800' : 'border-stone-100'} flex items-center justify-between">
              <span class="text-xs font-semibold text-emerald-600">✓ Caso Validado</span>
              <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, vi o caso de sucesso "' + c.title + '" e gostaria de saber se é possível aplicar algo semelhante no meu caso.')}" target="_blank" class="text-xs font-bold inline-flex items-center gap-1 hover:underline" style="color: ${primary}">
                ${c.ctaText || 'Conhecer Mais'} →
              </a>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- ==================== COMO FUNCIONA ==================== -->
  <section id="como-funciona" data-section-id="como-funciona" style="${!isSectionActive('como-funciona') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-slate-50 border-b border-slate-200'
  }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-2">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">Etapas de Acolhimento</h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Como Funciona o Atendimento
        </p>
      </div>

      <div class="steps-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Step 1 -->
        <div class="p-8 ${isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : isModelB ? 'bg-slate-900 border-slate-800 rounded-2xl' : isModelC ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} border text-center space-y-3">
          <div class="w-12 h-12 mx-auto ${isModelA ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center text-sm shadow-sm" style="background-color: ${primary}">1</div>
          <h3 class="font-bold text-lg ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">Primeiro Contato</h3>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">Você entra em contato via WhatsApp ou formulário informando sua necessidade e preferências de horário.</p>
        </div>

        <!-- Step 2 -->
        <div class="p-8 ${isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : isModelB ? 'bg-slate-900 border-slate-800 rounded-2xl' : isModelC ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} border text-center space-y-3">
          <div class="w-12 h-12 mx-auto ${isModelA ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center text-sm shadow-sm" style="background-color: ${primary}">2</div>
          <h3 class="font-bold text-lg ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">Sessão & Alinhamento</h3>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">Realizamos o diagnóstico aprofundado para compreender sua demanda e definir o plano de trabalho ideal.</p>
        </div>

        <!-- Step 3 -->
        <div class="p-8 ${isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : isModelB ? 'bg-slate-900 border-slate-800 rounded-2xl' : isModelC ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} border text-center space-y-3">
          <div class="w-12 h-12 mx-auto ${isModelA ? 'rounded-2xl' : 'rounded-full'} text-white font-bold flex items-center justify-center text-sm shadow-sm" style="background-color: ${primary}">3</div>
          <h3 class="font-bold text-lg ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">Evolução Contínua</h3>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">Desenvolvimento focado e acompanhamento constante para consolidação de resultados consistentes.</p>
        </div>

      </div>
    </div>
  </section>

  <!-- ==================== SOBRE O PROFISSIONAL ==================== -->
  <section id="sobre" data-section-id="sobre" style="${!isSectionActive('sobre') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/50 border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#0f172a] border-b border-slate-800' : 
    isModelC ? 'bg-[#f0ece1] border-b border-stone-300' : 
    'bg-white border-b border-slate-200'
  }">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${
        isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : 
        isModelB ? 'bg-slate-900/90 border-slate-800 rounded-2xl' : 
        isModelC ? 'bg-white border-stone-300 rounded-none' : 
        'bg-slate-50 border-slate-200 rounded-3xl'
      } p-8 sm:p-12 border shadow-sm">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div class="lg:col-span-4">
            <div class="${isModelC ? 'rounded-none' : isModelA ? 'rounded-3xl' : 'rounded-2xl'} overflow-hidden border ${isModelB ? 'border-slate-800' : 'border-stone-200'} aspect-[3/4] shadow-md">
              <img src="${aboutImage}" alt="${name}" class="w-full h-full object-cover">
            </div>
          </div>

          <div class="lg:col-span-8 space-y-4">
            <span class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">Apresentação Profissional</span>
            <h3 class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">${name}</h3>
            <p class="text-xs font-semibold ${isModelB ? 'text-slate-400' : 'text-stone-500'}">${profession} • ${councilBadge} • ${data.city || 'São Paulo'}/${data.state || 'SP'}</p>
            
            <p class="${isModelB ? 'text-slate-300' : 'text-stone-700'} leading-relaxed text-sm sm:text-base pt-2">
              ${data.bio || data.professionalSummary || 'Dedicado a oferecer um atendimento de excelência com rigor técnico, acolhimento e compromisso ético irrestrito para cada pessoa atendida.'}
            </p>

            <div class="pt-6 border-t ${isModelB ? 'border-slate-800' : 'border-stone-100'} flex flex-wrap gap-4 text-xs font-semibold ${isModelB ? 'text-slate-300' : 'text-stone-600'}">
              <span class="px-3.5 py-2 ${isModelB ? 'bg-slate-800' : 'bg-stone-100'} rounded-xl">🕒 ${data.businessHours || 'Segunda a Sexta, das 09h às 18h'}</span>
              <span class="px-3.5 py-2 ${isModelB ? 'bg-slate-800' : 'bg-stone-100'} rounded-xl">📍 ${data.attendanceType === 'online' ? '100% Online' : data.attendanceType === 'presencial' ? 'Presencial' : 'Híbrido (Online/Presencial)'}</span>
              <span class="px-3.5 py-2 ${isModelB ? 'bg-slate-800' : 'bg-stone-100'} rounded-xl">✉️ ${data.publicEmail || 'Atendimento Direto'}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- ==================== GALERIA DE FOTOS ==================== -->
  <section id="galeria" data-section-id="galeria" style="${!isSectionActive('galeria') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-slate-50 border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Galeria & Estrutura
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Registros do Nosso Espaço e Atuação
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Conheça nosso ambiente e padrão de excelência preparado para o seu atendimento.
        </p>
      </div>

      <div class="gallery-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${galleryList.map((item, idx) => `
          <div class="group relative overflow-hidden ${
            isModelA ? 'rounded-3xl border border-[#e8e2d9] shadow-sm bg-white' : 
            isModelB ? 'rounded-2xl border border-slate-800 shadow-xl bg-slate-900/80' : 
            isModelC ? 'rounded-none border border-stone-300 shadow-sm bg-white' : 
            'rounded-3xl border border-slate-200 shadow-sm bg-white'
          } cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl" onclick="openGalleryLightbox('${item.url}', '${encodeURIComponent(item.title || 'Foto ' + (idx + 1))}')">
            <div class="aspect-[4/3] w-full overflow-hidden bg-slate-200">
              <img src="${item.url}" alt="${item.title || 'Foto ' + (idx + 1)}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <div class="p-4 ${isModelB ? 'bg-slate-900/90' : 'bg-white'} border-t ${isModelB ? 'border-slate-800' : 'border-stone-100'}">
              <h4 class="font-bold text-sm ${isModelB ? 'text-white' : 'text-slate-900'} truncate">${item.title || 'Registro de Atendimento'}</h4>
              ${item.caption ? `<p class="text-xs ${isModelB ? 'text-slate-400' : 'text-slate-500'} mt-0.5 truncate">${item.caption}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ==================== DEPOIMENTOS DE CLIENTES ==================== -->
  <section id="depoimentos" data-section-id="depoimentos" style="${!isSectionActive('depoimentos') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/60 border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#0f172a] border-b border-slate-800' : 
    isModelC ? 'bg-[#f0ece1] border-b border-stone-300' : 
    'bg-white border-b border-slate-200'
  }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Avaliações & Experiências
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          O Que Dizem Quem Já Confiou
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Histórias reais de transformação, confiança e resultados conquistados.
        </p>
      </div>

      <div class="testimonials-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${testimonialsList.map((t) => `
          <div class="p-8 ${
            isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl shadow-sm' : 
            isModelB ? 'bg-slate-900/80 border-slate-800 rounded-2xl shadow-xl' : 
            isModelC ? 'bg-white border-stone-300 rounded-none shadow-sm' : 
            'bg-slate-50 border-slate-200 rounded-3xl shadow-sm'
          } border flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
            <div class="space-y-4">
              <!-- Estrelas de Avaliação -->
              <div class="flex items-center space-x-1 text-amber-400 text-base">
                ${'★'.repeat(t.rating || 5)}${'☆'.repeat(5 - (t.rating || 5))}
              </div>
              <p class="${isModelB ? 'text-slate-300' : 'text-stone-700'} text-sm leading-relaxed italic">
                "${t.content}"
              </p>
            </div>
            
            <!-- Perfil do Cliente -->
            <div class="flex items-center space-x-4 pt-4 border-t ${isModelB ? 'border-slate-800' : 'border-stone-100'}">
              <img src="${t.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="${t.clientName}" class="w-12 h-12 ${isModelC ? 'rounded-none' : 'rounded-full'} object-cover border-2 ${isModelB ? 'border-sky-400/40' : 'border-emerald-700/20'} shrink-0">
              <div class="min-w-0">
                <h4 class="font-bold text-sm ${isModelB ? 'text-white' : 'text-slate-900'} truncate">${t.clientName}</h4>
                <p class="text-xs ${isModelB ? 'text-slate-400' : 'text-slate-500'} truncate">${t.role || 'Cliente Atendido'}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  </section>

  <!-- ==================== CENTRAL DE DÚVIDAS / FAQ ==================== -->
  <section id="faq" data-section-id="faq" style="${!isSectionActive('faq') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/50 border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#f5f2eb] border-b border-stone-300' : 
    'bg-slate-50 border-b border-slate-200'
  }">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">
          Respostas Rápidas
        </h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Perguntas Frequentes
        </p>
        <p class="text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'}">
          Tire suas dúvidas sobre consultas, formato de atendimento, horários e formas de pagamento.
        </p>
      </div>

      <div class="faq-accordion-container space-y-4">
        ${faqList.map((item) => `
          <details class="group ${
            isModelA ? 'bg-white border-[#e8e2d9] rounded-2xl' : 
            isModelB ? 'bg-slate-900/90 border-slate-800 rounded-xl' : 
            isModelC ? 'bg-white border-stone-300 rounded-none' : 
            'bg-white border-slate-200 rounded-2xl'
          } border p-6 transition-all duration-300 open:shadow-md cursor-pointer list-none">
            <summary class="flex justify-between items-center font-bold text-base ${isModelB ? 'text-white' : 'text-slate-900'} list-none select-none">
              <span>${item.question}</span>
              <span class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 text-xs font-bold transition-transform duration-300 group-open:rotate-180 ${
                isModelB ? 'bg-slate-800 text-sky-400' : 'bg-slate-100 text-slate-700'
              }">▼</span>
            </summary>
            <p class="mt-4 text-sm ${isModelB ? 'text-slate-300' : 'text-stone-600'} leading-relaxed pt-2 border-t ${isModelB ? 'border-slate-800' : 'border-slate-100'}">
              ${item.answer}
            </p>
          </details>
        `).join('')}
      </div>

      <div class="mt-12 text-center">
        <p class="text-xs ${isModelB ? 'text-slate-400' : 'text-slate-500'} mb-3">Ainda tem alguma dúvida específica?</p>
        <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, tenho uma dúvida que não encontrei no site. Poderia me ajudar?')}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-sm hover:opacity-90 transition" style="background-color: ${primary}">
          <span>💬</span> Conversar no WhatsApp
        </a>
      </div>
    </div>
  </section>

  <!-- ==================== SIMULADOR DE ATENDIMENTO ==================== -->
  <section id="simulador" data-section-id="simulador" style="${!isSectionActive('simulador') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-slate-100 border-b border-slate-200'
  }">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="simulator-card ${
        isModelA ? 'bg-white border-2 border-[#2e4f43]/20 rounded-3xl shadow-xl' : 
        isModelB ? 'bg-slate-900 border-2 border-sky-500/30 rounded-2xl shadow-2xl' : 
        isModelC ? 'bg-white border-2 border-stone-900 rounded-none shadow-md' : 
        'bg-white border-2 border-slate-900 rounded-3xl shadow-xl'
      } p-8 sm:p-12 space-y-8">
        
        <div class="text-center space-y-2">
          <span class="px-3 py-1 rounded-full text-xs font-bold ${isModelB ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-emerald-100 text-emerald-800'}">
            ⚡ Simulador Inteligente
          </span>
          <h3 id="simTitleDisplay" class="text-2xl sm:text-3xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
            ${simulatorConfig.title || 'Simulador de Atendimento Personalizado'}
          </h3>
          <p id="simSubDisplay" class="text-xs sm:text-sm ${isModelB ? 'text-slate-400' : 'text-stone-600'} max-w-lg mx-auto">
            ${simulatorConfig.subtitle || 'Escolha suas preferências abaixo e envie uma mensagem pré-formatada no WhatsApp com 1 clique.'}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <!-- Passo 1 -->
          <div class="space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider ${isModelB ? 'text-sky-300' : 'text-slate-700'}">
              1. Tipo de Demanda
            </label>
            <select id="simOptService" class="w-full px-3.5 py-3 rounded-xl border text-xs font-semibold ${isModelB ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}">
              <option value="Primeira Consulta / Avaliação">Primeira Consulta / Avaliação</option>
              <option value="Acompanhamento Contínuo">Acompanhamento Contínuo</option>
              <option value="Demanda Urgente / Pontual">Demanda Urgente / Pontual</option>
              <option value="Assessoria Corporativa">Assessoria Corporativa</option>
            </select>
          </div>

          <!-- Passo 2 -->
          <div class="space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider ${isModelB ? 'text-sky-300' : 'text-slate-700'}">
              2. Formato
            </label>
            <select id="simOptFormat" class="w-full px-3.5 py-3 rounded-xl border text-xs font-semibold ${isModelB ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}">
              <option value="Atendimento Online (Vídeo)">Atendimento Online (Vídeo)</option>
              <option value="Atendimento Presencial">Atendimento Presencial</option>
              <option value="Híbrido / A Definir">Híbrido / A Definir</option>
            </select>
          </div>

          <!-- Passo 3 -->
          <div class="space-y-2">
            <label class="block text-xs font-bold uppercase tracking-wider ${isModelB ? 'text-sky-300' : 'text-slate-700'}">
              3. Urgência
            </label>
            <select id="simOptUrgency" class="w-full px-3.5 py-3 rounded-xl border text-xs font-semibold ${isModelB ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}">
              <option value="Esta Semana (Urgente)">Esta Semana (Urgente)</option>
              <option value="Próximas 2 Semanas">Próximas 2 Semanas</option>
              <option value="Apenas Tirar Dúvidas">Apenas Tirar Dúvidas</option>
            </select>
          </div>
        </div>

        <div class="pt-4 text-center">
          <button type="button" onclick="sendSimulatorWhatsApp('${whatsappDigits}')" class="px-8 py-4 rounded-xl text-white font-bold text-sm shadow-xl hover:opacity-95 transition-all inline-flex items-center gap-2" style="background-color: ${primary}">
            <span>💬</span> Enviar Solicitação no WhatsApp com 1 Clique
          </button>
        </div>

      </div>
    </div>
  </section>

  <!-- ==================== ARTIGOS E ORIENTAÇÕES ==================== -->
  <section id="artigos" data-section-id="artigos" style="${!isSectionActive('artigos') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#fbf9f6] border-b border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16] border-b border-slate-800' : 
    isModelC ? 'bg-[#faf7f2] border-b border-stone-300' : 
    'bg-white border-b border-slate-200'
  }">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-2">
        <h2 class="text-xs uppercase tracking-widest font-bold ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">Conteúdo & Psicoeducação</h2>
        <p class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
          Artigos & Orientações
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="p-8 ${isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : isModelB ? 'bg-slate-900 border-slate-800 rounded-2xl' : isModelC ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">Guia Prático</span>
          <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
            Como Identificar o Momento Certo para Iniciar um Atendimento
          </h3>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">
            Entenda os principais sinais, benefícios do acompanhamento precoce e o impacto positivo na qualidade de vida e tomada de decisão.
          </p>
          <div class="text-xs ${isModelB ? 'text-slate-500' : 'text-stone-400'} pt-2">Leitura: 4 min • Por ${name}</div>
        </div>

        <div class="p-8 ${isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : isModelB ? 'bg-slate-900 border-slate-800 rounded-2xl' : isModelC ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider ${isModelA ? 'text-[#c88770]' : isModelB ? 'text-sky-400' : 'text-stone-500'}">Artigo Técnico</span>
          <h3 class="text-xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
            A Importância do Vínculo e da Abordagem Estruturada
          </h3>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm leading-relaxed">
            Como o método, a escuta acolhedora e a clareza nos objetivos constroem resultados sustentáveis ao longo do processo.
          </p>
          <div class="text-xs ${isModelB ? 'text-slate-500' : 'text-stone-400'} pt-2">Leitura: 3 min • Por ${name}</div>
        </div>

      </div>
    </div>
  </section>

  <!-- ==================== FORMULÁRIO DE CONTATO DIRETO ==================== -->
  <section id="contato" data-section-id="contato" style="${!isSectionActive('contato') ? 'display: none !important;' : ''}" class="py-20 md:py-28 ${
    isModelA ? 'bg-[#f3efea]/60' : 
    isModelB ? 'bg-[#0f172a]' : 
    isModelC ? 'bg-[#f0ece1]' : 
    'bg-slate-50'
  }">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${
        isModelA ? 'bg-white border-[#e8e2d9] rounded-3xl' : 
        isModelB ? 'bg-[#090d16] border-slate-800 rounded-2xl' : 
        isModelC ? 'bg-white border-stone-300 rounded-none' : 
        'bg-white border-slate-200 rounded-3xl'
      } p-8 sm:p-12 border shadow-sm space-y-8">
        
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-bold ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}" style="font-family: ${fontHeading}">
            Solicitar Contato / Agendamento
          </h2>
          <p class="${isModelB ? 'text-slate-400' : 'text-stone-600'} text-sm">
            Envie sua mensagem. Seus dados são confidenciais e retornaremos o mais breve possível.
          </p>
        </div>

        <form onsubmit="event.preventDefault(); alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');" class="space-y-5">
          <div>
            <label class="block text-xs font-bold ${isModelB ? 'text-slate-300' : 'text-stone-700'} uppercase mb-1">Nome Completo *</label>
            <input type="text" required placeholder="Seu nome completo" class="w-full px-4 py-3.5 ${isModelA ? 'rounded-2xl' : isModelC ? 'rounded-none' : 'rounded-xl'} border ${isModelB ? 'bg-slate-900 border-slate-700 text-white' : 'border-stone-300'} text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4f43]">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold ${isModelB ? 'text-slate-300' : 'text-stone-700'} uppercase mb-1">Telefone / WhatsApp *</label>
              <input type="tel" required placeholder="(11) 99999-9999" class="w-full px-4 py-3.5 ${isModelA ? 'rounded-2xl' : isModelC ? 'rounded-none' : 'rounded-xl'} border ${isModelB ? 'bg-slate-900 border-slate-700 text-white' : 'border-stone-300'} text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4f43]">
            </div>
            <div>
              <label class="block text-xs font-bold ${isModelB ? 'text-slate-300' : 'text-stone-700'} uppercase mb-1">E-mail *</label>
              <input type="email" required placeholder="seu@email.com" class="w-full px-4 py-3.5 ${isModelA ? 'rounded-2xl' : isModelC ? 'rounded-none' : 'rounded-xl'} border ${isModelB ? 'bg-slate-900 border-slate-700 text-white' : 'border-stone-300'} text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4f43]">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold ${isModelB ? 'text-slate-300' : 'text-stone-700'} uppercase mb-1">Motivo do Contato *</label>
            <select class="w-full px-4 py-3.5 ${isModelA ? 'rounded-2xl' : isModelC ? 'rounded-none' : 'rounded-xl'} border ${isModelB ? 'bg-slate-900 border-slate-700 text-white' : 'border-stone-300'} text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4f43]">
              <option>Agendamento de Atendimento / Consulta</option>
              <option>Dúvidas sobre Abordagem e Especialidades</option>
              <option>Informações de Horários e Formatos</option>
              <option>Outros Assuntos</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold ${isModelB ? 'text-slate-300' : 'text-stone-700'} uppercase mb-1">Mensagem / Observação</label>
            <textarea rows="4" placeholder="Descreva brevemente o que você procura..." class="w-full px-4 py-3.5 ${isModelA ? 'rounded-2xl' : isModelC ? 'rounded-none' : 'rounded-xl'} border ${isModelB ? 'bg-slate-900 border-slate-700 text-white' : 'border-stone-300'} text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4f43]"></textarea>
          </div>

          <p class="text-xs ${isModelB ? 'text-slate-500' : 'text-stone-500'}">
            Ao enviar este formulário, você concorda com o tratamento ético e confidencial dos seus dados.
          </p>

          <button type="submit" class="w-full py-4 text-white font-bold ${
            isModelC ? 'rounded-none uppercase tracking-widest text-xs' : isModelA ? 'rounded-full' : 'rounded-2xl'
          } shadow-md transition-all hover:opacity-90 active:scale-95" style="background-color: ${primary}">
            Enviar Informações com Segurança
          </button>
        </form>

      </div>
    </div>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer class="${isModelB ? 'bg-black text-white' : isModelA ? 'bg-[#17382d] text-white' : 'bg-[#1c1917] text-white'} py-16 border-t border-black/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <p class="font-bold text-lg font-serif" style="font-family: ${fontHeading}">${name}</p>
        <p class="text-xs text-stone-300 mt-1">${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}</p>
      </div>
      <div class="text-xs text-stone-400 text-center sm:text-right space-y-1">
        <p>
          © ${new Date().getFullYear()} ${name}. Todos os direitos reservados.<br>
          Tecnologia e infraestrutura por <strong>SitePronto</strong>.
        </p>
        <p>
          <a href="/master" class="text-stone-300 hover:text-white transition underline opacity-75 hover:opacity-100 text-[11px] font-semibold">
            ⚙️ Painel Administrativo (/master)
          </a>
        </p>
      </div>
    </div>
  </footer>

</div>`;
}

/**
 * Gera o documento HTML completo com suporte a troca dinâmica de template
 * (Instantânea via localStorage ou parâmetros de URL ?t=MODEL_X)
 */
export function renderCompleteSiteHtml(data: OnboardingData, spec?: DesignSpec, adminToken?: string): string {
  const name = data.professionalName || data.fullName || 'Nome do Profissional / Empresa';
  const profession = data.profession || 'Especialista / Consultoria';
  const specialty = data.mainSpecialty || 'Atendimento e Serviços Especializados';
  const defaultVariant = (spec?.variant as 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D') || 'MODEL_A';

  const primary = data.primaryColor || '#0f172a';
  const secondary = data.secondaryColor || '#2563eb';
  const accent = data.accentColor || '#10b981';
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');

  const htmlA = renderSingleTemplateHtml(data, 'MODEL_A');
  const htmlB = renderSingleTemplateHtml(data, 'MODEL_B');
  const htmlC = renderSingleTemplateHtml(data, 'MODEL_C');
  const htmlD = renderSingleTemplateHtml(data, 'MODEL_D');

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
    html {
      scroll-behavior: smooth;
    }
    /* Offset do cabeçalho sticky para as âncoras */
    section[id] {
      scroll-margin-top: 5rem;
    }
    .template-container { display: none; }
    .template-container.active { display: block; }
  </style>
</head>
<body class="bg-slate-50 antialiased min-h-screen">

  <!-- CONTAINERS DOS MODELOS DE TEMPLATE -->
  <div id="tpl-MODEL_A" class="template-container ${defaultVariant === 'MODEL_A' ? 'active' : ''}">
    ${htmlA}
  </div>

  <div id="tpl-MODEL_B" class="template-container ${defaultVariant === 'MODEL_B' ? 'active' : ''}">
    ${htmlB}
  </div>

  <div id="tpl-MODEL_C" class="template-container ${defaultVariant === 'MODEL_C' ? 'active' : ''}">
    ${htmlC}
  </div>

  <div id="tpl-MODEL_D" class="template-container ${defaultVariant === 'MODEL_D' ? 'active' : ''}">
    ${htmlD}
  </div>

  <!-- LIGHTBOX MODAL PARA GALERIA -->
  <div id="galleryLightbox" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4" onclick="closeGalleryLightbox()">
    <div class="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700" onclick="event.stopPropagation()">
      <button onclick="closeGalleryLightbox()" aria-label="Fechar" class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition text-lg font-bold">✕</button>
      <div class="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
        <img id="lightboxImg" src="" alt="" class="max-h-[75vh] w-auto object-contain">
      </div>
      <div class="p-4 bg-slate-900 text-white">
        <h4 id="lightboxTitle" class="font-bold text-base"></h4>
      </div>
    </div>
  </div>

  <!-- SCRIPT DE NAVEGAÇÃO SUAVE, MODULARIDADE E TROCA DE TEMPLATE -->
  <script>
    // 1. Inicializa o template ativo
    (function() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTemplate = urlParams.get('t') || urlParams.get('template');
        let storedTemplate = null;
        try {
          storedTemplate = localStorage.getItem('site_selected_template');
        } catch (e) {}
        const activeTemplate = urlTemplate || '${defaultVariant}' || storedTemplate || 'MODEL_A';
        
        document.querySelectorAll('.template-container').forEach(function(el) {
          el.classList.remove('active');
        });
        const targetEl = document.getElementById('tpl-' + activeTemplate) || document.getElementById('tpl-MODEL_A');
        if (targetEl) {
          targetEl.classList.add('active');
        }
      } catch (err) {
        console.warn('Erro ao inicializar container de template:', err);
      }
    })();

    // 2. Manipulador do menu mobile
    function toggleMobileNav(btn) {
      const header = btn.closest('header');
      if (!header) return;
      const menu = header.querySelector('.mobile-nav-menu');
      const hamburger = btn.querySelector('.hamburger-icon');
      const close = btn.querySelector('.close-icon');
      if (menu) {
        const isHidden = menu.classList.contains('hidden');
        if (isHidden) {
          menu.classList.remove('hidden');
          if (hamburger) hamburger.classList.add('hidden');
          if (close) close.classList.remove('hidden');
        } else {
          menu.classList.add('hidden');
          if (hamburger) hamburger.classList.remove('hidden');
          if (close) close.classList.add('hidden');
        }
      }
    }

    function closeMobileNav(link) {
      const menu = link.closest('.mobile-nav-menu');
      if (menu) {
        menu.classList.add('hidden');
        const header = menu.closest('header');
        if (header) {
          const hamburger = header.querySelector('.hamburger-icon');
          const close = header.querySelector('.close-icon');
          if (hamburger) hamburger.classList.remove('hidden');
          if (close) close.classList.add('hidden');
        }
      }
    }

    // 3. Suporte robusto a clique nos links de navegação dentro de qualquer container
    document.addEventListener('click', function(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const activeContainer = document.querySelector('.template-container.active') || document;
      const targetSection = activeContainer.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Atualiza a URL hash sem saltar
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });

    // 4. Lightbox modal controls
    window.openGalleryLightbox = function(url, encodedTitle) {
      const modal = document.getElementById('galleryLightbox');
      const img = document.getElementById('lightboxImg');
      const title = document.getElementById('lightboxTitle');
      if (modal && img && title) {
        img.src = url;
        title.innerText = decodeURIComponent(encodedTitle || '');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeGalleryLightbox = function() {
      const modal = document.getElementById('galleryLightbox');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    };

    // 5. Aplicação modular de seções (ativação/desativação sincronizada com /master)
    function applySectionsConfig() {
      try {
        let raw = null;
        try { raw = localStorage.getItem('site_sections_config'); } catch (e) {}
        if (!raw) return;
        const config = JSON.parse(raw);
        const sections = ['inicio', 'comunicado', 'parceiros', 'servicos', 'catalogo', 'planos', 'cases', 'como-funciona', 'sobre', 'galeria', 'depoimentos', 'faq', 'simulador', 'artigos', 'contato'];
        const defaultOff = ['catalogo', 'faq', 'planos', 'cases', 'biolinks', 'comunicado', 'parceiros', 'simulador'];
        sections.forEach(function(sec) {
          const isVisible = defaultOff.includes(sec) ? config[sec] === true : config[sec] !== false;
          document.querySelectorAll('[data-section-id="' + sec + '"]').forEach(function(el) {
            el.style.display = isVisible ? '' : 'none';
          });
          document.querySelectorAll('[data-nav-section="' + sec + '"]').forEach(function(link) {
            link.style.display = isVisible ? '' : 'none';
          });
        });
      } catch (err) {
        console.error('Erro ao sincronizar seções modulares:', err);
      }
    }

    // 6. Hidratação dinâmica de cards (adição/remoção feita no /master)
    function applyCustomCards() {
      try {
        // A. Áreas de Atuação
        let rawServices = null;
        try { rawServices = localStorage.getItem('site_services'); } catch (e) {}
        if (rawServices) {
          const services = JSON.parse(rawServices);
          if (Array.isArray(services) && services.length > 0) {
            document.querySelectorAll('.services-cards-grid').forEach(function(grid) {
              grid.innerHTML = services.map(function(s, idx) {
                const icon = idx === 0 ? '✦' : idx === 1 ? '✧' : '❖';
                return '<div class="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all">' +
                  '<div class="w-12 h-12 rounded-2xl text-white flex items-center justify-center font-bold mb-6 text-xl shadow-sm" style="background-color: var(--primary-color, #0f172a)">' +
                    icon +
                  '</div>' +
                  '<h3 class="text-xl font-bold text-slate-900 mb-3">' + (s.title || '') + '</h3>' +
                  '<p class="text-slate-600 text-sm leading-relaxed mb-6">' + (s.shortDescription || '') + '</p>' +
                  '<a href="https://wa.me/${whatsappDigits}?text=' + encodeURIComponent('Olá, gostaria de saber mais sobre ' + (s.title || '')) + '" target="_blank" class="text-sm font-bold inline-flex items-center gap-1 hover:underline text-slate-900">' +
                    (s.ctaText || 'Saber mais') + ' <span>→</span>' +
                  '</a>' +
                '</div>';
              }).join('');
            });
          }
        }

        // B. Galeria de Fotos
        let rawGallery = null;
        try { rawGallery = localStorage.getItem('site_gallery'); } catch (e) {}
        if (rawGallery) {
          const gallery = JSON.parse(rawGallery);
          if (Array.isArray(gallery) && gallery.length > 0) {
            document.querySelectorAll('.gallery-cards-grid').forEach(function(grid) {
              grid.innerHTML = gallery.map(function(item, idx) {
                const title = item.title || ('Foto ' + (idx + 1));
                const captionHtml = item.caption ? '<p class="text-xs text-slate-500 mt-0.5 truncate">' + item.caption + '</p>' : '';
                return '<div class="group relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl" onclick="openGalleryLightbox(\'' + item.url + '\', \'' + encodeURIComponent(title) + '\')">' +
                  '<div class="aspect-[4/3] w-full overflow-hidden bg-slate-200">' +
                    '<img src="' + item.url + '" alt="' + title + '" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">' +
                  '</div>' +
                  '<div class="p-4 bg-white border-t border-slate-100">' +
                    '<h4 class="font-bold text-sm text-slate-900 truncate">' + title + '</h4>' +
                    captionHtml +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
        }

        // C. Depoimentos
        let rawTestimonials = null;
        try { rawTestimonials = localStorage.getItem('site_testimonials'); } catch (e) {}
        if (rawTestimonials) {
          const testimonials = JSON.parse(rawTestimonials);
          if (Array.isArray(testimonials) && testimonials.length > 0) {
            document.querySelectorAll('.testimonials-cards-grid').forEach(function(grid) {
              grid.innerHTML = testimonials.map(function(t) {
                const rating = t.rating || 5;
                const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
                const photo = t.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                return '<div class="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all">' +
                  '<div class="space-y-4">' +
                    '<div class="flex items-center space-x-1 text-amber-400 text-base">' +
                      stars +
                    '</div>' +
                    '<p class="text-slate-700 text-sm leading-relaxed italic">"' +
                      (t.content || '') +
                    '"</p>' +
                  '</div>' +
                  '<div class="flex items-center space-x-4 pt-4 border-t border-slate-100">' +
                    '<img src="' + photo + '" alt="' + (t.clientName || '') + '" class="w-12 h-12 rounded-full object-cover border-2 border-emerald-700/20 shrink-0">' +
                    '<div class="min-w-0">' +
                      '<h4 class="font-bold text-sm text-slate-900 truncate">' + (t.clientName || '') + '</h4>' +
                      '<p class="text-xs text-slate-500 truncate">' + (t.role || 'Cliente Atendido') + '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
        }

        // D. Catálogo de Produtos (Até 50 itens)
        let rawProducts = null;
        try { rawProducts = localStorage.getItem('site_catalog_products'); } catch (e) {}
        if (rawProducts) {
          const prods = JSON.parse(rawProducts);
          if (Array.isArray(prods)) {
            document.querySelectorAll('.catalog-products-grid').forEach(function(grid) {
              if (prods.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-12 text-slate-400 text-sm">Nenhum produto cadastrado no catálogo.</div>';
                return;
              }
              grid.innerHTML = prods.map(function(p) {
                const img = p.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
                const hasPrice = p.price && p.price.trim().length > 0;
                const priceBadge = hasPrice
                  ? '<div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-md bg-slate-900 text-white">' + p.price + '</div>'
                  : '';
                const priceDisplay = hasPrice
                  ? '<div class="text-base font-extrabold text-slate-900 font-mono">' + p.price + '</div>'
                  : '<span class="text-xs font-semibold text-slate-500 italic">Sob Consulta</span>';
                const whatsappMsg = encodeURIComponent('Olá, tenho interesse no produto ' + (p.title || '') + (hasPrice ? ' (' + p.price + ')' : '') + '. Poderia me dar mais informações?');

                return '<div class="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all border flex flex-col justify-between group shadow-sm">' +
                  '<div class="space-y-4">' +
                    '<div class="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">' +
                      '<img src="' + img + '" alt="' + (p.title || '') + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
                      priceBadge +
                    '</div>' +
                    '<h3 class="text-xl font-bold text-slate-900">' + (p.title || '') + '</h3>' +
                    '<p class="text-slate-600 text-sm leading-relaxed">' + (p.description || '') + '</p>' +
                  '</div>' +
                  '<div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">' +
                    priceDisplay +
                    '<a href="https://wa.me/${whatsappDigits}?text=' + whatsappMsg + '" target="_blank" class="px-4 py-2 text-white text-xs font-bold rounded-xl transition-all hover:opacity-90 inline-flex items-center gap-1.5 shadow-sm" style="background-color: var(--primary-color, #0f172a)">' +
                      '<span>💬</span> ' + (p.ctaText || 'Pedir no WhatsApp') +
                    '</a>' +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
        }

        // E. Central de Dúvidas / FAQ
        let rawFaq = null;
        try { rawFaq = localStorage.getItem('site_faq'); } catch (e) {}
        if (rawFaq) {
          const faqs = JSON.parse(rawFaq);
          if (Array.isArray(faqs) && faqs.length > 0) {
            document.querySelectorAll('.faq-accordion-container').forEach(function(container) {
              container.innerHTML = faqs.map(function(f) {
                return '<details class="group bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 open:shadow-md cursor-pointer list-none">' +
                  '<summary class="flex justify-between items-center font-bold text-base text-slate-900 list-none select-none">' +
                    '<span>' + (f.question || '') + '</span>' +
                    '<span class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ml-4 text-xs font-bold transition-transform duration-300 group-open:rotate-180">▼</span>' +
                  '</summary>' +
                  '<p class="mt-4 text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">' +
                    (f.answer || '') +
                  '</p>' +
                '</details>';
              }).join('');
            });
          }
        }

        // F. Planos e Preços
        let rawPlans = null;
        try { rawPlans = localStorage.getItem('site_plans'); } catch (e) {}
        if (rawPlans) {
          const plans = JSON.parse(rawPlans);
          if (Array.isArray(plans) && plans.length > 0) {
            document.querySelectorAll('.plans-cards-grid').forEach(function(grid) {
              grid.innerHTML = plans.map(function(p) {
                const isHighlight = p.highlight;
                const features = Array.isArray(p.features) ? p.features : [];
                const badgeHtml = p.badge
                  ? '<div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold ' + (isHighlight ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700') + '">' + p.badge + '</div>'
                  : '';
                const featuresHtml = features.map(function(feat) {
                  return '<li class="flex items-center gap-2"><span class="text-emerald-500 font-bold">✓</span><span>' + feat + '</span></li>';
                }).join('');
                const whatsappMsg = encodeURIComponent('Olá, tenho interesse no plano ' + (p.title || '') + ' (' + (p.price || '') + '). Como podemos prosseguir?');

                return '<div class="relative flex flex-col justify-between p-8 ' + (isHighlight ? 'bg-white border-2 border-slate-900 rounded-3xl shadow-xl' : 'bg-slate-50 border border-slate-200 rounded-3xl') + ' transition-all">' +
                  badgeHtml +
                  '<div>' +
                    '<h3 class="text-xl font-bold text-slate-900 mb-2">' + (p.title || '') + '</h3>' +
                    '<p class="text-slate-600 text-xs leading-relaxed mb-6">' + (p.description || '') + '</p>' +
                    '<div class="mb-6 flex items-baseline gap-1">' +
                      '<span class="text-3xl font-extrabold text-slate-900 font-mono">' + (p.price || '') + '</span>' +
                      (p.period ? '<span class="text-xs text-slate-500">/' + p.period + '</span>' : '') +
                    '</div>' +
                    '<ul class="space-y-3 mb-8 text-xs text-slate-700">' + featuresHtml + '</ul>' +
                  '</div>' +
                  '<a href="https://wa.me/${whatsappDigits}?text=' + whatsappMsg + '" target="_blank" class="w-full text-center py-3.5 text-xs font-bold text-white transition hover:opacity-90 rounded-xl shadow-sm" style="background-color: var(--primary-color, #0f172a)">' +
                    (p.ctaText || 'Contratar Plano') +
                  '</a>' +
                '</div>';
              }).join('');
            });
          }
        }

        // G. Casos de Sucesso
        let rawCases = null;
        try { rawCases = localStorage.getItem('site_cases'); } catch (e) {}
        if (rawCases) {
          const cases = JSON.parse(rawCases);
          if (Array.isArray(cases) && cases.length > 0) {
            document.querySelectorAll('.cases-cards-grid').forEach(function(grid) {
              grid.innerHTML = cases.map(function(c) {
                const img = c.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
                const badgeHtml = c.resultBadge
                  ? '<div class="absolute bottom-3 left-3 px-3 py-1 bg-slate-950/90 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">' + c.resultBadge + '</div>'
                  : '';
                const whatsappMsg = encodeURIComponent('Olá, vi o caso de sucesso "' + (c.title || '') + '" e gostaria de saber se é possível aplicar algo semelhante no meu caso.');

                return '<div class="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">' +
                  '<div class="space-y-4">' +
                    '<div class="aspect-[16/9] w-full rounded-2xl overflow-hidden relative bg-slate-200">' +
                      '<img src="' + img + '" alt="' + (c.title || '') + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">' +
                      badgeHtml +
                    '</div>' +
                    '<div class="flex items-center gap-2">' +
                      '<span class="text-[11px] uppercase tracking-wider font-bold text-slate-500">' + (c.category || 'Atendimento') + '</span>' +
                    '</div>' +
                    '<h3 class="text-xl font-bold text-slate-900">' + (c.title || '') + '</h3>' +
                    '<p class="text-slate-600 text-sm leading-relaxed">' + (c.description || '') + '</p>' +
                  '</div>' +
                  '<div class="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">' +
                    '<span class="text-xs font-semibold text-emerald-600">✓ Caso Validado</span>' +
                    '<a href="https://wa.me/${whatsappDigits}?text=' + whatsappMsg + '" target="_blank" class="text-xs font-bold inline-flex items-center gap-1 hover:underline text-slate-900">' +
                      (c.ctaText || 'Conhecer Mais') + ' →' +
                    '</a>' +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
        }

        // H. Parceiros e Selos
        let rawPartners = null;
        try { rawPartners = localStorage.getItem('site_partners'); } catch (e) {}
        if (rawPartners) {
          const partners = JSON.parse(rawPartners);
          if (Array.isArray(partners) && partners.length > 0) {
            document.querySelectorAll('.partners-logos-grid').forEach(function(grid) {
              grid.innerHTML = partners.map(function(item) {
                const logo = item.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                return '<div class="flex items-center gap-3 p-3 rounded-2xl transition opacity-80 hover:opacity-100 text-slate-700">' +
                  '<img src="' + logo + '" alt="' + (item.name || '') + '" class="w-8 h-8 rounded-lg object-cover grayscale">' +
                  '<div>' +
                    '<span class="text-xs font-bold block leading-tight">' + (item.name || '') + '</span>' +
                    '<span class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">' + (item.type || 'Parceiro') + '</span>' +
                  '</div>' +
                '</div>';
              }).join('');
            });
          }
        }

        // I. Barra de Avisos
        let rawAnnouncement = null;
        try { rawAnnouncement = localStorage.getItem('site_announcement'); } catch (e) {}
        if (rawAnnouncement) {
          const ann = JSON.parse(rawAnnouncement);
          if (ann && ann.text) {
            document.querySelectorAll('.announcement-text-display').forEach(function(el) {
              el.innerText = ann.text;
            });
            document.querySelectorAll('.announcement-link-display').forEach(function(el) {
              el.innerText = (ann.linkText || 'Falar no WhatsApp') + ' ↗';
              if (ann.linkUrl) el.href = ann.linkUrl;
            });
          }
        }

        // J. Simulador de Atendimento
        let rawSimulator = null;
        try { rawSimulator = localStorage.getItem('site_simulator'); } catch (e) {}
        if (rawSimulator) {
          const sim = JSON.parse(rawSimulator);
          if (sim) {
            const titleEl = document.getElementById('simTitleDisplay');
            const subEl = document.getElementById('simSubDisplay');
            if (titleEl && sim.title) titleEl.innerText = sim.title;
            if (subEl && sim.subtitle) subEl.innerText = sim.subtitle;
          }
        }
      } catch (err) {
        console.error('Erro ao hidratar cards customizados:', err);
      }
    }

    window.sendSimulatorWhatsApp = function(phoneDigits) {
      const sService = document.getElementById('simOptService');
      const sFormat = document.getElementById('simOptFormat');
      const sUrgency = document.getElementById('simOptUrgency');
      const serviceVal = sService ? sService.value : 'Atendimento Especializado';
      const formatVal = sFormat ? sFormat.value : 'Online';
      const urgencyVal = sUrgency ? sUrgency.value : 'Esta semana';
      const msg = 'Olá! Fiz uma simulação pelo site:\n' +
        '• Necessidade: ' + serviceVal + '\n' +
        '• Formato: ' + formatVal + '\n' +
        '• Urgência: ' + urgencyVal + '\n\n' +
        'Gostaria de verificar disponibilidade para agendamento.';
      const url = 'https://wa.me/' + phoneDigits + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    };

    // Executa ao inicializar
    applySectionsConfig();
    applyCustomCards();
  </script>

</body>
</html>`;
}

/**
 * Renderiza a página exclusiva e mobile-first de Bio Link (/links)
 * com visual de alto padrão inspirado em Linktree / Bento Grid.
 */
export function renderBioLinkHtml(data: OnboardingData): string {
  const name = data.professionalName || data.fullName || 'Profissional';
  const profession = data.profession || 'Especialista';
  const councilBadge = data.councilNumber 
    ? `${data.councilType || 'Registro'} ${data.councilNumber}` 
    : (data.hasProfessionalCouncil ? 'Registro Ativo' : 'Cadastro Regular');
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');

  const images = getContextualImages(profession, data.mainSpecialty, data.companyName);
  const avatarImage = data.profilePhotoUrl || images.about;

  const defaultLinks = [
    { label: '💬 Falar no WhatsApp Direto', url: `https://wa.me/${whatsappDigits}`, isHighlight: true },
    { label: '🌐 Acessar Nosso Site Completo', url: '/', isHighlight: false },
    { label: '⚖️ Conhecer Nossas Especialidades', url: '/#servicos', isHighlight: false },
    { label: '🛍️ Ver Catálogo de Produtos', url: '/#catalogo', isHighlight: false },
    { label: '💳 Tabela de Planos e Valores', url: '/#planos', isHighlight: false },
    { label: '❓ Dúvidas Frequentes', url: '/#faq', isHighlight: false },
    { label: '📍 Localização e Horários', url: '/#sobre', isHighlight: false }
  ];

  const links = (data.bioLinks && data.bioLinks.length > 0) ? data.bioLinks : defaultLinks;
  const safeJsonLinks = JSON.stringify(links).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} • Bio Links</title>
  <meta name="description" content="Acesse nossos canais de atendimento, WhatsApp e site oficial.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white min-h-screen flex flex-col items-center justify-between px-4 py-12">
  
  <main class="w-full max-w-md mx-auto space-y-6 text-center">
    
    <!-- AVATAR & HEADER -->
    <div class="space-y-4">
      <div class="relative w-24 h-24 mx-auto">
        <img src="${avatarImage}" alt="${name}" class="w-full h-full rounded-full object-cover border-4 border-slate-700 shadow-2xl">
        <span class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-950 font-bold" title="Disponível">✓</span>
      </div>

      <div class="space-y-1">
        <h1 class="text-xl sm:text-2xl font-extrabold tracking-tight text-white">${name}</h1>
        <p class="text-xs text-slate-400 font-semibold">${profession} • ${councilBadge}</p>
        <p class="text-xs text-slate-400 max-w-xs mx-auto pt-1 leading-relaxed">
          ${data.bio || data.professionalSummary || 'Atendimento com excelência, ética e compromisso.'}
        </p>
      </div>
    </div>

    <!-- BOTÕES DE LINK (HIDRATADOS COM LOCALSTORAGE) -->
    <div id="bioLinksList" class="space-y-3 pt-2">
      <!-- Renderizado via script com suporte a localStorage -->
    </div>

  </main>

  <footer class="mt-12 text-center text-[11px] text-slate-500 space-y-1">
    <p>${name} • ${profession}</p>
    <p class="text-[10px] text-slate-600">Desenvolvido com SitePronto • Shardcloud Engine</p>
  </footer>

  <script>
    (function() {
      const defaultLinks = ${safeJsonLinks};
      let links = defaultLinks;
      try {
        const stored = localStorage.getItem('site_biolinks');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) links = parsed;
        }
      } catch (e) {}

      const container = document.getElementById('bioLinksList');
      if (container) {
        container.innerHTML = links.map(function(item) {
          const isHighlight = item.isHighlight;
          const bg = isHighlight
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-900/30 border border-emerald-400/40 hover:scale-[1.02]'
            : 'bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-semibold border border-slate-800 hover:scale-[1.01]';
          return '<a href="' + (item.url || '#') + '" target="_blank" class="w-full block py-4 px-5 rounded-2xl text-sm transition-all duration-200 ' + bg + '">' +
            (item.label || 'Acessar Link') +
          '</a>';
        }).join('');
      }
    })();
  </script>
</body>
</html>`;
}
