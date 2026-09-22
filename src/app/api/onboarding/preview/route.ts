import { NextRequest, NextResponse } from 'next/server';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { getDesignSpecsWithProvider } from '@/lib/providers/design/stitch';
import { renderCompleteSiteHtml } from '@/lib/design-system/template-renderer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Defaults ricos e consistentes para garantir preview visual completo
    // mesmo quando o usuário ainda está preenchendo etapas intermediárias
    const defaultData = {
      fullName: 'Dra. Ana Carolina Silva',
      professionalName: 'Dra. Ana Carolina Silva',
      companyName: '',
      profession: 'Fisioterapeuta e Terapeuta Manual',
      professionType: 'fisioterapia' as const,
      activityType: 'autonomo' as const,
      hasProfessionalCouncil: true,
      councilType: 'CREFITO',
      councilNumber: '123456-F',
      mainSpecialty: 'Reabilitação Funcional & Coluna',
      otherSpecialties: ['Fisioterapia Traumato-Ortopédica', 'Reeducação Postural'],
      professionalSummary: 'Atendimento individualizado e resolutivo focado em recuperação funcional, mobilidade e alívio de dores crônicas.',
      city: 'São Paulo',
      state: 'SP',
      attendanceType: 'hibrido' as const,
      whatsapp: '(11) 99999-8888',
      publicEmail: 'contato@seusite.com.br',
      businessHours: 'Segunda a Sexta, das 08h às 19h',
      primaryColor: '#0f172a',
      secondaryColor: '#3b82f6',
      accentColor: '#10b981',
      visualStyle: 'moderno' as const,
      themePreference: 'claro' as const,
      hasBrandIdentity: false,
      showFullAddress: false,
      education: [],
      certifications: [],
      differentials: [],
      hasCustomDomain: false,
      registerDomainOnCompletion: false,
      services: [
        {
          title: 'Fisioterapia Traumato-Ortopédica',
          shortDescription: 'Tratamento especializado para recuperação de lesões, alívio de dor e retorno às atividades diárias.',
          icon: 'Activity',
          ctaText: 'Agendar Consulta',
          active: true,
          order: 1,
        },
        {
          title: 'Reeducação Postural & Mobilidade',
          shortDescription: 'Alinhamento biomecânico, fortalecimento e prevenção de sobrecargas musculares e articulares.',
          icon: 'Target',
          ctaText: 'Solicitar Avaliação',
          active: true,
          order: 2,
        },
        {
          title: 'Terapia Manual Avançada',
          shortDescription: 'Técnicas manuais para relaxamento muscular profundo, liberação miofascial e restauração do movimento.',
          icon: 'Shield',
          ctaText: 'Falar no WhatsApp',
          active: true,
          order: 3,
        }
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
      },
      gallery: [],
      testimonials: [],
    };

    const mergedData = {
      ...defaultData,
      ...body,
      // Se campos de texto vierem vazios, usa os valores padrão para preview visual rico
      fullName: body.fullName?.trim() || defaultData.fullName,
      professionalName: body.professionalName?.trim() || body.fullName?.trim() || defaultData.professionalName,
      profession: body.profession?.trim() || defaultData.profession,
      mainSpecialty: body.mainSpecialty?.trim() || defaultData.mainSpecialty,
      professionalSummary: body.professionalSummary?.trim() || defaultData.professionalSummary,
      city: body.city?.trim() || defaultData.city,
      state: body.state?.trim() || defaultData.state,
      whatsapp: body.whatsapp?.trim() && body.whatsapp.replace(/\D/g, '').length >= 10 ? body.whatsapp : defaultData.whatsapp,
      publicEmail: body.publicEmail?.trim() && body.publicEmail.includes('@') ? body.publicEmail : defaultData.publicEmail,
      primaryColor: body.primaryColor || defaultData.primaryColor,
      secondaryColor: body.secondaryColor || defaultData.secondaryColor,
      accentColor: body.accentColor || defaultData.accentColor,
      services: (Array.isArray(body.services) && body.services.length > 0 && body.services.some((s: any) => s.title)) 
        ? body.services.filter((s: any) => s.title && s.shortDescription) 
        : defaultData.services,
      sectionsConfig: body.sectionsConfig || defaultData.sectionsConfig,
      gallery: Array.isArray(body.gallery) && body.gallery.length > 0 ? body.gallery : defaultData.gallery,
      testimonials: Array.isArray(body.testimonials) && body.testimonials.length > 0 ? body.testimonials : defaultData.testimonials,
    };

    const parseResult = OnboardingDataSchema.safeParse(mergedData);
    const data = parseResult.success ? parseResult.data : (mergedData as any);
    const { providerUsed, specs } = await getDesignSpecsWithProvider(data);

    // Renderiza o HTML completo para cada uma das 4 variantes
    const previews = {
      MODEL_A: {
        title: 'Modelo A — Serene Haven (Google Stitch)',
        description: 'Design orgânico com paleta botânica e mineral (verde sábio/terracota), tons quentes de linho e tipografia Playfair Display.',
        spec: specs.MODEL_A,
        html: renderCompleteSiteHtml(data, specs.MODEL_A),
      },
      MODEL_B: {
        title: 'Modelo B — Midnight Luminescence',
        description: 'Estética noturna refinada com superfícies obsidiana, bordas bioluminescentes sutis e alto contraste.',
        spec: specs.MODEL_B,
        html: renderCompleteSiteHtml(data, specs.MODEL_B),
      },
      MODEL_C: {
        title: 'Modelo C — Atelier Editorial',
        description: 'Design editorial e nobre com tipografia clássica, espaçamento generoso e elegância executiva de alta autoridade.',
        spec: specs.MODEL_C,
        html: renderCompleteSiteHtml(data, specs.MODEL_C),
      },
      MODEL_D: {
        title: 'Modelo D — Modern Bento Pulse',
        description: 'Estrutura moderna estilo Bento Grid, hero dinâmico focado em conversão e agendamento ágil.',
        spec: specs.MODEL_D,
        html: renderCompleteSiteHtml(data, specs.MODEL_D),
      },
    };

    return NextResponse.json({
      success: true,
      providerUsed,
      previews,
    });
  } catch (error: any) {
    console.error('[API Preview] Erro ao gerar pré-visualização:', error);
    return NextResponse.json(
      { error: 'Falha interna ao sintetizar propostas de UI.', message: error.message },
      { status: 500 }
    );
  }
}
