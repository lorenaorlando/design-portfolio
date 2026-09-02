import { Language } from '../types';

export interface CvPosition {
  role: string;
  period: string;
  bullets?: string[];
}

export interface CvItem {
  company: string;
  positions: CvPosition[];
}

export const CV_DATA_EN: CvItem[] = [
  {
    company: 'Puentes',
    positions: [
      {
        role: 'Webmaster',
        period: 'March 2025 - Present',
        bullets: ['Content updates and maintenance.'],
      },
    ],
  },
  {
    company: 'Las Escuchadoras',
    positions: [
      {
        role: 'Webmaster',
        period: 'December 2024 - Present',
        bullets: ['Content updates and maintenance.'],
      },
      {
        role: 'Web Designer in Squarespace',
        period: 'March 2024 - June 2024',
        bullets: ['Landing page creation'],
      },
    ],
  },
  {
    company: 'Afrochingonas',
    positions: [
      {
        role: 'Webmaster',
        period: 'December 2022 - December 2025',
        bullets: ['Content updates and maintenance.'],
      },
      {
        role: 'Web Designer in Wordpress',
        period: 'March 2022 - November 2022',
        bullets: [
          'Customization in CSS.',
          'Creation of business email accounts.',
          'WooCommerce setting.',
        ],
      },
    ],
  },
  {
    company: 'Caresaga',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'February 2026 - April 2025',
        bullets: ['Website Redesign', 'Brand Identity Redesign'],
      },
    ],
  },
  {
    company: 'Venezuelan Film Services',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'November 2025 - December 2025',
      },
    ],
  },
  {
    company: 'Colmena de Escritores',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'August 2025 - November 2025',
      },
    ],
  },
  {
    company: 'Antroposabores',
    positions: [
      {
        role: 'Web Designer in Wordpress',
        period: 'June 2025 - July 2025',
      },
    ],
  },
  {
    company: 'Brigitte Olivares',
    positions: [
      {
        role: 'Web designer in Framer',
        period: 'November 2025 - December 2025',
      },
    ],
  },
  {
    company: 'José Ramírez Guaigua',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'August 2025 - September 2025',
      },
    ],
  },
  {
    company: 'Gianni Felice',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'August 2025 - November 2025',
        bullets: ['Update with new content.'],
      },
    ],
  },
  {
    company: 'Lunaria Ritual',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'August 2025 - October 2025',
        bullets: ['Brand Designer', 'Creation of business email accounts.'],
      },
    ],
  },
  {
    company: 'Technicolor',
    positions: [
      {
        role: 'Web Designer in Wordpress',
        period: 'May 2024 - July 2024',
        bullets: ['EPK design'],
      },
    ],
  },
  {
    company: 'Del Siervo',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'March 2024 - April 2024',
        bullets: ['Branding design'],
      },
    ],
  },
  {
    company: 'Freelanzate al éxito',
    positions: [
      {
        role: 'Web Designer in Wordpress',
        period: 'September 2024 - October 2024',
      },
    ],
  },
  {
    company: 'JEVA ORG',
    positions: [
      {
        role: 'Web designer in Webflow',
        period: 'November 2023 - May 2024',
        bullets: ['Update with new content.', 'Company email setup.'],
      },
    ],
  },
  {
    company: 'Jarina de Marco',
    positions: [
      {
        role: 'Web designer in Squarespace',
        period: 'September 2023',
      },
    ],
  },
  {
    company: 'NFTecnológica',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'September 2023',
      },
    ],
  },
  {
    company: 'Ni gracias ni no',
    positions: [
      {
        role: 'Web designer in Wordpress',
        period: 'March 2023 - April 2023',
      },
    ],
  },
  {
    company: 'El Bus TV',
    positions: [
      {
        role: 'Mock up designer',
        period: '2018',
      },
    ],
  },
  {
    company: 'Draidel',
    positions: [
      {
        role: 'Full-time Web designer (WordPress, HTML, CSS)',
        period: '2016 - 2017',
      },
    ],
  },
];

export const CV_DATA_ES: CvItem[] = [
  {
    company: 'Puentes',
    positions: [
      {
        role: 'Webmaster',
        period: 'Marzo 2025 - Presente',
        bullets: ['Actualizaciones de contenido y mantenimiento.'],
      },
    ],
  },
  {
    company: 'Las Escuchadoras',
    positions: [
      {
        role: 'Webmaster',
        period: 'Diciembre 2024 - Presente',
        bullets: ['Actualizaciones de contenido y mantenimiento.'],
      },
      {
        role: 'Diseñadora Web en Squarespace',
        period: 'Marzo 2024 - Junio 2024',
        bullets: ['Creación de landing page'],
      },
    ],
  },
  {
    company: 'Afrochingonas',
    positions: [
      {
        role: 'Webmaster',
        period: 'Diciembre 2022 - Diciembre 2025',
        bullets: ['Actualizaciones de contenido y mantenimiento.'],
      },
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Marzo 2022 - Noviembre 2022',
        bullets: [
          'Personalización en CSS.',
          'Creación de cuentas de correo corporativas.',
          'Configuración de WooCommerce.',
        ],
      },
    ],
  },
  {
    company: 'Caresaga',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Febrero 2026 - Abril 2025',
        bullets: ['Rediseño de sitio web', 'Rediseño de identidad de marca'],
      },
    ],
  },
  {
    company: 'Venezuelan Film Services',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Noviembre 2025 - Diciembre 2025',
      },
    ],
  },
  {
    company: 'Colmena de Escritores',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Agosto 2025 - Noviembre 2025',
      },
    ],
  },
  {
    company: 'Antroposabores',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Junio 2025 - Julio 2025',
      },
    ],
  },
  {
    company: 'Brigitte Olivares',
    positions: [
      {
        role: 'Diseñadora Web en Framer',
        period: 'Noviembre 2025 - Diciembre 2025',
      },
    ],
  },
  {
    company: 'José Ramírez Guaigua',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Agosto 2025 - Septiembre 2025',
      },
    ],
  },
  {
    company: 'Gianni Felice',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Agosto 2025 - Noviembre 2025',
        bullets: ['Actualización con nuevo contenido.'],
      },
    ],
  },
  {
    company: 'Lunaria Ritual',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Agosto 2025 - Octubre 2025',
        bullets: ['Diseñadora de Marca', 'Creación de cuentas de correo corporativas.'],
      },
    ],
  },
  {
    company: 'Technicolor',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Mayo 2024 - Julio 2024',
        bullets: ['Diseño de EPK'],
      },
    ],
  },
  {
    company: 'Del Siervo',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Marzo 2024 - Abril 2024',
        bullets: ['Diseño de branding'],
      },
    ],
  },
  {
    company: 'Freelanzate al éxito',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Septiembre 2024 - Octubre 2024',
      },
    ],
  },
  {
    company: 'JEVA ORG',
    positions: [
      {
        role: 'Diseñadora Web en Webflow',
        period: 'Noviembre 2023 - Mayo 2024',
        bullets: ['Actualización con nuevo contenido.', 'Configuración de correos corporativos.'],
      },
    ],
  },
  {
    company: 'Jarina de Marco',
    positions: [
      {
        role: 'Diseñadora Web en Squarespace',
        period: 'Septiembre 2023',
      },
    ],
  },
  {
    company: 'NFTecnológica',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Septiembre 2023',
      },
    ],
  },
  {
    company: 'Ni gracias ni no',
    positions: [
      {
        role: 'Diseñadora Web en Wordpress',
        period: 'Marzo 2023 - Abril 2023',
      },
    ],
  },
  {
    company: 'El Bus TV',
    positions: [
      {
        role: 'Diseñadora de Mockups',
        period: '2018',
      },
    ],
  },
  {
    company: 'Draidel',
    positions: [
      {
        role: 'Diseñadora Web Tiempo Completo (WordPress, HTML, CSS)',
        period: '2016 - 2017',
      },
    ],
  },
];

export function getCvData(lang?: Language | string): CvItem[] {
  return lang === 'en' ? CV_DATA_EN : CV_DATA_ES;
}
