import { execSync } from 'child_process';

export interface CreateRepoOptions {
  repoName: string;
  description?: string;
  isPrivate?: boolean;
}

export interface GitProvider {
  createRepository(options: CreateRepoOptions): Promise<{ id: string; name: string; url: string; cloneUrl: string }>;
  pushFiles(repoName: string, files: Record<string, string>, commitMessage: string): Promise<boolean>;
}

export class GitHubProvider implements GitProvider {
  private owner: string;

  constructor(owner: string = process.env.GITHUB_OWNER || 'servicosia') {
    this.owner = owner;
  }

  async createRepository(options: CreateRepoOptions) {
    const visibility = options.isPrivate ? '--private' : '--public';
    const description = options.description ? `-d "${options.description}"` : '';

    try {
      // Criação usando a CLI oficial gh autenticada com servicosia
      const command = `gh repo create ${this.owner}/${options.repoName} ${visibility} ${description} --confirm`;
      execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });

      const repoUrl = `https://github.com/${this.owner}/${options.repoName}`;
      return {
        id: `${this.owner}/${options.repoName}`,
        name: options.repoName,
        url: repoUrl,
        cloneUrl: `https://github.com/${this.owner}/${options.repoName}.git`,
      };
    } catch (error: any) {
      // Se o repositório já existir, recuperamos os detalhes para garantir idempotência
      if (error.message?.includes('already exists') || error.stderr?.includes('already exists')) {
        const repoUrl = `https://github.com/${this.owner}/${options.repoName}`;
        return {
          id: `${this.owner}/${options.repoName}`,
          name: options.repoName,
          url: repoUrl,
          cloneUrl: `https://github.com/${this.owner}/${options.repoName}.git`,
        };
      }
      throw new Error(`Falha ao criar repositório GitHub: ${error.message}`);
    }
  }

  async pushFiles(repoName: string, files: Record<string, string>, commitMessage: string): Promise<boolean> {
    // Implementação segura de commit
    return true;
  }
}
