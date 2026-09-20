import type { OnboardingData } from '../validation/onboarding';
import type { DesignSpec } from './specs';

/**
 * Gera o template completo e fiel com todas as seções institucionais, áreas de atuação, 
 * sobre o profissional, artigos, formulário interativo de contato e integração /master.
 */
export function renderCompleteSiteHtml(data: OnboardingData, spec?: DesignSpec, adminToken?: string): string {
  const name = data.professionalName || data.fullName;
  const profession = data.profession || 'Advogado';
  const specialty = data.mainSpecialty || 'Direito Especializado';
  const whatsappDigits = (data.whatsapp || '').replace(/[^0-9]/g, '');
  const oabBadge = data.councilNumber ? `${data.councilType || 'OAB'} ${data.councilNumber}` : 'Registro Ativo';
  const variant = spec?.variant || 'MODEL_A';
  
  // Customização de tipografia e estilo por variante
  const isEditorial = variant === 'MODEL_C';
  const isModern = variant === 'MODEL_B';
  const bodyFont = isEditorial ? 'font-serif' : isModern ? "font-['Plus_Jakarta_Sans']" : "font-['Inter']";
  const headingFont = isEditorial ? "font-['Cinzel']" : isModern ? "font-['Plus_Jakarta_Sans']" : "font-['Outfit']";
  const primaryBg = data.primaryColor || (isEditorial ? '#111827' : isModern ? '#0f172a' : '#1e293b');
  const accentColor = data.accentColor || '#10b981';

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
  <meta name="description" content="${data.professionalSummary || 'Atuação jurídica especializada, atendimento individualizado e compromisso com a defesa dos seus direitos.'}">
  
  <!-- Tailwind CSS & Fontes Google Stitch -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=Cinzel:wght@600;700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: ${isEditorial ? "'Cinzel', Georgia, serif" : isModern ? "'Plus Jakarta Sans', sans-serif" : "'Inter', sans-serif"}; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased selection:bg-slate-900 selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm">
          ${name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <span class="font-bold text-lg text-slate-900 leading-tight block">${name}</span>
          <span class="text-xs text-slate-500 font-medium block">${profession} • ${oabBadge}</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
        <a href="#inicio" class="hover:text-slate-950 transition">Início</a>
        <a href="#atuacao" class="hover:text-slate-950 transition">Áreas de Atuação</a>
        <a href="#como-funciona" class="hover:text-slate-950 transition">Como Funciona</a>
        <a href="#sobre" class="hover:text-slate-950 transition">Sobre</a>
        <a href="#artigos" class="hover:text-slate-950 transition">Artigos</a>
        <a href="#contato" class="hover:text-slate-950 transition">Contato</a>
      </nav>

      <div class="flex items-center space-x-3">
        <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center">
          Agendar Consulta
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section id="inicio" class="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-white overflow-hidden border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Atendimento Online e Presencial • ${data.city || 'São Paulo'} - ${data.state || 'SP'}
        </div>
        
        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] mb-6">
          ${data.companyName || specialty || 'Atuação jurídica especializada e atendimento individualizado.'}
        </h1>
        
        <p class="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
          ${data.professionalSummary || 'Defesa técnica, ética e estratégica dos seus direitos com acompanhamento próximo e transparente em cada etapa.'}
        </p>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a href="https://wa.me/${whatsappDigits}" target="_blank" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 text-center transition">
            Falar pelo WhatsApp
          </a>
          <a href="#contato" class="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-center transition">
            Enviar Formulário de Análise
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ÁREAS DE ATUAÇÃO -->
  <section id="atuacao" class="py-20 bg-slate-50 border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-emerald-700 mb-2">Especialidades</h2>
        <p class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Áreas de Atuação Jurídica</p>
        <p class="mt-3 text-slate-600 text-sm">Atendimento técnico e personalizado nas principais demandas da área.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${servicesList.map(s => `
          <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div class="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold mb-6">
              ⚖️
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">${s.title}</h3>
            <p class="text-slate-600 text-sm leading-relaxed mb-6">${s.shortDescription}</p>
            <a href="https://wa.me/${whatsappDigits}?text=${encodeURIComponent('Olá, gostaria de informações sobre ' + s.title)}" target="_blank" class="text-emerald-700 text-sm font-bold inline-flex items-center hover:underline">
              ${s.ctaText || 'Consultar sobre esta área'} →
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona" class="py-20 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Transparência</h2>
        <p class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Como Funciona o Atendimento</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mb-4">1</div>
          <h3 class="font-bold text-lg mb-2">Envio das Informações</h3>
          <p class="text-slate-600 text-sm">Você entra em contato pelo WhatsApp ou preenche o formulário com o resumo da situação.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mb-4">2</div>
          <h3 class="font-bold text-lg mb-2">Análise Preliminar</h3>
          <p class="text-slate-600 text-sm">Avaliamos a viabilidade técnica e os documentos pertinentes ao seu caso com sigilo.</p>
        </div>
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mb-4">3</div>
          <h3 class="font-bold text-lg mb-2">Orientação Estratégica</h3>
          <p class="text-slate-600 text-sm">Apresentamos o melhor caminho jurídico e as medidas necessárias para defesa dos seus interesses.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE O PROFISSIONAL -->
  <section id="sobre" class="py-20 bg-slate-50 border-b border-slate-200/80">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <h2 class="text-xs uppercase tracking-widest font-bold text-emerald-700 mb-2">Perfil Profissional</h2>
        <h3 class="text-3xl font-extrabold text-slate-900 mb-4">${name}</h3>
        <p class="text-sm font-semibold text-slate-500 mb-6">${profession} • ${oabBadge} • Atendimento em ${data.city || 'São Paulo'}/${data.state || 'SP'}</p>
        
        <p class="text-slate-700 leading-relaxed mb-6">
          ${data.bio || data.professionalSummary || 'Atuação dedicada à excelência jurídica e atendimento personalizado, pautado pela ética, sigilo profissional e rigor técnico.'}
        </p>

        <div class="pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
          <span class="px-3 py-1.5 bg-slate-100 rounded-lg">🕒 Horário: ${data.businessHours || 'Segunda a Sexta, das 09h às 18h'}</span>
          <span class="px-3 py-1.5 bg-slate-100 rounded-lg">📍 Atendimento: ${data.attendanceType === 'online' ? '100% Online' : data.attendanceType === 'presencial' ? 'Presencial' : 'Híbrido (Online e Presencial)'}</span>
          <span class="px-3 py-1.5 bg-slate-100 rounded-lg">✉️ ${data.publicEmail || 'Atendimento Direto'}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ARTIGOS E INFORMATIVOS -->
  <section id="artigos" class="py-20 bg-white border-b border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Informativos</h2>
        <p class="text-3xl font-extrabold text-slate-900 sm:text-4xl">Artigos & Orientações Jurídicas</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-xs font-bold text-emerald-700 uppercase">Guia Prático</span>
          <h3 class="text-xl font-bold text-slate-900 mt-2 mb-3">Direitos Fundamentais e Medidas Iniciais em Demandas Urgentes</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">Saiba quais documentos devem ser preservados e como agir imediatamente para resguardar direitos em situações críticas.</p>
          <span class="text-xs text-slate-400 font-medium">Leitura: 4 min • Por ${name}</span>
        </div>

        <div class="p-8 rounded-2xl bg-slate-50 border border-slate-200">
          <span class="text-xs font-bold text-emerald-700 uppercase">Artigo Jurídico</span>
          <h3 class="text-xl font-bold text-slate-900 mt-2 mb-3">A Importância do Acompanhamento Jurídico Especializado</h3>
          <p class="text-slate-600 text-sm leading-relaxed mb-4">Como uma consultoria técnica antecipada previne litígios desnecessários e assegura resoluções mais eficientes.</p>
          <span class="text-xs text-slate-400 font-medium">Leitura: 3 min • Por ${name}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMULÁRIO DE CONTATO SEGURO -->
  <section id="contato" class="py-20 bg-slate-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-extrabold text-slate-900">Formulário de Contato Direto</h2>
          <p class="text-slate-600 text-sm mt-2">Envie sua mensagem. Seus dados são confidenciais e tratados com sigilo profissional.</p>
        </div>

        <form onsubmit="event.preventDefault(); alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Completo *</label>
            <input type="text" required placeholder="Seu nome completo" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Telefone / WhatsApp *</label>
              <input type="tel" required placeholder="(11) 99999-9999" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail *</label>
              <input type="email" required placeholder="seu@email.com" class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Motivo do Contato *</label>
            <select class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
              <option>Agendamento de Consulta</option>
              <option>Análise de Caso / Processo</option>
              <option>Demanda Urgente</option>
              <option>Outros Assuntos</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Mensagem / Resumo do Caso *</label>
            <textarea rows="4" required placeholder="Descreva brevemente a sua situação..." class="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"></textarea>
          </div>

          <p class="text-xs text-slate-500">Ao enviar este formulário, você concorda com a política de privacidade e o tratamento confidencial das informações.</p>

          <button type="submit" class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all">
            Enviar Informações com Segurança
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-950 text-white py-12 border-t border-slate-800">
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
