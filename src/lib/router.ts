import { useEffect, useState } from 'react';

export type Route =
  | { page: 'home' }
  | { page: 'works' }
  | { page: 'playground' }
  | { page: 'play'; slug: string }
  | { page: 'case'; slug: string }
  | { page: 'pricing' }
  | { page: 'about' }
  | { page: 'cv' };

export const PATHS = {
  home: '#/',
  works: '#/proyectos',
  playground: '#/playground',
  pricing: '#/precios',
  about: '#/sobre-mi',
  cv: '#/cv',
  case: (slug: string) => `#/proyectos/${slug}`,
  play: (slug: string) => `#/playground/${slug}`,
};

function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  switch (parts[0]) {
    case 'proyectos':
      return parts[1] ? { page: 'case', slug: parts[1] } : { page: 'works' };
    case 'playground':
      return parts[1] ? { page: 'play', slug: parts[1] } : { page: 'playground' };
    case 'precios':
      return { page: 'pricing' };
    case 'sobre-mi':
      return { page: 'about' };
    case 'cv':
      return { page: 'cv' };
    default:
      return { page: 'home' };
  }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
