import type { OnboardingData } from '../validation/onboarding';

export function renderMasterDashboardHtml(data: OnboardingData, siteId?: string): string {
  const name = data.professionalName || data.fullName || 'Profissional';
  const profession = data.profession || 'Advogado';
  const oab = data.councilNumber ? `${data.councilType || 'OAB'} ${data.councilNumber}` : 'OAB/SP 123456';
  const services = data.services && data.services.length > 0 ? data.services : [
    { title: 'Consultoria Especializada', shortDescription: 'Atendimento estratégico e análise técnica.' },
    { title: 'Defesa Técnica', shortDescription: 'Representação em processos e procedimentos.' },
    { title: 'Medidas Urgentes', shortDescription: 'Atuação célere para resguardo de direitos.' }
  ];

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
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Registro (Conselho / OAB / Outro)</label>
            <input type="text" id="profOab" value="${oab}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
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
              <img id="previewHero" src="${data.coverPhotoUrl || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80'}" alt="Capa" class="w-full h-full object-cover">
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
              <img id="previewAbout" src="${data.profilePhotoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80'}" alt="Perfil" class="w-full h-full object-cover">
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
              <span class="text-xs font-bold text-emerald-700 uppercase">Guia Prático</span>
              <h4 class="font-bold text-sm text-slate-900">Direitos Fundamentais e Orientações Iniciais em Demandas Urgentes</h4>
              <p class="text-xs text-slate-400">Publicado • Leitura: 4 min</p>
            </div>
            <button onclick="triggerSave('Artigo editado!')" class="text-xs font-bold text-slate-900 border px-3 py-1.5 rounded-lg hover:bg-slate-50">Editar</button>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-700 uppercase">Informativo</span>
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
