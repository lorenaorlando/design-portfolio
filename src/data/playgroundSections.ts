import type { PlaygroundSection } from './playgroundData';

export const FUNSCROLL_SECTIONS: PlaygroundSection[] = [
  {
    id: 'doomscroll',
    label: { es: 'El problema', en: 'The problem' },
    title: { es: 'Secuestrados por el doomscroll', en: 'Hijacked by the doomscroll' },
    paras: [
      {
        es: 'El doomscroll es la práctica más común en el uso de internet del presente. Nace de algoritmos, formatos y hábitos de consumo diseñados por las redes sociales: un consumo pasivo cuya función real es recopilar datos y perfilar al usuario con fines comerciales. Las redes pasaron de ser un lugar de encuentro a un centro comercial, donde casi todo lo que vemos tiene una etiqueta de precio. El usuario no elige qué ver: lo decide la máquina.',
        en: 'Doomscrolling is the most common way we use the internet today. It comes from algorithms, formats and consumption habits designed by social media: passive consumption whose real job is to collect data and profile the user for commercial ends. Social networks went from meeting place to shopping mall, where almost everything we see has a price tag. The user doesn’t choose what to see: the machine does.',
      },
      {
        es: 'La interacción también está limitada a cuatro respuestas fijas: like, comentar, guardar y compartir. Esto adiestra a quien mira a reaccionar siempre igual, y a quien publica a medir su trabajo con parámetros arbitrarios. Con el tiempo se volvió un hábito adictivo: horas de atención pasiva que no dejan memoria, salvo el rage-bait.',
        en: 'Interaction is also limited to four fixed responses: like, comment, save and share. This trains viewers to always react the same way, and trains authors to measure their work by arbitrary numbers. Over time it became an addictive habit: hours of passive attention that leave no memory, except the rage-bait.',
      },
    ],
  },
  {
    id: 'no-way-out',
    label: { es: 'No way out', en: 'No way out' },
    title: { es: 'Irse está prohibido', en: 'Leaving is not allowed' },
    paras: [
      {
        es: 'En las redes, los links hacia afuera se castigan en silencio. Salir de la plataforma rompe el hábito y se pierde atención que iría a la publicidad. Es una especie de secuestro digital: el usuario tiene la llave para salir, pero está tan acostumbrado al encierro que olvida que existe. Por eso la retención es hoy una de las métricas más importantes, y empuja a los autores a buscar atención a toda costa.',
        en: 'On social media, links to the outside are quietly punished. Leaving the platform breaks the habit and loses attention that would go to ads. It’s a kind of digital kidnapping: users hold the key to leave, but are so used to being locked in that they forget it exists. That’s why retention is one of today’s key metrics, pushing authors to chase attention at any cost.',
      },
    ],
  },
];
