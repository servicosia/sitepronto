'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  ExternalLink, 
  Globe, 
  Github, 
  Database, 
  Check, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';

interface StepInfo {
  step: string;
  status: string;
  details?: any;
}

export default function ProgressoPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;

  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Controle de abertura da aba do Registro.br
  const [domainToRegister, setDomainToRegister] = useState<{ domain: string; url: string } | null>(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('registerDomainOnCompletion');
      if (stored) {
        setDomainToRegister(JSON.parse(stored));
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('registerDomain') === '1' && siteData?.customDomain) {
          setDomainToRegister({
            domain: siteData.customDomain,
            url: `https://registro.br/busca-dominio/?fqdn=${encodeURIComponent(siteData.customDomain)}`,
          });
        }
      }
    } catch {}
  }, [siteData]);

  useEffect(() => {
    if (siteData?.completed && domainToRegister && !hasAutoOpened) {
      setHasAutoOpened(true);
      try {
        window.open(domainToRegister.url, '_blank');
      } catch {
        console.warn('Bloqueador de popup ativo; botão manual disponível na tela.');
      }
    }
  }, [siteData?.completed, domainToRegister, hasAutoOpened]);

  useEffect(() => {
    if (!siteId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/provisioning/status?siteId=${encodeURIComponent(siteId)}`);
        const data = await res.json();
        if (res.ok) {
          setSiteData(data);
          if (data.completed || data.hasError) {
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Status fetch error:', err);
      } finally {
        setLoading(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [siteId]);

  const pipelineSteps = [
    { key: 'VALIDATING', label: 'Verificação inicial das informações' },
    { key: 'GENERATING_CONTENT', label: 'Criação dos textos, fotos e visual do site' },
    { key: 'CREATING_NEON', label: 'Preparação do armazenamento seguro' },
    { key: 'GENERATING_CODE', label: 'Construção do seu site e do painel de controle' },
    { key: 'CREATING_VERCEL', label: 'Publicação do seu site na internet' },
    { key: 'DOMAIN_CONFIGURATION', label: 'Configuração do endereço do seu site' },
    { key: 'TESTING', label: 'Testes finais e confirmação de segurança' },
  ];

  const domainStep = siteData?.steps?.find((s: StepInfo) => s.step === 'DOMAIN_CONFIGURATION');
  const hasDomainConfig = Boolean(domainStep && domainStep.status === 'SUCCESS');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-slate-900 text-lg">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base">
              SP
            </div>
            <span>SitePronto</span>
          </Link>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded border">
            ID: {siteId}
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {siteData?.completed ? '🎉 Seu site está pronto e publicado!' : 'Criando seu Site Profissional...'}
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              {siteData?.completed 
                ? 'Tudo pronto! Seu site e seu painel de edição já estão disponíveis.' 
                : 'Estamos organizando o visual, os textos e preparando tudo para colocar no ar.'}
            </p>
          </div>

          {/* Lista de Etapas em Tempo Real */}
          <div className="space-y-3 mb-8">
            {pipelineSteps.map((stepItem, index) => {
              const recordedStep = siteData?.steps?.find((s: StepInfo) => s.step === stepItem.key);
              const isFinished = recordedStep?.status === 'SUCCESS' || siteData?.completed;
              const isCurrent = siteData?.status === stepItem.key;

              // Não exibe etapa de domínio se o cliente não solicitou
              if (stepItem.key === 'DOMAIN_CONFIGURATION' && !recordedStep && !isCurrent) {
                return null;
              }

              return (
                <div
                  key={stepItem.key}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    isFinished
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900'
                      : 'bg-slate-50/50 border-slate-100 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {isFinished ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="text-sm font-semibold">{stepItem.label}</span>
                  </div>

                  {isFinished && (
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Concluído ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Card Especial de Instrução para Domínio .BR (Registro.br) */}
          {hasDomainConfig && (
            <div className="mt-6 p-6 bg-amber-50/80 rounded-2xl border border-amber-200 text-slate-900 space-y-4 animate-fade-in">
              <div className="flex items-start space-x-3">
                <Globe className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-amber-950">
                    Instruções para ativar seu endereço no Registro.br
                  </h3>
                  <p className="text-xs text-amber-900 mt-1">
                    Seu endereço <strong>{domainStep.details?.domain}</strong> foi preparado para o seu novo site.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-amber-200 space-y-3">
                <div className="text-xs font-semibold text-slate-700">
                  Acesse sua conta no <a href="https://registro.br" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">Registro.br</a>, clique no seu domínio e substitua os servidores existentes por:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  <div className="p-2.5 bg-slate-900 text-amber-300 rounded-lg flex items-center justify-between">
                    <span>Master: <strong>{domainStep.details?.nameServers?.[0] || 'dina.ns.cloudflare.com'}</strong></span>
                  </div>
                  <div className="p-2.5 bg-slate-900 text-amber-300 rounded-lg flex items-center justify-between">
                    <span>Slave 1: <strong>{domainStep.details?.nameServers?.[1] || 'walt.ns.cloudflare.com'}</strong></span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Após salvar no Registro.br, a proteção de segurança e o seu novo site começarão a funcionar em poucos minutos.
                </p>
              </div>
            </div>
          )}

          {/* Tratamento de Erro e Botão de Reiniciar */}
          {siteData?.hasError && (
            <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200 text-red-950 space-y-4 animate-fade-in">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-red-900">Ocorreu uma instabilidade na criação</h3>
                  <p className="text-xs text-red-700 mt-1">
                    {siteData.lastError || 'Não foi possível concluir uma das etapas. Você pode tentar novamente com um clique.'}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-red-200/60 flex justify-end">
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await fetch('/api/provisioning/retry', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ siteId }),
                      });
                      if (res.ok) {
                        window.location.reload();
                      } else {
                        alert('Erro ao reiniciar.');
                        setLoading(false);
                      }
                    } catch {
                      alert('Erro ao conectar.');
                      setLoading(false);
                    }
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            </div>
          )}

          {/* Conclusão com Links e Ações */}
          {siteData?.completed && (
            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-4 animate-fade-in">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-base">Seu Site está 100% Ativo e Protegido</h3>
                  <p className="text-xs text-emerald-800">
                    Seu site já está no ar na internet e o seu painel de controle exclusivo está liberado para uso.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-200/60 flex flex-col sm:flex-row gap-3">
                <a
                  href={siteData.vercelUrl || `https://${siteData.slug}.vercel.app`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-900 text-white font-bold text-sm rounded-xl hover:bg-slate-800 shadow-md"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Ver Meu Site no Ar
                  <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
                </a>

                <a
                  href={`${siteData.vercelUrl || `https://${siteData.slug}.vercel.app`}/master`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-emerald-700 text-white font-bold text-sm rounded-xl hover:bg-emerald-800 shadow-md"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Acessar Painel de Controle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>

              {/* Banner de Conclusão do Registro de Domínio no Registro.br */}
              {domainToRegister && (
                <div className="mt-4 p-5 bg-white/90 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
                      Registro.br • Etapa Final
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Conclua o Registro de <span className="text-amber-700 font-mono underline">{domainToRegister.domain}</span>
                    </h4>
                    <p className="text-xs text-slate-600">
                      Uma nova aba foi aberta para você registrar este domínio no Registro.br. Se o navegador bloqueou, utilize o botão ao lado.
                    </p>
                  </div>
                  <a
                    href={domainToRegister.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <span>Registrar Domínio Agora</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
