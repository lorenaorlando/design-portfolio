import { useEffect, useRef } from 'react';

interface PixelTextProps {
  text: string;
  /** Font size in CSS pixels. */
  size: number;
  /** Size of one "pixel" of the effect. */
  scale?: number;
  color?: string;
  font?: string;
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/**
 * Renders text as a dithered, pixelated bitmap (the italic accent word),
 * drawn at low resolution on a canvas and scaled up with crisp pixels.
 */
export function PixelText({ text, size, scale = 3, color = '#202020', font = "italic 400 {s}px 'Instrument Serif'" }: PixelTextProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const draw = async () => {
      const fontAt = (s: number) => font.replace('{s}', String(s));
      try {
        await document.fonts.load(fontAt(size), text);
      } catch {
        // Fall back to whatever font is available.
      }
      const canvas = ref.current;
      if (cancelled || !canvas) return;
      const measure = document.createElement('canvas').getContext('2d')!;
      measure.font = fontAt(size);
      const width = Math.ceil(measure.measureText(text).width + size * 0.15);
      const height = Math.ceil(size * 1.15);
      canvas.width = Math.ceil(width / scale);
      canvas.height = Math.ceil(height / scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontAt(size / scale);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, size / scale / 90);
      const baseline = (size * 0.88) / scale;
      ctx.fillText(text, 0, baseline);
      ctx.strokeText(text, 0, baseline);
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const p = i / 4;
        const x = p % canvas.width;
        const y = Math.floor(p / canvas.width);
        const threshold = 0.2 + (0.6 * (BAYER[(y % 4) * 4 + (x % 4)] + 0.5)) / 16;
        img.data[i + 3] = img.data[i + 3] / 255 > threshold ? 255 : 0;
      }
      ctx.putImageData(img, 0, 0);
    };
    draw();
    return () => {
      cancelled = true;
    };
  }, [text, size, scale, color, font]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={text}
      style={{ imageRendering: 'pixelated', display: 'block', marginBottom: -size * 0.2 }}
    />
  );
}
