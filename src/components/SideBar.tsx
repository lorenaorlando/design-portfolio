import { Linkedin, Mail } from 'lucide-react';
import { EMAIL, LINKEDIN_URL } from '../content/copy';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';
import { PATHS, Route } from '../lib/router';
import { audioEngine } from '../utils/audio';

interface SideBarProps {
  route: Route;
  onToast: (message: string) => void;
}

export function Logo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 4v15h6" />
      <circle cx="16.5" cy="13.5" r="4.5" />
    </svg>
  );
}

export function SideBar({ route, onToast }: SideBarProps) {
  const { t, lang, setLang } = useLang();
  const active = route.page === 'case' ? 'works' : route.page;
  const items = [
    { id: 'home', label: t.nav.home, href: PATHS.home },
    { id: 'works', label: t.nav.works, href: PATHS.works },
    { id: 'pricing', label: t.nav.pricing, href: PATHS.pricing },
    { id: 'about', label: t.nav.about, href: PATHS.about },
    { id: 'cv', label: t.nav.cv, href: PATHS.cv },
  ];

  const click = () => audioEngine.playClick(1.1);

  const copyEmail = async () => {
    click();
    if (await copyText(EMAIL)) onToast(`${t.bar.emailCopied} — ${EMAIL}`);
  };

  return (
    <aside className="bar" aria-label="Menu">
      <a className="bar-logo" href={PATHS.home} onClick={click} aria-label="Lorena Orlando">
        <Logo />
      </a>

      <nav className="bar-keys">
        <div className="keys">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={click}
              className={`key ${active === item.id ? 'on' : ''}`}
              aria-current={active === item.id ? 'page' : undefined}
            >
              <span className="led" />
              <span className="label">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="bar-label">{t.bar.language}</div>
      <div className="keys row">
        {(['es', 'en'] as const).map((code) => (
          <button
            key={code}
            className={`key ${lang === code ? 'on' : ''}`}
            onClick={() => {
              click();
              setLang(code);
            }}
            aria-pressed={lang === code}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="bar-label">{t.bar.contact}</div>
      <div className="keys row bar-extra">
        <a className="key" href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={click} aria-label="LinkedIn">
          <Linkedin />
        </a>
        <button className="key" onClick={copyEmail} aria-label={EMAIL}>
          <Mail />
        </button>
      </div>

      <div className="bar-status">
        <span className="dot-led" />
        {t.bar.available}
      </div>
    </aside>
  );
}
