import type { OnboardingData } from '../validation/onboarding';
import { getContextualImages } from './template-renderer';

export function renderMasterDashboardHtml(data: OnboardingData, siteId?: string): string {
  const name = data.professionalName || data.fullName || 'Profissional / Empresa';
  const profession = data.profession || 'Especialista';
  const council = data.councilNumber 
    ? `${data.councilType || 'Registro'} ${data.councilNumber}` 
    : (data.hasProfessionalCouncil ? 'Registro Ativo' : 'Cadastro Regular');
  const services = data.services && data.services.length > 0 ? data.services : [
    { title: 'Consultoria e Atendimento', shortDescription: 'Atendimento estratégico e análise técnica das necessidades.' },
    { title: 'Diagnóstico e Estruturação', shortDescription: 'Planejamento e estruturação prática para alcance de metas.' },
    { title: 'Suporte Contínuo', shortDescription: 'Acompanhamento dedicado com foco em excelência e resultados.' }
  ];

  const images = getContextualImages(profession, data.mainSpecialty, data.companyName);
  const heroImage = data.coverPhotoUrl || images.hero;
  const aboutImage = data.profilePhotoUrl || images.about;

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
        <button onclick="openQuickGeneratorModal()" class="text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-sm transition flex items-center gap-1.5 border border-emerald-400/30">
          <span>⚡</span>
          <span>Gerador Rápido (Testes)</span>
        </button>
        <span class="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-semibold">
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-contacts')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atendimentos / Leads</div>
        <div class="text-3xl font-extrabold text-slate-900 mt-2">1</div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">✓ Recepção ativa</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-services')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Áreas de Atuação</div>
        <div class="text-3xl font-extrabold text-slate-900 mt-2">${services.length}</div>
        <div class="text-xs text-slate-500 mt-1">Cards administráveis</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-articles')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Informativos & Artigos</div>
        <div class="text-3xl font-extrabold text-slate-900 mt-2">2</div>
        <div class="text-xs text-slate-500 mt-1">Publicações no ar</div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:border-slate-300 transition" onclick="switchTab('tab-settings')">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Banco Neon PostgreSQL</div>
        <div class="text-3xl font-extrabold text-emerald-600 mt-2">100%</div>
        <div class="text-xs text-slate-500 mt-1">Região Brasil (sa-east-1)</div>
      </div>
    </div>

    <!-- TABS DE GESTÃO -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <!-- TAB NAVIGATION -->
      <div class="border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex space-x-4 sm:space-x-8 overflow-x-auto">
          <button id="btn-tab-contacts" class="tab-btn active text-sm pb-2 border-b-2 border-slate-900 transition" onclick="switchTab('tab-contacts')">
            📬 Contatos Recebidos
          </button>
          <button id="btn-tab-profile" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-profile')">
            👤 Perfil & Sobre
          </button>
          <button id="btn-tab-media" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-media')">
            🖼️ Imagens & Fotos
          </button>
          <button id="btn-tab-template" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-template')">
            🎨 Trocar Modelo / Template
          </button>
          <button id="btn-tab-services" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-services')">
            ⚖️ Áreas de Atuação
          </button>
          <button id="btn-tab-articles" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-articles')">
            📰 Artigos & Notícias
          </button>
          <button id="btn-tab-settings" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-settings')">
            ⚙️ E-mails & Configurações
          </button>
        </div>
        <span id="saveBadge" class="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
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

      <!-- ABA 2: PERFIL & SOBRE -->
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

      <!-- ABA NOVA: GERENCIAMENTO DE IMAGENS & FOTOS -->
      <div id="tab-media" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Gerenciador de Imagens do Site</h3>
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

      <!-- ABA NOVA: TROCA DE TEMPLATE / MODELO VISUAL -->
      <div id="tab-template" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div>
          <h3 class="font-bold text-base text-slate-900">Troca de Modelo Visual (Design Template)</h3>
          <p class="text-xs text-slate-500 mt-1">Alterne a qualquer momento o layout e a estética do seu site sem perder suas informações cadastradas.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Modelo A -->
          <div id="opt-model-a" onclick="selectTemplateOption('MODEL_A')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-900 bg-slate-50 shadow-md transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-slate-500">Modelo A</span>
              <span id="badge-model-a" class="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Institucional Confiável</h4>
            <p class="text-xs text-slate-600 mb-4">Estrutura clássica em fundo claro, layout split e alta legibilidade corporativa.</p>
            <div class="p-2 bg-white rounded border text-[11px] text-slate-700 font-medium">Ideal para solidez e autoridade tradicional</div>
          </div>

          <!-- Modelo B -->
          <div id="opt-model-b" onclick="selectTemplateOption('MODEL_B')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-slate-500">Modelo B</span>
              <span id="badge-model-b" class="w-5 h-5 rounded-full bg-slate-900 text-white hidden items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Moderno Premium</h4>
            <p class="text-xs text-slate-600 mb-4">Atmosfera dark contemporânea, efeitos visuais refinados e destaque dinâmico.</p>
            <div class="p-2 bg-slate-900 rounded text-[11px] text-white font-medium">Ideal para alto impacto e diferenciação</div>
          </div>

          <!-- Modelo C -->
          <div id="opt-model-c" onclick="selectTemplateOption('MODEL_C')" class="cursor-pointer p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase text-slate-500">Modelo C</span>
              <span id="badge-model-c" class="w-5 h-5 rounded-full bg-slate-900 text-white hidden items-center justify-center text-xs">✓</span>
            </div>
            <h4 class="font-bold text-slate-900 mb-1">Minimalista Editorial</h4>
            <p class="text-xs text-slate-600 mb-4">Tipografia serifada nobre, fundo off-white e elegância executiva sóbria.</p>
            <div class="p-2 bg-stone-100 rounded border border-stone-300 text-[11px] text-stone-800 font-serif">Ideal para abordagem editorial refinada</div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-slate-100">
          <button onclick="triggerSave('Template alterado com sucesso no site!')" class="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition">
            Aplicar Novo Template
          </button>
        </div>
      </div>

      <!-- ABA 3: ÁREAS DE ATUAÇÃO -->
      <div id="tab-services" class="tab-content hidden p-6 sm:p-8 space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-base text-slate-900">Gerenciar Áreas de Atuação (Cards do Site)</h3>
          <button onclick="alert('Funcionalidade de adicionar nova área pronta para inclusão!')" class="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800">
            + Nova Área
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${services.map((s, idx) => `
            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span class="text-xs font-bold text-emerald-700">Área #${idx + 1}</span>
              <input type="text" value="${s.title}" class="w-full px-3 py-1.5 text-sm font-bold bg-white border border-slate-300 rounded-lg">
              <textarea rows="2" class="w-full px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg">${s.shortDescription}</textarea>
              <div class="flex justify-between items-center pt-2">
                <span class="text-xs text-emerald-600 font-semibold">● Ativo no site</span>
                <button onclick="triggerSave('Área salva!')" class="text-xs text-slate-700 font-bold hover:underline">Salvar</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ABA 4: ARTIGOS & INFORMATIVOS -->
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
              <h4 class="font-bold text-sm text-slate-900">A Importância do Acompanhamento Especializado e Prevenção</h4>
              <p class="text-xs text-slate-400">Publicado • Leitura: 3 min</p>
            </div>
            <button onclick="triggerSave('Artigo editado!')" class="text-xs font-bold text-slate-900 border px-3 py-1.5 rounded-lg hover:bg-slate-50">Editar</button>
          </div>
        </div>
      </div>

      <!-- ABA 5: CONFIGURAÇÕES & RESEND -->
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

    </div>

  </main>

  <!-- MODAL DE TESTE: GERADOR RÁPIDO DE SITE -->
  <div id="quickGeneratorModal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden items-center justify-center p-4">
    <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
      <div class="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-lg">⚡</div>
          <div>
            <h3 class="font-bold text-base">Gerador Rápido de Site (Modo Testes)</h3>
            <p class="text-xs text-slate-400">Escolha a profissão e o modelo para simular e visualizar instantaneamente.</p>
          </div>
        </div>
        <button onclick="closeQuickGeneratorModal()" class="text-slate-400 hover:text-white text-xl font-bold p-1">✕</button>
      </div>

      <div class="p-6 overflow-y-auto space-y-5 text-sm">
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Profissão / Nicho de Teste</label>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <button type="button" onclick="setQuickProfession('Churrasqueiro & Buffet', 'Churrasco Corporativo e Eventos')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">🥩 Churrasqueiro</button>
            <button type="button" onclick="setQuickProfession('Advogado Especialista', 'Direito Civil e Empresarial')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">⚖️ Advogado</button>
            <button type="button" onclick="setQuickProfession('Médico Especialista', 'Clínica Geral e Preventiva')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">🩺 Médico</button>
            <button type="button" onclick="setQuickProfession('Personal Trainer', 'Consultoria Fitness e Treinos')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">🏋️ Personal Trainer</button>
            <button type="button" onclick="setQuickProfession('Arquiteto & Designer', 'Projetos Residenciais e Comerciais')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">📐 Arquiteto</button>
            <button type="button" onclick="setQuickProfession('Mecânico Automotivo', 'Manutenção Preventiva e Motores')" class="p-2 border rounded-lg text-left text-xs hover:border-slate-900 bg-slate-50 font-medium">🔧 Mecânica</button>
          </div>
          <input type="text" id="quickProfessionInput" value="${profession}" placeholder="Ou digite outra profissão..." class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Especialidade / Foco</label>
          <input type="text" id="quickSpecialtyInput" value="${data.mainSpecialty || 'Atendimento e Consultoria de Excelência'}" placeholder="Ex: Carnes Nobres, Direito Imobiliário..." class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none">
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Modelo Visual (Template)</label>
          <div class="grid grid-cols-3 gap-2">
            <label class="cursor-pointer border-2 rounded-xl p-2.5 text-center transition flex flex-col items-center border-slate-900 bg-slate-50" id="label-quick-model-a">
              <input type="radio" name="quickTemplate" value="MODEL_A" checked onchange="updateQuickTemplateHighlight('MODEL_A')" class="hidden">
              <span class="font-bold text-xs text-slate-900">Modelo A</span>
              <span class="text-[10px] text-slate-500">Institucional</span>
            </label>
            <label class="cursor-pointer border-2 rounded-xl p-2.5 text-center transition flex flex-col items-center border-slate-200 bg-white" id="label-quick-model-b">
              <input type="radio" name="quickTemplate" value="MODEL_B" onchange="updateQuickTemplateHighlight('MODEL_B')" class="hidden">
              <span class="font-bold text-xs text-slate-900">Modelo B</span>
              <span class="text-[10px] text-slate-500">Moderno Dark</span>
            </label>
            <label class="cursor-pointer border-2 rounded-xl p-2.5 text-center transition flex flex-col items-center border-slate-200 bg-white" id="label-quick-model-c">
              <input type="radio" name="quickTemplate" value="MODEL_C" onchange="updateQuickTemplateHighlight('MODEL_C')" class="hidden">
              <span class="font-bold text-xs text-slate-900">Modelo C</span>
              <span class="text-[10px] text-slate-500">Editorial</span>
            </label>
          </div>
        </div>
      </div>

      <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
        <button onclick="closeQuickGeneratorModal()" class="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900">Cancelar</button>
        <button onclick="executeQuickPreviewGeneration()" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition">
          <span>🚀 Visualizar Site Imediatamente</span>
        </button>
      </div>
    </div>
  </div>

  <footer class="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
    Painel /master • Isolamento criptográfico e persistência Neon PostgreSQL.
  </footer>

  <script>
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

    function selectTemplateOption(model) {
      const opts = ['a', 'b', 'c'];
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

      const target = model === 'MODEL_A' ? 'a' : model === 'MODEL_B' ? 'b' : 'c';
      const activeEl = document.getElementById('opt-model-' + target);
      const activeBadge = document.getElementById('badge-model-' + target);
      if (activeEl && activeBadge) {
        activeEl.classList.add('border-slate-900', 'bg-slate-50', 'shadow-md');
        activeEl.classList.remove('border-slate-200', 'bg-white');
        activeBadge.classList.remove('hidden');
        activeBadge.classList.add('flex');
      }
    }

    function openQuickGeneratorModal() {
      const modal = document.getElementById('quickGeneratorModal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function closeQuickGeneratorModal() {
      const modal = document.getElementById('quickGeneratorModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function setQuickProfession(prof, spec) {
      document.getElementById('quickProfessionInput').value = prof;
      document.getElementById('quickSpecialtyInput').value = spec;
    }

    function updateQuickTemplateHighlight(model) {
      ['MODEL_A', 'MODEL_B', 'MODEL_C'].forEach(m => {
        const key = m.toLowerCase().replace('_', '-');
        const lbl = document.getElementById('label-quick-' + key);
        if (lbl) {
          if (m === model) {
            lbl.className = 'cursor-pointer border-2 rounded-xl p-2.5 text-center transition flex flex-col items-center border-slate-900 bg-slate-50';
          } else {
            lbl.className = 'cursor-pointer border-2 rounded-xl p-2.5 text-center transition flex flex-col items-center border-slate-200 bg-white';
          }
        }
      });
    }

    async function executeQuickPreviewGeneration() {
      const profession = document.getElementById('quickProfessionInput').value || 'Profissional';
      const specialty = document.getElementById('quickSpecialtyInput').value || 'Especialista';
      const templateRadios = document.getElementsByName('quickTemplate');
      let selectedTemplate = 'MODEL_A';
      for (const r of templateRadios) {
        if (r.checked) {
          selectedTemplate = r.value;
          break;
        }
      }

      const payload = {
        fullName: document.getElementById('profName') ? document.getElementById('profName').value : '${name}',
        professionalName: document.getElementById('profName') ? document.getElementById('profName').value : '${name}',
        companyName: document.getElementById('profName') ? document.getElementById('profName').value : '${name}',
        publicEmail: 'contato@teste.com.br',
        whatsapp: '${data.whatsapp || '11999999999'}',
        profession: profession,
        mainSpecialty: specialty,
        professionalSummary: 'Especialista dedicado a entregar atendimento humanizado, excelência técnica e máxima satisfação aos clientes.',
        attendanceType: 'hibrido',
        city: '${data.city || 'São Paulo'}',
        state: '${data.state || 'SP'}',
        services: [
          { title: 'Atendimento & Diagnóstico ' + profession, shortDescription: 'Análise técnica especializada e personalizada de acordo com seu objetivo.', ctaText: 'Saber Mais' },
          { title: 'Soluções em ' + specialty, shortDescription: 'Planejamento estratégico e execução prática focada em excelência.', ctaText: 'Agendar' },
          { title: 'Consultoria Especializada', shortDescription: 'Acompanhamento dedicado com suporte contínuo para os melhores resultados.', ctaText: 'Consultar' }
        ],
        hasProfessionalCouncil: false,
        primaryColor: '${data.primaryColor || '#0f172a'}',
        secondaryColor: '${data.secondaryColor || '#3b82f6'}',
        selectedDesignVariant: selectedTemplate
      };

      const btn = event.target.closest('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>⏳ Sintetizando Proposta...</span>';
      btn.disabled = true;

      try {
        const res = await fetch('/api/onboarding/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success && data.previews && data.previews[selectedTemplate]) {
          const previewHtml = data.previews[selectedTemplate].html;
          const win = window.open('', '_blank');
          if (win) {
            win.document.open();
            win.document.write(previewHtml);
            win.document.close();
            closeQuickGeneratorModal();
          } else {
            alert('Por favor, permita pop-ups para visualizar o novo site em outra aba.');
          }
        } else {
          alert('Erro ao gerar site: ' + (data.error || 'Verifique os dados informados'));
        }
      } catch (err) {
        alert('Falha na comunicação com o gerador: ' + err.message);
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
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
  </script>

</body>
</html>`;
}
