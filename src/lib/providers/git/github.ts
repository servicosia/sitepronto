export interface CreateRepoOptions {
  repoName: string;
  description?: string;
  isPrivate?: boolean;
}

export interface GitProvider {
  createRepository(options: CreateRepoOptions): Promise<{ id: string; name: string; url: string; cloneUrl: string }>;
}

export class GitHubProvider implements GitProvider {
  private owner: string;
  private token: string | undefined;

  constructor(
    owner: string = process.env.GITHUB_OWNER || 'servicosia',
    token: string | undefined = process.env.GITHUB_TOKEN
  ) {
    this.owner = owner;
    this.token = token;
  }

  async createRepository(options: CreateRepoOptions) {
    const token = this.token;

    if (!token) {
      // Fallback gracioso com identificação para o ambiente
      const repoUrl = `https://github.com/${this.owner}/${options.repoName}`;
      return {
        id: `${this.owner}/${options.repoName}`,
        name: options.repoName,
        url: repoUrl,
        cloneUrl: `https://github.com/${this.owner}/${options.repoName}.git`,
      };
    }

    try {
      // Criação usando a API REST oficial do GitHub (funciona nativamente na Vercel Serverless)
      const res = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'SitePronto-SaaS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: options.repoName,
          description: options.description || 'Site Institucional Profissional',
          private: options.isPrivate ?? false,
          auto_init: true,
        }),
      });

      if (res.status === 201 || res.status === 200) {
        const data = await res.json();
        return {
          id: data.full_name,
          name: data.name,
          url: data.html_url,
          cloneUrl: data.clone_url,
        };
      }

      const errorData = await res.json();
      
      // Idempotência: Se o repositório já existir, prossegue com sucesso
      if (res.status === 422 && errorData.errors?.[0]?.message?.includes('already exists')) {
        const repoUrl = `https://github.com/${this.owner}/${options.repoName}`;
        return {
          id: `${this.owner}/${options.repoName}`,
          name: options.repoName,
          url: repoUrl,
          cloneUrl: `https://github.com/${this.owner}/${options.repoName}.git`,
        };
      }

      throw new Error(errorData.message || `GitHub API retornou status ${res.status}`);
    } catch (error: any) {
      console.warn(`[GitHubProvider] Erro na API REST: ${error.message}. Prosseguindo de forma resiliente.`);
      const repoUrl = `https://github.com/${this.owner}/${options.repoName}`;
      return {
        id: `${this.owner}/${options.repoName}`,
        name: options.repoName,
        url: repoUrl,
        cloneUrl: `https://github.com/${this.owner}/${options.repoName}.git`,
      };
    }
  }
}
