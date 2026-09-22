export interface CreateDatabaseOptions {
  projectName: string;
}

export interface DatabaseProvider {
  createDatabase(options: CreateDatabaseOptions): Promise<{ id: string; name: string; connectionUri?: string }>;
}

export class NeonProvider implements DatabaseProvider {
  private apiKey: string | undefined;

  constructor(apiKey: string | undefined = process.env.NEON_API_KEY) {
    this.apiKey = apiKey;
  }

  async createDatabase(options: CreateDatabaseOptions) {
    const rawName = options.projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const projectName = rawName.startsWith('site-') ? rawName : `site-${rawName}`;

    if (!this.apiKey) {
      return {
        id: `neon_${projectName}`,
        name: projectName,
        connectionUri: process.env.DATABASE_URL,
      };
    }

    try {
      // Criação real do Projeto/Banco no Neon via API REST oficial
      const res = await fetch('https://console.neon.tech/api/v2/projects', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          project: {
            name: projectName,
            region_id: 'aws-sa-east-1', // São Paulo
            pg_version: 16,
          },
        }),
      });

      if (res.status === 201 || res.status === 200) {
        const data = await res.json();
        const connectionUri = data.connection_uris?.[0]?.connection_uri || process.env.DATABASE_URL;
        return {
          id: data.project?.id || `neon_${projectName}`,
          name: data.project?.name || projectName,
          connectionUri,
        };
      }

      console.warn(`[NeonProvider] Retorno da API Neon: ${res.status}`);
      return {
        id: `neon_${projectName}`,
        name: projectName,
        connectionUri: process.env.DATABASE_URL,
      };
    } catch (error: any) {
      console.error(`[NeonProvider] Erro ao criar projeto no Neon: ${error.message}`);
      return {
        id: `neon_${projectName}`,
        name: projectName,
        connectionUri: process.env.DATABASE_URL,
      };
    }
  }

  async updateProjectName(projectId: string, newName: string): Promise<boolean> {
    if (!this.apiKey || !projectId || projectId.startsWith('neon_')) return true;
    try {
      const cleanName = newName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const res = await fetch(`https://console.neon.tech/api/v2/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          project: {
            name: cleanName.startsWith('site-') ? cleanName : `site-${cleanName}`,
          },
        }),
      });
      return res.status === 200 || res.status === 204;
    } catch (err: any) {
      console.warn(`[NeonProvider] Falha ao atualizar nome do projeto Neon ${projectId}:`, err.message);
      return false;
    }
  }

  async deleteDatabase(projectId: string): Promise<boolean> {
    if (!this.apiKey || !projectId || projectId.startsWith('neon_')) return false;
    try {
      const res = await fetch(`https://console.neon.tech/api/v2/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });
      return res.status === 200 || res.status === 204;
    } catch (err: any) {
      console.warn(`[NeonProvider] Falha ao deletar projeto Neon ${projectId}:`, err.message);
      return false;
    }
  }
}

