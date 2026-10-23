import { useEffect, useRef, useState } from 'react';

interface ShotProps {
  color: string;
  image?: string;
  video?: string;
  alt: string;
  square?: boolean;
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
 * Project media with a colored placeholder underneath, so the layout holds
 * while the real image or video loads (or if it is missing). Videos play on
 * their own, muted, while they are on screen.
 */
export function Shot({ color, image, video, alt, square, seed = 0 }: ShotProps) {
  const [imageOk, setImageOk] = useState(true);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const box = ref.current;
    const el = videoRef.current;
    if (!box || !el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div ref={ref} className={`shot ${square ? 'square' : ''} ${playing ? 'playing' : ''}`} style={{ ['--c' as string]: color }}>
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
          preload="metadata"
          onPlaying={() => setPlaying(true)}
          aria-label={alt}
        />
      )}
    </div>
  );
}
