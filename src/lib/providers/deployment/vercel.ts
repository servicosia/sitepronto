export interface CreateProjectOptions {
  projectName: string;
  gitRepoName?: string;
  framework?: string;
  files?: Array<{ file: string; data: string }>;
}

export interface DeploymentProvider {
  createProject(options: CreateProjectOptions): Promise<{ id: string; name: string; url: string }>;
  deploy(options: { projectName: string; files: Array<{ file: string; data: string }> }): Promise<{ url: string; ready: boolean }>;
}

export class VercelProvider implements DeploymentProvider {
  private scope: string;
  private token: string | undefined;
  private teamId: string | undefined;

  constructor(
    scope: string = process.env.VERCEL_SCOPE || 'contato-1577',
    token: string | undefined = process.env.VERCEL_TOKEN,
    teamId: string | undefined = process.env.VERCEL_TEAM_ID || 'team_3tLIgnGMZ5orYgHyKOIgxGZw'
  ) {
    this.scope = scope;
    this.token = token;
    this.teamId = teamId;
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
      const teamQuery = this.teamId ? `?teamId=${this.teamId}` : '';
      
      // 1. Cria ou atualiza o projeto na Vercel garantindo configuração estática limpa e cleanUrls
      const res = await fetch(`https://api.vercel.com/v9/projects${teamQuery}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          framework: null,
          buildCommand: null,
          outputDirectory: null,
          installCommand: null,
          cleanUrls: true,
          trailingSlash: false,
        }),
      });

      let projectId = `prj_${projectName}`;
      if (res.status === 200 || res.status === 201) {
        const data = await res.json();
        projectId = data.id;
      } else {
        // Se já existir, aplica PATCH para garantir que o framework não force build Next.js com erro
        await fetch(`https://api.vercel.com/v9/projects/${projectName}${teamQuery}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            framework: null,
            buildCommand: null,
            outputDirectory: null,
            installCommand: null,
          }),
        }).catch(() => {});
      }

      // 2. Se houver arquivos para deploy imediato, executa
      if (options.files && options.files.length > 0) {
        await this.deploy({ projectName, files: options.files });
      }

      return {
        id: projectId,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    } catch (error: any) {
      console.error(`[VercelProvider] Erro na API Vercel: ${error.message}`);
      return {
        id: `prj_${projectName}`,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    }
  }

  async deploy(options: { projectName: string; files: Array<{ file: string; data: string }> }) {
    if (!this.token) return { url: `https://${options.projectName}.vercel.app`, ready: true };

    try {
      const teamQuery = this.teamId ? `?teamId=${this.teamId}` : '';
      const routes = [
        { handle: 'filesystem' },
        { src: '/master/?$', dest: '/master/index.html' },
        { src: '/master/(.*)', dest: '/master/index.html' },
      ];

      const deployRes = await fetch(`https://api.vercel.com/v13/deployments${teamQuery}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: options.projectName,
          project: options.projectName,
          target: 'production',
          routes,
          files: options.files,
          projectSettings: {
            framework: null,
            buildCommand: null,
            outputDirectory: null,
            installCommand: null,
          },
        }),
      });

      const deployData = await deployRes.json();
      return {
        url: `https://${options.projectName}.vercel.app`,
        ready: deployData.readyState === 'READY' || deployRes.status === 200,
      };
    } catch (err: any) {
      console.error('[VercelProvider] Erro ao criar deploy:', err.message);
      return { url: `https://${options.projectName}.vercel.app`, ready: false };
    }
  }

  async addDomainToProject(projectIdOrName: string, domain: string) {
    const rawDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!this.token) {
      return {
        name: rawDomain,
        verified: true,
        aRecords: ['76.76.21.21'],
        cnames: ['cname.vercel-dns.com'],
      };
    }

    try {
      const teamQuery = this.teamId ? `?teamId=${this.teamId}` : '';
      const res = await fetch(`https://api.vercel.com/v10/projects/${encodeURIComponent(projectIdOrName)}/domains${teamQuery}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: rawDomain,
        }),
      });

      const data = await res.json();
      return {
        name: rawDomain,
        verified: data.verified || false,
        verification: data.verification || [],
        aRecords: ['76.76.21.21'],
        cnames: ['cname.vercel-dns.com'],
      };
    } catch (err: any) {
      console.error('[VercelProvider] Erro ao adicionar domínio na Vercel:', err.message);
      return {
        name: rawDomain,
        verified: false,
        aRecords: ['76.76.21.21'],
        cnames: ['cname.vercel-dns.com'],
      };
    }
  }

  async deleteProject(projectIdOrName: string): Promise<boolean> {
    if (!this.token) return false;
    try {
      const teamQuery = this.teamId ? `?teamId=${this.teamId}` : '';
      const res = await fetch(`https://api.vercel.com/v9/projects/${encodeURIComponent(projectIdOrName)}${teamQuery}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.status === 200 || res.status === 204;
    } catch (err: any) {
      console.warn(`[VercelProvider] Falha ao deletar projeto ${projectIdOrName}:`, err.message);
      return false;
    }
  }
}


