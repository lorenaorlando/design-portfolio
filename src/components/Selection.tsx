import { ReactNode } from 'react';

interface SelectionProps {
  label: string;
  children: ReactNode;
}

const CORNERS = [
  { left: -5, top: -5 },
  { right: -5, top: -5 },
  { left: -5, bottom: -5 },
  { right: -5, bottom: -5 },
];

/** Figma-style selection box with handles, a collaborator tag and a cursor. */
export function Selection({ label, children }: SelectionProps) {
  return (
    <span className="selection">
      {children}
      {CORNERS.map((pos, i) => (
        <i key={i} className="handle" style={pos} />
      ))}
      <span className="tag">{label}</span>
      <svg className="cursor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
