import type { OnboardingData } from '../validation/onboarding';

export interface DesignSpec {
  id: string;
  variant: 'MODEL_A' | 'MODEL_B' | 'MODEL_C';
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
    layout: 'centered' | 'split-right-image' | 'editorial-minimal' | 'badge-overlay';
    hasSearchOrQuickContact: boolean;
    hasOnlineBadge: boolean;
  };
  servicesSection: {
    layout: 'grid-3' | 'horizontal-cards' | 'editorial-list';
    hasIcons: boolean;
    hasBadges: boolean;
  };
  aboutSection: {
    layout: 'two-column-story' | 'timeline' | 'quote-centered';
    hasCredentialsBadge: boolean;
  };
  footer: {
    layout: 'multi-column-rich' | 'minimal-bottom' | 'stacked-centered';
  };
}

/**
 * Síntese do DesignSpec a partir das escolhas e dados do cliente
 */
export function generateDesignSpecs(data: OnboardingData): Record<'MODEL_A' | 'MODEL_B' | 'MODEL_C', DesignSpec> {
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
      name: 'Moderno Premium',
      description: 'Forte impacto visual, contrastes elegantes, microinterações, glassmorphism sutil e sofisticação.',
      colors: {
        primary: primary,
        secondary: secondary,
        accent: accent,
        background: '#f8fafc',
        foreground: '#0f172a',
        muted: '#f1f5f9',
        card: '#ffffff',
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
        card: 'rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300',
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
      description: 'Espaço generoso, foco total no conteúdo, tipografia marcante e elegância refinada sem ruídos.',
      colors: {
        primary: '#111827',
        secondary: primary,
        accent: accent,
        background: '#fcfcfc',
        foreground: '#1c1917',
        muted: '#f5f5f4',
        card: '#ffffff',
      },
      typography: {
        headingFont: 'Cinzel, Georgia, serif',
        bodyFont: 'Inter, sans-serif',
        baseSize: '17px',
        heroHeadingSize: 'text-4xl md:text-5xl font-normal leading-tight',
      },
      spacing: {
        containerMaxWidth: 'max-w-5xl',
        sectionPaddingY: 'py-24',
        cardPadding: 'p-8',
      },
      borderRadius: {
        card: 'rounded-none border-l-2 border-slate-900 bg-white p-8',
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
  };
}
