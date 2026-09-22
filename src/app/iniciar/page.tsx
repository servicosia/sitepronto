'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Ticket, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function IniciarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
      </div>
    }>
      <IniciarContent />
    </Suspense>
  );
}

function IniciarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialVoucher = searchParams.get('voucher') || searchParams.get('code') || '';

  const [code, setCode] = useState(initialVoucher.toUpperCase());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function validateAndRedirect(voucherCode: string) {
    if (!voucherCode.trim()) {
      setError('Por favor, digite o código do seu voucher.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/vouchers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: voucherCode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Código de voucher inválido.');
        setLoading(false);
        return;
      }

      // Redireciona para o Onboarding com o voucher validado
      router.push(`/onboarding?voucher=${encodeURIComponent(data.voucher.code)}`);
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  }

  // Se o código de voucher veio pela URL (ex: /iniciar?voucher=SP-XXXX), auto-valida
  useEffect(() => {
    if (initialVoucher) {
      const clean = initialVoucher.trim().toUpperCase();
      setCode(clean);
      validateAndRedirect(clean);
    }
  }, [initialVoucher]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateAndRedirect(code);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-md">
            SP
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">SitePronto</span>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Resgate seu Voucher
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Insira o código de ativação fornecido para iniciar a criação do seu site.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-200 sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="voucher" className="block text-sm font-semibold text-slate-700">
                Código do Voucher
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ticket className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="voucher"
                  name="voucher"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="EX: SP-9F8A-7B6C-4D2E"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl text-slate-900 font-mono font-semibold tracking-wider placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 sm:text-base uppercase"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Validando Voucher...
                  </>
                ) : (
                  <>
                    Continuar para o Onboarding <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Precisa de um voucher? Entre em contato com a administração da sua organização.
          </div>
        </div>
      </div>
    </div>
  );
}
