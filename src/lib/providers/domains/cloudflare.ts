export interface AddDomainResult {
  name: string;
  apexName: string;
  verified: boolean;
  verification?: Array<{
    type: string;
    domain: string;
    value: string;
    reason?: string;
  }>;
  cnames?: string[];
  aRecords?: string[];
}

export interface CloudflareDnsRecord {
  type: 'A' | 'CNAME' | 'TXT';
  name: string;
  content: string;
  proxied?: boolean;
  ttl?: number;
}

export interface CloudflareZoneResult {
  zoneId: string;
  name: string;
  nameServers: string[];
  status: string;
}

export class CloudflareProvider {
  private apiToken: string | undefined;
  private accountId: string | undefined;

  constructor(
    apiToken: string | undefined = process.env.CLOUDFLARE_API_TOKEN,
    accountId: string | undefined = process.env.CLOUDFLARE_ACCOUNT_ID
  ) {
    this.apiToken = apiToken;
    this.accountId = accountId;
  }

  /**
   * Normaliza o nome de domínio (remove http/https/trailing slashes e www inicial para a zona raiz)
   */
  static normalizeDomain(domain: string): { rootDomain: string; isSubdomain: boolean; fullDomain: string } {
    let clean = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const parts = clean.split('.');
    
    // Tratamento para domínios .com.br, .adv.br, .med.br, .org.br, etc.
    let rootDomain = clean;
    if (parts.length > 2) {
      if (parts[parts.length - 1] === 'br' && parts.length >= 3) {
        // ex: meudominio.adv.br ou www.meudominio.adv.br
        if (parts[0] === 'www') {
          rootDomain = parts.slice(1).join('.');
        } else if (parts.length > 3) {
          rootDomain = parts.slice(-3).join('.');
        }
      } else if (parts[0] === 'www') {
        rootDomain = parts.slice(1).join('.');
      }
    }

    return {
      rootDomain,
      isSubdomain: clean !== rootDomain && clean.startsWith('www.'),
      fullDomain: clean,
    };
  }

  /**
   * Cria ou localiza uma Zona DNS no Cloudflare para o domínio .BR
   */
  async getOrCreateZone(domain: string): Promise<CloudflareZoneResult> {
    const { rootDomain } = CloudflareProvider.normalizeDomain(domain);

    if (!this.apiToken) {
      // Fallback simulado para desenvolvimento
      return {
        zoneId: `zone_${rootDomain.replace(/[^a-z0-9]/g, '_')}`,
        name: rootDomain,
        nameServers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
        status: 'pending',
      };
    }

    try {
      // 1. Verifica se a zona já existe
      const listRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${rootDomain}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      const listData = await listRes.json();
      if (listData.success && listData.result && listData.result.length > 0) {
        const zone = listData.result[0];
        return {
          zoneId: zone.id,
          name: zone.name,
          nameServers: zone.name_servers || ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
          status: zone.status,
        };
      }

      // 2. Cria a zona no Cloudflare (Plano Free)
      const createRes = await fetch('https://api.cloudflare.com/client/v4/zones', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: rootDomain,
          account: this.accountId ? { id: this.accountId } : undefined,
          jump_start: true,
          type: 'full',
        }),
      });

      const createData = await createRes.json();
      if (createData.success && createData.result) {
        const zone = createData.result;
        return {
          zoneId: zone.id,
          name: zone.name,
          nameServers: zone.name_servers || ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
          status: zone.status || 'pending',
        };
      }

      console.warn('[CloudflareProvider] Erro ao criar zona:', createData.errors);
      return {
        zoneId: `zone_${rootDomain.replace(/[^a-z0-9]/g, '_')}`,
        name: rootDomain,
        nameServers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
        status: 'pending',
      };
    } catch (err: any) {
      console.error('[CloudflareProvider] Erro:', err.message);
      return {
        zoneId: `zone_${rootDomain.replace(/[^a-z0-9]/g, '_')}`,
        name: rootDomain,
        nameServers: ['dina.ns.cloudflare.com', 'walt.ns.cloudflare.com'],
        status: 'pending',
      };
    }
  }

  /**
   * Configura os apontamentos DNS (CNAME e A Records) apontando para a Vercel
   */
  async configureVercelDnsRecords(zoneId: string, rootDomain: string): Promise<boolean> {
    if (!this.apiToken) return true;

    try {
      // Apontamento A para @ (76.76.21.21 - Vercel Anycast IP)
      // Usamos proxied: false (DNS Only) inicialmente ou proxied: true com SSL Full/Strict
      await this.upsertDnsRecord(zoneId, {
        type: 'A',
        name: '@',
        content: '76.76.21.21',
        proxied: false,
        ttl: 1, // Auto
      });

      // Apontamento CNAME para www (cname.vercel-dns.com)
      await this.upsertDnsRecord(zoneId, {
        type: 'CNAME',
        name: 'www',
        content: 'cname.vercel-dns.com',
        proxied: false,
        ttl: 1,
      });

      return true;
    } catch (err: any) {
      console.error('[CloudflareProvider] Erro ao configurar apontamentos DNS:', err.message);
      return false;
    }
  }

  private async upsertDnsRecord(zoneId: string, record: CloudflareDnsRecord) {
    // 1. Procura se já existe
    const getRes = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=${record.type}&name=${record.name}`,
      {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const getData = await getRes.json();

    if (getData.success && getData.result && getData.result.length > 0) {
      const existingId = getData.result[0].id;
      // Atualiza
      await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existingId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
    } else {
      // Cria
      await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });
    }
  }

  /**
   * Exclui uma zona DNS específica pelo seu zoneId
   */
  async deleteZone(zoneId: string): Promise<boolean> {
    if (!this.apiToken || !zoneId || zoneId.startsWith('zone_')) return true;
    try {
      const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return Boolean(data.success);
    } catch (err: any) {
      console.warn(`[CloudflareProvider] Erro ao excluir zona ${zoneId}:`, err.message);
      return false;
    }
  }

  /**
   * Localiza e exclui a zona DNS associada a um domínio raiz no Cloudflare
   */
  async deleteZoneByDomain(domain: string): Promise<boolean> {
    const { rootDomain } = CloudflareProvider.normalizeDomain(domain);
    if (!this.apiToken) return true;

    try {
      const listRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${rootDomain}`, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      const listData = await listRes.json();
      if (listData.success && listData.result && listData.result.length > 0) {
        let allDeleted = true;
        for (const zone of listData.result) {
          const deleted = await this.deleteZone(zone.id);
          if (!deleted) allDeleted = false;
        }
        return allDeleted;
      }
      return true;
    } catch (err: any) {
      console.warn(`[CloudflareProvider] Erro ao excluir zona do domínio ${rootDomain}:`, err.message);
      return false;
    }
  }
}
