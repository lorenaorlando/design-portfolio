import React from 'react';
import { Globe, Maximize2, Minimize2, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { MonitorSettings } from '../types';
import { audioEngine } from '../utils/audio';
import { TRANSLATIONS } from '../data/translations';

interface TopStatusBarProps {
  settings: MonitorSettings;
  onUpdateSettings: (updater: (prev: MonitorSettings) => MonitorSettings) => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const isFocused = settings.viewMode === 'focus';
  const t = TRANSLATIONS[settings.language || 'en'];

  const toggleLanguage = () => {
    audioEngine.playClick(1.4);
    onUpdateSettings((s) => ({
      ...s,
      language: s.language === 'en' ? 'es' : 'en',
    }));
  };

  const toggleViewMode = () => {
    audioEngine.playClick(1.2);
    onUpdateSettings((s) => ({
      ...s,
      viewMode: s.viewMode === 'focus' ? 'desktop' : 'focus',
    }));
  };

  const handleReset = () => {
    audioEngine.playClick(0.9);
    onUpdateSettings((s) => ({
      ...s,
      power: 'on',
      crtMode: 'clean',
      tilt: 0,
      brightness: 100,
      contrast: 100,
      viewMode: 'desktop',
      activeTab: 'product',
      language: s.language || 'es',
    }));
  };

  return (
    <header
      id="top-workspace-bar"
      className="w-full max-w-5xl mx-auto px-4 py-3 flex items-center justify-between z-30 select-none"
    >
      {/* Title & Architecture badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-800">
            {t.topBar.hardwareTitle}
          </span>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-neutral-200/80 text-neutral-600 font-mono">
          <Sparkles className="w-3 h-3 text-amber-600" />
          100% Vector CSS & SVG
        </span>
      </div>

      {/* Action Controls Pill */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-md border border-neutral-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {/* Language Switcher Button */}
        <button
          id="btn-top-lang-toggle"
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/90 border border-amber-300/80 transition-colors cursor-pointer"
          title={t.topBar.langTooltip}
        >
          <Globe className="w-3.5 h-3.5 text-amber-700" />
          <span className="font-mono tracking-wider font-bold">
            {settings.language === 'en' ? 'EN' : 'ES'}
          </span>
        </button>

        <div className="w-[1px] h-4 bg-neutral-200 my-auto" />

        {/* Focus / Full View Toggle */}
        <button
          id="btn-view-mode-toggle"
          type="button"
          onClick={toggleViewMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          title={isFocused ? 'Switch to Full Hardware View' : 'Zoom into Screen Canvas'}
        >
          {isFocused ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.topBar.fullHardware}</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.topBar.focusViewport}</span>
            </>
          )}
        </button>

        <div className="w-[1px] h-4 bg-neutral-200 my-auto" />

        {/* Audio Toggle */}
        <button
          id="btn-quick-sound-toggle"
          type="button"
          onClick={() => {
            const nextMuted = !settings.audioMuted;
            audioEngine.setMuted(nextMuted);
            if (!nextMuted) audioEngine.playClick(1.0);
            onUpdateSettings((s) => ({ ...s, audioMuted: nextMuted }));
          }}
          className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            settings.audioMuted
              ? 'text-neutral-400 hover:bg-neutral-100'
              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
          }`}
          title={settings.audioMuted ? t.topBar.unmute : t.topBar.mute}
        >
          {settings.audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Reset */}
        <button
          id="btn-quick-reset"
          type="button"
          onClick={handleReset}
          className="p-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          title={t.topBar.reset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
