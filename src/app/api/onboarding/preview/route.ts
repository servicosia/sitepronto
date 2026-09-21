import { NextRequest, NextResponse } from 'next/server';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { getDesignSpecsWithProvider } from '@/lib/providers/design/stitch';
import { renderCompleteSiteHtml } from '@/lib/design-system/template-renderer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = OnboardingDataSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados incompletos para pré-visualização.',
          details: parseResult.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    const data = parseResult.data;
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
