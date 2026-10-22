import { ReactNode } from 'react';

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  dark?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  minimized?: boolean;
}

/** A macOS-style window. Close and minimize work only when handlers are given. */
export function Window({ title, children, className = '', bodyClassName = 'win-body', dark, onClose, onMinimize, minimized }: WindowProps) {
  return (
    <div className={`win ${dark ? 'dark' : ''} ${className}`}>
      <div className="win-bar">
        <span className="dots">
          <button className="light close" onClick={onClose} disabled={!onClose} aria-label="Close" tabIndex={onClose ? 0 : -1} />
          <button className="light min" onClick={onMinimize} disabled={!onMinimize} aria-label="Minimize" tabIndex={onMinimize ? 0 : -1} />
          <span className="light max" aria-hidden="true" />
        </span>
        <span className="title">{title}</span>
      </div>
      {!minimized && <div className={bodyClassName}>{children}</div>}
    </div>
  );
}
