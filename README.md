# Lorena Orlando — Portfolio

Portafolio de diseño web y visual. Se publica en [lorenaorlando.click](https://lorenaorlando.click) con GitHub Pages cada vez que hay cambios en `main`.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # genera dist/
npm run lint    # revisa tipos
```

## Estructura

```
public/assets/      Imágenes y videos (se sirven tal cual)
  profile/          Fotos de perfil
  projects/         Capturas y videos de cada proyecto (una carpeta por proyecto)
  playground/       Media de proyectos personales
  testimonials/     Fotos de clientes
src/
  content/copy.ts   Textos de la interfaz (ES / EN)
  data/             Proyectos, TL;DR, CV, precios y playground
  components/       Ventanas, barra lateral, escritorio…
  pages/            Inicio, Proyectos, Caso de estudio, Playground, Precios, Sobre mí, CV
  lib/              Rutas, idioma, PDF del CV, sonido
```

Un archivo en `public/assets/projects/las-escuchadoras/home.jpg` se usa en el código como `assets/projects/las-escuchadoras/home.jpg`.
