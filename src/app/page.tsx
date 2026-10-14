'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Globe, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  HelpCircle, 
  Search, 
  X, 
  ChevronDown, 
  Phone, 
  MessageCircle,
  Eye,
  Rocket,
  Ticket,
  Mail,
  User,
  Briefcase,
  Send,
  AlertCircle,
  Monitor,
  Smartphone,
  ExternalLink,
  Settings
} from 'lucide-react';

export default function HomePage() {
  // Estados de Acessibilidade
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [highContrast, setHighContrast] = useState(false);

  // Showcase Tabs Mockup
  const [activeTab, setActiveTab] = useState<string>('barbearia');

  // Modal de Demonstração
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoViewMode, setDemoViewMode] = useState<'site' | 'admin'>('site');
  const [demoNicho, setDemoNicho] = useState<string>('barbearia');
  const [demoModel, setDemoModel] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D'>('MODEL_A');
  const [demoViewport, setDemoViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Modal e Formulário de Solicitação de Voucher
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqSiteType, setReqSiteType] = useState('Barbearia / Barber Shop (com CRM & Agendamento)');
  const [reqCustomType, setReqCustomType] = useState('');
  const [reqMessage, setReqMessage] = useState('');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [reqError, setReqError] = useState('');

  async function handleRequestVoucher(e: React.FormEvent) {
    e.preventDefault();
    setReqSubmitting(true);
    setReqError('');
    const finalSiteType = reqSiteType === 'Outro' ? reqCustomType : reqSiteType;
    if (!finalSiteType || !finalSiteType.trim()) {
      setReqError('Informe o tipo de site ou profissão.');
      setReqSubmitting(false);
      return;
    }
    try {
      const res = await fetch('/api/vouchers/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reqName,
          email: reqEmail,
          siteType: finalSiteType,
          message: reqMessage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReqSuccess(true);
      } else {
        setReqError(data.error || 'Erro ao registrar solicitação.');
      }
    } catch (err: any) {
      setReqError('Falha na conexão: ' + err.message);
    } finally {
      setReqSubmitting(false);
    }
  }

  function resetVoucherForm() {
    setReqName('');
    setReqEmail('');
    setReqSiteType('Barbearia / Barber Shop (com CRM & Agendamento)');
    setReqCustomType('');
    setReqMessage('');
    setReqSuccess(false);
    setReqError('');
  }

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Consulta de Domínio na Home
  const [domainQuery, setDomainQuery] = useState('');
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainResult, setDomainResult] = useState<{
    available: boolean;
    domain: string;
    message: string;
  } | null>(null);

  const showcaseData: Record<string, { url: string; title: string; sub: string; banner: string; meta1: string; meta2: string; image: string; badge: string }> = {
    barbearia: {
      url: 'www.barberproexperience.com.br',
      title: 'Barber Pro & Estética Masculina',
      sub: 'Av. Paulista, 1500 - Bela Vista, SP',
      banner: 'Agendamento de horário com barbeiro em tempo real no WhatsApp',
      meta1: 'Ter a Sáb: 09h às 20h',
      meta2: 'Agenda Online Ativa',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      badge: '💈 Barbearia + CRM'
    },
    clinica: {
      url: 'www.vidamaisclinica.com.br',
      title: 'Clínica Integrada Vida+ Saúde',
      sub: 'Rua Oscar Freire, 800 - Jardins, SP',
      banner: 'Consultas presenciais e telemedicina com prontuário digital',
      meta1: 'Seg a Sex: 08h às 19h',
      meta2: 'Lembretes 24h WhatsApp',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      badge: '🩺 Clínica + CRM'
    },
    imobiliaria: {
      url: 'www.homekeyimoveis.com.br',
      title: 'HomeKey Imóveis & Patrimônio',
      sub: 'Av. Brigadeiro Faria Lima, 2200 - Itaim Bibi, SP',
      banner: 'Busca inteligente de imóveis e Pipeline Kanban de vendas',
      meta1: 'Seg a Sáb: 08h às 19h',
      meta2: 'Funil Comercial Ativo',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      badge: '🏡 Imobiliária + CRM'
    },
    academia: {
      url: 'www.powerfitstudio.com.br',
      title: 'PowerFit Studio & Treinamento',
      sub: 'Av. Ibirapuera, 3100 - Moema, SP',
      banner: 'Matrícula expressa e régua de cobrança automática via PIX',
      meta1: 'Seg a Sex: 06h às 23h | Sáb: 08h às 18h',
      meta2: 'Cobrança PIX Ativa',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      badge: '🏋️ Academia + CRM'
    },
    petshop: {
      url: 'www.petcareestetica.com.br',
      title: 'PetCare Banho, Tosa & Veterinária',
      sub: 'Rua Harmonia, 450 - Vila Madalena, SP',
      banner: 'Esteira operacional de banho e tosa com aviso automático ao tutor',
      meta1: 'Seg a Sáb: 08h30 às 18h30',
      meta2: 'Táxi Dog Integrado',
      image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      badge: '🐾 Pet Shop + CRM'
    },
    odonto: {
      url: 'www.clinicasorrisoreal.com.br',
      title: 'Clínica Odonto Vida',
      sub: 'Av. Paulista, 1200 - Bela Vista, SP',
      banner: 'Consultas integradas via WhatsApp em 1 clique',
      meta1: 'Seg a Sex: 08h às 19h',
      meta2: 'Botão Direto Ativo',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      badge: 'Odontologia'
    },
    oficina: {
      url: 'www.mecanicajuniorauto.com.br',
      title: 'Júnior Auto Center Especializado',
      sub: 'Rua das Oficinas, 450 - Curitiba, PR',
      banner: 'Orçamento de revisão e socorro mecânico rápido',
      meta1: 'Seg a Sáb: 07h30 às 18h',
      meta2: 'Atendimento Emergencial',
      image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=800&q=80',
      badge: 'Automotivo'
    },
    boutique: {
      url: 'www.bellafemininaatelie.com.br',
      title: 'Bella Donna Moda & Ateliê',
      sub: 'Shopping Downtown, Bloco 4 - Rio de Janeiro',
      banner: 'Catálogo de lançamentos direto no WhatsApp da loja',
      meta1: 'Todos os dias: 10h às 22h',
      meta2: 'Catálogo Atualizado',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Moda & Varejo'
    }
  };

  async function handleDomainSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!domainQuery.trim()) return;
    setCheckingDomain(true);
    setDomainResult(null);

    try {
      const res = await fetch(`/api/domain/check-availability?domain=${encodeURIComponent(domainQuery.trim())}`);
      const data = await res.json();
      setDomainResult({
        available: data.available,
        domain: data.domain || domainQuery,
        message: data.message || (data.available ? 'Domínio disponível para registro!' : 'Domínio já registrado.')
      });
    } catch {
      setDomainResult({
        available: false,
        domain: domainQuery,
        message: 'Erro ao consultar Registro.br. Tente novamente.'
      });
    } finally {
      setCheckingDomain(false);
    }
  }

  const activeShowcase = showcaseData[activeTab];

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        highContrast ? 'bg-black text-white' : 'bg-[#f8f9ff] text-[#0b1c30]'
      }`}
      style={{ fontSize: `${16 + fontSizeOffset}px` }}
    >
      {/* HEADER & BARRA DE ACESSIBILIDADE */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        {/* Barra Superior Acessível */}
        <div className="bg-[#eff4ff] border-b border-slate-200/60">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline font-semibold">Acessibilidade Digital:</span>
              <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200">
                <button
                  type="button"
                  onClick={() => setFontSizeOffset(prev => Math.max(-2, prev - 1))}
                  className="px-1.5 py-0.5 hover:text-blue-600 font-bold"
                  title="Diminuir Fonte"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSizeOffset(prev => Math.min(4, prev + 1))}
                  className="px-1.5 py-0.5 hover:text-blue-600 font-bold"
                  title="Aumentar Fonte"
                >
                  A+
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setHighContrast(prev => !prev)}
                  className="px-1.5 py-0.5 hover:text-blue-600 font-semibold"
                  title="Alternar Alto Contraste"
                >
                  Contraste
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Suporte Online</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 hidden sm:flex">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Site Seguro e Protegido</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Principal */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md group-hover:bg-blue-700 transition">
              SP
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 block leading-tight">
                SitePronto
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold block">
                Fábrica Digital Acessível
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-600">
            <a href="#como-funciona" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Como Funciona
            </a>
            <Link href="/demo" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Ver Demonstração</span>
            </Link>
            <a href="#solicitar-voucher" className="px-3.5 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-700 text-amber-700 font-bold transition flex items-center gap-1">
              <Ticket className="w-3.5 h-3.5" />
              <span>Pedir Voucher</span>
            </a>
            <Link href="/recuperar-senha" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Lembrete de Senha
            </Link>
            <a href="#acessibilidade" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Acessibilidade
            </a>
            <a href="#faq" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Dúvidas
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/platform-admin"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition hidden sm:inline-flex"
            >
              Painel Admin
            </Link>
            <button
              type="button"
              onClick={() => { resetVoucherForm(); setVoucherModalOpen(true); }}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm hover:shadow transition flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Pedir Voucher</span>
            </button>
            <Link
              href="/iniciar"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center gap-1.5"
            >
              <span>Resgatar Voucher</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 pt-[124px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          
          {/* Banner de Atendimento por E-mail */}
          <aside className="w-full bg-[#dce9ff] rounded-2xl p-4 sm:p-5 shadow-sm mb-10 border border-blue-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm sm:text-base">
                  Precisa de suporte ou tem dúvidas? Fale conosco pelo e-mail <strong>contato@sitepronto.com.br</strong>.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="mailto:contato@sitepronto.com.br"
                  className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-blue-700 transition flex-1 sm:flex-initial"
                >
                  <Mail className="w-4 h-4" />
                  <span>Falar por E-mail</span>
                </a>
                <button
                  type="button"
                  onClick={() => { resetVoucherForm(); setVoucherModalOpen(true); }}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition flex-1 sm:flex-initial"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Solicitar Voucher</span>
                </button>
              </div>
            </div>
          </aside>

          {/* HERO PRINCIPAL */}
          <section className="relative w-full mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Coluna Esquerda: Textos & Chamada */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#e5eeff] px-3.5 py-1 rounded-full w-fit shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Criador Inteligente • 100% em Português
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Tenha o site da sua empresa pronto, publicado e com{' '}
                  <span className="text-blue-600 underline decoration-emerald-500 decoration-4 underline-offset-8">
                    subdomínio exclusivo
                  </span>{' '}
                  em 15 minutos.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Sem precisar programar ou entender de tecnologia. Você responde perguntas simples sobre seu negócio e nossa inteligência monta tudo: visual moderno, textos profissionais, fotos e coloca seu site no ar com subdomínio imediato (com suporte opcional a domínio próprio .br).
                </p>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/iniciar"
                    className="min-h-[52px] px-7 bg-blue-600 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition transform hover:-translate-y-0.5"
                  >
                    <span>Começar com Voucher</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => { resetVoucherForm(); setVoucherModalOpen(true); }}
                    className="min-h-[52px] px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
                  >
                    <Ticket className="w-4 h-4 text-slate-950" />
                    <span>Pedir Voucher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="min-h-[52px] px-5 bg-white text-slate-800 font-bold text-sm rounded-2xl border border-slate-300 flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Ver Demonstração</span>
                  </button>
                </div>

                {/* Indicadores de Confiança */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 bg-[#eff4ff] p-4 rounded-2xl shadow-xs border border-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">100% Personalizável</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">Subdomínio veloz incluso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">Garantia total de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">WCAG 2.1 AA Acessível</span>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Mockup Interativo com Abas */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white rounded-3xl shadow-xl p-5 border border-slate-200/80 flex flex-col gap-4">
                  {/* Mockup Browser Header */}
                  <div className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg text-xs text-slate-600 font-mono shadow-xs">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>{activeShowcase.url}</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                      Ativo em 15m
                    </span>
                  </div>

                  {/* Seleção de Nicho */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab('barbearia')}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition text-center flex items-center gap-1 ${
                        activeTab === 'barbearia' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>💈</span> Barbearia
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('clinica')}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition text-center flex items-center gap-1 ${
                        activeTab === 'clinica' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🩺</span> Clínica
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('imobiliaria')}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition text-center flex items-center gap-1 ${
                        activeTab === 'imobiliaria' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🏡</span> Imobiliária
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('academia')}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition text-center flex items-center gap-1 ${
                        activeTab === 'academia' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🏋️</span> Academia
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('petshop')}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-bold transition text-center flex items-center gap-1 ${
                        activeTab === 'petshop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>🐾</span> Pet Shop
                    </button>
                  </div>

                  {/* Card de Conteúdo do Showcase */}
                  <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-3 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{activeShowcase.title}</h4>
                        <p className="text-xs text-slate-500">{activeShowcase.sub}</p>
                      </div>
                      <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-bold">
                        Aberto Agora
                      </span>
                    </div>

                    <div className="h-44 rounded-xl overflow-hidden relative shadow-inner bg-slate-200">
                      <img
                        src={activeShowcase.image}
                        alt={activeShowcase.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                        <p className="text-xs font-semibold text-white">
                          {activeShowcase.banner}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-semibold">Horários</span>
                        <span className="font-bold text-slate-800">{activeShowcase.meta1}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-semibold">Agendamentos</span>
                        <span className="font-bold text-emerald-600">{activeShowcase.meta2}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Design Mobile-First
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Velocidade 100/100
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CONSULTA RÁPIDA DE DISPONIBILIDADE NO REGISTRO.BR (isavail) */}
          <section className="w-full bg-[#dce9ff] rounded-3xl p-6 sm:p-8 shadow-sm mb-16 border border-blue-200">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-xs uppercase tracking-wider">
                Integração Oficial com Registro.br
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Já pensou no endereço do seu site?
              </h3>
              <p className="text-sm text-slate-600">
                Consulte a disponibilidade do seu domínio .com.br em tempo real com nossa verificação oficial.
              </p>

              <form onSubmit={handleDomainSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={domainQuery}
                    onChange={(e) => setDomainQuery(e.target.value)}
                    placeholder="Ex: minhalojaartesanal.com.br"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-sm font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={checkingDomain}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  {checkingDomain ? 'Consultando...' : 'Consultar Disponibilidade'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {domainResult && (
                <div className={`mt-4 p-4 rounded-xl border text-xs max-w-xl mx-auto ${
                  domainResult.available
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="font-bold text-sm">
                    {domainResult.available ? '🎉 ' + domainResult.domain + ' está disponível!' : 'ℹ️ ' + domainResult.domain}
                  </div>
                  <p className="mt-1">{domainResult.message}</p>
                  {domainResult.available && (
                    <div className="mt-2.5">
                      <Link
                        href="/iniciar"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg hover:bg-emerald-800 transition"
                      >
                        Garantir este domínio com meu Voucher ↗
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* SEÇÃO: COMO FUNCIONA EM 3 PASSOS */}
          <section id="como-funciona" className="w-full mb-16 py-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-[#e5eeff] px-3.5 py-1 rounded-full">
                Processo 100% Guiado
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
                Como Funciona em 3 Passos Simples
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Construímos todo o ecossistema digital para que você só precise pensar em atender novos clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Passo 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                    1
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Conte sobre o seu negócio</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Informe seu nicho de atuação, serviços oferecidos, fotos e contatos. Nosso assistente orienta cada detalhe sem complicação.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Leva menos de 4 minutos</span>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                    2
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Seu site é sintetizado com IA</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Nossa fábrica inteligente gera uma página institucional completa, com textos persuasivos, galeria de fotos, depoimentos e design responsivo.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
                  <Rocket className="w-4 h-4" />
                  <span>Estrutura segura e exclusiva para você</span>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Endereço conectado e site no ar</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Conectamos o endereço da sua empresa na internet e entregamos um painel fácil para você editar informações e fotos quando quiser.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sem burocracia nem complicação</span>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO DE SOLICITAÇÃO DIRETA DE VOUCHER */}
          <section id="solicitar-voucher" className="w-full mb-16 py-8">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-blue-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Lado Esquerdo: Chamada */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Acesso Facilitado • Solicitação Grátis</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Solicite seu Voucher para Criar o Site da Sua Empresa
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Ainda não possui um código de voucher? Preencha seus dados ao lado. Nossa equipe analisa e envia o seu voucher de ativação gratuito diretamente no seu e-mail para você colocar seu site no ar em minutos!
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Envio direto para seu e-mail cadastrado</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Estrutura personalizada para o seu ramo de atuação</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Sem necessidade de cartão de crédito no pedido</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito: Formulário */}
                <div className="lg:col-span-6">
                  <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
                    {reqSuccess ? (
                      <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Solicitação Enviada com Sucesso!</h3>
                        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                          Recebemos o seu pedido, <strong>{reqName}</strong>! Em instantes seu voucher será gerado e enviado para <strong>{reqEmail}</strong>.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            type="button"
                            onClick={resetVoucherForm}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                          >
                            Nova Solicitação
                          </button>
                          <Link
                            href="/iniciar"
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition"
                          >
                            Ir para Página de Resgate
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleRequestVoucher} className="space-y-4">
                        <div className="border-b border-slate-800 pb-3 mb-4">
                          <h3 className="text-base font-bold text-white">Formulário de Solicitação</h3>
                          <p className="text-xs text-slate-400">Informe seus dados para receber o voucher</p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-blue-400" />
                            <span>Seu Nome Completo *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={reqName}
                            onChange={(e) => setReqName(e.target.value)}
                            placeholder="Ex: Dra. Camila Rocha"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Seu E-mail (Onde receberá o voucher) *</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={reqEmail}
                            onChange={(e) => setReqEmail(e.target.value)}
                            placeholder="seuemail@exemplo.com.br"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                            <span>Tipo de Site / Ramo de Atividade *</span>
                          </label>
                          <select
                            value={reqSiteType}
                            onChange={(e) => setReqSiteType(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          >
                            <optgroup label="⭐ Micro-SaaS & CRM Integrado">
                              <option value="Barbearia / Barber Shop (com CRM & Agendamento)">💈 Barbearia / Barber Shop (Agendamento & CRM)</option>
                              <option value="Clínica Médica / Consultório (com CRM & Prontuário)">🩺 Clínica Médica / Consultório (Prontuário & Lembretes)</option>
                              <option value="Imobiliária / Gestão de Imóveis (com Funil Kanban)">🏡 Imobiliária / Corretores (Funil Kanban de Vendas)</option>
                              <option value="Academia / Centro Fitness (com Cobrança PIX)">🏋️ Academia & Studio Fitness (Cobrança Automática PIX)</option>
                              <option value="Pet Shop / Banho & Tosa (com Esteira Operacional)">🐾 Pet Shop / Banho & Tosa (Esteira Operacional)</option>
                            </optgroup>
                            <optgroup label="── Outros Segmentos ──">
                              <option value="Odontologia / Saúde">Clínica Odontológica / Saúde</option>
                              <option value="Oficina Mecânica / Automotivo">Oficina Mecânica / Auto Center</option>
                              <option value="Advocacia & Serviços Jurídicos">Advocacia & Serviços Jurídicos</option>
                              <option value="Gastronomia, Restaurante & Buffet">Gastronomia, Restaurante & Buffet</option>
                              <option value="Arquitetura, Engenharia & Reformas">Arquitetura, Engenharia & Reformas</option>
                              <option value="Comércio & Loja">Comércio Local & Varejo</option>
                              <option value="Prestador de Serviços">Prestador de Serviços Gerais</option>
                              <option value="Outro">Outro segmento...</option>
                            </optgroup>
                          </select>
                        </div>

                        {reqSiteType === 'Outro' && (
                          <div>
                            <input
                              type="text"
                              required
                              value={reqCustomType}
                              onChange={(e) => setReqCustomType(e.target.value)}
                              placeholder="Digite sua atividade (Ex: Fotógrafo, Psicólogo, Contador...)"
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                            Mensagem / Detalhes Adicionais (Opcional)
                          </label>
                          <textarea
                            rows={2}
                            value={reqMessage}
                            onChange={(e) => setReqMessage(e.target.value)}
                            placeholder="Algum detalhe especial ou nome da sua empresa..."
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500 resize-none"
                          />
                        </div>

                        {reqError && (
                          <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{reqError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={reqSubmitting}
                          className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-950 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {reqSubmitting ? (
                            <span>Enviando solicitação...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Solicitar Meu Voucher Agora</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ACESSIBILIDADE E WCAG 2.1 AA */}
          <section id="acessibilidade" className="w-full bg-[#eff4ff] rounded-3xl p-8 sm:p-10 shadow-sm mb-16 border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">
                  Tecnologia Para Todas as Pessoas
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                  Feito para que qualquer pessoa consiga criar e navegar com autonomia.
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Toda a plataforma e os sites gerados para os seus clientes seguem rigorosamente os padrões <strong>WCAG 2.1 AA</strong>, com suporte nativo a leitores de tela, navegação por teclado e alto contraste.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-900 mb-1">Leitores de Tela</h4>
                    <p className="text-[11px] text-slate-500">Compatibilidade com NVDA, JAWS e TalkBack.</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-900 mb-1">Navegação por Teclado</h4>
                    <p className="text-[11px] text-slate-500">Foco visível e saltos lógicos de tabulação.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Conformidade com Acessibilidade</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Cada modelo gerado pelo SitePronto traz tags semânticas ARIA, descrições automáticas de imagens (alt-text) e alto contraste testado.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Índice WCAG 2.1</span>
                    <span className="text-emerald-700">99.4% Conforme</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '99.4%' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DEPOIMENTOS REAIS */}
          <section className="w-full mb-16 py-6">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-[#e5eeff] px-3.5 py-1 rounded-full">
                Histórias de Sucesso
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                Negócios locais que prosperam com o SitePronto
              </h2>
              <p className="text-slate-600 text-sm">
                Veja a experiência de quem nunca tinha criado um site antes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    “Eu não entendo nada de computador. Criei o site da minha padaria pelo celular num domingo à tarde. Na segunda-feira de manhã já entrou a primeira encomenda grande de café da manhã via WhatsApp.”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                    DM
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Dona Maria</h4>
                    <p className="text-[11px] text-slate-500">Padaria Artesanal • Belo Horizonte/MG</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    “O que mais me impressionou foi a configuração do meu domínio .com.br. Achei que precisaria contratar um técnico, mas a plataforma configurou tudo em minutos. Passo muita credibilidade para os pacientes.”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                    CM
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Dr. Carlos Mendes</h4>
                    <p className="text-[11px] text-slate-500">Fisioterapia • Campinas/SP</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex text-amber-400 text-sm">★★★★★</div>
                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    “A opção de ativar a galeria de imagens e adicionar e diminuir cards no painel é fantástica. Mostro fotos reais da minha oficina e os clientes confiam muito mais.”
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                    MS
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Marcos Silva</h4>
                    <p className="text-[11px] text-slate-500">Auto Mecânica Silva • Curitiba/PR</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ ACCORDION */}
          <section id="faq" className="w-full max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-[#e5eeff] px-3.5 py-1 rounded-full">
                Tire Suas Dúvidas
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: 'Como funciona o endereço do site (domínio ou subdomínio)?',
                  a: 'Nós disponibilizamos gratuitamente um subdomínio veloz e seguro para o seu site entrar no ar imediatamente. Caso você queira vincular um domínio próprio (ex: suaempresa.com.br), nosso sistema oferece suporte e instruções para você conectar facilmente seu domínio registrado no Registro.br.'
                },
                {
                  q: 'Consigo ativar/desativar seções e alterar fotos e textos depois?',
                  a: 'Sim! No seu painel de controle você pode ativar ou desativar qualquer bloco (incluindo Galeria de fotos e Depoimentos), além de adicionar ou alterar itens com facilidade.'
                },
                {
                  q: 'Como funciona a verificação de disponibilidade no Registro.br?',
                  a: 'Durante a criação do seu site, nosso sistema consulta se o endereço desejado está livre para registro. Se estiver disponível, você pode registrar na hora ou ao concluir o processo.'
                },
                {
                  q: 'Eu já tenho um endereço registrado no Registro.br, posso usar aqui?',
                  a: 'Com certeza! Basta informar o seu endereço existente. O sistema gera automaticamente as informações necessárias para você colar na sua conta do Registro.br de forma simples e guiada.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-blue-600 transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA STRIP FINAL */}
          <section className="w-full bg-blue-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-2">
              <span className="text-[11px] uppercase bg-blue-700 text-blue-100 px-3 py-0.5 rounded-full font-bold">
                Sem Espera • Sem Dificuldade
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Pronto para colocar sua empresa na internet?
              </h2>
              <p className="text-sm text-blue-100">
                Resgate seu voucher ou inicie o assistente de criação guiado agora mesmo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/iniciar"
                className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition text-center"
              >
                Resgatar Voucher Agora
              </Link>
              <a
                href="mailto:contato@sitepronto.com.br"
                className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Tirar Dúvidas por E-mail</span>
              </a>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#eff4ff] border-t border-slate-200 mt-auto py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                  SP
                </div>
                <span className="font-extrabold text-base text-slate-900">SitePronto</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Automatizamos a criação de websites profissionais, hospedagem ultrarrápida e conexão transparente de domínios personalizados para empresas de todo o Brasil.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Navegação</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li><Link href="/" className="hover:text-blue-600">Início</Link></li>
                <li><a href="#como-funciona" className="hover:text-blue-600">Como Funciona</a></li>
                <li><Link href="/demo" className="hover:text-blue-600">Demonstração ao Vivo</Link></li>
                <li><Link href="/recuperar-senha" className="hover:text-blue-600">Lembrete de Senha</Link></li>
                <li><Link href="/iniciar" className="hover:text-blue-600">Resgatar Voucher</Link></li>
                <li><Link href="/platform-admin" className="hover:text-blue-600">Painel do Administrador</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Contato & Suporte</h4>
              <div className="space-y-1.5 text-slate-600">
                <p className="font-semibold text-slate-900">✉️ contato@sitepronto.com.br</p>
                <p className="text-[11px] text-slate-500">Atendimento oficial exclusivamente por e-mail.</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Segurança & Confiabilidade</h4>
              <div className="space-y-2">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">Hospedagem Rápida</div>
                  <div className="text-[10px] text-slate-500">Site sempre no ar 24h por dia</div>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">Armazenamento Seguro</div>
                  <div className="text-[10px] text-slate-500">Seus dados e fotos protegidos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <p>© 2025 SitePronto Tecnologia. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <span>Termos de Uso</span>
              <span>Privacidade</span>
              <span>Declaração WCAG 2.1 AA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL DE DEMONSTRAÇÃO AO VIVO COM SITE REAL INTERATIVO */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="bg-slate-900 w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden text-white">
            
            {/* Header da Barra de Ferramentas de Demonstração */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                  SP
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>Demonstração Interativa SitePronto</span>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      100% Funcional
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Teste a navegação, responsividade e botões de um site real sem necessidade de voucher.
                  </p>
                </div>
              </div>

              {/* Controles de Modo (Site vs Admin), Nicho, Modelo e Viewport */}
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Seletor de Modo: Site vs Admin */}
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setDemoViewMode('site')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1.5 ${
                      demoViewMode === 'site' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Site Público</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoViewMode('admin')}
                    className={`px-3 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1.5 ${
                      demoViewMode === 'admin' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Área Adm (Painel Master)</span>
                  </button>
                </div>

                {/* Nichos */}
                <div className="flex flex-wrap bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs gap-1">
                  <button
                    type="button"
                    onClick={() => setDemoNicho('barbearia')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1 ${
                      demoNicho === 'barbearia' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>💈</span> Barbearia
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('clinica')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1 ${
                      demoNicho === 'clinica' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🩺</span> Clínica
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('imobiliaria')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1 ${
                      demoNicho === 'imobiliaria' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🏡</span> Imobiliária
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('academia')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1 ${
                      demoNicho === 'academia' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🏋️</span> Academia
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('petshop')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs flex items-center gap-1 ${
                      demoNicho === 'petshop' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🐾</span> Pet Shop
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('odonto')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs ${
                      demoNicho === 'odonto' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Odonto
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoNicho('oficina')}
                    className={`px-2 py-1 rounded-lg font-bold transition text-xs ${
                      demoNicho === 'oficina' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Oficina
                  </button>
                </div>

                {/* Viewport Desktop/Mobile */}
                <div className="hidden sm:flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDemoViewport('desktop')}
                    className={`p-1.5 rounded-lg transition ${
                      demoViewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
                    }`}
                    title="Modo Computador"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoViewport('mobile')}
                    className={`p-1.5 rounded-lg transition ${
                      demoViewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
                    }`}
                    title="Modo Celular"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                {/* Abrir em Tela Cheia */}
                <Link
                  href="/demo"
                  target="_blank"
                  className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition hidden md:flex items-center gap-1 text-xs font-semibold"
                  title="Abrir em Nova Aba"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Expandir</span>
                </Link>

                {/* Fechar */}
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Fechar Demonstração"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Aviso quando no Modo Admin */}
            {demoViewMode === 'admin' && (
              <div className="bg-indigo-950/80 border-b border-indigo-800/60 px-4 py-2 text-xs text-indigo-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span><strong>Visão da Área Administrativa (Painel Master do Cliente):</strong> Aqui o dono do site gerencia catálogo, dúvidas (FAQ), seções, links e fotos sem precisar de desenvolvedor!</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDemoViewMode('site')}
                  className="text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg shrink-0 ml-3"
                >
                  Ver Site Público ↗
                </button>
              </div>
            )}

            {/* Corpo do Iframe com Site Real */}
            <div className="flex-1 bg-slate-950 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
              <div
                className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-white ${
                  demoViewport === 'mobile'
                    ? 'w-[390px] h-full max-h-[750px] border-4 border-slate-800'
                    : 'w-full h-full'
                }`}
              >
                <iframe
                  key={`${demoViewMode}-${demoNicho}-${demoModel}-${demoViewport}`}
                  src={`/api/demo?nicho=${demoNicho}&model=${demoModel}&view=${demoViewMode}`}
                  title={demoViewMode === 'site' ? 'Site de Demonstração em Tempo Real' : 'Painel Master de Demonstração'}
                  className="w-full h-full border-0"
                />
              </div>
            </div>

            {/* Rodapé do Modal com CTA de Voucher */}
            <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <p className="text-xs text-slate-400">
                Gostou? Você pode criar seu próprio site exclusivo agora mesmo solicitando um voucher.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDemoModalOpen(false);
                    resetVoucherForm();
                    setVoucherModalOpen(true);
                  }}
                  className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5 text-slate-950" />
                  <span>Pedir Meu Voucher Grátis</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE SOLICITAÇÃO DE VOUCHER */}
      {voucherModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative my-8">
            <button
              type="button"
              onClick={() => setVoucherModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {reqSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white">Solicitação Recebida!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Obrigado, <strong>{reqName}</strong>! Em instantes nosso time processará e você receberá seu voucher no e-mail:
                </p>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-400 font-mono text-sm font-bold">
                  {reqEmail}
                </div>
                <div className="pt-3 flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => { resetVoucherForm(); setVoucherModalOpen(false); }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                  >
                    Fechar
                  </button>
                  <Link
                    href="/iniciar"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    Já Tenho um Voucher
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Ticket className="w-4 h-4" />
                  <span>Acesso Antecipado & Gratuito</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Solicitar Voucher de Criação</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Preencha seus dados para receber o voucher de ativação diretamente no seu e-mail e publicar o site da sua empresa em 15 minutos.
                </p>

                <form onSubmit={handleRequestVoucher} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>Nome Completo *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      placeholder="Ex: Dra. Camila Rocha"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>E-mail para Envio do Voucher *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={reqEmail}
                      onChange={(e) => setReqEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com.br"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tipo de Site / Sua Atividade *</span>
                    </label>
                    <select
                      value={reqSiteType}
                      onChange={(e) => setReqSiteType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <optgroup label="⭐ Micro-SaaS & CRM Integrado">
                        <option value="Barbearia / Barber Shop (com CRM & Agendamento)">💈 Barbearia / Barber Shop (Agendamento & CRM)</option>
                        <option value="Clínica Médica / Consultório (com CRM & Prontuário)">🩺 Clínica Médica / Consultório (Prontuário & Lembretes)</option>
                        <option value="Imobiliária / Gestão de Imóveis (com Funil Kanban)">🏡 Imobiliária / Corretores (Funil Kanban de Vendas)</option>
                        <option value="Academia / Centro Fitness (com Cobrança PIX)">🏋️ Academia & Studio Fitness (Cobrança Automática PIX)</option>
                        <option value="Pet Shop / Banho & Tosa (com Esteira Operacional)">🐾 Pet Shop / Banho & Tosa (Esteira Operacional)</option>
                      </optgroup>
                      <optgroup label="── Outros Segmentos ──">
                        <option value="Odontologia / Saúde">Clínica Odontológica / Saúde</option>
                        <option value="Oficina Mecânica / Automotivo">Oficina Mecânica / Auto Center</option>
                        <option value="Advocacia & Serviços Jurídicos">Advocacia & Serviços Jurídicos</option>
                        <option value="Gastronomia, Restaurante & Buffet">Gastronomia, Restaurante & Buffet</option>
                        <option value="Arquitetura, Engenharia & Reformas">Arquitetura, Engenharia & Reformas</option>
                        <option value="Comércio & Loja">Comércio Local & Varejo</option>
                        <option value="Prestador de Serviços">Prestador de Serviços Gerais</option>
                        <option value="Outro">Outro segmento...</option>
                      </optgroup>
                    </select>
                  </div>

                  {reqSiteType === 'Outro' && (
                    <div>
                      <input
                        type="text"
                        required
                        value={reqCustomType}
                        onChange={(e) => setReqCustomType(e.target.value)}
                        placeholder="Digite sua atividade profissional..."
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Observação Adicional (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={reqMessage}
                      onChange={(e) => setReqMessage(e.target.value)}
                      placeholder="Alguma informação importante sobre seu negócio..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500 resize-none"
                    />
                  </div>

                  {reqError && (
                    <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{reqError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={reqSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-950 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {reqSubmitting ? (
                      <span>Registrando solicitação...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirmar e Enviar Pedido de Voucher</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
