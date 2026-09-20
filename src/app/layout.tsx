import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SitePronto | Plataforma Automatizada de Criação de Sites',
  description: 'Crie seu site institucional profissional completo e independente com seu voucher.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
