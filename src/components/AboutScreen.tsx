import React, { useState, useRef } from 'react';
import { audioEngine } from '../utils/audio';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutScreenProps {
  language?: Language;
  onBack: () => void;
  onNavigateWorks: () => void;
  onNavigateCv: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  language = 'es',
  onBack,
  onNavigateWorks,
  onNavigateCv,
}) => {
  const t = TRANSLATIONS[language];
  const [isGlitched, setIsGlitched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyEmail = async () => {
    audioEngine.playClick(1.2);
    const email = 'soylorenaorlando@gmail.com';
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
      console.warn('Copy failed:', err);
    }
    window.location.href = `mailto:${email}`;
    setCopiedEmail(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  const handleGlitchStart = () => {
    if (!isGlitched) {
      audioEngine.playGlitch();
      setIsGlitched(true);
    }
  };

  const handleGlitchEnd = () => {
    setIsGlitched(false);
  };

  const handleMobileTap = () => {
    audioEngine.playGlitch();
    setIsGlitched((prev) => !prev);

    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setIsGlitched(false);
    }, 2500);
  };

  // Simulated retro stats
  const coreStats = [
    { label: t.about.stats.designExp, value: t.about.stats.years10, width: '70%', dots: '■■■■■■■□□□' },
    { label: t.about.stats.artisticPath, value: t.about.stats.years20, width: '100%', dots: '■■■■■■■■■■' },
    { label: t.about.stats.webmastering, value: t.about.stats.years5, width: '50%', dots: '■■■■■□□□□□' },
    { label: t.about.stats.photoExp, value: t.about.stats.years20, width: '100%', dots: '■■■■■■■■■■' },
    { label: t.about.stats.happyClients, value: t.about.stats.proj20, width: '90%', dots: '■■■■■■■■■□' },
  ];

  return (
    <div className="relative z-10 w-full max-w-[720px] px-2 sm:px-4 py-2 flex-1 min-h-0 overflow-y-auto custom-scrollbar touch-pan-y overscroll-contain animate-fadeIn select-none flex flex-col gap-3 pr-1.5 sm:pr-2.5">
      
      {/* 1. Terminal Top Banner */}
      <div className="w-full border-b border-[#E5FBB8]/40 pb-1.5 mb-1 flex items-center justify-between text-[7.5px] sm:text-[9px] font-mono text-[#E5FBB8]/80">
        <span className="font-bold flex items-center gap-1.5">
          <span className="text-[#E5FBB8] animate-pulse">●</span> 
          {t.about.fileReadme}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 justify-between pt-1">
        
        {/* Left Column: Portrait & Cyber Diagnostic Logs */}
        <div className="shrink-0 flex flex-col items-center md:items-start gap-3 w-full sm:w-[220px] md:w-[210px]">
          
          <div className="w-full relative border border-[#E5FBB8]/40 p-1 bg-black/45 rounded-[3px] shadow-[1.5px_1.5px_0px_rgba(229,251,184,0.15)] flex flex-col items-center">
            {/* Viewfinder corner lines */}
            <span className="absolute top-1 left-1.5 font-silkscreen text-[7px] text-[#E5FBB8]/70 leading-none">┌</span>
            <span className="absolute top-1 right-1.5 font-silkscreen text-[7px] text-[#E5FBB8]/70 leading-none">┐</span>
            
            <div
              id="about-portrait-frame"
              onMouseEnter={handleGlitchStart}
              onMouseLeave={handleGlitchEnd}
              onClick={handleMobileTap}
              className="relative w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] bg-black border-2 border-[#E5FBB8]/20 outline-none flex items-center justify-center overflow-hidden cursor-pointer group select-none shadow-inner"
              title="Hover / tap to glitch"
            >
              {/* Base Monochrome Image */}
              <img
                src="https://sandboxlandia.online/wp-content/uploads/2026/09/LORENA_ORLANDO_PROFILE.jpg"
                alt="Lorena Orlando"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover block filter contrast-125 brightness-95 border-0 outline-none transition-opacity duration-100 ${
                  isGlitched ? 'opacity-0' : 'opacity-100'
                }`}
                loading="eager"
              />

              {/* Hover / Glitched Color Image */}
              <img
                src="https://sandboxlandia.online/wp-content/uploads/2026/08/PROFILE_COLOR.jpg"
                alt="Lorena Orlando Color"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover filter saturate-125 contrast-125 z-10 border-0 outline-none transition-all duration-100 ${
                  isGlitched ? 'opacity-100 animate-glitch-active' : 'opacity-0 pointer-events-none'
                }`}
                loading="eager"
              />
            </div>

            {/* Micro Image metadata label */}
            <div className="w-full flex items-center justify-between text-[6.5px] sm:text-[7.5px] font-mono text-[#E5FBB8]/50 pt-1 px-1">
              <span>IMG: LORENA.JPG</span>
              <button
                onClick={handleCopyEmail}
                className="font-bold cursor-pointer hover:text-[#E5FBB8] transition-colors flex items-center gap-1"
                title="Click to copy & email"
              >
                {copiedEmail ? (
                  <span className="text-[#4ef985] bg-black px-1 border border-[#4ef985] rounded-[1px] animate-pulse">
                    {t.about.emailCopied}
                  </span>
                ) : (
                  <span>SOYLORENAORLANDO@GMAIL.COM</span>
                )}
              </button>
            </div>
          </div>

          {/* Retro Diagnostic Stat Bars */}
          <div className="w-full p-2 border border-[#E5FBB8]/30 bg-black/60 rounded-[3px] flex flex-col gap-1.5 text-left font-mono text-[7px] sm:text-[8px]">
            <div className="font-silkscreen text-[8px] sm:text-[9px] text-[#E5FBB8] border-b border-[#E5FBB8]/20 pb-0.5 uppercase tracking-wide">
              {t.about.diagnostics}
            </div>
            {coreStats.map((st) => (
              <div key={st.label} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[#E5FBB8]/80 text-[6.5px] sm:text-[7.5px] font-bold">
                  <span>{st.label}</span>
                  <span className="text-[#E5FBB8]">{st.value}</span>
                </div>
                <div className="text-[#E5FBB8] leading-none tracking-tighter text-[7.5px] sm:text-[8.5px]">
                  {st.dots}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex w-full pt-1">
            <button
              id="about-cv-btn"
              onClick={() => {
                audioEngine.playClick(1.2);
                onNavigateCv();
              }}
              className="w-full py-1.5 bg-[#E5FBB8] hover:bg-[#B980F0] hover:text-black text-black font-silkscreen font-normal text-[8px] sm:text-[9.5px] tracking-widest uppercase border border-[#E5FBB8] active:translate-y-0.5 cursor-pointer transition-colors leading-none rounded-[2px] text-center"
              title="View Curriculum Vitae"
            >
              {t.about.cvBtn}
            </button>
          </div>

        </div>

        {/* Right Column: Bio Monospace Typography + Structured Details */}
        <div className="flex-1 flex flex-col justify-start gap-3.5 text-left font-sometype-mono text-[#E5FBB8] text-[15px] leading-relaxed tracking-normal uppercase">
          
          {/* Framed Section: Who I Am */}
          <div className="p-2.5 sm:p-3.5 border-2 border-double border-[#E5FBB8]/60 bg-black/40 rounded-[2px] relative flex flex-col gap-2">
            <div className="absolute top-[-7.5px] left-3 bg-black px-1.5 text-[8.5px] sm:text-[9.5px] font-silkscreen text-[#E5FBB8]">
              {t.about.backgroundTitle}
            </div>
            <p className="indent-4 text-[15px] leading-relaxed">
              {t.about.backgroundP1}
            </p>
            <p className="text-[15px] leading-relaxed">
              {t.about.backgroundP2}
            </p>
          </div>

          {/* Framed Section: Approach */}
          <div className="p-2.5 sm:p-3.5 border border-[#E5FBB8]/40 bg-black/40 rounded-[2px] relative flex flex-col gap-2">
            <div className="absolute top-[-7.5px] left-3 bg-black px-1.5 text-[8.5px] sm:text-[9.5px] font-silkscreen text-[#E5FBB8]">
              {t.about.craftTitle}
            </div>
            <p className="text-[15px] leading-relaxed">
              {t.about.craftP1}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
