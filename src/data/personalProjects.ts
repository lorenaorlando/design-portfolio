import { Language } from '../types';

type Text = Record<Language, string>;

export interface PersonalProject {
  name: string;
  url: string;
  kind: Text;
  description: Text;
  tags: Text[];
}

/** Highlighted on the CV (page and PDF) as a special section. */
export const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    name: 'pragmagick.app',
    url: 'https://pragmagick.app',
    kind: { es: 'Creación de apps', en: 'App creation' },
    description: {
      es: 'Apps de tarot y astrología. Branding inspirado en el tarot, interpretaciones escritas a mano y experiencia móvil.',
      en: 'Tarot and astrology apps. Tarot-inspired branding, hand-written card meanings and a mobile-first experience.',
    },
    tags: [
      { es: 'Diseño de producto', en: 'Product design' },
      { es: 'UX/UI', en: 'UX/UI' },
      { es: 'Vibe coding', en: 'Vibe coding' },
    ],
  },
  {
    name: 'funscroll.life',
    url: 'https://funscroll.life',
    kind: { es: 'Web manifiesto + kit', en: 'Manifesto site + kit' },
    description: {
      es: 'Un internet que no quiere retenerte: manifiesto contra el doomscroll, galería de webs y kit de efectos de scroll.',
      en: 'An internet that doesn’t want to keep you: an anti-doomscroll manifesto, a gallery of sites and a scroll effects kit.',
    },
    tags: [
      { es: 'Concepto', en: 'Concept' },
      { es: 'Interacción', en: 'Interaction' },
      { es: 'Código abierto', en: 'Open source' },
    ],
  },
  {
    name: 'lorenaorlando.com',
    url: 'https://lorenaorlando.com',
    kind: { es: 'Web personal de artista', en: 'Personal artist site' },
    description: {
      es: 'Un universo que reúne música, fotografía, escritura, net art, 3D y magia, con identidad y manual de marca propios.',
      en: 'A universe bringing together music, photography, writing, net art, 3D and magick, with its own identity and brand guidelines.',
    },
    tags: [
      { es: 'Branding', en: 'Branding' },
      { es: 'Dirección visual', en: 'Visual direction' },
      { es: '3D', en: '3D' },
    ],
  },
];
