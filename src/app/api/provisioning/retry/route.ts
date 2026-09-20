import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { startProvisioningPipeline } from '@/lib/provisioning/pipeline';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { generateDesignSpecs } from '@/lib/design-system/specs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { siteId } = body;

    if (!siteId) {
      return NextResponse.json({ error: 'siteId é obrigatório' }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: {
        voucher: true,
        onboardingSession: true,
        user: true,
      },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site não encontrado' }, { status: 404 });
    }

    // 1. Limpa histórico de jobs e steps anteriores para reiniciar limpo
    await prisma.provisioningStep.deleteMany({ where: { siteId: site.id } });
    await prisma.provisioningJob.deleteMany({ where: { siteId: site.id } });

    // 2. Reseta o status do site e do voucher
    await prisma.site.update({
      where: { id: site.id },
      data: {
        status: 'VALIDATING',
        lastError: null,
      },
    });

    const parsedData = site.profileData ? OnboardingDataSchema.safeParse(site.profileData) : null;
    if (!parsedData?.success) {
      return NextResponse.json({ error: 'Dados do perfil inválidos para reiniciar' }, { status: 400 });
    }

    const allSpecs = generateDesignSpecs(parsedData.data);
    const designSpec = allSpecs[site.designVariant as 'MODEL_A' | 'MODEL_B' | 'MODEL_C'] || allSpecs.MODEL_A;

    // 3. Reinicia o Pipeline Idempotente
    const { job } = await startProvisioningPipeline({
      userId: site.userId,
      voucherId: site.voucherId,
      onboardingSessionId: site.onboardingSessionId || '',
      data: parsedData.data,
      designSpec,
    });

    return NextResponse.json({
      success: true,
      siteId: site.id,
      jobId: job.id,
      message: 'Processo de provisionamento reiniciado com sucesso.',
    });
  } catch (error: any) {
    console.error('Retry provisioning error:', error);
    return NextResponse.json({ error: 'Erro ao reiniciar provisionamento: ' + error.message }, { status: 500 });
  }
}
