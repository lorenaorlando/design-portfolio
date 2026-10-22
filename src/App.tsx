import { useEffect, useMemo, useRef, useState } from 'react';
import { SideBar } from './components/SideBar';
import { COPY } from './content/copy';
import { getWorksData } from './data/worksData';
import { LangContext } from './lib/i18n';
import { useRoute } from './lib/router';
import { About } from './pages/About';
import { CaseStudy } from './pages/CaseStudy';
import { Cv } from './pages/Cv';
import { Home } from './pages/Home';
import { Playground } from './pages/Playground';
import { Pricing } from './pages/Pricing';
import { Works } from './pages/Works';
import { Language } from './types';
import { detectLanguageByIp, getInitialLanguage, saveLanguagePreference } from './lib/geoLanguage';

export default function App() {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const route = useRoute();
  const works = useMemo(() => getWorksData(lang), [lang]);

  useEffect(() => {
    let mounted = true;
    detectLanguageByIp().then((detected) => {
      if (mounted && detected) setLangState(detected);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    saveLanguagePreference(next);
    setLangState(next);
  };

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  };

  const ctx = useMemo(() => ({ lang, t: COPY[lang], setLang }), [lang]);

  let page;
  switch (route.page) {
    case 'works':
      page = <Works works={works} />;
      break;
    case 'playground':
      page = <Playground />;
      break;
    case 'case':
      page = <CaseStudy works={works} slug={route.slug} />;
      break;
    case 'pricing':
      page = <Pricing onToast={showToast} />;
      break;
    case 'about':
      page = <About />;
      break;
    case 'cv':
      page = <Cv />;
      break;
    default:
      page = <Home works={works} onToast={showToast} />;
  }

  return (
    <LangContext.Provider value={ctx}>
      <SideBar route={route} onToast={showToast} />
      <main className="app-main">
        {page}
        <footer className="footer">
          <span>{COPY[lang].footer}</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </main>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </LangContext.Provider>
  );
}
