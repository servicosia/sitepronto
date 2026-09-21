import type { OnboardingData } from '../validation/onboarding';

export interface DesignSpec {
  id: string;
  variant: 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D';
  name: string;
  tagline: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
    border: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: string;
    heroHeadingSize: string;
  };
  spacing: {
    containerMaxWidth: string;
    sectionPaddingY: string;
    cardPadding: string;
  };
  borderRadius: {
    card: string;
    button: string;
    badge: string;
  };
  hero: {
    layout: 'split-right-image' | 'centered' | 'editorial-minimal' | 'lead-capture-focused';
    hasSearchOrQuickContact: boolean;
    hasOnlineBadge: boolean;
  };
  servicesSection: {
    layout: 'grid-3' | 'horizontal-cards' | 'editorial-list' | 'interactive-bento';
    hasIcons: boolean;
    hasBadges: boolean;
  };
  aboutSection: {
    layout: 'two-column-story' | 'timeline' | 'quote-centered' | 'stat-highlight-story';
    hasCredentialsBadge: boolean;
  };
  footer: {
    layout: 'multi-column-rich' | 'minimal-bottom' | 'stacked-centered';
  };
}

/**
 * Síntese de 4 DesignSpecs exclusivas e sob medida com DNA Google Stitch
 * Inspiradas em projetos de alto padrão visual (como Serene Haven / psicologia.servicos.ia.br, Modern Bento, etc.)
 */
export function generateDesignSpecs(data: OnboardingData): Record<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D', DesignSpec> {
  const customPrimary = data.primaryColor && data.primaryColor !== '#0f172a' ? data.primaryColor : undefined;
  const customSecondary = data.secondaryColor && data.secondaryColor !== '#3b82f6' ? data.secondaryColor : undefined;
  const customAccent = data.accentColor && data.accentColor !== '#10b981' ? data.accentColor : undefined;

  return {
    // MODELO A: Serene Haven / Equilíbrio Orgânico & Acolhimento (Estilo psicologia.servicos.ia.br do Stitch)
    MODEL_A: {
      id: 'spec_model_a',
      variant: 'MODEL_A',
      name: 'Serene Haven',
      tagline: 'Equilíbrio, Acolhimento & Tipografia Nobre',
      description: 'Design orgânico com paleta botânica e mineral (verde sábio/terracota), tons quentes de linho natural e tipografia Playfair Display.',
      colors: {
        primary: customPrimary || '#2e4f43',
        secondary: customSecondary || '#c88770',
        accent: customAccent || '#3b6154',
        background: '#fbf9f6',
        foreground: '#1e2824',
        muted: '#f3efea',
        card: '#ffffff',
        border: '#e8e2d9',
      },
      typography: {
        headingFont: "'Playfair Display', Georgia, serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        baseSize: '16px',
        heroHeadingSize: 'text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight font-serif',
      },
      spacing: {
        containerMaxWidth: 'max-w-6xl',
        sectionPaddingY: 'py-20 md:py-28',
        cardPadding: 'p-8 md:p-10',
      },
      borderRadius: {
        card: 'rounded-3xl border border-[#e8e2d9] shadow-sm bg-white',
        button: 'rounded-full',
        badge: 'rounded-full',
      },
      hero: {
        layout: 'split-right-image',
        hasSearchOrQuickContact: true,
        hasOnlineBadge: true,
      },
      servicesSection: {
        layout: 'grid-3',
        hasIcons: true,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'two-column-story',
        hasCredentialsBadge: true,
      },
      footer: {
        layout: 'multi-column-rich',
      },
    },

    // MODELO B: Midnight Luminescence / Dark Elegance Stitch
    MODEL_B: {
      id: 'spec_model_b',
      variant: 'MODEL_B',
      name: 'Midnight Luminescence',
      tagline: 'Nocturnal Chic & Vidro Fosco',
      description: 'Estética noturna refinada com superfícies em camadas obsidiana, bordas com bioluminescência sutil e contraste cristalino.',
      colors: {
        primary: customPrimary || '#0f172a',
        secondary: customSecondary || '#38bdf8',
        accent: customAccent || '#10b981',
        background: '#090d16',
        foreground: '#f8fafc',
        muted: '#131c2e',
        card: '#0f172a',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      typography: {
        headingFont: "'Plus Jakarta Sans', sans-serif",
        bodyFont: "'Inter', sans-serif",
        baseSize: '16px',
        heroHeadingSize: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-7xl',
        sectionPaddingY: 'py-24 md:py-32',
        cardPadding: 'p-8 md:p-10',
      },
      borderRadius: {
        card: 'rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md shadow-2xl',
        button: 'rounded-xl',
        badge: 'rounded-full',
      },
      hero: {
        layout: 'split-right-image',
        hasSearchOrQuickContact: true,
        hasOnlineBadge: true,
      },
      servicesSection: {
        layout: 'horizontal-cards',
        hasIcons: true,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'two-column-story',
        hasCredentialsBadge: true,
      },
      footer: {
        layout: 'multi-column-rich',
      },
    },

    // MODELO C: Atelier Editorial / Nobreza Clássica Stitch
    MODEL_C: {
      id: 'spec_model_c',
      variant: 'MODEL_C',
      name: 'Atelier Editorial',
      tagline: 'Minimalismo Literário & Alta Autoridade',
      description: 'Respiro generoso de páginas de alta curadoria, contrastes orgânicos quentes, selos finos e diagramação jornalística nobre.',
      colors: {
        primary: customPrimary || '#1c1917',
        secondary: customSecondary || '#78716c',
        accent: customAccent || '#b45309',
        background: '#faf7f2',
        foreground: '#1c1917',
        muted: '#f0ece1',
        card: '#ffffff',
        border: '#e4dec3',
      },
      typography: {
        headingFont: "'Playfair Display', Georgia, serif",
        bodyFont: "'Plus Jakarta Sans', Inter, sans-serif",
        baseSize: '16px',
        heroHeadingSize: 'text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-[1.12]',
      },
      spacing: {
        containerMaxWidth: 'max-w-5xl',
        sectionPaddingY: 'py-24 md:py-32',
        cardPadding: 'p-10',
      },
      borderRadius: {
        card: 'rounded-none border border-stone-300 bg-white shadow-sm',
        button: 'rounded-none tracking-widest text-xs uppercase',
        badge: 'rounded-none',
      },
      hero: {
        layout: 'editorial-minimal',
        hasSearchOrQuickContact: true,
        hasOnlineBadge: true,
      },
      servicesSection: {
        layout: 'editorial-list',
        hasIcons: false,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'quote-centered',
        hasCredentialsBadge: true,
      },
      footer: {
        layout: 'stacked-centered',
      },
    },

    // MODELO D: Modern Bento Pulse / Google Stitch Conversão
    MODEL_D: {
      id: 'spec_model_d',
      variant: 'MODEL_D',
      name: 'Modern Bento Pulse',
      tagline: 'Bento Grid Dinâmico & Alta Conversão',
      description: 'Layout moderno com blocos modulares Bento, indicadores de status ativos em tempo real, badges pulsantes e micro-cards de impacto.',
      colors: {
        primary: customPrimary || '#0f172a',
        secondary: customSecondary || '#2563eb',
        accent: customAccent || '#10b981',
        background: '#f8fafc',
        foreground: '#0f172a',
        muted: '#f1f5f9',
        card: '#ffffff',
        border: 'rgba(226, 232, 240, 0.8)',
      },
      typography: {
        headingFont: "'Plus Jakarta Sans', sans-serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        baseSize: '16px',
        heroHeadingSize: 'text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-7xl',
        sectionPaddingY: 'py-20 md:py-28',
        cardPadding: 'p-8',
      },
      borderRadius: {
        card: 'rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 bg-white',
        button: 'rounded-2xl',
        badge: 'rounded-full',
      },
      hero: {
        layout: 'lead-capture-focused',
        hasSearchOrQuickContact: true,
        hasOnlineBadge: true,
      },
      servicesSection: {
        layout: 'interactive-bento',
        hasIcons: true,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'stat-highlight-story',
        hasCredentialsBadge: true,
      },
      footer: {
        layout: 'multi-column-rich',
      },
    },
  };
}
