import { useState, useEffect } from 'react';
import { MonitorSettings } from './types';
import { RetroMonitor } from './components/RetroMonitor';
import { getInitialLanguage, detectLanguageByIp } from './utils/geoLanguage';

export default function App() {
  const [settings, setSettings] = useState<MonitorSettings>(() => ({
    power: 'on',
    crtMode: 'clean',
    audioMuted: false,
    tilt: 0,
    brightness: 100,
    contrast: 100,
    viewMode: 'desktop',
    activeTab: 'product',
    language: getInitialLanguage(),
  }));

  const [currentScreen, setCurrentScreen] = useState<1 | 3 | 4 | 5 | 6>(1);

  // Auto-detect language by IP on initial mount (if not manually chosen)
  useEffect(() => {
    let isMounted = true;
    detectLanguageByIp().then((detectedLang) => {
      if (isMounted && detectedLang) {
        setSettings((prev) => {
          if (prev.language !== detectedLang) {
            return { ...prev, language: detectedLang };
          }
          return prev;
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main
      id="app-root-viewport"
      className="fixed inset-0 w-screen h-screen overflow-hidden p-0 m-0 bg-[#e8e4d4] select-none touch-auto"
    >
      <RetroMonitor
        settings={settings}
        onUpdateSettings={setSettings}
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </main>
  );
}

