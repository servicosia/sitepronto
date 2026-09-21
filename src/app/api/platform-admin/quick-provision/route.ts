import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { startProvisioningPipeline } from '@/lib/provisioning/pipeline';
import { OnboardingDataSchema } from '@/lib/validation/onboarding';
import { generateDesignSpecs } from '@/lib/design-system/specs';
import { hashPassword, generateVoucherCode, sha256 } from '@/lib/security/crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      profession = 'Churrasqueiro & Buffet', 
      specialty = 'Churrasco Corporativo, Parrilla e Eventos', 
      professionalName = 'Mestre Alessandro Carnes', 
      selectedTemplate = 'MODEL_A',
      hasCustomDomain = false,
      customDomainName = '',
      clientEmail = 'admin-teste@sitepronto.com.br',
      clientPassword = 'SenhaForteTeste123!'
    } = body;

    // 1. Analisar profissão para enriquecimento contextual e detecção de conselho
    const { analyzeProfessionContext } = await import('@/lib/design-system/profession-intelligence');
    const analysis = analyzeProfessionContext(profession, specialty, professionalName);
    const hasCouncil = analysis.suggestedCouncil.hasCouncil;

    // 2. Montar payload válido de OnboardingData
    const onboardingData = {
      fullName: professionalName,
      professionalName: professionalName,
      companyName: professionalName,
      publicEmail: clientEmail,
      whatsapp: '11999999999',
      profession: profession,
      mainSpecialty: specialty,
      professionalSummary: `Especialista renomado em ${profession}, atuando com foco em ${specialty}, entregando alto padrão e excelência em cada atendimento.`,
      attendanceType: 'hibrido',
      city: 'São Paulo',
      state: 'SP',
      services: [
        { title: `Atendimento & Diagnóstico em ${profession}`, shortDescription: 'Análise técnica especializada e personalizada para seu objetivo.', ctaText: 'Saber Mais' },
        { title: `Soluções em ${specialty}`, shortDescription: 'Planejamento estratégico e execução prática focada em excelência.', ctaText: 'Agendar' },
        { title: 'Consultoria Especializada', shortDescription: 'Acompanhamento dedicado com suporte contínuo para os melhores resultados.', ctaText: 'Consultar' }
      ],
      hasProfessionalCouncil: hasCouncil,
      councilType: hasCouncil ? `${analysis.suggestedCouncil.councilAcronym}/SP` : undefined,
      councilNumber: hasCouncil ? '123456' : undefined,
      primaryColor: '#0f172a',
      secondaryColor: '#3b82f6',
      selectedDesignVariant: selectedTemplate,
      hasCustomDomain: Boolean(hasCustomDomain && customDomainName),
      customDomainName: customDomainName || undefined,
    };

    const parseResult = OnboardingDataSchema.safeParse(onboardingData);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(' | ');
      return NextResponse.json({ error: `Dados de onboarding inválidos: ${errorMsg}` }, { status: 400 });
    }

    // 2. Criar ou Obter Usuário
    let user = await prisma.user.findUnique({ where: { email: clientEmail.toLowerCase() } });
    if (!user) {
      const passwordHash = await hashPassword(clientPassword);
      user = await prisma.user.create({
        data: {
          email: clientEmail.toLowerCase(),
          name: professionalName,
          passwordHash,
          role: 'CLIENT',
        },
      });
    }

    // 3. Criar Voucher dedicado para este teste
    const code = 'TEST-' + generateVoucherCode();
    const codeHash = sha256(code);
    const voucher = await prisma.voucher.create({
      data: {
        code,
        codeHash,
        clientName: professionalName,
        clientEmail: clientEmail,
        description: `Teste Rápido Admin (${profession})`,
        plan: 'STANDARD_PRO',
        status: 'ISSUED',
      },
    });

    // 4. Criar Sessão de Onboarding correspondente
    const session = await prisma.onboardingSession.create({
      data: {
        voucherId: voucher.id,
        step: 6,
        isComplete: true,
        data: parseResult.data as any,
        selectedDesign: selectedTemplate,
      },
    });

    // 5. Gerar DesignSpec
    const allSpecs = generateDesignSpecs(parseResult.data);
    const variant = selectedTemplate as 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D';
    const designSpec = allSpecs[variant] || allSpecs.MODEL_A;

    // 6. Iniciar Pipeline Automatizado Real (Vercel + Neon + DB)
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
      voucherCode: voucher.code,
    });
  } catch (error: any) {
    console.error('Quick provision error:', error);
    return NextResponse.json({ error: 'Falha ao iniciar pipeline rápido: ' + error.message }, { status: 500 });
  }
}
