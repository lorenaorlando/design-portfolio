/** loOS emblem: a pair of round purple glasses with rose-tinted lenses. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <g stroke="var(--morado)" strokeWidth="2" strokeLinecap="round">
        <path d="M3.6 15.2L1.6 12.4" />
        <path d="M28.4 15.2L30.4 12.4" />
        <path d="M14 16.2Q16 14.2 18 16.2" />
        <circle cx="9" cy="17.6" r="5.6" fill="#F6D7EC" />
        <circle cx="23" cy="17.6" r="5.6" fill="#F6D7EC" />
      </g>
      <g stroke="#fff" strokeWidth="1.4" strokeLinecap="round">
        <path d="M6.2 16.4Q7 14.6 8.8 14.3" />
        <path d="M20.2 16.4Q21 14.6 22.8 14.3" />
      </g>
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
