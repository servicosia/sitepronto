import { NextRequest, NextResponse } from 'next/server';
import { sha256 } from '@/lib/security/crypto';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.PLATFORM_ADMIN_PASSWORD || 'Ale281911S@@';

    if (!password || password !== correctPassword) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    const secret = process.env.SESSION_SECRET || 'sitepronto-session-secret-salt';
    const authCookieToken = sha256(`platform_admin_auth_${secret}_${correctPassword}`);

    const res = NextResponse.json({ success: true, message: 'Autenticado com sucesso.' });
    
    // Cookie seguro HttpOnly
    res.cookies.set({
      name: 'platform_admin_session',
      value: authCookieToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: 'Erro de autenticação: ' + err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ success: true, message: 'Desconectado.' });
  res.cookies.delete('platform_admin_session');
  return res;
}
