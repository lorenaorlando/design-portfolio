import { Language } from '../types';

export interface ServiceItem {
  id: string;
  category: 'visual' | 'web' | 'adicionales' | 'especializadas' | 'extras' | 'otros';
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  priceUSD: number;
}

export interface ServiceCategory {
  id: 'visual' | 'web' | 'adicionales' | 'especializadas' | 'extras' | 'otros';
  name: {
    es: string;
    en: string;
  };
  code: string;
  icon?: string;
}

export const PRICING_CATEGORIES: ServiceCategory[] = [
  { id: 'visual', name: { es: 'Diseño Visual', en: 'Visual Design' }, code: 'CAT-01' },
  { id: 'web', name: { es: 'Diseño Web', en: 'Web Design' }, code: 'CAT-02' },
  { id: 'adicionales', name: { es: 'Adicionales', en: 'Add-ons' }, code: 'CAT-03' },
  { id: 'especializadas', name: { es: 'Webs Especializadas', en: 'Specialized Sites' }, code: 'CAT-04' },
  { id: 'extras', name: { es: 'Extras', en: 'Extras & Motion' }, code: 'CAT-05' },
  { id: 'otros', name: { es: 'Otros Servicios', en: 'Other Services' }, code: 'CAT-06' },
];

export const PRICING_SERVICES: ServiceItem[] = [
  // 1. Diseño Visual
  {
    id: 'vis-branding',
    category: 'visual',
    name: {
      es: 'Identidad Visual (Branding)',
      en: 'Visual Identity (Branding)',
    },
    description: {
      es: 'Creación de la imagen de marca: logotipo, paleta de colores, tipografías y sistema visual.',
      en: 'Creation of the brand image: logo, color palette, typography and visual system.',
    },
    priceUSD: 389.00,
  },
  {
    id: 'vis-guidelines',
    category: 'visual',
    name: {
      es: 'Manual de Identidad de Marca (Brand Guidelines)',
      en: 'Brand Identity Guidelines Manual',
    },
    description: {
      es: 'Documentación que define las reglas de uso del logotipo, paletas tipográficas y colores para mantener la consistencia en cualquier formato.',
      en: 'Documentation defining logo usage rules, typography, and color palettes to maintain consistency across all formats.',
    },
    priceUSD: 289.10,
  },
  {
    id: 'vis-social',
    category: 'visual',
    name: {
      es: 'Diseño de Contenido para Redes Sociales',
      en: 'Social Media Content Design',
    },
    description: {
      es: 'Creación de plantillas y piezas gráficas adaptadas a la identidad de la marca para mantener coherencia visual en plataformas digitales.',
      en: 'Creation of templates and graphic assets adapted to the brand identity for visual coherence across digital platforms.',
    },
    priceUSD: 182.90,
  },
  {
    id: 'vis-assets',
    category: 'visual',
    name: {
      es: 'Creación y Curaduría de Assets Visuales',
      en: 'Visual Asset Creation & Curation',
    },
    description: {
      es: 'Búsqueda, selección y diseño de recursos gráficos complementarios (íconos, ilustraciones, gráficos o imágenes de stock) cuando no se cuenta con material propio.',
      en: 'Search, curation, and custom design of complementary graphics (icons, illustrations, vectors, stock imagery) when original material is lacking.',
    },
    priceUSD: 136.90,
  },
  {
    id: 'vis-photo',
    category: 'visual',
    name: {
      es: 'Edición y Optimización de Fotografías',
      en: 'Photo Retouching & Optimization',
    },
    description: {
      es: 'Retoque, ajuste tonal y compresión técnica de imágenes para asegurar su optimización en los proyectos donde sean usadas.',
      en: 'Retouching, tonal balance, and technical image compression to ensure peak optimization across digital environments.',
    },
    priceUSD: 118.90,
  },
  {
    id: 'vis-art-direction',
    category: 'visual',
    name: {
      es: 'Dirección de Arte y UI Kit (Dirección Visual Web)',
      en: 'Art Direction & UI Kit (Web Visual Direction)',
    },
    description: {
      es: 'Diseño conceptual previo al desarrollo web para proyectos que ya tienen un branding definido pero necesitan creación de y conceptualización de maquetas (mockups) y estilo visual en pantalla.',
      en: 'Pre-development conceptual design for established brandings requiring screen mockups and overarching digital visual art direction.',
    },
    priceUSD: 289.10,
  },
  {
    id: 'vis-ui-ux',
    category: 'visual',
    name: {
      es: 'Diseño UI/UX',
      en: 'UI/UX Interface & Experience Design',
    },
    description: {
      es: 'Diseño enfocado en la experiencia del usuario y la interfaz. Analiza la estructura, la navegación intuitiva y la facilidad de uso.',
      en: 'Human-centered user interface and experience design analyzing structure, frictionless navigation, and usability.',
    },
    priceUSD: 389.00,
  },
  {
    id: 'vis-proto',
    category: 'visual',
    name: {
      es: 'Prototipado Interactivo de Apps',
      en: 'Interactive App Prototyping (Figma)',
    },
    description: {
      es: 'Diseño visual y simulación interactiva del funcionamiento de una aplicación en Figma, sin programación, ideal para probar antes de desarrollarla.',
      en: 'Visual design and interactive simulation of application flows in Figma, code-free, ideal for testing before full engineering.',
    },
    priceUSD: 479.00,
  },

  // 2. Diseño Web
  {
    id: 'web-landing-basic',
    category: 'web',
    name: {
      es: 'Landing Page Básica',
      en: 'Basic Landing Page',
    },
    description: {
      es: 'Página única, informativa y estructurada para un objetivo específico.',
      en: 'Single-page website, concise, informative, and structured for a specific conversion goal.',
    },
    priceUSD: 289.10,
  },
  {
    id: 'web-landing-conv',
    category: 'web',
    name: {
      es: 'Landing Page para Conversión de Clientes',
      en: 'High-Conversion Lead Landing Page',
    },
    description: {
      es: 'Página única con sistemas de leads de ventas y optimización para motores de búsqueda e IA.',
      en: 'Single-page powerhouse engineered with sales lead capture flows and search engine / AI discoverability.',
    },
    priceUSD: 389.00,
  },
  {
    id: 'web-site-3',
    category: 'web',
    name: {
      es: 'Sitio de 3 Secciones',
      en: '3-Section Website',
    },
    description: {
      es: 'Sitio web esencial para negocios o proyectos pequeños (por ejemplo: Inicio, Servicios y Contacto).',
      en: 'Essential website architecture for businesses or compact projects (e.g. Home, Services, Contact).',
    },
    priceUSD: 479.00,
  },
  {
    id: 'web-site-4',
    category: 'web',
    name: {
      es: 'Sitio de 4 Secciones',
      en: '4-Section Website',
    },
    description: {
      es: 'Sitio web estándar con secciones extra según las necesidades del proyecto.',
      en: 'Standard web presence with dedicated custom sub-sections tailored to project needs.',
    },
    priceUSD: 538.40,
  },
  {
    id: 'web-site-5',
    category: 'web',
    name: {
      es: 'Sitio de 5 Secciones',
      en: '5-Section Full Website',
    },
    description: {
      es: 'Plataforma web completa para presentar servicios, equipo, catálogo o portafolios y formularios avanzados.',
      en: 'Comprehensive platform to showcase full services, team rosters, product catalogs/portfolios, and dynamic forms.',
    },
    priceUSD: 638.00,
  },

  // 3. Adicionales
  {
    id: 'add-blog-module',
    category: 'adicionales',
    name: {
      es: 'Módulo Adicional 1: Blog / Revista Digital',
      en: 'Add-on Module 1: Blog / Digital Magazine',
    },
    description: {
      es: 'Sección integrada a un sitio web para publicar artículos, noticias o contenido editorial de forma sencilla.',
      en: 'Integrated CMS section on your website to publish articles, news updates, or editorial content effortlessly.',
    },
    priceUSD: 182.90,
  },
  {
    id: 'add-shop-module',
    category: 'adicionales',
    name: {
      es: 'Módulo Adicional 2: Tienda Online',
      en: 'Add-on Module 2: E-Commerce Store',
    },
    description: {
      es: 'Sitio web optimizado para ventas online. Incluye catálogo de productos, sistematización de data y pasarela de pagos.',
      en: 'Optimized online store module with product catalogs, transaction pipelines, and secure checkout gateways.',
    },
    priceUSD: 389.00,
  },

  // 4. Webs Especializadas
  {
    id: 'esp-blog-platform',
    category: 'especializadas',
    name: {
      es: 'Solo Plataforma de Blog / Revista Digital / Medio independiente',
      en: 'Dedicated Blog / Digital Magazine / Independent Media Platform',
    },
    description: {
      es: 'Sitio web enfocado 100% en la publicación de artículos, revistas digitales o medios independientes.',
      en: 'Complete standalone digital portal crafted 100% for journalism, editorial magazines, or independent cultural media.',
    },
    priceUSD: 538.40,
  },
  {
    id: 'esp-ecommerce-only',
    category: 'especializadas',
    name: {
      es: 'Solo Tienda Online',
      en: 'Dedicated E-Commerce Platform',
    },
    description: {
      es: 'Sitio web hecho únicamente para la venta de artículos online.',
      en: 'Pure e-commerce digital flagship built specifically for online product sales and inventory handling.',
    },
    priceUSD: 749.00,
  },
  {
    id: 'esp-artist-portfolio',
    category: 'especializadas',
    name: {
      es: 'Portafolio Artístico y Creativo',
      en: 'Artistic & Creative Portfolio',
    },
    description: {
      es: 'Sitio web diseñado especialmente para artistas de toda índole y creadores de contenido en función de mostrar su trayectoria y trabajos artísticos.',
      en: 'Custom tailored site for artists, creators, and performers to present career trajectories and creative archives.',
    },
    priceUSD: 479.00,
  },

  // 5. Extras
  {
    id: 'ext-motion-ui',
    category: 'extras',
    name: {
      es: 'Efectos de Animación y Motion UI',
      en: 'Motion UI & Interactive Animations',
    },
    description: {
      es: 'Implementación de animaciones, microinteracciones y efectos de movimiento para hacer la experiencia web más dinámica.',
      en: 'Implementation of micro-interactions, motion graphics, and kinetic transitions for dynamic user engagement.',
    },
    priceUSD: 136.90,
  },
  {
    id: 'ext-ux-writing',
    category: 'extras',
    name: {
      es: 'Redacción de Contenido y UI/UX Writing',
      en: 'Content Copywriting & UI/UX Writing',
    },
    description: {
      es: 'Creación y/o adaptación de los textos del sitio web, estructurados para guiar al usuario y transmitir el mensaje con claridad.',
      en: 'Crafting and refining web copy structured to guide visitors and articulate core messaging clearly.',
    },
    priceUSD: 182.90,
  },

  // 6. Otros Servicios
  {
    id: 'otr-webmaster',
    category: 'otros',
    name: {
      es: 'Servicio de Webmaster (Mantenimiento Técnico)',
      en: 'Webmaster Maintenance & Security Care',
    },
    description: {
      es: 'Gestión técnica mensual que incluye monitoreo de seguridad, actualización de plugins/sistema, respaldos continuos, optimización de velocidad y actualización de contenido constante.',
      en: 'Monthly technical care: security monitoring, engine/plugin updates, continuous backups, speed tuning, and ongoing content updates.',
    },
    priceUSD: 274.70,
  },
  {
    id: 'otr-redesign',
    category: 'otros',
    name: {
      es: 'Rediseño Web',
      en: 'Website Redesign & Modernization',
    },
    description: {
      es: 'Renovación visual y técnica de un sitio web existente para modernizar su aspecto, mejorar la velocidad y adaptarlo a teléfonos móviles.',
      en: 'Complete visual and technical overhaul of an existing site to modernize aesthetic, improve speed, and achieve flawless mobile responsiveness.',
    },
    priceUSD: 479.00,
  },
  {
    id: 'otr-migration',
    category: 'otros',
    name: {
      es: 'Recuperación de webs / Migración de Hosting y Dominios',
      en: 'Website Recovery / Hosting & Domain Migration',
    },
    description: {
      es: 'Gestión técnica para mover un sitio web de servidor, cambiar de proveedor o configurar correctamente dominios y registros DNS. Diagnóstico de fallas presentadas en una web existente.',
      en: 'Server migration, hosting transfers, DNS configurations, and critical fault diagnosis/recovery on existing platforms.',
    },
    priceUSD: 182.90,
  },
  {
    id: 'otr-email-setup',
    category: 'otros',
    name: {
      es: 'Configuración de Correos Corporativos',
      en: 'Corporate Domain Email Setup',
    },
    description: {
      es: 'Creación y vinculación de cuentas de correo profesional asociadas a un dominio propio (ejemplo: contacto@tudominio.com).',
      en: 'Provisioning and linkage of custom domain professional mailboxes (e.g. contact@yourdomain.com).',
    },
    priceUSD: 73.90,
  },
  {
    id: 'otr-content-update',
    category: 'otros',
    name: {
      es: 'Actualización Puntual de Contenido',
      en: 'On-Demand Content Update',
    },
    description: {
      es: 'Servicio por demanda para modificar textos, cambiar imágenes o añadir nuevo contenido en una web existente.',
      en: 'On-demand service to update copy, replace images, or insert new sections in existing web properties.',
    },
    priceUSD: 91.90,
  },
  {
    id: 'otr-backup',
    category: 'otros',
    name: {
      es: 'Respaldo y Copias de Seguridad Web',
      en: 'Full Website Backup & Archive Snapshot',
    },
    description: {
      es: 'Generación de copias de seguridad de archivos y bases de datos para proteger la información ante cualquier falla técnica.',
      en: 'Comprehensive snapshot creation of files and databases to ensure total data protection against technical contingencies.',
    },
    priceUSD: 65.90,
  },
];

// Reference currency rates (approximate)
export const EXCHANGE_RATES = {
  USD: 1,
  COP: 3950, // 1 USD ~ 3,950 COP
  CLP: 940,  // 1 USD ~ 940 CLP
};

export const formatCurrency = (amountUSD: number, currency: 'USD' | 'COP' | 'CLP'): string => {
  if (currency === 'USD') {
    return `$${amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  }
  if (currency === 'COP') {
    const copAmount = Math.round(amountUSD * EXCHANGE_RATES.COP);
    return `$${copAmount.toLocaleString('es-CO')} COP`;
  }
  if (currency === 'CLP') {
    const clpAmount = Math.round(amountUSD * EXCHANGE_RATES.CLP);
    return `$${clpAmount.toLocaleString('es-CL')} CLP`;
  }
  return `$${amountUSD.toFixed(2)} USD`;
};
