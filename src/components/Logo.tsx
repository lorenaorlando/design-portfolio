// Scalloped badge outline: eight rounded lobes around the center of a 32×32 box.
const SCALLOP = (() => {
  const points: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    const r = 11.2 + 3.4 * Math.abs(Math.cos(4 * a));
    points.push(`${(16 + r * Math.cos(a)).toFixed(2)},${(16 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${points.join('L')}Z`;
})();

/** loOS emblem: scalloped badge, a rounded diamond and a four-point sparkle. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d={SCALLOP} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="10.4" y="10.4" width="11.2" height="11.2" rx="2.4" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.3" />
      <path d="M16 11.4Q16.5 15.5 20.6 16Q16.5 16.5 16 20.6Q15.5 16.5 11.4 16Q15.5 15.5 16 11.4Z" fill="var(--magenta)" />
    </svg>
  );
}

/** "loOS" wordmark, a nod to the classic Mac OS logotype. */
export function Logo({ size = 22, mark = false }: { size?: number; mark?: boolean }) {
  return (
    <span className="logo" style={{ fontSize: size }} aria-label="loOS">
      {mark && <LogoMark size={Math.round(size * 1.25)} />}
      <span>
        <span className="logo-lo">lo</span>
        <span className="logo-os">OS</span>
      </span>
    </span>
  );
}
