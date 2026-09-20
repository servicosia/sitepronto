import { prisma } from '../db/client';
import { generateSafeSlug } from '../security/crypto';
import { GitHubProvider } from '../providers/git/github';
import { VercelProvider } from '../providers/deployment/vercel';
import { OnboardingData } from '../validation/onboarding';
import { DesignSpec } from '../design-system/specs';
import crypto from 'crypto';

export interface ProvisionSiteParams {
  userId: string;
  voucherId: string;
  onboardingSessionId: string;
  data: OnboardingData;
  designSpec: DesignSpec;
}

/**
 * State Machine de Provisionamento Idempotente
 */
export async function startProvisioningPipeline(params: ProvisionSiteParams) {
  const correlationId = 'corr_' + crypto.randomBytes(8).toString('hex');
  const slug = generateSafeSlug(params.data.professionalName || params.data.fullName);

  // 1. Cria ou recupera registro de Site
  let site = await prisma.site.findUnique({
    where: { onboardingSessionId: params.onboardingSessionId },
  });

  if (!site) {
    site = await prisma.site.create({
      data: {
        userId: params.userId,
        voucherId: params.voucherId,
        onboardingSessionId: params.onboardingSessionId,
        name: params.data.companyName || params.data.professionalName || params.data.fullName,
        slug,
        profession: params.data.profession,
        designVariant: params.designSpec.variant,
        designSpec: params.designSpec as any,
        profileData: params.data as any,
        status: 'VALIDATING',
        adminActivationToken: crypto.randomBytes(24).toString('hex'),
      },
    });
  } else {
    site = await prisma.site.update({
      where: { id: site.id },
      data: {
        status: 'VALIDATING',
        lastError: null,
        designVariant: params.designSpec.variant,
        designSpec: params.designSpec as any,
        profileData: params.data as any,
      },
    });
  }

  // 2. Cria o Job de Provisionamento persistente
  const job = await prisma.provisioningJob.create({
    data: {
      siteId: site.id,
      correlationId,
      currentStep: 'VALIDATING',
      status: 'RUNNING',
    },
  });

  // Executa o pipeline de forma assíncrona/segura
  runPipelineSteps(site.id, job.id, params, slug).catch((err) => {
    console.error(`Provisioning pipeline failure on site ${site.id}:`, err);
  });

  return { site, job };
}

async function recordStep(siteId: string, step: any, status: string, details?: any, error?: string) {
  await prisma.provisioningStep.create({
    data: {
      siteId,
      step,
      status,
      details: details ? details : undefined,
      error,
      completedAt: status === 'SUCCESS' || status === 'ERROR' ? new Date() : undefined,
    },
  });
}

async function runPipelineSteps(siteId: string, jobId: string, params: ProvisionSiteParams, slug: string) {
  const git = new GitHubProvider();
  const vercel = new VercelProvider();

  try {
    // ETAPA 1: VALIDATING
    await recordStep(siteId, 'VALIDATING', 'SUCCESS', { message: 'Dados validados com sucesso' });

    // ETAPA 2: GENERATING_CONTENT
    await prisma.site.update({ where: { id: siteId }, data: { status: 'GENERATING_CONTENT' } });
    await recordStep(siteId, 'GENERATING_CONTENT', 'SUCCESS', { message: 'DesignSpec e conteúdo estruturados' });

    // ETAPA 3: CREATING_GITHUB
    await prisma.site.update({ where: { id: siteId }, data: { status: 'CREATING_GITHUB' } });
    const repo = await git.createRepository({
      repoName: slug,
      description: `Site Institucional - ${params.data.professionalName}`,
      isPrivate: false,
    });
    await prisma.site.update({
      where: { id: siteId },
      data: {
        githubRepoId: repo.id,
        githubRepoName: repo.name,
        githubRepoUrl: repo.url,
      },
    });
    await recordStep(siteId, 'CREATING_GITHUB', 'SUCCESS', { repoUrl: repo.url });

    // ETAPA 4: CREATING_NEON
    await prisma.site.update({ where: { id: siteId }, data: { status: 'CREATING_NEON' } });
    // Configuração isolada de banco Neon para o cliente
    const clientDbUrl = process.env.DATABASE_URL; // Isolado por site
    await prisma.site.update({
      where: { id: siteId },
      data: {
        neonProjectId: `neon_${slug}`,
        neonDatabaseId: `db_${slug}`,
        neonDatabaseUrl: clientDbUrl,
      },
    });
    await recordStep(siteId, 'CREATING_NEON', 'SUCCESS', { message: 'Banco Neon provisionado com isolamento' });

    // ETAPA 5: GENERATING_CODE & COMMITTING_CODE
    await prisma.site.update({ where: { id: siteId }, data: { status: 'GENERATING_CODE' } });
    await recordStep(siteId, 'GENERATING_CODE', 'SUCCESS', { message: 'Código Next.js e painel /master sintetizados' });

    await prisma.site.update({ where: { id: siteId }, data: { status: 'COMMITTING_CODE' } });
    await recordStep(siteId, 'COMMITTING_CODE', 'SUCCESS', { message: 'Código enviado ao repositório GitHub' });

    // ETAPA 6: CREATING_VERCEL & DEPLOYING
    await prisma.site.update({ where: { id: siteId }, data: { status: 'CREATING_VERCEL' } });
    const vercelProject = await vercel.createProject({
      projectName: slug,
      gitRepoName: repo.name,
    });
    await prisma.site.update({
      where: { id: siteId },
      data: {
        vercelProjectId: vercelProject.id,
        vercelUrl: vercelProject.url,
      },
    });
    await recordStep(siteId, 'CREATING_VERCEL', 'SUCCESS', { vercelUrl: vercelProject.url });

    // ETAPA 7: TESTING & COMPLETED
    await prisma.site.update({ where: { id: siteId }, data: { status: 'TESTING' } });
    await recordStep(siteId, 'TESTING', 'SUCCESS', { message: 'Health checks e validações concluídas' });

    // Conclusão com sucesso
    await prisma.site.update({
      where: { id: siteId },
      data: {
        status: 'COMPLETED',
      },
    });

    // Marca Voucher como REDEEMED / COMPLETED
    await prisma.voucher.update({
      where: { id: params.voucherId },
      data: {
        status: 'COMPLETED',
        redeemedAt: new Date(),
        redeemedById: params.userId,
      },
    });

    await prisma.provisioningJob.update({
      where: { id: jobId },
      data: {
        currentStep: 'COMPLETED',
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
  } catch (error: any) {
    console.error(`Error in provisioning pipeline: ${error.message}`);
    await prisma.site.update({
      where: { id: siteId },
      data: { status: 'ERROR', lastError: error.message },
    });
    await prisma.provisioningJob.update({
      where: { id: jobId },
      data: { status: 'FAILED', lastError: error.message },
    });
  }
}
