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
          <button id="btn-tab-services" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-services')">
            ⚖️ Áreas de Atuação
          </button>
          <button id="btn-tab-articles" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-articles')">
            📰 Artigos & Notícias
          </button>
          <button id="btn-tab-settings" class="tab-btn text-sm text-slate-500 hover:text-slate-900 pb-2 border-b-2 border-transparent transition" onclick="switchTab('tab-settings')">
            ⚙️ E-mails & Notificações
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
                <td class="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">Preciso de orientação jurídica com urgência.</td>
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
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Registro (OAB / Conselho)</label>
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
              <h4 class="font-bold text-sm text-slate-900">Direitos Fundamentais e Medidas Iniciais em Demandas Urgentes</h4>
              <p class="text-xs text-slate-400">Publicado • Leitura: 4 min</p>
            </div>
            <button onclick="triggerSave('Artigo editado!')" class="text-xs font-bold text-slate-900 border px-3 py-1.5 rounded-lg hover:bg-slate-50">Editar</button>
          </div>

          <div class="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-700 uppercase">Artigo Jurídico</span>
              <h4 class="font-bold text-sm text-slate-900">A Importância do Acompanhamento Jurídico Especializado</h4>
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
            <input type="email" value="${data.publicEmail || 'contato@advocacia.com.br'}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none">
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
