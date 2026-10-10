import { NextRequest, NextResponse } from 'next/server';
import { generateTotpSecret, getTotpUri, getTotpQrCodeUrl, verifyTotpCode } from '@/lib/security/totp';
import { checkRateLimit } from '@/lib/rate-limit/limiter';

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('totp_setup', ip, 30, 60);
    if (!limit.success) {
      return NextResponse.json({ error: 'Muitas solicitações. Aguarde um momento.' }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const label = searchParams.get('label') || 'cliente@sitepronto.com.br';
    const issuer = searchParams.get('issuer') || 'SitePronto Painel';

    const secret = generateTotpSecret(20);
    const uri = getTotpUri(label, issuer, secret);
    const qrCodeUrl = getTotpQrCodeUrl(uri);

    return NextResponse.json({
      success: true,
      secret,
      uri,
      qrCodeUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao gerar dados 2FA: ' + error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const limit = await checkRateLimit('totp_verify', ip, 20, 60);
    if (!limit.success) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde 1 minuto.' }, { status: 429 });
    }

    const body = await req.json();
    const { code, secret } = body;

    if (!code || !secret) {
      return NextResponse.json({ error: 'Código e chave secreta são obrigatórios.' }, { status: 400 });
    }

    const isValid = verifyTotpCode(String(code), String(secret));
    return NextResponse.json({
      valid: isValid,
      message: isValid ? 'Código validado com sucesso.' : 'Código 2FA incorreto ou expirado.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro na validação do 2FA: ' + error.message }, { status: 500 });
  }
}
