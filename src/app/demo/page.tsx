'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  Ticket, 
  Sparkles,
  Settings,
  Globe,
  RefreshCw
} from 'lucide-react';
import { PRESET_PROFESSIONS } from '@/lib/design-system/profession-presets';

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<'site' | 'admin'>('site');
  const [nicho, setNicho] = useState<string>('barbearia');
  const [model, setModel] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D'>('MODEL_A');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const iframeSrc = `/api/demo?nicho=${nicho}&model=${model}&view=${viewMode}`;

  function refreshIframe() {
    setKey(prev => prev + 1);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* BARRA SUPERIOR DE CONTROLE DA DEMONSTRAÇÃO */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
        
        {/* Lado Esquerdo: Logo & Voltar */}
        <div className="flex items-center gap-3">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Voltar</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              SP
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight leading-tight block">
                Demonstração Interativa
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {viewMode === 'site' ? 'Visualização do Visitante' : 'Painel Master do Dono do Site'}
              </span>
            </div>
          </div>
        </div>

        {/* Centro: Controles de Modo (Site vs Admin), Nicho, Modelo e Viewport */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Seletor de Modo: Site Público vs Painel Administrativo */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => { setViewMode('site'); refreshIframe(); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs flex items-center gap-1.5 ${
                viewMode === 'site' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Site Público</span>
            </button>
            <button
              type="button"
              onClick={() => { setViewMode('admin'); refreshIframe(); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs flex items-center gap-1.5 ${
                viewMode === 'admin' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Área Adm (Painel Master)</span>
            </button>
          </div>

          {/* Seletor de Nicho / Profissão */}
          <div className="flex items-center bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[10px] text-slate-400 uppercase font-bold hidden sm:inline">Profissão / Nicho:</span>
            <select
              value={nicho}
              onChange={(e) => { setNicho(e.target.value); refreshIframe(); }}
              className="bg-slate-900 text-slate-100 font-semibold rounded-lg px-2.5 py-1 text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer max-w-[220px] sm:max-w-[280px]"
            >
              <optgroup label="⭐ Micro-SaaS & CRM Integrado">
                <option value="barbearia">💈 Barbearia / Barber Shop (Agendamento & CRM)</option>
                <option value="clinica">🩺 Clínica Médica / Consultório (Prontuário & Lembretes)</option>
                <option value="imobiliaria">🏡 Imobiliária / Corretores (Funil de Vendas Kanban)</option>
                <option value="academia">🏋️ Academia / Studio Fitness (Cobrança Automática PIX)</option>
                <option value="petshop">🐾 Pet Shop / Banho & Tosa (Esteira Operacional)</option>
              </optgroup>
              <optgroup label="── Modelos Clássicos ──">
                <option value="odonto">Odontologia (Clínica Sorriso Real)</option>
                <option value="oficina">Auto Mecânica (Júnior Auto Center)</option>
                <option value="boutique">Moda & Ateliê (Bella Donna)</option>
              </optgroup>
              {Array.from(new Set(PRESET_PROFESSIONS.filter(p => !['barbearia', 'clinica', 'imobiliaria', 'academia', 'petshop'].includes(p.id)).map((p) => p.category))).map((cat) => (
                <optgroup key={cat} label={`── ${cat} ──`}>
                  {PRESET_PROFESSIONS.filter((p) => p.category === cat && !['barbearia', 'clinica', 'imobiliaria', 'academia', 'petshop'].includes(p.id)).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Seletor de Modelo de Design (Apenas no Modo Site) */}
          {viewMode === 'site' && (
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold px-2 hidden md:inline">Estilo:</span>
              <button
                type="button"
                onClick={() => { setModel('MODEL_A'); refreshIframe(); }}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                  model === 'MODEL_A' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Serene Haven"
              >
                Modelo A
              </button>
              <button
                type="button"
                onClick={() => { setModel('MODEL_B'); refreshIframe(); }}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                  model === 'MODEL_B' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Midnight Luminescence"
              >
                Modelo B
              </button>
              <button
                type="button"
                onClick={() => { setModel('MODEL_C'); refreshIframe(); }}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                  model === 'MODEL_C' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Atelier Editorial"
              >
                Modelo C
              </button>
              <button
                type="button"
                onClick={() => { setModel('MODEL_D'); refreshIframe(); }}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                  model === 'MODEL_D' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Modern Bento Pulse"
              >
                Modelo D
              </button>
            </div>
          )}

          {/* Alternador Desktop / Mobile */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg transition ${
                viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
              }`}
              title="Visualização Computador"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg transition ${
                viewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
              }`}
              title="Visualização Celular"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lado Direito: Ações */}
        <div className="flex items-center gap-2">
          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5"
            title="Abrir em aba inteira"
          >
            <span>Tela Cheia</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/#solicitar-voucher"
            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Pedir Voucher Grátis</span>
          </Link>
        </div>
      </header>

      {/* ÁREA DE EXIBIÇÃO DO SITE DEMO */}
      <main className="flex-1 bg-slate-900/60 p-3 sm:p-6 flex flex-col items-center justify-center overflow-auto">
        {viewMode === 'admin' && (
          <div className="w-full max-w-5xl mb-3 px-4 py-2 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-xs text-indigo-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-400 shrink-0" />
              <span><strong>Área Administrativa (Painel Master):</strong> É aqui que o cliente edita tudo sem programador: ativa o catálogo de produtos, configura perguntas frequentes, bio links, seções e fotos!</span>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('site')}
              className="text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-lg shrink-0 ml-3"
            >
              Ver Site Público ↗
            </button>
          </div>
        )}

        <div
          className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-white ${
            viewport === 'mobile'
              ? 'w-[390px] h-[780px] max-h-[86vh] border-4 border-slate-800 shadow-slate-950/80'
              : 'w-full h-[calc(100vh-100px)]'
          }`}
        >
          <iframe
            key={`${viewMode}-${nicho}-${model}-${key}`}
            src={iframeSrc}
            title={viewMode === 'site' ? 'Demonstração do Site Público' : 'Demonstração do Painel Master'}
            className="w-full h-full border-0"
          />
        </div>
      </main>
    </div>
  );
}
