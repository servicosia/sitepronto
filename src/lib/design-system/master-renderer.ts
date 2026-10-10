import type { OnboardingData } from '../validation/onboarding';
import { getContextualImages } from './template-renderer';
import { 
  getContextualGallery, 
  getContextualTestimonials 
} from './profession-intelligence';

export function renderMasterDashboardHtml(data: OnboardingData, siteId?: string): string {
  const name = data.professionalName || data.fullName || 'Profissional / Empresa';
  const profession = data.profession || 'Especialista';
  const council = data.councilNumber 
    ? `${data.councilType || 'Registro'} ${data.councilNumber}` 
    : (data.hasProfessionalCouncil ? 'Registro Ativo' : 'Cadastro Regular');

  const services = data.services && data.services.length > 0 ? data.services : [
    { title: 'Consultoria e Atendimento', shortDescription: 'Atendimento estratégico e análise técnica das necessidades.', ctaText: 'Saber Mais' },
    { title: 'Diagnóstico e Estruturação', shortDescription: 'Planejamento e estruturação prática para alcance de metas.', ctaText: 'Agendar' },
    { title: 'Suporte Contínuo', shortDescription: 'Acompanhamento dedicado com foco em excelência e resultados.', ctaText: 'Consultar' }
  ];

  const images = getContextualImages(profession, data.mainSpecialty, data.companyName);
  const heroImage = data.coverPhotoUrl || images.hero;
  const aboutImage = data.profilePhotoUrl || images.about;

  const gallery = data.gallery && data.gallery.length > 0
    ? data.gallery
    : getContextualGallery(profession, data.mainSpecialty, data.companyName);

  const testimonials = data.testimonials && data.testimonials.length > 0
    ? data.testimonials
    : getContextualTestimonials(profession, data.mainSpecialty, data.companyName);

  const products = data.products && data.products.length > 0 ? data.products : [
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
      price: '', // Opcional — sem preço / sob consulta
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Consultar Valores',
    }
  ];

  const faq = data.faq && data.faq.length > 0 ? data.faq : [
    { question: 'Como funciona o primeiro atendimento ou consulta?', answer: 'Realizamos um diagnóstico detalhado das suas necessidades, com escuta atenta, ética e um plano de trabalho totalmente personalizado.' },
    { question: 'Vocês atendem de forma online ou presencial?', answer: 'Oferecemos formatos flexíveis: atendimento 100% online para todo o Brasil e atendimento presencial com estrutura acolhedora e climatizada.' },
    { question: 'Qual o tempo médio de resposta para agendamentos?', answer: 'Normalmente retornamos em até poucas horas pelo WhatsApp comercial. Você escolhe o melhor dia e horário na agenda.' },
    { question: 'Quais são as opções de pagamento aceitas?', answer: 'Trabalhamos com PIX, cartões de crédito em até 12x e faturamento corporativo para empresas e contratos mensais.' }
  ];

  const plans = data.plans && data.plans.length > 0 ? data.plans : [
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

  const cases = data.cases && data.cases.length > 0 ? data.cases : [
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

  const bioLinks = data.bioLinks && data.bioLinks.length > 0 ? data.bioLinks : [
    { label: '💬 Falar no WhatsApp Direto', url: 'https://wa.me/' + (data.whatsapp || '').replace(/[^0-9]/g, ''), icon: 'MessageCircle', isHighlight: true },
    { label: '📅 Agendar Atendimento Online', url: '#contato', icon: 'Calendar', isHighlight: false },
    { label: '⚖️ Conhecer Nossas Especialidades', url: '#servicos', icon: 'Briefcase', isHighlight: false },
    { label: '🛍️ Ver Catálogo de Produtos', url: '#catalogo', icon: 'ShoppingBag', isHighlight: false },
    { label: '📍 Localização e Horários', url: '#sobre', icon: 'MapPin', isHighlight: false }
  ];

  const announcement = data.announcement || {
    active: false,
    text: 'Aviso: Agenda aberta para novos atendimentos este mês com horários flexíveis!',
    badge: 'COMUNICADO',
    linkText: 'Falar no WhatsApp',
    linkUrl: 'https://wa.me/' + (data.whatsapp || '').replace(/[^0-9]/g, '')
  };

  const partners = data.partners && data.partners.length > 0 ? data.partners : [
    { name: 'Empresa Líder Regional', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Cliente' },
    { name: 'Grupo Inovação & Saúde', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Parceiro' },
    { name: 'Certificação de Qualidade Técnica', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', type: 'Certificação' }
  ];

  const simulator = data.simulator || {
    active: false,
    title: 'Simulador de Atendimento Personalizado',
    subtitle: 'Escolha suas preferências e envie uma solicitação pronta no WhatsApp com 1 clique'
  };

  const safeJsonServices = JSON.stringify(services).replace(/</g, '\\u003c');
  const safeJsonGallery = JSON.stringify(gallery).replace(/</g, '\\u003c');
  const safeJsonTestimonials = JSON.stringify(testimonials).replace(/</g, '\\u003c');
  const safeJsonProducts = JSON.stringify(products).replace(/</g, '\\u003c');
  const safeJsonFaq = JSON.stringify(faq).replace(/</g, '\\u003c');
  const safeJsonPlans = JSON.stringify(plans).replace(/</g, '\\u003c');
  const safeJsonCases = JSON.stringify(cases).replace(/</g, '\\u003c');
  const safeJsonBioLinks = JSON.stringify(bioLinks).replace(/</g, '\\u003c');
  const safeJsonAnnouncement = JSON.stringify(announcement).replace(/</g, '\\u003c');
  const safeJsonPartners = JSON.stringify(partners).replace(/</g, '\\u003c');
  const safeJsonSimulator = JSON.stringify(simulator).replace(/</g, '\\u003c');
  const defaultSocials = {
    instagram: { active: Boolean(data.instagram), url: data.instagram || '' },
    tiktok: { active: Boolean(data.tiktok), url: data.tiktok || '' },
    facebook: { active: Boolean(data.facebook), url: data.facebook || '' },
    youtube: { active: Boolean(data.youtube), url: data.youtube || '' },
  };

  const socials = data.socialLinks ? {
    instagram: data.socialLinks.instagram || defaultSocials.instagram,
    tiktok: data.socialLinks.tiktok || defaultSocials.tiktok,
    facebook: data.socialLinks.facebook || defaultSocials.facebook,
    youtube: data.socialLinks.youtube || defaultSocials.youtube,
  } : defaultSocials;

  const safeJsonSocials = JSON.stringify(socials).replace(/</g, '\\u003c');

  const defaultWhatsappWidget = data.whatsappWidget || {
    active: true,
    greetingText: 'Olá! Precisa de atendimento? Fale conosco no WhatsApp',
    customMessage: 'Olá! Gostaria de mais informações sobre seus serviços.',
  };
  const safeJsonWhatsappWidget = JSON.stringify(defaultWhatsappWidget).replace(/</g, '\\u003c');

  const defaultTracking = data.tracking || {
    googleAnalyticsId: '',
    metaPixelId: '',
  };
  const safeJsonTracking = JSON.stringify(defaultTracking).replace(/</g, '\\u003c');

  const defaultLgpd = data.lgpd || {
    active: true,
    message: 'Utilizamos cookies essenciais para oferecer a melhor experiência e garantir a segurança do seu atendimento de acordo com a LGPD.',
  };
  const safeJsonLgpd = JSON.stringify(defaultLgpd).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel /master — ${name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .tab-btn.active {
      border-bottom-color: #0f172a;
      color: #0f172a;
      font-weight: 700;
    }
  </style>
</head>
<body class="bg-slate-100 text-slate-900 min-h-screen flex flex-col">

  <!-- TOPBAR -->
  <header class="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm">
          /M
        </div>
        <div>
          <span class="font-bold text-base tracking-tight block leading-tight">Painel de Gestão /master</span>
          <span class="text-xs text-slate-400 block">${name} • ${profession}</span>
        </div>
      </div>

      <div class="flex items-center space-x-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Site Online & Conectado
        </span>
        <a href="/" class="text-xs text-slate-300 hover:text-white bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 transition flex items-center font-medium">
          Ver Site Público ↗
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <!-- METRICS OVERVIEW -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-contacts')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atendimentos / Leads</div>
        <div class="text-3xl font-extrabold text-slate-900 mt-2">1</div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">✓ Recepção ativa</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-sections')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Módulos Ativos</div>
        <div id="activeModulesCount" class="text-3xl font-extrabold text-indigo-600 mt-2">8/9</div>
        <div class="text-xs text-slate-500 mt-1">Seções configuráveis</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-catalog')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catálogo (Máx 50)</div>
        <div id="catalogCountMetric" class="text-3xl font-extrabold text-slate-900 mt-2">${products.length}/50</div>
        <div id="catalogMetricStatus" class="text-xs font-semibold mt-1 text-slate-500">○ Desligado no site</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-services')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Áreas de Atuação</div>
        <div id="servicesCountMetric" class="text-3xl font-extrabold text-slate-900 mt-2">${services.length}</div>
        <div class="text-xs text-slate-500 mt-1">Cards dinâmicos</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-testimonials')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Depoimentos</div>
        <div id="testimonialsCountMetric" class="text-3xl font-extrabold text-amber-600 mt-2">${testimonials.length}</div>
        <div class="text-xs text-slate-500 mt-1">Avaliações públicas</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-gallery')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Galeria de Fotos</div>
        <div id="galleryCountMetric" class="text-3xl font-extrabold text-emerald-600 mt-2">${gallery.length}</div>
        <div class="text-xs text-slate-500 mt-1">Fotos no ar</div>
      </div>
    </div>

    <!-- TABS DE GESTÃO -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- TAB NAVIGATION -->
      <div class="border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex space-x-3 sm:space-x-6 overflow-x-auto pb-1">
          <button id="btn-tab-contacts" class="tab-btn active text-sm pb-2 border-b-2 border-slate-900 transition whitespace-nowrap" onclick="switchTab('tab-contacts')">
            📬 Contatos
          </button>
          <button id="btn-tab-sections" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-sections')">
            🧩 Módulos & Seções
          </button>
          <button id="btn-tab-catalog" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-catalog')">
            🛍️ Catálogo de Produtos
          </button>
          <button id="btn-tab-faq" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-faq')">
            ❓ Central de Dúvidas
          </button>
          <button id="btn-tab-plans" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-plans')">
            💳 Planos & Preços
          </button>
          <button id="btn-tab-cases" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-cases')">
            🏆 Casos de Sucesso
          </button>
          <button id="btn-tab-biolinks" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-biolinks')">
            🔗 Bio Link (/links)
          </button>
          <button id="btn-tab-socials" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-socials')">
            📱 Redes Sociais
          </button>
          <button id="btn-tab-announcement" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-announcement')">
            📢 Barra de Avisos
          </button>
          <button id="btn-tab-partners" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-partners')">
            🤝 Parceiros & Clientes
          </button>
          <button id="btn-tab-simulator" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-simulator')">
            🧮 Simulador
          </button>
          <button id="btn-tab-services" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-services')">
            ⚖️ Áreas de Atuação
          </button>
          <button id="btn-tab-testimonials" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-testimonials')">
            💬 Depoimentos
          </button>
          <button id="btn-tab-gallery" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-gallery')">
            🖼️ Galeria de Fotos
          </button>
          <button id="btn-tab-profile" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-profile')">
            👤 Perfil
          </button>
          <button id="btn-tab-media" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-media')">
            🖼️ Capa & Sobre
          </button>
          <button id="btn-tab-template" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-template')">
            🎨 Trocar Modelo
          </button>
          <button id="btn-tab-articles" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-articles')">
            📰 Artigos
          </button>
          <button id="btn-tab-settings" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-settings')">
            ⚙️ Configurações
          </button>
          <button id="btn-tab-domain" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition whitespace-nowrap" onclick="switchTab('tab-domain')">
            🌐 Domínio & DNS
          </button>
        </div>
        <span id="saveBadge" class="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
          ✓ Sincronizado
        </span>
      </div>

      <!-- ABA 1: FORMULÁRIOS RECEBIDOS -->
      <div id="tab-contacts" class="tab-content p-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl">📬</span>
              <h3 class="font-bold text-base text-slate-900">Mensagens e Formulários Recebidos</h3>
              <span id="contactsCountBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                1 contato registrado
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">Leads e solicitações enviadas pelos visitantes através do formulário do seu site.</p>
          </div>
          <div class="flex items-center gap-2.5">
            <button onclick="downloadContactsCSV()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-2">
              <span>📥</span> Exportar Leads (Excel / CSV)
            </button>
          </div>
        </div>
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-left text-sm text-slate-600">
            <thead class="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">Data/Hora</th>
                <th class="py-3 px-4">Nome</th>
                <th class="py-3 px-4">Telefone / WhatsApp</th>
                <th class="py-3 px-4">Motivo</th>
                <th class="py-3 px-4">Mensagem</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50/50">
                <td class="py-3.5 px-4 text-xs text-slate-400">Hoje às 16:30</td>
                <td class="py-3.5 px-4 font-bold text-slate-900">Mariana Souza</td>
                <td class="py-3.5 px-4 font-mono text-xs text-indigo-600">(11) 97766-5544</td>
                <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded text-xs bg-slate-100 font-semibold text-slate-700">Consulta Inicial</span></td>
                <td class="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">Preciso de orientação com urgência.</td>
                <td class="py-3.5 px-4">
                  <span class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Novo
                  </span>
                </td>
                <td class="py-3.5 px-4 text-right">
                  <a href="https://wa.me/5511977665544" target="_blank" class="px-2.5 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700">
                    Responder WhatsApp
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ABA 2: MÓDULOS & SEÇÕES (MODULARIDADE DO SITE) -->
      <div id="tab-sections" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-base text-slate-900">Estrutura Modular do Site</h3>
            <p class="text-xs text-slate-500 mt-1">Ative ou desative cada seção com um clique. Seções desativadas somem automaticamente da página e do menu de navegação.</p>
          </div>
          <button onclick="saveSectionsConfig()" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition">
            Salvar Módulos
          </button>
        </div>

        <div id="sectionsConfigList" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveSectionsConfig()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Configuração de Seções
          </button>
        </div>
      </div>

      <!-- ABA 3: ÁREAS DE ATUAÇÃO (CARDS DINÂMICOS: ADICIONAR E DIMINUIR) -->
      <div id="tab-services" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Áreas de Atuação (Cards do Site)</h3>
            <p class="text-xs text-slate-500 mt-1">Adicione ou diminua cards conforme suas especialidades. O layout ajusta automaticamente a quantidade de itens.</p>
          </div>
          <button onclick="addServiceCard()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5">
            <span>+</span> Adicionar Nova Área
          </button>
        </div>

        <div id="servicesContainer" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveServicesData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Áreas de Atuação
          </button>
        </div>
      </div>

      <!-- ABA CATÁLOGO DE PRODUTOS (ATÉ 50 ITENS - OPÇÃO INICIA DESLIGADA) -->
      <div id="tab-catalog" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação no Site Público -->
        <div id="catalogStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">🛍️</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Catálogo de Produtos no Site</h4>
                <span id="catalogStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="catalogStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor ao lado para que a seção de produtos e o link apareçam no site público.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="catalogActivationSwitch" onchange="toggleCatalogActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <!-- Cabeçalho e Ações do Catálogo -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-base text-slate-900">Gerenciar Produtos do Catálogo</h3>
              <span id="catalogCapacityBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                0 de 50 produtos
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Cadastre até 50 produtos com foto, nome, descrição e preço (opcional). Os pedidos são direcionados para o seu WhatsApp.
            </p>
          </div>
          <button id="btnAddProduct" onclick="addProductCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Novo Produto (Máx 50)
          </button>
        </div>

        <!-- Lista/Grid de Produtos -->
        <div id="catalogContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Renderizado via JavaScript -->
        </div>

        <!-- Rodapé com Salvamento -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <span id="catalogCapacityFooter" class="text-xs text-slate-500">
            Capacidade: <strong>0/50 produtos</strong> cadastrados.
          </span>
          <button onclick="saveCatalogData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Catálogo de Produtos
          </button>
        </div>
      </div>

      <!-- ABA CENTRAL DE DÚVIDAS / FAQ -->
      <div id="tab-faq" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação no Site Público -->
        <div id="faqStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">❓</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Central de Dúvidas / FAQ no Site</h4>
                <span id="faqStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="faqStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor ao lado para que a seção de perguntas frequentes e o menu apareçam no site público.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="faqActivationSwitch" onchange="toggleFaqActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Perguntas e Respostas</h3>
            <p class="text-xs text-slate-500 mt-1">Esclareça dúvidas comuns para aumentar a conversão de clientes indecisos.</p>
          </div>
          <button onclick="addFaqCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Nova Pergunta
          </button>
        </div>

        <div id="faqContainer" class="space-y-4">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveFaqData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Perguntas & Respostas
          </button>
        </div>
      </div>

      <!-- ABA TABELA DE PLANOS & PREÇOS -->
      <div id="tab-plans" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="plansStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">💳</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Tabela de Planos e Preços no Site</h4>
                <span id="plansStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="plansStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor para exibir pacotes ou planos com tabela comparativa e botão para WhatsApp.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="plansActivationSwitch" onchange="togglePlansActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Pacotes & Planos</h3>
            <p class="text-xs text-slate-500 mt-1">Defina nome do plano, badge ("Mais Escolhido"), preço, periodicidade e lista de benefícios.</p>
          </div>
          <button onclick="addPlanCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Novo Plano
          </button>
        </div>

        <div id="plansContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="savePlansData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Planos e Preços
          </button>
        </div>
      </div>

      <!-- ABA CASOS DE SUCESSO / PORTFÓLIO -->
      <div id="tab-cases" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="casesStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">🏆</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Casos de Sucesso & Portfólio no Site</h4>
                <span id="casesStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="casesStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor para apresentar projetos concluídos e resultados obtidos.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="casesActivationSwitch" onchange="toggleCasesActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Casos de Sucesso</h3>
            <p class="text-xs text-slate-500 mt-1">Destaque desafios resolvidos, métricas de resultado e fotos do projeto.</p>
          </div>
          <button onclick="addCaseCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Caso de Sucesso
          </button>
        </div>

        <div id="casesContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveCasesData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Casos de Sucesso
          </button>
        </div>
      </div>

      <!-- ABA BIO LINK INTEGRADO (/LINKS) -->
      <div id="tab-biolinks" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="bioLinksStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">🔗</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Página de Bio Link Integrada (/links)</h4>
                <span id="bioLinksStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="bioLinksStatusNotice" class="text-xs text-slate-500 mt-1">
                Sua própria página estilo Linktree no seu próprio domínio (/links) para colocar na Bio do Instagram, TikTok e WhatsApp.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <a href="/links" target="_blank" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition">
              Abrir /links ↗
            </a>
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="bioLinksActivationSwitch" onchange="toggleBioLinksActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <!-- GERADOR DE QR CODE AUTOMÁTICO -->
        <div class="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
              <span class="text-3xl">📱</span>
              <div>
                <h4 class="font-bold text-base text-slate-900">Gerador de QR Code Automático</h4>
                <p class="text-xs text-slate-500 mt-0.5">Gere e baixe seu QR Code em alta definição para cartões de visita, balcão, receituários ou materiais impressos.</p>
              </div>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center gap-6">
            <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
              <img id="qrCodePreviewImg" src="" alt="QR Code Preview" class="w-40 h-40 object-contain rounded-lg">
            </div>

            <div class="flex-1 space-y-3 text-center md:text-left">
              <div>
                <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Destino do QR Code</span>
                <div class="flex flex-wrap items-center gap-2 mt-1.5 justify-center md:justify-start">
                  <button id="btnQrTargetLinks" onclick="setQrCodeTarget('links')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white transition">
                    🔗 Página de Bio (/links)
                  </button>
                  <button id="btnQrTargetHome" onclick="setQrCodeTarget('home')" class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition">
                    🌐 Site Principal (Home /)
                  </button>
                </div>
              </div>

              <div>
                <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Link Codificado</span>
                <div class="flex items-center gap-2 mt-1">
                  <input type="text" id="qrTargetUrlDisplay" readonly class="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-xl text-slate-700">
                  <button onclick="copyQrTargetUrl()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl shrink-0 transition">
                    Copiar
                  </button>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 pt-1 justify-center md:justify-start">
                <button onclick="downloadActiveQrCodePng()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-1.5">
                  <span>📥</span> Baixar Imagem do QR Code (PNG)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Botões da Sua Bio</h3>
            <p class="text-xs text-slate-500 mt-1">Ordene e personalize os links mais importantes para quem vem das redes sociais.</p>
          </div>
          <button onclick="addBioLinkCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Novo Botão
          </button>
        </div>

        <div id="bioLinksContainer" class="space-y-3">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveBioLinksData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Botões da Bio
          </button>
        </div>
      </div>

      <!-- ABA REDES SOCIAIS NO RODAPÉ -->
      <div id="tab-socials" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-2xl">📱</span>
              <h3 class="font-bold text-base text-slate-900">Redes Sociais no Rodapé</h3>
              <span id="socialsActiveCountBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                0 ativas
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              Ative ou desative cada rede social e informe a URL do seu perfil ou canal. Os ícones serão exibidos no rodapé do seu site como links para seus visitantes.
            </p>
          </div>
          <button onclick="saveSocialsData()" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shrink-0 shadow-sm">
            Salvar Redes Sociais
          </button>
        </div>

        <!-- Grid de Cards de cada Rede Social -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <!-- Card Instagram -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 shadow-sm transition hover:border-slate-300">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">Instagram</h4>
                  <span id="badge_instagram" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">○ Desligado</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="switch_instagram" onchange="toggleSocialItem('instagram', this.checked)" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Link do Perfil no Instagram</label>
              <input type="url" id="url_instagram" oninput="updateSocialUrl('instagram', this.value)" placeholder="https://instagram.com/seu_perfil" class="w-full px-3 py-2 text-xs font-mono bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
          </div>

          <!-- Card TikTok -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 shadow-sm transition hover:border-slate-300">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-sm border border-slate-800">
                  <svg class="w-5 h-5 fill-current text-[#25f4ee]" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">TikTok</h4>
                  <span id="badge_tiktok" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">○ Desligado</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="switch_tiktok" onchange="toggleSocialItem('tiktok', this.checked)" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Link do Perfil no TikTok</label>
              <input type="url" id="url_tiktok" oninput="updateSocialUrl('tiktok', this.value)" placeholder="https://tiktok.com/@seu_perfil" class="w-full px-3 py-2 text-xs font-mono bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
          </div>

          <!-- Card Facebook -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 shadow-sm transition hover:border-slate-300">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-[#1877f2] text-white flex items-center justify-center shadow-sm">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">Facebook</h4>
                  <span id="badge_facebook" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">○ Desligado</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="switch_facebook" onchange="toggleSocialItem('facebook', this.checked)" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Link da Página ou Perfil no Facebook</label>
              <input type="url" id="url_facebook" oninput="updateSocialUrl('facebook', this.value)" placeholder="https://facebook.com/sua_pagina" class="w-full px-3 py-2 text-xs font-mono bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
          </div>

          <!-- Card YouTube -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 shadow-sm transition hover:border-slate-300">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-[#ff0000] text-white flex items-center justify-center shadow-sm">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">YouTube</h4>
                  <span id="badge_youtube" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">○ Desligado</span>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="switch_youtube" onchange="toggleSocialItem('youtube', this.checked)" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Link do Canal no YouTube</label>
              <input type="url" id="url_youtube" oninput="updateSocialUrl('youtube', this.value)" placeholder="https://youtube.com/@seu_canal" class="w-full px-3 py-2 text-xs font-mono bg-slate-50 focus:bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none">
            </div>
          </div>

        </div>

        <!-- Box de Demonstração em Tempo Real -->
        <div class="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Pré-visualização no Rodapé</span>
            <span class="text-[11px] text-slate-500">Visualização de como aparecerá no rodapé</span>
          </div>
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            <div class="text-xs text-slate-400 text-center sm:text-left">
              <span class="font-bold text-slate-200">${name}</span> • ${profession}
            </div>
            <div id="socialsPreviewContainer" class="flex items-center gap-3">
              <!-- Renderizado dinamicamente -->
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveSocialsData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Redes Sociais
          </button>
        </div>
      </div>

      <!-- ABA BARRA DE AVISOS & COMUNICADOS -->
      <div id="tab-announcement" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="announcementStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">📢</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Barra de Avisos no Topo do Site</h4>
                <span id="announcementStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="announcementStatusNotice" class="text-xs text-slate-500 mt-1">
                Uma barra elegante fixa no topo do site para avisos de agenda aberta, feriados, novidades ou comunicados urgentes.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="announcementActivationSwitch" onchange="toggleAnnouncementActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Etiqueta / Badge do Comunicado</label>
            <input type="text" id="announcementBadgeInput" placeholder="Ex: COMUNICADO, NOVIDADE, AGENDA 2026" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Texto Principal do Aviso *</label>
            <textarea id="announcementTextInput" rows="2" placeholder="Ex: Agenda aberta para novos atendimentos este mês com horários flexíveis!" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Texto do Link / Botão (Opcional)</label>
              <input type="text" id="announcementLinkTextInput" placeholder="Ex: Falar no WhatsApp" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Link do Botão (URL ou WhatsApp)</label>
              <input type="text" id="announcementLinkUrlInput" placeholder="Ex: https://wa.me/... ou #contato" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono">
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveAnnouncementData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Barra de Avisos
          </button>
        </div>
      </div>

      <!-- ABA PARCEIROS, CLIENTES & CERTIFICAÇÕES -->
      <div id="tab-partners" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="partnersStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">🤝</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Parceiros, Clientes & Certificações no Site</h4>
                <span id="partnersStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="partnersStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor para exibir marcas e selos de prova social com alta autoridade.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="partnersActivationSwitch" onchange="togglePartnersActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h3 class="font-bold text-base text-slate-900">Gerenciar Marcas & Selos</h3>
            <p class="text-xs text-slate-500 mt-1">Adicione logotipos ou títulos de empresas atendidas, parceiros estratégicos ou entidades reguladoras.</p>
          </div>
          <button onclick="addPartnerCard()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-sm">
            <span>+</span> Adicionar Nova Marca
          </button>
        </div>

        <div id="partnersContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="savePartnersData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Parceiros & Certificações
          </button>
        </div>
      </div>

      <!-- ABA SIMULADOR DE ATENDIMENTO INTERATIVO -->
      <div id="tab-simulator" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <!-- Banner de Status de Ativação -->
        <div id="simulatorStatusBanner" class="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div class="flex items-start sm:items-center space-x-3.5">
            <span class="text-3xl">🧮</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-base text-slate-900">Simulador de Atendimento Interativo</h4>
                <span id="simulatorStatusBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  ○ Desligado
                </span>
              </div>
              <p id="simulatorStatusNotice" class="text-xs text-slate-500 mt-1">
                Esta opção inicia desligada. Ligue o interruptor para disponibilizar um assistente de orçamento rápido onde o cliente escolhe opções e envia a mensagem pronta no WhatsApp.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-slate-700">Exibir no Site:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="simulatorActivationSwitch" onchange="toggleSimulatorActivationFromTab(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Título do Simulador</label>
            <input type="text" id="simulatorTitleInput" placeholder="Ex: Simulador de Atendimento Personalizado" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Subtítulo / Instrução</label>
            <textarea id="simulatorSubtitleInput" rows="2" placeholder="Ex: Selecione suas necessidades e envie uma solicitação pronta no WhatsApp com 1 clique" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
          </div>
          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
            <strong>Como funciona para os visitantes:</strong> O simulador cria etapas intuitivas (Tipo de Demanda, Formato Online/Presencial e Urgência) gerando uma mensagem rica e estruturada diretamente no seu WhatsApp para atendimento imediato.
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveSimulatorData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Simulador
          </button>
        </div>
      </div>

      <!-- ABA 4: DEPOIMENTOS DE CLIENTES (CARDS DINÂMICOS: FOTO, NOTA, TEXTO) -->
      <div id="tab-testimonials" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-base text-slate-900">Depoimentos & Avaliações de Clientes</h3>
            <p class="text-xs text-slate-500 mt-1">Adicione depoimentos reais com foto, avaliação em estrelas e depoimento curto de clientes para gerar autoridade.</p>
          </div>
          <button onclick="addTestimonialCard()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5">
            <span>+</span> Adicionar Novo Depoimento
          </button>
        </div>

        <div id="testimonialsContainer" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveTestimonialsData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Depoimentos
          </button>
        </div>
      </div>

      <!-- ABA 5: GALERIA DE FOTOS (ADICIONAR E DIMINUIR FOTOS) -->
      <div id="tab-gallery" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="font-bold text-base text-slate-900">Galeria de Fotos do Espaço e Atuação</h3>
            <p class="text-xs text-slate-500 mt-1">Adicione fotos do seu consultório, instalações ou trabalho via upload do computador ou link direto na web.</p>
          </div>
          <div class="flex items-center gap-2">
            <label class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer transition flex items-center gap-1.5">
              <span>📷</span> Fazer Upload de Foto
              <input type="file" accept="image/*" class="hidden" onchange="handleNewGalleryUpload(event)">
            </label>
            <button onclick="addGalleryByUrlPrompt()" class="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition">
              + Inserir Link
            </button>
          </div>
        </div>

        <div id="galleryContainer" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <!-- Renderizado via JavaScript -->
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveGalleryData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Galeria de Fotos
          </button>
        </div>
      </div>

      <!-- ABA 6: PERFIL & SOBRE -->
      <div id="tab-profile" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <h3 class="font-bold text-base text-slate-900 mb-2">Informações do Perfil Profissional</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Profissional</label>
            <input type="text" id="profName" value="${name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Registro (Conselho / Órgão de Classe)</label>
            <input type="text" id="profOab" value="${council}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Cidade / Estado</label>
            <input type="text" id="profCity" value="${data.city || 'São Paulo'} - ${data.state || 'SP'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Horário de Atendimento</label>
            <input type="text" id="profHours" value="${data.businessHours || 'Segunda a Sexta, das 09h às 18h'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Texto Institucional / Biografia</label>
            <textarea id="profBio" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">${data.bio || data.professionalSummary || 'Atuação dedicada com rigor técnico, ética e transparência.'}</textarea>
          </div>
        </div>
        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="triggerSave('Perfil atualizado com sucesso!')" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Perfil
          </button>
        </div>
      </div>

      <!-- ABA 7: GERENCIAMENTO DE CAPA & SOBRE -->
      <div id="tab-media" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Gerenciador de Imagens Principais</h3>
          <p class="text-xs text-slate-500 mt-1">Altere a imagem de capa (Hero) e a foto de perfil/sobre através de link direto ou upload do seu dispositivo.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Imagem de Capa (Hero) -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm text-slate-900">1. Imagem Principal / Capa (Hero)</span>
              <span class="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">Cabeçalho</span>
            </div>
            
            <div class="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-slate-200 relative group">
              <img id="previewHero" src="${data.coverPhotoUrl || heroImage}" alt="Capa" class="w-full h-full object-cover">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">URL da Imagem de Capa</label>
              <input 
                type="url" 
                id="inputHeroUrl" 
                placeholder="https://images.unsplash.com/..." 
                value="${data.coverPhotoUrl || ''}"
                oninput="document.getElementById('previewHero').src = this.value"
                class="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
              >
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Ou selecione um arquivo do computador</label>
              <input 
                type="file" 
                accept="image/*" 
                onchange="handleFileUpload(event, 'previewHero', 'inputHeroUrl')"
                class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
              >
            </div>
          </div>

          <!-- Foto do Profissional / Consultório (Sobre) -->
          <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-bold text-sm text-slate-900">2. Foto de Perfil / Sobre</span>
              <span class="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">Apresentação</span>
            </div>
            
            <div class="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-slate-200 relative group">
              <img id="previewAbout" src="${data.profilePhotoUrl || aboutImage}" alt="Perfil" class="w-full h-full object-cover">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">URL da Foto de Perfil</label>
              <input 
                type="url" 
                id="inputAboutUrl" 
                placeholder="https://images.unsplash.com/..." 
                value="${data.profilePhotoUrl || ''}"
                oninput="document.getElementById('previewAbout').src = this.value"
                class="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
              >
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Ou selecione um arquivo do computador</label>
              <input 
                type="file" 
                accept="image/*" 
                onchange="handleFileUpload(event, 'previewAbout', 'inputAboutUrl')"
                class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800"
              >
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="triggerSave('Imagens atualizadas e publicadas no site!')" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Salvar Novas Imagens
          </button>
        </div>
      </div>

      <!-- ABA 8: TROCA DE TEMPLATE / MODELO VISUAL -->
      <div id="tab-template" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Troca de Modelo Visual (Design Template)</h3>
          <p class="text-xs text-slate-500 mt-1">Alterne a qualquer momento o layout e a estética do seu site sem perder nenhuma informação cadastrada.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Modelo A -->
          <div id="opt-model-a" onclick="selectTemplateOption('MODEL_A')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-900 bg-slate-50 shadow-md transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-emerald-800">Modelo A • Serene Haven</span>
              <span id="badge-model-a" class="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Serene Haven</h4>
            <p class="text-xs text-slate-600 mb-4">Design orgânico botânico (verde sábio/terracota), linho natural e Playfair Display.</p>
            <div class="p-2 bg-[#f3efea] rounded-xl border border-[#e8e2d9] text-[11px] text-[#17382d] font-serif">Equilíbrio, Acolhimento & Tipografia Nobre</div>
          </div>

          <!-- Modelo B -->
          <div id="opt-model-b" onclick="selectTemplateOption('MODEL_B')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-sky-500">Modelo B</span>
              <span id="badge-model-b" class="w-5 h-5 rounded-full bg-slate-900 text-white hidden items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Midnight Luminescence</h4>
            <p class="text-xs text-slate-600 mb-4">Atmosfera noturna com vidro fosco e bioluminescência sutil.</p>
            <div class="p-2 bg-slate-900 rounded-xl text-[11px] text-sky-300 font-medium">Nocturnal Chic & Sofisticação</div>
          </div>

          <!-- Modelo C -->
          <div id="opt-model-c" onclick="selectTemplateOption('MODEL_C')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-stone-600">Modelo C</span>
              <span id="badge-model-c" class="w-5 h-5 rounded-full bg-slate-900 text-white hidden items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Atelier Editorial</h4>
            <p class="text-xs text-slate-600 mb-4">Tipografia clássica serifada nobre, fundo aquecido e alta autoridade.</p>
            <div class="p-2 bg-stone-100 rounded-xl border border-stone-300 text-[11px] text-stone-800 font-serif">Minimalismo Literário & Curadoria</div>
          </div>

          <!-- Modelo D -->
          <div id="opt-model-d" onclick="selectTemplateOption('MODEL_D')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-emerald-600">Modelo D • Bento Pulse</span>
              <span id="badge-model-d" class="w-5 h-5 rounded-full bg-slate-900 text-white hidden items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Modern Bento Pulse</h4>
            <p class="text-xs text-slate-600 mb-4">Layout modular Bento Grid, status ativo e foco em conversão e agendamento.</p>
            <div class="p-2 bg-emerald-950 rounded-xl text-[11px] text-emerald-300 font-medium">Bento Grid Dinâmico & Alta Conversão</div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="applyTemplateChoice()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition flex items-center gap-2">
            <span>🎨</span> Aplicar Novo Template
          </button>
        </div>
      </div>

      <!-- ABA 9: ARTIGOS & INFORMATIVOS -->
      <div id="tab-articles" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-base text-slate-900">Artigos e Orientações Publicadas</h3>
          <button onclick="alert('Novo rascunho de artigo criado!')" class="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800">
            + Escrever Artigo
          </button>
        </div>
        <div class="space-y-3">
          <div class="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-700 uppercase">Guia Informativo</span>
              <h4 class="font-bold text-sm text-slate-900">Principais Cuidados e Estratégias para Escolher o Serviço Ideal</h4>
              <p class="text-xs text-slate-400">Publicado • Leitura: 4 min</p>
            </div>
            <button onclick="triggerSave('Artigo editado!')" class="text-xs font-bold text-slate-900 border px-3 py-1.5 rounded-lg hover:bg-slate-50">Editar</button>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-700 uppercase">Artigo Técnico</span>
              <h4 class="font-bold text-sm text-slate-900">A Importância do Acompanhamento Especializado</h4>
              <p class="text-xs text-slate-400">Publicado • Leitura: 3 min</p>
            </div>
            <button onclick="triggerSave('Artigo editado!')" class="text-xs font-bold text-slate-900 border px-3 py-1.5 rounded-lg hover:bg-slate-50">Editar</button>
          </div>
        </div>
      </div>

      <!-- ABA 10: CONFIGURAÇÕES GERAIS, TRACKING, LGPD & BACKUP -->
      <div id="tab-settings" class="tab-content hidden p-6 sm:p-8 space-y-8">
        
        <!-- Bloco 1: E-mails e Notificações -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-xl">✉️</span>
            <h3 class="font-bold text-base text-slate-900">Recepção de Formulários & E-mails</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail de Destino dos Formulários</label>
              <input type="email" id="settingPublicEmail" value="${data.publicEmail || 'contato@seusite.com.br'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none bg-slate-50 focus:bg-white">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp de Contato Principal</label>
              <input type="text" id="settingWhatsappPhone" value="${data.whatsapp || '11999999999'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none bg-slate-50 focus:bg-white">
            </div>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="text-xs font-bold text-slate-900">Provedor de E-mail Transacional (Resend)</div>
              <div class="text-xs text-slate-500">Notificações automáticas instantâneas com taxa de entrega de 99.8%.</div>
            </div>
            <button onclick="alert('E-mail de teste enviado com sucesso para ' + (document.getElementById('settingPublicEmail').value || 'seu e-mail'));" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shrink-0">
              Enviar E-mail de Teste
            </button>
          </div>
        </div>

        <hr class="border-slate-200">

        <!-- Bloco 2: Widget Flutuante do WhatsApp -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-bold shadow-sm">
                💬
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-base text-slate-900">Botão Flutuante do WhatsApp</h4>
                  <span id="badge_wa_widget" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">● Ligado</span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">Botão pulsante no canto inferior direito do site com balão de boas-vindas para incentivar conversas imediatas.</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="switch_wa_widget" checked onchange="toggleWaWidgetSwitch(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Texto do Balão de Saudação</label>
              <input type="text" id="settingWaGreeting" value="Olá! Precisa de atendimento? Fale conosco no WhatsApp" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
              <p class="text-[11px] text-slate-400 mt-1">Exibido na caixinha de fala acima do botão verde.</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Mensagem Inicial do Cliente</label>
              <input type="text" id="settingWaMessage" value="Olá! Gostaria de mais informações sobre seus serviços." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
              <p class="text-[11px] text-slate-400 mt-1">Mensagem pré-digitada que abrirá no WhatsApp do visitante.</p>
            </div>
          </div>
        </div>

        <hr class="border-slate-200">

        <!-- Bloco 3: Métricas & Rastreamento (Google Analytics GA4 & Meta Pixel) -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              📊
            </div>
            <div>
              <h4 class="font-bold text-base text-slate-900">Métricas & Rastreamento de Anúncios</h4>
              <p class="text-xs text-slate-500 mt-0.5">Conecte suas ferramentas de análise e pixels para acompanhar acessos e anunciar no Google, Instagram e Facebook.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Google Analytics 4 (GA4 ID)</label>
              <input type="text" id="settingGoogleAnalytics" placeholder="G-XXXXXXXXXX" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
              <p class="text-[11px] text-slate-400 mt-1">Insira seu ID de medição do Google Analytics (começa com "G-").</p>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Meta Pixel ID (Facebook / Instagram Ads)</label>
              <input type="text" id="settingMetaPixel" placeholder="Ex: 123456789012345" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">
              <p class="text-[11px] text-slate-400 mt-1">Insira o código numérico do Pixel do Gerenciador de Anúncios da Meta.</p>
            </div>
          </div>
        </div>

        <hr class="border-slate-200">

        <!-- Bloco 4: Privacidade & LGPD (Cookies) -->
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg shadow-sm">
                🛡️
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-base text-slate-900">Aviso de Privacidade & LGPD (Cookies)</h4>
                  <span id="badge_lgpd_widget" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">● Ligado</span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">Barra elegante no rodapé informando a utilização de cookies para proteção de dados do visitante.</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="switch_lgpd_widget" checked onchange="toggleLgpdSwitch(this.checked)" class="sr-only peer">
              <div class="w-12 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Mensagem do Banner de Cookies</label>
            <textarea id="settingLgpdMessage" rows="2" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none">Utilizamos cookies essenciais para oferecer uma experiência personalizada e garantir a segurança do seu atendimento, conforme a Lei Geral de Proteção de Dados (LGPD).</textarea>
          </div>
        </div>

        <hr class="border-slate-200">

        <!-- Bloco 5: Cópia de Segurança & Restauração (Backup 1-Clique) -->
        <div class="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white space-y-4 border border-slate-800">
          <div class="flex items-center space-x-3">
            <span class="text-3xl">💾</span>
            <div>
              <h4 class="font-bold text-base text-white">Cópia de Segurança & Restauração (Backup 1-Clique)</h4>
              <p class="text-xs text-slate-400 mt-0.5">Faça download de todas as personalizações, fotos, textos e configurações em um único arquivo .json seguro, ou restaure um backup anterior.</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button onclick="exportSiteBackup()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-950/40 flex items-center gap-2">
              <span>📥</span> Baixar Backup Completo (.json)
            </button>

            <button onclick="document.getElementById('backupFileInput').click()" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2">
              <span>📂</span> Restaurar Backup (.json)
            </button>
            <input type="file" id="backupFileInput" accept=".json" class="hidden" onchange="restoreSiteBackup(event)">
          </div>
        </div>

        <!-- Botão Salvar Todas as Configurações -->
        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="saveSettingsData()" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition shadow-sm">
            Salvar Configurações Gerais
          </button>
        </div>

      </div>

      <!-- ABA: DOMÍNIO & DNS -->
      <div id="tab-domain" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Gerenciamento de Domínio Próprio & DNS</h3>
          <p class="text-xs text-slate-500 mt-1">
            Altere ou vincule um novo domínio ao seu site. Ao salvar, nosso sistema atualiza automaticamente o roteamento e a zona de servidores DNS para o seu endereço próprio.
          </p>
        </div>

        <!-- Domínio Atual -->
        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Domínio Atualmente Configurado</span>
            <span id="currentDomainDisplay" class="text-lg font-extrabold text-slate-900 font-mono block mt-1">
              ${data.customDomainName || 'Endereço Web Padrão'}
            </span>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Cloudflare DNS Ativo
          </span>
        </div>

        <!-- Formulário para Alterar Domínio -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h4 class="font-bold text-sm text-slate-900">Alterar Domínio do Site</h4>
          <p class="text-xs text-slate-600">
            Digite o novo domínio desejado. Você pode efetuar a consulta prévia de disponibilidade no Registro.br através da interface oficial isavail.
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              id="inputNewDomain"
              placeholder="Ex: meunovodominio.com.br"
              class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-slate-900 focus:outline-none"
            >
            <button
              type="button"
              onclick="checkDomainInMaster()"
              class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center justify-center shrink-0 shadow-sm"
            >
              🔍 Consultar Registro.br
            </button>
            <button
              type="button"
              id="btnChangeDomain"
              onclick="changeSiteDomain()"
              class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center shrink-0"
            >
              Salvar e Migrar Domínio
            </button>
          </div>

          <!-- Feedback de Disponibilidade do Registro.br -->
          <div id="masterDomainCheckFeedback" class="hidden p-4 rounded-xl border text-xs space-y-2"></div>

          <!-- Feedback da Migração e Servidores DNS Cloudflare -->
          <div id="masterDomainMigrationFeedback" class="hidden p-5 rounded-2xl border text-xs space-y-3"></div>
        </div>
      </div>

    </div>

  </main>

  <footer class="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
    Painel /master • Ambiente seguro com criptografia de ponta a ponta e alta disponibilidade.
  </footer>

  <script>
    // ==========================================
    // ESTADO E PERSISTÊNCIA DINÂMICA
    // ==========================================
    let selectedTemplate = localStorage.getItem('site_selected_template') || 'MODEL_A';

    const defaultOffModules = ['catalogo', 'faq', 'planos', 'cases', 'biolinks', 'comunicado', 'parceiros', 'simulador'];

    const defaultSections = {
      inicio: true,
      servicos: true,
      'como-funciona': true,
      sobre: true,
      galeria: true,
      depoimentos: true,
      artigos: true,
      contato: true,
      catalogo: false,
      faq: false,
      planos: false,
      cases: false,
      biolinks: false,
      comunicado: false,
      parceiros: false,
      simulador: false
    };

    let sectionsConfig = (function() {
      try {
        const stored = localStorage.getItem('site_sections_config');
        return stored ? JSON.parse(stored) : defaultSections;
      } catch(e) {
        return defaultSections;
      }
    })();

    let catalogProductsList = (function() {
      try {
        const stored = localStorage.getItem('site_catalog_products');
        return stored ? JSON.parse(stored) : ${safeJsonProducts};
      } catch(e) {
        return ${safeJsonProducts};
      }
    })();

    let faqList = (function() {
      try {
        const stored = localStorage.getItem('site_faq');
        return stored ? JSON.parse(stored) : ${safeJsonFaq};
      } catch(e) {
        return ${safeJsonFaq};
      }
    })();

    let plansList = (function() {
      try {
        const stored = localStorage.getItem('site_plans');
        return stored ? JSON.parse(stored) : ${safeJsonPlans};
      } catch(e) {
        return ${safeJsonPlans};
      }
    })();

    let casesList = (function() {
      try {
        const stored = localStorage.getItem('site_cases');
        return stored ? JSON.parse(stored) : ${safeJsonCases};
      } catch(e) {
        return ${safeJsonCases};
      }
    })();

    let bioLinksList = (function() {
      try {
        const stored = localStorage.getItem('site_biolinks');
        return stored ? JSON.parse(stored) : ${safeJsonBioLinks};
      } catch(e) {
        return ${safeJsonBioLinks};
      }
    })();

    let announcementConfig = (function() {
      try {
        const stored = localStorage.getItem('site_announcement');
        return stored ? JSON.parse(stored) : ${safeJsonAnnouncement};
      } catch(e) {
        return ${safeJsonAnnouncement};
      }
    })();

    let partnersList = (function() {
      try {
        const stored = localStorage.getItem('site_partners');
        return stored ? JSON.parse(stored) : ${safeJsonPartners};
      } catch(e) {
        return ${safeJsonPartners};
      }
    })();

    let simulatorConfig = (function() {
      try {
        const stored = localStorage.getItem('site_simulator');
        return stored ? JSON.parse(stored) : ${safeJsonSimulator};
      } catch(e) {
        return ${safeJsonSimulator};
      }
    })();

    let socialsConfig = (function() {
      try {
        const stored = localStorage.getItem('site_socials');
        return stored ? JSON.parse(stored) : ${safeJsonSocials};
      } catch(e) {
        return ${safeJsonSocials};
      }
    })();

    let servicesList = (function() {
      try {
        const stored = localStorage.getItem('site_services');
        return stored ? JSON.parse(stored) : ${safeJsonServices};
      } catch(e) {
        return ${safeJsonServices};
      }
    })();

    let testimonialsList = (function() {
      try {
        const stored = localStorage.getItem('site_testimonials');
        return stored ? JSON.parse(stored) : ${safeJsonTestimonials};
      } catch(e) {
        return ${safeJsonTestimonials};
      }
    })();

    let galleryList = (function() {
      try {
        const stored = localStorage.getItem('site_gallery');
        return stored ? JSON.parse(stored) : ${safeJsonGallery};
      } catch(e) {
        return ${safeJsonGallery};
      }
    })();

    // ==========================================
    // GERENCIAMENTO DE SEÇÕES MODULARES
    // ==========================================
    const sectionMetadata = [
      { id: 'inicio', title: 'Capa & Apresentação (Hero)', desc: 'Cabeçalho impactante, chamada para ação e badge de disponibilidade.', icon: '🎯' },
      { id: 'comunicado', title: 'Barra de Avisos de Topo', desc: 'Aviso de destaque no topo para novidades, feriados ou comunicados.', icon: '📢' },
      { id: 'parceiros', title: 'Parceiros, Clientes & Selos', desc: 'Marcas de empresas atendidas e selos de conformidade técnica.', icon: '🤝' },
      { id: 'servicos', title: 'Áreas de Atuação / Serviços', desc: 'Cards com as especialidades, descrições e botões de atendimento.', icon: '⚖️' },
      { id: 'catalogo', title: 'Catálogo de Produtos (Até 50 itens)', desc: 'Exiba seus produtos com foto, descrição, preço opcional e pedido no WhatsApp.', icon: '🛍️' },
      { id: 'planos', title: 'Tabela de Planos e Preços', desc: 'Pacotes estruturados com benefícios claros e contratação rápida.', icon: '💳' },
      { id: 'cases', title: 'Casos de Sucesso / Portfólio', desc: 'Demonstração de projetos entregues, resultados e fotos reais.', icon: '🏆' },
      { id: 'como-funciona', title: 'Como Funciona / Etapas', desc: 'Passo a passo do processo de atendimento do início ao resultado.', icon: '📋' },
      { id: 'sobre', title: 'Sobre o Profissional / Apresentação', desc: 'Foto de perfil, biografia institucional e credenciais.', icon: '👤' },
      { id: 'galeria', title: 'Galeria de Fotos', desc: 'Registros do consultório, instalações e espaço de atendimento com lightbox.', icon: '🖼️' },
      { id: 'depoimentos', title: 'Depoimentos de Clientes', desc: 'Cards de avaliações com fotos dos clientes, estrelas e depoimentos.', icon: '💬' },
      { id: 'faq', title: 'Central de Dúvidas / FAQ', desc: 'Perguntas frequentes interativas para quebrar objeções de clientes.', icon: '❓' },
      { id: 'simulador', title: 'Simulador de Atendimento Interativo', desc: 'Assistente para montagem de pré-orçamento com envio direto no WhatsApp.', icon: '🧮' },
      { id: 'biolinks', title: 'Página de Bio Link (/links)', desc: 'Página estilo Linktree próprio com links para redes sociais e WhatsApp.', icon: '🔗' },
      { id: 'artigos', title: 'Artigos & Orientações', desc: 'Artigos técnicos e orientações com tempo de leitura estimado.', icon: '📰' },
      { id: 'contato', title: 'Formulário de Contato Direto', desc: 'Formulário completo para recebimento de mensagens e agendamentos.', icon: '📬' }
    ];

    function renderSectionsConfigUI() {
      const container = document.getElementById('sectionsConfigList');
      if (!container) return;

      let activeCount = 0;
      container.innerHTML = sectionMetadata.map(function(sec) {
        const isDefaultOff = defaultOffModules.includes(sec.id);
        const isActive = isDefaultOff
          ? sectionsConfig[sec.id] === true
          : sectionsConfig[sec.id] !== false;
        if (isActive) activeCount++;

        return '<div class="p-5 rounded-2xl border ' + (isActive ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 opacity-70') + ' transition flex items-center justify-between gap-4">' +
          '<div class="flex items-start space-x-3.5">' +
            '<span class="text-2xl">' + sec.icon + '</span>' +
            '<div>' +
              '<div class="flex items-center gap-2">' +
                '<h4 class="font-bold text-sm text-slate-900">' + sec.title + '</h4>' +
                '<span class="text-[10px] px-2 py-0.5 rounded-full font-bold ' + (isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600') + '">' +
                  (isActive ? '● Ativo no Site' : '○ Oculto') +
                '</span>' +
              '</div>' +
              '<p class="text-xs text-slate-500 mt-1">' + sec.desc + '</p>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="relative inline-flex items-center cursor-pointer">' +
              '<input type="checkbox" data-sec-id="' + sec.id + '" ' + (isActive ? 'checked' : '') + ' onchange="toggleSection(this.dataset.secId, this.checked)" class="sr-only peer">' +
              '<div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\\\'\\\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>' +
            '</label>' +
          '</div>' +
        '</div>';
      }).join('');

      const badge = document.getElementById('activeModulesCount');
      if (badge) badge.innerText = activeCount + '/' + sectionMetadata.length;
    }

    function toggleSection(secId, isChecked) {
      sectionsConfig[secId] = isChecked;
      renderSectionsConfigUI();
      if (secId === 'catalogo') syncCatalogActivationUI();
      if (secId === 'faq') syncFaqActivationUI();
      if (secId === 'planos') syncPlansActivationUI();
      if (secId === 'cases') syncCasesActivationUI();
      if (secId === 'biolinks') syncBioLinksActivationUI();
      if (secId === 'comunicado') syncAnnouncementActivationUI();
      if (secId === 'parceiros') syncPartnersActivationUI();
      if (secId === 'simulador') syncSimulatorActivationUI();
      saveSectionsConfig(false);
    }

    function saveSectionsConfig(showAlert = true) {
      localStorage.setItem('site_sections_config', JSON.stringify(sectionsConfig));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando módulos...';
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) {
          alert('Configuração de módulos salva! Ao abrir ou atualizar o site principal, as seções marcadas já estarão atualizadas.');
        }
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DO CATÁLOGO DE PRODUTOS (ATÉ 50 ITENS)
    // ==========================================
    function isCatalogActive() {
      return sectionsConfig && sectionsConfig['catalogo'] === true;
    }

    function syncCatalogActivationUI() {
      const active = isCatalogActive();
      const sw = document.getElementById('catalogActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('catalogStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const notice = document.getElementById('catalogStatusNotice');
      if (notice) {
        notice.innerText = active
          ? 'O catálogo de produtos está ATIVADO e visível para os visitantes no site público.'
          : 'Esta opção inicia desligada. Ligue o interruptor ao lado para que a seção de produtos e o link apareçam no site público.';
      }

      const banner = document.getElementById('catalogStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }

      const metricStatus = document.getElementById('catalogMetricStatus');
      if (metricStatus) {
        metricStatus.innerText = active ? '● Ativo no site' : '○ Desligado no site';
        metricStatus.className = 'text-xs font-semibold mt-1 ' + (active ? 'text-emerald-600' : 'text-slate-500');
      }

      const metricCount = document.getElementById('catalogCountMetric');
      if (metricCount) {
        metricCount.innerText = catalogProductsList.length + '/50';
      }
    }

    function toggleCatalogActivationFromTab(isChecked) {
      sectionsConfig['catalogo'] = isChecked;
      renderSectionsConfigUI();
      syncCatalogActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Catálogo ativado!' : 'Catálogo desligado!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderCatalogUI() {
      syncCatalogActivationUI();
      const container = document.getElementById('catalogContainer');
      const capacityBadge = document.getElementById('catalogCapacityBadge');
      const capacityFooter = document.getElementById('catalogCapacityFooter');
      const btnAdd = document.getElementById('btnAddProduct');
      const count = catalogProductsList.length;

      if (capacityBadge) {
        capacityBadge.innerText = count + ' de 50 produtos cadastrados';
        capacityBadge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' +
          (count >= 50 ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-indigo-50 border border-indigo-200 text-indigo-700');
      }

      if (capacityFooter) {
        capacityFooter.innerHTML = 'Capacidade: <strong>' + count + '/50 produtos</strong>' +
          (count >= 50 ? ' <span class="text-rose-600 font-bold">(Limite máximo atingido)</span>' : '');
      }

      if (btnAdd) {
        if (count >= 50) {
          btnAdd.classList.add('opacity-50', 'cursor-not-allowed');
          btnAdd.title = 'Limite máximo de 50 produtos atingido';
        } else {
          btnAdd.classList.remove('opacity-50', 'cursor-not-allowed');
          btnAdd.title = '';
        }
      }

      if (!container) return;

      if (count === 0) {
        container.innerHTML = '<div class="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-3">' +
          '<div class="text-4xl">🛍️</div>' +
          '<h4 class="font-bold text-slate-800 text-sm">Nenhum produto cadastrado no catálogo</h4>' +
          '<p class="text-xs text-slate-500 max-w-md mx-auto">Cadastre até 50 produtos com foto, título, descrição e preço opcional. Quando ativado, os visitantes poderão pedir diretamente no WhatsApp.</p>' +
          '<button onclick="addProductCard()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition">' +
            '+ Adicionar Primeiro Produto' +
          '</button>' +
        '</div>';
        return;
      }

      container.innerHTML = catalogProductsList.map(function(p, idx) {
        const img = p.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Produto #' + (idx + 1) + '</span>' +
            '<button onclick="deleteProductCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir' +
            '</button>' +
          '</div>' +
          '<div class="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative group/img">' +
            '<img id="prodImgPreview_' + idx + '" src="' + img + '" class="w-full h-full object-cover">' +
            '<label class="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition cursor-pointer text-xs font-bold">' +
              '📷 Trocar Foto' +
              '<input type="file" accept="image/*" class="hidden" onchange="handleProductPhotoUpload(event, ' + idx + ')">' +
            '</label>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nome do Produto *</label>' +
            '<input type="text" name="title" value="' + (p.title || '') + '" oninput="updateProductItem(' + idx + ', this.name, this.value)" placeholder="Ex: Planner Anual" class="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Descrição</label>' +
            '<textarea rows="2" name="description" oninput="updateProductItem(' + idx + ', this.name, this.value)" placeholder="Detalhes, diferenciais e materiais..." class="w-full px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg">' + (p.description || '') + '</textarea>' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Preço (Opcional)</label>' +
              '<input type="text" name="price" value="' + (p.price || '') + '" oninput="updateProductItem(' + idx + ', this.name, this.value)" placeholder="Ex: R$ 99,00" class="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Texto do Botão</label>' +
              '<input type="text" name="ctaText" value="' + (p.ctaText || 'Pedir pelo WhatsApp') + '" oninput="updateProductItem(' + idx + ', this.name, this.value)" placeholder="Pedir pelo WhatsApp" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">URL da Foto</label>' +
            '<input type="url" name="imageUrl" value="' + (p.imageUrl || '') + '" oninput="updateProductItem(' + idx + ', this.name, this.value); const el = document.getElementById(\\\'prodImgPreview_' + idx + '\\\'); if (el) el.src = this.value || \\\'' + img + '\\\';" placeholder="https://..." class="w-full px-2 py-1 text-[11px] font-mono bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addProductCard() {
      if (catalogProductsList.length >= 50) {
        alert('Limite máximo de 50 produtos atingido! Você não pode cadastrar mais de 50 produtos.');
        return;
      }
      catalogProductsList.push({
        title: 'Novo Produto ' + (catalogProductsList.length + 1),
        description: 'Descrição detalhada com diferenciais e especificações de alta qualidade.',
        price: 'R$ 99,00',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        ctaText: 'Pedir pelo WhatsApp'
      });
      renderCatalogUI();
      saveCatalogData(false);
    }

    function deleteProductCard(idx) {
      if (confirm('Deseja realmente excluir este produto do catálogo?')) {
        catalogProductsList.splice(idx, 1);
        renderCatalogUI();
        saveCatalogData(false);
      }
    }

    function updateProductItem(idx, field, value) {
      if (catalogProductsList[idx]) {
        catalogProductsList[idx][field] = value;
      }
    }

    function handleProductPhotoUpload(event, idx) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        catalogProductsList[idx].imageUrl = dataUrl;
        const imgEl = document.getElementById('prodImgPreview_' + idx);
        if (imgEl) imgEl.src = dataUrl;
        saveCatalogData(false);
      };
      reader.readAsDataURL(file);
    }

    function saveCatalogData(showAlert = true) {
      localStorage.setItem('site_catalog_products', JSON.stringify(catalogProductsList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando produtos...';
      syncCatalogActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) {
          const isAct = isCatalogActive();
          const avisoAtivacao = isAct
            ? 'Os produtos estão ATIVOS e sincronizados no site público!'
            : 'Os produtos foram salvos! Lembre-se de ativar o interruptor do Catálogo para que ele apareça no site.';
          alert('Catálogo de produtos salvo com sucesso! ' + avisoAtivacao);
        }
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DA CENTRAL DE DÚVIDAS / FAQ
    // ==========================================
    function isFaqActive() {
      return sectionsConfig && sectionsConfig['faq'] === true;
    }

    function syncFaqActivationUI() {
      const active = isFaqActive();
      const sw = document.getElementById('faqActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('faqStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const notice = document.getElementById('faqStatusNotice');
      if (notice) {
        notice.innerText = active
          ? 'A Central de Dúvidas está ATIVADA e visível no site público.'
          : 'Esta opção inicia desligada. Ligue o interruptor ao lado para que a seção de perguntas frequentes e o menu apareçam no site público.';
      }

      const banner = document.getElementById('faqStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function toggleFaqActivationFromTab(isChecked) {
      sectionsConfig['faq'] = isChecked;
      renderSectionsConfigUI();
      syncFaqActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'FAQ ativado!' : 'FAQ desligado!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderFaqUI() {
      syncFaqActivationUI();
      const container = document.getElementById('faqContainer');
      if (!container) return;

      if (!faqList || faqList.length === 0) {
        container.innerHTML = '<div class="py-10 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 space-y-2">' +
          '<div class="text-3xl">❓</div>' +
          '<p class="text-xs text-slate-500">Nenhuma pergunta frequente cadastrada.</p>' +
          '<button onclick="addFaqCard()" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition">+ Adicionar Pergunta</button>' +
        '</div>';
        return;
      }

      container.innerHTML = faqList.map(function(item, idx) {
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-slate-800 bg-slate-200 px-2 py-0.5 rounded">Pergunta #' + (idx + 1) + '</span>' +
            '<button onclick="deleteFaqCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir' +
            '</button>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Pergunta *</label>' +
            '<input type="text" value="' + (item.question || '') + '" oninput="updateFaqItem(' + idx + ', \\\'question\\\', this.value)" placeholder="Ex: Qual o valor e como funciona a consulta?" class="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Resposta *</label>' +
            '<textarea rows="3" oninput="updateFaqItem(' + idx + ', \\\'answer\\\', this.value)" placeholder="Explicação clara e objetiva para o cliente..." class="w-full px-3 py-2 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg">' + (item.answer || '') + '</textarea>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addFaqCard() {
      faqList.push({
        question: 'Nova pergunta frequente ' + (faqList.length + 1),
        answer: 'Resposta detalhada explicando o procedimento, benefícios e formas de contato.'
      });
      renderFaqUI();
      saveFaqData(false);
    }

    function deleteFaqCard(idx) {
      if (confirm('Deseja excluir esta pergunta?')) {
        faqList.splice(idx, 1);
        renderFaqUI();
        saveFaqData(false);
      }
    }

    function updateFaqItem(idx, field, value) {
      if (faqList[idx]) {
        faqList[idx][field] = value;
      }
    }

    function saveFaqData(showAlert = true) {
      localStorage.setItem('site_faq', JSON.stringify(faqList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando dúvidas...';
      syncFaqActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Central de Dúvidas / FAQ salva com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE PLANOS & PREÇOS
    // ==========================================
    function isPlansActive() {
      return sectionsConfig && sectionsConfig['planos'] === true;
    }

    function syncPlansActivationUI() {
      const active = isPlansActive();
      const sw = document.getElementById('plansActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('plansStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('plansStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function togglePlansActivationFromTab(isChecked) {
      sectionsConfig['planos'] = isChecked;
      renderSectionsConfigUI();
      syncPlansActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Planos ativados!' : 'Planos desligados!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderPlansUI() {
      syncPlansActivationUI();
      const container = document.getElementById('plansContainer');
      if (!container) return;

      container.innerHTML = plansList.map(function(p, idx) {
        const featuresText = Array.isArray(p.features) ? p.features.join('\\n') : '';
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">Plano #' + (idx + 1) + '</span>' +
            '<button onclick="deletePlanCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir' +
            '</button>' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Título *</label>' +
              '<input type="text" value="' + (p.title || '') + '" oninput="updatePlanItem(' + idx + ', \\\'title\\\', this.value)" class="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Badge (Ex: Mais Escolhido)</label>' +
              '<input type="text" value="' + (p.badge || '') + '" oninput="updatePlanItem(' + idx + ', \\\'badge\\\', this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Preço (Ex: R$ 250)</label>' +
              '<input type="text" value="' + (p.price || '') + '" oninput="updatePlanItem(' + idx + ', \\\'price\\\', this.value)" class="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Período (Ex: por mês)</label>' +
              '<input type="text" value="' + (p.period || '') + '" oninput="updatePlanItem(' + idx + ', \\\'period\\\', this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Descrição Curta</label>' +
            '<input type="text" value="' + (p.description || '') + '" oninput="updatePlanItem(' + idx + ', \\\'description\\\', this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Recursos Inclusos (1 por linha)</label>' +
            '<textarea rows="3" oninput="updatePlanFeatures(' + idx + ', this.value)" placeholder="Recurso 1\\nRecurso 2\\nRecurso 3" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono">' + featuresText + '</textarea>' +
          '</div>' +
          '<div class="flex items-center justify-between pt-2 border-t border-slate-200">' +
            '<label class="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">' +
              '<input type="checkbox" ' + (p.highlight ? 'checked' : '') + ' onchange="updatePlanItem(' + idx + ', \\\'highlight\\\', this.checked)" class="rounded text-indigo-600">' +
              'Destaque Visual (Recomendado)' +
            '</label>' +
            '<input type="text" value="' + (p.ctaText || 'Contratar') + '" oninput="updatePlanItem(' + idx + ', \\\'ctaText\\\', this.value)" placeholder="Texto Botão" class="w-28 px-2 py-1 text-xs bg-white border border-slate-300 rounded-lg text-right">' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addPlanCard() {
      plansList.push({
        title: 'Novo Plano ' + (plansList.length + 1),
        badge: 'Opcional',
        price: 'R$ 350',
        period: 'por atendimento',
        description: 'Pacote completo de acompanhamento e suporte.',
        features: ['Diagnóstico aprofundado', 'Suporte dedicado via WhatsApp', 'Retorno programado'],
        ctaText: 'Escolher Plano',
        highlight: false
      });
      renderPlansUI();
      savePlansData(false);
    }

    function deletePlanCard(idx) {
      if (confirm('Deseja excluir este plano?')) {
        plansList.splice(idx, 1);
        renderPlansUI();
        savePlansData(false);
      }
    }

    function updatePlanItem(idx, field, value) {
      if (plansList[idx]) {
        plansList[idx][field] = value;
      }
    }

    function updatePlanFeatures(idx, rawText) {
      if (plansList[idx]) {
        plansList[idx].features = rawText.split('\\n').map(s => s.trim()).filter(Boolean);
      }
    }

    function savePlansData(showAlert = true) {
      localStorage.setItem('site_plans', JSON.stringify(plansList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando planos...';
      syncPlansActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Planos e Preços salvos com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE CASOS DE SUCESSO
    // ==========================================
    function isCasesActive() {
      return sectionsConfig && sectionsConfig['cases'] === true;
    }

    function syncCasesActivationUI() {
      const active = isCasesActive();
      const sw = document.getElementById('casesActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('casesStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('casesStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function toggleCasesActivationFromTab(isChecked) {
      sectionsConfig['cases'] = isChecked;
      renderSectionsConfigUI();
      syncCasesActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Cases ativados!' : 'Cases desligados!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderCasesUI() {
      syncCasesActivationUI();
      const container = document.getElementById('casesContainer');
      if (!container) return;

      container.innerHTML = casesList.map(function(c, idx) {
        const img = c.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Caso #' + (idx + 1) + '</span>' +
            '<button onclick="deleteCaseCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir' +
            '</button>' +
          '</div>' +
          '<div class="aspect-[16/9] rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative group/img">' +
            '<img id="caseImgPreview_' + idx + '" src="' + img + '" class="w-full h-full object-cover">' +
            '<label class="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition cursor-pointer text-xs font-bold">' +
              '📷 Trocar Foto' +
              '<input type="file" accept="image/*" class="hidden" onchange="handleCasePhotoUpload(event, ' + idx + ')">' +
            '</label>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Título do Projeto *</label>' +
            '<input type="text" value="' + (c.title || '') + '" oninput="updateCaseItem(' + idx + ', \\\'title\\\', this.value)" class="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Categoria</label>' +
              '<input type="text" value="' + (c.category || '') + '" oninput="updateCaseItem(' + idx + ', \\\'category\\\', this.value)" placeholder="Ex: Consultoria" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Métrica / Resultado</label>' +
              '<input type="text" value="' + (c.resultBadge || '') + '" oninput="updateCaseItem(' + idx + ', \\\'resultBadge\\\', this.value)" placeholder="Ex: +140% Resultados" class="w-full px-3 py-1.5 text-xs font-bold text-emerald-700 bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Descrição</label>' +
            '<textarea rows="2" oninput="updateCaseItem(' + idx + ', \\\'description\\\', this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' + (c.description || '') + '</textarea>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addCaseCard() {
      casesList.push({
        title: 'Novo Caso de Sucesso ' + (casesList.length + 1),
        category: 'Atendimento Especializado',
        resultBadge: 'Alta Satisfação',
        description: 'Mapeamento estratégico e acompanhamento dedicado gerando resultados comprovados.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        ctaText: 'Ver Detalhes'
      });
      renderCasesUI();
      saveCasesData(false);
    }

    function deleteCaseCard(idx) {
      if (confirm('Deseja excluir este caso?')) {
        casesList.splice(idx, 1);
        renderCasesUI();
        saveCasesData(false);
      }
    }

    function updateCaseItem(idx, field, value) {
      if (casesList[idx]) {
        casesList[idx][field] = value;
      }
    }

    function handleCasePhotoUpload(event, idx) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        casesList[idx].imageUrl = dataUrl;
        const imgEl = document.getElementById('caseImgPreview_' + idx);
        if (imgEl) imgEl.src = dataUrl;
        saveCasesData(false);
      };
      reader.readAsDataURL(file);
    }

    function saveCasesData(showAlert = true) {
      localStorage.setItem('site_cases', JSON.stringify(casesList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando cases...';
      syncCasesActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Casos de sucesso salvos com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE BIO LINKS (/links)
    // ==========================================
    function isBioLinksActive() {
      return sectionsConfig && sectionsConfig['biolinks'] === true;
    }

    function syncBioLinksActivationUI() {
      const active = isBioLinksActive();
      const sw = document.getElementById('bioLinksActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('bioLinksStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('bioLinksStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function toggleBioLinksActivationFromTab(isChecked) {
      sectionsConfig['biolinks'] = isChecked;
      renderSectionsConfigUI();
      syncBioLinksActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'BioLink ativado!' : 'BioLink desligado!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderBioLinksUI() {
      syncBioLinksActivationUI();
      const container = document.getElementById('bioLinksContainer');
      if (!container) return;

      container.innerHTML = bioLinksList.map(function(link, idx) {
        return '<div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
          '<div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Texto do Botão *</label>' +
              '<input type="text" value="' + (link.label || '') + '" oninput="updateBioLinkItem(' + idx + ', \\\'label\\\', this.value)" class="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Destino (URL ou #ancora) *</label>' +
              '<input type="text" value="' + (link.url || '') + '" oninput="updateBioLinkItem(' + idx + ', \\\'url\\\', this.value)" class="w-full px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div class="flex items-center gap-3 shrink-0">' +
            '<label class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">' +
              '<input type="checkbox" ' + (link.isHighlight ? 'checked' : '') + ' onchange="updateBioLinkItem(' + idx + ', \\\'isHighlight\\\', this.checked)" class="rounded text-emerald-600">' +
              'Destaque' +
            '</label>' +
            '<button onclick="deleteBioLinkCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold">' +
              '🗑️' +
            '</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addBioLinkCard() {
      bioLinksList.push({
        label: 'Novo Link Importante',
        url: '#contato',
        icon: 'Link',
        isHighlight: false
      });
      renderBioLinksUI();
      saveBioLinksData(false);
    }

    function deleteBioLinkCard(idx) {
      if (confirm('Deseja excluir este botão da Bio?')) {
        bioLinksList.splice(idx, 1);
        renderBioLinksUI();
        saveBioLinksData(false);
      }
    }

    function updateBioLinkItem(idx, field, value) {
      if (bioLinksList[idx]) {
        bioLinksList[idx][field] = value;
      }
    }

    function saveBioLinksData(showAlert = true) {
      localStorage.setItem('site_biolinks', JSON.stringify(bioLinksList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando links da bio...';
      syncBioLinksActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Links da Bio salvos com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE REDES SOCIAIS NO RODAPÉ
    // ==========================================
    function renderSocialsUI() {
      const networks = ['instagram', 'tiktok', 'facebook', 'youtube'];
      let activeCount = 0;
      let previewHtml = '';

      networks.forEach(function(net) {
        if (!socialsConfig[net]) socialsConfig[net] = { active: false, url: '' };
        const item = socialsConfig[net];
        const isAct = item.active === true;
        if (isAct && item.url) activeCount++;

        const sw = document.getElementById('switch_' + net);
        if (sw) sw.checked = isAct;

        const input = document.getElementById('url_' + net);
        if (input) input.value = item.url || '';

        const badge = document.getElementById('badge_' + net);
        if (badge) {
          badge.innerText = isAct ? '● Ativo' : '○ Desligado';
          badge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full ' + 
            (isAct ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600');
        }

        if (isAct && item.url) {
          previewHtml += buildPreviewIcon(net, item.url);
        }
      });

      const countBadge = document.getElementById('socialsActiveCountBadge');
      if (countBadge) {
        countBadge.innerText = activeCount + ' ' + (activeCount === 1 ? 'rede ativa' : 'redes ativas');
        countBadge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' +
          (activeCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const previewContainer = document.getElementById('socialsPreviewContainer');
      if (previewContainer) {
        previewContainer.innerHTML = previewHtml || '<span class="text-xs text-slate-500 italic">Nenhuma rede social ativa no momento</span>';
      }
    }

    function buildPreviewIcon(net, url) {
      if (net === 'instagram') {
        return '<a href="' + url + '" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-white transition-all transform hover:scale-110 shadow-sm border border-white/15" title="Instagram">' +
          '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' +
        '</a>';
      }
      if (net === 'tiktok') {
        return '<a href="' + url + '" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-black hover:border-white/40 text-white transition-all transform hover:scale-110 shadow-sm border border-white/15" title="TikTok">' +
          '<svg class="w-4 h-4 fill-current text-[#25f4ee]" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>' +
        '</a>';
      }
      if (net === 'facebook') {
        return '<a href="' + url + '" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#1877f2] hover:border-[#1877f2] text-white transition-all transform hover:scale-110 shadow-sm border border-white/15" title="Facebook">' +
          '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
        '</a>';
      }
      if (net === 'youtube') {
        return '<a href="' + url + '" target="_blank" class="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#ff0000] hover:border-[#ff0000] text-white transition-all transform hover:scale-110 shadow-sm border border-white/15" title="YouTube">' +
          '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' +
        '</a>';
      }
      return '';
    }

    function toggleSocialItem(net, isChecked) {
      if (!socialsConfig[net]) socialsConfig[net] = { active: false, url: '' };
      socialsConfig[net].active = isChecked;
      renderSocialsUI();
      saveSocialsData(false);
    }

    function updateSocialUrl(net, value) {
      if (!socialsConfig[net]) socialsConfig[net] = { active: false, url: '' };
      socialsConfig[net].url = value;
      renderSocialsUI();
    }

    function saveSocialsData(showAlert = true) {
      localStorage.setItem('site_socials', JSON.stringify(socialsConfig));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando redes sociais...';
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) {
          alert('Configurações de redes sociais salvas com sucesso! Ao abrir ou atualizar o site principal (/), os ícones já estarão exibidos no rodapé.');
        }
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DA BARRA DE AVISOS DE TOPO
    // ==========================================
    function isAnnouncementActive() {
      return sectionsConfig && sectionsConfig['comunicado'] === true;
    }

    function syncAnnouncementActivationUI() {
      const active = isAnnouncementActive();
      const sw = document.getElementById('announcementActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('announcementStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('announcementStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function toggleAnnouncementActivationFromTab(isChecked) {
      sectionsConfig['comunicado'] = isChecked;
      announcementConfig.active = isChecked;
      renderSectionsConfigUI();
      syncAnnouncementActivationUI();
      saveSectionsConfig(false);
      saveAnnouncementData(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Barra de avisos ativada!' : 'Barra de avisos desligada!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderAnnouncementUI() {
      syncAnnouncementActivationUI();
      const bInput = document.getElementById('announcementBadgeInput');
      const tInput = document.getElementById('announcementTextInput');
      const ltInput = document.getElementById('announcementLinkTextInput');
      const luInput = document.getElementById('announcementLinkUrlInput');

      if (bInput) bInput.value = announcementConfig.badge || 'COMUNICADO';
      if (tInput) tInput.value = announcementConfig.text || '';
      if (ltInput) ltInput.value = announcementConfig.linkText || 'Falar no WhatsApp';
      if (luInput) luInput.value = announcementConfig.linkUrl || '';
    }

    function saveAnnouncementData(showAlert = true) {
      const bInput = document.getElementById('announcementBadgeInput');
      const tInput = document.getElementById('announcementTextInput');
      const ltInput = document.getElementById('announcementLinkTextInput');
      const luInput = document.getElementById('announcementLinkUrlInput');

      if (bInput) announcementConfig.badge = bInput.value.trim();
      if (tInput) announcementConfig.text = tInput.value.trim();
      if (ltInput) announcementConfig.linkText = ltInput.value.trim();
      if (luInput) announcementConfig.linkUrl = luInput.value.trim();
      announcementConfig.active = isAnnouncementActive();

      localStorage.setItem('site_announcement', JSON.stringify(announcementConfig));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando aviso...';
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Barra de avisos salva com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE PARCEIROS & CERTIFICAÇÕES
    // ==========================================
    function isPartnersActive() {
      return sectionsConfig && sectionsConfig['parceiros'] === true;
    }

    function syncPartnersActivationUI() {
      const active = isPartnersActive();
      const sw = document.getElementById('partnersActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('partnersStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('partnersStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function togglePartnersActivationFromTab(isChecked) {
      sectionsConfig['parceiros'] = isChecked;
      renderSectionsConfigUI();
      syncPartnersActivationUI();
      saveSectionsConfig(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Parceiros ativados!' : 'Parceiros desligados!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderPartnersUI() {
      syncPartnersActivationUI();
      const container = document.getElementById('partnersContainer');
      if (!container) return;

      container.innerHTML = partnersList.map(function(item, idx) {
        const logo = item.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
        return '<div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 relative">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">Marca #' + (idx + 1) + '</span>' +
            '<button onclick="deletePartnerCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold">' +
              '🗑️' +
            '</button>' +
          '</div>' +
          '<div class="flex items-center gap-3">' +
            '<img id="partnerLogoPreview_' + idx + '" src="' + logo + '" class="w-12 h-12 rounded-lg object-cover border border-slate-300 bg-white p-1">' +
            '<div class="flex-1">' +
              '<input type="file" accept="image/*" onchange="handlePartnerLogoUpload(event, ' + idx + ')" class="text-[11px] text-slate-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:bg-slate-900 file:text-white">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Nome da Marca / Entidade</label>' +
            '<input type="text" value="' + (item.name || '') + '" oninput="updatePartnerItem(' + idx + ', \\\'name\\\', this.value)" class="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Tipo (Cliente, Parceiro, Certificação)</label>' +
            '<select onchange="updatePartnerItem(' + idx + ', \\\'type\\\', this.value)" class="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded-lg">' +
              '<option value="Cliente" ' + (item.type === 'Cliente' ? 'selected' : '') + '>Cliente Corporativo</option>' +
              '<option value="Parceiro" ' + (item.type === 'Parceiro' ? 'selected' : '') + '>Parceiro Estratégico</option>' +
              '<option value="Certificação" ' + (item.type === 'Certificação' ? 'selected' : '') + '>Selo de Certificação</option>' +
            '</select>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function addPartnerCard() {
      partnersList.push({
        name: 'Nova Empresa Parceira',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
        type: 'Cliente'
      });
      renderPartnersUI();
      savePartnersData(false);
    }

    function deletePartnerCard(idx) {
      if (confirm('Deseja excluir esta marca?')) {
        partnersList.splice(idx, 1);
        renderPartnersUI();
        savePartnersData(false);
      }
    }

    function updatePartnerItem(idx, field, value) {
      if (partnersList[idx]) {
        partnersList[idx][field] = value;
      }
    }

    function handlePartnerLogoUpload(event, idx) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        partnersList[idx].logoUrl = dataUrl;
        const imgEl = document.getElementById('partnerLogoPreview_' + idx);
        if (imgEl) imgEl.src = dataUrl;
        savePartnersData(false);
      };
      reader.readAsDataURL(file);
    }

    function savePartnersData(showAlert = true) {
      localStorage.setItem('site_partners', JSON.stringify(partnersList));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando marcas...';
      syncPartnersActivationUI();
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Parceiros e certificações salvos com sucesso!');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DO SIMULADOR DE ATENDIMENTO
    // ==========================================
    function isSimulatorActive() {
      return sectionsConfig && sectionsConfig['simulador'] === true;
    }

    function syncSimulatorActivationUI() {
      const active = isSimulatorActive();
      const sw = document.getElementById('simulatorActivationSwitch');
      if (sw) sw.checked = active;

      const badge = document.getElementById('simulatorStatusBadge');
      if (badge) {
        badge.innerText = active ? '● Ativo no Site' : '○ Desligado';
        badge.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full ' + (active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700');
      }

      const banner = document.getElementById('simulatorStatusBanner');
      if (banner) {
        banner.className = 'p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ' +
          (active ? 'bg-emerald-50/70 border-emerald-200' : 'bg-slate-50 border-slate-200');
      }
    }

    function toggleSimulatorActivationFromTab(isChecked) {
      sectionsConfig['simulador'] = isChecked;
      simulatorConfig.active = isChecked;
      renderSectionsConfigUI();
      syncSimulatorActivationUI();
      saveSectionsConfig(false);
      saveSimulatorData(false);
      const b = document.getElementById('saveBadge');
      if (b) {
        b.innerText = isChecked ? 'Simulador ativado!' : 'Simulador desligado!';
        setTimeout(() => { b.innerText = '✓ Sincronizado'; }, 800);
      }
    }

    function renderSimulatorUI() {
      syncSimulatorActivationUI();
      const tInput = document.getElementById('simulatorTitleInput');
      const sInput = document.getElementById('simulatorSubtitleInput');
      if (tInput) tInput.value = simulatorConfig.title || 'Simulador de Atendimento Personalizado';
      if (sInput) sInput.value = simulatorConfig.subtitle || 'Escolha suas preferências e envie uma solicitação pronta no WhatsApp com 1 clique';
    }

    function saveSimulatorData(showAlert = true) {
      const tInput = document.getElementById('simulatorTitleInput');
      const sInput = document.getElementById('simulatorSubtitleInput');
      if (tInput) simulatorConfig.title = tInput.value.trim();
      if (sInput) simulatorConfig.subtitle = sInput.value.trim();
      simulatorConfig.active = isSimulatorActive();

      localStorage.setItem('site_simulator', JSON.stringify(simulatorConfig));
      const b = document.getElementById('saveBadge');
      if (b) b.innerText = 'Salvando simulador...';
      setTimeout(() => {
        if (b) b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Simulador de atendimento salvo com sucesso!');
      }, 300);
    }
    // GERENCIAMENTO DE CARDS DE SERVIÇOS
    // ==========================================
    function renderServicesUI() {
      const container = document.getElementById('servicesContainer');
      if (!container) return;

      container.innerHTML = servicesList.map(function(s, idx) {
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative group">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Área #' + (idx + 1) + '</span>' +
            '<button onclick="deleteServiceCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir Card' +
            '</button>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Título do Serviço</label>' +
            '<input type="text" name="title" value="' + (s.title || '') + '" oninput="updateServiceItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Descrição</label>' +
            '<textarea rows="3" name="shortDescription" oninput="updateServiceItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg">' + (s.shortDescription || '') + '</textarea>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Texto do Botão (CTA)</label>' +
            '<input type="text" name="ctaText" value="' + (s.ctaText || 'Saber mais') + '" oninput="updateServiceItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
        '</div>';
      }).join('');

      const m = document.getElementById('servicesCountMetric');
      if (m) m.innerText = servicesList.length;
    }

    function addServiceCard() {
      servicesList.push({
        title: 'Nova Área ou Serviço Especializado',
        shortDescription: 'Atendimento dedicado com metodologia estratégica e foco nas necessidades específicas do cliente.',
        ctaText: 'Agendar'
      });
      renderServicesUI();
      saveServicesData(false);
    }

    function deleteServiceCard(idx) {
      if (servicesList.length <= 1) {
        alert('Mantenha pelo menos 1 card cadastrado.');
        return;
      }
      if (confirm('Deseja excluir este card de serviço?')) {
        servicesList.splice(idx, 1);
        renderServicesUI();
        saveServicesData(false);
      }
    }

    function updateServiceItem(idx, field, value) {
      if (servicesList[idx]) {
        servicesList[idx][field] = value;
      }
    }

    function saveServicesData(showAlert = true) {
      localStorage.setItem('site_services', JSON.stringify(servicesList));
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando áreas...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Áreas de atuação salvas com sucesso! O novo número de cards já está sincronizado.');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DE DEPOIMENTOS DE CLIENTES
    // ==========================================
    function renderTestimonialsUI() {
      const container = document.getElementById('testimonialsContainer');
      if (!container) return;

      container.innerHTML = testimonialsList.map(function(t, idx) {
        const rating = t.rating || 5;
        const photo = t.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
        return '<div class="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 relative">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Depoimento #' + (idx + 1) + '</span>' +
            '<button onclick="deleteTestimonialCard(' + idx + ')" class="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1">' +
              '🗑️ Excluir' +
            '</button>' +
          '</div>' +
          '<div class="flex items-center space-x-3">' +
            '<img id="testImgPreview_' + idx + '" src="' + photo + '" class="w-12 h-12 rounded-full object-cover border border-slate-300">' +
            '<div class="flex-1">' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Foto do Cliente (Upload ou Link)</label>' +
              '<input type="file" accept="image/*" onchange="handleClientPhotoUpload(event, ' + idx + ')" class="text-[11px] text-slate-500 w-full file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:bg-slate-900 file:text-white">' +
            '</div>' +
          '</div>' +
          '<div class="grid grid-cols-2 gap-2">' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Nome do Cliente</label>' +
              '<input type="text" name="clientName" value="' + (t.clientName || '') + '" oninput="updateTestimonialItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-xs font-bold bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
            '<div>' +
              '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Papel / Qualificação</label>' +
              '<input type="text" name="role" value="' + (t.role || 'Cliente Atendido') + '" oninput="updateTestimonialItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Avaliação em Estrelas</label>' +
            '<select name="rating" onchange="updateTestimonialItem(' + idx + ', this.name, parseInt(this.value))" class="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg">' +
              '<option value="5" ' + (rating === 5 ? 'selected' : '') + '>★★★★★ (5 Estrelas)</option>' +
              '<option value="4" ' + (rating === 4 ? 'selected' : '') + '>★★★★☆ (4 Estrelas)</option>' +
              '<option value="3" ' + (rating === 3 ? 'selected' : '') + '>★★★☆☆ (3 Estrelas)</option>' +
            '</select>' +
          '</div>' +
          '<div>' +
            '<label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Depoimento Curto</label>' +
            '<textarea rows="3" name="content" oninput="updateTestimonialItem(' + idx + ', this.name, this.value)" class="w-full px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg">' + (t.content || '') + '</textarea>' +
          '</div>' +
        '</div>';
      }).join('');

      const m = document.getElementById('testimonialsCountMetric');
      if (m) m.innerText = testimonialsList.length;
    }

    function addTestimonialCard() {
      testimonialsList.push({
        clientName: 'Novo Cliente Satisfeito',
        role: 'Atendimento Individual',
        content: 'Excelente profissional! Superou todas as expectativas com rigor técnico, pontualidade e acolhimento humano exemplar.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        rating: 5
      });
      renderTestimonialsUI();
      saveTestimonialsData(false);
    }

    function deleteTestimonialCard(idx) {
      if (testimonialsList.length <= 1) {
        alert('Mantenha pelo menos 1 depoimento ou desative a seção de depoimentos na aba Módulos.');
        return;
      }
      if (confirm('Deseja remover este depoimento?')) {
        testimonialsList.splice(idx, 1);
        renderTestimonialsUI();
        saveTestimonialsData(false);
      }
    }

    function updateTestimonialItem(idx, field, value) {
      if (testimonialsList[idx]) {
        testimonialsList[idx][field] = value;
      }
    }

    function handleClientPhotoUpload(event, idx) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        testimonialsList[idx].photoUrl = dataUrl;
        const imgEl = document.getElementById('testImgPreview_' + idx);
        if (imgEl) imgEl.src = dataUrl;
        saveTestimonialsData(false);
      };
      reader.readAsDataURL(file);
    }

    function saveTestimonialsData(showAlert = true) {
      localStorage.setItem('site_testimonials', JSON.stringify(testimonialsList));
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando depoimentos...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Depoimentos salvos com sucesso! As avaliações já estão atualizadas no site público.');
      }, 300);
    }

    // ==========================================
    // GERENCIAMENTO DA GALERIA DE FOTOS
    // ==========================================
    function renderGalleryUI() {
      const container = document.getElementById('galleryContainer');
      if (!container) return;

      container.innerHTML = galleryList.map(function(item, idx) {
        return '<div class="p-3 rounded-2xl border border-slate-200 bg-slate-50 space-y-2 relative group">' +
          '<div class="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-300">' +
            '<img src="' + item.url + '" class="w-full h-full object-cover">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold text-slate-500 uppercase">Título</label>' +
            '<input type="text" name="title" value="' + (item.title || '') + '" oninput="updateGalleryItem(' + idx + ', this.name, this.value)" class="w-full px-2 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<div>' +
            '<label class="block text-[10px] font-bold text-slate-500 uppercase">Legenda Opcional</label>' +
            '<input type="text" name="caption" value="' + (item.caption || '') + '" oninput="updateGalleryItem(' + idx + ', this.name, this.value)" class="w-full px-2 py-1 text-[11px] bg-white border border-slate-300 rounded-lg">' +
          '</div>' +
          '<button onclick="deleteGalleryPhoto(' + idx + ')" class="w-full py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-bold transition flex items-center justify-center gap-1">' +
            '🗑️ Excluir Foto' +
          '</button>' +
        '</div>';
      }).join('');

      const m = document.getElementById('galleryCountMetric');
      if (m) m.innerText = galleryList.length;
    }

    function handleNewGalleryUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        galleryList.push({
          url: dataUrl,
          title: file.name.replace(/\\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          caption: 'Registro do espaço e infraestrutura'
        });
        renderGalleryUI();
        saveGalleryData(false);
      };
      reader.readAsDataURL(file);
    }

    function addGalleryByUrlPrompt() {
      const url = prompt('Insira o link direto (URL) da imagem:');
      if (url && url.trim()) {
        const title = prompt('Título ou identificação da foto:', 'Espaço de Atendimento') || 'Espaço de Atendimento';
        galleryList.push({
          url: url.trim(),
          title: title,
          caption: 'Estrutura preparada para atendimento'
        });
        renderGalleryUI();
        saveGalleryData(false);
      }
    }

    function deleteGalleryPhoto(idx) {
      if (confirm('Deseja excluir esta foto da galeria?')) {
        galleryList.splice(idx, 1);
        renderGalleryUI();
        saveGalleryData(false);
      }
    }

    function updateGalleryItem(idx, field, value) {
      if (galleryList[idx]) {
        galleryList[idx][field] = value;
      }
    }

    function saveGalleryData(showAlert = true) {
      localStorage.setItem('site_gallery', JSON.stringify(galleryList));
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando galeria...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        if (showAlert) alert('Galeria de fotos atualizada e publicada no site principal!');
      }, 300);
    }

    // ==========================================
    // SELEÇÃO DE TABS & TEMPLATES
    // ==========================================
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-slate-500', 'border-transparent');
        btn.classList.remove('border-slate-900', 'text-slate-900', 'font-bold');
      });

      const activeTab = document.getElementById(tabId);
      const activeBtn = document.getElementById('btn-' + tabId);

      if (activeTab) activeTab.classList.remove('hidden');
      if (activeBtn) {
        activeBtn.classList.add('active', 'border-slate-900', 'text-slate-900', 'font-bold');
        activeBtn.classList.remove('text-slate-500', 'border-transparent');
      }
    }

    function initTemplateSelection() {
      selectTemplateOption(selectedTemplate, false);
    }

    function selectTemplateOption(model, updateVar = true) {
      if (updateVar) {
        selectedTemplate = model;
      }
      const opts = ['a', 'b', 'c', 'd'];
      opts.forEach(o => {
        const el = document.getElementById('opt-model-' + o);
        const badge = document.getElementById('badge-model-' + o);
        if (el && badge) {
          el.classList.remove('border-slate-900', 'bg-slate-50', 'shadow-md');
          el.classList.add('border-slate-200', 'bg-white');
          badge.classList.add('hidden');
          badge.classList.remove('flex');
        }
      });

      const target = model === 'MODEL_A' ? 'a' : model === 'MODEL_B' ? 'b' : model === 'MODEL_C' ? 'c' : 'd';
      const activeEl = document.getElementById('opt-model-' + target);
      const activeBadge = document.getElementById('badge-model-' + target);
      if (activeEl && activeBadge) {
        activeEl.classList.add('border-slate-900', 'bg-slate-50', 'shadow-md');
        activeEl.classList.remove('border-slate-200', 'bg-white');
        activeBadge.classList.remove('hidden');
        activeBadge.classList.add('flex');
      }
    }

    function applyTemplateChoice() {
      localStorage.setItem('site_selected_template', selectedTemplate);
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando template...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        alert('Template alterado com sucesso para o ' + selectedTemplate + '! Ao abrir ou atualizar o site principal (/), o novo design já estará ativo.');
      }, 300);
    }

    function handleFileUpload(event, previewImgId, inputUrlId) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const dataUrl = e.target.result;
        document.getElementById(previewImgId).src = dataUrl;
        document.getElementById(inputUrlId).value = dataUrl;
      };
      reader.readAsDataURL(file);
    }

    function triggerSave(msg) {
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        alert(msg || 'Dados salvos com sucesso!');
      }, 400);
    }

    // ==========================================
    // DOMÍNIO & DNS
    // ==========================================
    const CURRENT_SITE_ID = '${siteId || ''}';
    let currentDomain = localStorage.getItem('site_custom_domain') || '${data.customDomainName || ''}';

    function checkDomainInMaster() {
      const input = document.getElementById('inputNewDomain');
      const feedback = document.getElementById('masterDomainCheckFeedback');
      const val = input ? input.value.trim() : '';
      if (!val) {
        alert('Por favor, digite um domínio para consultar.');
        return;
      }

      feedback.classList.remove('hidden');
      feedback.className = 'p-4 rounded-xl border text-xs bg-slate-50 border-slate-200 text-slate-700';
      feedback.innerHTML = 'Consultando Registro.br...';

      fetch('/api/domain/check-availability?domain=' + encodeURIComponent(val))
        .then(res => res.json())
        .then(data => {
          if (data.available) {
            feedback.className = 'p-4 rounded-xl border text-xs bg-emerald-50 border-emerald-200 text-emerald-950';
            feedback.innerHTML = '<div class="font-bold text-sm">🎉 ' + (data.fqdn || val) + ' está disponível no Registro.br!</div>' +
              '<p class="mt-1">' + data.message + '</p>' +
              '<div class="mt-2"><a href="' + data.registrationUrl + '" target="_blank" class="inline-block px-3 py-1 bg-white text-emerald-900 border border-emerald-300 font-bold rounded-lg hover:bg-emerald-50">Abrir Registro.br para registrar ↗</a></div>';
          } else if (data.status === 2) {
            feedback.className = 'p-4 rounded-xl border text-xs bg-blue-50 border-blue-200 text-blue-950';
            feedback.innerHTML = '<div class="font-bold text-sm">ℹ️ ' + (data.fqdn || val) + ' já está registrado</div>' +
              '<p class="mt-1">' + data.message + '</p>';
          } else {
            feedback.className = 'p-4 rounded-xl border text-xs bg-amber-50 border-amber-200 text-amber-950';
            feedback.innerHTML = '<div class="font-bold text-sm">⚠️ Atenção</div>' +
              '<p class="mt-1">' + (data.message || 'Domínio não disponível.') + '</p>';
          }
        })
        .catch(err => {
          feedback.className = 'p-4 rounded-xl border text-xs bg-rose-50 border-rose-200 text-rose-950';
          feedback.innerHTML = 'Erro ao consultar Registro.br. Tente novamente.';
        });
    }

    async function changeSiteDomain() {
      const input = document.getElementById('inputNewDomain');
      const btn = document.getElementById('btnChangeDomain');
      const migrationBox = document.getElementById('masterDomainMigrationFeedback');
      const val = input ? input.value.trim() : '';

      if (!val) {
        alert('Digite o novo domínio desejado.');
        return;
      }

      if (!confirm('Deseja realmente alterar o domínio para "' + val + '"?\\n\\nO sistema atualizará automaticamente os servidores e a zona de DNS.')) {
        return;
      }

      btn.disabled = true;
      btn.innerText = 'Migrando infraestrutura...';
      migrationBox.classList.remove('hidden');
      migrationBox.className = 'p-5 rounded-2xl border text-xs bg-slate-50 border-slate-200 text-slate-700';
      migrationBox.innerHTML = '<div class="font-bold text-sm text-slate-900">Aplicando alterações...</div><p class="mt-1">Atualizando apontamentos e gerando zona de servidores DNS...</p>';

      try {
        const res = await fetch('/api/sites/change-domain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            siteId: CURRENT_SITE_ID,
            newDomain: val
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          currentDomain = data.domain;
          localStorage.setItem('site_custom_domain', data.domain);
          const display = document.getElementById('currentDomainDisplay');
          if (display) display.innerText = data.domain;

          const ns1 = data.nameServers && data.nameServers[0] ? data.nameServers[0] : 'dina.ns.cloudflare.com';
          const ns2 = data.nameServers && data.nameServers[1] ? data.nameServers[1] : 'walt.ns.cloudflare.com';

          migrationBox.className = 'p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-950 space-y-3';
          migrationBox.innerHTML = 
            '<div class="font-bold text-sm text-emerald-900 flex items-center gap-2">' +
              '<span>✓ Domínio Atualizado com Sucesso!</span>' +
            '</div>' +
            '<p class="text-xs text-emerald-800">' + data.message + '</p>' +
            '<div class="p-4 bg-white rounded-xl border border-emerald-200 space-y-2">' +
              '<div class="font-bold text-slate-800">Servidores DNS Cloudflare para apontamento no Registro.br:</div>' +
              '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-slate-900">' +
                '<div class="p-2.5 bg-slate-900 text-amber-300 rounded-lg">Master: <strong>' + ns1 + '</strong></div>' +
                '<div class="p-2.5 bg-slate-900 text-amber-300 rounded-lg">Slave 1: <strong>' + ns2 + '</strong></div>' +
              '</div>' +
              '<p class="text-[11px] text-slate-500">Acesse o Registro.br e configure estes dois servidores DNS no seu domínio.</p>' +
            '</div>' +
            '<div class="pt-2">' +
              '<a href="https://registro.br" target="_blank" class="inline-flex items-center px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition">Acessar Registro.br para salvar DNS ↗</a>' +
            '</div>';

          alert('Sucesso! O domínio foi atualizado.');
        } else {
          migrationBox.className = 'p-5 rounded-2xl border-2 border-rose-200 bg-rose-50 text-rose-950 space-y-2';
          migrationBox.innerHTML = '<div class="font-bold text-sm text-rose-900">Falha na migração</div><p>' + (data.error || 'Não foi possível atualizar o domínio.') + '</p>';
          alert(data.error || 'Erro ao alterar domínio.');
        }
      } catch (err) {
        migrationBox.className = 'p-5 rounded-2xl border-2 border-rose-200 bg-rose-50 text-rose-950 space-y-2';
        migrationBox.innerHTML = '<div class="font-bold text-sm text-rose-900">Erro de Conexão</div><p>Falha ao conectar com o servidor.</p>';
        alert('Falha ao conectar com o servidor para atualizar domínio.');
      } finally {
        btn.disabled = false;
        btn.innerText = 'Salvar e Migrar Domínio';
      }
    }

    // === 1. EXPORTAÇÃO DE LEADS (EXCEL / CSV COM UTF-8 BOM) ===
    function downloadContactsCSV() {
      try {
        let contacts = [];
        const raw = localStorage.getItem('site_contacts');
        if (raw) {
          try { contacts = JSON.parse(raw); } catch (e) {}
        }
        if (!contacts || contacts.length === 0) {
          contacts = [
            {
              date: 'Hoje às 16:30',
              name: 'Mariana Souza',
              phone: '(11) 97766-5544',
              reason: 'Consulta Inicial',
              message: 'Preciso de orientação com urgência.',
              status: 'Novo'
            }
          ];
        }

        const headers = ['Data/Hora', 'Nome', 'Telefone / WhatsApp', 'Motivo', 'Mensagem', 'Status'];
        const rows = contacts.map(function(c) {
          return [
            '"' + (c.date || '').replace(/"/g, '""') + '"',
            '"' + (c.name || '').replace(/"/g, '""') + '"',
            '"' + (c.phone || '').replace(/"/g, '""') + '"',
            '"' + (c.reason || '').replace(/"/g, '""') + '"',
            '"' + (c.message || '').replace(/"/g, '""') + '"',
            '"' + (c.status || '').replace(/"/g, '""') + '"'
          ];
        });

        // \uFEFF força o Microsoft Excel a reconhecer a codificação UTF-8 com acentos corretos
        const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(function(r) { return r.join(';'); })].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = 'leads-sitepronto-' + new Date().toISOString().slice(0, 10) + '.csv';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        triggerSave('✓ Leads exportados com sucesso em formato Excel/CSV!');
      } catch (err) {
        console.error('Erro ao exportar leads:', err);
        alert('Erro ao gerar arquivo CSV: ' + err.message);
      }
    }

    // === 2. GERADOR DE QR CODE AUTOMÁTICO ===
    let activeQrTarget = 'links'; // 'links' | 'home'

    function updateQrCodeDisplay() {
      const origin = window.location.origin;
      const targetPath = activeQrTarget === 'links' ? '/links' : '/';
      const fullUrl = origin + targetPath;

      const urlInput = document.getElementById('qrTargetUrlDisplay');
      if (urlInput) urlInput.value = fullUrl;

      const img = document.getElementById('qrCodePreviewImg');
      if (img) {
        img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=350x350&margin=10&data=' + encodeURIComponent(fullUrl);
      }

      const btnLinks = document.getElementById('btnQrTargetLinks');
      const btnHome = document.getElementById('btnQrTargetHome');
      if (btnLinks && btnHome) {
        if (activeQrTarget === 'links') {
          btnLinks.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white transition';
          btnHome.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition';
        } else {
          btnHome.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white transition';
          btnLinks.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition';
        }
      }
    }

    function setQrCodeTarget(target) {
      activeQrTarget = target;
      updateQrCodeDisplay();
    }

    function copyQrTargetUrl() {
      const urlInput = document.getElementById('qrTargetUrlDisplay');
      if (urlInput && urlInput.value) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(urlInput.value).then(function() {
            triggerSave('✓ Link copiado!');
          }).catch(function() {
            urlInput.select();
            document.execCommand('copy');
            triggerSave('✓ Link copiado!');
          });
        } else {
          urlInput.select();
          document.execCommand('copy');
          triggerSave('✓ Link copiado!');
        }
      }
    }

    async function downloadActiveQrCodePng() {
      const img = document.getElementById('qrCodePreviewImg');
      if (!img || !img.src) return;

      try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'qrcode-' + (activeQrTarget === 'links' ? 'biolinks' : 'site') + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        triggerSave('✓ Imagem do QR Code baixada em alta resolução!');
      } catch (err) {
        window.open(img.src, '_blank');
      }
    }

    // === 3. CONFIGURAÇÕES GERAIS, TRACKING & LGPD ===
    let currentWaWidget = ${safeJsonWhatsappWidget};
    let currentTracking = ${safeJsonTracking};
    let currentLgpd = ${safeJsonLgpd};

    function renderSettingsUI() {
      try {
        // WhatsApp Widget
        const rawWa = localStorage.getItem('site_whatsapp_widget');
        if (rawWa) {
          try { currentWaWidget = JSON.parse(rawWa); } catch (e) {}
        }
        const switchWa = document.getElementById('switch_wa_widget');
        const badgeWa = document.getElementById('badge_wa_widget');
        const greetingInput = document.getElementById('settingWaGreeting');
        const messageInput = document.getElementById('settingWaMessage');

        if (switchWa && badgeWa) {
          const isWaActive = currentWaWidget.active !== false;
          switchWa.checked = isWaActive;
          badgeWa.className = isWaActive 
            ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800'
            : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700';
          badgeWa.innerText = isWaActive ? '● Ligado' : '○ Desligado';
        }
        if (greetingInput && currentWaWidget.greetingText) {
          greetingInput.value = currentWaWidget.greetingText;
        }
        if (messageInput && currentWaWidget.customMessage) {
          messageInput.value = currentWaWidget.customMessage;
        }

        // Tracking
        const rawTracking = localStorage.getItem('site_tracking');
        if (rawTracking) {
          try { currentTracking = JSON.parse(rawTracking); } catch (e) {}
        }
        const gaInput = document.getElementById('settingGoogleAnalytics');
        const pixelInput = document.getElementById('settingMetaPixel');
        if (gaInput && currentTracking.googleAnalyticsId) {
          gaInput.value = currentTracking.googleAnalyticsId;
        }
        if (pixelInput && currentTracking.metaPixelId) {
          pixelInput.value = currentTracking.metaPixelId;
        }

        // LGPD
        const rawLgpd = localStorage.getItem('site_lgpd');
        if (rawLgpd) {
          try { currentLgpd = JSON.parse(rawLgpd); } catch (e) {}
        }
        const switchLgpd = document.getElementById('switch_lgpd_widget');
        const badgeLgpd = document.getElementById('badge_lgpd_widget');
        const lgpdMsgInput = document.getElementById('settingLgpdMessage');

        if (switchLgpd && badgeLgpd) {
          const isLgpdActive = currentLgpd.active !== false;
          switchLgpd.checked = isLgpdActive;
          badgeLgpd.className = isLgpdActive
            ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800'
            : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700';
          badgeLgpd.innerText = isLgpdActive ? '● Ligado' : '○ Desligado';
        }
        if (lgpdMsgInput && currentLgpd.message) {
          lgpdMsgInput.value = currentLgpd.message;
        }
      } catch (err) {
        console.error('Erro ao renderizar Settings UI:', err);
      }
    }

    function toggleWaWidgetSwitch(checked) {
      currentWaWidget.active = checked;
      const badge = document.getElementById('badge_wa_widget');
      if (badge) {
        badge.className = checked
          ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800'
          : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700';
        badge.innerText = checked ? '● Ligado' : '○ Desligado';
      }
    }

    function toggleLgpdSwitch(checked) {
      currentLgpd.active = checked;
      const badge = document.getElementById('badge_lgpd_widget');
      if (badge) {
        badge.className = checked
          ? 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800'
          : 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700';
        badge.innerText = checked ? '● Ligado' : '○ Desligado';
      }
    }

    function saveSettingsData() {
      try {
        const greetingInput = document.getElementById('settingWaGreeting');
        const messageInput = document.getElementById('settingWaMessage');
        const gaInput = document.getElementById('settingGoogleAnalytics');
        const pixelInput = document.getElementById('settingMetaPixel');
        const lgpdMsgInput = document.getElementById('settingLgpdMessage');

        if (greetingInput) currentWaWidget.greetingText = greetingInput.value.trim();
        if (messageInput) currentWaWidget.customMessage = messageInput.value.trim();

        currentTracking.googleAnalyticsId = gaInput ? gaInput.value.trim() : '';
        currentTracking.metaPixelId = pixelInput ? pixelInput.value.trim() : '';

        if (lgpdMsgInput) currentLgpd.message = lgpdMsgInput.value.trim();

        localStorage.setItem('site_whatsapp_widget', JSON.stringify(currentWaWidget));
        localStorage.setItem('site_tracking', JSON.stringify(currentTracking));
        localStorage.setItem('site_lgpd', JSON.stringify(currentLgpd));

        triggerSave('✓ Configurações gerais, WhatsApp Widget e Tracking salvos com sucesso!');
      } catch (err) {
        console.error('Erro ao salvar configurações gerais:', err);
        alert('Erro ao salvar configurações: ' + err.message);
      }
    }

    // === 4. BACKUP & RESTAURAÇÃO (1-CLIQUE) ===
    function exportSiteBackup() {
      try {
        const backupKeys = [
          'site_sections_config', 'site_catalog_products', 'site_faq', 'site_plans',
          'site_cases', 'site_biolinks', 'site_announcement', 'site_partners',
          'site_simulator', 'site_services', 'site_testimonials', 'site_gallery',
          'site_socials', 'site_whatsapp_widget', 'site_tracking', 'site_lgpd',
          'site_contacts', 'site_selected_template', 'site_custom_domain'
        ];

        const backupData = {
          version: '1.0',
          siteName: '${name}',
          exportedAt: new Date().toISOString(),
          settings: {}
        };

        backupKeys.forEach(function(k) {
          const val = localStorage.getItem(k);
          if (val !== null) {
            try {
              backupData.settings[k] = JSON.parse(val);
            } catch (e) {
              backupData.settings[k] = val;
            }
          }
        });

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const dateStr = new Date().toISOString().slice(0, 10);
        a.download = 'backup-sitepronto-' + dateStr + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        triggerSave('✓ Backup completo (.json) baixado com sucesso!');
      } catch (err) {
        console.error('Erro ao exportar backup:', err);
        alert('Erro ao exportar backup: ' + err.message);
      }
    }

    function restoreSiteBackup(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      if (!confirm('Deseja realmente restaurar este backup?\\n\\nTodas as configurações, textos e módulos salvos serão atualizados com os dados deste arquivo.')) {
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const content = e.target.result;
          const parsed = JSON.parse(content);
          const settings = parsed.settings || parsed;

          let restoredCount = 0;
          Object.keys(settings).forEach(function(key) {
            if (key.startsWith('site_')) {
              const val = typeof settings[key] === 'object' ? JSON.stringify(settings[key]) : String(settings[key]);
              localStorage.setItem(key, val);
              restoredCount++;
            }
          });

          alert('✓ Backup restaurado com sucesso (' + restoredCount + ' configurações importadas)!\\n\\nA página será recarregada agora.');
          window.location.reload();
        } catch (err) {
          console.error('Erro ao processar arquivo de backup:', err);
          alert('Erro ao restaurar backup. Verifique se o arquivo .json é válido.');
        } finally {
          event.target.value = '';
        }
      };
      reader.readAsText(file);
    }

    // Inicializações
    initTemplateSelection();
    renderSectionsConfigUI();
    renderSocialsUI();
    renderCatalogUI();
    renderFaqUI();
    renderPlansUI();
    renderCasesUI();
    renderBioLinksUI();
    updateQrCodeDisplay();
    renderSettingsUI();
    renderAnnouncementUI();
    renderPartnersUI();
    renderSimulatorUI();
    renderServicesUI();
    renderTestimonialsUI();
    renderGalleryUI();
  </script>

</body>
</html>`;
}
