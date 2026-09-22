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
  Rocket
} from 'lucide-react';

export default function HomePage() {
  // Estados de Acessibilidade
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [highContrast, setHighContrast] = useState(false);

  // Showcase Tabs Mockup
  const [activeTab, setActiveTab] = useState<'odonto' | 'oficina' | 'boutique'>('odonto');

  // Modal de Demonstração
  const [demoModalOpen, setDemoModalOpen] = useState(false);

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

  const showcaseData = {
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
                <span>SSL 256-bit Seguro</span>
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
            <a href="#tabela-planos" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Planos & Preços
            </a>
            <a href="#acessibilidade" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Acessibilidade
            </a>
            <a href="#faq" className="px-3.5 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition">
              Dúvidas
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/platform-admin"
              className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition hidden sm:inline-flex"
            >
              Painel Admin
            </Link>
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
          
          {/* Banner de Atendimento Humanizado */}
          <aside className="w-full bg-[#dce9ff] rounded-2xl p-4 sm:p-5 shadow-sm mb-10 border border-blue-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="font-semibold text-sm sm:text-base">
                  Precisa de auxílio para iniciar? Fale com nosso consultor técnico no WhatsApp.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://wa.me/5511987654321"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-700 transition flex-1 sm:flex-initial"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Especialista</span>
                </a>
                <Link
                  href="/iniciar"
                  className="px-4 py-2.5 bg-white text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:bg-slate-50 transition border border-slate-200 flex-1 sm:flex-initial"
                >
                  <span>Ativar Meu Site</span>
                </Link>
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
                    domínio próprio
                  </span>{' '}
                  em 15 minutos.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Sem precisar programar ou entender de tecnologia. Você responde perguntas simples sobre seu negócio e nossa inteligência monta tudo: design, textos profissionais, fotos e conexão automática com Cloudflare e Vercel.
                </p>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/iniciar"
                    className="min-h-[52px] px-8 bg-blue-600 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition transform hover:-translate-y-0.5"
                  >
                    <span>Começar Agora com Voucher</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDemoModalOpen(true)}
                    className="min-h-[52px] px-6 bg-white text-slate-800 font-bold text-sm rounded-2xl border border-slate-300 flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Ver Demonstração ao Vivo</span>
                  </button>
                </div>

                {/* Indicadores de Confiança */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 bg-[#eff4ff] p-4 rounded-2xl shadow-xs border border-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">+12.000 sites entregues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-xs text-slate-800 font-semibold leading-tight">Domínio .com.br incluso</span>
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
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveTab('odonto')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                        activeTab === 'odonto' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Odontologia
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('oficina')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                        activeTab === 'oficina' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Oficina Mecânica
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('boutique')}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition text-center ${
                        activeTab === 'boutique' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Moda & Loja
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
                  <span>Infraestrutura dedicada GitHub + Neon</span>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                    3
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Domínio conectado e site no ar</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Vinculamos seu domínio .com.br, ativamos o Cloudflare DNS e entregamos o painel /master para você gerenciar módulos e cards com total autonomia.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sem burocracia técnica</span>
                </div>
              </div>
            </div>
          </section>

          {/* TABELA DE PLANOS E PREÇOS */}
          <section id="tabela-planos" className="w-full mb-16 py-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                Sem taxas ocultas ou fidelidade
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-2">
                Planos Claros e Acessíveis
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Escolha o plano ideal para a fase atual da sua empresa. Ative com seu voucher ou contrate online.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Plano Essencial */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">Plano Essencial</h3>
                  <p className="text-xs text-slate-500 mt-1">Presença institucional ágil</p>
                  
                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">R$ 39</span>
                    <span className="text-xs text-slate-500 font-semibold"> / mês</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Site institucional modular</strong> (até 4 seções ativas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Domínio próprio</strong> configurado na Vercel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Botão WhatsApp e chamada direta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certificado SSL Incluso</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/iniciar"
                  className="mt-8 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition text-center block"
                >
                  Resgatar no Plano Essencial
                </Link>
              </div>

              {/* Plano Profissional (Destaque) */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-600 flex flex-col justify-between relative lg:-mt-3 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Mais Escolhido
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-blue-700">Plano Profissional</h3>
                  <p className="text-xs text-slate-500 mt-1">Para prestadores de serviços e especialistas</p>
                  
                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-700">R$ 69</span>
                    <span className="text-xs text-slate-500 font-semibold"> / mês</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Todas as 8 seções modulares</strong> (Galeria, Depoimentos, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Cards dinâmicos ilimitados</strong> (adicione ou remova livremente)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Domínio .com.br incluso</strong> com DNS Cloudflare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Painel <strong>/master</strong> com banco Neon PostgreSQL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SEO Automático para buscas no Google</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/iniciar"
                  className="mt-8 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition text-center block shadow-md"
                >
                  Resgatar no Plano Profissional
                </Link>
              </div>

              {/* Plano Avançado */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900">Plano Avançado</h3>
                  <p className="text-xs text-slate-500 mt-1">Para clínicas, escritórios e empresas consolidadas</p>
                  
                  <div className="my-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">R$ 119</span>
                    <span className="text-xs text-slate-500 font-semibold"> / mês</span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Multi-domínios</strong> e landing pages de conversão</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>E-mails transacionais com Resend integrados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Galeria de alta resolução com CDN Global</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Suporte prioritário via WhatsApp com técnico dedicado</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/iniciar"
                  className="mt-8 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition text-center block"
                >
                  Resgatar no Plano Avançado
                </Link>
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
                  q: 'O que é um domínio próprio e eu preciso pagar algo a mais por ele?',
                  a: 'O domínio é o endereço oficial da sua marca na internet (como www.suaempresa.com.br). Com o voucher e nos nossos planos, o registro e apontamento no Cloudflare já são realizados sem complicações.'
                },
                {
                  q: 'Consigo ativar/desativar seções e alterar fotos e cards depois?',
                  a: 'Sim! No painel /master você tem uma aba exclusiva para Módulos & Seções onde pode ativar ou desativar qualquer bloco (incluindo Galeria e Depoimentos), além de adicionar ou diminuir cards com 1 clique.'
                },
                {
                  q: 'Como funciona a verificação de disponibilidade no Registro.br?',
                  a: 'Durante a criação ou alteração do domínio, nosso sistema consulta a interface isavail oficial do Registro.br. Se o domínio estiver disponível, você pode registrar na hora ou ao concluir o processo.'
                },
                {
                  q: 'Eu já tenho um domínio registrado no Registro.br, posso usar aqui?',
                  a: 'Com certeza! Basta informar o seu domínio existente. O sistema gera automaticamente os servidores DNS do Cloudflare (Master e Slave 1) para você colar na sua conta do Registro.br.'
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
                href="https://wa.me/5511987654321"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tirar Dúvidas</span>
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
                <li><a href="#tabela-planos" className="hover:text-blue-600">Planos & Preços</a></li>
                <li><Link href="/iniciar" className="hover:text-blue-600">Resgatar Voucher</Link></li>
                <li><Link href="/platform-admin" className="hover:text-blue-600">Painel do Administrador</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Contato & Suporte</h4>
              <div className="space-y-1.5 text-slate-600">
                <p>📞 0800 900 8020</p>
                <p>💬 WhatsApp: (11) 98765-4321</p>
                <p>✉️ contato@sitepronto.com.br</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Segurança & Nuvem</h4>
              <div className="space-y-2">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">Cloudflare DNS & Vercel</div>
                  <div className="text-[10px] text-slate-500">99.9% Uptime garantido</div>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">Neon PostgreSQL</div>
                  <div className="text-[10px] text-slate-500">Banco de dados dedicado</div>
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

      {/* MODAL DE DEMONSTRAÇÃO AO VIVO */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900">Demonstração Interativa SitePronto</h3>
              <button
                type="button"
                onClick={() => setDemoModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Veja as métricas de excelência técnica garantidas em cada site entregue automaticamente pela plataforma:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Google Core Web Vitals</span>
                <span className="font-bold text-emerald-600">100 / 100</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Acessibilidade Digital</span>
                <span className="font-bold text-emerald-600">WCAG 2.1 AA</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Tempo de Criação do Site</span>
                <span className="font-bold text-blue-600">Menos de 15 minutos</span>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDemoModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Fechar
              </button>
              <Link
                href="/iniciar"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Criar Meu Site Agora
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
