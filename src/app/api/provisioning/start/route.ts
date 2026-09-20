import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { startProvisioningPipeline } from '@/lib/provisioning/pipeline';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { generateDesignSpecs } from '@/lib/design-system/specs';
import { hashPassword } from '@/lib/security/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { voucherCode, clientEmail, clientPassword, clientName, selectedVariant } = body;

    if (!voucherCode || !clientEmail || !clientPassword) {
      return NextResponse.json({ error: 'Dados incompletos para inicializar o site.' }, { status: 400 });
    }

    // Validação do Voucher
    const voucher = await prisma.voucher.findFirst({
      where: { code: voucherCode.trim().toUpperCase() },
      include: { onboardingSessions: true },
    });

    if (!voucher || voucher.status === 'COMPLETED' || voucher.status === 'REVOKED') {
      return NextResponse.json({ error: 'Voucher inválido ou já utilizado.' }, { status: 400 });
    }

    const session = voucher.onboardingSessions[0];
    if (!session || !session.data) {
      return NextResponse.json({ error: 'Sessão de onboarding não encontrada.' }, { status: 400 });
    }

    const parseResult = OnboardingDataSchema.safeParse(session.data);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(' | ');
      return NextResponse.json({ error: `Dados do onboarding incompletos ou inválidos: ${errorMsg}` }, { status: 400 });
    }

    // Cria ou atualiza conta do usuário
    let user = await prisma.user.findUnique({ where: { email: clientEmail.toLowerCase() } });
    if (!user) {
      const passwordHash = await hashPassword(clientPassword);
      user = await prisma.user.create({
        data: {
          email: clientEmail.toLowerCase(),
          name: clientName || parseResult.data.fullName,
          passwordHash,
          role: 'CLIENT',
        },
      });
    }

    // Obtém DesignSpec correspondente à escolha do cliente
    const variant = (selectedVariant || session.selectedDesign || 'MODEL_A') as 'MODEL_A' | 'MODEL_B' | 'MODEL_C';
    const allSpecs = generateDesignSpecs(parseResult.data);
    const designSpec = allSpecs[variant];

    // Inicia Pipeline Automatizado
    const { site, job } = await startProvisioningPipeline({
      userId: user.id,
      voucherId: voucher.id,
      onboardingSessionId: session.id,
      data: parseResult.data,
      designSpec,
    });

    return NextResponse.json({
      success: true,
      siteId: site.id,
      jobId: job.id,
      slug: site.slug,
    });
  } catch (error: any) {
    console.error('Provisioning route error:', error);
    return NextResponse.json({ error: 'Falha ao iniciar provisionamento: ' + error.message }, { status: 500 });
  }
}
