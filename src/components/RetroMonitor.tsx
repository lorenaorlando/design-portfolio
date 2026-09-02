import React, { useState, useRef } from 'react';
import { Check, Linkedin, Mail, Power } from 'lucide-react';
import { MonitorSettings } from '../types';
import { audioEngine } from '../utils/audio';
import { CrtScreen } from './CrtScreen';

interface RetroMonitorProps {
  settings: MonitorSettings;
  onUpdateSettings: (updater: (prev: MonitorSettings) => MonitorSettings) => void;
  currentScreen?: 1 | 3 | 4 | 5;
  onScreenChange?: (screen: 1 | 3 | 4 | 5) => void;
}

export const RetroMonitor: React.FC<RetroMonitorProps> = ({
  settings,
  onUpdateSettings,
  currentScreen = 1,
  onScreenChange,
}) => {
  // Active button identifier for secondary clicks
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const emailCopyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPowered = settings.power === 'on' || settings.power === 'warming';

  // Toggle Power on / off
  const handlePowerToggle = () => {
    audioEngine.playClick(1.2);
    if (isPowered) {
      audioEngine.playRelay();
      onUpdateSettings((s) => ({ ...s, power: 'off' }));
    } else {
      audioEngine.playRelay();
      audioEngine.playDegauss();
      onUpdateSettings((s) => ({ ...s, power: 'warming' }));
      setTimeout(() => {
        onUpdateSettings((s) => ({ ...s, power: 'on' }));
      }, 450);
    }
  };

  const handleLinkedIn = () => {
    if (!isPowered) return;
    setActiveBtn('linkedin');
    audioEngine.playClick(1.1);
    window.open('https://www.linkedin.com/in/lorenaorlando/', '_blank', 'noopener,noreferrer');
    setTimeout(() => setActiveBtn(null), 300);
  };

  const handleMail = async () => {
    if (!isPowered) return;
    setActiveBtn('mail');
    audioEngine.playClick(1.1);

    const email = 'soylorenaorlando@gmail.com';

    // 1. Copy automatically to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.warn('Clipboard write exception:', err);
    }

    // 2. Open mail client with mailto
    window.location.href = `mailto:${email}`;

    // 3. Temporarily show 'EMAIL COPIED!' for 2 seconds
    setEmailCopied(true);
    if (emailCopyTimeoutRef.current) clearTimeout(emailCopyTimeoutRef.current);
    emailCopyTimeoutRef.current = setTimeout(() => {
      setEmailCopied(false);
      setActiveBtn(null);
    }, 2000);
  };

  const handleNavClick = (screen: 1 | 3 | 4 | 5) => {
    if (!isPowered) return;
    audioEngine.playClick(1.25);
    if (onScreenChange) {
      onScreenChange(screen);
    }
  };

  return (
    <div
      id="retro-monitor-viewport"
      className="relative flex flex-col items-center justify-center w-full h-full p-0 sm:p-2 md:p-3 select-none overflow-hidden bg-black max-h-screen"
    >
      {/* ========================================================
          1. THE RETRO COMPUTER CHASSIS IN #F5E79D PALETTE
          Expanded to screen edges with smooth retro sculpted borders
         ======================================================== */}
      <div
        id="retro-monitor-chassis"
        className="relative w-full h-full rounded-none sm:rounded-[24px] md:rounded-[32px] p-1.5 sm:p-4 md:p-5 bezel-chassis-shadow flex flex-col sm:flex-row items-stretch justify-between overflow-hidden gap-1.5 sm:gap-3"
        style={{
          background: 'linear-gradient(175deg, #fefadb 0%, #f7edae 30%, #f5e79d 65%, #e8d682 100%)',
          border: '3px solid #eed67d',
        }}
      >
        {/* Soft plastic ambient top highlight & sheen */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(0,0,0,0) 65%)',
          }}
        />

        {/* ========================================================
            2.A MOBILE TOP BAR (POWER + NAV MENU) - ONLY ON MOBILE (< sm)
           ======================================================== */}
        <div
          id="mobile-top-controls-bar"
          className="flex sm:hidden z-10 w-full flex-row items-center justify-between px-2 py-1.5 bg-[#ebd88a]/35 border-b border-[#dec874]/80 rounded-[4px] shrink-0 select-none gap-2"
        >
          {/* Mobile Power Section */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Organic Soft Round Tactile Power Button (#FE9898 Coral Pink) */}
            <div
              className="p-0.5 rounded-full shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1.5px 2.5px rgba(0,0,0,0.6), 0 0.5px 1px rgba(255,255,255,0.45)',
                border: '1px solid #b8a147',
              }}
            >
              <button
                id="mobile-btn-power"
                onClick={handlePowerToggle}
                className="relative w-7 h-7 rounded-full transition-all duration-100 flex items-center justify-center cursor-pointer outline-none active:scale-95 active:translate-y-0.5"
                style={{
                  background: isPowered
                    ? 'radial-gradient(circle at 40% 35%, #ffd4d4 0%, #FE9898 45%, #ea7a7a 80%, #d86464 100%)'
                    : 'radial-gradient(circle at 40% 35%, #8f4d4d 0%, #683232 60%, #441d1d 100%)',
                  boxShadow: isPowered
                    ? '0 1.5px 3px rgba(0, 0, 0, 0.35), 0 0 8px rgba(254, 152, 152, 0.6), inset 0 1px 1.5px rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px rgba(160, 45, 45, 0.4)'
                    : '0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1.5px 2px rgba(0, 0, 0, 0.6)',
                  border: isPowered
                    ? '1px solid rgba(255, 230, 230, 0.8)'
                    : '1px solid rgba(100, 40, 40, 0.8)',
                }}
                title={isPowered ? 'Turn Off Monitor' : 'Turn On Monitor'}
              >
                <Power 
                  className={`w-3.5 h-3.5 transition-all ${
                    isPowered 
                      ? 'opacity-90 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.6)]' 
                      : 'opacity-40'
                  }`}
                  style={{ color: '#b2778a' }}
                />
              </button>
            </div>

            {/* Green Power LED Pill */}
            <div
              className="shrink-0 flex items-center justify-center p-0.5 rounded-[2px]"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
                border: '1px solid #bba44b',
              }}
              title="System Power LED"
            >
              <div
                className={`w-3 h-1.5 rounded-[1px] transition-all duration-300 ${
                  isPowered
                    ? 'bg-[#4ef985] shadow-[0_0_6px_#4ef985,0_0_10px_rgba(78,249,133,0.8)]'
                    : 'bg-[#1b4e28] opacity-40'
                }`}
              />
            </div>
          </div>

          {/* Mobile Nav Menu (Horizontal Buttons) */}
          <div
            className="flex flex-row gap-1 p-1 rounded-[4px] bg-[#cbb55a] flex-1 max-w-[270px] justify-between items-center"
            style={{
              boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
              border: '1px solid #b8a147',
            }}
          >
            {[
              { label: 'START', screen: 1, color: '#6d540d' },
              { label: 'WORKS', screen: 3, color: '#6d540d' },
              { label: 'ABOUT', screen: 4, color: '#9f853f' },
              { label: 'CV', screen: 5, color: '#8c7f56' },
            ].map((item) => {
              const isActive = currentScreen === item.screen && isPowered;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.screen as any)}
                  disabled={!isPowered}
                  className={`flex-1 py-1 px-1 rounded-[2px] transition-all duration-75 select-none text-[8.5px] font-share-tech-mono font-bold tracking-wider uppercase flex items-center justify-center cursor-pointer outline-none border ${
                    isActive
                      ? 'translate-y-[1px] bg-[#a88d30] text-[#3d3002] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.5)] border-[#876e20]'
                      : 'bg-gradient-to-b from-[#fdf7db] to-[#ecd281] hover:from-[#fffdf0] hover:to-[#dec473] border-[#caa348] active:translate-y-[0.5px] active:shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.4)] shadow-[0_1px_0_rgba(255,255,255,0.75),_0_1px_1.5px_rgba(0,0,0,0.2)]'
                  } ${!isPowered ? 'opacity-55 cursor-not-allowed' : ''}`}
                  style={!isActive ? { color: item.color } : {}}
                  title={`Switch Screen to ${item.label}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            2.B DESKTOP SIDE CONTROL PANEL (LEFT SIDE) - HIDDEN ON MOBILE (< sm)
           ======================================================== */}
        <div
          id="side-controls-bar"
          className="relative z-10 hidden sm:flex w-[78px] sm:w-[98px] md:w-[124px] flex-col justify-between items-center py-2 sm:py-3 px-1 sm:px-1.5 border-r border-[#dec874]/60 bg-[#ebd88a]/15 shrink-0 select-none gap-2 sm:gap-3 self-stretch"
        >
          {/* Top: Ventilation grille + Brand name .CLICK-26 */}
          <div className="w-full flex flex-col items-center gap-1">
            <div className="w-full flex flex-col gap-1 px-1 opacity-70">
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
            </div>
            
            <div className="font-share-tech-mono text-[8px] sm:text-[10px] md:text-[12px] text-[#ccaF5c] leading-none text-center tracking-widest pt-1 uppercase font-bold drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
              .CLICK-26
            </div>
          </div>

          {/* Retro Detail: Currently Available Status Bar with Green LED beside it */}
          <div className="w-full flex flex-col gap-1 px-1 sm:px-1.5 py-1.5 bg-[#d6be62]/35 border border-[#bfa546]/80 rounded-[5px] shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.15)]">
            <div className="w-full h-1.5 bg-[#17140b] rounded-[1px] relative">
              {/* Eject button engraving */}
              <div className="absolute right-1.5 top-0.5 w-1 h-1 bg-[#473e1c] rounded-[1px] border border-black/30" />
            </div>
            <div className="w-full flex items-center justify-between text-[5px] sm:text-[6px] font-share-tech-mono text-[#7c661d] leading-none select-none font-bold tracking-wider">
              <span>CURRENTLY:</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] shadow-[0_0_4px_#39ff14] inline-block animate-pulse shrink-0" />
                <span className="text-[5.5px] sm:text-[6.5px] text-[#4b7a21] font-extrabold uppercase">AVAILABLE</span>
              </span>
            </div>
          </div>

          {/* Middle-Top: Power LED Indicator + Coral Pink Power Button */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5">
            {/* Green Power LED Pill */}
            <div
              className="shrink-0 flex items-center justify-center p-0.5 rounded-[3px]"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
                border: '1px solid #bba44b',
              }}
              title="System Power LED"
            >
              <div
                id="power-led-indicator"
                className={`w-3.5 sm:w-5 h-1.5 rounded-[1.5px] transition-all duration-300 ${
                  isPowered
                    ? 'bg-[#4ef985] shadow-[0_0_6px_#4ef985,0_0_10px_rgba(78,249,133,0.8)]'
                    : 'bg-[#1b4e28] opacity-40'
                }`}
              />
            </div>

            {/* Organic Soft Round Tactile Power Button (#FE9898 Coral Pink) */}
            <div
              className="p-0.5 sm:p-1 rounded-full shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 2px 3.5px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.45)',
                border: '1px solid #b8a147',
              }}
            >
              <button
                id="chin-btn-power"
                onClick={handlePowerToggle}
                className="relative w-5.5 h-5.5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full transition-all duration-100 flex items-center justify-center cursor-pointer outline-none active:scale-95 active:translate-y-0.5"
                style={{
                  background: isPowered
                    ? 'radial-gradient(circle at 40% 35%, #ffd4d4 0%, #FE9898 45%, #ea7a7a 80%, #d86464 100%)'
                    : 'radial-gradient(circle at 40% 35%, #8f4d4d 0%, #683232 60%, #441d1d 100%)',
                  boxShadow: isPowered
                    ? '0 1.5px 3px rgba(0, 0, 0, 0.35), 0 0 8px rgba(254, 152, 152, 0.6), inset 0 1px 1.5px rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px rgba(160, 45, 45, 0.4)'
                    : '0 1px 2px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1.5px 2px rgba(0, 0, 0, 0.6)',
                  border: isPowered
                    ? '1px solid rgba(255, 230, 230, 0.8)'
                    : '1px solid rgba(100, 40, 40, 0.8)',
                }}
                title={isPowered ? 'Turn Off Monitor' : 'Turn On Monitor'}
              >
                <Power 
                  className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 transition-all ${
                    isPowered 
                      ? 'opacity-90 drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.6)]' 
                      : 'opacity-40'
                  }`}
                  style={{ color: '#b2778a' }}
                />
              </button>
            </div>
            
            <span className="font-share-tech-mono text-[6px] sm:text-[7.5px] text-[#ccaF5c] uppercase tracking-wider text-center select-none font-bold">
              POWER
            </span>
          </div>

          {/* Middle-Center: NEW RETRO CARVED NAVIGATION PANEL WITH SUNKEN COLOR STYLES */}
          <div className="flex flex-col items-center w-full gap-1">
            <span className="font-share-tech-mono text-[6px] sm:text-[7.5px] text-[#ccaF5c] uppercase tracking-widest text-center select-none font-bold">
              NAV MENU
            </span>

            {/* Sunken Bezel Compartment for Nav Buttons */}
            <div
              className="w-full flex flex-col gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-[6px] bg-[#cbb55a]"
              style={{
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
                border: '1px solid #b8a147',
              }}
            >
              {[
                { label: 'START', screen: 1, color: '#6d540d' },
                { label: 'WORKS', screen: 3, color: '#6d540d' },
                { label: 'ABOUT', screen: 4, color: '#9f853f' },
                { label: 'CV', screen: 5, color: '#8c7f56' },
              ].map((item) => {
                const isActive = currentScreen === item.screen && isPowered;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.screen as any)}
                    disabled={!isPowered}
                    className={`w-full py-1 sm:py-1.5 rounded-[3px] transition-all duration-75 select-none text-[8px] sm:text-[9.5px] md:text-[11.5px] font-share-tech-mono font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase flex items-center justify-center cursor-pointer outline-none border ${
                      isActive
                        ? 'translate-y-[1.5px] bg-[#a88d30] text-[#3d3002] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border-[#876e20]'
                        : 'bg-gradient-to-b from-[#fdf7db] to-[#ecd281] hover:from-[#fffdf0] hover:to-[#dec473] border-[#caa348] active:translate-y-[1px] active:shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4)] shadow-[0_1px_0_rgba(255,255,255,0.75),_0_1.5px_2px_rgba(0,0,0,0.2)]'
                    } ${!isPowered ? 'opacity-55 cursor-not-allowed' : ''}`}
                    style={!isActive ? { color: item.color } : {}}
                    title={`Switch Screen to ${item.label}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Retro Printed Status Board to fill empty vertical space */}
          <div className="hidden sm:flex flex-col gap-0.5 text-left w-full px-1 py-1 border-t border-[#dfc978]/60 mt-0.5">
            <div className="flex justify-between font-share-tech-mono text-[5.5px] sm:text-[6.5px] text-[#7a6423] leading-tight font-bold">
              <span>CPU SPEED</span>
              <span>12 MHz</span>
            </div>
            <div className="flex justify-between font-share-tech-mono text-[5.5px] sm:text-[6.5px] text-[#7a6423] leading-tight font-bold">
              <span>RAM ADDR</span>
              <span>0x3FF0</span>
            </div>
            <div className="flex justify-between font-share-tech-mono text-[5.5px] sm:text-[6.5px] text-[#7a6423] leading-tight font-bold">
              <span>BUS SPEED</span>
              <span>8-BIT</span>
            </div>
          </div>

          {/* Bottom: Social Contact Buttons + Bottom Grille slots */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-full relative">
            <span 
              className={`font-share-tech-mono text-[6px] sm:text-[7.5px] uppercase tracking-wider text-center select-none font-bold pb-0.5 transition-all duration-150 ${
                emailCopied 
                  ? 'text-[#166534] bg-[#bbf7d0] px-1 py-0.2 rounded-[2px] shadow-[0_0_6px_rgba(74,222,128,0.7)] scale-105' 
                  : 'text-[#ccaF5c]'
              }`}
            >
              {emailCopied ? 'EMAIL COPIED!' : 'CONTACT'}
            </span>

            {/* 1. LinkedIn Icon Button */}
            <div
              className="p-0.5 rounded-md sm:rounded-lg shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.55), 0 1px 1px rgba(255,255,255,0.45)',
                border: '1px solid #b8a147',
              }}
            >
              <button
                id="chin-btn-1"
                onClick={handleLinkedIn}
                disabled={!isPowered}
                className={`relative w-6 h-5 sm:w-7.5 sm:h-6 md:w-8.5 md:h-7 rounded-[4px] sm:rounded-md transition-all duration-100 flex items-center justify-center cursor-pointer outline-none ${
                  activeBtn === 'linkedin'
                    ? 'translate-y-0.5 text-white'
                    : 'hover:text-black active:translate-y-0.5'
                } ${!isPowered ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{
                  background: activeBtn === 'linkedin'
                    ? 'linear-gradient(180deg, #a770e0 0%, #985cd6 45%, #884bc7 100%)'
                    : 'linear-gradient(180deg, #d8aefb 0%, #c895f5 35%, #b980f0 70%, #a467e2 100%)',
                  boxShadow: activeBtn === 'linkedin'
                    ? '0 0.5px 1px rgba(0, 0, 0, 0.4), inset 0 1.5px 2.5px rgba(0, 0, 0, 0.35)'
                    : '0 1.5px 3px rgba(0, 0, 0, 0.25), 0 0.5px 1px rgba(0, 0, 0, 0.15), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px rgba(98, 45, 150, 0.35)',
                  border: activeBtn === 'linkedin'
                    ? '1px solid rgba(100, 45, 150, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                }}
                title="LinkedIn Profile (lorenaorlando)"
              >
                <Linkedin 
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5" 
                  style={{ color: '#6a5f74' }}
                />
              </button>
            </div>

            {/* 2. Mail Icon Button */}
            <div
              className="p-0.5 rounded-md sm:rounded-lg shrink-0 flex items-center justify-center relative"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.55), 0 1px 1px rgba(255,255,255,0.45)',
                border: '1px solid #b8a147',
              }}
            >
              {/* Floating notification badge on copy */}
              {emailCopied && (
                <div 
                  className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-[#4ef985] font-silkscreen text-[7.5px] sm:text-[9px] px-1.5 py-0.5 rounded-[2px] border border-[#4ef985] shadow-[0_0_8px_rgba(78,249,133,0.9)] z-50 animate-bounce pointer-events-none"
                >
                  EMAIL COPIED!
                </div>
              )}

              <button
                id="chin-btn-2"
                onClick={handleMail}
                disabled={!isPowered}
                className={`relative w-6 h-5 sm:w-7.5 sm:h-6 md:w-8.5 md:h-7 rounded-[4px] sm:rounded-md transition-all duration-100 flex items-center justify-center cursor-pointer outline-none ${
                  emailCopied || activeBtn === 'mail'
                    ? 'translate-y-0.5 text-white'
                    : 'hover:text-black active:translate-y-0.5'
                } ${!isPowered ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{
                  background: emailCopied
                    ? 'linear-gradient(180deg, #bbf7d0 0%, #4ade80 40%, #22c55e 80%, #16a34a 100%)'
                    : activeBtn === 'mail'
                    ? 'linear-gradient(180deg, #a770e0 0%, #985cd6 45%, #884bc7 100%)'
                    : 'linear-gradient(180deg, #d8aefb 0%, #c895f5 35%, #b980f0 70%, #a467e2 100%)',
                  boxShadow: emailCopied
                    ? '0 0 8px rgba(74, 222, 128, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -1.5px 2px rgba(21, 128, 61, 0.6)'
                    : activeBtn === 'mail'
                    ? '0 0.5px 1px rgba(0, 0, 0, 0.4), inset 0 1.5px 2.5px rgba(0, 0, 0, 0.35)'
                    : '0 1.5px 3px rgba(0, 0, 0, 0.25), 0 0.5px 1px rgba(0, 0, 0, 0.15), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.7), inset 0 -1.5px 2px rgba(98, 45, 150, 0.35)',
                  border: emailCopied
                    ? '1px solid rgba(255, 255, 255, 0.9)'
                    : activeBtn === 'mail'
                    ? '1px solid rgba(100, 45, 150, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                }}
                title={emailCopied ? "EMAIL COPIED! (soylorenaorlando@gmail.com)" : "Send Email (soylorenaorlando@gmail.com)"}
              >
                {emailCopied ? (
                  <Check 
                    className="w-3.5 h-3.5 font-bold" 
                    style={{ color: '#052e16' }} 
                  />
                ) : (
                  <Mail 
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5" 
                    style={{ color: '#6b5c7d' }}
                  />
                )}
              </button>
            </div>

            {/* Bottom ventilation slots */}
            <div className="w-full flex flex-col gap-1 px-1 opacity-70 mt-1">
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
            </div>
          </div>
        </div>

        {/* ========================================================
            3. DEEP SCULPTED INNER BEZEL RECESS
           ======================================================== */}
        <div
          id="crt-bezel-wrapper"
          className="relative flex-1 rounded-[14px] sm:rounded-[22px] md:rounded-[26px] p-1.5 sm:p-3 vintage-bezel-tunnel flex flex-col justify-center overflow-hidden min-h-0"
          style={{
            background: 'linear-gradient(165deg, #ebd88a 0%, #dec874 40%, #ccaF5c 100%)',
            border: '2px solid #bfa048',
          }}
        >
          {/* Inner bezel bevel rim leading to dark CRT glass */}
          <div className="relative w-full h-full rounded-[10px] sm:rounded-[18px] overflow-hidden crt-bezel-recess flex items-center justify-center min-h-0 bg-black">
            <CrtScreen
              power={settings.power}
              crtMode={settings.crtMode}
              brightness={settings.brightness}
              contrast={settings.contrast}
              activeTab={settings.activeTab}
              onTabChange={(tab) => onUpdateSettings((s) => ({ ...s, activeTab: tab }))}
              onPowerToggle={handlePowerToggle}
              currentScreen={currentScreen}
              onScreenChange={onScreenChange}
            />
          </div>
        </div>

        {/* ========================================================
            4. MOBILE BOTTOM CONTROLS BAR (.CLICK-26, AVAILABLE, CONTACT) - ONLY ON MOBILE (< sm)
           ======================================================== */}
        <div
          id="mobile-bottom-controls-bar"
          className="flex sm:hidden z-10 w-full flex-row items-center justify-between px-2 py-1.5 bg-[#ebd88a]/35 border-t border-[#dec874]/80 rounded-[4px] shrink-0 select-none gap-2"
        >
          {/* Left: Brand name .CLICK-26 + mini ventilation */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex flex-col gap-0.5 opacity-70 w-3">
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
              <div className="h-0.5 bg-[#ebd88a] border-b border-black/15 w-full" />
            </div>
            <div className="font-share-tech-mono text-[9.5px] text-[#ccaF5c] leading-none tracking-wider uppercase font-bold drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
              .CLICK-26
            </div>
          </div>

          {/* Center: Currently Available Status with Green Pulsing LED */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#d6be62]/40 border border-[#bfa546]/80 rounded-[4px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]">
            <span className="font-share-tech-mono text-[6.5px] text-[#7c661d] font-bold tracking-wider">
              CURRENTLY:
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] shadow-[0_0_4px_#39ff14] inline-block animate-pulse shrink-0" />
              <span className="text-[7px] text-[#4b7a21] font-extrabold uppercase font-share-tech-mono">
                AVAILABLE
              </span>
            </span>
          </div>

          {/* Right: Contact Buttons (LinkedIn & Mail) */}
          <div className="flex items-center gap-1 shrink-0">
            {/* LinkedIn */}
            <div
              className="p-0.5 rounded-[3px] shrink-0 flex items-center justify-center"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
                border: '1px solid #b8a147',
              }}
            >
              <button
                id="mobile-btn-linkedin"
                onClick={handleLinkedIn}
                disabled={!isPowered}
                className={`relative w-6 h-5.5 rounded-[2px] transition-all duration-100 flex items-center justify-center cursor-pointer outline-none ${
                  activeBtn === 'linkedin'
                    ? 'translate-y-0.5 text-white'
                    : 'hover:text-black active:translate-y-0.5'
                } ${!isPowered ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{
                  background: activeBtn === 'linkedin'
                    ? 'linear-gradient(180deg, #a770e0 0%, #985cd6 45%, #884bc7 100%)'
                    : 'linear-gradient(180deg, #d8aefb 0%, #c895f5 35%, #b980f0 70%, #a467e2 100%)',
                  boxShadow: activeBtn === 'linkedin'
                    ? '0 0.5px 1px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.35)'
                    : '0 1px 2px rgba(0, 0, 0, 0.25), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.7), inset 0 -1px 1.5px rgba(98, 45, 150, 0.35)',
                  border: activeBtn === 'linkedin'
                    ? '1px solid rgba(100, 45, 150, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                }}
                title="LinkedIn Profile"
              >
                <Linkedin 
                  className="w-3 h-3" 
                  style={{ color: '#6a5f74' }}
                />
              </button>
            </div>

            {/* Mail */}
            <div
              className="p-0.5 rounded-[3px] shrink-0 flex items-center justify-center relative"
              style={{
                backgroundColor: '#cbb55a',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.55), 0 0.5px 0.5px rgba(255,255,255,0.4)',
                border: '1px solid #b8a147',
              }}
            >
              {/* Floating notification badge on mobile */}
              {emailCopied && (
                <div 
                  className="absolute -top-7 right-0 whitespace-nowrap bg-black text-[#4ef985] font-silkscreen text-[7.5px] px-1.5 py-0.5 rounded-[2px] border border-[#4ef985] shadow-[0_0_8px_rgba(78,249,133,0.9)] z-50 animate-bounce pointer-events-none"
                >
                  EMAIL COPIED!
                </div>
              )}

              <button
                id="mobile-btn-mail"
                onClick={handleMail}
                disabled={!isPowered}
                className={`relative w-6 h-5.5 rounded-[2px] transition-all duration-100 flex items-center justify-center cursor-pointer outline-none ${
                  emailCopied || activeBtn === 'mail'
                    ? 'translate-y-0.5 text-white'
                    : 'hover:text-black active:translate-y-0.5'
                } ${!isPowered ? 'opacity-40 cursor-not-allowed' : ''}`}
                style={{
                  background: emailCopied
                    ? 'linear-gradient(180deg, #bbf7d0 0%, #4ade80 40%, #22c55e 80%, #16a34a 100%)'
                    : activeBtn === 'mail'
                    ? 'linear-gradient(180deg, #a770e0 0%, #985cd6 45%, #884bc7 100%)'
                    : 'linear-gradient(180deg, #d8aefb 0%, #c895f5 35%, #b980f0 70%, #a467e2 100%)',
                  boxShadow: emailCopied
                    ? '0 0 8px rgba(74, 222, 128, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -1px 1.5px rgba(21, 128, 61, 0.6)'
                    : activeBtn === 'mail'
                    ? '0 0.5px 1px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(0, 0, 0, 0.35)'
                    : '0 1px 2px rgba(0, 0, 0, 0.25), inset 0 0.5px 0.5px rgba(255, 255, 255, 0.7), inset 0 -1px 1.5px rgba(98, 45, 150, 0.35)',
                  border: emailCopied
                    ? '1px solid rgba(255, 255, 255, 0.9)'
                    : activeBtn === 'mail'
                    ? '1px solid rgba(100, 45, 150, 0.6)'
                    : '1px solid rgba(255, 255, 255, 0.55)',
                }}
                title={emailCopied ? "EMAIL COPIED! (soylorenaorlando@gmail.com)" : "Send Email"}
              >
                {emailCopied ? (
                  <Check 
                    className="w-3 h-3 font-bold" 
                    style={{ color: '#052e16' }} 
                  />
                ) : (
                  <Mail 
                    className="w-3 h-3" 
                    style={{ color: '#6b5c7d' }} 
                  />
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
