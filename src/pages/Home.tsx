import { useState } from 'react';
import { Desktop } from '../components/Desktop';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Shot } from '../components/Shot';
import { Window } from '../components/Window';
import { EMAIL, LINKEDIN_URL, PROFILE_PHOTO } from '../content/copy';
import { TESTIMONIALS } from '../data/testimonialsData';
import { WorkProject } from '../data/worksData';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';
import { mediaFor } from '../lib/media';
import { PATHS } from '../lib/router';

interface HomeProps {
  works: WorkProject[];
  onToast: (message: string) => void;
}

const FEATURED = 6;

export function Home({ works, onToast }: HomeProps) {
  const { t, lang } = useLang();
  const h = t.home;

  const copyEmail = async () => {
    if (await copyText(EMAIL)) onToast(`${t.bar.emailCopied} — ${EMAIL}`);
  };

  return (
    <>
      <Desktop />

      <section className="section" id="proyectos">
        <Reveal>
          <div className="kicker">{h.selectedKicker}</div>
          <h2 className="display page-title" style={{ marginBottom: 80 }}>
            {h.selectedTitle}
          </h2>
        </Reveal>

        {works.slice(0, FEATURED).map((w, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={w.slug} className={`work-row ${flip ? 'flip' : ''}`}>
              <Reveal from={flip ? 'right' : 'left'} className="work-media">
                <a href={PATHS.case(w.slug)}>
                  <Window title={w.title.toLowerCase()} bodyClassName="">
                    <Shot color={w.globeColor} video={mediaFor(w).video} alt={w.title} seed={i} square />
                  </Window>
                </a>
              </Reveal>
              <Reveal from={flip ? 'left' : 'right'} delay={0.1}>
                <div className="mono muted" style={{ fontSize: 13 }}>
                  {String(i + 1).padStart(2, '0')} — {w.year}
                </div>
                <h3 className="display work-title">{w.title}</h3>
                <div style={{ fontSize: 17, color: 'var(--ink-2)' }}>{w.typeOfProject}</div>
                <div className="work-meta">
                  {w.disciplines.map((x) => (
                    <span className="chip small" key={x}>
                      {x}
                    </span>
                  ))}
                </div>
                <a className="link-arrow" href={PATHS.case(w.slug)}>
                  {h.seeCase} →
                </a>
              </Reveal>
            </article>
          );
        })}

        <Reveal className="center">
          <a className="chip solid" href={PATHS.works}>
            {h.seeAll} →
          </a>
        </Reveal>
      </section>

      <section className="section">
        <div className="about-grid" style={{ alignItems: 'center' }}>
          <Reveal from="left">
            <Window title="estudio.jpg" bodyClassName="">
              <div style={{ aspectRatio: '1 / 1' }}>
                <Photo src={PROFILE_PHOTO} alt="Lorena Orlando" />
              </div>
            </Window>
          </Reveal>
          <Reveal from="right" delay={0.1}>
            <div className="kicker">{h.aboutKicker}</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 4.6vw, 64px)', margin: '14px 0 20px' }}>
              {h.aboutTitle}
            </h2>
            <div className="prose">
              <p>{h.aboutBody}</p>
            </div>
            <a className="link-arrow" href={PATHS.about}>
              {h.aboutCta} →
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="kicker">{h.testimonialsKicker}</div>
          <h2 className="display page-title" style={{ marginBottom: 48 }}>
            {h.testimonialsTitle}
          </h2>
        </Reveal>
        <div className="testimonials">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} from={i % 2 ? 'right' : 'left'} delay={(i % 2) * 0.08}>
              <Window title={`${item.name.split(' ')[0].toLowerCase()}.txt`}>
                <blockquote className="testimonial">
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <p>{item.quote[lang]}</p>
                  <footer>
                    <Avatar name={item.name} photo={item.photo} />
                    <span>
                      <strong>{item.name}</strong>
                      {item.project && <span className="muted"> — {item.project}</span>}
                    </span>
                  </footer>
                </blockquote>
              </Window>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="contact-card">
          <Window title={t.desktop.contactFile} dark>
            <div style={{ padding: 'clamp(12px, 3vw, 36px)' }}>
              <div className="kicker" style={{ color: 'var(--mostaza)' }}>
                {h.contactKicker}
              </div>
              <h2 className="display contact-title" style={{ margin: '14px 0 18px' }}>
                {h.contactTitle}
              </h2>
              <p style={{ fontSize: 18, color: '#d9c8f2' }}>{h.contactBody}</p>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <button className="chip" style={{ background: 'var(--on-dark)', color: 'var(--morado)', borderColor: 'var(--on-dark)' }} onClick={copyEmail}>
                  {EMAIL}
                </button>
                <a className="chip" style={{ background: 'transparent', color: 'var(--on-dark)', borderColor: '#7a52c2' }} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#3ddc6f', marginLeft: 6 }}>
                  <span className="dot-led" /> {t.bar.available}
                </span>
              </div>
            </div>
          </Window>
        </Reveal>
      </section>
    </>
  );
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  const [ok, setOk] = useState(Boolean(photo));
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  return (
    <span className="avatar" aria-hidden="true">
      {ok && photo ? <img src={photo} alt="" onError={() => setOk(false)} /> : initials}
    </span>
  );
}
