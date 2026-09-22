import { prisma } from '../db/client';
import { generateVoucherCode, sha256 } from '../security/crypto';

export interface CreateVoucherInput {
  clientName?: string;
  clientEmail?: string;
  description?: string;
  plan?: string;
  notes?: string;
  expiresInDays?: number;
}

/**
 * Criação de Voucher Seguro com alta entropia
 */
export async function createVoucher(input: CreateVoucherInput) {
  const code = generateVoucherCode();
  const codeHash = sha256(code);
  
  const expiresAt = input.expiresInDays 
    ? new Date(Date.now() + input.expiresInDays * 24 * 60 * 60 * 1000)
    : null;

  const voucher = await prisma.voucher.create({
    data: {
      code,
      codeHash,
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      description: input.description,
      plan: input.plan || 'STANDARD_PRO',
      notes: input.notes,
      expiresAt,
      status: 'ISSUED',
    },
  });

  // Salva e pré-carrega o e-mail e nome no formulário de criação do site (OnboardingSession)
  if (input.clientEmail || input.clientName) {
    try {
      await prisma.onboardingSession.create({
        data: {
          voucherId: voucher.id,
          step: 1,
          data: {
            fullName: input.clientName || '',
            professionalName: input.clientName || '',
            publicEmail: input.clientEmail || '',
            adminEmail: input.clientEmail || '',
          },
        },
      });
    } catch (sessionErr) {
      console.warn('[createVoucher] Não foi possível pré-inicializar a sessão:', sessionErr);
    }
  }

  await prisma.auditEvent.create({
    data: {
      eventType: 'VOUCHER_CREATED',
      metadata: { voucherId: voucher.id, code: voucher.code, clientEmail: input.clientEmail },
    },
  });

  return voucher;
}

/**
 * Validação rigorosa do Voucher
 */
export async function validateVoucher(code: string) {
  const normalizedCode = code.trim().toUpperCase();
  const codeHash = sha256(normalizedCode);

  const voucher = await prisma.voucher.findFirst({
    where: {
      OR: [
        { code: normalizedCode },
        { codeHash: codeHash }
      ]
    },
  });

  if (!voucher) {
    return { valid: false, error: 'Voucher não encontrado.' };
  }

  if (voucher.status === 'REVOKED') {
    return { valid: false, error: 'Este voucher foi revogado pela administração.' };
  }

  if (voucher.status === 'COMPLETED' || voucher.status === 'REDEEMED') {
    return { valid: false, error: 'Este voucher já foi utilizado para criar um site.' };
  }

  if (voucher.expiresAt && voucher.expiresAt < new Date()) {
    return { valid: false, error: 'Este voucher está expirado.' };
  }

  return { valid: true, voucher };
}
