import { Language } from '../types';

export interface Translations {
  nav: {
    start: string;
    works: string;
    pricing: string;
    about: string;
    cv: string;
  };
  chassis: {
    currently: string;
    available: string;
    power: string;
    navMenu: string;
    contact: string;
    emailCopied: string;
    lang: string;
  };
  topBar: {
    hardwareTitle: string;
    fullHardware: string;
    focusViewport: string;
    mute: string;
    unmute: string;
    reset: string;
    langTooltip: string;
  };
  screen1: {
    lorenaRole: string;
    aboutBtn: string;
    design: string;
    discipline1Title: string;
    discipline1Subtitle: string;
    discipline2Title: string;
    discipline2Subtitle: string;
    discipline3Title: string;
    discipline3Subtitle: string;
    signalStable: string;
    skillsTelemetry: string;
    badgeDesign: string;
    badgeDesignSub: string;
    badgeArt: string;
    badgeArtSub: string;
    webmasterAt: string;
  };
  works: {
    projectsArchive: string;
    worksCount: (count: number) => string;
    scrollDown: string;
    year: string;
    seeCaseStudy: string;
    endOfArchive: string;
    backToTop: string;
    selectedWorks: string;
    prevProject: string;
    nextProject: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    categories: string;
    allCategories: string;
    addBtn: string;
    addedBtn: string;
    removeBtn: string;
    budgetSidebarTitle: string;
    estimatedTotal: string;
    selectedServices: string;
    noServicesSelected: string;
    currencySelector: string;
    copySummaryBtn: string;
    copiedSummaryBtn: string;
    workWithMeBtn: string;
    clearAllBtn: string;
    refRatesNotice: string;
  };
  about: {
    fileReadme: string;
    diagnostics: string;
    stats: {
      designExp: string;
      artisticPath: string;
      webmastering: string;
      photoExp: string;
      happyClients: string;
      years10: string;
      years20: string;
      years5: string;
      proj20: string;
    };
    cvBtn: string;
    backgroundTitle: string;
    backgroundP1: string;
    backgroundP2: string;
    craftTitle: string;
    craftP1: string;
    emailCopied: string;
  };
  cv: {
    title: string;
    docVersion: string;
    role: string;
    summary: string;
    experienceTitle: string;
    chronologicalRecord: string;
    toolsTitle: string;
    backToAbout: string;
    exploreWorks: string;
    present: string;
  };
  caseStudy: {
    back: string;
    prev: string;
    next: string;
    scope: string;
    typeOfClient: string;
    visualArtifact: string;
    hiRes: string;
    motionArtifact: string;
    liveLoop: string;
    caseStudyTag: string;
    returnToWorks: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      start: 'START',
      works: 'WORKS',
      pricing: 'PRICING',
      about: 'ABOUT',
      cv: 'CV',
    },
    chassis: {
      currently: 'CURRENTLY:',
      available: 'AVAILABLE',
      power: 'POWER',
      navMenu: 'NAV MENU',
      contact: 'CONTACT',
      emailCopied: 'EMAIL COPIED!',
      lang: 'LANG',
    },
    topBar: {
      hardwareTitle: 'Data General CRT Frame',
      fullHardware: 'Full Hardware',
      focusViewport: 'Focus Viewport',
      mute: 'Mute audio',
      unmute: 'Unmute audio',
      reset: 'Reset settings',
      langTooltip: 'Switch Language (ES/EN)',
    },
    screen1: {
      lorenaRole: 'CRAFT, DESIGN & INTERFACES',
      aboutBtn: 'ABOUT',
      design: 'DESIGN',
      discipline1Title: 'NO-CODE & FRONTEND',
      discipline1Subtitle: '(FRAMER, FIGMA, WEBFLOW, WORDPRESS, VIBE CODING, HTML/CSS, WEBMASTERING)',
      discipline2Title: 'PRODUCT & INTERFACE',
      discipline2Subtitle: '(UX/UI DESIGN, WEB DESIGN, APP DEVELOPMENT, MOTION & ANIMATION)',
      discipline3Title: 'ART DIRECTION & VISUALS',
      discipline3Subtitle: '(BRANDING, CONCEPT, PHOTOGRAPHY, VISUAL SYSTEMS)',
      signalStable: 'SIGNAL // STABLE',
      skillsTelemetry: 'SKILLS & TELEMETRY',
      badgeDesign: '+10Y DESIGN',
      badgeDesignSub: 'EXPERIENCE & ARCH',
      badgeArt: '+20Y ARTISTIC',
      badgeArtSub: 'CREATIVE PRACTICE',
      webmasterAt: 'WEBMASTER AT:',
    },
    works: {
      projectsArchive: 'PROJECTS ARCHIVE',
      worksCount: (count) => `[${count} WORKS]`,
      scrollDown: '▼ SCROLL DOWN',
      year: 'YEAR:',
      seeCaseStudy: 'SEE CASE STUDY →',
      endOfArchive: 'END OF ARCHIVE',
      backToTop: '▲ BACK TO TOP',
      selectedWorks: 'SELECTED WORKS',
      prevProject: '◀ PREV',
      nextProject: 'NEXT ▶',
    },
    pricing: {
      title: 'SERVICES & BUDGET CALCULATOR',
      subtitle: 'SELECT SERVICES TO BUILD YOUR ESTIMATE IN REAL-TIME',
      categories: 'CATEGORIES',
      allCategories: 'ALL SERVICES',
      addBtn: '+ ADD TO BUDGET',
      addedBtn: '✓ ADDED',
      removeBtn: 'REMOVE',
      budgetSidebarTitle: 'YOUR ESTIMATED BUDGET',
      estimatedTotal: 'ESTIMATED TOTAL',
      selectedServices: 'SELECTED SERVICES',
      noServicesSelected: 'NO SERVICES SELECTED YET. CHOOSE FROM THE CATALOG TO ESTIMATE.',
      currencySelector: 'CURRENCY CONVERTER',
      copySummaryBtn: '📋 COPY BUDGET SUMMARY',
      copiedSummaryBtn: '✓ COPIED TO CLIPBOARD',
      workWithMeBtn: "LET'S WORK TOGETHER!",
      clearAllBtn: 'CLEAR SELECTION',
      refRatesNotice: '* COP & CLP values calculated using approximate reference rates.',
    },
    about: {
      fileReadme: 'FILE: README.TXT',
      diagnostics: 'DIAGNOSTICS',
      stats: {
        designExp: 'DESIGN EXP',
        artisticPath: 'ARTISTIC PATH',
        webmastering: 'WEBMASTERING',
        photoExp: 'PHOTO EXP',
        happyClients: 'HAPPY CLIENTS',
        years10: '+10 YRS',
        years20: '+20 YRS',
        years5: '+5 YRS',
        proj20: '+20 PROJ',
      },
      cvBtn: 'CV',
      backgroundTitle: 'BACKGROUND',
      backgroundP1:
        'I STARTED DESIGNING WEBPAGES IN MY TEENAGE YEARS, BACK ON THE OLD, WILD, RETRO WEB. THIS EVOLVED TROUGH TIME AS I TRIED NEW PLATFORMS AND TOOLS, DEVELOPING A DEEP UNDERSTANDING OF HOW DESIGN WORKS.',
      backgroundP2:
        'WHILE I GREW AS A DESIGNER I RESEARCHED AND STUDIED ALL OF THE DIFFERENT WAYS A VISUAL DISTINCTIVE LANGUAGE CAN TAKE SHAPE: COLOR PALETTES, GRAPHICS, TYPOGRAPHIES, DESIGN TRENDS. I CAN GET LOST FOR HOURS LOOKING INTO THEM, FINDING INSPIRATION.',
      craftTitle: 'CRAFT & INTENTION',
      craftP1:
        "CREATIVE PEOPLE, PROJECTS, INITIATIVES AND CONTENT CREATORS HAVE ALWAYS BEEN IN MY PROFESSIONAL ORBIT BECAUSE I'M AN ARTIST TOO, AND THIS IS MY APPROACH TO ALL THE DIGITAL DESIGN PROJECTS THAT COME MY WAY. I PUT INTENTION, CREATIVITY AND THOUGHT IN MY WORK.",
      emailCopied: 'EMAIL COPIED!',
    },
    cv: {
      title: 'CV',
      docVersion: 'DOCUMENT // VER 2026.09',
      role: 'WEB & VISUAL DESIGNER',
      summary:
        'DIGITAL DESIGNER WITH OVER 10 YEARS OF EXPERIENCE ACROSS WEB DESIGN, BRANDING, AND VISUAL DIRECTION. CURRENTLY WORKING AS A WEBMASTER AT PUENTES AND LAS ESCUCHADORAS. FOCUSED ON SHAPING STRUCTURE AND IDENTITY INTO ENGAGING DIGITAL EXPERIENCES BASED ON THE VISION AND GOALS OF EVERY PROJECT.',
      experienceTitle: '// EXPERIENCE',
      chronologicalRecord: 'CHRONOLOGICAL RECORD',
      toolsTitle: '// DESIGN & DEVELOPMENT TOOLS',
      backToAbout: '← BACK TO ABOUT',
      exploreWorks: 'EXPLORE WORKS ▶',
      present: 'PRESENT',
    },
    caseStudy: {
      back: '← BACK',
      prev: 'PREV',
      next: 'NEXT',
      scope: 'SCOPE:',
      typeOfClient: 'TYPE OF CLIENT:',
      visualArtifact: '[ VISUAL ARTIFACT ]',
      hiRes: '100% HI-RES',
      motionArtifact: '[ MOTION ARTIFACT ]',
      liveLoop: 'LIVE LOOP',
      caseStudyTag: 'CASE STUDY //',
      returnToWorks: '← RETURN TO WORKS',
    },
  },
  es: {
    nav: {
      start: 'INICIO',
      works: 'PROYECTOS',
      pricing: 'PRECIOS',
      about: 'SOBRE MÍ',
      cv: 'CV',
    },
    chassis: {
      currently: 'DISPONIBLE:',
      available: 'DISPONIBLE',
      power: 'PODER',
      navMenu: 'MENÚ NAV',
      contact: 'CONTACTO',
      emailCopied: '¡EMAIL COPIADO!',
      lang: 'IDIOMA',
    },
    topBar: {
      hardwareTitle: 'Monitor CRT Data General',
      fullHardware: 'Hardware Completo',
      focusViewport: 'Enfocar Pantalla',
      mute: 'Silenciar audio',
      unmute: 'Activar audio',
      reset: 'Restablecer ajustes',
      langTooltip: 'Cambiar idioma (EN/ES)',
    },
    screen1: {
      lorenaRole: 'DISEÑO, ARTE E INTERFACES',
      aboutBtn: 'SOBRE MÍ',
      design: 'DISEÑO',
      discipline1Title: 'NO-CODE Y FRONTEND',
      discipline1Subtitle: '(FRAMER, FIGMA, WEBFLOW, WORDPRESS, VIBE CODING, HTML/CSS, WEBMASTER)',
      discipline2Title: 'PRODUCTO E INTERFACES',
      discipline2Subtitle: '(DISEÑO UX/UI, DISEÑO WEB, DESARROLLO DE APPS, MOTION Y ANIMACIÓN)',
      discipline3Title: 'DIRECCIÓN DE ARTE Y VISUALES',
      discipline3Subtitle: '(BRANDING, CONCEPTO, FOTOGRAFÍA, SISTEMAS VISUALES)',
      signalStable: 'SEÑAL // ESTABLE',
      skillsTelemetry: 'HABILIDADES Y TELEMETRÍA',
      badgeDesign: '+10 AÑOS DISEÑO',
      badgeDesignSub: 'EXPERIENCIA Y ARQ.',
      badgeArt: '+20 AÑOS ARTE',
      badgeArtSub: 'PRÁCTICA CREATIVA',
      webmasterAt: 'WEBMASTER EN:',
    },
    works: {
      projectsArchive: 'ARCHIVO DE PROYECTOS',
      worksCount: (count) => `[${count} PROYECTOS]`,
      scrollDown: '▼ DESPLAZAR ABAJO',
      year: 'AÑO:',
      seeCaseStudy: 'VER CASO DE ESTUDIO →',
      endOfArchive: 'FIN DEL ARCHIVO',
      backToTop: '▲ VOLVER ARRIBA',
      selectedWorks: 'PROYECTOS SELECCIONADOS',
      prevProject: '◀ ANT',
      nextProject: 'SIG ▶',
    },
    pricing: {
      title: 'TABLA DE SERVICIOS Y CALCULADORA',
      subtitle: 'SELECCIONA LOS SERVICIOS PARA CALCULAR TU PRESUPUESTO EN TIEMPO REAL',
      categories: 'CATEGORÍAS',
      allCategories: 'TODOS LOS SERVICIOS',
      addBtn: '+ AÑADIR A PRESUPUESTO',
      addedBtn: '✓ EN PRESUPUESTO',
      removeBtn: 'ELIMINAR',
      budgetSidebarTitle: 'TU PRESUPUESTO ESTIMADO',
      estimatedTotal: 'TOTAL ESTIMADO',
      selectedServices: 'SERVICIOS SELECCIONADOS',
      noServicesSelected: 'AÚN NO HAS SELECCIONADO NINGÚN SERVICIO. SELECCIONA EN LA LISTA PARA ESTIMAR.',
      currencySelector: 'CONVERSOR DE MONEDA',
      copySummaryBtn: '📋 COPIAR RESUMEN DE PRESUPUESTO',
      copiedSummaryBtn: '✓ ¡RESUMEN COPIADO!',
      workWithMeBtn: '¡TRABAJA CONMIGO!',
      clearAllBtn: 'VACIAR SELECCIÓN',
      refRatesNotice: '* Valores en COP y CLP calculados con tasas de cambio referenciales aproximadas.',
    },
    about: {
      fileReadme: 'ARCHIVO: LEEME.TXT',
      diagnostics: 'DIAGNÓSTICO',
      stats: {
        designExp: 'EXP. DISEÑO',
        artisticPath: 'TRAYECTORIA ARTE',
        webmastering: 'WEBMASTERING',
        photoExp: 'EXP. FOTOGRÁFICA',
        happyClients: 'CLIENTES FELICES',
        years10: '+10 AÑOS',
        years20: '+20 AÑOS',
        years5: '+5 AÑOS',
        proj20: '+20 PROY.',
      },
      cvBtn: 'CV',
      backgroundTitle: 'TRAYECTORIA',
      backgroundP1:
        'COMENCÉ A DISEÑAR PÁGINAS WEB EN MI ADOLESCENCIA, EN LOS TIEMPOS DE LA ANTIGUA, SALVAJE Y RETRO WEB. ESTO EVOLUCIONÓ CON EL TIEMPO MIENTRAS EXPERIMENTABA CON NUEVAS PLATAFORMAS Y HERRAMIENTAS, DESARROLLANDO UN PROFUNDO ENTENDIMIENTO DE CÓMO FUNCIONA EL DISEÑO.',
      backgroundP2:
        'A MEDIDA QUE CRECÍ COMO DISEÑADORA, INVESTIGUÉ Y ESTUDIÉ TODAS LAS FORMAS EN QUE UN LENGUAJE VISUAL DISTINTIVO PUEDE TOMAR FORMA: PALETAS DE COLOR, GRÁFICAS, TIPOGRAFÍAS Y TENDENCIAS DE DISEÑO. PUEDO PERDERME POR HORAS EXPLORÁNDOLAS Y ENCONTRANDO INSPIRACIÓN.',
      craftTitle: 'OFICIO E INTENCIÓN',
      craftP1:
        'PERSONAS CREATIVAS, PROYECTOS, INICIATIVAS Y CREADORES DE CONTENIDO SIEMPRE HAN ESTADO EN MI ÓRBITA PROFESIONAL PORQUE TAMBIÉN SOY ARTISTA, Y ESTE ES MI ENFOQUE PARA TODOS LOS PROYECTOS DE DISEÑO DIGITAL QUE LLEGAN A MÍ. PONGO INTENCIÓN, CREATIVIDAD Y REFLEXIÓN EN MI TRABAJO.',
      emailCopied: '¡EMAIL COPIADO!',
    },
    cv: {
      title: 'CV',
      docVersion: 'DOCUMENTO // VER 2026.09',
      role: 'DISEÑADORA WEB Y VISUAL',
      summary:
        'DISEÑADORA DIGITAL CON MÁS DE 10 AÑOS DE EXPERIENCIA EN DISEÑO WEB, BRANDING Y DIRECCIÓN VISUAL. ACTUALMENTE TRABAJANDO COMO WEBMASTER EN PUENTES Y LAS ESCUCHADORAS. ENFOCADA EN TRANSFORMAR ESTRUCTURA E IDENTIDAD EN EXPERIENCIAS DIGITALES ATRACTIVAS BASADAS EN LA VISIÓN Y METAS DE CADA PROYECTO.',
      experienceTitle: '// EXPERIENCIA',
      chronologicalRecord: 'REGISTRO CRONOLÓGICO',
      toolsTitle: '// HERRAMIENTAS DE DISEÑO Y DESARROLLO',
      backToAbout: '← VOLVER A SOBRE MÍ',
      exploreWorks: 'EXPLORAR PROYECTOS ▶',
      present: 'ACTUALIDAD',
    },
    caseStudy: {
      back: '← VOLVER',
      prev: 'ANT',
      next: 'SIG',
      scope: 'ALCANCE:',
      typeOfClient: 'TIPO DE CLIENTE:',
      visualArtifact: '[ ARTEFACTO VISUAL ]',
      hiRes: '100% ALTA RES.',
      motionArtifact: '[ ARTEFACTO EN MOVIMIENTO ]',
      liveLoop: 'BUCLE EN VIVO',
      caseStudyTag: 'CASO DE ESTUDIO //',
      returnToWorks: '← VOLVER A PROYECTOS',
    },
  },
};

