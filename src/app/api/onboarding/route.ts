import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { getDesignSpecsWithProvider } from '@/lib/providers/design/stitch';
import { validateVoucher } from '@/lib/vouchers/service';

// Salvar / atualizar sessão de onboarding (Autosave com debounce no frontend)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { voucherCode, step, data, selectedDesign } = body;

    if (!voucherCode) {
      return NextResponse.json({ error: 'Código de voucher é obrigatório.' }, { status: 400 });
    }

    const validation = await validateVoucher(voucherCode);
    if (!validation.valid || !validation.voucher) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const voucherId = validation.voucher.id;

    // Busca ou cria a sessão de onboarding
    let session = await prisma.onboardingSession.findFirst({
      where: { voucherId },
    });

    if (!session) {
      session = await prisma.onboardingSession.create({
        data: {
          voucherId,
          step: step || 1,
          data: data || {},
          selectedDesign: selectedDesign || null,
        },
      });
    } else {
      session = await prisma.onboardingSession.update({
        where: { id: session.id },
        data: {
          step: step !== undefined ? step : session.step,
          data: data ? { ...(session.data as object), ...data } : session.data,
          selectedDesign: selectedDesign !== undefined ? selectedDesign : session.selectedDesign,
        },
      });
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      step: session.step,
      savedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Onboarding save error:', error);
    return NextResponse.json({ error: 'Erro ao salvar progresso do onboarding.' }, { status: 500 });
  }
}

// Obter dados da sessão e gerar propostas visuais
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const voucherCode = searchParams.get('voucher');

    if (!voucherCode) {
      return NextResponse.json({ error: 'Voucher não informado.' }, { status: 400 });
    }

    const validation = await validateVoucher(voucherCode);
    if (!validation.valid || !validation.voucher) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const session = await prisma.onboardingSession.findFirst({
      where: { voucherId: validation.voucher.id },
    });

    const parsedData = session?.data ? OnboardingDataSchema.safeParse(session.data) : null;
    let designs = null;
    let providerUsed = 'InternalSynthesizer';

    if (parsedData?.success) {
      const designResult = await getDesignSpecsWithProvider(parsedData.data);
      designs = designResult.specs;
      providerUsed = designResult.providerUsed;
    }

    // Garante que o e-mail ou nome cadastrados no voucher sejam refletidos nos dados da sessão
    const rawData = (session?.data as any) || {};
    const mergedSessionData = {
      ...rawData,
      publicEmail: rawData.publicEmail || validation.voucher.clientEmail || '',
      adminEmail: rawData.adminEmail || validation.voucher.clientEmail || '',
      fullName: rawData.fullName || validation.voucher.clientName || '',
      professionalName: rawData.professionalName || rawData.fullName || validation.voucher.clientName || '',
    };

    return NextResponse.json({
      session: {
        id: session?.id || null,
        step: session?.step || 1,
        data: mergedSessionData,
        selectedDesign: session?.selectedDesign || null,
        isComplete: session?.isComplete || false,
      },
      designs,
      providerUsed,
      voucher: {
        code: validation.voucher.code,
        clientName: validation.voucher.clientName,
        clientEmail: validation.voucher.clientEmail,
        plan: validation.voucher.plan,
      },
    });
  } catch (error) {
    console.error('Onboarding fetch error:', error);
    return NextResponse.json({ error: 'Erro ao carregar dados do onboarding.' }, { status: 500 });
  }
}
