import { Language } from '../types';

export interface Testimonial {
  name: string;
  project?: string;
  quote: Record<Language, string>;
  /** Path inside public/, e.g. assets/testimonials/monica.jpg. Initials show until it exists. */
  photo?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mónica Echegarreta',
    project: 'Lunaria Ritual',
    photo: 'assets/testimonials/monica-echegarreta.jpg',
    quote: {
      en: 'Lorena’s work as a designer has shown me that, in addition to being a great professional, she is detail-oriented, organized, and punctual. Throughout the process, she has offered design ideas and activity schedules that have left me feeling excited, comfortable, and confident. Similarly, she always takes the time to clarify any doubts I have and ensures that everything works perfectly.',
      es: 'El trabajo de Lorena como diseñadora me ha demostrado que, además de ser una gran profesional, es detallista, organizada y puntual. Durante todo el proceso me ha ofrecido ideas de diseño y cronogramas de actividades que me han hecho sentir entusiasmada, cómoda y segura. Además, siempre se toma el tiempo de aclarar cualquier duda que tengo y se asegura de que todo funcione perfectamente.',
    },
  },
  {
    name: 'Marbella Figueroa',
    project: 'Afrochingonas',
    photo: 'assets/testimonials/marbella-figueroa.jpg',
    quote: {
      en: 'Lorena worked with us at Afrochingonas from the very beginning of the project, she stood out for her willingness to guide us through every question and for proposing improvements that strengthened both the visual aspect and the user experience. Working with her gave us confidence and peace of mind, and she is undoubtedly an excellent programmer—responsible and highly aware of the needs of socially driven projects.',
      es: 'Lorena trabajó con nosotras en Afrochingonas desde el inicio del proyecto. Se destacó por su disposición para guiarnos en cada duda y por proponer mejoras que fortalecieron tanto lo visual como la experiencia de usuario. Trabajar con ella nos dio confianza y tranquilidad; sin duda es una excelente programadora, responsable y muy consciente de las necesidades de los proyectos con enfoque social.',
    },
  },
  {
    name: 'Katiuska Castillo',
    project: 'JEVA',
    photo: 'assets/testimonials/katiuska-castillo.jpg',
    quote: {
      en: 'At JEVA, we have had the pleasure of working with Lorena as a web programmer and consultant. In addition to being a resourceful, creative, and adaptable worker, her work has aligned perfectly with our needs. We greatly value having her among our providers and wholeheartedly recommend her expertise.',
      es: 'En JEVA hemos tenido el placer de trabajar con Lorena como programadora web y consultora. Además de ser una trabajadora recursiva, creativa y adaptable, su trabajo se ha alineado perfectamente con nuestras necesidades. Valoramos mucho tenerla entre nuestros proveedores y recomendamos su trabajo de todo corazón.',
    },
  },
  {
    name: 'Brigitte Olivares',
    photo: 'assets/testimonials/brigitte-olivares.jpg',
    quote: {
      en: 'Lorena turned me into a website.',
      es: 'Lorena me convirtió en un sitio web.',
    },
  },
];
