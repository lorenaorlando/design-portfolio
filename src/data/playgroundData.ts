import { Language } from '../types';

export interface PlaygroundItem {
  slug: string;
  /** File-style window title, e.g. "tarot.app". */
  file: string;
  title: Record<Language, string>;
  tools: string;
  color: string;
  /** Leave empty until the real description arrives; the page shows a placeholder. */
  description?: Record<Language, string>;
  images?: string[];
  url?: string;
}

// Placeholders: titles, tools and media get filled in with the real projects.
export const PLAYGROUND: PlaygroundItem[] = [
  {
    slug: 'tarot',
    file: 'tarot.app',
    title: { es: 'Apps de tarot', en: 'Tarot apps' },
    tools: '',
    color: '#7C3AED',
  },
  {
    slug: 'web-personal',
    file: 'lorena.web',
    title: { es: 'Mi web personal', en: 'My personal site' },
    tools: '',
    color: '#EC4899',
  },
  {
    slug: 'experimentos-3d',
    file: 'experimentos.3d',
    title: { es: 'Experimentos 3D', en: '3D experiments' },
    tools: '',
    color: '#06B6D4',
  },
];
