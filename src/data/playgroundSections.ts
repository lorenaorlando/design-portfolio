import type { PlaygroundSection } from './playgroundData';

export const PRAGMAGICKA_SECTIONS: PlaygroundSection[] = [
  {
    id: 'method',
    label: { es: 'Concepto', en: 'Concept' },
    title: { es: 'Más que predecir, explorar', en: 'Explore, don’t predict' },
    paras: [
      {
        es: 'Todo el proyecto parte de una promesa: salir de una lectura con más claridad para actuar, no con una profecía. Esa idea se convirtió en un método de cuatro verbos que ordena tanto la app como el contenido.',
        en: 'The whole project starts from one promise: leave a reading with more clarity to act, not with a prophecy. That idea became a four-verb method that shapes both the app and the content.',
      },
    ],
    terms: [
      { term: '01 · Mirar', def: { es: 'Observar la situación desde otro ángulo.', en: 'Look at the situation from another angle.' }, color: '#FFFF0F' },
      { term: '02 · Entender', def: { es: 'Reconocer patrones, deseos, miedos y contradicciones.', en: 'Recognize patterns, wishes, fears and contradictions.' }, color: '#BAEAEE' },
      { term: '03 · Preguntar', def: { es: 'Convertir la confusión en una pregunta más honesta.', en: 'Turn confusion into a more honest question.' }, color: '#BAEAEE' },
      { term: '04 · Actuar', def: { es: 'Elegir un próximo paso concreto y posible.', en: 'Choose a concrete, doable next step.' }, color: '#FFFF0F' },
    ],
    quote: {
      es: 'Las cartas abren una conversación. La decisión y el movimiento siguen siendo tuyos.',
      en: 'The cards open a conversation. The decision and the movement are still yours.',
    },
  },
  {
    id: 'brand',
    label: { es: 'Decisiones de marca', en: 'Brand decisions' },
    title: { es: 'Una P de varita y luna', en: 'A P made of a wand and a moon' },
    paras: [
      {
        es: 'El logo une una varita grabada a mano, con estrellas en la punta, y una luna creciente que forma la panza de la P. Magia y ciclo: la intención que se convierte en movimiento. Elegí una textura de grabado para que se sienta antiguo y artesanal, como las propias cartas.',
        en: 'The logo joins a hand-engraved wand, with stars at its tip, and a crescent moon that forms the bowl of the P. Magic and cycle: intention turning into movement. I chose an engraving texture so it feels old and handmade, like the cards themselves.',
      },
      {
        es: 'Elegí solo dos colores para que la marca se recuerde en el feed: un amarillo eléctrico para la idea central y un aguamarina para los verbos de acción. Todo lo demás es tinta y papel, con mucho aire. El texto siempre va en tinta: sobre esos dos colores el contraste supera 14:1 y se lee bien en el celular.',
        en: 'I chose just two colors so the brand sticks in the feed: an electric yellow for the core idea and an aqua for action verbs. Everything else is ink and paper, with plenty of room. Text is always ink: on those two colors contrast goes above 14:1 and reads well on a phone.',
      },
      {
        es: 'La tipografía es una sola serif con dos registros: Viaoda Libre, una didona condensada de trazos finos, en mayúsculas para los titulares, y Playfair Display en minúsculas para el texto, con tono conversado. Con ellas armé el recurso de “el susurro y el grito”: una palabra pequeña entra antes de un titular gigante, como una frase dicha en voz baja que de pronto se vuelve enorme.',
        en: 'Typography is a single serif in two registers: Viaoda Libre, a fine-lined condensed Didone, in capitals for headlines, and Playfair Display in lowercase for body text, with a conversational tone. With them I built the “whisper and shout” device: a small word comes in before a huge headline, like something said quietly that suddenly becomes enormous.',
      },
      {
        es: 'El sello visual son los stickers de tarot: figuras del Rider-Waite (de dominio público) recortadas por su contorno con borde blanco, como stickers impresos. Hacen que el tarot se sienta cercano, coleccionable y con humor, no solemne. Los ases de los cuatro palos funcionan como código para cada parte del proyecto, así el feed se ordena solo.',
        en: 'The visual signature is tarot stickers: Rider-Waite figures (public domain) cut along their outline with a white border, like printed stickers. They make tarot feel close, collectible and funny rather than solemn. The aces of the four suits work as a code for each part of the project, so the feed sorts itself.',
      },
    ],
    swatches: [
      { name: 'Amarillo', hex: '#FFFF0F', role: { es: 'Identidad e idea central', en: 'Identity and core idea' } },
      { name: 'Aguamarina', hex: '#BAEAEE', role: { es: 'Verbos de acción', en: 'Action verbs' } },
      { name: 'Tinta', hex: '#111111', role: { es: 'Texto y trazos', en: 'Text and lines' } },
      { name: 'Grafito', hex: '#434343', role: { es: 'Logo', en: 'Logo' } },
      { name: 'Papel', hex: '#FFFFFF', role: { es: 'Fondo, 70 %', en: 'Background, 70 %' } },
    ],
  },
  {
    id: 'ecosystem',
    label: { es: 'Ecosistema', en: 'Ecosystem' },
    title: { es: 'Cuatro puertas, una misma idea', en: 'Four doors, one idea' },
    paras: [
      {
        es: 'Lo gratuito abre la conversación y lo pagado la profundiza. La voz es la de una amiga lúcida: cercana, clara y con humor seco, que sabe de tarot y no vende miedo.',
        en: 'The free side opens the conversation and the paid side deepens it. The voice is that of a lucid friend: close, clear and dry-humored, who knows tarot and doesn’t sell fear.',
      },
    ],
    terms: [
      { term: 'pragmagick.app', def: { es: 'Gratis · lecturas breves con significados escritos a mano. As de oros.', en: 'Free · short readings with hand-written meanings. Ace of pentacles.' }, color: '#BAEAEE' },
      { term: 'Amigah', def: { es: 'Gratis · el oráculo de stickers, la hermana chistosa. As de copas.', en: 'Free · the sticker oracle, the funny sister. Ace of cups.' }, color: '#FFFF0F' },
      { term: 'Lecturas 1:1', def: { es: 'Pago · sesiones por nota de voz enviadas al correo. As de espadas.', en: 'Paid · voice-note sessions sent by email. Ace of swords.' }, color: '#BAEAEE' },
      { term: 'El tarot de la acción', def: { es: 'Pago · curso de 6 clases con ejercicios y asistencia 1:1. As de bastos.', en: 'Paid · 6-class course with exercises and 1:1 support. Ace of wands.' }, color: '#FFFF0F' },
    ],
  },
];

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
  {
    id: 'alternative',
    label: { es: 'La alternativa', en: 'The alternative' },
    title: { es: 'Funscroll: la libertad de lo inútil', en: 'Funscroll: the freedom of the useless' },
    paras: [
      {
        es: 'Funscroll propone interfaces libres de patrones repetitivos, que invitan a la diversión y no a la condena. Se scrollea en todas las direcciones, aparecen interacciones inesperadas y se incentiva salir de la página. Es más cercano a la creación artística que a un portal informativo: más que ver una web, la sentimos.',
        en: 'Funscroll proposes interfaces free of repetitive patterns, that invite fun rather than doom. You scroll in every direction, unexpected interactions appear and leaving the page is encouraged. It’s closer to making art than to an information portal: rather than seeing a website, you feel it.',
      },
      {
        es: 'Es un espacio sin objetivos ni métricas, porque no hay forma de medir el asombro, la curiosidad o la felicidad. En un presente de funnels, leads, conversions y CTAs, aquí las interacciones inútiles son bienvenidas. Se inspira en la libertad exploratoria de la web 1.0 y reconoce que del otro lado hay un humano, no un consumidor pasivo: el usuario se vuelve parte de la coreografía.',
        en: 'It’s a space without goals or metrics, because there is no way to measure wonder, curiosity or happiness. In a present of funnels, leads, conversions and CTAs, useless interactions are welcome here. It draws on the exploratory freedom of Web 1.0 and recognizes that there’s a human on the other side, not a passive consumer: the user becomes part of the choreography.',
      },
    ],
    words: ['Frolic', 'Whimsical', 'Float', 'Dance', 'Move', 'Say', 'Image', 'Think'],
  },
  {
    id: 'glossary',
    label: { es: 'Glosario', en: 'Glossary' },
    title: { es: 'Nuevas formas de navegar', en: 'New ways to browse' },
    paras: [
      {
        es: 'Funscroll no tiene reglas fijas, pero propone algunas ideas para empezar, que se pueden probar en la web. Técnicamente se apoya en recursos nativos del navegador: posiciones absolutas y sticky, parallax, máscaras con clip-path, cursores propios, hover, drag and drop y el giroscopio del celular.',
        en: 'Funscroll has no fixed rules, but it suggests some ideas to start with, which you can try on the site. Technically it relies on native browser features: absolute and sticky positioning, parallax, clip-path masks, custom cursors, hover, drag and drop and the phone’s gyroscope.',
      },
    ],
    terms: [
      { term: 'Dancescroll', def: { es: 'El scroll se vuelve una coreografía entre la interfaz y el usuario.', en: 'Scrolling becomes a choreography between the interface and the user.' } },
      { term: 'Slowscroll', def: { es: 'El ritmo se ralentiza para sentir el tiempo de otra forma.', en: 'The pace slows down so time feels different.' } },
      { term: 'Smartscroll', def: { es: 'Recorrer la pantalla con ingenio y curiosidad.', en: 'Moving through the screen with wit and curiosity.' } },
      { term: '(not) Infinite scroll', def: { es: 'Una experiencia larga que, eventualmente, tiene un final.', en: 'A long experience that eventually comes to an end.' } },
      { term: 'Tiltscroll', def: { es: 'Inclinar o girar el celular para alterar el flujo del scroll.', en: 'Tilting or rotating the phone to change how the page scrolls.' } },
    ],
  },
  {
    id: 'case',
    label: { es: 'En la práctica', en: 'In practice' },
    title: { es: 'Funscroll en lorenaorlando.com', en: 'Funscroll on lorenaorlando.com' },
    paras: [
      {
        es: 'Llevé estas ideas a mi web personal, construida en Framer con wireframes mínimos y fragmentos de código puntuales. Partí de una colección de más de 100 elementos gráficos e imágenes de mi archivo (fotos familiares, series fotográficas, portadas de discos y memes propios), elegidos de forma intencionalmente azarosa.',
        en: 'I brought these ideas to my personal site, built in Framer with minimal wireframes and a few bits of code. I started from a collection of over 100 graphic elements and images from my archive (family photos, photo series, album covers and my own memes), chosen at random on purpose.',
      },
      {
        es: 'La web comunica lo máximo con la menor cantidad de palabras: un idioma de símbolos, metáforas, imágenes y movimiento. El timeline de mi carrera está contado con emojis, y el menú es una bola de disco giratoria acompañada por una isla flotante con mi cabeza asomándose. Sin corazones, lupas ni menús hamburguesa, el usuario tiene que aprender el idioma de un país nuevo.',
        en: 'The site says as much as possible with as few words as possible: a language of symbols, metaphors, images and movement. My career timeline is told with emojis, and the menu is a spinning disco ball, joined by a floating island with my head peeking out. With no hearts, magnifying glasses or hamburger menus, users have to learn the language of a new country.',
      },
      {
        es: 'Es un anti-portafolio: un archivo vivo de mi obra desde 2003 que se despliega al ritmo del usuario, bajo la filosofía “always under construction”. Fue un intento consciente de forzar al navegador a comportarse como un lienzo y no como una terminal.',
        en: 'It’s an anti-portfolio: a living archive of my work since 2003 that unfolds at the user’s pace, under an “always under construction” philosophy. It was a conscious attempt to make the browser behave like a canvas rather than a terminal.',
      },
    ],
    quote: {
      es: 'Recuperar la diversión es recuperar la autonomía. Romper con la lógica del consumo pasivo y del algoritmo es un acto de desobediencia digital.',
      en: 'Taking back fun is taking back autonomy. Breaking with the logic of passive consumption and the algorithm is an act of digital disobedience.',
    },
  },
];
