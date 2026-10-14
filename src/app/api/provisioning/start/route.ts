import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { startProvisioningPipeline } from '@/lib/provisioning/pipeline';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { generateDesignSpecs } from '@/lib/design-system/specs';
import { hashPassword, validatePasswordStrength } from '@/lib/security/crypto';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    // Rate Limiting: Máximo de 5 tentativas de provisionamento a cada 5 minutos por IP
    const limit = await checkRateLimit('provisioning_start', ip, 5, 300);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas de inicialização. Aguarde alguns instantes antes de tentar novamente.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 60) } }
      );
    }

    const body = await req.json();
    const { voucherCode, clientEmail, clientPassword, clientName, selectedVariant } = body;

    if (!voucherCode || !clientEmail || !clientPassword) {
      return NextResponse.json({ error: 'Dados incompletos para inicializar o site.' }, { status: 400 });
    }

    // Validação da complexidade da senha do cliente
    const passwordValidation = validatePasswordStrength(clientPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.error }, { status: 400 });
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

    const rawData = (session.data || {}) as Record<string, any>;
    const sessionData = {
      ...rawData,
      publicEmail: rawData.publicEmail?.trim() || clientEmail.trim().toLowerCase(),
      city: rawData.city?.trim() || 'São Paulo',
      state: rawData.state?.trim() || 'SP',
    };

    const parseResult = OnboardingDataSchema.safeParse(sessionData);
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
    const variant = (selectedVariant || session.selectedDesign || 'MODEL_A') as 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D';
    const allSpecs = generateDesignSpecs(parseResult.data);
    const designSpec = allSpecs[variant] || allSpecs.MODEL_A;

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
