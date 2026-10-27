import { Language } from '../types';
import { FUNSCROLL_SECTIONS, PRAGMAGICKA_SECTIONS } from './playgroundSections';
import { ToolId } from './tools';

type Text = Record<Language, string>;

export interface PlaygroundLink {
  label: Text;
  url: string;
}

export interface PlaygroundSection {
  id: string;
  label: Text;
  title: Text;
  paras: Text[];
  /** Brand colors with what each one does. */
  swatches?: { name: string; hex: string; role: Text }[];
  /** Term + definition cards (method steps, glossary, ecosystem). */
  terms?: { term: string; def: Text; color?: string }[];
  /** Single words shown as large chips. */
  words?: string[];
  quote?: Text;
}

export interface PlaygroundItem {
  slug: string;
  /** File-style window title, e.g. "pragmagicka.app". */
  file: string;
  title: string;
  kind: Text;
  color: string;
  summary: Text;
  about: Text[];
  /** Extra case-study sections after the intro. */
  sections?: PlaygroundSection[];
  /** What I did, as short tags. */
  did: Text[];
  tools: ToolId[];
  links?: PlaygroundLink[];
  youtube?: string;
  /** Wide screenshots, shown full width. */
  gallery: string[];
  /** Tall screenshots (phone), shown side by side. */
  phones?: string[];
  /** Screenshot shown inside a phone frame on the cover and at the top of the page. */
  mockup?: string;
  mockupBg?: string;
}

const pics = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `assets/playground/${folder}/${String(i + 1).padStart(2, '0')}.webp`);

const DID_PRODUCT: Text[] = [
  { es: 'Branding', en: 'Branding' },
  { es: 'Dirección visual', en: 'Visual direction' },
  { es: 'UX/UI', en: 'UX/UI' },
  { es: 'Diseño de producto', en: 'Product design' },
  { es: 'Redacción de contenido', en: 'Content writing' },
];

export const PLAYGROUND: PlaygroundItem[] = [
  {
    slug: 'pragmagicka',
    file: 'pragmagick.app',
    title: 'Pragmagicka',
    kind: { es: 'Apps esotéricas', en: 'Esoteric apps' },
    color: '#F4B342',
    summary: {
      es: 'Esoterismo pragmático: tarot que cambia la predicción por la acción. Una app, un oráculo de stickers, lecturas y un curso bajo una misma marca.',
      en: 'Pragmatic esotericism: tarot that swaps prediction for action. An app, a sticker oracle, readings and a course under one brand.',
    },
    about: [
      {
        es: 'Además de diseñadora, tengo un lado brujístico, y quise unir ambos mundos. Pragmagicka es un proyecto de tarot que no adivina el futuro: usa las cartas para mirar una situación desde otro ángulo, desenredar lo mental y elegir un próximo paso concreto. Lo llamo esoterismo pragmático.',
        en: 'Besides being a designer, I have a witchy side, and I wanted to bring both worlds together. Pragmagicka is a tarot project that doesn’t predict the future: it uses the cards to look at a situation from another angle, untangle your thoughts and choose a concrete next step. I call it pragmatic esotericism.',
      },
      {
        es: 'La puerta de entrada es pragmagick.app, una app gratuita de lecturas breves donde escribí a mano la interpretación de cada carta, una por una, para que cada lectura tenga mi propia voz. Ahora mismo estoy trabajando en una nueva app, esta vez de astrología.',
        en: 'The way in is pragmagick.app, a free app for short readings where I wrote every card’s meaning by hand, one by one, so each reading carries my own voice. Right now I’m working on a new app, this time about astrology.',
      },
    ],
    sections: PRAGMAGICKA_SECTIONS,
    did: [
      { es: 'Branding', en: 'Branding' },
      { es: 'Manual de marca', en: 'Brand guidelines' },
      { es: 'Dirección visual', en: 'Visual direction' },
      { es: 'UX/UI', en: 'UX/UI' },
      { es: 'Diseño de producto', en: 'Product design' },
      { es: 'Redacción de contenido', en: 'Content writing' },
    ],
    tools: ['vibe', 'canva', 'figma'],
    links: [{ label: { es: 'Visitar pragmagick.app', en: 'Visit pragmagick.app' }, url: 'https://pragmagick.app' }],
    gallery: pics('pragmagicka', 8).slice(6).reverse(),
    phones: pics('pragmagicka', 6),
    mockup: 'assets/playground/pragmagicka/01.webp',
    mockupBg: 'linear-gradient(160deg, #fff4d9, #f9d27e)',
  },
  {
    slug: 'lorenalandia',
    file: 'lorenalandia.3d',
    title: 'Lorenalandia 3D',
    kind: { es: 'Metaverso', en: 'Metaverse' },
    color: '#8F0177',
    summary: {
      es: 'Un metaverso propio: un paisaje 3D para recorrer, con objetos reales convertidos en 3D y ambientación sonora.',
      en: 'A metaverse of my own: a 3D landscape to explore, with real objects turned into 3D and its own soundscape.',
    },
    about: [
      {
        es: 'Lorenalandia es un metaverso que creé durante el taller Escuela de Sensibilización Tecnológica Latinoamericana, dictado por Asimtria, Toda la teoría del universo y el Centro de Cultura Digital de la CDMX.',
        en: 'Lorenalandia is a metaverse I created during the Escuela de Sensibilización Tecnológica Latinoamericana workshop, led by Asimtria, Toda la teoría del universo and Mexico City’s Centro de Cultura Digital.',
      },
      {
        es: 'Construí el paisaje en Blender y lo llevé a New Art City, donde está alojado. Generé objetos 3D a partir de objetos reales de mi vida y le di una ambientación sonora para que recorrerlo sea una experiencia completa.',
        en: 'I built the landscape in Blender and brought it into New Art City, where it lives. I generated 3D objects from real objects in my life and gave it a soundscape so exploring it feels like a full experience.',
      },
    ],
    did: [
      { es: 'Objetos 3D a partir de objetos reales', en: '3D objects from real objects' },
      { es: 'Paisaje 3D en Blender y New Art City', en: '3D landscape in Blender and New Art City' },
      { es: 'Ambientación sonora', en: 'Soundscape' },
      { es: 'Fotografía digital', en: 'Digital photography' },
    ],
    tools: ['newartcity', 'blender', 'canva', 'photo', 'tripo'],
    youtube: 'SAYY5_lc45k',
    links: [{ label: { es: 'Visitar Lorenalandia', en: 'Visit Lorenalandia' }, url: 'https://newart.city/show/lorenalandia' }],
    gallery: pics('lorenalandia', 15),
  },
  {
    slug: 'indivirtual',
    file: 'indivirtual.3d',
    title: 'Indivirtual',
    kind: { es: 'Exposición en el metaverso', en: 'Metaverse exhibition' },
    color: '#360185',
    summary: {
      es: 'Mi exposición fotográfica individual en el metaverso: un portafolio vivo que se recorre como una galería.',
      en: 'My solo photography exhibition in the metaverse: a living portfolio you walk through like a gallery.',
    },
    about: [
      {
        es: 'Indivirtual es una exposición individual de mi trabajo como fotógrafa, montada en una galería 3D en oncyber. Funciona como un portafolio vivo: en lugar de pasar fotos, se camina entre ellas como en una sala real.',
        en: 'Indivirtual is a solo exhibition of my work as a photographer, set up in a 3D gallery on oncyber. It works as a living portfolio: instead of scrolling through photos, you walk among them as in a real gallery.',
      },
    ],
    did: [
      { es: 'Fotografía', en: 'Photography' },
      { es: 'Curaduría', en: 'Curation' },
      { es: 'Montaje de la exposición 3D', en: '3D exhibition design' },
    ],
    tools: ['oncyber', 'tripo'],
    links: [
      { label: { es: 'Visitar la exposición', en: 'Visit the exhibition' }, url: 'https://oncyber.io/lorenaorlando?coords=-1.27x2.80x-16.15x1.76' },
    ],
    gallery: pics('indivirtual', 3),
  },
  {
    slug: 'funscroll',
    file: 'funscroll.life',
    title: 'Funscroll',
    kind: { es: 'Web manifiesto', en: 'Manifesto site' },
    color: '#DE1A58',
    summary: {
      es: 'Un internet que no quiere retenerte: webs para jugar con el scroll en lugar del doomscroll.',
      en: 'An internet that doesn’t want to keep you: websites that play with scrolling instead of doomscrolling.',
    },
    about: [
      {
        es: 'Funscroll es una propuesta y un ensayo que escribí como respuesta al doomscroll: una forma de hacer webs que se mueven en todas las direcciones, que tienen final y que te invitan a irte. Sin objetivos, sin métricas, más cerca del arte que de un feed.',
        en: 'Funscroll is a proposal and an essay I wrote in response to doomscrolling: a way of making websites that move in every direction, have an ending and invite you to leave. No goals, no metrics, closer to art than to a feed.',
      },
      {
        es: 'La web funscroll.life es el proyecto hecho realidad: un recorrido que se vive scrolleando, un manifiesto que se desenrolla como un pergamino, una galería de funscrollers (webs que inspiraron el proyecto, con una puerta que te lleva a una al azar y un webring) y un kit gratuito de efectos para que cualquiera haga su propia web, con una guía para crearla con vibe coding aunque no sepa programar. Está en español e inglés.',
        en: 'The site funscroll.life is the idea made real: a journey you experience by scrolling, a manifesto that unrolls like a scroll, a gallery of funscrollers (sites that inspired the project, with a door to a random one and a webring) and a free effects kit so anyone can make their own site, with a guide to building it through vibe coding even without knowing how to code. It’s in Spanish and English.',
      },
    ],
    sections: FUNSCROLL_SECTIONS,
    did: [
      { es: 'Concepto y ensayo', en: 'Concept and essay' },
      { es: 'Dirección visual', en: 'Visual direction' },
      { es: 'UX/UI e interacción', en: 'UX/UI and interaction' },
      { es: 'Kit de efectos open source', en: 'Open-source effects kit' },
      { es: 'Redacción de contenido', en: 'Content writing' },
    ],
    tools: ['vibe'],
    links: [
      { label: { es: 'Visitar funscroll.life', en: 'Visit funscroll.life' }, url: 'https://funscroll.life' },
      { label: { es: 'Leer el manifiesto', en: 'Read the manifesto' }, url: 'https://funscroll.life/manifiesto.html' },
    ],
    gallery: [],
    // Assets go in public/assets/playground/funscroll/ (01.webp, 02.webp…)
  },
  {
    slug: 'lorena-web',
    file: 'lorena.web',
    title: 'Lorena Orlando',
    kind: { es: 'Web personal', en: 'Personal site' },
    color: '#DE1A58',
    summary: {
      es: 'Mi web personal: un universo que reúne todas mis facetas creativas en un solo lugar.',
      en: 'My personal site: a universe that brings all my creative sides together in one place.',
    },
    about: [
      {
        es: 'Es mi web como artista, donde conviven la música, la fotografía, la escritura, el net art, el 3D, el diseño web y la magia. Quería un espacio que se sintiera como yo: lúdico, colorido y lleno de capas para explorar.',
        en: 'It’s my site as an artist, where music, photography, writing, net art, 3D, web design and magick live side by side. I wanted a space that felt like me: playful, colorful and full of layers to explore.',
      },
      {
        es: 'Diseñé la identidad, la dirección visual y la experiencia, escribí todo el contenido y generé los objetos 3D que flotan en cada sección.',
        en: 'I designed the identity, the visual direction and the experience, wrote all the content and generated the 3D objects floating through each section.',
      },
    ],
    did: DID_PRODUCT,
    tools: ['tripo', 'claude', 'canva'],
    links: [
      { label: { es: 'Visitar lorenaorlando.com', en: 'Visit lorenaorlando.com' }, url: 'https://lorenaorlando.com' },
      { label: { es: 'Ver manual de marca', en: 'See brand guidelines' }, url: 'https://lorenaorlando.com/marca-722e46dd/' },
    ],
    gallery: pics('lorena-web', 12),
    phones: pics('lorena-web/mobile', 10),
  },
];
