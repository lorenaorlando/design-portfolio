import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Shot } from '../components/Shot';
import { Window } from '../components/Window';
import { TLDR } from '../data/tldrData';
import { WorkProject } from '../data/worksData';
import { useLang } from '../lib/i18n';
import { mediaFor } from '../lib/media';
import { PATHS } from '../lib/router';

interface CaseStudyProps {
  works: WorkProject[];
  slug: string;
}

export function CaseStudy({ works, slug }: CaseStudyProps) {
  const { t, lang } = useLang();
  const c = t.caseStudy;
  const index = works.findIndex((w) => w.slug === slug);
  const work = works[index];
  const [active, setActive] = useState('tldr');
  const media = work ? mediaFor(work) : { video: '', details: [] as string[] };

  const sections = [
    { id: 'tldr', label: c.sections.tldr },
    { id: 'about', label: c.sections.about, html: work?.aboutHtml },
    { id: 'process', label: c.sections.process, html: work?.processHtml },
    ...(media.details.length ? [{ id: 'details', label: c.sections.details }] : []),
    { id: 'result', label: c.sections.result, html: work?.resultHtml },
  ];
  const textSections = sections.filter((s) => s.html !== undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [slug]);

  if (!work) {
    return (
      <div className="page">
        <a className="back-btn" href={PATHS.works}>
          ‹ {c.back}
        </a>
      </div>
    );
  }

  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  const renderText = (s: { id: string; label: string; html?: string }, i: number) => (
    <section key={s.id} id={s.id} className="case-section">
      <div className="kicker">{s.label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', marginTop: 18 }}>
        <div className="case-num">0{i + 1}</div>
        <div className="rich" dangerouslySetInnerHTML={{ __html: s.html ?? '' }} />
      </div>
    </section>
  );

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="case">
      <aside className="case-side">
        <a className="back-btn" href={PATHS.works}>
          ‹ {c.back}
        </a>
        <nav className="toc">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={jump(s.id)} className={active === s.id ? 'on' : ''}>
              {s.label}
            </a>
          ))}
        </nav>
      </aside>

      <article>
        <div className="kicker">
          {work.typeOfProject} — {work.year}
        </div>
        <h1 className="display case-title">{work.title}</h1>
        <section id="tldr" className="tldr">
          <div className="kicker">{c.sections.tldr}</div>
          <p>{TLDR[work.slug]?.[lang]}</p>
        </section>
        <Reveal className="case-video">
          <Window title={`${work.slug}.mp4`} bodyClassName="">
            <Shot color={work.globeColor} video={media.video} alt={work.title} seed={index} square />
          </Window>
        </Reveal>

        {textSections.slice(0, 2).map((s, i) => renderText(s, i))}

        {media.details.length > 0 && (
          <section id="details" className="case-section">
            <div className="kicker">{c.sections.details}</div>
            <div className="details">
              {media.details.map((src, i) => (
                <Reveal key={src} from={i % 2 ? 'right' : 'left'} delay={0.05}>
                  <img className="detail-img" src={src} alt={`${work.title} — ${c.sections.details} ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {textSections.slice(2).map((s, i) => renderText(s, i + 2))}

        <nav className="case-nav">
          <a href={PATHS.case(prev.slug)}>
            <div className="k">← {c.prev}</div>
            <div className="v">{prev.title}</div>
          </a>
          <a href={PATHS.case(next.slug)} style={{ textAlign: 'right' }}>
            <div className="k">{c.next} →</div>
            <div className="v">{next.title}</div>
          </a>
        </nav>
      </article>

      <aside className="meta-card">
        <div className="k">{c.client}</div>
        <div>{work.typeOfProject}</div>
        <div className="k">{c.year}</div>
        <div>{work.year}</div>
        <div className="k">{c.scope}</div>
        <div>{work.disciplines.map((d) => d.toLowerCase()).join(', ')}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <span className="folder" style={{ width: 34, height: 26, background: `${work.globeColor}d0` }} />
          <span className="mono muted" style={{ fontSize: 11 }}>
            {String(index + 1).padStart(2, '0')} / {works.length}
          </span>
        </div>
      </aside>
    </div>
  );
}
