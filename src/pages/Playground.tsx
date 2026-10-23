import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Window } from '../components/Window';
import { PLAYGROUND, PlaygroundItem } from '../data/playgroundData';
import { useLang } from '../lib/i18n';

const SPANS = ['span-2', 'span-1', 'span-3'];

function Media({ item, index = 0 }: { item: PlaygroundItem; index?: number }) {
  const src = item.images?.[index];
  return (
    <div className="pg-media" style={{ ['--c' as string]: item.color }}>
      {src ? <img src={src} alt="" /> : <span className="pg-media-ph" aria-hidden="true" />}
    </div>
  );
}

function Detail({ item, onClose }: { item: PlaygroundItem; onClose: () => void }) {
  const { t, lang } = useLang();
  const p = t.playground;
  const [active, setActive] = useState(0);
  const thumbs = item.images?.length ? item.images.length : 4;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div className="modal" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal-win"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        role="dialog"
        aria-modal="true"
        aria-label={item.title[lang]}
      >
        <Window title={item.file} bodyClassName="detail" onClose={onClose}>
          <div className="detail-media">
            <div className="detail-stage">
              <Media item={item} index={active} />
            </div>
            <div className="detail-thumbs">
              {Array.from({ length: thumbs }, (_, i) => (
                <button key={i} className={`detail-thumb ${active === i ? 'on' : ''}`} onClick={() => setActive(i)} aria-label={`${i + 1}`}>
                  <Media item={item} index={i} />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-info">
            <h2 className="pg-title">{item.title[lang]}</h2>
            <div className="detail-row">
              <span className="muted">{p.tools}</span>
              <span>{item.tools || '—'}</span>
            </div>
            <p>{item.description?.[lang] ?? p.placeholder}</p>
            {item.url && (
              <a className="chip solid" href={item.url} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start' }}>
                {item.url.replace(/^https?:\/\//, '')} ↗
              </a>
            )}
          </div>
        </Window>
      </motion.div>
    </motion.div>
  );
}

export function Playground() {
  const { t, lang } = useLang();
  const p = t.playground;
  const [open, setOpen] = useState<PlaygroundItem | null>(null);

  return (
    <div className="page">
      <div className="kicker">{p.kicker}</div>
      <h1 className="pg-hero">{p.title}</h1>
      <p style={{ fontSize: 20, color: 'var(--ink-2)', marginTop: 16, maxWidth: 640 }}>{p.subtitle}</p>

      <div className="pg-grid">
        {PLAYGROUND.map((item, i) => (
          <Reveal key={item.slug} from={i % 2 ? 'right' : 'left'} delay={i * 0.06} className={SPANS[i % SPANS.length]}>
            <button className="pg-card" onClick={() => setOpen(item)}>
              <Window title={item.file} bodyClassName="">
                <div className="pg-card-body">
                  <Media item={item} />
                  <div className="pg-card-label">
                    <span className="pg-title">{item.title[lang]}</span>
                    {!item.description && <span className="chip small">{p.soon}</span>}
                  </div>
                </div>
              </Window>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>{open && <Detail item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}
