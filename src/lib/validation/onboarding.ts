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
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type TestimonialItem = z.infer<typeof TestimonialItemSchema>;
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
  
  // Galeria, Depoimentos e Configuração Modular
  gallery: z.array(GalleryItemSchema).default([]),
  testimonials: z.array(TestimonialItemSchema).default([]),
  sectionsConfig: SectionsConfigSchema.default({
    inicio: true,
    servicos: true,
    'como-funciona': true,
    sobre: true,
    galeria: true,
    depoimentos: true,
    artigos: true,
    contato: true,
  }),

  // Domínio
  hasCustomDomain: z.boolean().default(false),
  customDomainName: z.string().optional(),
  registerDomainOnCompletion: z.boolean().default(false),
});

export type OnboardingData = z.infer<typeof OnboardingDataSchema>;
