import type { OnboardingData } from '../validation/onboarding';

export interface DesignSpec {
  id: string;
  variant: 'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D';
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
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
    layout: 'centered' | 'split-right-image' | 'editorial-minimal' | 'badge-overlay' | 'lead-capture-focused';
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
 * Síntese de 4 DesignSpecs sob medida a partir dos dados do Profissional Liberal
 * Integrando os princípios e diretrizes do Google Stitch Design DNA.
 */
export function generateDesignSpecs(data: OnboardingData): Record<'MODEL_A' | 'MODEL_B' | 'MODEL_C' | 'MODEL_D', DesignSpec> {
  const primary = data.primaryColor || '#0f172a';
  const secondary = data.secondaryColor || '#3b82f6';
  const accent = data.accentColor || '#10b981';

  return {
    MODEL_A: {
      id: 'spec_model_a',
      variant: 'MODEL_A',
      name: 'Institucional Confiável',
      description: 'Estrutura tradicional, altamente organizada, seções claras e foco em solidez e credibilidade.',
      colors: {
        primary: primary,
        secondary: secondary,
        accent: accent,
        background: '#ffffff',
        foreground: '#1e293b',
        muted: '#f8fafc',
        card: '#ffffff',
      },
      typography: {
        headingFont: 'Outfit, Inter, sans-serif',
        bodyFont: 'Inter, sans-serif',
        baseSize: '16px',
        heroHeadingSize: 'text-4xl md:text-5xl font-bold tracking-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-7xl',
        sectionPaddingY: 'py-20',
        cardPadding: 'p-8',
      },
      borderRadius: {
        card: 'rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow',
        button: 'rounded-lg',
        badge: 'rounded-full',
      },
      hero: {
        layout: 'split-right-image',
        hasSearchOrQuickContact: true,
        hasOnlineBadge: data.attendanceType !== 'presencial',
      },
      servicesSection: {
        layout: 'grid-3',
        hasIcons: true,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'two-column-story',
        hasCredentialsBadge: data.hasProfessionalCouncil,
      },
      footer: {
        layout: 'multi-column-rich',
      },
    },

    MODEL_B: {
      id: 'spec_model_b',
      variant: 'MODEL_B',
      name: 'Moderno Dark Premium',
      description: 'Forte impacto visual, contrastes elegantes, atmosfera noturna, glassmorphism sutil e sofisticação.',
      colors: {
        primary: primary,
        secondary: secondary,
        accent: accent,
        background: '#090d16',
        foreground: '#f8fafc',
        muted: '#131c2e',
        card: '#0f172a',
      },
      typography: {
        headingFont: 'Plus Jakarta Sans, sans-serif',
        bodyFont: 'Inter, sans-serif',
        baseSize: '16px',
        heroHeadingSize: 'text-5xl md:text-6xl font-extrabold tracking-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-7xl',
        sectionPaddingY: 'py-24',
        cardPadding: 'p-10',
      },
      borderRadius: {
        card: 'rounded-2xl border border-slate-800 shadow-xl shadow-slate-950/50 hover:-translate-y-1 transition-all duration-300',
        button: 'rounded-xl',
        badge: 'rounded-md',
      },
      hero: {
        layout: 'centered',
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

    MODEL_C: {
      id: 'spec_model_c',
      variant: 'MODEL_C',
      name: 'Minimalista Editorial',
      description: 'Espaço generoso, foco total no conteúdo, tipografia clássica nobre e elegância executiva sóbria.',
      colors: {
        primary: '#1c1917',
        secondary: primary,
        accent: accent,
        background: '#faf9f6',
        foreground: '#1c1917',
        muted: '#f4f2eb',
        card: '#ffffff',
      },
      typography: {
        headingFont: 'Playfair Display, Cinzel, Georgia, serif',
        bodyFont: 'Plus Jakarta Sans, Inter, sans-serif',
        baseSize: '16px',
        heroHeadingSize: 'text-4xl md:text-5xl font-serif font-normal leading-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-6xl',
        sectionPaddingY: 'py-24',
        cardPadding: 'p-8',
      },
      borderRadius: {
        card: 'rounded-none border border-stone-300 bg-white p-8 shadow-sm',
        button: 'rounded-none uppercase tracking-wider text-xs',
        badge: 'rounded-none',
      },
      hero: {
        layout: 'editorial-minimal',
        hasSearchOrQuickContact: false,
        hasOnlineBadge: data.attendanceType !== 'presencial',
      },
      servicesSection: {
        layout: 'editorial-list',
        hasIcons: false,
        hasBadges: true,
      },
      aboutSection: {
        layout: 'quote-centered',
        hasCredentialsBadge: data.hasProfessionalCouncil,
      },
      footer: {
        layout: 'stacked-centered',
      },
    },

    MODEL_D: {
      id: 'spec_model_d',
      variant: 'MODEL_D',
      name: 'Consultoria & Alta Conversão (Stitch Pulse)',
      description: 'Estrutura contemporânea estilo SaaS/Consultoria com cartões Bento Grid, badge flutuante e foco em agendamento.',
      colors: {
        primary: primary,
        secondary: '#0ea5e9',
        accent: '#10b981',
        background: '#f8fafc',
        foreground: '#0f172a',
        muted: '#e2e8f0',
        card: '#ffffff',
      },
      typography: {
        headingFont: 'Plus Jakarta Sans, sans-serif',
        bodyFont: 'Inter, sans-serif',
        baseSize: '16px',
        heroHeadingSize: 'text-4xl md:text-6xl font-black tracking-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-7xl',
        sectionPaddingY: 'py-20',
        cardPadding: 'p-8',
      },
      borderRadius: {
        card: 'rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-slate-300 transition-all',
        button: 'rounded-2xl shadow-md hover:shadow-lg',
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
