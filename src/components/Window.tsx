import { ReactNode } from 'react';

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  dark?: boolean;
}

export function Window({ title, children, className = '', bodyClassName = 'win-body', dark }: WindowProps) {
  return (
    <div className={`win ${dark ? 'dark' : ''} ${className}`}>
      <div className="win-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="title">{title}</span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
