/**
 * Local media for each project, keyed by slug. Paths are inside public/.
 * - video: square loop shown in the project windows (home and Proyectos)
 * - details: close-ups of visual details, shown in the case study gallery
 * Anything missing falls back to the URLs in worksData.
 */
export interface ProjectMedia {
  video?: string;
  details?: string[];
}

export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  afrochingonas: {
    video: 'assets/projects/afrochingonas/video.mp4',
    details: ['assets/projects/afrochingonas/detail-1.webp', 'assets/projects/afrochingonas/detail-2.webp'],
  },
  antroposabores: {
    video: 'assets/projects/antroposabores/video.mp4',
    details: ['assets/projects/antroposabores/detail-1.webp', 'assets/projects/antroposabores/detail-2.webp'],
  },
  'brigitte-olivares': {
    video: 'assets/projects/brigitte-olivares/video.mp4',
    details: ['assets/projects/brigitte-olivares/detail-1.webp'],
  },
  caresaga: {
    video: 'assets/projects/caresaga/video.mp4',
    details: ['assets/projects/caresaga/detail-1.webp'],
  },
  'colmena-de-escritores': {
    video: 'assets/projects/colmena-de-escritores/video.mp4',
    details: ['assets/projects/colmena-de-escritores/detail-1.webp'],
  },
  'del-siervo': {
    video: 'assets/projects/del-siervo/video.mp4',
    details: ['assets/projects/del-siervo/detail-1.webp'],
  },
  'jarina-de-marco': {
    video: 'assets/projects/jarina-de-marco/video.mp4',
    details: ['assets/projects/jarina-de-marco/detail-1.webp'],
  },
  'jose-ramirez-guaigua': {
    video: 'assets/projects/jose-ramirez-guaigua/video.mp4',
    details: ['assets/projects/jose-ramirez-guaigua/detail-1.webp'],
  },
  'las-escuchadoras': {
    video: 'assets/projects/las-escuchadoras/video.mp4',
    details: ['assets/projects/las-escuchadoras/detail-1.webp'],
  },
  'lunaria-ritual': {
    video: 'assets/projects/lunaria-ritual/video.mp4',
    details: ['assets/projects/lunaria-ritual/detail-1.webp'],
  },
  nftecnologica: {
    video: 'assets/projects/nftecnologica/video.mp4',
    details: ['assets/projects/nftecnologica/detail-1.webp'],
  },
  technicolor: {
    video: 'assets/projects/technicolor/video.mp4',
    details: ['assets/projects/technicolor/detail-1.webp'],
  },
};
