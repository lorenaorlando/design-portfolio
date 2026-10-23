import { PROJECT_MEDIA } from '../data/projectMedia';
import { ToolId } from '../data/tools';
import { WorkProject } from '../data/worksData';

/** Media for a project: local files first, then the original hosted URLs. */
export function mediaFor(work: WorkProject) {
  const local = PROJECT_MEDIA[work.slug] ?? {};
  return {
    video: local.video ?? work.videoUrl,
    details: local.details ?? [],
  };
}

/**
 * Tools used on a client project: the site builder named in its process text,
 * plus Photoshop and Canva wherever there was branding or visual direction.
 */
export function toolsFor(work: WorkProject): ToolId[] {
  const text = work.processHtml;
  const tools: ToolId[] = [];
  if (/WordPress/i.test(text)) tools.push('wordpress');
  if (/Elementor/i.test(text)) tools.push('elementor');
  if (/Divi/i.test(text)) tools.push('divi');
  if (/Squarespace/i.test(text)) tools.push('squarespace');
  if (/Framer/i.test(text)) tools.push('framer');
  if (work.disciplines.some((d) => /BRANDING|VISUAL|ART|GRAPHIC|GRÁFICO/i.test(d))) tools.push('photoshop', 'canva');
  return tools;
}
