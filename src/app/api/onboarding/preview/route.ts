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

    // Renderiza o HTML completo para cada variante
    const previews = {
      MODEL_A: {
        title: 'Modelo A — Institucional Confiável',
        description: 'Estrutura clássica, foco em autoridade e alta legibilidade com todas as seções e formulário.',
        spec: specs.MODEL_A,
        html: renderCompleteSiteHtml(data, specs.MODEL_A),
      },
      MODEL_B: {
        title: 'Modelo B — Moderno Premium',
        description: 'Forte impacto visual, tipografia contemporânea e cartões de serviços dinâmicos.',
        spec: specs.MODEL_B,
        html: renderCompleteSiteHtml(data, specs.MODEL_B),
      },
      MODEL_C: {
        title: 'Modelo C — Minimalista Editorial',
        description: 'Design editorial e sóbrio com tipografia serifada, espaçamento generoso e elegância executiva.',
        spec: specs.MODEL_C,
        html: renderCompleteSiteHtml(data, specs.MODEL_C),
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
