import { ReactNode } from 'react';

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}

export function DesktopIcon({ label, icon, href, onClick }: DesktopIconProps) {
  const inner = (
    <>
      <span className="desk-icon-art">{icon}</span>
      <span className="desk-icon-name">{label}</span>
    </>
  );
  return href ? (
    <a className="desk-icon" href={href} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <button className="desk-icon" onClick={onClick}>
      {inner}
    </button>
  );
}

export function MailAppIcon() {
  return (
    <span className="mail-app">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="13" width="34" height="23" rx="3" fill="#fff" />
        <path d="M8 15l16 12 16-12" fill="none" stroke="#9ab8d8" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
