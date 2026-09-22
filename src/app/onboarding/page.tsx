'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Building2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Palette, 
  Eye, 
  Layers, 
  Loader2,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Search,
  Star,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { OnboardingData, SectionsConfig, GalleryItem, TestimonialItem } from '@/lib/validation/onboarding';
import { analyzeProfessionContext } from '@/lib/design-system/profession-intelligence';

const steps = [
  { id: 1, name: 'Identificação', desc: 'Nome e Atividade' },
  { id: 2, name: 'Especialidades', desc: 'Resumo e Atuação' },
  { id: 3, name: 'Módulos & Conteúdo', desc: 'Seções, Serviços e Galeria' },
  { id: 4, name: 'Domínio & Contatos', desc: 'Registro.br e WhatsApp' },
  { id: 5, name: 'Identidade', desc: 'Cores e Estilo' },
  { id: 6, name: 'Modelos de UI', desc: 'Escolha seu Design' },
  { id: 7, name: 'Revisão', desc: 'Confirmação Final' },
];

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const voucherCode = searchParams.get('voucher') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('Alterações salvas');
  const [selectedModel, setSelectedModel] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D'>('MODEL_A');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Conta do cliente para provisionamento
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [provisioning, setProvisioning] = useState(false);

  // Estados do Google Stitch / Live Previews
  const [synthesizing, setSynthesizing] = useState(false);
  const [stitchEngineUsed, setStitchEngineUsed] = useState<string>('GoogleStitch');
  const [previewsData, setPreviewsData] = useState<Record<string, { title: string; description: string; html: string }>>({});

  // Estados de verificação de domínio (Registro.br isavail)
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainVerified, setDomainVerified] = useState(false);
  const [domainCheckResult, setDomainCheckResult] = useState<{
    available: boolean;
    status: number;
    message: string;
    domain: string;
    suggestions?: string[];
    registrationUrl?: string;
  } | null>(null);

  async function checkDomainAvailability(domainToCheck?: string) {
    const raw = domainToCheck || formData.customDomainName;
    if (!raw || !raw.trim()) return;
    setCheckingDomain(true);
    try {
      const res = await fetch(`/api/domain/check-availability?domain=${encodeURIComponent(raw.trim())}`);
      const data = await res.json();
      setDomainCheckResult(data);
      setDomainVerified(true);
    } catch {
      setDomainCheckResult({
        available: false,
        status: -1,
        domain: raw,
        message: 'Erro de conexão ao consultar Registro.br.',
      });
      setDomainVerified(true);
    } finally {
      setCheckingDomain(false);
    }
  }

  // Estado do formulário de onboarding
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    fullName: '',
    professionalName: '',
    companyName: '',
    profession: '',
    activityType: 'autonomo',
    hasProfessionalCouncil: false,
    councilType: '',
    councilNumber: '',
    mainSpecialty: '',
    professionalSummary: '',
    city: '',
    state: 'SP',
    attendanceType: 'hibrido',
    whatsapp: '',
    publicEmail: '',
    showFullAddress: false,
    street: '',
    neighborhood: '',
    businessHours: 'Segunda a Sexta, das 09h às 18h',
    services: [
      {
        title: 'Consultoria Especializada',
        shortDescription: 'Atendimento personalizado com foco na necessidade de cada cliente.',
        icon: 'Briefcase',
        ctaText: 'Falar no WhatsApp',
        active: true,
        order: 1,
      },
      {
        title: 'Avaliação & Diagnóstico Técnico',
        shortDescription: 'Mapeamento estratégico e planejamento estruturado para resultados consistentes.',
        icon: 'Target',
        ctaText: 'Agendar Avaliação',
        active: true,
        order: 2,
      },
      {
        title: 'Acompanhamento Contínuo',
        shortDescription: 'Suporte dedicado e orientação periódica para evolução sustentável.',
        icon: 'Shield',
        ctaText: 'Falar no WhatsApp',
        active: true,
        order: 3,
      }
    ],
    sectionsConfig: {
      inicio: true,
      servicos: true,
      'como-funciona': true,
      sobre: true,
      galeria: true,
      depoimentos: true,
      artigos: true,
      contato: true,
    },
    gallery: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        title: 'Ambiente de Atendimento',
        caption: 'Espaço climatizado, confortável e com acessibilidade garantida.',
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
        title: 'Recepção e Acolhimento',
        caption: 'Recepção ampla para clientes com pontualidade e tranquilidade.',
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        title: 'Estrutura Moderna',
        caption: 'Equipamentos e tecnologia para garantir precisão e agilidade.',
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        title: 'Consultoria e Planejamento',
        caption: 'Foco em soluções personalizadas e atendimento humanizado.',
      }
    ],
    testimonials: [
      {
        id: '1',
        clientName: 'Mariana Mendonça',
        role: 'Cliente Atendida',
        content: 'Excelente profissional! O atendimento superou todas as minhas expectativas em rapidez, atenção e dedicação.',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
      {
        id: '2',
        clientName: 'Carlos Eduardo Ramos',
        role: 'Empresário',
        content: 'A clareza nas orientações e a postura ética fizeram toda a diferença. Recomendo de olhos fechados!',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      },
      {
        id: '3',
        clientName: 'Fernanda Vasconcelos',
        role: 'Profissional Liberal',
        content: 'Estrutura impecável e pontualidade. Me senti muito bem acolhida e os resultados foram visíveis desde o início.',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
      }
    ],
    primaryColor: '#0f172a',
    secondaryColor: '#3b82f6',
    accentColor: '#10b981',
    visualStyle: 'moderno',
    themePreference: 'claro',
    hasCustomDomain: false,
    registerDomainOnCompletion: false,
  });

  // Carrega dados salvos
  useEffect(() => {
    if (!voucherCode) {
      router.push('/iniciar');
      return;
    }

    async function loadData() {
      try {
        const res = await fetch(`/api/onboarding?voucher=${encodeURIComponent(voucherCode)}`);
        const data = await res.json();
        if (data.session?.data) {
          setFormData((prev) => ({ ...prev, ...data.session.data }));
          if (data.session.step) setCurrentStep(data.session.step);
          if (data.session.selectedDesign) setSelectedModel(data.session.selectedDesign);
        }
      } catch (err) {
        console.error('Failed to load session:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [voucherCode, router]);

  // Autosave com debounce
  useEffect(() => {
    if (loading) return;
    setSaving(true);
    setSaveStatus('Salvando...');

    const timer = setTimeout(async () => {
      try {
        await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            voucherCode,
            step: currentStep,
            data: formData,
            selectedDesign: selectedModel,
          }),
        });
        setSaveStatus('Alterações salvas');
      } catch (err) {
        setSaveStatus('Erro ao salvar');
      } finally {
        setSaving(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [formData, currentStep, selectedModel, voucherCode, loading]);

  // Síntese de propostas visuais com Google Stitch ao entrar na Etapa 6
  async function generatePreviews() {
    setSynthesizing(true);
    try {
      const res = await fetch('/api/onboarding/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.previews) {
        setPreviewsData(data.previews);
        setStitchEngineUsed(data.providerUsed || 'InternalSynthesizer');
      }
    } catch (err) {
      console.error('Erro ao gerar previews de UI:', err);
    } finally {
      // Simula uma validação de síntese refinada de 1.2s para suavidade visual
      setTimeout(() => setSynthesizing(false), 800);
    }
  }

  useEffect(() => {
    if (currentStep === 6) {
      generatePreviews();
    }
  }, [
    currentStep, 
    formData.profession, 
    formData.mainSpecialty, 
    formData.professionalName, 
    formData.fullName,
    formData.primaryColor, 
    formData.secondaryColor, 
    formData.accentColor
  ]);

  function handleInputChange(field: keyof OnboardingData, value: any) {
    if (field === 'profession') {
      const analysis = analyzeProfessionContext(value, formData.mainSpecialty, formData.companyName);
      if (analysis.suggestedCouncil.hasCouncil && !formData.hasProfessionalCouncil) {
        setFormData((prev) => ({
          ...prev,
          profession: value,
          hasProfessionalCouncil: true,
          councilType: prev.councilType || `${analysis.suggestedCouncil.councilAcronym}/${prev.state || 'SP'}`,
        }));
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function addService() {
    const current = formData.services || [];
    setFormData((prev) => ({
      ...prev,
      services: [
        ...current,
        {
          title: '',
          shortDescription: '',
          icon: 'Star',
          ctaText: 'Solicitar Atendimento',
          active: true,
          order: current.length + 1,
        }
      ]
    }));
  }

  function updateService(index: number, field: string, value: any) {
    const updated = [...(formData.services || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, services: updated }));
  }

  function removeService(index: number) {
    const updated = (formData.services || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, services: updated }));
  }

  function toggleSection(key: keyof SectionsConfig) {
    setFormData((prev) => ({
      ...prev,
      sectionsConfig: {
        inicio: prev.sectionsConfig?.inicio ?? true,
        servicos: prev.sectionsConfig?.servicos ?? true,
        'como-funciona': prev.sectionsConfig?.['como-funciona'] ?? true,
        sobre: prev.sectionsConfig?.sobre ?? true,
        galeria: prev.sectionsConfig?.galeria ?? true,
        depoimentos: prev.sectionsConfig?.depoimentos ?? true,
        artigos: prev.sectionsConfig?.artigos ?? true,
        contato: prev.sectionsConfig?.contato ?? true,
        [key]: !((prev.sectionsConfig as any)?.[key] ?? true),
      },
    }));
  }

  function addGalleryPhoto() {
    setFormData((prev) => ({
      ...prev,
      gallery: [
        ...(prev.gallery || []),
        {
          id: String(Date.now()),
          url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          title: 'Nova Foto da Estrutura',
          caption: 'Registro do nosso atendimento e espaço.',
        }
      ]
    }));
  }

  function updateGalleryPhoto(index: number, field: string, value: string) {
    const updated = [...(formData.gallery || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, gallery: updated }));
  }

  function removeGalleryPhoto(index: number) {
    const updated = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, gallery: updated }));
  }

  function addTestimonial() {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...(prev.testimonials || []),
        {
          id: String(Date.now()),
          clientName: 'Novo Cliente',
          role: 'Cliente Atendido',
          content: 'Excelente atendimento, recomendo muito pelo profissionalismo e atenção!',
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          rating: 5,
        }
      ]
    }));
  }

  function updateTestimonial(index: number, field: string, value: any) {
    const updated = [...(formData.testimonials || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, testimonials: updated }));
  }

  function removeTestimonial(index: number) {
    const updated = (formData.testimonials || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, testimonials: updated }));
  }

  async function handleFinalizeAndProvision() {
    if (!accountEmail || !accountPassword) {
      alert('Por favor, informe seu e-mail e crie uma senha para acessar o painel administrativo do seu site.');
      return;
    }

    setProvisioning(true);

    try {
      const res = await fetch('/api/provisioning/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucherCode,
          clientEmail: accountEmail,
          clientPassword: accountPassword,
          clientName: formData.fullName,
          selectedVariant: selectedModel,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || 'Erro ao iniciar criação do site.');
        setProvisioning(false);
        return;
      }

      // Se optou por registrar o domínio, salva no sessionStorage
      if (formData.registerDomainOnCompletion && formData.customDomainName) {
        try {
          sessionStorage.setItem('registerDomainOnCompletion', JSON.stringify({
            domain: formData.customDomainName,
            url: domainCheckResult?.registrationUrl || `https://registro.br/busca/?query=${encodeURIComponent(formData.customDomainName)}`,
          }));
        } catch {}
      }

      // Redireciona para tela de progresso em tempo real
      const regParam = formData.registerDomainOnCompletion ? '?registerDomain=1' : '';
      router.push(`/progresso/${result.siteId}${regParam}`);
    } catch (err) {
      alert('Falha ao conectar com o servidor.');
      setProvisioning(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              SP
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">SitePronto</span>
              <span className="ml-2 text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border">
                {voucherCode}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-500 hidden sm:inline-flex items-center">
              <span className={`w-2 h-2 rounded-full mr-1.5 ${saving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
              {saveStatus}
            </span>
          </div>
        </div>
      </header>

      {/* Steps Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : isPast
                      ? 'text-slate-900 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-white text-slate-900' : isPast ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? <Check className="w-3.5 h-3.5" /> : step.id}
                  </span>
                  <span>{step.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Wizard Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          
          {/* ETAPA 1: Identificação */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Sobre você e sua atividade</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Essas informações serão utilizadas para gerar a estrutura e textos do seu site profissional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Nome Completo *</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ex: Dra. Maria Silva"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Nome Profissional ou Comercial *</label>
                  <input
                    type="text"
                    value={formData.professionalName || ''}
                    onChange={(e) => handleInputChange('professionalName', e.target.value)}
                    placeholder="Ex: Dra. Maria Silva Fisioterapia"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Sua Profissão *</label>
                  <input
                    type="text"
                    value={formData.profession || ''}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    placeholder="Ex: Fisioterapeuta, Advogado, Psicólogo..."
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Tipo de Atuação</label>
                  <select
                    value={formData.activityType}
                    onChange={(e) => handleInputChange('activityType', e.target.value)}
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white"
                  >
                    <option value="autonomo">Profissional Autônomo / Liberal</option>
                    <option value="consultorio">Consultório / Clínica</option>
                    <option value="escritorio">Escritório Profissional</option>
                    <option value="empresa">Empresa / Sociedade</option>
                  </select>
                </div>
              </div>

              {/* Registro Profissional / Conselho */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="hasCouncil"
                    checked={formData.hasProfessionalCouncil}
                    onChange={(e) => handleInputChange('hasProfessionalCouncil', e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
                  />
                  <label htmlFor="hasCouncil" className="text-sm font-semibold text-slate-800">
                    Possuo registro em Conselho Profissional (OAB, CRM, CRP, CRC, CREA, CREFITO, etc.)
                  </label>
                </div>

                {formData.hasProfessionalCouncil && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-7">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600">Sigla do Conselho / UF</label>
                      <input
                        type="text"
                        value={formData.councilType || ''}
                        onChange={(e) => handleInputChange('councilType', e.target.value)}
                        placeholder="Ex: CREFITO-3/SP ou OAB/RJ"
                        className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600">Número de Registro</label>
                      <input
                        type="text"
                        value={formData.councilNumber || ''}
                        onChange={(e) => handleInputChange('councilNumber', e.target.value)}
                        placeholder="Ex: 123456-F"
                        className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ETAPA 2: Especialidades */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Especialidades e Resumo Profissional</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Regra de Veracidade: As informações descritas aqui serão aprimoradas para o site sem inventar dados.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Especialidade Principal *</label>
                <input
                  type="text"
                  value={formData.mainSpecialty || ''}
                  onChange={(e) => handleInputChange('mainSpecialty', e.target.value)}
                  placeholder="Ex: Fisioterapia Traumato-Ortopédica e Reabilitação Postural"
                  className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Resumo da sua atuação profissional *</label>
                <textarea
                  rows={4}
                  value={formData.professionalSummary || ''}
                  onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
                  placeholder="Conte em poucas linhas como você ajuda seus clientes/pacientes, qual sua abordagem e metodologia de atendimento."
                  className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Cidade *</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Ex: São Paulo"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Estado (UF) *</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                    placeholder="SP"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 3: Módulos, Seções & Conteúdo */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Módulos, Seções & Conteúdo do Site</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Ative ou desative as seções que farão parte do seu site e gerencie a quantidade de cards, fotos e depoimentos.
                </p>
              </div>

              {/* 1. ATIVAÇÃO / DESATIVAÇÃO DE SEÇÕES (MODULARIDADE) */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-slate-700" />
                      Estrutura de Seções do Site
                    </h3>
                    <p className="text-xs text-slate-500">
                      Clique no botão de cada seção para ativá-la ou ocultá-la no menu e na página do seu site.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {[
                    { key: 'inicio', label: 'Início (Hero Banner)', desc: 'Apresentação principal e chamada de ação' },
                    { key: 'servicos', label: 'Áreas de Atuação', desc: 'Cards de serviços com botão WhatsApp' },
                    { key: 'como-funciona', label: 'Como Funciona', desc: 'Passo a passo do seu atendimento' },
                    { key: 'sobre', label: 'Sobre Nós', desc: 'Perfil profissional, história e horários' },
                    { key: 'galeria', label: '🖼️ Galeria de Fotos', desc: 'Fotos do espaço físico e instalações' },
                    { key: 'depoimentos', label: '💬 Depoimentos', desc: 'Avaliações reais de clientes com fotos' },
                    { key: 'artigos', label: 'Orientações / Artigos', desc: 'Conteúdo informativo e esclarecimentos' },
                    { key: 'contato', label: 'Contato & Local', desc: 'Formulário direto e botão WhatsApp' },
                  ].map((sec) => {
                    const isActive = (formData.sectionsConfig as any)?.[sec.key] !== false;
                    return (
                      <div
                        key={sec.key}
                        onClick={() => toggleSection(sec.key as keyof SectionsConfig)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isActive
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                            : 'border-slate-200 bg-slate-50 opacity-60 hover:opacity-80'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold ${isActive ? 'text-emerald-950' : 'text-slate-600'}`}>
                            {sec.label}
                          </span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                          }`}>
                            {isActive ? 'Ativa' : 'Oculta'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {sec.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. CARDS DE SERVIÇOS / ÁREAS DE ATUAÇÃO */}
              {formData.sectionsConfig?.servicos !== false && (
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-slate-700" />
                        Cards da Seção de Serviços / Atuação
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {formData.services?.length || 0} cards ativos
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adicione ou remova cards conforme a necessidade da sua empresa.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addService}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Card de Serviço
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(formData.services || []).map((service, index) => (
                      <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-700">Card #{index + 1}</span>
                          {formData.services!.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeService(index)}
                              className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remover
                            </button>
                          )}
                        </div>
                        <div className="space-y-2.5">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Título do Card</label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => updateService(index, 'title', e.target.value)}
                              placeholder="Ex: Consultoria Personalizada"
                              className="mt-0.5 block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Texto do Botão (CTA)</label>
                            <input
                              type="text"
                              value={service.ctaText}
                              onChange={(e) => updateService(index, 'ctaText', e.target.value)}
                              placeholder="Ex: Falar no WhatsApp"
                              className="mt-0.5 block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Descrição Curta</label>
                            <textarea
                              rows={2}
                              value={service.shortDescription}
                              onChange={(e) => updateService(index, 'shortDescription', e.target.value)}
                              placeholder="Resumo das atividades..."
                              className="mt-0.5 block w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-slate-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. GALERIA DE FOTOS DO ESPAÇO & ATUAÇÃO */}
              {formData.sectionsConfig?.galeria !== false && (
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-slate-700" />
                        Galeria de Fotos do Espaço & Atuação
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {formData.gallery?.length || 0} fotos cadastradas
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Insira fotos do seu consultório, oficina, loja ou equipe para transmitir credibilidade.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addGalleryPhoto}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Foto à Galeria
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(formData.gallery || []).map((photo, index) => (
                      <div key={photo.id || index} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                        <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-200 relative border border-slate-300">
                          <img
                            src={photo.url}
                            alt={photo.title || 'Foto'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80');
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">URL da Imagem</label>
                            <input
                              type="text"
                              value={photo.url}
                              onChange={(e) => updateGalleryPhoto(index, 'url', e.target.value)}
                              placeholder="https://..."
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Título da Foto</label>
                            <input
                              type="text"
                              value={photo.title || ''}
                              onChange={(e) => updateGalleryPhoto(index, 'title', e.target.value)}
                              placeholder="Ex: Recepção Principal"
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Legenda Curta</label>
                            <input
                              type="text"
                              value={photo.caption || ''}
                              onChange={(e) => updateGalleryPhoto(index, 'caption', e.target.value)}
                              placeholder="Ex: Ambiente climatizado"
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeGalleryPhoto(index)}
                          className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center justify-center gap-1 pt-1 border-t border-slate-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remover Foto
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. DEPOIMENTOS DE CLIENTES */}
              {formData.sectionsConfig?.depoimentos !== false && (
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-slate-700" />
                        Depoimentos de Clientes & Avaliações
                        <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {formData.testimonials?.length || 0} depoimentos cadastrados
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Exiba a opinião real de pessoas atendidas para aumentar a confiança de novos clientes.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Depoimento
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(formData.testimonials || []).map((t, index) => (
                      <div key={t.id || index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={t.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                            alt={t.clientName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-300 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-xs text-slate-900 block truncate">{t.clientName || 'Cliente'}</span>
                            <span className="text-[11px] text-slate-500 block truncate">{t.role || 'Cliente Atendido'}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTestimonial(index)}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Remover depoimento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Nome do Cliente</label>
                            <input
                              type="text"
                              value={t.clientName}
                              onChange={(e) => updateTestimonial(index, 'clientName', e.target.value)}
                              placeholder="Ex: Dra. Ana Paula"
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Ocupação / Cidade</label>
                            <input
                              type="text"
                              value={t.role || ''}
                              onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                              placeholder="Ex: Empresária - São Paulo"
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Foto do Cliente (URL)</label>
                            <input
                              type="text"
                              value={t.photoUrl || ''}
                              onChange={(e) => updateTestimonial(index, 'photoUrl', e.target.value)}
                              placeholder="https://..."
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600">Depoimento Pequeno</label>
                            <textarea
                              rows={3}
                              value={t.content}
                              onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                              placeholder="Relato sobre a experiência..."
                              className="mt-0.5 block w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ETAPA 4: Domínio & Contatos */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Domínio e Canais de Atendimento</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Defina o endereço oficial na internet e os canais diretos para os clientes entrarem em contato.
                </p>
              </div>

              {/* SELEÇÃO DO TIPO DE DOMÍNIO (STITCH SCREEN 3) */}
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-900">
                  Como você deseja publicar o endereço do seu site?
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Opção A: Subdomínio Provisório */}
                  <div
                    onClick={() => {
                      handleInputChange('hasCustomDomain', false);
                      setDomainVerified(true);
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      !formData.hasCustomDomain
                        ? 'border-slate-900 bg-slate-50 shadow-sm ring-2 ring-slate-900/10'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Subdomínio Imediato</span>
                        {!formData.hasCustomDomain && (
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">✓</span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-1">Subdomínio Gratuito do Sistema</h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Seu site entra no ar imediatamente com SSL grátis sem precisar registrar ou pagar domínio agora.
                      </p>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
                      https://{formData.professionalName ? formData.professionalName.toLowerCase().replace(/[^a-z0-9]/g, '') : 'seusite'}.sitepronto.com.br
                    </div>
                  </div>

                  {/* Opção B: Domínio Próprio .BR com Registro.br */}
                  <div
                    onClick={() => {
                      handleInputChange('hasCustomDomain', true);
                      setDomainVerified(false);
                      if (!formData.customDomainName && formData.professionalName) {
                        const sug = formData.professionalName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com.br';
                        handleInputChange('customDomainName', sug);
                      }
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      formData.hasCustomDomain
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Oficial Registro.br</span>
                        {formData.hasCustomDomain && (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-1">Meu Domínio Próprio .BR</h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Consulte a disponibilidade no Registro.br e registre ou aponte seu próprio endereço .com.br ou .adv.br.
                      </p>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs font-mono text-emerald-900 font-semibold">
                      https://www.seunegocio.com.br
                    </div>
                  </div>
                </div>
              </div>

              {/* CAMPO DO DOMÍNIO PRÓPRIO E CONSULTA ISAVAIL NO REGISTRO.BR */}
              {formData.hasCustomDomain && (
                <div className="p-6 rounded-2xl border-2 border-emerald-500/60 bg-emerald-50/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-bold text-slate-900">
                        Digite o domínio .BR para verificar no Registro.br <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-slate-600">
                        O sistema consulta a API oficial <code>isavail</code> do Registro.br em tempo real.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Consulta Direta
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={formData.customDomainName || ''}
                        onChange={(e) => {
                          handleInputChange('customDomainName', e.target.value.toLowerCase().replace(/\s+/g, ''));
                          setDomainCheckResult(null);
                          setDomainVerified(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            checkDomainAvailability();
                          }
                        }}
                        placeholder="Ex: seunegocio.com.br, consultoriadra.adv.br, clinica.med.br"
                        className="block w-full pl-4 pr-10 py-3 text-sm font-mono border-2 border-slate-300 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 bg-white"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={checkingDomain || !formData.customDomainName?.trim()}
                      onClick={() => checkDomainAvailability()}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-xl transition flex items-center justify-center shrink-0 shadow-md gap-2"
                    >
                      {checkingDomain ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Consultando Registro.br...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          Verificar Disponibilidade (Registro.br)
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card de Resultado da Consulta isavail */}
                  {domainCheckResult && (
                    <div
                      className={`p-5 rounded-xl border text-xs space-y-3 shadow-sm ${
                        domainCheckResult.available
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : domainCheckResult.status === 2
                          ? 'bg-blue-50 border-blue-300 text-blue-950'
                          : 'bg-amber-50 border-amber-300 text-amber-950'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-sm block flex items-center gap-1.5">
                            {domainCheckResult.available ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                🎉 Domínio Disponível para Registro!
                              </>
                            ) : domainCheckResult.status === 2 ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                ℹ️ Domínio já Registrado no Registro.br
                              </>
                            ) : (
                              '⚠️ Atenção'
                            )}
                          </span>
                          <p className="mt-1 font-medium">{domainCheckResult.message}</p>
                        </div>

                        {/* Botão de Ação Rápida: Prosseguir com o Domínio */}
                        <button
                          type="button"
                          onClick={() => setCurrentStep(5)}
                          className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-sm flex items-center gap-1.5 shrink-0 transition ${
                            domainCheckResult.available
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : 'bg-slate-900 hover:bg-slate-800'
                          }`}
                        >
                          Prosseguir com este Domínio <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Opção de abrir Registro.br ao finalizar */}
                      {domainCheckResult.available && (
                        <label className="flex items-center space-x-2.5 pt-2 border-t border-emerald-200/80 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.registerDomainOnCompletion !== false}
                            onChange={(e) => handleInputChange('registerDomainOnCompletion', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-600"
                          />
                          <span className="text-xs font-semibold text-emerald-900">
                            Abrir o Registro.br em nova aba ao finalizar a criação do site para eu registrar oficialmente
                          </span>
                        </label>
                      )}

                      {/* Sugestões alternativas */}
                      {domainCheckResult.suggestions && domainCheckResult.suggestions.length > 0 && (
                        <div className="pt-2 border-t border-slate-200/60">
                          <span className="text-[11px] font-semibold opacity-80 block mb-1">
                            Extensões alternativas disponíveis:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {domainCheckResult.suggestions.map((sug) => (
                              <button
                                key={sug}
                                type="button"
                                onClick={() => {
                                  handleInputChange('customDomainName', sug);
                                  checkDomainAvailability(sug);
                                }}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[11px] font-mono rounded-lg border border-slate-300 transition shadow-2xs font-semibold"
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!domainCheckResult && !checkingDomain && (
                    <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                      💡 <strong>Atenção:</strong> Clique no botão <strong>"Verificar Disponibilidade"</strong> acima para consultar o Registro.br antes de avançar para a próxima etapa.
                    </p>
                  )}
                </div>
              )}

              {/* DADOS DE CONTATO E WHATSAPP */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-5">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-slate-700" />
                  Canais de Contato e Atendimento
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Comercial *</label>
                    <input
                      type="text"
                      value={formData.whatsapp || ''}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="Ex: (11) 99999-8888"
                      className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Os botões de agendamento em todo o site direcionarão os clientes para este WhatsApp.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail de Contato Público *</label>
                    <input
                      type="email"
                      value={formData.publicEmail || ''}
                      onChange={(e) => handleInputChange('publicEmail', e.target.value)}
                      placeholder="contato@seunome.com.br"
                      className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horário de Atendimento</label>
                    <input
                      type="text"
                      value={formData.businessHours || ''}
                      onChange={(e) => handleInputChange('businessHours', e.target.value)}
                      placeholder="Segunda a Sexta, das 09h às 18h"
                      className="block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 5: Identidade Visual */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Identidade Visual e Cores</h2>
                <p className="text-slate-600 text-sm mt-1">Defina as cores base que orientarão as 3 propostas de design.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">Cor Principal (Primária)</label>
                  <div className="mt-2 flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.primaryColor || '#0f172a'}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-slate-300 p-1"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor || '#0f172a'}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Cor Secundária</label>
                  <div className="mt-2 flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.secondaryColor || '#3b82f6'}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-slate-300 p-1"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor || '#3b82f6'}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">Cor de Destaque / Ação</label>
                  <div className="mt-2 flex items-center space-x-3">
                    <input
                      type="color"
                      value={formData.accentColor || '#10b981'}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border border-slate-300 p-1"
                    />
                    <input
                      type="text"
                      value={formData.accentColor || '#10b981'}
                      onChange={(e) => handleInputChange('accentColor', e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 6: Modelos de UI & Previews com dados reais */}
          {currentStep === 6 && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    Propostas Visuais & Design DNA (Google Stitch)
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {synthesizing 
                      ? 'Processando e validando diagramação estética com inteligência artificial...' 
                      : `3 propostas estruturadas geradas via ${stitchEngineUsed === 'GoogleStitch' ? 'Google Stitch AI' : 'Motor Visual Integrado'}.`}
                  </p>
                </div>

                {!synthesizing && (
                  <button
                    type="button"
                    onClick={generatePreviews}
                    className="inline-flex items-center px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-slate-900" />
                    Recalcular Propostas
                  </button>
                )}
              </div>

              {synthesizing ? (
                <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-slate-900 animate-spin" />
                    <Sparkles className="w-6 h-6 text-amber-500 absolute inset-0 m-auto" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Sintetizando UI com Google Stitch...</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Aplicando paleta de cores ({formData.primaryColor}, {formData.secondaryColor}), combinando tipografia institucional e gerando estrutura completa com seções e formulário.
                  </p>
                </div>
              ) : (
                <>
                  {/* Seletor de Modelo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Modelo A */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_A')}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_A'
                          ? 'border-[#2e4f43] bg-[#fbf9f6] shadow-md ring-2 ring-[#2e4f43]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e4f43]">Modelo A • Stitch Haven</span>
                        {selectedModel === 'MODEL_A' && (
                          <span className="w-5 h-5 rounded-full bg-[#2e4f43] text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Serene Haven</h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Design orgânico botânico (verde sábio/terracota), linho e Playfair Display.
                      </p>
                      <div className="p-2.5 bg-[#f3efea] rounded-xl border border-[#e8e2d9] text-xs text-[#17382d] font-serif">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-[#5f6864] font-sans">{formData.profession || 'Sua Profissão'}</div>
                      </div>
                    </div>

                    {/* Modelo B */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_B')}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_B'
                          ? 'border-sky-500 bg-slate-900 shadow-md ring-2 ring-sky-500 text-white'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">Modelo B</span>
                        {selectedModel === 'MODEL_B' && (
                          <span className="w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-xs font-bold">✓</span>
                        )}
                      </div>
                      <h3 className={`text-base font-bold mb-1 ${selectedModel === 'MODEL_B' ? 'text-white' : 'text-slate-900'}`}>Midnight Luminescence</h3>
                      <p className={`text-xs mb-3 ${selectedModel === 'MODEL_B' ? 'text-slate-300' : 'text-slate-600'}`}>
                        Atmosfera noturna com camadas de vidro fosco e contraste cristalino.
                      </p>
                      <div className="p-2.5 bg-slate-950 rounded-xl text-xs text-white border border-slate-800">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-sky-400">{formData.mainSpecialty || 'Especialidade'}</div>
                      </div>
                    </div>

                    {/* Modelo C */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_C')}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_C'
                          ? 'border-stone-800 bg-[#faf7f2] shadow-md ring-2 ring-stone-800'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Modelo C</span>
                        {selectedModel === 'MODEL_C' && (
                          <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Atelier Editorial</h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Tipografia clássica serifada nobre, alta autoridade e layout de curadoria.
                      </p>
                      <div className="p-2.5 bg-stone-100 rounded-lg border-l-2 border-stone-800 text-xs text-stone-800 font-serif">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-stone-600">{formData.city || 'Cidade'} - {formData.state || 'UF'}</div>
                      </div>
                    </div>

                    {/* Modelo D */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_D')}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_D'
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Modelo D • Bento Pulse</span>
                        {selectedModel === 'MODEL_D' && (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Modern Bento Pulse</h3>
                      <p className="text-xs text-slate-600 mb-3">
                        Layout modular Bento Grid contemporâneo com foco em conversão e agendamento.
                      </p>
                      <div className="p-2.5 bg-emerald-950 rounded-xl text-xs text-emerald-300">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-emerald-400">Agendamento & Conversão</div>
                      </div>
                    </div>
                  </div>

                  {/* Live Interactive Preview Box */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
                    <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                        <span className="text-xs font-mono text-slate-500 ml-2">
                          Pré-visualização Interativa • {selectedModel === 'MODEL_A' ? 'Modelo A (Institucional)' : selectedModel === 'MODEL_B' ? 'Modelo B (Moderno Dark)' : selectedModel === 'MODEL_C' ? 'Modelo C (Editorial)' : 'Modelo D (Alta Conversão)'}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setPreviewViewport('desktop')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                            previewViewport === 'desktop' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border'
                          }`}
                        >
                          Desktop
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewViewport('mobile')}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                            previewViewport === 'mobile' ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border'
                          }`}
                        >
                          Mobile
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-100 flex justify-center items-center min-h-[500px]">
                      <div className={`transition-all duration-300 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-300 ${
                        previewViewport === 'mobile' ? 'w-[375px] h-[640px]' : 'w-full h-[640px]'
                      }`}>
                        {previewsData[selectedModel]?.html ? (
                          <iframe
                            title="Live UI Preview"
                            srcDoc={previewsData[selectedModel].html}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                            <Loader2 className="w-8 h-8 animate-spin mb-2" />
                            Renderizando modelo...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ETAPA 7: Revisão Final & Criação da Conta */}
          {currentStep === 7 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Revise suas Informações</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Confira os dados antes de iniciar o provisionamento automatizado da sua infraestrutura.
                </p>
              </div>

              {/* Resumo */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Profissional:</span>
                    <span className="font-bold text-slate-800">{formData.professionalName} ({formData.profession})</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Modelo Escolhido:</span>
                    <span className="font-bold text-slate-800">
                      {selectedModel === 'MODEL_A' ? 'Modelo A — Institucional Confiável' : selectedModel === 'MODEL_B' ? 'Modelo B — Moderno Premium' : 'Modelo C — Minimalista Editorial'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">Localização:</span>
                    <span className="text-slate-800">{formData.city}/{formData.state}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-xs">WhatsApp & Contato:</span>
                    <span className="text-slate-800">{formData.whatsapp} | {formData.publicEmail}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 font-semibold block text-xs">Serviços Cadastrados:</span>
                    <span className="text-slate-800">
                      {(formData.services || []).map(s => s.title).filter(Boolean).join(', ') || '1 serviço configurado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Criação da Conta Administrativa (/master) */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Crie seu Acesso ao Painel Administrativo (/master)
                </h3>
                <p className="text-slate-600 text-xs">
                  Você usará este e-mail e senha para gerenciar seu próprio site publicado.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Seu E-mail de Acesso *</label>
                    <input
                      type="email"
                      required
                      value={accountEmail}
                      onChange={(e) => setAccountEmail(e.target.value)}
                      placeholder="admin@seusite.com.br"
                      className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Sua Senha de Acesso *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={accountPassword}
                      onChange={(e) => setAccountPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="inline-flex items-center px-4 py-2.5 border border-slate-300 text-sm font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </button>
            ) : <div />}

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => {
                  if (
                    currentStep === 4 &&
                    Boolean(formData.hasCustomDomain) &&
                    formData.customDomainName?.trim() &&
                    !domainVerified
                  ) {
                    checkDomainAvailability();
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }}
                disabled={checkingDomain}
                className="inline-flex items-center px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 shadow-md disabled:opacity-50"
              >
                {checkingDomain ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verificando Registro.br...
                  </>
                ) : currentStep === 4 && Boolean(formData.hasCustomDomain) && formData.customDomainName?.trim() && !domainVerified ? (
                  <>
                    Verificar no Registro.br & Avançar <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Avançar <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={provisioning}
                onClick={handleFinalizeAndProvision}
                className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white text-base font-bold rounded-xl hover:bg-emerald-700 shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer"
              >
                {provisioning ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Iniciando Fábrica de Sites...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Criar e Publicar Meu Site
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
