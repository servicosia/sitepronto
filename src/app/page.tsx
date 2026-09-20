import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, Globe, Cpu, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
              SP
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">SitePronto</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/platform-admin"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Painel Admin
            </Link>
            <Link
              href="/iniciar"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              Resgatar Voucher <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-8">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fábrica Automatizada de Sites Profissionais</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Seu site profissional publicado e administrável em <span className="text-emerald-600">minutos</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Com seu voucher, informe suas especialidades, escolha entre 3 propostas de design exclusivas e nossa infraestrutura automatizada cria seu site independente com GitHub, Neon e Vercel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/iniciar"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Tenho um Voucher — Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/platform-admin"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Acessar Gestão da Plataforma
            </Link>
          </div>
        </div>
      </section>

      {/* Diferenciais de Isolamento */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Isolamento Completo</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Cada site possui seu próprio repositório GitHub, banco de dados Neon PostgreSQL exclusivo e projeto Vercel próprio.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Painel /master Próprio</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Edite serviços, artigos, contatos e dados com salvamento automático sem precisar entender nada de programação ou nuvem.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Regra de Veracidade</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Textos otimizados com fidelidade absoluta aos seus dados reais e conformidade com conselhos de classe (OAB, CRM, CRP, CREA).
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SitePronto. Plataforma de Produção SaaS.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacidade" className="hover:text-slate-900">Privacidade & LGPD</Link>
            <Link href="/platform-admin" className="hover:text-slate-900">Administração</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
