import type { OnboardingData } from '../validation/onboarding';
import type { DesignSpec } from './specs';

/**
 * Mapeador de Imagens Contextuais de Alta Qualidade (Unsplash Editorial)
 * de acordo com a profissão / especialidade informada.
 */
function getContextualImages(profession: string, specialty: string) {
  const p = (profession + ' ' + specialty).toLowerCase();

  if (p.includes('advoc') || p.includes('jurid') || p.includes('direito') || p.includes('tribut') || p.includes('penal') || p.includes('trabalh')) {
    return {
      hero: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80', // Balança / Direito
      about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', // Prédio Corporativo / Escritório
      practicePattern: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80', // Tribunal / Documentos
    };
  }

  if (p.includes('medic') || p.includes('saude') || p.includes('clinica') || p.includes('doutor') || p.includes('cirurg')) {
    return {
      hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80', // Consultório Moderno
      about: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80', // Clínica / Hospital
      practicePattern: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    };
  }

  if (p.includes('psicol') || p.includes('terap') || p.includes('mente')) {
    return {
      hero: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80', // Ambiente acolhedor
      about: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80', // Atendimento
      practicePattern: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    };
  }

  if (p.includes('fisioter') || p.includes('reabilit')) {
    return {
      hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', // Fisioterapia
      about: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80', // Reabilitação
      practicePattern: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    };
  }

  if (p.includes('contab') || p.includes('financ') || p.includes('invest')) {
    return {
      hero: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', // Finanças / Dados
      about: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80', // Gráficos
      practicePattern: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    };
  }

  if (p.includes('engenh') || p.includes('arquitet') || p.includes('obra')) {
    return {
      hero: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80', // Arquitetura
      about: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80', // Edifício
      practicePattern: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    };
  }

  // Padrão Executivo / Corporativo
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
  const name = data.professionalName || data.fullName || 'Escritório Profissional';
  const profession = data.profession || 'Advocacia';
  const specialty = data.mainSpecialty || 'Direito Especializado';
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');
  const oabBadge = data.councilNumber ? `${data.councilType || 'OAB'} ${data.councilNumber}` : 'Registro Ativo';
  const variant = spec?.variant || 'MODEL_A';
  
  // Imagens temáticas contextuais
  const images = getContextualImages(profession, specialty);
  const heroImage = data.coverPhotoUrl || images.hero;
  const aboutImage = data.profilePhotoUrl || images.about;

  // Cores personalizadas escolhidas pelo usuário
  const primary = data.primaryColor || '#0f172a';
  const secondary = data.secondaryColor || '#2563eb';
  const accent = data.accentColor || '#10b981';

  // Configurações visuais por variante
  const isEditorial = variant === 'MODEL_C';
  const isModern = variant === 'MODEL_B';
  const isInstitutional = variant === 'MODEL_A';

  const fontBody = isEditorial ? "'Cinzel', Georgia, serif" : isModern ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif";
  const fontHeading = isEditorial ? "'Cinzel', Georgia, serif" : isModern ? "'Plus Jakarta Sans', sans-serif" : "'Outfit', sans-serif";

  const servicesList = data.services && data.services.length > 0 ? data.services : [
    {
      title: 'Consultoria Especializada',
      shortDescription: 'Atendimento e orientação estratégica com análise aprofundada de cada caso.',
      icon: 'Briefcase',
      ctaText: 'Falar no WhatsApp'
    }
  ];

  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${profession} | ${specialty}</title>
  <meta name="description" content="${data.professionalSummary || 'Atuação especializada, atendimento individualizado e compromisso com a defesa dos seus direitos.'}">
  
  <!-- Tailwind CSS & Fontes Google Stitch -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=Cinzel:wght@500;600;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
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
<body class="${isModern ? 'bg-slate-950 text-slate-100' : isEditorial ? 'bg-[#faf9f6] text-stone-900' : 'bg-slate-50 text-slate-900'} antialiased">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 ${isModern ? 'bg-slate-900/90 border-slate-800' : isEditorial ? 'bg-[#faf9f6]/95 border-stone-300' : 'bg-white/95 border-slate-200'} backdrop-blur border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-11 h-11 ${isEditorial ? 'rounded-none' : 'rounded-xl'} text-white flex items-center justify-center font-bold text-lg shadow-md" style="background-color: ${primary}">
          ${name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span class="font-bold text-lg leading-tight block ${isModern ? 'text-white' : isEditorial ? 'text-stone-900 font-serif' : 'text-slate-900'}">${name}</span>
          <span class="text-xs font-medium block ${isModern ? 'text-slate-400' : 'text-slate-500'}">${profession} • ${oabBadge}</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold ${isModern ? 'text-slate-300' : isEditorial ? 'text-stone-700' : 'text-slate-600'}">
        <a href="#inicio" class="hover:opacity-80 transition">Início</a>
        <a href="#atuacao" class="hover:opacity-80 transition">Áreas de Atuação</a>
        <a href="#como-funciona" class="hover:opacity-80 transition">Como Funciona</a>
        <a href="#sobre" class="hover:opacity-80 transition">Sobre</a>
        <a href="#artigos" class="hover:opacity-80 transition">Informativos</a>
        <a href="#contato" class="hover:opacity-80 transition">Contato</a>
      </nav>

      <div class="flex items-center space-x-3">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-5 py-2.5 text-white text-sm font-bold ${isEditorial ? 'rounded-none uppercase tracking-wider' : 'rounded-xl'} shadow-md transition-all flex items-center hover:opacity-90" style="background-color: ${primary}">
          Agendar Atendimento
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION VARIANTES -->
  ${isModern ? `
  <!-- HERO MODELO B (MODERNO PREMIUM / DARK COM IMAGEM) -->
  <section id="inicio" class="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden border-b border-slate-800 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border shadow-sm" style="background-color: ${primary}25; border-color: ${primary}66; color: #ffffff">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${accent}"></span>
            Atendimento Online & Presencial • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            ${data.companyName || specialty || 'Soluções Jurídicas Estratégicas e Alta Performance'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
            ${data.professionalSummary || 'Defesa técnica, ética e estratégica dos seus direitos com rigor e acompanhamento exclusivo.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-xl shadow-xl transition-all hover:scale-105 text-center" style="background-color: ${accent}">
              Falar Diretamente no WhatsApp
            </a>
            <a href="#contato" class="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 transition text-center">
              Formulário de Análise
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/3] lg:aspect-[4/5] group">
            <img src="${heroImage}" alt="${specialty}" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-slate-900/80 border border-slate-700/60">
              <span class="text-xs font-bold text-amber-400 block">${profession} • ${oabBadge}</span>
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
              ${data.companyName || specialty || 'Defesa Ética e Excelência Jurídica'}
            </h1>
          </div>
          
          <p class="text-base sm:text-lg text-stone-700 leading-relaxed mb-8 font-serif">
            ${data.professionalSummary || 'Atuação dedicada com rigor técnico, discrição e transparência em todas as fases do processo.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold text-center tracking-wider text-xs shadow-sm transition hover:opacity-90" style="background-color: ${primary}">
              CONSULTAR VIA WHATSAPP
            </a>
            <a href="#contato" class="px-8 py-4 border border-stone-400 text-stone-900 font-bold text-center tracking-wider text-xs hover:bg-stone-200 transition">
              ENVIAR MENSAGEM FORMAL
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
            Atendimento Online e Presencial • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
          </div>
          
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15] mb-6">
            ${data.companyName || specialty || 'Atuação Jurídica Especializada e Atendimento Individualizado'}
          </h1>
          
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            ${data.professionalSummary || 'Defesa técnica, ética e estratégica dos seus direitos com acompanhamento próximo e transparente em cada etapa.'}
          </p>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 text-white font-bold rounded-xl shadow-lg text-center transition hover:opacity-90" style="background-color: ${primary}">
              Falar pelo WhatsApp
            </a>
            <a href="#contato" class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center transition">
              Enviar Formulário de Análise
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

  <!-- ÁREAS DE ATUAÇÃO -->
  <section id="atuacao" class="py-20 ${isModern ? 'bg-slate-900 border-b border-slate-800' : isEditorial ? 'bg-[#f4f2eb] border-b border-stone-300' : 'bg-slate-50 border-b border-slate-200'}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${secondary}">Especialidades</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Áreas de Atuação Profissional</p>
        <p class="mt-3 text-sm ${isModern ? 'text-slate-400' : 'text-slate-600'}">Atendimento técnico e personalizado nas principais demandas da área.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${servicesList.map(s => `
          <div class="${isModern ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-2xl'} p-8 border shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 ${isEditorial ? 'rounded-none' : 'rounded-xl'} text-white flex items-center justify-center font-bold mb-6 text-xl shadow-md" style="background-color: ${primary}">
              ⚖️
            </div>
            <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mb-3">${s.title}</h3>
            <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-6">${s.shortDescription}</p>
            <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, gostaria de informações sobre ' + s.title)}" target="_blank" class="text-sm font-bold inline-flex items-center hover:underline" style="color: ${primary}">
              ${s.ctaText || 'Consultar sobre esta área'} →
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona" class="py-20 ${isModern ? 'bg-slate-950 border-b border-slate-800' : isEditorial ? 'bg-[#faf9f6] border-b border-stone-300' : 'bg-white border-b border-slate-200'}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Transparência</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Como Funciona o Atendimento</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto rounded-full text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">1</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Envio das Informações</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Você entra em contato pelo WhatsApp ou preenche o formulário com o resumo da situação.</p>
        </div>
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto rounded-full text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">2</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Análise Preliminar</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Avaliamos a viabilidade técnica e os documentos pertinentes ao seu caso com sigilo.</p>
        </div>
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border text-center">
          <div class="w-12 h-12 mx-auto rounded-full text-white font-bold flex items-center justify-center mb-4 shadow-md" style="background-color: ${primary}">3</div>
          <h3 class="font-bold text-lg mb-2 ${isModern ? 'text-white' : 'text-slate-900'}">Orientação Estratégica</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm">Apresentamos o melhor caminho jurídico e as medidas necessárias para defesa dos seus interesses.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE O PROFISSIONAL COM FOTO/IMAGEM -->
  <section id="sobre" class="py-20 ${isModern ? 'bg-slate-900 border-b border-slate-800' : isEditorial ? 'bg-[#f4f2eb] border-b border-stone-300' : 'bg-slate-50 border-b border-slate-200'}">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${isModern ? 'bg-slate-950 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} p-8 sm:p-12 border shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-4">
            <div class="rounded-2xl overflow-hidden border border-slate-200/80 shadow-md aspect-[3/4]">
              <img src="${aboutImage}" alt="${name}" class="w-full h-full object-cover">
            </div>
          </div>

          <div class="lg:col-span-8">
            <h2 class="text-xs uppercase tracking-widest font-bold mb-2" style="color: ${secondary}">Perfil Profissional</h2>
            <h3 class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} mb-3">${name}</h3>
            <p class="text-sm font-semibold ${isModern ? 'text-slate-400' : 'text-slate-500'} mb-6">${profession} • ${oabBadge} • Atendimento em ${data.city || 'São Paulo'}/${data.state || 'SP'}</p>
            
            <p class="${isModern ? 'text-slate-300' : 'text-slate-700'} leading-relaxed mb-6">
              ${data.bio || data.professionalSummary || 'Atuação dedicada à excelência profissional e atendimento personalizado, pautado pela ética, sigilo e rigor técnico.'}
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
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Informativos</h2>
        <p class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'} sm:text-4xl">Artigos & Orientações</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border">
          <span class="text-xs font-bold uppercase" style="color: ${secondary}">Guia Prático</span>
          <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mt-2 mb-3">Direitos Fundamentais e Medidas Iniciais em Demandas Urgentes</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-4">Saiba quais documentos devem ser preservados e como agir imediatamente para resguardar direitos em situações críticas.</p>
          <span class="text-xs text-slate-500 font-medium">Leitura: 4 min • Por ${name}</span>
        </div>

        <div class="p-8 ${isModern ? 'bg-slate-900 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-slate-50 border-slate-200 rounded-2xl'} border">
          <span class="text-xs font-bold uppercase" style="color: ${secondary}">Artigo Jurídico</span>
          <h3 class="text-xl font-bold ${isModern ? 'text-white' : 'text-slate-900'} mt-2 mb-3">A Importância do Acompanhamento Especializado</h3>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm leading-relaxed mb-4">Como uma consultoria técnica antecipada previne litígios desnecessários e assegura resoluções mais eficientes.</p>
          <span class="text-xs text-slate-500 font-medium">Leitura: 3 min • Por ${name}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMULÁRIO DE CONTATO SEGURO -->
  <section id="contato" class="py-20 ${isModern ? 'bg-slate-900' : isEditorial ? 'bg-[#f4f2eb]' : 'bg-slate-50'}">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="${isModern ? 'bg-slate-950 border-slate-800' : isEditorial ? 'bg-white border-stone-300 rounded-none' : 'bg-white border-slate-200 rounded-3xl'} p-8 sm:p-12 border shadow-sm">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold ${isModern ? 'text-white' : 'text-slate-900'}">Formulário de Contato Direto</h2>
          <p class="${isModern ? 'text-slate-400' : 'text-slate-600'} text-sm mt-2">Envie sua mensagem. Seus dados são confidenciais e tratados com sigilo profissional.</p>
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
              <option>Agendamento de Consulta</option>
              <option>Análise de Caso / Processo</option>
              <option>Demanda Urgente</option>
              <option>Outros Assuntos</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold ${isModern ? 'text-slate-300' : 'text-slate-700'} uppercase mb-1">Mensagem / Resumo do Caso *</label>
            <textarea rows="4" required placeholder="Descreva brevemente a sua situação..." class="w-full px-4 py-3 rounded-xl border ${isModern ? 'bg-slate-900 border-slate-700 text-white' : 'border-slate-300'} text-sm focus:outline-none"></textarea>
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
        <p class="text-xs text-slate-400 mt-1">${profession} • ${oabBadge}</p>
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
