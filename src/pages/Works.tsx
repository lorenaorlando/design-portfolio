import { Reveal } from '../components/Reveal';
import { Shot } from '../components/Shot';
import { Window } from '../components/Window';
import { WorkProject } from '../data/worksData';
import { useLang } from '../lib/i18n';
import { mediaFor } from '../lib/media';
import { PATHS } from '../lib/router';

export function Works({ works }: { works: WorkProject[] }) {
  const { t } = useLang();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="display page-title">
            {t.works.title} <sup className="mono muted" style={{ fontSize: 16, letterSpacing: 0 }}>({works.length})</sup>
          </h1>
        </div>
      </div>

      <div className="works-grid">
        {works.map((w, i) => (
          <Reveal key={w.slug} from={i % 2 ? 'right' : 'left'} delay={(i % 3) * 0.06}>
            <a className="work-card" href={PATHS.case(w.slug)}>
              <Window title={w.title.toLowerCase()} bodyClassName="">
                <Shot color={w.globeColor} video={mediaFor(w).video} alt={w.title} seed={i} square />
              </Window>
              <div className="work-card-info">
                <div>
                  <div className="name">{w.title}</div>
                  <div className="type">{w.typeOfProject}</div>
                </div>
                <span className="mono muted" style={{ fontSize: 12 }}>
                  {w.year}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
