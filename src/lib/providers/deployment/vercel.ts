export interface CreateProjectOptions {
  projectName: string;
  gitRepoName?: string;
  framework?: string;
}

export interface DeploymentProvider {
  createProject(options: CreateProjectOptions): Promise<{ id: string; name: string; url: string }>;
}

export class VercelProvider implements DeploymentProvider {
  private scope: string;
  private token: string | undefined;

  constructor(
    scope: string = process.env.VERCEL_SCOPE || 'contato-1577',
    token: string | undefined = process.env.VERCEL_TOKEN
  ) {
    this.scope = scope;
    this.token = token;
  }

  async createProject(options: CreateProjectOptions) {
    const rawName = options.projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const projectName = rawName.startsWith('site-') ? rawName : `site-${rawName}`;

    if (!this.token) {
      console.warn('[VercelProvider] VERCEL_TOKEN não configurado.');
      return {
        id: `prj_${projectName}`,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    }

    try {
      // 1. Criação real e física do Projeto na Vercel via API REST
      const res = await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          framework: 'nextjs',
        }),
      });

      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        return {
          id: data.id,
          name: data.name,
          url: `https://${data.name}.vercel.app`,
        };
      }

      const errData = await res.json();

      // Se o projeto já existir na Vercel (Idempotência)
      if (res.status === 409 || errData.error?.code === 'project_already_exists') {
        return {
          id: `prj_${projectName}`,
          name: projectName,
          url: `https://${projectName}.vercel.app`,
        };
      }

      console.warn(`[VercelProvider] Aviso na API Vercel: ${errData.error?.message || res.status}`);
      return {
        id: `prj_${projectName}`,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    } catch (error: any) {
      console.error(`[VercelProvider] Erro de conexão na API Vercel: ${error.message}`);
      return {
        id: `prj_${projectName}`,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    }
  }
}
