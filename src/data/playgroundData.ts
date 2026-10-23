import { Language } from '../types';
import { ToolId } from './tools';

type Text = Record<Language, string>;

export interface PlaygroundLink {
  label: Text;
  url: string;
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
  /** What I did, as short tags. */
  did: Text[];
  tools: ToolId[];
  links?: PlaygroundLink[];
  youtube?: string;
  /** Wide screenshots, shown full width. */
  gallery: string[];
  /** Tall screenshots (phone), shown side by side. */
  phones?: string[];
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
    file: 'pragmagicka.app',
    title: 'Pragmagicka',
    kind: { es: 'Apps esotéricas', en: 'Esoteric apps' },
    color: '#F4B342',
    summary: {
      es: 'Apps de tarot donde se unen mis dos mundos: el diseño y mi lado brujístico.',
      en: 'Tarot apps where my two worlds meet: design and my witchy side.',
    },
    about: [
      {
        es: 'Además de diseñadora, tengo un lado brujístico, y quise unir ambos mundos en herramientas esotéricas para el presente digital. Así nació Pragmagicka: apps para hacer lecturas de tarot desde el celular.',
        en: 'Besides being a designer, I have a witchy side, and I wanted to bring both worlds together in esoteric tools for the digital present. That’s how Pragmagicka was born: apps for tarot readings right from your phone.',
      },
      {
        es: 'El branding está inspirado en las cartas del tarot, y el logo es una luna con una varita mágica. Escribí a mano la interpretación de cada carta, una por una, para que cada lectura tenga mi propia voz.',
        en: 'The branding is inspired by tarot cards, and the logo is a moon with a magic wand. I wrote every card’s interpretation by hand, one by one, so each reading carries my own voice.',
      },
      {
        es: 'Ahora mismo estoy trabajando en una nueva app, esta vez de astrología.',
        en: 'Right now I’m working on a new app, this time about astrology.',
      },
    ],
    did: DID_PRODUCT,
    tools: ['vibe', 'canva', 'figma'],
    gallery: pics('pragmagicka', 8).slice(6).reverse(),
    phones: pics('pragmagicka', 6),
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
    gallery: pics('lorena-web', 12),
    phones: pics('lorena-web/mobile', 10),
  },
];
