import { useState } from 'react';

export function Photo({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="photo-ph" aria-hidden="true" />
      {ok && (
        <img
          src={src}
          alt={alt}
          onError={() => setOk(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  );
}
