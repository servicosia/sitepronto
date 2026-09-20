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
    { key: 'VALIDATING', label: 'Validação e Análise de Dados' },
    { key: 'GENERATING_CONTENT', label: 'Síntese de Conteúdo & DesignSpec' },
    { key: 'CREATING_GITHUB', label: 'Criação do Repositório GitHub Isolado' },
    { key: 'CREATING_NEON', label: 'Provisionamento do Banco Neon PostgreSQL' },
    { key: 'GENERATING_CODE', label: 'Geração do Código Next.js e Painel /master' },
    { key: 'COMMITTING_CODE', label: 'Envio Seguro do Código ao GitHub' },
    { key: 'CREATING_VERCEL', label: 'Criação do Projeto e Deploy na Vercel' },
    { key: 'TESTING', label: 'Health Checks e Testes de Integridade' },
  ];

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
              {siteData?.completed ? '🎉 Seu site está publicado e pronto!' : 'Fabricando seu Site Profissional...'}
            </h1>
            <p className="text-slate-600 text-sm mt-2">
              {siteData?.completed 
                ? 'Toda a infraestrutura isolada foi provisionada com sucesso.' 
                : 'Estamos configurando GitHub, Neon e Vercel automaticamente.'}
            </p>
          </div>

          {/* Lista de Etapas em Tempo Real */}
          <div className="space-y-3 mb-8">
            {pipelineSteps.map((stepItem, index) => {
              const recordedStep = siteData?.steps?.find((s: StepInfo) => s.step === stepItem.key);
              const isFinished = recordedStep?.status === 'SUCCESS' || siteData?.completed;
              const isCurrent = siteData?.status === stepItem.key;

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

          {/* Tratamento de Erro e Botão de Reiniciar */}
          {siteData?.hasError && (
            <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-200 text-red-950 space-y-4 animate-fade-in">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-red-900">Ocorreu uma falha no provisionamento</h3>
                  <p className="text-xs text-red-700 mt-1">
                    {siteData.lastError || 'Não foi possível concluir uma das etapas da infraestrutura.'}
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
                  Reiniciar e Tentar Novamente
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
                  <h3 className="font-bold text-base">Infraestrutura 100% Isolada e Ativa</h3>
                  <p className="text-xs text-emerald-800">
                    Seu site possui repositório próprio no GitHub, banco Neon dedicado e deploy na Vercel.
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
                  Ver Meu Site Público
                  <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-70" />
                </a>

                <a
                  href={`${siteData.vercelUrl || `https://${siteData.slug}.vercel.app`}/master`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-emerald-700 text-white font-bold text-sm rounded-xl hover:bg-emerald-800 shadow-md"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Acessar Painel /master
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
