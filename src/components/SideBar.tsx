import { Mail } from 'lucide-react';
import { EMAIL, LINKEDIN_URL } from '../content/copy';
import { copyText } from '../lib/clipboard';
import { useLang } from '../lib/i18n';
import { PATHS, Route } from '../lib/router';
import { playClick } from '../lib/sound';
import { LogoMark } from './Logo';

interface SideBarProps {
  route: Route;
  onToast: (message: string) => void;
}

export function SideBar({ route, onToast }: SideBarProps) {
  const { t, lang, setLang } = useLang();
  const active = route.page === 'case' ? 'works' : route.page === 'play' ? 'playground' : route.page;
  const items = [
    { id: 'home', label: t.nav.home, href: PATHS.home },
    { id: 'works', label: t.nav.works, href: PATHS.works },
    { id: 'playground', label: t.nav.playground, href: PATHS.playground },
    { id: 'pricing', label: t.nav.pricing, href: PATHS.pricing },
    { id: 'about', label: t.nav.about, href: PATHS.about },
    { id: 'cv', label: t.nav.cv, href: PATHS.cv },
  ];

  const click = () => playClick(1.1);

  const copyEmail = async () => {
    click();
    if (await copyText(EMAIL)) onToast(`${t.bar.emailCopied} — ${EMAIL}`);
  };

  return (
    <aside className="bar" aria-label="Menu">
      <a className="bar-logo" href={PATHS.home} onClick={click} aria-label="Lorena Orlando">
        <LogoMark size={38} />
        <span className="logo bar-wordmark">
          <span className="logo-lo">lo</span>
          <span className="logo-os">OS</span>
        </span>
      </a>

      <div className="bar-group">
        <nav>
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

        <div className="bar-section">
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
          <button
            className="key lang-toggle"
            onClick={() => {
              click();
              setLang(lang === 'es' ? 'en' : 'es');
            }}
            aria-label={t.bar.language}
          >
            <span className="label">{lang === 'es' ? 'EN' : 'ES'}</span>
          </button>
        </div>

        <div className="bar-section bar-extra">
          <div className="bar-label">{t.bar.contact}</div>
          <div className="keys">
            <a className="key contact-key" href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={click}>
              <LinkedInGlyph />
              <span>LinkedIn</span>
            </a>
            <button className="key contact-key" onClick={copyEmail}>
              <Mail strokeWidth={1.8} />
              <span>{t.bar.email}</span>
            </button>
          </div>
        </div>

        <div className="bar-status">
          <span className="dot-led" />
          {t.bar.available}
        </div>
      </div>
    </aside>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="currentColor" />
      <path d="M7.6 10.2v6.3M7.6 7.4v.01M11.2 16.5v-6.3M11.2 13.1c0-1.7 1-2.9 2.5-2.9s2.4 1 2.4 2.8v3.5" stroke="#fffbf2" strokeWidth="1.9" strokeLinecap="round" fill="none" />
    </svg>
  );
}
