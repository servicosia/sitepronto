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
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

export default function DemoPage() {
  const [nicho, setNicho] = useState<'odonto' | 'oficina' | 'boutique'>('odonto');
  const [model, setModel] = useState<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D'>('MODEL_A');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [key, setKey] = useState(0);

  const iframeSrc = `/api/demo?nicho=${nicho}&model=${model}`;

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
                Site de Exemplo Real Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Centro: Controles de Nicho, Modelo e Viewport */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Seletor de Nicho */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold px-2 hidden sm:inline">Nicho:</span>
            <button
              type="button"
              onClick={() => { setNicho('odonto'); refreshIframe(); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                nicho === 'odonto' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Odontologia
            </button>
            <button
              type="button"
              onClick={() => { setNicho('oficina'); refreshIframe(); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                nicho === 'oficina' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto Mecânica
            </button>
            <button
              type="button"
              onClick={() => { setNicho('boutique'); refreshIframe(); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                nicho === 'boutique' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Moda & Ateliê
            </button>
          </div>

          {/* Seletor de Modelo de Design */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold px-2 hidden md:inline">Estilo:</span>
            <button
              type="button"
              onClick={() => { setModel('MODEL_A'); refreshIframe(); }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                model === 'MODEL_A' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Serene Haven (Orgânico / Harmônico)"
            >
              Modelo A
            </button>
            <button
              type="button"
              onClick={() => { setModel('MODEL_B'); refreshIframe(); }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                model === 'MODEL_B' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Midnight Luminescence (Modo Escuro Premium)"
            >
              Modelo B
            </button>
            <button
              type="button"
              onClick={() => { setModel('MODEL_C'); refreshIframe(); }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                model === 'MODEL_C' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Atelier Editorial (Clássico / Corporativo)"
            >
              Modelo C
            </button>
            <button
              type="button"
              onClick={() => { setModel('MODEL_D'); refreshIframe(); }}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition text-xs ${
                model === 'MODEL_D' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Modern Bento Pulse (SaaS / Conversão)"
            >
              Modelo D
            </button>
          </div>

          {/* Alternador Desktop / Mobile */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-lg transition ${
                viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
              }`}
              title="Visualização Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-lg transition ${
                viewport === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'
              }`}
              title="Visualização Celular / Mobile"
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
            title="Abrir site de demonstração em aba inteira"
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
      <main className="flex-1 bg-slate-900/60 p-3 sm:p-6 flex items-center justify-center overflow-auto">
        <div
          className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-white ${
            viewport === 'mobile'
              ? 'w-[390px] h-[780px] max-h-[88vh] border-4 border-slate-800 shadow-slate-950/80'
              : 'w-full h-[calc(100vh-80px)]'
          }`}
        >
          <iframe
            key={`${nicho}-${model}-${key}`}
            src={iframeSrc}
            title="Demonstração do Site Pronto"
            className="w-full h-full border-0"
          />
        </div>
      </main>
    </div>
  );
}
