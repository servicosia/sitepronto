import { NextRequest, NextResponse } from 'next/server';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { getDesignSpecsWithProvider } from '@/lib/providers/design/stitch';
import { renderCompleteSiteHtml } from '@/lib/design-system/template-renderer';
import { renderMasterDashboardHtml } from '@/lib/design-system/master-renderer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nicho = searchParams.get('nicho') || 'odonto';
    const model = (searchParams.get('model') || 'MODEL_A') as 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D';
    const view = searchParams.get('view') || 'site'; // 'site' ou 'admin'

    let demoData: any;

    if (nicho === 'oficina') {
      demoData = {
        fullName: 'Júnior Auto Center',
        professionalName: 'Júnior Auto Center Especializado',
        companyName: 'Júnior Auto Mecânica',
        profession: 'Centro Automotivo & Mecânica de Precisão',
        professionType: 'outra',
        activityType: 'empresa',
        hasProfessionalCouncil: false,
        mainSpecialty: 'Injeção Eletrônica, Freios e Câmbio Automático',
        otherSpecialties: ['Revisão Preventiva', 'Suspensão e Alinhamento 3D', 'Ar-Condicionado Automotivo'],
        professionalSummary: 'Mais de 15 anos de excelência em manutenção automotiva com diagnóstico computadorizado e garantia total em peças e serviços.',
        city: 'Curitiba',
        state: 'PR',
        attendanceType: 'presencial',
        whatsapp: '(41) 98888-7777',
        publicEmail: 'contato@juniorautocenter.com.br',
        businessHours: 'Segunda a Sexta das 08h às 18h | Sábado das 08h às 12h',
        primaryColor: '#0f172a',
        secondaryColor: '#2563eb',
        accentColor: '#f59e0b',
        visualStyle: 'moderno',
        themePreference: 'escuro',
        hasBrandIdentity: false,
        showFullAddress: true,
        street: 'Rua das Oficinas',
        number: '450',
        neighborhood: 'Portão',
        services: [
          {
            title: 'Diagnóstico Computadorizado',
            shortDescription: 'Scanner automotivo de última geração para identificar falhas com máxima precisão e rapidez.',
            icon: 'Activity',
            ctaText: 'Agendar Diagnóstico',
            active: true,
            order: 1,
          },
          {
            title: 'Revisão Preventiva Completa',
            shortDescription: 'Checagem rigorosa de mais de 40 itens de segurança: freios, suspensão, fluidos e correias.',
            icon: 'Shield',
            ctaText: 'Pedir Orçamento',
            active: true,
            order: 2,
          },
          {
            title: 'Troca de Óleo e Filtros',
            shortDescription: 'Lubrificantes homologados pelas principais montadoras com troca ágil e sem filas.',
            icon: 'Tool',
            ctaText: 'Falar no WhatsApp',
            active: true,
            order: 3,
          },
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
          catalogo: true,
          faq: true,
          planos: false,
          cases: true,
          biolinks: false,
          comunicado: false,
          parceiros: true,
          simulador: true,
        },
      };
    } else if (nicho === 'boutique') {
      demoData = {
        fullName: 'Bella Donna Moda & Ateliê',
        professionalName: 'Bella Donna Moda Feminina',
        companyName: 'Bella Donna Concept',
        profession: 'Moda Feminina, Alfaiataria & Consultoria de Estilo',
        professionType: 'outra',
        activityType: 'empresa',
        hasProfessionalCouncil: false,
        mainSpecialty: 'Peças Exclusivas, Tecidos Nobres e Alfaiataria Contemporânea',
        otherSpecialties: ['Consultoria de Imagem', 'Coleção Cápsula', 'Ajustes de Alta Costura'],
        professionalSummary: 'Elegância e autenticidade em cada detalhe. Curadoria exclusiva de peças que valorizam sua presença e bem-estar.',
        city: 'Rio de Janeiro',
        state: 'RJ',
        attendanceType: 'hibrido',
        whatsapp: '(21) 97777-6666',
        publicEmail: 'atendimento@belladonnaatelie.com.br',
        businessHours: 'Segunda a Sábado, das 10h às 20h',
        primaryColor: '#831843',
        secondaryColor: '#be185d',
        accentColor: '#f43f5e',
        visualStyle: 'elegante',
        themePreference: 'claro',
        hasBrandIdentity: false,
        showFullAddress: true,
        street: 'Av. das Américas',
        number: '3000',
        neighborhood: 'Barra da Tijuca',
        services: [
          {
            title: 'Coleção Exclusiva de Lançamento',
            shortDescription: 'Linhas autorais desenvolvidas com tecidos premium e acabamento impecável de alfaiataria.',
            icon: 'Sparkles',
            ctaText: 'Ver Coleção',
            active: true,
            order: 1,
          },
          {
            title: 'Consultoria de Estilo Personalizada',
            shortDescription: 'Atendimento com personal stylist para montagem de looks para eventos corporativos e sociais.',
            icon: 'Heart',
            ctaText: 'Agendar Sessão',
            active: true,
            order: 2,
          },
          {
            title: 'Envio Rápido para Todo o Brasil',
            shortDescription: 'Embalagem especial de presente com rastreamento pontual e suporte via WhatsApp.',
            icon: 'ShoppingBag',
            ctaText: 'Fazer Pedido',
            active: true,
            order: 3,
          },
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
          catalogo: true,
          faq: true,
          planos: false,
          cases: false,
          biolinks: false,
          comunicado: true,
          parceiros: true,
          simulador: false,
        },
      };
    } else {
      // Default: Odontologia / Saúde
      demoData = {
        fullName: 'Dr. Lucas Mendes',
        professionalName: 'Dr. Lucas Mendes - Odontologia Integrada',
        companyName: 'Clínica Sorriso Real',
        profession: 'Cirurgião-Dentista & Especialista em Estética Dental',
        professionType: 'odontologia',
        activityType: 'autonomo',
        hasProfessionalCouncil: true,
        councilType: 'CRO/SP',
        councilNumber: '112.430',
        mainSpecialty: 'Implantes Guiados, Lentes em Resina e Alinhadores Invisíveis',
        otherSpecialties: ['Harmonização Orofacial', 'Clareamento Dental a Laser', 'Prevenção e Profilaxia'],
        professionalSummary: 'Tecnologia odontológica avançada com atendimento humanizado, sem dor e focado na transformação natural do seu sorriso.',
        city: 'São Paulo',
        state: 'SP',
        attendanceType: 'presencial',
        whatsapp: '(11) 99876-5432',
        publicEmail: 'contato@clinicasorrisoreal.com.br',
        businessHours: 'Segunda a Sexta, das 08h às 19h | Sábado das 08h às 13h',
        primaryColor: '#0f172a',
        secondaryColor: '#0284c7',
        accentColor: '#10b981',
        visualStyle: 'moderno',
        themePreference: 'claro',
        hasBrandIdentity: false,
        showFullAddress: true,
        street: 'Av. Paulista',
        number: '1200',
        complement: 'Conjunto 142',
        neighborhood: 'Bela Vista',
        services: [
          {
            title: 'Implantes Dentários Guiados por Computador',
            shortDescription: 'Procedimento preciso, seguro e com pós-operatório rápido e confortável.',
            icon: 'Shield',
            ctaText: 'Agendar Avaliação',
            active: true,
            order: 1,
          },
          {
            title: 'Lentes de Contato e Facetas em Resina',
            shortDescription: 'Design digital do sorriso para corrigir formato, tonalidade e harmonia dos dentes.',
            icon: 'Sparkles',
            ctaText: 'Conhecer Tratamento',
            active: true,
            order: 2,
          },
          {
            title: 'Alinhadores Invisíveis Transparentes',
            shortDescription: 'Ortodontia moderna e discreta, sem braquetes metálicos e com remoção prática para refeições.',
            icon: 'Activity',
            ctaText: 'Falar no WhatsApp',
            active: true,
            order: 3,
          },
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
          catalogo: true,
          faq: true,
          planos: false,
          cases: true,
          biolinks: false,
          comunicado: true,
          parceiros: true,
          simulador: true,
        },
      };
    }

    const parseResult = OnboardingDataSchema.safeParse(demoData);
    const validData = parseResult.success ? parseResult.data : (demoData as any);
    
    let html: string;
    if (view === 'admin' || view === 'master') {
      html = renderMasterDashboardHtml(validData, 'demo-preview-site');
    } else {
      const { specs } = await getDesignSpecsWithProvider(validData);
      const chosenSpec = specs[model] || specs.MODEL_A;
      html = renderCompleteSiteHtml(validData, chosenSpec);
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Frame-Options': 'SAMEORIGIN',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('[API Demo] Erro ao renderizar site de demonstração:', error);
    return new NextResponse(`<h1>Erro ao carregar demonstração</h1><p>${error.message}</p>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
