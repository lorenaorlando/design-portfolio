import { motion } from 'motion/react';
import { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { EMAIL, PROFILE_PHOTO } from '../content/copy';
import { WorkProject } from '../data/worksData';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';
import { PATHS } from '../lib/router';
import { audioEngine } from '../utils/audio';
import { Photo } from './Photo';
import { PixelText } from './PixelText';
import { Selection } from './Selection';
import { Shot } from './Shot';
import { Window } from './Window';

interface DesktopProps {
  works: WorkProject[];
  onToast: (message: string) => void;
}

// Folder slots: two columns on the left, one column on the right.
const FOLDER_SLOTS: CSSProperties[] = [
  { left: '2%', top: '9%' },
  { left: '10.5%', top: '9%' },
  { left: '2%', top: '27%' },
  { left: '10.5%', top: '27%' },
  { left: '2%', top: '45%' },
  { left: '10.5%', top: '45%' },
  { left: '90%', top: '7%' },
  { left: '90%', top: '21%' },
  { left: '90%', top: '35%' },
  { left: '90%', top: '49%' },
  { left: '90%', top: '63%' },
  { left: '90%', top: '77%' },
];

function useIsDesktop() {
  const query = '(min-width: 901px)';
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatch(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return match;
}

function useClock(lang: string) {
  const format = () =>
    new Date().toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  const [now, setNow] = useState(format);
  useEffect(() => {
    setNow(format());
    const id = window.setInterval(() => setNow(format()), 30_000);
    return () => window.clearInterval(id);
  }, [lang]);
  return now;
}

interface DeskWindowProps {
  id: string;
  layer: number;
  onFocus: (id: string) => void;
  area: RefObject<HTMLDivElement | null>;
  draggable: boolean;
  style: CSSProperties;
  children: ReactNode;
}

function DeskWindow({ id, layer, onFocus, area, draggable, style, children }: DeskWindowProps) {
  return (
    <motion.div
      className="desk-item draggable"
      style={{ ...style, zIndex: 10 + layer }}
      drag={draggable}
      dragConstraints={area}
      dragMomentum={false}
      dragElastic={0.05}
      onPointerDown={() => onFocus(id)}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.08 * (5 - layer) }}
    >
      {children}
    </motion.div>
  );
}

export function Desktop({ works, onToast }: DesktopProps) {
  const { t, lang } = useLang();
  const d = t.desktop;
  const area = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const clock = useClock(lang);
  const [order, setOrder] = useState<string[]>(['contact', 'latest', 'stats', 'disciplines', 'photo', 'hello']);
  const latest = works[0];

  const focus = (id: string) => setOrder((prev) => [...prev.filter((x) => x !== id), id]);

  const copyEmail = async () => {
    audioEngine.playClick(1.2);
    if (await copyText(EMAIL)) onToast(`${t.bar.emailCopied} — ${EMAIL}`);
  };

  const win = (id: string) => ({
    id,
    layer: order.indexOf(id),
    onFocus: focus,
    area,
    draggable: isDesktop,
  });

  const pixelSize = isDesktop ? 54 : 44;

  return (
    <section className="desktop" ref={area}>
      <div className="menubar">
        <nav>
          <span>
            <b>◆ Lorena OS</b>
          </span>
          {d.menu.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
        <span>{clock}</span>
      </div>

      <div className="desk-folders">
        {works.slice(0, 12).map((w, i) => (
          <motion.a
            key={w.slug}
            href={PATHS.case(w.slug)}
            className="desk-item folder-btn"
            style={FOLDER_SLOTS[i]}
            onClick={() => audioEngine.playClick(1.3)}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 + i * 0.04 }}
          >
            <span className="folder" style={{ background: `${w.globeColor}d0` }} />
            <span className="folder-name">{w.title}</span>
          </motion.a>
        ))}
      </div>

      <DeskWindow {...win('hello')} style={{ left: '21%', top: '8%', width: 'min(620px, 46%)' }}>
        <Window title={d.helloFile} >
          <div style={{ padding: '10px 8px 8px' }}>
            <div className="mono muted" style={{ fontSize: 14 }}>
              {d.hello}
            </div>
            <h1 className="display hello-name">Lorena Orlando</h1>
            <div className="shape-line">
              <span>{d.shapeLine}</span>
              <Selection label={d.editing}>
                <PixelText text={d.shapeWord} size={pixelSize} scale={isDesktop ? 2 : 1.5} />
              </Selection>
            </div>
            <p className="hello-intro">{d.intro}</p>
            <div className="btn-row">
              <a className="chip solid" href={PATHS.works} onClick={() => audioEngine.playClick(1.1)}>
                {d.seeWorks} →
              </a>
              <button className="chip" onClick={copyEmail}>
                {d.copyEmail}
              </button>
            </div>
          </div>
        </Window>
      </DeskWindow>

      <DeskWindow {...win('photo')} style={{ left: '69%', top: '6%', width: '16%' }}>
        <Window title={d.photoFile} bodyClassName="">
          <div style={{ aspectRatio: '4 / 5' }}>
            <Photo src={PROFILE_PHOTO} alt="Lorena Orlando" />
          </div>
        </Window>
      </DeskWindow>

      <DeskWindow {...win('disciplines')} style={{ left: '66.5%', top: '44%', width: '22%' }}>
        <Window title={d.disciplinesFile} >
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
      </DeskWindow>

      <DeskWindow {...win('stats')} style={{ left: '3%', top: '63%', width: '22%' }}>
        <Window title={d.statsFile}>
          <div className="stats">
            {t.stats.map((s) => (
              <div className="stat" key={s.l}>
                <div className="n">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </Window>
      </DeskWindow>

      {latest && (
        <DeskWindow {...win('latest')} style={{ left: '27%', top: '61%', width: '19%' }}>
          <Window title={d.latestFile} bodyClassName="">
            <a href={PATHS.case(latest.slug)} style={{ display: 'block' }}>
              <Shot color={latest.globeColor} image={latest.imageUrl} alt={latest.title} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 15 }}>
                <span>{latest.title}</span>
                <span className="mono muted">{latest.year} ↗</span>
              </div>
            </a>
          </Window>
        </DeskWindow>
      )}

      <DeskWindow {...win('contact')} style={{ left: '48%', top: '66%', width: '17%' }}>
        <Window title={d.contactFile} dark>
          <div className="display" style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            {d.workTogether}
          </div>
          <button className="mono" onClick={copyEmail} style={{ marginTop: 14, fontSize: 11, color: '#3ddc6f', display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left', overflowWrap: 'anywhere' }}>
            <span className="dot-led" /> {EMAIL}
          </button>
        </Window>
      </DeskWindow>

      <div className="desk-hint">
        {d.dragHint} · ↓ {d.scroll}
      </div>
    </section>
  );
}
