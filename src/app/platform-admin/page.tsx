'use client';

import { useEffect, useState } from 'react';
import { 
  Ticket, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Plus, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  ExternalLink,
  Layers
} from 'lucide-react';
import Link from 'next/link';

export default function PlatformAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creatingVoucher, setCreatingVoucher] = useState(false);
  
  // Novo voucher
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/platform-admin');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreateVoucher(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/platform-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, description }),
      });
      if (res.ok) {
        setClientName('');
        setClientEmail('');
        setDescription('');
        setCreatingVoucher(false);
        loadData();
      }
    } catch (err) {
      alert('Erro ao criar voucher');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              SP
            </div>
            <span className="font-bold text-lg tracking-tight">SitePronto Platform Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-slate-300 hover:text-white">
              Voltar ao Site
            </Link>
            <button
              onClick={loadData}
              className="p-2 text-slate-400 hover:text-white rounded-lg"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Status de Integrações de Infraestrutura */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">GitHub</div>
              <div className="text-sm font-bold text-slate-800">{data?.integrations?.github?.scope || 'Conectado'}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Vercel</div>
              <div className="text-sm font-bold text-slate-800">{data?.integrations?.vercel?.scope || 'Conectado'}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Neon PostgreSQL</div>
              <div className="text-sm font-bold text-slate-800">Conectado</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">Resend Email</div>
              <div className="text-sm font-bold text-slate-800">Configurado</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs text-slate-500 font-semibold">AI / DesignSpec</div>
              <div className="text-sm font-bold text-slate-800">Ativo</div>
            </div>
          </div>
        </div>

        {/* Métricas Gerais */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Emitidos</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalVouchers || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vouchers Ativos / Livres</div>
            <div className="text-3xl font-extrabold text-emerald-600 mt-2">{data?.metrics?.vouchersIssued || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sites Criados</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{data?.metrics?.totalSites || 0}</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sites Concluídos</div>
            <div className="text-3xl font-extrabold text-indigo-600 mt-2">{data?.metrics?.activeSites || 0}</div>
          </div>
        </div>

        {/* Vouchers Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Gerenciamento de Vouchers</h2>
              <p className="text-xs text-slate-500">Emita vouchers de alta entropia para seus clientes iniciarem seus sites.</p>
            </div>
            <button
              onClick={() => setCreatingVoucher(!creatingVoucher)}
              className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Emitir Novo Voucher
            </button>
          </div>

          {creatingVoucher && (
            <form onSubmit={handleCreateVoucher} className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Nome do Cliente</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Dr. Roberto Alencar"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">E-mail do Cliente</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="cliente@email.com"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">Descrição / Nota</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Plano Standard Pro"
                    className="mt-1 block w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setCreatingVoucher(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Gerar Voucher
                </button>
              </div>
            </form>
          )}

          {/* Tabela de Vouchers */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Código Voucher</th>
                  <th className="py-3 px-4">Cliente / Destinatário</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Link de Resgate</th>
                  <th className="py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.vouchers?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Nenhum voucher emitido ainda.
                    </td>
                  </tr>
                ) : (
                  data?.vouchers?.map((v: any) => (
                    <tr key={v.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{v.code}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{v.clientName || 'Geral'}</div>
                        <div className="text-xs text-slate-400">{v.clientEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          v.status === 'ISSUED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : v.status === 'COMPLETED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs font-mono">
                        <Link 
                          href={`/iniciar`} 
                          className="text-indigo-600 hover:underline flex items-center"
                        >
                          /iniciar <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">
                        {new Date(v.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sites Provisionados */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Sites Criados na Fábrica</h2>
          <p className="text-xs text-slate-500 mb-6">Lista de sites provisionados e seus repositórios / URLs isoladas.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nome do Site</th>
                  <th className="py-3 px-4">Profissão</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">GitHub</th>
                  <th className="py-3 px-4">Deploy Vercel</th>
                  <th className="py-3 px-4">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.sites?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Nenhum site criado ainda.
                    </td>
                  </tr>
                ) : (
                  data?.sites?.map((s: any) => (
                    <tr key={s.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3 px-4 text-xs">{s.profession}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {s.githubRepoUrl ? (
                          <a href={s.githubRepoUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                            Ver Repo
                          </a>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {s.vercelUrl ? (
                          <a href={s.vercelUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-semibold hover:underline">
                            Ver Site
                          </a>
                        ) : '-'}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <Link href={`/progresso/${s.id}`} className="text-slate-900 font-semibold hover:underline">
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
