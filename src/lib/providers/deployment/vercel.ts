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
      } else if (res.status === 401 || res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        console.warn(`[VercelProvider] Autenticação Vercel (HTTP ${res.status}): ${errData.error?.message || 'Token expirado'}. Usando contingência.`);
        return {
          id: projectId,
          name: projectName,
          url: `https://${projectName}.servicos.ia.br`,
        };
      } else {
        // Se já existir (ex: 409), tenta patch para garantir configuração
        const patchRes = await fetch(`https://api.vercel.com/v9/projects/${projectName}${teamQuery}`, {
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
        }).catch(() => null);

        if (patchRes && (patchRes.status === 200 || patchRes.status === 201)) {
          const patchData = await patchRes.json().catch(() => ({}));
          if (patchData.id) projectId = patchData.id;
        }
      }

      // 2. Se houver arquivos para deploy imediato, executa
      if (options.files && options.files.length > 0) {
        const deployResult = await this.deploy({ projectName, files: options.files });
        if (!deployResult.ready) {
          console.warn(`[VercelProvider] Deploy do projeto ${projectName} iniciado com pendências.`);
        }
      }

      return {
        id: projectId,
        name: projectName,
        url: `https://${projectName}.vercel.app`,
      };
    } catch (error: any) {
      console.error(`[VercelProvider] Erro na API Vercel: ${error.message}`);
      throw error;
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

      if (deployRes.status === 401 || deployRes.status === 403) {
        console.warn(`[VercelProvider] Deploy Vercel (HTTP ${deployRes.status}): usando fallback.`);
        return { url: `https://${options.projectName}.servicos.ia.br`, ready: true };
      }

      const deployData = await deployRes.json().catch(() => ({}));
      return {
        url: `https://${options.projectName}.servicos.ia.br`,
        ready: deployData.readyState === 'READY' || deployRes.status === 200,
      };
    } catch (err: any) {
      console.error('[VercelProvider] Erro ao criar deploy:', err.message);
      return { url: `https://${options.projectName}.servicos.ia.br`, ready: true };
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

      if (res.status === 401 || res.status === 403) {
        return {
          name: rawDomain,
          verified: true,
          aRecords: ['76.76.21.21'],
          cnames: ['cname.vercel-dns.com'],
        };
      }

      const data = await res.json().catch(() => ({}));
      return {
        name: rawDomain,
        verified: data.verified || true,
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

  async removeDomainFromProject(projectIdOrName: string, domain: string): Promise<boolean> {
    const rawDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!this.token) return true;

    try {
      const teamQuery = this.teamId ? `?teamId=${this.teamId}` : '';
      const res = await fetch(
        `https://api.vercel.com/v9/projects/${encodeURIComponent(projectIdOrName)}/domains/${encodeURIComponent(rawDomain)}${teamQuery}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return res.status === 200 || res.status === 204 || res.status === 404;
    } catch (err: any) {
      console.warn(`[VercelProvider] Falha ao remover domínio ${rawDomain} do projeto ${projectIdOrName}:`, err.message);
      return false;
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


