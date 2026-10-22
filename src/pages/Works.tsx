import { useMemo, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Shot } from '../components/Shot';
import { Window } from '../components/Window';
import { WorkProject } from '../data/worksData';
import { useLang } from '../lib/i18n';
import { PATHS } from '../lib/router';

export function Works({ works }: { works: WorkProject[] }) {
  const { t } = useLang();
  const [filter, setFilter] = useState<string | null>(null);

  const disciplines = useMemo(() => {
    const counts = new Map<string, number>();
    works.forEach((w) => w.disciplines.forEach((d) => counts.set(d, (counts.get(d) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([d]) => d);
  }, [works]);

  const shown = filter ? works.filter((w) => w.disciplines.includes(filter)) : works;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">{t.works.kicker}</div>
          <h1 className="display page-title">
            {t.works.title} <sup className="mono muted" style={{ fontSize: 16, letterSpacing: 0 }}>({works.length})</sup>
          </h1>
        </div>
        <div className="filters">
          <button className={`chip ${filter === null ? 'active' : ''}`} onClick={() => setFilter(null)}>
            {t.works.all}
          </button>
          {disciplines.map((d) => (
            <button key={d} className={`chip ${filter === d ? 'active' : ''}`} onClick={() => setFilter(d)}>
              {d.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="works-grid">
        {shown.map((w, i) => (
          <Reveal key={w.slug} from={i % 2 ? 'right' : 'left'} delay={(i % 3) * 0.06}>
            <a className="work-card" href={PATHS.case(w.slug)}>
              <Window title={w.title.toLowerCase()} bodyClassName="">
                <Shot color={w.globeColor} image={w.imageUrl} video={w.videoUrl} alt={w.title} seed={i} />
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
