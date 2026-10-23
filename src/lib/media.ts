import { PROJECT_MEDIA } from '../data/projectMedia';
import { WorkProject } from '../data/worksData';

/** Media for a project: local files first, then the original hosted URLs. */
export function mediaFor(work: WorkProject) {
  const local = PROJECT_MEDIA[work.slug] ?? {};
  return {
    video: local.video ?? work.videoUrl,
    cover: local.cover ?? work.imageUrl,
    details: local.details ?? [],
  };
}
