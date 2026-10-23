import { motion } from 'motion/react';
import { CSSProperties, ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EMAIL, PROFILE_PHOTO } from '../content/copy';
import { useLang } from '../lib/i18n';
import { PATHS } from '../lib/router';
import { playClick } from '../lib/sound';
import { DesktopIcon, MailAppIcon } from './DesktopIcon';
import { Logo } from './Logo';
import { Photo } from './Photo';
import { PhotoBooth } from './PhotoBooth';
import { Selection } from './Selection';
import { Window } from './Window';

type WinId = 'hello' | 'profile' | 'currently' | 'photo';

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

/** Scales the desktop grid down so every window fits in the first screen. */
function useFitToScreen(ref: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const [fit, setFit] = useState({ zoom: 1, height: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !enabled) {
      setFit({ zoom: 1, height: 0 });
      return;
    }
    const measure = () => {
      // offsetHeight ignores the transform, so this is the unscaled height.
      const natural = el.offsetHeight;
      const available = window.innerHeight - 34 - 96; // menubar, bottom hint and breathing room
      const zoom = Math.max(0.6, Math.min(1, available / natural));
      setFit({ zoom, height: natural * zoom });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [ref, enabled]);
  return fit;
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
  id: WinId;
  layer: number;
  onFocus: (id: WinId) => void;
  draggable: boolean;
  className: string;
  style?: CSSProperties;
  children: ReactNode;
}

function DeskWindow({ id, layer, onFocus, draggable, className, style, children }: DeskWindowProps) {
  return (
    <motion.div
      className={`desk-item draggable ${className}`}
      style={{ ...style, zIndex: 10 + layer }}
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.05}
      onPointerDown={() => onFocus(id)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}

export function Desktop() {
  const { t, lang } = useLang();
  const d = t.desktop;
  const isDesktop = useIsDesktop();
  const gridRef = useRef<HTMLDivElement>(null);
  const { zoom, height } = useFitToScreen(gridRef, isDesktop);
  const clock = useClock(lang);
  const [order, setOrder] = useState<WinId[]>(['currently', 'profile', 'hello']);
  const [closed, setClosed] = useState<WinId[]>(['photo']);
  const [minimized, setMinimized] = useState<WinId[]>([]);

  const focus = (id: WinId) => setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  const open = (id: WinId) => {
    playClick(1.3);
    setClosed((prev) => prev.filter((x) => x !== id));
    setMinimized((prev) => prev.filter((x) => x !== id));
    focus(id);
  };
  const close = (id: WinId) => () => setClosed((prev) => [...prev, id]);
  const toggleMin = (id: WinId) => () =>
    setMinimized((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const restore = () => {
    setClosed(['photo']);
    setMinimized([]);
  };

  const win = (id: WinId) => ({ id, layer: order.indexOf(id), onFocus: focus, draggable: isDesktop });
  const controls = (id: WinId) => ({ onClose: close(id), onMinimize: toggleMin(id), minimized: minimized.includes(id) });
  const isOpen = (id: WinId) => !closed.includes(id);
  const somethingHidden = closed.some((id) => id !== 'photo') || minimized.length > 0;

  return (
    <section className="desktop">
      <div className="menubar">
        <Logo size={15} mark />
        <span className="menubar-right">
          {somethingHidden && (
            <button className="menubar-btn" onClick={restore}>
              ↺ {d.restore}
            </button>
          )}
          <span>{clock}</span>
        </span>
      </div>

      <div className="desk-grid-wrap" style={{ height: zoom < 1 ? height : undefined }}>
      <div className="desk-grid" ref={gridRef} style={{ transform: zoom < 1 ? `scale(${zoom})` : undefined }}>
      <div className="desk-icons">
        <DesktopIcon
          label={d.photoFile}
          onClick={() => open('photo')}
          icon={
            <span className="file-thumb">
              <Photo src={PROFILE_PHOTO} alt="" />
            </span>
          }
        />
        <DesktopIcon label={d.mailIcon} href={`mailto:${EMAIL}`} onClick={() => playClick(1.2)} icon={<MailAppIcon />} />
      </div>

      {isOpen('hello') && (
        <DeskWindow {...win('hello')} className="area-hello">
          <Window title={d.helloFile} {...controls('hello')}>
            <div style={{ padding: '10px 8px 8px' }}>
              <div className="mono muted" style={{ fontSize: 14 }}>
                {d.hello}
              </div>
              <h1 className="display hello-name">Lorena Orlando</h1>
              <p className="shape-line">
                {d.shapeBefore}{' '}
                <Selection label={d.editing}>
                  <span className="accent-word">{d.shapeWord}</span>
                </Selection>{' '}
                {d.shapeAfter}
              </p>
              <div className="btn-row" style={{ marginTop: 34 }}>
                <a className="chip solid" href={PATHS.works} onClick={() => playClick(1.1)}>
                  {d.seeWorks} →
                </a>
              </div>
            </div>
          </Window>
        </DeskWindow>
      )}

      {isOpen('profile') && (
        <DeskWindow {...win('profile')} className="area-profile">
          <Window title={d.profileFile} {...controls('profile')}>
            {t.disciplines.map((x, i) => (
              <div className="discipline" key={x.title}>
                <span className="n">0{i + 1}</span>
                <div>
                  <div className="t">{x.title}</div>
                  <div className="s">{x.sub}</div>
                </div>
              </div>
            ))}
            <div className="stats stats-row">
              {t.stats.map((s) => (
                <div className="stat" key={s.l}>
                  <div className="n">{s.n}</div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </Window>
        </DeskWindow>
      )}

      {isOpen('currently') && (
        <DeskWindow {...win('currently')} className="area-currently">
          <Window title={d.currentlyFile} {...controls('currently')}>
            <div className="mono" style={{ fontSize: 13, color: 'var(--accent)' }}>
              {d.currentlyTitle}
            </div>
            {t.currently.map((c) => (
              <div className="currently-row" key={c.company}>
                <span className="dot-led" />
                <div>
                  <div className="company">{c.company}</div>
                  <div className="role">
                    {c.role} · {c.since}
                  </div>
                </div>
              </div>
            ))}
          </Window>
        </DeskWindow>
      )}

      {isOpen('photo') && (
        <DeskWindow {...win('photo')} className="desk-float">
          <Window title={d.photoBooth} bodyClassName="" {...controls('photo')}>
            <PhotoBooth />
          </Window>
        </DeskWindow>
      )}

      </div>
      </div>

      <div className="desk-hint">
        {d.dragHint} · ↓ {d.scroll}
      </div>
    </section>
  );
}
