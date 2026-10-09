import { z } from 'zod';

// Profissões Suportadas com adaptação de regras
export const ProfessionTypes = [
  'advocacia',
  'medicina',
  'psicologia',
  'contabilidade',
  'engenharia',
  'odontologia',
  'fisioterapia',
  'arquitetura',
  'nutricao',
  'veterinaria',
  'consultoria',
  'fotografia',
  'outra'
] as const;

export const ActivityTypes = [
  'autonomo',
  'liberal',
  'empresa',
  'escritorio',
  'clinica',
  'consultorio',
  'organizacao',
  'outro'
] as const;

export const AttendanceTypes = [
  'presencial',
  'online',
  'hibrido'
] as const;

export const VisualStyles = [
  'classico',
  'tradicional',
  'moderno',
  'elegante',
  'premium',
  'minimalista',
  'corporativo',
  'acolhedor',
  'criativo',
  'tecnologico',
  'editorial',
  'sem_preferencia'
] as const;

export const ThemeTypes = [
  'claro',
  'escuro',
  'ambos',
  'sem_preferencia'
] as const;

export const DesignVariantTypes = [
  'MODEL_A', // Institucional Confiável
  'MODEL_B', // Moderno Dark Premium
  'MODEL_C', // Minimalista Editorial Nobre
  'MODEL_D'  // Alta Conversão & Consultoria Ágil (Google Stitch Dynamic)
] as const;

// Schema de Serviço
export const ServiceItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Título do serviço é obrigatório'),
  shortDescription: z.string().min(5, 'Descrição curta é obrigatória'),
  fullDescription: z.string().optional(),
  badge: z.string().optional(),
  icon: z.string().default('Briefcase'),
  targetAudience: z.string().optional(),
  ctaText: z.string().default('Solicitar Atendimento'),
  whatsappMessage: z.string().optional(),
  active: z.boolean().default(true),
  order: z.number().default(0),
});

// Schema de Foto da Galeria
export const GalleryItemSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, 'URL da foto é obrigatória'),
  title: z.string().optional(),
  caption: z.string().optional(),
});

// Schema de Depoimento de Cliente
export const TestimonialItemSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(2, 'Nome do cliente é obrigatório'),
  role: z.string().optional(),
  content: z.string().min(5, 'Depoimento é obrigatório'),
  photoUrl: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
});

// Schema de Item do Catálogo de Produtos (Até 50 produtos)
export const ProductItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Nome do produto é obrigatório'),
  description: z.string().min(2, 'Descrição do produto é obrigatória'),
  price: z.string().optional(), // Preço opcional (ex: "R$ 150,00" ou vazio)
  imageUrl: z.string().optional(),
  ctaText: z.string().default('Pedir pelo WhatsApp'),
  active: z.boolean().default(true),
  order: z.number().default(0),
});

// 1. FAQ / Dúvidas Frequentes
export const FaqItemSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(3, 'Pergunta é obrigatória'),
  answer: z.string().min(5, 'Resposta é obrigatória'),
  order: z.number().default(0),
});

// 2. Planos / Pacotes de Serviços
export const PricingPlanSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Nome do plano é obrigatório'),
  badge: z.string().optional(), // ex: "Mais Escolhido", "Econômico"
  price: z.string().min(1, 'Preço é obrigatório'), // ex: "R$ 290" ou "Sob Consulta"
  period: z.string().default('por mês'), // ex: "por mês", "por pacote", "sessão"
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  ctaText: z.string().default('Contratar Plano'),
  highlight: z.boolean().default(false),
});

// 3. Casos de Sucesso / Portfólio
export const CaseItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Título do caso/projeto é obrigatório'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  description: z.string().min(5, 'Descrição do caso é obrigatória'),
  resultBadge: z.string().optional(), // ex: "+85% de Eficiência", "Concluído em 30 dias"
  imageUrl: z.string().optional(),
  ctaText: z.string().default('Saber Mais sobre este Caso'),
});

// 4. Bio Links (/links - Linktree próprio)
export const BioLinkItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(2, 'Texto do link é obrigatório'),
  url: z.string().min(1, 'URL ou destino é obrigatório'),
  icon: z.string().default('Globe'), // WhatsApp, Instagram, Maps, FileText, Globe
  isHighlight: z.boolean().default(false),
});

// 5. Barra de Comunicados / Avisos
export const AnnouncementConfigSchema = z.object({
  active: z.boolean().default(false),
  text: z.string().default('Aviso: Atendimento com agenda aberta para novos clientes este mês!'),
  badge: z.string().default('COMUNICADO'),
  linkText: z.string().optional(),
  linkUrl: z.string().optional(),
});

// 6. Parceiros, Clientes e Certificações
export const PartnerItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Nome do parceiro/cliente é obrigatório'),
  logoUrl: z.string().min(1, 'Logo URL é obrigatória'),
  type: z.string().default('Cliente'), // "Cliente", "Parceiro", "Certificação"
});

// 7. Simulador de Atendimento
export const SimulatorConfigSchema = z.object({
  active: z.boolean().default(false),
  title: z.string().default('Simulador de Atendimento Personalizado'),
  subtitle: z.string().default('Selecione suas preferências e receba uma orientação imediata no WhatsApp'),
});

// 8. Redes Sociais no Rodapé (Instagram, TikTok, Facebook, YouTube)
export const SocialLinkItemSchema = z.object({
  active: z.boolean().default(false),
  url: z.string().default(''),
});

export const SocialLinksConfigSchema = z.object({
  instagram: SocialLinkItemSchema.default({ active: false, url: '' }),
  tiktok: SocialLinkItemSchema.default({ active: false, url: '' }),
  facebook: SocialLinkItemSchema.default({ active: false, url: '' }),
  youtube: SocialLinkItemSchema.default({ active: false, url: '' }),
});

// Schema de Configuração Modular das Seções do Site
export const SectionsConfigSchema = z.object({
  inicio: z.boolean().default(true),
  servicos: z.boolean().default(true),
  'como-funciona': z.boolean().default(true),
  sobre: z.boolean().default(true),
  galeria: z.boolean().default(true),
  depoimentos: z.boolean().default(true),
  artigos: z.boolean().default(true),
  contato: z.boolean().default(true),
  // Módulos adicionais opcionais (iniciam desligados!)
  catalogo: z.boolean().default(false),
  faq: z.boolean().default(false),
  planos: z.boolean().default(false),
  cases: z.boolean().default(false),
  biolinks: z.boolean().default(false),
  comunicado: z.boolean().default(false),
  parceiros: z.boolean().default(false),
  simulador: z.boolean().default(false),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type TestimonialItem = z.infer<typeof TestimonialItemSchema>;
export type ProductItem = z.infer<typeof ProductItemSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;
export type PricingPlan = z.infer<typeof PricingPlanSchema>;
export type CaseItem = z.infer<typeof CaseItemSchema>;
export type BioLinkItem = z.infer<typeof BioLinkItemSchema>;
export type AnnouncementConfig = z.infer<typeof AnnouncementConfigSchema>;
export type PartnerItem = z.infer<typeof PartnerItemSchema>;
export type SimulatorConfig = z.infer<typeof SimulatorConfigSchema>;
export type SectionsConfig = z.infer<typeof SectionsConfigSchema>;

// Schema de Dados de Onboarding
export const OnboardingDataSchema = z.object({
  // Identificação Pessoal/Profissional
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  professionalName: z.string().min(2, 'Nome profissional é obrigatório'),
  companyName: z.string().optional(),
  profession: z.string().min(2, 'Profissão é obrigatória'),
  professionType: z.enum(ProfessionTypes).default('outra'),
  activityType: z.enum(ActivityTypes).default('autonomo'),
  
  // Registro Profissional
  hasProfessionalCouncil: z.boolean().default(false),
  councilType: z.string().optional(), // ex: "OAB/SP", "CRM/RJ", "CRP"
  councilNumber: z.string().optional(),
  
  // Especialidades & Descrição
  mainSpecialty: z.string().min(2, 'Especialidade principal é obrigatória'),
  otherSpecialties: z.array(z.string()).default([]),
  professionalSummary: z.string().min(2, 'Resumo profissional é obrigatório'),
  bio: z.string().optional(),
  
  // Localização & Atendimento
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado (UF) é obrigatório'),
  geographicArea: z.string().optional(),
  attendanceType: z.enum(AttendanceTypes).default('hibrido'),
  
  // Contato
  phone: z.string().optional(),
  whatsapp: z.string().min(10, 'WhatsApp válido é obrigatório'),
  publicEmail: z.string().email('E-mail público inválido'),
  adminEmail: z.string().email('E-mail administrativo inválido').optional(),
  
  // Endereço
  showFullAddress: z.boolean().default(false),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  zipCode: z.string().optional(),
  businessHours: z.string().default('Segunda a Sexta, das 09h às 18h'),
  
  // Redes Sociais
  instagram: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  facebook: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  linkedin: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  youtube: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  tiktok: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  twitter: z.string().url('URL inválida').or(z.string().length(0)).optional(),
  
  // Serviços
  services: z.array(ServiceItemSchema).min(1, 'Cadastre pelo menos 1 serviço ou área de atuação'),
  
  // Histórico e Formação (Regra de Veracidade)
  education: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  differentials: z.array(z.string()).default([]),
  workPhilosophy: z.string().optional(),
  
  // Identidade Visual
  hasBrandIdentity: z.boolean().default(false),
  logoUrl: z.string().optional(),
  primaryColor: z.string().default('#0f172a'),
  secondaryColor: z.string().default('#3b82f6'),
  accentColor: z.string().default('#10b981'),
  
  // Imagens
  profilePhotoUrl: z.string().optional(),
  coverPhotoUrl: z.string().optional(),
  officePhotos: z.array(z.string()).default([]),
  
  // Preferências Visuais
  visualStyle: z.enum(VisualStyles).default('moderno'),
  themePreference: z.enum(ThemeTypes).default('claro'),
  
  // Galeria, Depoimentos, Catálogo e Módulos Adicionais
  gallery: z.array(GalleryItemSchema).default([]),
  testimonials: z.array(TestimonialItemSchema).default([]),
  products: z.array(ProductItemSchema).max(50, 'Máximo de 50 produtos permitidos no catálogo').default([]),
  faq: z.array(FaqItemSchema).default([]),
  plans: z.array(PricingPlanSchema).default([]),
  cases: z.array(CaseItemSchema).default([]),
  bioLinks: z.array(BioLinkItemSchema).default([]),
  announcement: AnnouncementConfigSchema.default({
    active: false,
    text: 'Aviso: Agenda aberta para novos atendimentos este mês!',
    badge: 'COMUNICADO',
  }),
  partners: z.array(PartnerItemSchema).default([]),
  simulator: SimulatorConfigSchema.default({
    active: false,
    title: 'Simulador de Atendimento Personalizado',
    subtitle: 'Selecione suas preferências e receba uma orientação imediata no WhatsApp',
  }),
  socialLinks: SocialLinksConfigSchema.default({
    instagram: { active: false, url: '' },
    tiktok: { active: false, url: '' },
    facebook: { active: false, url: '' },
    youtube: { active: false, url: '' },
  }),
  sectionsConfig: SectionsConfigSchema.default({
    inicio: true,
    servicos: true,
    'como-funciona': true,
    sobre: true,
    galeria: true,
    depoimentos: true,
    artigos: true,
    contato: true,
    catalogo: false,
    faq: false,
    planos: false,
    cases: false,
    biolinks: false,
    comunicado: false,
    parceiros: false,
    simulador: false,
  }),

  // Domínio
  hasCustomDomain: z.boolean().default(false),
  customDomainName: z.string().optional(),
  registerDomainOnCompletion: z.boolean().default(false),
});

export type OnboardingData = z.infer<typeof OnboardingDataSchema>;
