import { useRef, useState } from 'react';

interface ShotProps {
  color: string;
  image?: string;
  video?: string;
  alt: string;
  /** Play the video on hover (lists) or always (case study). */
  autoplay?: boolean;
  seed?: number;
}

const LAYOUTS = [
  [
    { left: '10%', top: '30%', width: '46%', height: '10%' },
    { left: '10%', top: '45%', width: '30%', height: '5%', opacity: 0.6 },
    { left: '60%', top: '28%', width: '30%', height: '50%', opacity: 0.5 },
  ],
  [
    { left: '8%', top: '62%', width: '60%', height: '12%' },
    { left: '8%', top: '30%', width: '84%', height: '24%', opacity: 0.4 },
  ],
  [
    { left: '25%', top: '34%', width: '50%', height: '14%' },
    { left: '36%', top: '54%', width: '28%', height: '6%', opacity: 0.6 },
    { left: '8%', top: '78%', width: '84%', height: '10%', opacity: 0.35 },
  ],
];

/**
 * Project screenshot with a colored placeholder underneath, so the layout
 * holds while the real image loads (or if it is missing).
 */
export function Shot({ color, image, video, alt, autoplay, seed = 0 }: ShotProps) {
  const [imageOk, setImageOk] = useState(true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const el = videoRef.current;
    if (!el || autoplay) return;
    el.pause();
    setPlaying(false);
  };

  return (
    <div
      className={`shot ${playing ? 'playing' : ''}`}
      style={{ ['--c' as string]: color }}
      onMouseEnter={video ? start : undefined}
      onMouseLeave={video ? stop : undefined}
    >
      <div className="shot-ph" aria-hidden="true">
        {LAYOUTS[seed % LAYOUTS.length].map((s, i) => (
          <i key={i} style={s} />
        ))}
      </div>
      {image && imageOk && <img src={image} alt={alt} loading="lazy" onError={() => setImageOk(false)} />}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload={autoplay ? 'auto' : 'none'}
          autoPlay={autoplay}
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}
