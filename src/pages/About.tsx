import { PhotoBooth } from '../components/PhotoBooth';
import { Reveal } from '../components/Reveal';
import { Window } from '../components/Window';
import { useLang } from '../lib/i18n';
import { PATHS } from '../lib/router';

export function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <div className="page">
      <div className="kicker">{a.kicker}</div>
      <h1 className="display page-title" style={{ marginBottom: 48 }}>
        {a.title}
      </h1>
      <div className="about-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Reveal from="left">
            <Window title={t.desktop.photoBooth} bodyClassName="">
              <PhotoBooth />
            </Window>
          </Reveal>
          <Reveal from="left" delay={0.1}>
            <Window title={t.desktop.statsFile}>
              <div className="stats">
                {t.stats.map((s) => (
                  <div className="stat" key={s.l}>
                    <div className="n">{s.n}</div>
                    <div className="l">{s.l}</div>
                  </div>
                ))}
              </div>
            </Window>
          </Reveal>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Reveal from="right">
            <Window title="readme.txt">
              <div className="prose" style={{ padding: '8px 6px' }}>
                {a.sections.map((s) => (
                  <section key={s.title}>
                    <h2>{s.title}</h2>
                    <p>{s.body}</p>
                  </section>
                ))}
              </div>
            </Window>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <Window title={t.desktop.disciplinesFile}>
              {t.disciplines.map((x, i) => (
                <div className="discipline" key={x.title}>
                  <span className="n">0{i + 1}</span>
                  <div>
                    <div className="t">{x.title}</div>
                    <div className="s">{x.sub}</div>
                  </div>
                </div>
              ))}
            </Window>
          </Reveal>
          <div>
            <a className="chip solid" href={PATHS.cv}>
              {a.cvCta} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
