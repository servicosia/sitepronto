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
  Loader2 
} from 'lucide-react';
import { OnboardingData } from '@/lib/validation/onboarding';

const steps = [
  { id: 1, name: 'Identificação', desc: 'Nome e Atividade' },
  { id: 2, name: 'Especialidades', desc: 'Resumo e Atuação' },
  { id: 3, name: 'Serviços', desc: 'Áreas e Ofertas' },
  { id: 4, name: 'Contatos', desc: 'WhatsApp e Local' },
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
  const [selectedModel, setSelectedModel] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C'>('MODEL_A');
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Conta do cliente para provisionamento
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [provisioning, setProvisioning] = useState(false);

  // Estados do Google Stitch / Live Previews
  const [synthesizing, setSynthesizing] = useState(false);
  const [stitchEngineUsed, setStitchEngineUsed] = useState<string>('GoogleStitch');
  const [previewsData, setPreviewsData] = useState<Record<string, { title: string; description: string; html: string }>>({});

  // Estado do formulário de onboarding
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    fullName: '',
    professionalName: '',
    companyName: '',
    profession: '',
    activityType: 'autonomo',
    hasProfessionalCouncil: false,
    councilType: 'OAB/SP',
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
      }
    ],
    primaryColor: '#0f172a',
    secondaryColor: '#3b82f6',
    accentColor: '#10b981',
    visualStyle: 'moderno',
    themePreference: 'claro',
    hasCustomDomain: false,
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
  }, [currentStep, formData.primaryColor, formData.secondaryColor, formData.accentColor]);

  function handleInputChange(field: keyof OnboardingData, value: any) {
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

      // Redireciona para tela de progresso em tempo real
      router.push(`/progresso/${result.siteId}`);
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

          {/* ETAPA 3: Serviços */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Serviços / Áreas de Atuação</h2>
                  <p className="text-slate-600 text-sm mt-1">Cadastre os serviços que serão exibidos nos cards do site.</p>
                </div>
                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800"
                >
                  + Adicionar Serviço
                </button>
              </div>

              <div className="space-y-4">
                {(formData.services || []).map((service, index) => (
                  <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-700">Serviço #{index + 1}</span>
                      {formData.services!.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-xs text-red-600 font-semibold hover:underline"
                        >
                          Remover
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600">Título do Serviço</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          placeholder="Ex: Atendimento Individualizado"
                          className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600">Texto do Botão (CTA)</label>
                        <input
                          type="text"
                          value={service.ctaText}
                          onChange={(e) => updateService(index, 'ctaText', e.target.value)}
                          placeholder="Solicitar Atendimento"
                          className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600">Descrição Curta</label>
                      <textarea
                        rows={2}
                        value={service.shortDescription}
                        onChange={(e) => updateService(index, 'shortDescription', e.target.value)}
                        placeholder="Explique resumidamente o que abrange este serviço."
                        className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 4: Contatos */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Dados de Contato e Atendimento</h2>
                <p className="text-slate-600 text-sm mt-1">Canais para os clientes falarem diretamente com você.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700">WhatsApp Comercial *</label>
                  <input
                    type="text"
                    value={formData.whatsapp || ''}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="Ex: (11) 99999-8888"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700">E-mail de Contato Público *</label>
                  <input
                    type="email"
                    value={formData.publicEmail || ''}
                    onChange={(e) => handleInputChange('publicEmail', e.target.value)}
                    placeholder="contato@seunome.com.br"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700">Horário de Atendimento</label>
                  <input
                    type="text"
                    value={formData.businessHours || ''}
                    onChange={(e) => handleInputChange('businessHours', e.target.value)}
                    placeholder="Segunda a Sexta, das 09h às 18h"
                    className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                  />
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Modelo A */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_A')}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_A'
                          ? 'border-slate-900 bg-slate-50/90 shadow-md ring-2 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Modelo A</span>
                        {selectedModel === 'MODEL_A' && (
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Institucional Confiável</h3>
                      <p className="text-xs text-slate-600 mb-4">
                        Estrutura clássica, hero com contato rápido, cartões simétricos e alta legibilidade.
                      </p>
                      <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-slate-500">{formData.profession || 'Sua Profissão'}</div>
                      </div>
                    </div>

                    {/* Modelo B */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_B')}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_B'
                          ? 'border-slate-900 bg-slate-50/90 shadow-md ring-2 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Modelo B</span>
                        {selectedModel === 'MODEL_B' && (
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Moderno Premium</h3>
                      <p className="text-xs text-slate-600 mb-4">
                        Forte impacto visual, tipografia contemporânea, cartões dinâmicos e sofisticação.
                      </p>
                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-white">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-slate-300">{formData.mainSpecialty || 'Especialidade'}</div>
                      </div>
                    </div>

                    {/* Modelo C */}
                    <div 
                      onClick={() => setSelectedModel('MODEL_C')}
                      className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                        selectedModel === 'MODEL_C'
                          ? 'border-slate-900 bg-slate-50/90 shadow-md ring-2 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Modelo C</span>
                        {selectedModel === 'MODEL_C' && (
                          <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">✓</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Minimalista Editorial</h3>
                      <p className="text-xs text-slate-600 mb-4">
                        Espaçamento generoso, foco total na escrita, tipografia serifada e elegância sem ruídos.
                      </p>
                      <div className="p-3 bg-stone-100 rounded-lg border-l-2 border-stone-800 text-xs text-stone-800 font-serif">
                        <strong>{formData.professionalName || formData.fullName || 'Seu Nome'}</strong>
                        <div className="text-[11px] text-stone-600">{formData.city || 'Cidade'} - {formData.state || 'UF'}</div>
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
                          Pré-visualização Interativa • {selectedModel === 'MODEL_A' ? 'Modelo A (Institucional)' : selectedModel === 'MODEL_B' ? 'Modelo B (Moderno)' : 'Modelo C (Editorial)'}
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
                onClick={() => setCurrentStep(currentStep + 1)}
                className="inline-flex items-center px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 shadow-md"
              >
                Avançar <ArrowRight className="w-4 h-4 ml-2" />
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
