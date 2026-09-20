# SitePronto — Plataforma SaaS de Criação e Publicação Automatizada de Sites

Plataforma completa de produção que atua como uma fábrica automatizada de sites profissionais com isolamento total de infraestrutura para cada cliente (**GitHub + Neon PostgreSQL + Vercel**).

---

## 🏛️ Arquitetura & Princípio de Isolamento

Cada site gerado pela plataforma possui sua própria infraestrutura autônoma:
- **Repositório GitHub próprio**: `github.com/servicosia/site-[slug]-[id]`
- **Banco de Dados Neon próprio**: PostgreSQL Serverless independente por cliente
- **Projeto Vercel próprio**: Domínio/URL dedicada `https://site-[slug]-[id].vercel.app`
- **Painel Administrativo `/master` autônomo**: Não depende da plataforma central para continuar operando.

---

## 🚀 Fluxo de Ponta a Ponta

1. **Administrador**: Emite um voucher seguro em `/platform-admin`.
2. **Cliente**: Acessa `/iniciar` e valida o voucher.
3. **Onboarding**: Preenche suas informações reais (Profissão, Conselho de Classe, Serviços, Contatos, Identidade).
4. **DesignSpec & Propostas**: O sistema gera 3 propostas de UI reais (**Modelo A: Institucional**, **Modelo B: Moderno Premium**, **Modelo C: Minimalista Editorial**).
5. **Confirmação**: O cliente seleciona o modelo, revisa as informações e define sua senha para o `/master`.
6. **Provisionamento Idempotente**: A State Machine cria repositório no GitHub, configura banco Neon, gera o código Next.js, envia commit e dispara deploy na Vercel com testes de integridade.
7. **Publicação**: O cliente visualiza o site publicado e recebe acesso imediato ao painel `/master`.

---

## 🔐 Segurança & Boas Práticas

- **Sem exposição de Secrets**: Todas as chaves e connection strings são tratadas no servidor e protegidas pelo `.env` e `.gitignore`.
- **Senhas Seguras**: Hashing usando `scrypt` com salt individual e comparação resistente a Timing Attacks.
- **Rate Limiting Persistente**: Proteção contra força bruta em logins, formulários e vouchers armazenada diretamente no PostgreSQL Neon.
- **Security Headers & CSP**: Configuração rigorosa de HSTS, anti-clickjacking, XSS e no-store nas rotas administrativas.

---

## 🛠️ Comandos Principais

```bash
# Executar em modo desenvolvimento
npm run dev

# Sincronizar Prisma com o Neon
npm run prisma:push

# Build de Produção
npm run build
```
