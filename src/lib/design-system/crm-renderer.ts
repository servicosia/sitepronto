/**
 * CRM & Gestão Operacional Especializado para Micro-SaaS
 * Nichos: Barbearia, Clínica, Imobiliária, Academia, Pet Shop + Financeiro
 */

export function renderCrmTabHtml(initialNiche: string = 'barbearia', profession: string = '', companyName: string = ''): string {
  return `
    <!-- ABA: CRM & GESTÃO OPERACIONAL -->
    <div id="tab-crm" class="tab-content p-4 sm:p-6 lg:p-8 space-y-6">
      
      <!-- HEADER EXECUTIVO DO CRM -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-indigo-900/60 flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="space-y-2 relative z-10">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[11px] font-extrabold uppercase tracking-wider">
              ⚡ Micro-SaaS Integrado
            </span>
            <span id="crmCurrentNicheBadge" class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
              💈 Modo Barbearia Ativo
            </span>
            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
              Auto-Sync Ativo
            </span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <span>💼</span> Gestão Operacional & CRM Inteligente
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Seu site agora é um Micro-SaaS completo com funil de clientes, agenda semanal, esteira operacional e réguas de WhatsApp automáticas.
          </p>
        </div>

        <!-- SELETOR DE NICHOS (PILLS) -->
        <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div class="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/80 flex flex-wrap items-center gap-1.5 shadow-inner">
            <button type="button" onclick="switchCrmNiche('barbearia')" id="crmPill_barbearia" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-indigo-600 text-white shadow">
              <span>💈</span> Barbearia
            </button>
            <button type="button" onclick="switchCrmNiche('clinica')" id="crmPill_clinica" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10">
              <span>🩺</span> Clínica
            </button>
            <button type="button" onclick="switchCrmNiche('imobiliaria')" id="crmPill_imobiliaria" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10">
              <span>🏡</span> Imobiliária
            </button>
            <button type="button" onclick="switchCrmNiche('academia')" id="crmPill_academia" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10">
              <span>🏋️</span> Academia
            </button>
            <button type="button" onclick="switchCrmNiche('petshop')" id="crmPill_petshop" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10">
              <span>🐾</span> Pet Shop
            </button>
            <button type="button" onclick="switchCrmNiche('financeiro')" id="crmPill_financeiro" class="crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10">
              <span>💰</span> Caixa & DRE
            </button>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 1: BARBEARIA (Barber Pro) -->
      <!-- ============================================================== -->
      <div id="crmView_barbearia" class="crm-view space-y-6">
        <!-- KPIS BARBEARIA -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Faturamento Hoje</div>
            <div id="barberMetricRevenue" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">R$ 720,00</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">↑ +18% vs semana passada</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Horários Agendados</div>
            <div id="barberMetricCount" class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">12 cortes</div>
            <div class="text-xs text-slate-500 mt-1">4 barbeiros com agenda aberta</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Atendidos com Sucesso</div>
            <div id="barberMetricDone" class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">7 concluídos</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">✓ Sem cancelamentos</div>
          </div>
          <div class="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-sm">
            <div class="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Radar de Reconvocação</div>
            <div id="barberMetricRecall" class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">6 clientes</div>
            <div class="text-xs text-amber-700 font-medium mt-1">+25 dias sem cortar</div>
          </div>
        </div>

        <!-- RADAR DE RECONVOCAÇÃO WHATSAPP -->
        <div class="bg-gradient-to-br from-amber-50 to-orange-50/40 p-5 rounded-2xl border border-amber-200/80 shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🎯</span>
                <h3 class="font-extrabold text-sm text-slate-900">Radar de Reconvocação WhatsApp (Clientes Sumidos)</h3>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">Conversão Estimada 60%</span>
              </div>
              <p class="text-xs text-slate-600 mt-0.5">Clientes cadastrados que costumam cortar a cada 20-30 dias. Envie um lembrete no WhatsApp com 1 clique.</p>
            </div>
          </div>
          <div class="overflow-x-auto rounded-xl bg-white border border-amber-200/60">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-amber-100/50 text-[11px] font-bold text-slate-700 border-b border-amber-200/60 uppercase">
                <tr>
                  <th class="py-2.5 px-3">Cliente</th>
                  <th class="py-2.5 px-3">Telefone</th>
                  <th class="py-2.5 px-3">Último Corte</th>
                  <th class="py-2.5 px-3">Dias Sem Cortar</th>
                  <th class="py-2.5 px-3">Barbeiro Preferido</th>
                  <th class="py-2.5 px-3 text-right">Ação WhatsApp</th>
                </tr>
              </thead>
              <tbody id="barberRecallTableBody" class="divide-y divide-slate-100">
                <!-- Inserido dinamicamente -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- AGENDA DIÁRIA INTERATIVA -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">💈</span>
                <h3 class="font-bold text-base text-slate-900">Agenda do Dia & Próximos Atendimentos</h3>
                <span id="barberAgendaBadge" class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Sincronizado com Site Público
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">Horários agendados pelos clientes diretamente no Hero do seu site ou cadastrados no balcão.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openBarberNewModal()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>+</span> Novo Agendamento
              </button>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th class="py-3 px-3">Horário</th>
                  <th class="py-3 px-3">Cliente</th>
                  <th class="py-3 px-3">Telefone</th>
                  <th class="py-3 px-3">Serviço</th>
                  <th class="py-3 px-3">Barbeiro</th>
                  <th class="py-3 px-3">Valor</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody id="barberAppointmentsTableBody" class="divide-y divide-slate-100 font-medium">
                <!-- Renderizado via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 2: CLÍNICA & CONSULTÓRIO (Vida+) -->
      <!-- ============================================================== -->
      <div id="crmView_clinica" class="crm-view hidden space-y-6">
        <!-- KPIS CLÍNICA -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Consultas Hoje</div>
            <div id="clinicMetricTotal" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">14 pacientes</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">✓ Grade 100% preenchida</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Presenciais vs Telemedicina</div>
            <div id="clinicMetricTypes" class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">10 / 4</div>
            <div class="text-xs text-slate-500 mt-1">10 no consultório • 4 online</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confirmações WhatsApp</div>
            <div id="clinicMetricConfirmations" class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">12/14</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">✓ 86% confirmaram presença</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Retornos Agendados</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-teal-600 mt-2">5 retornos</div>
            <div class="text-xs text-slate-500 mt-1">Acompanhamento preventivo</div>
          </div>
        </div>

        <!-- LISTA DE PACIENTES E CONSULTAS -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🩺</span>
                <h3 class="font-bold text-base text-slate-900">Recepção de Pacientes & Consultas do Dia</h3>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  Prontuário & Lembretes
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">Controle de horários, envio de lembrete 24h e sala virtual de telemedicina.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openClinicNewModal()" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>+</span> Nova Consulta / Paciente
              </button>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th class="py-3 px-3">Horário</th>
                  <th class="py-3 px-3">Paciente</th>
                  <th class="py-3 px-3">WhatsApp</th>
                  <th class="py-3 px-3">Especialidade / Motivo</th>
                  <th class="py-3 px-3">Modalidade</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Ações Rápidas</th>
                </tr>
              </thead>
              <tbody id="clinicPatientsTableBody" class="divide-y divide-slate-100 font-medium">
                <!-- Renderizado via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 3: IMOBILIÁRIA & CORRETORES (HomeKey) -->
      <!-- ============================================================== -->
      <div id="crmView_imobiliaria" class="crm-view hidden space-y-6">
        <!-- KPIS IMOBILIÁRIA -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Leads no Pipeline</div>
            <div id="reMetricLeads" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">18 interessados</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">↑ 5 novos esta semana</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Visitas Agendadas</div>
            <div id="reMetricVisits" class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">6 visitas</div>
            <div class="text-xs text-slate-500 mt-1">Nos próximos 3 dias</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Propostas em Análise</div>
            <div id="reMetricProposals" class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">3 propostas</div>
            <div class="text-xs text-indigo-600 font-semibold mt-1">Fase final de negociação</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">VGV em Carteira</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">R$ 5.4M</div>
            <div class="text-xs text-slate-500 mt-1">Ticket médio R$ 680k</div>
          </div>
        </div>

        <!-- PIPELINE KANBAN DE VENDAS -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🏡</span>
                <h3 class="font-bold text-base text-slate-900">Pipeline Kanban de Vendas Imobiliárias</h3>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Funil Comercial
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">Avance os compradores de etapa do primeiro contato até o fechamento do contrato.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openRealEstateNewModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>+</span> Cadastrar Lead Imobiliário
              </button>
            </div>
          </div>

          <!-- COLUNAS KANBAN -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 pt-2">
            <!-- 1. Novos Leads -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 1. Novo Lead
                </span>
                <span id="kanbanCount_novos" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">0</span>
              </div>
              <div id="kanbanCol_novos" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 2. Primeiro Contato -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 2. Em Contato
                </span>
                <span id="kanbanCount_contato" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">0</span>
              </div>
              <div id="kanbanCol_contato" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 3. Visita Agendada -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span> 3. Visita Marcada
                </span>
                <span id="kanbanCount_visita" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">0</span>
              </div>
              <div id="kanbanCol_visita" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 4. Proposta Enviada -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> 4. Proposta
                </span>
                <span id="kanbanCount_proposta" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">0</span>
              </div>
              <div id="kanbanCol_proposta" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 5. Contrato Fechado -->
            <div class="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-200 space-y-3">
              <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span class="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 5. Fechado 🎉
                </span>
                <span id="kanbanCount_fechado" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200">0</span>
              </div>
              <div id="kanbanCol_fechado" class="space-y-2.5 min-h-[160px]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 4: ACADEMIA & STUDIO FITNESS (PowerFit) -->
      <!-- ============================================================== -->
      <div id="crmView_academia" class="crm-view hidden space-y-6">
        <!-- KPIS ACADEMIA -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Alunos Ativos</div>
            <div id="gymMetricActive" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">168 alunos</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">↑ +14 matrículas no mês</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mensalidades em Dia</div>
            <div id="gymMetricGood" class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">154 (91%)</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">✓ Adimplência saudável</div>
          </div>
          <div class="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-sm">
            <div class="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Vencendo / Pendentes</div>
            <div id="gymMetricPending" class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">14 pendentes</div>
            <div class="text-xs text-amber-700 font-medium mt-1">Cobrança PIX WhatsApp ativa</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Faturamento Recorrente</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">R$ 21.840</div>
            <div class="text-xs text-slate-500 mt-1">Média R$ 130/aluno</div>
          </div>
        </div>

        <!-- LISTA DE ALUNOS & COBRANÇA PIX -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🏋️</span>
                <h3 class="font-bold text-base text-slate-900">Gestão de Alunos, Planos & Cobrança PIX Automática</h3>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  Cobrança Inteligente
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">Envie o código PIX copia e cola pelo WhatsApp com 1 clique para alunos com mensalidade vencendo.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openGymNewModal()" class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>+</span> Matricular Novo Aluno
              </button>
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th class="py-3 px-3">Aluno</th>
                  <th class="py-3 px-3">Telefone</th>
                  <th class="py-3 px-3">Plano</th>
                  <th class="py-3 px-3">Valor</th>
                  <th class="py-3 px-3">Vencimento</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Ação de Cobrança</th>
                </tr>
              </thead>
              <tbody id="gymStudentsTableBody" class="divide-y divide-slate-100 font-medium">
                <!-- Renderizado via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 5: PET SHOP & VETERINÁRIA (PetCare) -->
      <!-- ============================================================== -->
      <div id="crmView_petshop" class="crm-view hidden space-y-6">
        <!-- KPIS PET SHOP -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pets na Fila Hoje</div>
            <div id="petMetricQueue" class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">9 pets</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">Banho, Tosa e Consulta</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Prontos p/ Retirada</div>
            <div id="petMetricReady" class="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">4 prontos</div>
            <div class="text-xs text-emerald-600 font-semibold mt-1">Tutores avisados via WhatsApp</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Táxi Dog Agendados</div>
            <div id="petMetricTaxi" class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">3 corridas</div>
            <div class="text-xs text-slate-500 mt-1">Busca e leva com motorista</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Faturamento do Dia</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">R$ 1.150</div>
            <div class="text-xs text-slate-500 mt-1">Ticket médio R$ 127/pet</div>
          </div>
        </div>

        <!-- ESTEIRA OPERACIONAL DE BANHO E TOSA -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🐾</span>
                <h3 class="font-bold text-base text-slate-900">Esteira Operacional de Banho & Tosa</h3>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Fila em Tempo Real
                </span>
              </div>
              <p class="text-xs text-slate-500 mt-1">Acompanhe cada etapa (Recepção ➔ Banho ➔ Secagem ➔ Tosa ➔ Retirada) e avise o tutor com 1 clique.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="openPetNewModal()" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5">
                <span>+</span> Entrada de Pet (Banho/Tosa)
              </button>
            </div>
          </div>

          <!-- ESTEIRA 5 ETAPAS -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3.5 pt-2">
            <!-- 1. Recepção -->
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-3">
              <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                <span class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>📥</span> 1. Na Recepção
                </span>
                <span id="petCount_recepcao" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">0</span>
              </div>
              <div id="petCol_recepcao" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 2. No Banho -->
            <div class="bg-blue-50/50 p-3 rounded-2xl border border-blue-200 space-y-3">
              <div class="flex items-center justify-between border-b border-blue-200 pb-2">
                <span class="text-xs font-black text-blue-900 flex items-center gap-1.5">
                  <span>🚿</span> 2. No Banho
                </span>
                <span id="petCount_banho" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-blue-800 border border-blue-200">0</span>
              </div>
              <div id="petCol_banho" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 3. Secagem -->
            <div class="bg-amber-50/50 p-3 rounded-2xl border border-amber-200 space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200 pb-2">
                <span class="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <span>💨</span> 3. Secagem
                </span>
                <span id="petCount_secagem" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-amber-800 border border-amber-200">0</span>
              </div>
              <div id="petCol_secagem" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 4. Na Tosa -->
            <div class="bg-purple-50/50 p-3 rounded-2xl border border-purple-200 space-y-3">
              <div class="flex items-center justify-between border-b border-purple-200 pb-2">
                <span class="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <span>✂️</span> 4. Na Tosa
                </span>
                <span id="petCount_tosa" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-purple-800 border border-purple-200">0</span>
              </div>
              <div id="petCol_tosa" class="space-y-2.5 min-h-[160px]"></div>
            </div>

            <!-- 5. Pronto p/ Retirada -->
            <div class="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-200 space-y-3">
              <div class="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span class="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                  <span>✨</span> 5. Pronto!
                </span>
                <span id="petCount_pronto" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200">0</span>
              </div>
              <div id="petCol_pronto" class="space-y-2.5 min-h-[160px]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================== -->
      <!-- NICHO 6: FINANCEIRO & FLUXO DE CAIXA (Inspirado na Imagem 2) -->
      <!-- ============================================================== -->
      <div id="crmView_financeiro" class="crm-view hidden space-y-6">
        <!-- CARDS DE METRICAS FINANCEIRAS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Receita Bruta do Mês</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">R$ 34.850,00</div>
            <div class="text-xs text-emerald-600 font-bold mt-1">↑ +22.4% vs mês anterior</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Despesas Operacionais</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-2">R$ 11.230,00</div>
            <div class="text-xs text-slate-500 mt-1">Custos fixos e insumos</div>
          </div>
          <div class="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div class="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Lucro Líquido Real</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">R$ 23.620,00</div>
            <div class="text-xs text-emerald-800 font-bold mt-1">Margem Líquida: 67.7%</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Previsão Próximos 30d</div>
            <div class="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">R$ 38.200,00</div>
            <div class="text-xs text-indigo-600 font-medium mt-1">Com base nos agendamentos</div>
          </div>
        </div>

        <!-- GRÁFICO COMPARATIVO EM BARRAS CSS -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-bold text-base text-slate-900 flex items-center gap-2">
                <span>📊</span> Demonstrativo de Receitas x Despesas (Últimos 6 Meses)
              </h3>
              <p class="text-xs text-slate-500 mt-1">Comparativo de fluxo de caixa e consistência financeira.</p>
            </div>
            <div class="flex items-center gap-4 text-xs font-bold">
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500"></span> Entradas</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-rose-400"></span> Saídas</span>
            </div>
          </div>

          <div class="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end border-b border-slate-100">
            <!-- Mês 1 -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-500 rounded-t-lg h-[65%] hover:opacity-90 transition relative group" title="Receita: R$ 22.400"></div>
                <div class="w-1/2 bg-rose-400 rounded-t-lg h-[30%] hover:opacity-90 transition relative group" title="Despesa: R$ 9.100"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-500">Maio</span>
            </div>
            <!-- Mês 2 -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-500 rounded-t-lg h-[70%] hover:opacity-90 transition relative group" title="Receita: R$ 24.800"></div>
                <div class="w-1/2 bg-rose-400 rounded-t-lg h-[32%] hover:opacity-90 transition relative group" title="Despesa: R$ 9.400"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-500">Jun</span>
            </div>
            <!-- Mês 3 -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-500 rounded-t-lg h-[76%] hover:opacity-90 transition relative group" title="Receita: R$ 27.200"></div>
                <div class="w-1/2 bg-rose-400 rounded-t-lg h-[34%] hover:opacity-90 transition relative group" title="Despesa: R$ 10.100"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-500">Jul</span>
            </div>
            <!-- Mês 4 -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-500 rounded-t-lg h-[82%] hover:opacity-90 transition relative group" title="Receita: R$ 29.500"></div>
                <div class="w-1/2 bg-rose-400 rounded-t-lg h-[31%] hover:opacity-90 transition relative group" title="Despesa: R$ 9.800"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-500">Ago</span>
            </div>
            <!-- Mês 5 -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-500 rounded-t-lg h-[88%] hover:opacity-90 transition relative group" title="Receita: R$ 31.900"></div>
                <div class="w-1/2 bg-rose-400 rounded-t-lg h-[33%] hover:opacity-90 transition relative group" title="Despesa: R$ 10.400"></div>
              </div>
              <span class="text-[11px] font-bold text-slate-500">Set</span>
            </div>
            <!-- Mês 6 (Atual) -->
            <div class="flex flex-col items-center gap-2">
              <div class="w-full flex items-end justify-center gap-1.5 h-36">
                <div class="w-1/2 bg-emerald-600 shadow-md rounded-t-lg h-[100%] hover:opacity-90 transition relative group" title="Receita: R$ 34.850"></div>
                <div class="w-1/2 bg-rose-500 rounded-t-lg h-[32%] hover:opacity-90 transition relative group" title="Despesa: R$ 11.230"></div>
              </div>
              <span class="text-[11px] font-black text-indigo-700">Out (Atual)</span>
            </div>
          </div>
        </div>

        <!-- TABELA DE LANÇAMENTOS RECENTES -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-sm text-slate-900">Extrato Recente de Entradas & Saídas</h3>
            <button onclick="addFinancialEntryPrompt()" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition">
              + Novo Lançamento
            </button>
          </div>
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs text-slate-700">
              <thead class="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th class="py-2.5 px-3">Data</th>
                  <th class="py-2.5 px-3">Descrição</th>
                  <th class="py-2.5 px-3">Categoria</th>
                  <th class="py-2.5 px-3">Forma de Pagto</th>
                  <th class="py-2.5 px-3 text-right">Valor</th>
                </tr>
              </thead>
              <tbody id="financialEntriesTableBody" class="divide-y divide-slate-100 font-medium">
                <!-- Renderizado via JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  `;
}

export function renderCrmScripts(defaultNiche: string = 'barbearia'): string {
  return `
    // ==========================================
    // CRM & GESTÃO OPERACIONAL (MICRO-SAAS)
    // ==========================================
    let currentCrmNiche = localStorage.getItem('site_crm_active_niche') || '${defaultNiche}';

    // 1. DADOS INICIAIS MOCK REALISTAS SE VAZIO
    const initialBarberAppointments = [
      { id: 'b1', time: '09:00', client: 'Carlos Eduardo', phone: '11988776655', service: 'Corte Degradê + Barba', barber: 'Lucas Silva', value: 'R$ 75,00', status: 'Concluído' },
      { id: 'b2', time: '10:00', client: 'Rodrigo Antunes', phone: '11977665544', service: 'Corte Tradicional', barber: 'Marcos Vinicius', value: 'R$ 50,00', status: 'Concluído' },
      { id: 'b3', time: '11:30', client: 'Gabriel Santana', phone: '11966554433', service: 'Corte + Sobrancelha', barber: 'Lucas Silva', value: 'R$ 65,00', status: 'Em Atendimento' },
      { id: 'b4', time: '14:00', client: 'Felipe Ramos', phone: '11955443322', service: 'Barboterapia & Toalha Quente', barber: 'Rafael Santos', value: 'R$ 60,00', status: 'Confirmado' },
      { id: 'b5', time: '15:30', client: 'Lucas Pimentel', phone: '11944332211', service: 'Corte Degradê Navalhado', barber: 'Lucas Silva', value: 'R$ 55,00', status: 'Confirmado' },
      { id: 'b6', time: '17:00', client: 'Bruno Nogueira', phone: '11933221100', service: 'Corte + Barba Completa', barber: 'Marcos Vinicius', value: 'R$ 80,00', status: 'Confirmado' }
    ];

    const initialBarberRecall = [
      { name: 'Mateus Castro', phone: '11981234567', lastCut: '18 dias atrás', daysAgo: 26, barber: 'Lucas Silva' },
      { name: 'Alexandre Vieira', phone: '11982345678', lastCut: '22 dias atrás', daysAgo: 29, barber: 'Marcos Vinicius' },
      { name: 'Danilo Alcantara', phone: '11983456789', lastCut: '25 dias atrás', daysAgo: 32, barber: 'Rafael Santos' },
      { name: 'Thiago Oliveira', phone: '11984567890', lastCut: '27 dias atrás', daysAgo: 35, barber: 'Lucas Silva' },
      { name: 'Guilherme Mendes', phone: '11985678901', lastCut: '30 dias atrás', daysAgo: 38, barber: 'Marcos Vinicius' }
    ];

    const initialClinicPatients = [
      { id: 'c1', time: '08:30', name: 'Juliana Paes', phone: '11998877661', specialty: 'Consulta Médica de Rotina', type: 'Presencial', status: 'Concluído' },
      { id: 'c2', time: '09:45', name: 'Roberto Firmino', phone: '11998877662', specialty: 'Avaliação & Check-up', type: 'Presencial', status: 'Concluído' },
      { id: 'c3', time: '11:00', name: 'Ana Carolina Dias', phone: '11998877663', specialty: 'Retorno com Exames', type: 'Telemedicina', status: 'Em Consulta' },
      { id: 'c4', time: '14:15', name: 'Márcio Souza', phone: '11998877664', specialty: 'Segunda Opinião Médica', type: 'Presencial', status: 'Confirmado' },
      { id: 'c5', time: '15:30', name: 'Beatriz Vasconcelos', phone: '11998877665', specialty: 'Consulta de Acompanhamento', type: 'Telemedicina', status: 'Confirmado' },
      { id: 'c6', time: '16:45', name: 'Fernando Garcia', phone: '11998877666', specialty: 'Diagnóstico Preventivo', type: 'Presencial', status: 'Confirmado' }
    ];

    const initialRealEstateLeads = [
      { id: 're1', name: 'Marcelo Lima', phone: '11991223344', property: 'Apto 3 Qts Jardins - R$ 850k', stage: 'novos', date: 'Hoje às 10:15' },
      { id: 're2', name: 'Fernanda Martins', phone: '11992334455', property: 'Casa em Condomínio - R$ 1.2M', stage: 'contato', date: 'Ontem às 16:40' },
      { id: 're3', name: 'Lucas Brandão', phone: '11993445566', property: 'Cobertura Duplex - R$ 1.8M', stage: 'visita', date: 'Terça às 14:00' },
      { id: 're4', name: 'Patrícia Rocha', phone: '11994556677', property: 'Studio Mobiliado - R$ 420k', stage: 'proposta', date: 'Segunda às 11:20' },
      { id: 're5', name: 'Diego Azevedo', phone: '11995667788', property: 'Apto 2 Qts Moema - R$ 690k', stage: 'fechado', date: 'Semana passada' }
    ];

    const initialGymStudents = [
      { id: 'g1', name: 'Camila Duarte', phone: '11997112233', plan: 'Plano Anual VIP', value: 'R$ 139,00/mês', due: '15/10 (Hoje)', status: 'Vence Hoje' },
      { id: 'g2', name: 'Eduardo Silveira', phone: '11997223344', plan: 'Musculação Semestral', value: 'R$ 119,00/mês', due: '10/10 (Atrasado)', status: 'Atrasado' },
      { id: 'g3', name: 'Larissa Moura', phone: '11997334455', plan: 'Plano Black Completo', value: 'R$ 169,00/mês', due: '25/10', status: 'Em Dia' },
      { id: 'g4', name: 'Gustavo Henrique', phone: '11997445566', plan: 'Musculação + Funcional', value: 'R$ 149,00/mês', due: '28/10', status: 'Em Dia' },
      { id: 'g5', name: 'Isabela Fontes', phone: '11997556677', plan: 'Plano Anual VIP', value: 'R$ 139,00/mês', due: '05/11', status: 'Em Dia' }
    ];

    const initialPetQueue = [
      { id: 'p1', pet: 'Thor', breed: 'Golden Retriever', tutor: 'Mariana Costa', phone: '11996112233', service: 'Banho & Tosa Geral', taxi: true, stage: 'recepcao' },
      { id: 'p2', pet: 'Luna', breed: 'Poodle Toy', tutor: 'Cláudia Ribeiro', phone: '11996223344', service: 'Banho Hidratação', taxi: false, stage: 'banho' },
      { id: 'p3', pet: 'Bob', breed: 'Bulldog Francês', tutor: 'Renato Silva', phone: '11996334455', service: 'Banho Medicamentoso', taxi: false, stage: 'secagem' },
      { id: 'p4', pet: 'Mel', breed: 'Shih Tzu', tutor: 'Priscila Prado', phone: '11996445566', service: 'Tosa na Tesoura', taxi: true, stage: 'tosa' },
      { id: 'p5', pet: 'Max', breed: 'Spitz Alemão', tutor: 'Julio Cesar', phone: '11996556677', service: 'Banho & Tosa Higiênica', taxi: true, stage: 'pronto' }
    ];

    const initialFinancialEntries = [
      { date: '14/10', desc: 'Atendimentos do Dia (Cortes e Serviços)', cat: 'Receita Operacional', method: 'PIX Direto', value: '+ R$ 720,00', type: 'in' },
      { date: '14/10', desc: 'Assinatura Recorrente / Mensalidades', cat: 'Receita Recorrente', method: 'Cartão de Crédito', value: '+ R$ 850,00', type: 'in' },
      { date: '13/10', desc: 'Reposição de Insumos & Produtos', cat: 'Despesa Fornecedor', method: 'Boleto Bancário', value: '- R$ 340,00', type: 'out' },
      { date: '12/10', desc: 'Comissão da Equipe Operacional', cat: 'Folha / Comissões', method: 'PIX', value: '- R$ 1.250,00', type: 'out' },
      { date: '11/10', desc: 'Fechamento de Pacote Especial', cat: 'Receita de Venda', method: 'PIX Direto', value: '+ R$ 1.450,00', type: 'in' },
      { date: '10/10', desc: 'Energia Elétrica & Condomínio', cat: 'Custo Fixo', method: 'Débito Automático', value: '- R$ 680,00', type: 'out' }
    ];

    function getCrmStorage(key, initial) {
      try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initial;
      } catch (e) {
        return initial;
      }
    }

    let barberAppointments = getCrmStorage('site_crm_barber_appointments', initialBarberAppointments);
    let clinicPatients = getCrmStorage('site_crm_clinic_appointments', initialClinicPatients);
    let realEstateLeads = getCrmStorage('site_crm_realestate_leads', initialRealEstateLeads);
    let gymStudents = getCrmStorage('site_crm_gym_students', initialGymStudents);
    let petQueue = getCrmStorage('site_crm_petshop_queue', initialPetQueue);
    let financialEntries = getCrmStorage('site_crm_financial_entries', initialFinancialEntries);

    function switchCrmNiche(niche) {
      currentCrmNiche = niche;
      localStorage.setItem('site_crm_active_niche', niche);

      // Atualiza botões (pills)
      const niches = ['barbearia', 'clinica', 'imobiliaria', 'academia', 'petshop', 'financeiro'];
      niches.forEach(n => {
        const pill = document.getElementById('crmPill_' + n);
        const view = document.getElementById('crmView_' + n);
        if (pill) {
          if (n === niche) {
            pill.className = 'crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-indigo-600 text-white shadow';
          } else {
            pill.className = 'crm-niche-pill px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-white/10';
          }
        }
        if (view) {
          if (n === niche) {
            view.classList.remove('hidden');
          } else {
            view.classList.add('hidden');
          }
        }
      });

      // Atualiza badge no header
      const badge = document.getElementById('crmCurrentNicheBadge');
      if (badge) {
        const labels = {
          barbearia: '💈 Modo Barbearia Ativo',
          clinica: '🩺 Modo Clínica Ativo',
          imobiliaria: '🏡 Modo Imobiliária Ativo',
          academia: '🏋️ Modo Academia Ativo',
          petshop: '🐾 Modo Pet Shop Ativo',
          financeiro: '💰 Gestão Financeira Ativa'
        };
        badge.innerText = labels[niche] || 'Modo Operacional Ativo';
      }

      renderCurrentNicheUI();
    }

    function renderCurrentNicheUI() {
      if (currentCrmNiche === 'barbearia') renderBarberUI();
      if (currentCrmNiche === 'clinica') renderClinicUI();
      if (currentCrmNiche === 'imobiliaria') renderRealEstateUI();
      if (currentCrmNiche === 'academia') renderGymUI();
      if (currentCrmNiche === 'petshop') renderPetUI();
      if (currentCrmNiche === 'financeiro') renderFinancialUI();
    }

    // --- BARBEARIA RENDER ---
    function renderBarberUI() {
      // Recall Table
      const recallTbody = document.getElementById('barberRecallTableBody');
      if (recallTbody) {
        recallTbody.innerHTML = initialBarberRecall.map(r => {
          const msg = encodeURIComponent('Fala ' + r.name + ', beleza? Passando pra lembrar que já faz ' + r.daysAgo + ' dias do seu último corte aqui com ' + r.barber + '. Bora agendar pra manter o visual alinhado?');
          return '<tr class="hover:bg-amber-50/40 transition">' +
            '<td class="py-2.5 px-3 font-bold text-slate-900">' + r.name + '</td>' +
            '<td class="py-2.5 px-3 font-mono text-indigo-600">' + r.phone + '</td>' +
            '<td class="py-2.5 px-3 text-slate-500">' + r.lastCut + '</td>' +
            '<td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">' + r.daysAgo + ' dias</span></td>' +
            '<td class="py-2.5 px-3 font-semibold text-slate-700">' + r.barber + '</td>' +
            '<td class="py-2.5 px-3 text-right">' +
              '<a href="https://wa.me/55' + r.phone.replace(/\\D/g, '') + '?text=' + msg + '" target="_blank" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-sm transition inline-flex items-center gap-1">' +
                '<span>📲</span> Reconvocar WhatsApp' +
              '</a>' +
            '</td>' +
          '</tr>';
        }).join('');
      }

      // Appointments Table
      const appTbody = document.getElementById('barberAppointmentsTableBody');
      if (appTbody) {
        appTbody.innerHTML = barberAppointments.map((a, idx) => {
          const statusBadge = a.status === 'Concluído'
            ? 'bg-emerald-100 text-emerald-800'
            : a.status === 'Em Atendimento'
            ? 'bg-amber-100 text-amber-800'
            : 'bg-blue-100 text-blue-800';

          const msgConfirm = encodeURIComponent('Olá ' + a.client + '! Confirmamos seu agendamento de ' + a.service + ' hoje às ' + a.time + ' com ' + a.barber + '. Nos vemos em breve!');

          return '<tr class="hover:bg-slate-50 transition">' +
            '<td class="py-3 px-3 font-bold text-indigo-700 font-mono text-xs">' + a.time + '</td>' +
            '<td class="py-3 px-3 font-bold text-slate-900">' + a.client + '</td>' +
            '<td class="py-3 px-3 font-mono text-slate-500">' + a.phone + '</td>' +
            '<td class="py-3 px-3 font-semibold text-slate-700">' + a.service + '</td>' +
            '<td class="py-3 px-3 text-slate-600">' + a.barber + '</td>' +
            '<td class="py-3 px-3 font-bold font-mono text-slate-800">' + a.value + '</td>' +
            '<td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + statusBadge + '">' + a.status + '</span></td>' +
            '<td class="py-3 px-3 text-right space-x-1.5">' +
              '<button onclick="toggleBarberStatus(' + idx + ')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition">' +
                'Avançar Status' +
              '</button>' +
              '<a href="https://wa.me/55' + a.phone.replace(/\\D/g, '') + '?text=' + msgConfirm + '" target="_blank" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition inline-flex items-center gap-1">' +
                '<span>💬</span> Confirmar' +
              '</a>' +
            '</td>' +
          '</tr>';
        }).join('');
      }
    }

    function toggleBarberStatus(idx) {
      if (!barberAppointments[idx]) return;
      const cur = barberAppointments[idx].status;
      barberAppointments[idx].status = cur === 'Confirmado' ? 'Em Atendimento' : cur === 'Em Atendimento' ? 'Concluído' : 'Confirmado';
      localStorage.setItem('site_crm_barber_appointments', JSON.stringify(barberAppointments));
      renderBarberUI();
      triggerSave('Status do agendamento atualizado!');
    }

    function openBarberNewModal() {
      const client = prompt('Nome do Cliente:');
      if (!client) return;
      const phone = prompt('WhatsApp do Cliente (apenas números com DDD):', '11999998888') || '';
      const service = prompt('Serviço (Ex: Corte Degradê + Barba):', 'Corte Degradê + Barba') || 'Corte';
      const barber = prompt('Barbeiro (Lucas, Marcos ou Rafael):', 'Lucas Silva') || 'Lucas Silva';
      const time = prompt('Horário (Ex: 16:30):', '16:30') || '16:30';
      const val = prompt('Valor (Ex: R$ 65,00):', 'R$ 65,00') || 'R$ 65,00';

      barberAppointments.push({
        id: 'b_' + Date.now(),
        time: time,
        client: client,
        phone: phone,
        service: service,
        barber: barber,
        value: val,
        status: 'Confirmado'
      });
      localStorage.setItem('site_crm_barber_appointments', JSON.stringify(barberAppointments));
      renderBarberUI();
      triggerSave('✓ Novo agendamento lançado na barbearia!');
    }

    // --- CLÍNICA RENDER ---
    function renderClinicUI() {
      const tbody = document.getElementById('clinicPatientsTableBody');
      if (!tbody) return;
      tbody.innerHTML = clinicPatients.map((p, idx) => {
        const isOnline = p.type === 'Telemedicina';
        const typeBadge = isOnline ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700';
        const statusBadge = p.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' : p.status === 'Em Consulta' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800';

        const msgReminder = encodeURIComponent('Olá ' + p.name + '! Lembramos da sua consulta marcada para hoje às ' + p.time + ' (' + p.specialty + '). Pedimos chegar 10 min antes ou acessar o link de telemedicina. Qualquer dúvida estamos à disposição!');

        return '<tr class="hover:bg-slate-50 transition">' +
          '<td class="py-3 px-3 font-bold text-teal-700 font-mono text-xs">' + p.time + '</td>' +
          '<td class="py-3 px-3 font-bold text-slate-900">' + p.name + '</td>' +
          '<td class="py-3 px-3 font-mono text-slate-500">' + p.phone + '</td>' +
          '<td class="py-3 px-3 font-semibold text-slate-700">' + p.specialty + '</td>' +
          '<td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + typeBadge + '">' + (isOnline ? '📹 Online' : '🏥 Presencial') + '</span></td>' +
          '<td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + statusBadge + '">' + p.status + '</span></td>' +
          '<td class="py-3 px-3 text-right space-x-1.5">' +
            '<button onclick="toggleClinicStatus(' + idx + ')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition">' +
              'Status' +
            '</button>' +
            '<a href="https://wa.me/55' + p.phone.replace(/\\D/g, '') + '?text=' + msgReminder + '" target="_blank" class="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold rounded-lg transition inline-flex items-center gap-1">' +
              '<span>💬</span> Lembrete 24h' +
            '</a>' +
          '</td>' +
        '</tr>';
      }).join('');
    }

    function toggleClinicStatus(idx) {
      if (!clinicPatients[idx]) return;
      const cur = clinicPatients[idx].status;
      clinicPatients[idx].status = cur === 'Confirmado' ? 'Em Consulta' : cur === 'Em Consulta' ? 'Concluído' : 'Confirmado';
      localStorage.setItem('site_crm_clinic_appointments', JSON.stringify(clinicPatients));
      renderClinicUI();
      triggerSave('Status da consulta atualizado!');
    }

    function openClinicNewModal() {
      const name = prompt('Nome do Paciente:');
      if (!name) return;
      const phone = prompt('WhatsApp do Paciente:', '11999998888') || '';
      const specialty = prompt('Especialidade / Motivo:', 'Consulta Especializada') || 'Consulta';
      const time = prompt('Horário (Ex: 14:00):', '14:00') || '14:00';
      const type = confirm('Será telemedicina (online)? OK para Sim, Cancelar para Presencial') ? 'Telemedicina' : 'Presencial';

      clinicPatients.push({
        id: 'c_' + Date.now(),
        time: time,
        name: name,
        phone: phone,
        specialty: specialty,
        type: type,
        status: 'Confirmado'
      });
      localStorage.setItem('site_crm_clinic_appointments', JSON.stringify(clinicPatients));
      renderClinicUI();
      triggerSave('✓ Nova consulta registrada na clínica!');
    }

    // --- IMOBILIÁRIA KANBAN RENDER ---
    function renderRealEstateUI() {
      const stages = ['novos', 'contato', 'visita', 'proposta', 'fechado'];
      stages.forEach(st => {
        const col = document.getElementById('kanbanCol_' + st);
        const count = document.getElementById('kanbanCount_' + st);
        const leads = realEstateLeads.filter(l => l.stage === st);

        if (count) count.innerText = leads.length;
        if (!col) return;

        if (leads.length === 0) {
          col.innerHTML = '<div class="h-28 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 font-semibold">Nenhum lead</div>';
          return;
        }

        col.innerHTML = leads.map(l => {
          const nextStage = st === 'novos' ? 'contato' : st === 'contato' ? 'visita' : st === 'visita' ? 'proposta' : st === 'proposta' ? 'fechado' : '';
          const prevStage = st === 'fechado' ? 'proposta' : st === 'proposta' ? 'visita' : st === 'visita' ? 'contato' : st === 'contato' ? 'novos' : '';

          const msg = encodeURIComponent('Olá ' + l.name + '! Vi seu interesse no imóvel ' + l.property + '. Sou especialista da imobiliária, como posso te ajudar hoje com fotos e detalhes?');

          return '<div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 hover:border-blue-300 transition">' +
            '<div class="flex items-center justify-between">' +
              '<span class="text-xs font-bold text-slate-900">' + l.name + '</span>' +
              '<span class="text-[9px] font-mono text-slate-400">' + l.date + '</span>' +
            '</div>' +
            '<p class="text-[11px] font-semibold text-blue-700 leading-snug">' + l.property + '</p>' +
            '<div class="flex items-center justify-between pt-1 border-t border-slate-100">' +
              '<a href="https://wa.me/55' + l.phone.replace(/\\D/g, '') + '?text=' + msg + '" target="_blank" class="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">' +
                '<span>💬</span> WhatsApp' +
              '</a>' +
              '<div class="flex items-center gap-1">' +
                (prevStage ? '<button onclick="moveRealEstateLead(\\'' + l.id + '\\', \\'' + prevStage + '\\')" class="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 rounded">◀</button>' : '') +
                (nextStage ? '<button onclick="moveRealEstateLead(\\'' + l.id + '\\', \\'' + nextStage + '\\')" class="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded">▶</button>' : '') +
              '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      });
    }

    function moveRealEstateLead(id, newStage) {
      const item = realEstateLeads.find(l => l.id === id);
      if (item) {
        item.stage = newStage;
        localStorage.setItem('site_crm_realestate_leads', JSON.stringify(realEstateLeads));
        renderRealEstateUI();
        triggerSave('Lead movido no funil!');
      }
    }

    function openRealEstateNewModal() {
      const name = prompt('Nome do Interessado:');
      if (!name) return;
      const phone = prompt('WhatsApp do Interessado:', '11999998888') || '';
      const prop = prompt('Imóvel de Interesse (Ex: Apto 3 Qts - R$ 750k):', 'Apartamento 3 Qts') || 'Imóvel Residencial';

      realEstateLeads.push({
        id: 're_' + Date.now(),
        name: name,
        phone: phone,
        property: prop,
        stage: 'novos',
        date: 'Hoje'
      });
      localStorage.setItem('site_crm_realestate_leads', JSON.stringify(realEstateLeads));
      renderRealEstateUI();
      triggerSave('✓ Novo lead imobiliário adicionado ao funil!');
    }

    // --- ACADEMIA RENDER ---
    function renderGymUI() {
      const tbody = document.getElementById('gymStudentsTableBody');
      if (!tbody) return;
      tbody.innerHTML = gymStudents.map((g, idx) => {
        const isLate = g.status === 'Atrasado';
        const isToday = g.status === 'Vence Hoje';
        const statusBadge = isLate ? 'bg-rose-100 text-rose-800' : isToday ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800';

        const pixCode = '00020126580014br.gov.bcb.pix0136financeiro@powerfit.com.br520400005303986540' + g.value.replace(/\\D/g, '') + '5802BR5915PowerFit6009Sao Paulo62070503***6304';
        const msgCob = encodeURIComponent('Fala ' + g.name + '! Tudo bem? Sua mensalidade do ' + g.plan + ' (' + g.value + ') está com vencimento programado para ' + g.due + '. Segue a chave PIX para facilitar o pagamento:\\n\\nfinanceiro@powerfit.com.br\\n\\nNos vemos nos treinos! 💪');

        return '<tr class="hover:bg-slate-50 transition">' +
          '<td class="py-3 px-3 font-bold text-slate-900">' + g.name + '</td>' +
          '<td class="py-3 px-3 font-mono text-slate-500">' + g.phone + '</td>' +
          '<td class="py-3 px-3 font-semibold text-slate-700">' + g.plan + '</td>' +
          '<td class="py-3 px-3 font-bold font-mono text-slate-800">' + g.value + '</td>' +
          '<td class="py-3 px-3 font-mono text-xs text-slate-600">' + g.due + '</td>' +
          '<td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + statusBadge + '">' + g.status + '</span></td>' +
          '<td class="py-3 px-3 text-right">' +
            '<a href="https://wa.me/55' + g.phone.replace(/\\D/g, '') + '?text=' + msgCob + '" target="_blank" class="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] rounded-lg shadow-sm transition inline-flex items-center gap-1">' +
              '<span>⚡</span> Cobrança PIX WhatsApp' +
            '</a>' +
          '</td>' +
        '</tr>';
      }).join('');
    }

    function openGymNewModal() {
      const name = prompt('Nome do Aluno:');
      if (!name) return;
      const phone = prompt('WhatsApp do Aluno:', '11999998888') || '';
      const plan = prompt('Plano (Mensal, Trimestral, Anual VIP):', 'Plano Anual VIP') || 'Plano Anual';
      const val = prompt('Valor (Ex: R$ 139,00/mês):', 'R$ 139,00/mês') || 'R$ 139,00';

      gymStudents.push({
        id: 'g_' + Date.now(),
        name: name,
        phone: phone,
        plan: plan,
        value: val,
        due: 'Dia 10',
        status: 'Em Dia'
      });
      localStorage.setItem('site_crm_gym_students', JSON.stringify(gymStudents));
      renderGymUI();
      triggerSave('✓ Novo aluno matriculado!');
    }

    // --- PET SHOP RENDER ---
    function renderPetUI() {
      const stages = ['recepcao', 'banho', 'secagem', 'tosa', 'pronto'];
      stages.forEach(st => {
        const col = document.getElementById('petCol_' + st);
        const count = document.getElementById('petCount_' + st);
        const pets = petQueue.filter(p => p.stage === st);

        if (count) count.innerText = pets.length;
        if (!col) return;

        if (pets.length === 0) {
          col.innerHTML = '<div class="h-28 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 font-semibold">Vazio</div>';
          return;
        }

        col.innerHTML = pets.map(p => {
          const nextStage = st === 'recepcao' ? 'banho' : st === 'banho' ? 'secagem' : st === 'secagem' ? 'tosa' : st === 'tosa' ? 'pronto' : '';
          const isReady = st === 'pronto';

          const msgReady = encodeURIComponent('Olá ' + p.tutor + '! O seu pet ' + p.pet + ' já terminou o serviço (' + p.service + ') e está pronto, cheiroso e feliz te esperando para retirada! 🐾');

          return '<div class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition">' +
            '<div class="flex items-center justify-between">' +
              '<span class="text-xs font-black text-slate-900 flex items-center gap-1">🐾 ' + p.pet + '</span>' +
              (p.taxi ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">🚕 Táxi Dog</span>' : '') +
            '</div>' +
            '<p class="text-[10px] text-slate-500 font-medium">' + p.breed + ' • Tutor(a): ' + p.tutor + '</p>' +
            '<div class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">' + p.service + '</div>' +
            '<div class="flex items-center justify-between pt-1 border-t border-slate-100">' +
              (isReady
                ? '<a href="https://wa.me/55' + p.phone.replace(/\\D/g, '') + '?text=' + msgReady + '" target="_blank" class="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition inline-flex items-center gap-1">' +
                    '<span>📲</span> Avisar Tutor' +
                  '</a>'
                : '<span class="text-[10px] text-slate-400 font-mono">Em execução</span>'
              ) +
              (nextStage ? '<button onclick="movePetStage(\\'' + p.id + '\\', \\'' + nextStage + '\\')" class="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg transition">Avançar ➔</button>' : '') +
            '</div>' +
          '</div>';
        }).join('');
      });
    }

    function movePetStage(id, newStage) {
      const item = petQueue.find(p => p.id === id);
      if (item) {
        item.stage = newStage;
        localStorage.setItem('site_crm_petshop_queue', JSON.stringify(petQueue));
        renderPetUI();
        triggerSave('Pet avançou de fase na esteira!');
      }
    }

    function openPetNewModal() {
      const pet = prompt('Nome do Pet (Ex: Thor):');
      if (!pet) return;
      const breed = prompt('Raça (Ex: Golden Retriever, Poodle, SRD):', 'SRD') || 'SRD';
      const tutor = prompt('Nome do Tutor(a):', 'Cliente') || 'Cliente';
      const phone = prompt('WhatsApp do Tutor:', '11999998888') || '';
      const service = prompt('Serviço (Banho e Tosa, Tosa Higiênica):', 'Banho & Tosa') || 'Banho';
      const taxi = confirm('Usa Táxi Dog para busca/entrega?');

      petQueue.push({
        id: 'p_' + Date.now(),
        pet: pet,
        breed: breed,
        tutor: tutor,
        phone: phone,
        service: service,
        taxi: taxi,
        stage: 'recepcao'
      });
      localStorage.setItem('site_crm_petshop_queue', JSON.stringify(petQueue));
      renderPetUI();
      triggerSave('✓ Pet registrado na recepção!');
    }

    // --- FINANCEIRO RENDER ---
    function renderFinancialUI() {
      const tbody = document.getElementById('financialEntriesTableBody');
      if (!tbody) return;
      tbody.innerHTML = financialEntries.map(f => {
        const isIn = f.type === 'in';
        const valClass = isIn ? 'text-emerald-700 font-black' : 'text-rose-600 font-bold';
        const badge = isIn ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';

        return '<tr class="hover:bg-slate-50 transition">' +
          '<td class="py-2.5 px-3 font-mono text-xs text-slate-500">' + f.date + '</td>' +
          '<td class="py-2.5 px-3 font-bold text-slate-900">' + f.desc + '</td>' +
          '<td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ' + badge + '">' + f.cat + '</span></td>' +
          '<td class="py-2.5 px-3 font-semibold text-slate-600">' + f.method + '</td>' +
          '<td class="py-2.5 px-3 text-right font-mono ' + valClass + '">' + f.value + '</td>' +
        '</tr>';
      }).join('');
    }

    function addFinancialEntryPrompt() {
      const desc = prompt('Descrição do Lançamento (Ex: Pagamento de Cliente / Insumos):');
      if (!desc) return;
      const isIn = confirm('É uma Entrada (Receita)? Clique OK para Entrada, ou Cancelar para Saída (Despesa).');
      const valRaw = prompt('Valor em R$ (Ex: 350,00):', '350,00') || '0,00';
      const cat = prompt('Categoria (Ex: Receita Operacional, Fornecedor, Custos):', isIn ? 'Receita Operacional' : 'Custo Operacional') || 'Operacional';

      financialEntries.unshift({
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        desc: desc,
        cat: cat,
        method: 'PIX Direto',
        value: (isIn ? '+ R$ ' : '- R$ ') + valRaw,
        type: isIn ? 'in' : 'out'
      });
      localStorage.setItem('site_crm_financial_entries', JSON.stringify(financialEntries));
      renderFinancialUI();
      triggerSave('✓ Novo lançamento financeiro computado!');
    }

    function renderCrmUI() {
      switchCrmNiche(currentCrmNiche);
    }
  `;
}
