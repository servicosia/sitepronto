'use client';

export const dynamic = 'force-dynamic';

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
  X,
  Mail,
  Send,
  Trash2,
  Check,
  AlertCircle,
  Lock,
  QrCode,
  Key,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

export default function PlatformAdminPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(null);
  const [resendingVoucherId, setResendingVoucherId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [creatingVoucher, setCreatingVoucher] = useState(false);

  // Estados de Autenticação em 2 Etapas (2FA) do Admin Master
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorCodeInput, setTwoFactorCodeInput] = useState('');
  const [admin2faEnabled, setAdmin2faEnabled] = useState(false);
  const [admin2faLoading, setAdmin2faLoading] = useState(false);
  const [admin2faSetupData, setAdmin2faSetupData] = useState<{ secret: string; qrCodeUrl: string; uri: string } | null>(null);
  const [admin2faModalOpen, setAdmin2faModalOpen] = useState(false);
  const [admin2faConfirmCode, setAdmin2faConfirmCode] = useState('');
  const [admin2faActionError, setAdmin2faActionError] = useState('');
  
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
  const [quickHasDomain, setQuickHasDomain] = useState(false);
  const [quickDomainName, setQuickDomainName] = useState('alessandrocarnes.com.br');
  const [generatingQuickSite, setGeneratingQuickSite] = useState(false);
  const [provisioningLiveSite, setProvisioningLiveSite] = useState(false);

  async function load2faStatus() {
    try {
      const res = await fetch('/api/platform-admin/2fa');
      const json = await res.json();
      if (res.ok) {
        setAdmin2faEnabled(Boolean(json.enabled));
        if (!json.enabled && json.secret) {
          setAdmin2faSetupData(json);
        }
      }
    } catch (err) {
      console.error('Erro ao verificar status 2FA:', err);
    }
  }

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/platform-admin');
      if (res.status === 401) {
        setAuthenticated(false);
        setData(null);
        return;
      }
      const json = await res.json();
      if (json.authenticated) {
        setAuthenticated(true);
        setData(json);
        load2faStatus();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthenticating(true);
    setAuthError('');
    try {
      const res = await fetch('/api/platform-admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          password: adminPasswordInput, 
          totpCode: twoFactorCodeInput.trim() 
        }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.requires2FA) {
        setRequires2FA(true);
        setAuthError('');
        return;
      }
      if (res.ok && resJson.success) {
        setAuthenticated(true);
        setRequires2FA(false);
        setAdminPasswordInput('');
        setTwoFactorCodeInput('');
        loadData();
      } else {
        setAuthError(resJson.error || 'Senha incorreta.');
      }
    } catch (err: any) {
      setAuthError('Erro de conexão: ' + err.message);
    } finally {
      setAuthenticating(false);
    }
  }

  async function handleEnable2fa() {
    if (!admin2faConfirmCode || admin2faConfirmCode.trim().length !== 6) {
      setAdmin2faActionError('Digite o código de 6 dígitos gerado pelo seu app autenticador.');
      return;
    }
    setAdmin2faLoading(true);
    setAdmin2faActionError('');
    try {
      const res = await fetch('/api/platform-admin/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enable',
          secret: admin2faSetupData?.secret,
          code: admin2faConfirmCode.trim(),
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setAdmin2faEnabled(true);
        setAdmin2faModalOpen(false);
        setAdmin2faConfirmCode('');
        setActionMessage({ text: '✓ Autenticação em 2 Etapas (2FA) ativada com sucesso para o Admin Master!', type: 'success' });
        load2faStatus();
      } else {
        setAdmin2faActionError(json.error || 'Código incorreto.');
      }
    } catch (err: any) {
      setAdmin2faActionError(err.message);
    } finally {
      setAdmin2faLoading(false);
    }
  }

  async function handleDisable2fa() {
    if (!confirm('Deseja realmente desativar a Autenticação em 2 Etapas (2FA) do Admin Master?')) return;
    setAdmin2faLoading(true);
    try {
      const res = await fetch('/api/platform-admin/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disable' }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setAdmin2faEnabled(false);
        setActionMessage({ text: 'Autenticação em 2 Etapas do Admin Master desativada.', type: 'success' });
        load2faStatus();
      } else {
        alert(json.error || 'Erro ao desativar 2FA.');
      }
    } catch (err: any) {
      alert('Erro: ' + err.message);
    } finally {
      setAdmin2faLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/platform-admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setRequires2FA(false);
    setTwoFactorCodeInput('');
    setData(null);
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

  async function handleApproveAndSend(requestId: string) {
    setProcessingRequestId(requestId);
    setActionMessage(null);
    try {
      const res = await fetch('/api/platform-admin/voucher-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_and_send', requestId }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setActionMessage({ text: resJson.message || 'Voucher gerado e enviado com sucesso!', type: 'success' });
        loadData();
      } else {
        setActionMessage({ text: resJson.error || 'Falha ao processar solicitação.', type: 'error' });
      }
    } catch (err: any) {
      setActionMessage({ text: 'Erro de conexão: ' + err.message, type: 'error' });
    } finally {
      setProcessingRequestId(null);
    }
  }

  async function handleResendRequest(requestId: string) {
    setProcessingRequestId(requestId);
    setActionMessage(null);
    try {
      const res = await fetch('/api/platform-admin/voucher-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend', requestId }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setActionMessage({ text: resJson.message || 'Voucher reenviado com sucesso!', type: 'success' });
        loadData();
      } else {
        setActionMessage({ text: resJson.error || 'Falha ao reenviar.', type: 'error' });
      }
    } catch (err: any) {
      setActionMessage({ text: 'Erro de conexão: ' + err.message, type: 'error' });
    } finally {
      setProcessingRequestId(null);
    }
  }

  async function handleDeleteRequest(requestId: string) {
    if (!confirm('Deseja realmente remover esta solicitação de voucher?')) return;
    try {
      await fetch('/api/platform-admin/voucher-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', requestId }),
      });
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleResendDirectVoucher(voucherId: string, clientEmail: string) {
    setResendingVoucherId(voucherId);
    setActionMessage(null);
    try {
      const res = await fetch('/api/platform-admin/voucher-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend_voucher', voucherId }),
      });
      const resJson = await res.json();
      if (res.ok && resJson.success) {
        setActionMessage({ text: resJson.message || `Voucher enviado para ${clientEmail}!`, type: 'success' });
      } else {
        setActionMessage({ text: resJson.error || 'Falha ao enviar e-mail.', type: 'error' });
      }
    } catch (err: any) {
      setActionMessage({ text: 'Erro de conexão: ' + err.message, type: 'error' });
    } finally {
      setResendingVoucherId(null);
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

  async function handleExecuteRealProvision() {
    setProvisioningLiveSite(true);
    try {
      const payload = {
        profession: quickProfession || 'Profissional Liberal',
        specialty: quickSpecialty || 'Atendimento de Alta Performance',
        professionalName: quickProfessionalName || 'Alessandro Especialista',
        selectedTemplate: quickTemplate,
        hasCustomDomain: quickHasDomain,
        customDomainName: quickHasDomain ? quickDomainName : undefined,
        clientEmail: `teste.${Date.now()}@sitepronto.com.br`,
        clientPassword: 'SenhaTeste123!@#'
      };

      const res = await fetch('/api/platform-admin/quick-provision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (res.ok && resData.success && resData.siteId) {
        setQuickModalOpen(false);
        router.push(`/progresso/${resData.siteId}`);
      } else {
        alert('Erro ao iniciar provisionamento: ' + (resData.error || 'Falha desconhecida.'));
      }
    } catch (err: any) {
      alert('Falha de conexão com a esteira: ' + err.message);
    } finally {
      setProvisioningLiveSite(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-300">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl mx-auto flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
              SP
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">Platform Admin</h1>
            <p className="text-xs text-slate-400">Área restrita de controle e gerenciamento da fábrica</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {!requires2FA ? (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Senha Mestra de Acesso
                </label>
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Digite a senha mestra..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3 bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Código 2FA (6 Dígitos)
                  </label>
                  <button
                    type="button"
                    onClick={() => { setRequires2FA(false); setTwoFactorCodeInput(''); }}
                    className="text-[11px] text-slate-400 hover:text-white underline"
                  >
                    Trocar senha
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  Insira o código de 6 dígitos gerado no <strong>Google Authenticator</strong> ou aplicativo compatível.
                </p>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={6}
                  value={twoFactorCodeInput}
                  onChange={(e) => setTwoFactorCodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full px-4 py-3 bg-slate-950 border border-emerald-500 rounded-xl text-white text-center text-xl font-mono tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            )}

            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-300 text-xs text-center font-semibold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authenticating}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-950 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authenticating ? 'Verificando...' : (requires2FA ? 'Confirmar Código & Acessar' : 'Acessar Painel Admin')}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">
              ← Voltar ao site principal
            </Link>
          </div>
        </div>
      </div>
    );
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
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-slate-800 hover:bg-red-950/60 hover:text-red-400 text-slate-300 rounded-lg text-xs font-semibold transition border border-slate-700"
            >
              Sair
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
              <div className="text-xs text-slate-500 font-semibold">Shardcloud Engine</div>
              <div className="text-sm font-bold text-slate-800">{data?.integrations?.shardcloud?.subdomaint ? `${data.integrations.shardcloud.subdomaint}.shardweb.app` : 'Ativo (Node 24)'}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Shardcloud Database</div>
              <div className="text-sm font-bold text-slate-800">PostgreSQL Ativo</div>
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
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider flex items-center justify-between">
              <span>Solicitações (Home)</span>
              {(data?.metrics?.pendingRequests || 0) > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <div className="text-3xl font-extrabold text-amber-600 mt-2">
              {data?.metrics?.pendingRequests || 0}
              <span className="text-xs text-slate-400 font-normal ml-1">pendentes</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Emitidos</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalVouchers || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Livres</div>
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

        {actionMessage && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center justify-between ${
            actionMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2 text-sm font-semibold">
              {actionMessage.type === 'success' ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span>{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage(null)} className="text-xs font-bold hover:underline">
              ✕ Fechar
            </button>
          </div>
        )}

        {/* CARD: Autenticação em 2 Etapas (2FA) do Admin Master */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`p-3 rounded-xl shrink-0 ${
                admin2faEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-950">Autenticação em 2 Etapas (2FA) do Admin Master</h2>
                  {admin2faEnabled ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Ativado & Protegido
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-300">
                      Desativado
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  {admin2faEnabled
                    ? 'O acesso master à plataforma exige autenticação por senha e o código temporário de 6 dígitos gerado pelo Google Authenticator / Authy.'
                    : 'Aumente a segurança do painel master ativando o 2FA. Inicialmente está desativado para conveniência, mas você pode ativá-lo a qualquer momento.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto">
              {!admin2faEnabled ? (
                <button
                  type="button"
                  onClick={() => {
                    setAdmin2faActionError('');
                    setAdmin2faConfirmCode('');
                    setAdmin2faModalOpen(true);
                    load2faStatus();
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Configurar & Ativar 2FA</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={admin2faLoading}
                  onClick={handleDisable2fa}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 hover:border-red-300 transition flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>{admin2faLoading ? 'Processando...' : 'Desativar 2FA'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MODAL: Configurar e Ativar 2FA do Admin Master */}
        {admin2faModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <span>Ativar 2FA no Admin Master</span>
                </div>
                <button
                  onClick={() => setAdmin2faModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-600">
                <p>
                  <strong>Passo 1:</strong> Abra o <strong>Google Authenticator</strong>, <strong>Authy</strong> ou app compatível no seu celular.
                </p>

                <p>
                  <strong>Passo 2:</strong> Escaneie o QR Code abaixo com a câmera do aplicativo:
                </p>

                {admin2faSetupData?.qrCodeUrl && (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <img 
                      src={admin2faSetupData.qrCodeUrl} 
                      alt="QR Code 2FA" 
                      className="w-48 h-48 rounded-lg shadow-xs bg-white p-2"
                    />
                    <div className="mt-3 text-center">
                      <span className="text-[11px] text-slate-500 block mb-1">Chave Manual (se preferir digitar):</span>
                      <code className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono text-xs font-bold text-slate-900 select-all">
                        {admin2faSetupData.secret}
                      </code>
                    </div>
                  </div>
                )}

                <p>
                  <strong>Passo 3:</strong> Digite o código de 6 dígitos gerado no app para confirmar a sincronização:
                </p>

                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={admin2faConfirmCode}
                    onChange={(e) => setAdmin2faConfirmCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="w-full text-center text-xl font-mono tracking-widest px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {admin2faActionError && (
                    <p className="text-red-600 text-xs mt-1.5 font-semibold text-center">{admin2faActionError}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdmin2faModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={admin2faLoading || admin2faConfirmCode.length !== 6}
                  onClick={handleEnable2fa}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{admin2faLoading ? 'Validando...' : 'Confirmar & Ativar 2FA'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEÇÃO: Solicitações de Voucher Recebidas da Home */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Solicitações de Voucher (Home)</h2>
                {(data?.voucherRequests?.filter((r: any) => r.status === 'PENDING').length || 0) > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {data.voucherRequests.filter((r: any) => r.status === 'PENDING').length} pendente(s)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Pedidos recebidos diretamente pelo formulário da página principal.</p>
            </div>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Atualizar Lista</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Solicitante</th>
                  <th className="py-3 px-4">Tipo de Site</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Voucher Gerado</th>
                  <th className="py-3 px-4">Data / Envio</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(!data?.voucherRequests || data.voucherRequests.length === 0) ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Nenhuma solicitação de voucher recebida ainda.
                    </td>
                  </tr>
                ) : (
                  data.voucherRequests.map((req: any) => (
                    <tr key={req.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{req.name}</div>
                        <a href={`mailto:${req.email}`} className="text-xs text-blue-600 hover:underline">
                          {req.email}
                        </a>
                        {req.message && (
                          <div className="text-[11px] text-slate-400 italic mt-0.5">"{req.message}"</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                          {req.siteType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {req.status === 'PENDING' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Pendente
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Atendido
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {req.voucherCode ? (
                          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-indigo-700">
                            <Ticket className="w-3.5 h-3.5 text-indigo-500" />
                            <Link
                              href={`/iniciar?voucher=${encodeURIComponent(req.voucherCode)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline flex items-center gap-1"
                            >
                              <span>{req.voucherCode}</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Não gerado</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500">
                        <div>Pedido: {new Date(req.createdAt).toLocaleDateString('pt-BR')} {new Date(req.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                        {req.sentAt && (
                          <div className="text-[11px] text-emerald-600 font-medium">
                            Enviado: {new Date(req.sentAt).toLocaleDateString('pt-BR')} {new Date(req.sentAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {req.status === 'PENDING' ? (
                          <button
                            type="button"
                            disabled={processingRequestId === req.id}
                            onClick={() => handleApproveAndSend(req.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition disabled:opacity-50"
                            title="Gerar voucher e enviar por e-mail para o cliente"
                          >
                            <Send className="w-3 h-3" />
                            <span>{processingRequestId === req.id ? 'Gerando...' : 'Gerar & Enviar'}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={processingRequestId === req.id}
                            onClick={() => handleResendRequest(req.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition disabled:opacity-50"
                            title="Reenviar e-mail com voucher para o cliente"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{processingRequestId === req.id ? 'Enviando...' : 'Reenviar E-mail'}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteRequest(req.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Excluir Solicitação"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
                          href={`/iniciar?voucher=${encodeURIComponent(v.code)}`} 
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                          title={`Resgatar voucher ${v.code}`}
                        >
                          <span>/iniciar?voucher={v.code}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">
                        {new Date(v.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {v.clientEmail && (
                          <button
                            type="button"
                            disabled={resendingVoucherId === v.id}
                            onClick={() => handleResendDirectVoucher(v.id, v.clientEmail)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors disabled:opacity-50"
                            title={`Reenviar voucher por e-mail para ${v.clientEmail}`}
                          >
                            <Mail className="w-3 h-3" />
                            <span>{resendingVoucherId === v.id ? 'Enviando...' : 'Reenviar E-mail'}</span>
                          </button>
                        )}
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
                  <th className="py-3 px-4">Site & Painel /master</th>
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
                          <div className="flex items-center gap-3">
                            <a href={s.vercelUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                              <span>Ver Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a href={`${s.vercelUrl}/master`} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                              <span>Painel /master</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
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

                {/* Seção de Domínio Próprio .BR */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="quickHasDomain"
                      checked={quickHasDomain}
                      onChange={(e) => setQuickHasDomain(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                    />
                    <label htmlFor="quickHasDomain" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Configurar Domínio Próprio .BR (Vercel + Cloudflare DNS)
                    </label>
                  </div>

                  {quickHasDomain && (
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase">Nome do Domínio .BR</label>
                      <input
                        type="text"
                        value={quickDomainName}
                        onChange={(e) => setQuickDomainName(e.target.value)}
                        placeholder="Ex: seunome.com.br ou meuconsultorio.adv.br"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white font-mono"
                      />
                      <p className="text-[11px] text-slate-500">
                        O sistema vinculará o domínio na Vercel e criará os registros no Cloudflare, gerando as instruções para troca de DNS no Registro.br.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button 
                  type="button"
                  onClick={() => setQuickModalOpen(false)} 
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Fechar
                </button>

                <div className="flex items-center gap-2.5">
                  <button 
                    type="button"
                    onClick={handleExecuteQuickPreview} 
                    disabled={generatingQuickSite || provisioningLiveSite}
                    className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-50 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition"
                    title="Abre o HTML do site em uma nova aba instantaneamente"
                  >
                    {generatingQuickSite ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></span>
                        <span>Gerando...</span>
                      </>
                    ) : (
                      <>
                        <span>👁️ Prévia Rápida (Aba Nova)</span>
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={handleExecuteRealProvision} 
                    disabled={generatingQuickSite || provisioningLiveSite}
                    className="px-5 py-2.5 bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition border border-indigo-500/20"
                    title="Inicia a esteira completa: Banco Neon + Deploy Vercel + Repositório Git"
                  >
                    {provisioningLiveSite ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Provisionando na Esteira...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀 Provisionar Completo (Vercel + Neon)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
