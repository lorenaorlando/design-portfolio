/**
 * Local media for each project, keyed by slug. Paths are inside public/.
 * - video: square loop shown in the project windows (home and Proyectos)
 * - details: close-ups of visual details, shown in the case study gallery
 * Anything missing falls back to the URLs in worksData.
 */
export interface ProjectMedia {
  video?: string;
  cover?: string;
  details?: string[];
}

export const PROJECT_MEDIA: Record<string, ProjectMedia> = {};
