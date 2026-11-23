# Prompt para continuar el portafolio de Lorena Orlando con otra IA

> Copia este archivo completo como primer mensaje (o como instrucciones del proyecto) en cualquier asistente de IA que tenga acceso al repositorio. Contiene todo lo necesario para seguir trabajando la web sin perder lo que ya está decidido.

---

## 1. Quién soy y qué es este proyecto

Soy **Lorena Orlando**, diseñadora web y visual (más de 10 años diseñando webs, más de 20 como artista visual). Este repositorio es mi **portafolio personal**, publicado en **https://lorenaorlando.click**.

- Repositorio: `github.com/lorenaorlando/design-portfolio`
- Rama de trabajo: **`main`**. Trabajo directo sobre `main`, sin ramas ni pull requests, salvo que yo lo pida.
- Cada push a `main` publica la web automáticamente con GitHub Pages (workflow `.github/workflows/static.yml`: Node 22, `npm ci`, `npm run build`, sube `dist/`). El dominio está en el archivo `CNAME`.
- Me comunico en **español**. Respóndeme en español, claro y sin tecnicismos innecesarios.

## 2. Concepto de diseño: “loOS”

La web es un **sistema operativo personal** llamado **loOS** (lo = Lorena Orlando, OS = guiño al logotipo clásico de Mac OS):

- Fondo **blanco** con una **cuadrícula de puntitos grises** que se desvanece hacia los bordes. En las páginas del Playground el fondo es blanco liso.
- El contenido vive en **ventanas tipo macOS**: barra de título con los tres botones (rojo cierra, amarillo minimiza, verde decorativo) y un **nombre de archivo** como título (`hola.txt`, `currently.txt`, `datos.app`, `lorenalandia.3d`, `pragmagick.app`…).
- La navegación es una **barra lateral izquierda de teclas físicas**, cada una con una **lucecita verde** que se enciende en la sección activa. En móvil pasa a ser una barra inferior.
- Detalle firma: en la portada, las palabras **“forma y sentido”** aparecen dentro de una **caja de selección tipo Figma** (violeta, con la etiqueta “Lorena · editando” y un cursor), escritas en tipografía pixelada.
- Logo: **unos lentes redondos morados con cristales rosados** + la palabra **loOS** (“lo” en bold, “OS” en light violeta). Está en `src/components/Logo.tsx` y como favicon en `public/favicon.svg`.

### Paleta (definida en `src/index.css`, `:root`)

| Nombre | Hex | Uso |
|---|---|---|
| Morado | `#360185` | Títulos, botones principales, logo, ventana de contacto |
| Violeta | `#8F0177` | Caja de selección, “OS” del logo, acentos |
| Magenta | `#DE1A58` | Numeraciones, comillas, viñetas (en dosis pequeñas) |
| Mostaza | `#F4B342` | Detalles puntuales |
| Crema | `#FFF0D6` | Reserva; hoy casi no se usa (todo es blanco) |
| Tinta | `#1E0E35` | Texto |
| LED verde | `#3DDC6F` | Luces de “activo” / “Disponible” |

Los botones rojo/amarillo/verde de las ventanas usan los colores de macOS (`#FF5F57`, `#FEBC2E`, `#28C840`).

### Tipografías (locales, con Fontsource)

- **Funnel Display** (`--display`): títulos. SemiBold 600, letter-spacing negativo (≈ −0.045em).
- **DM Sans** (`--sans`): texto corrido.
- **DM Mono** (`--mono`): sistema: títulos de ventana, botones, fechas, datos.
- **Pixelify Sans** (`--pixel`): acento pixelado, solo en palabras clave (“forma y sentido”) y en los nombres de proyectos del Playground.

### Reglas de diseño ya decididas (no revertir)

- **Nada de etiquetas pequeñas en mayúsculas sobre los títulos** (“kickers” tipo “TESTIMONIALS”, “CONTACT”, “ARCHIVE”). El título va solo. Las únicas excepciones son títulos pequeños en Funnel Display morado: “TL;DR” en los casos de estudio y “Herramientas”/“Experiencia” en el CV.
- No usar **Bricolage Grotesque** ni **Instrument Serif** (ya se reemplazaron).
- Las ventanas de proyectos son **cuadradas** y el video se reproduce **solo** (sin hover).
- No poner fecha ni etiquetas de disciplinas en los proyectos de la portada.
- Los nombres de “Anterior / Siguiente” al final de los casos van en morado.
- El portafolio no debe “verse hecho con IA”: evitar degradados morado-azul genéricos, Inter/Space Grotesk, todo centrado, etc.

## 3. Stack técnico

- **React 19 + TypeScript + Vite 6**. Sin Tailwind: todo el estilo está en **`src/index.css`** con variables CSS.
- Animaciones con **motion** (`motion/react`); íconos con **lucide-react**.
- PDF del CV generado en el navegador con **jsPDF** (`src/lib/cvPdf.ts`, se carga bajo demanda).
- Rutas por **hash** (`#/proyectos`, `#/proyectos/<slug>`, `#/playground/<slug>`, `#/precios`, `#/sobre-mi`, `#/cv`), en `src/lib/router.ts`.
- `vite.config.ts` usa `base: './'` y `assetsDir: 'static'` (para no mezclar el código compilado con `public/assets`).
- `tsconfig.json` es estricto y marca variables o imports sin usar: `npm run lint` debe pasar siempre.

### Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # chequeo de tipos (tiene que pasar)
npm run build   # genera dist/ (tiene que pasar antes de cada push)
```

## 4. Estructura y dónde está cada cosa

```
public/
  favicon.svg               Logo de lentes
  firma.html                Página para copiar la firma de correo (no enlazada, noindex)
  assets/
    profile/                lorena.webp (+ lorena-2/3/4.webp) → Photo Booth y CV
    projects/<slug>/        video.mp4 (cuadrado 960×960) y detail-N.webp (collages)
    playground/<slug>/      Capturas 01.webp, 02.webp… (lorena-web/mobile/ para celular)
    testimonials/           Fotos de clientes (.webp, 240px)
    logos/                  Logos de herramientas (canva, tripo, oncyber, newartcity)
    fonts/                  TTF usados por el PDF del CV
    signature/              Imágenes de la firma de correo
src/
  content/copy.ts           TODOS los textos de interfaz, en ES y EN (+ email, LinkedIn, fotos de perfil)
  data/worksData.ts         Los 12 proyectos de clientes (ES y EN): textos About / Process / Result en HTML
  data/tldrData.ts          Resumen TL;DR de cada proyecto (ES/EN)
  data/projectMedia.ts      Qué video y qué imágenes de detalle usa cada proyecto
  data/playgroundData.ts    Proyectos personales (Pragmagicka, Lorenalandia 3D, Indivirtual, Funscroll, web personal)
  data/playgroundSections.ts Secciones largas de Pragmagicka y Funscroll (concepto, marca, ensayo…)
  data/tools.ts             Herramientas con logo (WordPress, Figma, Canva, Blender, Tripo…)
  data/cvData.ts            Experiencia del CV (ES/EN)
  data/pricingData.ts       Servicios y precios (USD)
  data/testimonialsData.ts  Testimonios (ES/EN)
  components/               Desktop (portada), Window, SideBar, Logo, PhotoBooth, Shot (video/imagen), Selection…
  pages/                    Home, Works, CaseStudy, Playground, Pricing, About, Cv
  lib/                      router, i18n, analytics, cvPdf, media, geoLanguage (idioma por IP), sound (click de teclas)
docs/
  loOS-manual-de-marca.pdf  Manual de marca v2 (15 páginas, horizontal)
  PROMPT-IA.md              Este archivo
```

### Secciones de la web

- **Inicio:** escritorio con dos ventanas arrastrables, `hola.txt` (nombre, frase con “forma y sentido” y botón “Trabajemos junt@s” que abre un correo) y `currently.txt` (Puentes y Las Escuchadoras). Se achica sola para caber en la primera pantalla. Debajo: “Trabajos seleccionados” (6 proyectos), “Mirada de artista + puntualidad de oficinista.” con foto, testimonios y ventana de contacto morada.
- **Proyectos:** grilla de 12 proyectos con video cuadrado.
- **Caso de estudio:** índice fijo a la izquierda, TL;DR, video, Sobre el proyecto, Proceso, Detalles visuales (collages), Resultado; ficha a la derecha con cliente, año, alcance y herramientas con logos. En móvil la ficha va arriba.
- **Playground:** título “Jugar también es diseñar.”, grilla tipo masonry (Pragmagicka es una ventana con forma de celular) y una página por proyecto con botones “Visitar…”.
- **Precios:** calculadora de presupuesto en USD; en móvil el total va arriba.
- **Sobre mí:** Photo Booth (galería de fotos estilo app de Mac con efectos), datos (+10, +20…) y texto en 4 partes.
- **CV:** herramientas primero, resumen, experiencia y botón “Descargar PDF” (PDF con la marca, 2 páginas).

### Datos fijos

- Email: `soylorenaorlando@gmail.com` · LinkedIn: `https://www.linkedin.com/in/lorenaorlando/`
- Google Analytics 4: ID `G-9C1J96E9CB` en `src/lib/analytics.ts`. Cuenta una visita por cada ruta `#/…`.
- Idioma: detecta ES/EN por IP y por el navegador; el usuario puede cambiarlo desde la barra (se guarda en localStorage).

## 5. Cómo trabajar (convenciones)

1. **Todo texto va en ES y EN.** Si cambias un texto, cambia los dos (en `copy.ts` o en el archivo de datos correspondiente).
2. **Contenido en datos, no en componentes.** Proyectos, testimonios, CV, precios y Playground se editan en `src/data/`; los textos de interfaz en `src/content/copy.ts`.
3. **Media nueva:**
   - Imágenes → convertir a **WebP** (calidad ~82, máx. 1600px de ancho; fotos de testimonio 240px) y quitar fondos transparentes poniéndolos sobre blanco si son capturas.
   - Videos de proyectos → **MP4 cuadrado 960×960, 6–12 s, sin audio**, con `+faststart` (`ffmpeg -i in.mp4 -an -c:v copy -movflags +faststart video.mp4`).
   - Nombres en minúscula y con guiones, en la carpeta del `slug`.
   - Si yo subo archivos con nombres raros (por ejemplo `Screen Shot…png`), renómbralos, conviértelos y borra los originales.
4. **Antes de cada push:** `npm run lint` y `npm run build` sin errores. Revisa en escritorio (1440×900 y 1280×720) y en móvil (390 px de ancho) que nada se corte y que **no haya scroll horizontal**.
5. **Commits** claros en inglés (`feat: …`, `fix: …`, `copy: …`) y push directo a `main`.
6. Antes de dar algo por terminado, explícame en español qué cambió y qué quedó pendiente.

## 6. Pendientes conocidos

- **Funscroll** (Playground) no tiene imágenes todavía: van en `public/assets/playground/funscroll/` (01.webp, 02.webp…) y se agregan en `gallery` de `playgroundData.ts`.
- **Pragmagicka:** pueden llegar capturas nuevas; la de la portada está dentro de un marco de celular (`mockup`).
- **Logos** de Photoshop y Divi son monogramas; si llegan los logos oficiales, van en `public/assets/logos/` y se referencian en `src/data/tools.ts`.
- La lista de **disciplinas** (No-code & Frontend, Producto & Interfaz, Dirección de arte) ya no aparece en la web; si se quiere de vuelta, hay que decidir dónde.
- El **manual de marca** (`docs/loOS-manual-de-marca.pdf`) se generó a partir de un HTML aparte; si cambia el diseño, hay que actualizarlo a mano.

## 7. Cosas que NO hacer

- No reintroducir el diseño anterior (monitor CRT, fondo negro con verde, Google AI Studio, Gemini, Tailwind).
- No mencionar **Framer** en la web personal (era información vieja).
- No cambiar la paleta, el logo ni las tipografías sin que yo lo pida.
- No volver a poner las etiquetas pequeñas en mayúsculas sobre los títulos.
- No subir archivos pesados sin comprimir (imágenes > 500 KB o videos > 3 MB).
- No borrar `CNAME`, el workflow de GitHub Pages, `public/firma.html` ni `docs/`.
