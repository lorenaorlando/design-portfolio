import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Window } from '../components/Window';
import { PLAYGROUND, PlaygroundItem } from '../data/playgroundData';
import { TOOLS_INFO, ToolId } from '../data/tools';
import { useLang } from '../lib/i18n';
import { PATHS } from '../lib/router';

export function ToolBadge({ id }: { id: ToolId }) {
  const { lang } = useLang();
  const tool = TOOLS_INFO[id];
  return (
    <span className="tool">
      <span className={`tool-mark ${tool.bleed ? 'bleed' : ''}`} style={{ background: tool.path || tool.logo ? '#fff' : tool.color }}>
        {tool.logo ? (
          <img src={tool.logo} alt="" />
        ) : tool.path ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={tool.path} fill={tool.color} />
          </svg>
        ) : (
          <span className="tool-mono">{tool.mono}</span>
        )}
      </span>
      {tool.name[lang]}
    </span>
  );
}

/** Phone frame that takes the screenshot's own proportions. */
function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone">
      <span className="phone-notch" aria-hidden="true" />
      <img src={src} alt={alt} />
    </div>
  );
}

/** A whole window shaped like a phone: bezel, title bar and the screenshot. */
function PhoneWindow({ src, title, alt }: { src: string; title: string; alt: string }) {
  return (
    <div className="phone-window">
      <div className="win-bar">
        <span className="dots">
          <span className="light close" />
          <span className="light min" />
          <span className="light max" />
        </span>
        <span className="title">{title}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

export function Playground() {
  const { t, lang } = useLang();
  const p = t.playground;

  // Masonry: phone cards count as two rows; each card goes to the shorter column.
  const columns: { item: PlaygroundItem; i: number }[][] = [[], []];
  const heights = [0, 0];
  PLAYGROUND.forEach((item, i) => {
    const c = heights[0] <= heights[1] ? 0 : 1;
    columns[c].push({ item, i });
    heights[c] += item.mockup ? 2 : 1;
  });

  return (
    <div className="page">
      <div className="kicker">{p.kicker}</div>
      <h1 className="pg-hero">{p.title}</h1>
      <p style={{ fontSize: 20, color: 'var(--ink-2)', marginTop: 16, maxWidth: 640 }}>{p.subtitle}</p>

      <div className="pg-masonry">
        {columns.map((col, c) => (
          <div className="pg-col" key={c}>
            {col.map(({ item, i }) => (
              <Reveal key={item.slug} from={c ? 'right' : 'left'} delay={(i % 2) * 0.06}>
                <a className={`pg-card ${item.mockup ? 'is-phone' : ''}`} href={PATHS.play(item.slug)}>
                  {item.mockup ? (
                    <PhoneWindow src={item.mockup} title={item.file} alt={item.title} />
                  ) : (
                    <Window title={item.file} bodyClassName="">
                      <div className="pg-cover">
                        <img src={item.gallery[0]} alt={item.title} loading="lazy" />
                      </div>
                    </Window>
                  )}
                  <div className="pg-card-info">
                    <div>
                      <div className="pg-title">{item.title}</div>
                      <div className="type">{item.kind[lang]}</div>
                    </div>
                    <span className="chip small">{p.open} →</span>
                  </div>
                  <p className="pg-card-summary">{item.summary[lang]}</p>
                </a>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaygroundDetail({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const p = t.playground;
  const index = PLAYGROUND.findIndex((x) => x.slug === slug);
  const item = PLAYGROUND[index];
  const [active, setActive] = useState('about');

  const sections = item
    ? [
        { id: 'about', label: p.sections.about },
        ...(item.youtube ? [{ id: 'video', label: p.sections.video }] : []),
        ...(item.phones ? [{ id: 'mobile', label: p.sections.mobile }] : []),
        ...(item.gallery.length ? [{ id: 'gallery', label: p.sections.gallery }] : []),
      ]
    : [];

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

  if (!item) {
    return (
      <div className="page">
        <a className="back-btn" href={PATHS.playground}>
          ‹ {p.back}
        </a>
      </div>
    );
  }

  const prev = PLAYGROUND[(index - 1 + PLAYGROUND.length) % PLAYGROUND.length];
  const next = PLAYGROUND[(index + 1) % PLAYGROUND.length];
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="case">
      <aside className="case-side">
        <a className="back-btn" href={PATHS.playground}>
          ‹ {p.back}
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
        <div className="kicker">{item.kind[lang]}</div>
        <h1 className="pg-detail-title">{item.title}</h1>
        {item.links && (
          <div className="btn-row" style={{ marginTop: 0, marginBottom: 22 }}>
            {item.links.map((link) => (
              <a key={link.url} className="chip solid visit" href={link.url} target="_blank" rel="noreferrer">
                {link.label[lang]} ↗
              </a>
            ))}
          </div>
        )}
        <p className="pg-lead">{item.summary[lang]}</p>
        {item.mockup && (
          <div className="pg-hero-phone" style={{ background: item.mockupBg }}>
            <PhoneMockup src={item.mockup} alt={item.title} />
          </div>
        )}

        <section id="about" className="case-section" style={{ paddingTop: 36 }}>
          <div className="kicker">{p.sections.about}</div>
          <div className="rich" style={{ marginTop: 14 }}>
            {item.about.map((para) => (
              <p key={para.es}>{para[lang]}</p>
            ))}
          </div>
          <div className="pg-did">
            <div className="k">{p.did}</div>
            <div className="filters">
              {item.did.map((d) => (
                <span key={d.es} className="chip small">
                  {d[lang]}
                </span>
              ))}
            </div>
          </div>
        </section>

        {item.youtube && (
          <section id="video" className="case-section">
            <div className="kicker">{p.sections.video}</div>
            <div className="video-embed">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${item.youtube}?rel=0`}
                title={item.title}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>
        )}

        {item.phones && (
          <section id="mobile" className="case-section">
            <div className="kicker">{p.sections.mobile}</div>
            <div className="phones">
              {item.phones.map((src, i) => (
                <Reveal key={src} from="bottom" delay={(i % 4) * 0.05}>
                  <img src={src} alt={`${item.title} ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {item.gallery.length > 0 && (
          <section id="gallery" className="case-section">
            <div className="kicker">{p.sections.gallery}</div>
            <div className="pg-gallery">
              {item.gallery.map((src, i) => (
                <Reveal key={src} from="bottom">
                  <img src={src} alt={`${item.title} ${i + 1}`} loading="lazy" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <nav className="case-nav">
          <a href={PATHS.play(prev.slug)}>
            <div className="k">← {p.prev}</div>
            <div className="v">{prev.title}</div>
          </a>
          <a href={PATHS.play(next.slug)} style={{ textAlign: 'right' }}>
            <div className="k">{p.next} →</div>
            <div className="v">{next.title}</div>
          </a>
        </nav>
      </article>

      <aside className="meta-card">
        <div className="k">{p.type}</div>
        <div>{item.kind[lang]}</div>
        <div className="k">{p.tools}</div>
        <div className="tools-list">
          {item.tools.map((id) => (
            <ToolBadge key={id} id={id} />
          ))}
        </div>
        {item.links?.map((link) => (
          <a key={link.url} className="chip solid" href={link.url} target="_blank" rel="noreferrer" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            {link.label[lang]} ↗
          </a>
        ))}
      </aside>
    </div>
  );
}
