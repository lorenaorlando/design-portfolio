import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { KeyboardEvent, useState } from 'react';
import { PROFILE_PHOTOS } from '../content/copy';
import { useLang } from '../lib/i18n';
import { playClick } from '../lib/sound';
import { Photo } from './Photo';

const FILTERS = ['none', 'grayscale(1) contrast(1.1)', 'sepia(0.75) contrast(1.05)', 'saturate(1.9) contrast(1.15) hue-rotate(-12deg)'];

/** Photo gallery styled after macOS Photo Booth: viewer, shutter bar and film strip. */
export function PhotoBooth({ photos = PROFILE_PHOTOS }: { photos?: string[] }) {
  const { t } = useLang();
  const d = t.desktop;
  const [index, setIndex] = useState(0);
  const [effect, setEffect] = useState(0);
  const [flash, setFlash] = useState(0);
  const many = photos.length > 1;

  const go = (step: number) => setIndex((i) => (i + step + photos.length) % photos.length);
  const shoot = () => {
    playClick(0.7);
    setFlash((n) => n + 1);
    if (many) window.setTimeout(() => go(1), 140);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <div className="booth" tabIndex={0} onKeyDown={onKey} aria-roledescription="gallery">
      <div className="booth-stage">
        <div className="booth-photo" style={{ filter: FILTERS[effect] }}>
          <Photo key={photos[index]} src={photos[index]} alt={`Lorena Orlando ${index + 1}`} />
        </div>
        {flash > 0 && <span key={flash} className="booth-flash" aria-hidden="true" />}
        {many && (
          <>
            <button className="booth-arrow left" onClick={() => go(-1)} aria-label="Anterior">
              <ChevronLeft />
            </button>
            <button className="booth-arrow right" onClick={() => go(1)} aria-label="Siguiente">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      <div className="booth-bar">
        <span className="booth-count mono">
          {index + 1}/{photos.length}
        </span>
        <button className="booth-shutter" onClick={shoot} aria-label={d.shutter}>
          <Camera />
        </button>
        <button className="booth-effects" onClick={() => setEffect((e) => (e + 1) % FILTERS.length)}>
          {d.effectsLabel}: {d.effects[effect]}
        </button>
      </div>
      <div className="booth-strip">
        {photos.map((src, i) => (
          <button key={src} className={`booth-thumb ${i === index ? 'on' : ''}`} onClick={() => setIndex(i)} aria-label={`${i + 1}`}>
            <Photo src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
