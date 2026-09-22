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

  const isSectionActive = (sec: string): boolean => {
    if (!data.sectionsConfig) return true;
    return (data.sectionsConfig as any)[sec] !== false;
  };

  return `
<div class="template-wrapper ${
    isModelA ? 'bg-[#fbf9f6] text-[#1e2824]' : 
    isModelB ? 'bg-[#090d16] text-[#f8fafc]' : 
    isModelC ? 'bg-[#faf7f2] text-[#1c1917]' : 
    'bg-[#f8fafc] text-[#0f172a]'
  } antialiased min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900" style="font-family: ${fontBody};">

  <!-- ==================== HEADER / NAVEGAÇÃO ==================== -->
  <header class="sticky top-0 z-50 ${
    isModelA ? 'bg-[#fbf9f6]/90 border-[#e8e2d9]' : 
    isModelB ? 'bg-[#090d16]/90 border-slate-800/80' : 
    isModelC ? 'bg-[#faf7f2]/95 border-stone-300' : 
    'bg-white/90 border-slate-200/80 shadow-sm'
  } backdrop-blur-md border-b transition-all">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo / Badge -->
      <a href="#inicio" class="flex items-center space-x-3 group">
        <div class="w-11 h-11 ${isModelC ? 'rounded-none' : isModelD ? 'rounded-2xl' : 'rounded-2xl'} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 transition-transform group-hover:scale-105" style="background-color: ${primary}">
          ${name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span class="font-bold text-base sm:text-lg leading-tight block ${isModelB ? 'text-white' : isModelA || isModelC ? 'font-serif text-stone-900' : 'text-slate-900'}">${name}</span>
          <span class="text-xs font-medium block ${isModelB ? 'text-slate-400' : 'text-stone-500'}">
            ${profession}${data.hasProfessionalCouncil && data.councilNumber ? ' • ' + councilBadge : ''}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-semibold ${isModelB ? 'text-slate-300' : isModelC ? 'text-stone-700 tracking-wider text-xs uppercase' : 'text-stone-600'}">
        <a href="#inicio" data-nav-section="inicio" class="hover:opacity-80 transition py-1" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}">Início</a>
        <a href="#servicos" data-nav-section="servicos" class="hover:opacity-80 transition py-1" style="${!isSectionActive('servicos') ? 'display: none !important;' : ''}">Atuação</a>
        <a href="#como-funciona" data-nav-section="como-funciona" class="hover:opacity-80 transition py-1" style="${!isSectionActive('como-funciona') ? 'display: none !important;' : ''}">Como Funciona</a>
        <a href="#sobre" data-nav-section="sobre" class="hover:opacity-80 transition py-1" style="${!isSectionActive('sobre') ? 'display: none !important;' : ''}">Sobre</a>
        <a href="#galeria" data-nav-section="galeria" class="hover:opacity-80 transition py-1" style="${!isSectionActive('galeria') ? 'display: none !important;' : ''}">Galeria</a>
        <a href="#depoimentos" data-nav-section="depoimentos" class="hover:opacity-80 transition py-1" style="${!isSectionActive('depoimentos') ? 'display: none !important;' : ''}">Depoimentos</a>
        <a href="#artigos" data-nav-section="artigos" class="hover:opacity-80 transition py-1" style="${!isSectionActive('artigos') ? 'display: none !important;' : ''}">Orientações</a>
        <a href="#contato" data-nav-section="contato" class="hover:opacity-80 transition py-1" style="${!isSectionActive('contato') ? 'display: none !important;' : ''}">Contato</a>
      </nav>

      <!-- CTA Action & Mobile Toggle -->
      <div class="flex items-center space-x-3">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="hidden sm:inline-flex px-6 py-2.5 text-white text-sm font-bold ${
          isModelC ? 'rounded-none uppercase tracking-widest text-xs' : isModelA ? 'rounded-full' : isModelD ? 'rounded-2xl' : 'rounded-xl'
        } shadow-sm transition-all items-center hover:opacity-95 hover:shadow-md active:scale-95" style="background-color: ${primary}">
          ${isModelA ? 'Agendar Consulta' : isModelC ? 'CONSULTAR AGORA' : 'Agendar Atendimento'}
        </a>
        
        <!-- Mobile Menu Toggle -->
        <button type="button" onclick="toggleMobileNav(this)" aria-label="Abrir Menu" class="md:hidden p-2 rounded-xl border ${isModelB ? 'border-slate-800 text-slate-200 hover:bg-slate-800' : 'border-stone-200 text-stone-700 hover:bg-stone-100'} transition flex items-center justify-center">
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
    <div class="mobile-nav-menu hidden md:hidden border-t ${isModelB ? 'bg-[#090d16] border-slate-800' : isModelC ? 'bg-[#faf7f2] border-stone-300' : 'bg-white border-stone-200'} px-4 pt-3 pb-6 space-y-3 shadow-xl">
      <div class="flex flex-col space-y-2 text-sm font-semibold ${isModelB ? 'text-slate-200' : 'text-stone-800'}">
        <a href="#inicio" data-nav-section="inicio" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('inicio') ? 'display: none !important;' : ''}">Início</a>
        <a href="#servicos" data-nav-section="servicos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('servicos') ? 'display: none !important;' : ''}">Atuação</a>
        <a href="#como-funciona" data-nav-section="como-funciona" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('como-funciona') ? 'display: none !important;' : ''}">Como Funciona</a>
        <a href="#sobre" data-nav-section="sobre" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('sobre') ? 'display: none !important;' : ''}">Sobre</a>
        <a href="#galeria" data-nav-section="galeria" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('galeria') ? 'display: none !important;' : ''}">Galeria</a>
        <a href="#depoimentos" data-nav-section="depoimentos" onclick="closeMobileNav(this)" class="px-3 py-2 rounded-lg hover:bg-black/5 transition" style="${!isSectionActive('depoimentos') ? 'display: none !important;' : ''}">Depoimentos</a>
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
        const sections = ['inicio', 'servicos', 'como-funciona', 'sobre', 'galeria', 'depoimentos', 'artigos', 'contato'];
        sections.forEach(function(sec) {
          const isVisible = config[sec] !== false;
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
      } catch (err) {
        console.error('Erro ao hidratar cards customizados:', err);
      }
    }

    // Executa ao inicializar
    applySectionsConfig();
    applyCustomCards();
  </script>

</body>
</html>`;
}
