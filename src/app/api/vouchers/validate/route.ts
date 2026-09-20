import { NextRequest, NextResponse } from 'next/server';
import { validateVoucher } from '@/lib/vouchers/service';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Rate limit: 10 validações por 10 minutos
    const limit = await checkRateLimit('voucher_validate', ip, 10, 600);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter || 60) } }
      );
    }

    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Código de voucher é obrigatório.' }, { status: 400 });
    }

    const result = await validateVoucher(code);
    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      voucher: {
        id: result.voucher!.id,
        code: result.voucher!.code,
        clientName: result.voucher!.clientName,
        plan: result.voucher!.plan,
      }
    });
  } catch (error) {
    console.error('Voucher validation error:', error);
    return NextResponse.json({ error: 'Erro ao validar voucher.' }, { status: 500 });
  }
}
