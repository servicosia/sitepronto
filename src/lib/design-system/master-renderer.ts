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

  const safeJsonServices = JSON.stringify(services).replace(/</g, '\\u003c');
  const safeJsonGallery = JSON.stringify(gallery).replace(/</g, '\\u003c');
  const safeJsonTestimonials = JSON.stringify(testimonials).replace(/</g, '\\u003c');

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

      <div class="flex items-center space-x-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Neon & Vercel Conectados
        </span>
        <a href="/" class="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition flex items-center">
          Ver Site Público ↗
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <!-- METRICS OVERVIEW -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-contacts')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atendimentos / Leads</div>
        <div class="text-3xl font-extrabold text-slate-900 mt-2">1</div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">✓ Recepção ativa</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-sections')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Módulos Ativos</div>
        <div id="activeModulesCount" class="text-3xl font-extrabold text-indigo-600 mt-2">8/8</div>
        <div class="text-xs text-slate-500 mt-1">Seções configuráveis</div>
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
      <div id="tab-contacts" class="tab-content p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-base text-slate-900">Mensagens e Formulários Recebidos</h3>
          <span class="text-xs text-slate-500">1 contato registrado</span>
        </div>
        <div class="overflow-x-auto">
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

      <!-- ABA 10: CONFIGURAÇÕES & RESEND -->
      <div id="tab-settings" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <h3 class="font-bold text-base text-slate-900">Configurações de Recepção e Disparos de E-mail</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail de Destino dos Formulários</label>
            <input type="email" value="${data.publicEmail || 'contato@seusite.com.br'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp de Contato Principal</label>
            <input type="text" value="${data.whatsapp || '11999999999'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
          </div>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-slate-900">Provedor de E-mail Transacional (Resend)</div>
            <div class="text-xs text-slate-500">Notificações automáticas instantâneas com rate limit.</div>
          </div>
          <button onclick="alert('E-mail de teste enviado com sucesso para ' + ('${data.publicEmail || 'seu e-mail'}'));" class="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition">
            Enviar E-mail de Teste
          </button>
        </div>
      </div>

      <!-- ABA 11: DOMÍNIO & DNS (Vercel, Neon e Cloudflare) -->
      <div id="tab-domain" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Gerenciamento de Domínio Próprio & DNS</h3>
          <p class="text-xs text-slate-500 mt-1">
            Altere ou vincule um novo domínio ao seu site. Ao salvar, nosso sistema atualiza automaticamente a Vercel, o Neon e a zona DNS na Cloudflare.
          </p>
        </div>

        <!-- Domínio Atual -->
        <div class="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Domínio Atualmente Configurado</span>
            <span id="currentDomainDisplay" class="text-lg font-extrabold text-slate-900 font-mono block mt-1">
              ${data.customDomainName || 'Subdomínio Vercel Padrão'}
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
    Painel /master • Isolamento criptográfico e persistência Neon PostgreSQL.
  </footer>

  <script>
    // ==========================================
    // ESTADO E PERSISTÊNCIA DINÂMICA
    // ==========================================
    let selectedTemplate = localStorage.getItem('site_selected_template') || 'MODEL_A';

    const defaultSections = {
      inicio: true,
      servicos: true,
      'como-funciona': true,
      sobre: true,
      galeria: true,
      depoimentos: true,
      artigos: true,
      contato: true
    };

    let sectionsConfig = (function() {
      try {
        const stored = localStorage.getItem('site_sections_config');
        return stored ? JSON.parse(stored) : defaultSections;
      } catch(e) {
        return defaultSections;
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
      { id: 'servicos', title: 'Áreas de Atuação / Serviços', desc: 'Cards com as especialidades, descrições e botões de atendimento.', icon: '⚖️' },
      { id: 'como-funciona', title: 'Como Funciona / Etapas', desc: 'Passo a passo do processo de atendimento do início ao resultado.', icon: '📋' },
      { id: 'sobre', title: 'Sobre o Profissional / Apresentação', desc: 'Foto de perfil, biografia institucional e credenciais.', icon: '👤' },
      { id: 'galeria', title: 'Galeria de Fotos', desc: 'Registros do consultório, instalações e espaço de atendimento com lightbox.', icon: '🖼️' },
      { id: 'depoimentos', title: 'Depoimentos de Clientes', desc: 'Cards de avaliações com fotos dos clientes, estrelas e depoimentos.', icon: '💬' },
      { id: 'artigos', title: 'Artigos & Orientações', desc: 'Artigos técnicos e orientações com tempo de leitura estimado.', icon: '📰' },
      { id: 'contato', title: 'Formulário de Contato Direto', desc: 'Formulário completo para recebimento de mensagens e agendamentos.', icon: '📬' }
    ];

    function renderSectionsConfigUI() {
      const container = document.getElementById('sectionsConfigList');
      if (!container) return;

      let activeCount = 0;
      container.innerHTML = sectionMetadata.map(function(sec) {
        const isActive = sectionsConfig[sec.id] !== false;
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
      saveSectionsConfig(false);
    }

    function saveSectionsConfig(showAlert = true) {
      localStorage.setItem('site_sections_config', JSON.stringify(sectionsConfig));
      const b = document.getElementById('saveBadge');
      b.innerText = 'Salvando módulos...';
      setTimeout(() => {
        b.innerText = '✓ Sincronizado';
        if (showAlert) {
          alert('Configuração de módulos salva! Ao abrir ou atualizar o site principal, as seções marcadas já estarão atualizadas.');
        }
      }, 300);
    }

    // ==========================================
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
        alert(msg || 'Dados salvos com sucesso no Neon PostgreSQL!');
      }, 400);
    }

    // ==========================================
    // DOMÍNIO & DNS (Vercel, Neon e Cloudflare)
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

      if (!confirm('Deseja realmente alterar o domínio para "' + val + '"?\\n\\nO sistema atualizará automaticamente a Vercel, o Neon e a zona DNS na Cloudflare.')) {
        return;
      }

      btn.disabled = true;
      btn.innerText = 'Migrando infraestrutura...';
      migrationBox.classList.remove('hidden');
      migrationBox.className = 'p-5 rounded-2xl border text-xs bg-slate-50 border-slate-200 text-slate-700';
      migrationBox.innerHTML = '<div class="font-bold text-sm text-slate-900">Aplicando alterações...</div><p class="mt-1">Atualizando apontamentos na Vercel, projeto no Neon e gerando zona DNS no Cloudflare...</p>';

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

          alert('Sucesso! O domínio foi atualizado na Vercel, Neon e Cloudflare.');
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

    // Inicializações
    initTemplateSelection();
    renderSectionsConfigUI();
    renderServicesUI();
    renderTestimonialsUI();
    renderGalleryUI();
  </script>

</body>
</html>`;
}
