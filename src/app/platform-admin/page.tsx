'use client';

import { useEffect, useState } from 'react';
import { 
  Ticket, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Plus, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  ExternalLink,
  Layers,
  Zap,
  Sparkles,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function PlatformAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creatingVoucher, setCreatingVoucher] = useState(false);
  
  // Novo voucher
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');

  // Gerador Rápido de Testes (Simulador de UI & Stitch)
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickProfession, setQuickProfession] = useState('Churrasqueiro & Buffet');
  const [quickSpecialty, setQuickSpecialty] = useState('Churrasco Corporativo, Parrilla e Eventos');
  const [quickProfessionalName, setQuickProfessionalName] = useState('Mestre Alessandro Carnes');
  const [quickTemplate, setQuickTemplate] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D'>('MODEL_A');
  const [generatingQuickSite, setGeneratingQuickSite] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/platform-admin');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateVoucher(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/platform-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, description }),
      });
      const resJson = await res.json();
      if (res.ok) {
        setClientName('');
        setClientEmail('');
        setDescription('');
        setCreatingVoucher(false);
        loadData();
      } else {
        alert(resJson.error || 'Erro ao criar voucher.');
      }
    } catch (err: any) {
      alert('Erro de conexão ao criar voucher: ' + err.message);
    }
  }

  async function handleExecuteQuickPreview() {
    setGeneratingQuickSite(true);
    try {
      const payload = {
        fullName: quickProfessionalName || 'Alessandro Especialista',
        professionalName: quickProfessionalName || 'Alessandro Especialista',
        companyName: quickProfessionalName || 'Alessandro Especialista',
        publicEmail: 'contato@teste.com.br',
        whatsapp: '11999999999',
        profession: quickProfession || 'Profissional Liberal',
        mainSpecialty: quickSpecialty || 'Atendimento de Alta Performance',
        professionalSummary: 'Especialista dedicado a entregar atendimento humanizado, rigor técnico e excelência em cada projeto.',
        attendanceType: 'hibrido',
        city: 'São Paulo',
        state: 'SP',
        services: [
          { title: `Atendimento & Diagnóstico em ${quickProfession}`, shortDescription: 'Análise técnica especializada e personalizada de acordo com seu objetivo.', ctaText: 'Saber Mais' },
          { title: `Soluções em ${quickSpecialty}`, shortDescription: 'Planejamento estratégico e execução prática focada em excelência.', ctaText: 'Agendar' },
          { title: 'Consultoria Especializada', shortDescription: 'Acompanhamento dedicado com suporte contínuo para os melhores resultados.', ctaText: 'Consultar' }
        ],
        hasProfessionalCouncil: false,
        primaryColor: '#0f172a',
        secondaryColor: '#3b82f6',
        selectedDesignVariant: quickTemplate
      };

      const res = await fetch('/api/onboarding/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await res.json();
      if (resData.success && resData.previews && resData.previews[quickTemplate]) {
        const previewHtml = resData.previews[quickTemplate].html;
        const win = window.open('', '_blank');
        if (win) {
          win.document.open();
          win.document.write(previewHtml);
          win.document.close();
          setQuickModalOpen(false);
        } else {
          alert('Por favor, permita pop-ups no seu navegador para abrir o site gerado.');
        }
      } else {
        alert('Erro ao gerar prévia: ' + (resData.error || 'Verifique os dados informados'));
      }
    } catch (err: any) {
      alert('Falha na comunicação: ' + err.message);
    } finally {
      setGeneratingQuickSite(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              SP
            </div>
            <span className="font-bold text-lg tracking-tight">SitePronto Platform Admin</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuickModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-sm transition border border-emerald-400/30"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ Gerador Rápido (Testes)</span>
            </button>
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              Voltar ao Site
            </Link>
            <button
              onClick={loadData}
              className="p-2 text-slate-400 hover:text-white rounded-lg"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Status de Integrações de Infraestrutura */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">GitHub</div>
              <div className="text-sm font-bold text-slate-800">{data?.integrations?.github?.scope || 'Conectado'}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Vercel</div>
              <div className="text-sm font-bold text-slate-800">{data?.integrations?.vercel?.scope || 'Conectado'}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Neon PostgreSQL</div>
              <div className="text-sm font-bold text-slate-800">Conectado</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Resend Email</div>
              <div className="text-sm font-bold text-slate-800">Configurado</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">AI / DesignSpec</div>
              <div className="text-sm font-bold text-slate-800">Ativo</div>
            </div>
          </div>
        </div>

        {/* Métricas Gerais */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Emitidos</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalVouchers || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Ativos / Livres</div>
            <div className="text-3xl font-extrabold text-emerald-600 mt-2">{data?.metrics?.vouchersIssued || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sites Criados</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalSites || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sites Concluídos</div>
            <div className="text-3xl font-extrabold text-indigo-600 mt-2">{data?.metrics?.activeSites || 0}</div>
          </div>
        </div>

        {/* Vouchers Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Gerenciamento de Vouchers</h2>
              <p className="text-xs text-slate-500">Emita vouchers de alta entropia para seus clientes iniciarem seus sites.</p>
            </div>
            <button
              onClick={() => setCreatingVoucher(!creatingVoucher)}
              className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Emitir Novo Voucher
            </button>
          </div>

          {creatingVoucher && (
            <form onSubmit={handleCreateVoucher} className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Nome do Cliente</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Dr. Roberto Alencar"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">E-mail do Cliente</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="cliente@email.com"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Descrição / Nota</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Plano Standard Pro"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCreatingVoucher(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Gerar Voucher
                </button>
              </div>
            </form>
          )}

          {/* Tabela de Vouchers */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Código Voucher</th>
                  <th className="py-3 px-4">Cliente / Destinatário</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Link de Resgate</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.vouchers?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Nenhum voucher emitido ainda.
                    </td>
                  </tr>
                ) : (
                  data?.vouchers?.map((v: any) => (
                    <tr key={v.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{v.code}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{v.clientName || 'Geral'}</div>
                        <div className="text-xs text-slate-400">{v.clientEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          v.status === 'ISSUED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs font-mono">
                        <Link 
                          href={`/iniciar`} 
                          className="text-indigo-600 hover:underline flex items-center"
                        >
                          /iniciar <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">
                        {new Date(v.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm(`Deseja realmente excluir o voucher ${v.code}?`)) {
                              await fetch(`/api/vouchers/delete?id=${v.id}`, { method: 'DELETE' });
                              loadData();
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir Voucher"
                        >
                          ✕ Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sites Provisionados */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Sites Criados na Fábrica</h2>
          <p className="text-xs text-slate-500 mb-6">Lista de sites provisionados e seus status.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nome do Site</th>
                  <th className="py-3 px-4">Profissão</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Deploy Vercel</th>
                  <th className="py-3 px-4">Progresso</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.sites?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Nenhum site criado ainda.
                    </td>
                  </tr>
                ) : (
                  data?.sites?.map((s: any) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3 px-4 text-xs">{s.profession}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {s.vercelUrl ? (
                          <a href={s.vercelUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold hover:underline">
                            Ver Site
                          </a>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <Link href={`/progresso/${s.id}`} className="text-slate-900 font-semibold hover:underline">
                          Ver Etapas
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={async () => {
                            if (confirm(`Deseja excluir o site ${s.name} e remover recursos na Vercel/Neon?`)) {
                              await fetch(`/api/sites/delete?id=${s.id}`, { method: 'DELETE' });
                              loadData();
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                        >
                          Excluir Projeto
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Interativo: Gerador Rápido de Testes (Simulador de UI & Stitch) */}
        {quickModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header do Modal */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Gerador Rápido de Sites (Modo Testes)</h3>
                    <p className="text-xs text-slate-400">Escolha a profissão e o modelo para sintetizar e visualizar em segundos.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setQuickModalOpen(false)} 
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Corpo do Modal */}
              <div className="p-6 overflow-y-auto space-y-5 text-sm">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Profissão / Nicho de Teste</label>
                  <div className="grid grid-cols-2 gap-2 mb-2.5">
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Churrasqueiro & Buffet');
                        setQuickSpecialty('Churrasco Corporativo, Parrilla e Eventos');
                        setQuickProfessionalName('Mestre Alessandro Carnes');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      🥩 Churrasqueiro
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Advogado Especialista');
                        setQuickSpecialty('Direito Civil, Empresarial e Contratos');
                        setQuickProfessionalName('Dr. Alessandro Advocacia');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      ⚖️ Advogado
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Médico Especialista');
                        setQuickSpecialty('Clínica Geral, Preventiva e Diagnósticos');
                        setQuickProfessionalName('Dr. Alessandro Silva');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      🩺 Médico
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Personal Trainer');
                        setQuickSpecialty('Consultoria Fitness, Treino Funcional e Saúde');
                        setQuickProfessionalName('Alessandro Trainer');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      🏋️ Personal Trainer
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Arquiteto & Designer');
                        setQuickSpecialty('Projetos Residenciais, Comerciais e Interiores');
                        setQuickProfessionalName('Studio Alessandro Arquitetura');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      📐 Arquiteto
                    </button>
                    <button 
                      type="button" 
                      onClick={() => {
                        setQuickProfession('Mecânico Automotivo');
                        setQuickSpecialty('Manutenção Preventiva, Injeção Eletrônica e Motores');
                        setQuickProfessionalName('Oficina Alessandro Motors');
                      }} 
                      className="p-2.5 border rounded-xl text-left text-xs hover:border-slate-900 bg-slate-50 font-medium transition"
                    >
                      🔧 Mecânico
                    </button>
                  </div>

                  <input 
                    type="text" 
                    value={quickProfession} 
                    onChange={(e) => setQuickProfession(e.target.value)}
                    placeholder="Ou digite outra profissão..." 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome Profissional / Empresa</label>
                  <input 
                    type="text" 
                    value={quickProfessionalName} 
                    onChange={(e) => setQuickProfessionalName(e.target.value)}
                    placeholder="Ex: Dr. Roberto Alencar..." 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Especialidade / Foco Principal</label>
                  <input 
                    type="text" 
                    value={quickSpecialty} 
                    onChange={(e) => setQuickSpecialty(e.target.value)}
                    placeholder="Ex: Carnes Nobres, Direito Imobiliário..." 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Modelo Visual (Design Template)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickTemplate('MODEL_A')}
                      className={`p-3 rounded-2xl border-2 text-center transition flex flex-col items-center ${
                        quickTemplate === 'MODEL_A' 
                          ? 'border-slate-900 bg-slate-50 shadow-sm font-bold' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs text-slate-900">Modelo A</span>
                      <span className="text-[10px] text-slate-500 font-normal">Institucional</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickTemplate('MODEL_B')}
                      className={`p-3 rounded-2xl border-2 text-center transition flex flex-col items-center ${
                        quickTemplate === 'MODEL_B' 
                          ? 'border-slate-900 bg-slate-50 shadow-sm font-bold' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs text-slate-900">Modelo B</span>
                      <span className="text-[10px] text-slate-500 font-normal">Dark Premium</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickTemplate('MODEL_C')}
                      className={`p-3 rounded-2xl border-2 text-center transition flex flex-col items-center ${
                        quickTemplate === 'MODEL_C' 
                          ? 'border-slate-900 bg-slate-50 shadow-sm font-bold' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs text-slate-900">Modelo C</span>
                      <span className="text-[10px] text-slate-500 font-normal">Editorial</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickTemplate('MODEL_D')}
                      className={`p-3 rounded-2xl border-2 text-center transition flex flex-col items-center ${
                        quickTemplate === 'MODEL_D' 
                          ? 'border-emerald-600 bg-emerald-50 shadow-sm font-bold' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs text-emerald-700">Modelo D</span>
                      <span className="text-[10px] text-emerald-600 font-normal">Stitch Pulse</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setQuickModalOpen(false)} 
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleExecuteQuickPreview} 
                  disabled={generatingQuickSite}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition"
                >
                  {generatingQuickSite ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Sintetizando Site...</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Visualizar Site Imediatamente</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
