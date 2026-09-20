import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

// Excluir Voucher
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const voucherId = searchParams.get('id');

    if (!voucherId) {
      return NextResponse.json({ error: 'ID do voucher é obrigatório' }, { status: 400 });
    }

    // Exclui sessões de onboarding e o voucher
    await prisma.onboardingSession.deleteMany({ where: { voucherId } });
    await prisma.voucher.delete({ where: { id: voucherId } });

    return NextResponse.json({ success: true, message: 'Voucher excluído com sucesso.' });
  } catch (error: any) {
    console.error('Delete voucher error:', error);
    return NextResponse.json({ error: 'Erro ao excluir voucher: ' + error.message }, { status: 500 });
  }
}
