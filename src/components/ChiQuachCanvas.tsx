import React, { useState, useEffect } from 'react';
import { audioEngine } from '../utils/audio';
import { getWorksData } from '../data/worksData';
import { TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { WorksScreen } from './WorksScreen';
import { AboutScreen } from './AboutScreen';
import { CvScreen } from './CvScreen';
import { PricingScreen } from './PricingScreen';

interface ChiQuachCanvasProps {
  currentScreen?: 1 | 3 | 4 | 5 | 6;
  language?: Language;
  onScreenChange?: (screen: 1 | 3 | 4 | 5 | 6) => void;
}

export const ChiQuachCanvas: React.FC<ChiQuachCanvasProps> = ({
  currentScreen: controlledScreen,
  language = 'es',
  onScreenChange,
}) => {
  const t = TRANSLATIONS[language];
  const worksList = getWorksData(language);

  // Navigation: 1 = START, 3 = WORKS, 4 = ABOUT, 5 = CV, 6 = PRICING
  const [internalScreen, setInternalScreen] = useState<1 | 3 | 4 | 5 | 6>(1);
  const currentScreen = controlledScreen !== undefined ? controlledScreen : internalScreen;

  const setCurrentScreen = (screen: 1 | 3 | 4 | 5 | 6) => {
    if (onScreenChange) {
      onScreenChange(screen);
    } else {
      setInternalScreen(screen);
    }
  };

  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [aboutPressed, setAboutPressed] = useState(false);
  const [worksPressed, setWorksPressed] = useState(false);
  const [startPressed, setStartPressed] = useState(false);

  // Equalizer visualizer animation state
  const [eqLevels, setEqLevels] = useState<number[]>([2, 4, 7, 5, 8, 6, 9, 11, 8, 5]);

  // Telemetry radar pulse
  const [radarTick, setRadarTick] = useState(0);

  useEffect(() => {
    if (currentScreen === 1) {
      const interval = setInterval(() => {
        setEqLevels((prev) =>
          prev.map((val) => {
            const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.7 ? 1 : 0);
            return Math.max(1, Math.min(12, val + delta));
          })
        );
        setRadarTick((t) => (t + 1) % 4);
      }, 350);
      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const handleStartClick = () => {
    setStartPressed(true);
    audioEngine.playClick(1.0);
    setTimeout(() => {
      setStartPressed(false);
      setCurrentScreen(1);
    }, 150);
  };

  const handleAboutClick = () => {
    setAboutPressed(true);
    audioEngine.playClick(1.2);
    setTimeout(() => {
      setAboutPressed(false);
      setCurrentScreen(4);
    }, 150);
  };

  const handleWorksClick = () => {
    setWorksPressed(true);
    audioEngine.playClick(1.5);
    setTimeout(() => {
      setWorksPressed(false);
      setCurrentScreen(3);
    }, 150);
  };

  const handleNavPrevWork = () => {
    audioEngine.playClick(0.9);
    setActiveWorkIndex((prev) => (prev > 0 ? prev - 1 : worksList.length - 1));
    if (currentScreen !== 3) {
      setCurrentScreen(3);
    }
  };

  const handleNavNextWork = () => {
    audioEngine.playClick(1.3);
    setActiveWorkIndex((prev) => (prev < worksList.length - 1 ? prev + 1 : 0));
    if (currentScreen !== 3) {
      setCurrentScreen(3);
    }
  };

  return (
    <div
      id="crt-screen-content"
      className="relative w-full h-full min-h-0 flex flex-col items-center justify-between p-1.5 sm:p-3 md:p-3.5 select-none overflow-hidden bg-black text-[#E5FBB8]"
    >
      {/* 1. Pure Pitch Black Background */}
      <div className="absolute inset-0 pointer-events-none bg-black" />

      {/* 2. Micro CRT Scanlines Mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* 3. Outer Double-Line Terminal Perimeter Frame (#E5FBB8) */}
      <div 
        className="absolute inset-1.5 sm:inset-2 pointer-events-none border-[3px] border-double rounded-[3px]"
        style={{
          borderColor: '#E5FBB8',
        }}
      />

      {/* ========================================================
          ADAPTIVE PROJECT SWITCHER NAVEGACIÓN BAR (ONLY ON WORKS SCREEN 3)
         ======================================================== */}
      {currentScreen === 3 && (
        <div className="relative z-30 w-full max-w-[700px] px-1 sm:px-2 pt-0.5 animate-fadeIn">
          <div className="w-full flex items-center justify-between pb-1 text-[#E5FBB8] select-none min-h-[28px] border-b border-[#E5FBB8]/30 mb-1">
            <span className="font-silkscreen text-[8.5px] sm:text-[9.5px] tracking-widest text-[#E5FBB8]/80 uppercase">
              {t.works.selectedWorks}
            </span>

            {/* Navigation Arrows for Project Switching */}
            <div className="flex items-center gap-1.5 font-silkscreen text-[8.5px] sm:text-[9.5px]">
              <button
                id="nav-works-prev-btn"
                onClick={handleNavPrevWork}
                className="px-2.5 py-0.5 border border-[#E5FBB8]/70 hover:border-[#B980F0] hover:bg-[#B980F0] hover:text-black text-[#E5FBB8] flex items-center justify-center text-[7.5px] sm:text-[8.5px] rounded-[1px] transition-all cursor-pointer outline-none active:scale-95 shadow-[1px_1px_0px_rgba(229,251,184,0.3)]"
                title={t.works.prevProject}
              >
                {t.works.prevProject}
              </button>

              <button
                id="nav-works-next-btn"
                onClick={handleNavNextWork}
                className="px-2.5 py-0.5 border border-[#E5FBB8]/70 hover:border-[#B980F0] hover:bg-[#B980F0] hover:text-black text-[#E5FBB8] flex items-center justify-center text-[7.5px] sm:text-[8.5px] rounded-[1px] transition-all cursor-pointer outline-none active:scale-95 shadow-[1px_1px_0px_rgba(229,251,184,0.3)]"
                title={t.works.nextProject}
              >
                {t.works.nextProject}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SCREEN 1: EXPANDED VERTICALLY STACKED VISUAL DASHBOARD
         ======================================================== */}
      {currentScreen === 1 && (
        <div className="relative z-10 w-full h-full min-h-0 flex-1 max-w-[1020px] px-2 sm:px-4 lg:px-6 overflow-y-auto custom-scrollbar flex flex-col items-stretch gap-5 sm:gap-7 animate-fadeIn py-2 sm:py-4 touch-pan-y overscroll-contain">
          
          {/* ====================================================
              SECTION 1: HERO VIEW (PROFILE + DESIGN DISCIPLINES)
              Fills almost the entire initial screen visually
             ==================================================== */}
          <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 lg:gap-5 items-stretch justify-between min-h-[82%] sm:min-h-[86%] lg:min-h-[88%] shrink-0">
            
            {/* 1.1 Left Side: Big Photo & Lorena Orlando Profile Card */}
            <div className="w-full md:w-[42%] lg:w-[38%] flex flex-col justify-between gap-3 shrink-0">
              
              {/* Photo Card [FIG. 01] LORENA.JPG */}
              <div 
                className="border-2 border-black bg-[#E5FBB8] flex flex-col items-center justify-between shadow-[3px_3px_0px_rgba(0,0,0,0.85)] p-2.5 sm:p-3 flex-1 min-h-[220px] sm:min-h-[260px]"
              >
                <div className="relative w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] aspect-square bg-black p-1.5 border-2 border-black flex items-center justify-center overflow-hidden my-auto shadow-[2px_2px_0px_rgba(0,0,0,0.9)] group">
                  {/* Viewfinder corner guides */}
                  <span className="absolute top-1 left-1 font-silkscreen text-[9px] text-[#E5FBB8] leading-none select-none z-20">┌</span>
                  <span className="absolute top-1 right-1 font-silkscreen text-[9px] text-[#E5FBB8] leading-none select-none z-20">┐</span>
                  <span className="absolute bottom-1 left-1 font-silkscreen text-[9px] text-[#E5FBB8] leading-none select-none z-20">└</span>
                  <span className="absolute bottom-1 right-1 font-silkscreen text-[9px] text-[#E5FBB8] leading-none select-none z-20">┘</span>

                  {/* Photo with Raster Reveal */}
                  <img
                    src="https://sandboxlandia.online/wp-content/uploads/2026/09/LORENA_ORLANDO_PROFILE.jpg"
                    alt="Lorena Orlando"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block filter contrast-125 animate-render-decode"
                    loading="eager"
                  />
                </div>

                {/* Photo Sub-labels */}
                <div className="flex items-center justify-between w-full px-1.5 pt-2">
                  <span className="font-silkscreen text-[9px] sm:text-[10.5px] text-black font-bold uppercase tracking-wider">
                    [FIG. 01]
                  </span>
                  <span className="font-sometype-mono text-[9.5px] sm:text-[11px] font-bold text-black/90">
                    LORENA.JPG
                  </span>
                </div>
              </div>

              {/* Name, Craft, and ABOUT Button */}
              <div 
                className="p-3 sm:p-4 bg-[#E5FBB8] border-2 border-black text-black flex flex-col justify-between shadow-[3px_3px_0px_rgba(0,0,0,0.85)] shrink-0"
              >
                <div>
                  <h1 
                    className="text-black font-silkscreen font-normal leading-tight tracking-tight uppercase text-[20px] sm:text-[24px] lg:text-[26px]"
                  >
                    LORENA ORLANDO
                  </h1>
                  <div className="flex items-center gap-1.5 text-black font-share-tech-mono font-bold text-[11px] sm:text-[13px] leading-tight tracking-[0.05em] mt-1.5 opacity-90">
                    <span className="text-black text-[8px]">■</span>
                    <span>{t.screen1.lorenaRole}</span>
                  </div>
                </div>

                {/* Prominent ABOUT button */}
                <div className="pt-3">
                  <button
                    id="card-about-btn"
                    onClick={handleAboutClick}
                    className="w-full sm:w-fit px-4 py-1.5 bg-black text-[#E5FBB8] font-silkscreen font-normal text-[10px] sm:text-[11.5px] leading-none uppercase tracking-wider transition-all duration-75 cursor-pointer outline-none border border-black hover:bg-[#B980F0] hover:text-black flex items-center justify-center gap-2 active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
                    title={t.screen1.aboutBtn}
                  >
                    <span>{t.screen1.aboutBtn}</span>
                    <span className="text-[11px]">→</span>
                  </button>
                </div>
              </div>

            </div>

            {/* 1.2 Right Side: Expanded DESIGN DISCIPLINES */}
            <div 
              className="flex-1 min-w-0 relative p-3.5 sm:p-5 border-[3px] border-double bg-black flex flex-col justify-between overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,0.7)]"
              style={{
                borderColor: '#E5FBB8',
              }}
            >
              {/* Header: DESIGN */}
              <div>
                <div className="font-silkscreen font-normal text-[16px] sm:text-[20px] lg:text-[22px] uppercase tracking-widest text-[#E5FBB8]">
                  {t.screen1.design}
                </div>
                <div className="w-full border-b-[2px] border-double border-[#E5FBB8] mt-1.5 mb-3" />
              </div>

              {/* Disciplines Content - Much Larger and Impactful */}
              <div className="flex-1 flex flex-col justify-around gap-4 sm:gap-5 py-2 text-left relative">
                
                {/* Discipline 1 */}
                <div className="flex flex-col gap-1 border-l-2 border-[#E5FBB8]/40 pl-3">
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8] tracking-[0.05em] font-black uppercase leading-tight text-[16px] sm:text-[19px] lg:text-[21px]"
                  >
                    {t.screen1.discipline1Title}
                  </div>
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8]/85 leading-[1.4] tracking-[0.04em] font-bold text-[11px] sm:text-[13px] lg:text-[14px]"
                  >
                    {t.screen1.discipline1Subtitle}
                  </div>
                </div>

                {/* Discipline 2 */}
                <div className="flex flex-col gap-1 border-l-2 border-[#E5FBB8]/40 pl-3">
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8] tracking-[0.05em] font-black uppercase leading-tight text-[16px] sm:text-[19px] lg:text-[21px]"
                  >
                    {t.screen1.discipline2Title}
                  </div>
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8]/85 leading-[1.4] tracking-[0.04em] font-bold text-[11px] sm:text-[13px] lg:text-[14px]"
                  >
                    {t.screen1.discipline2Subtitle}
                  </div>
                </div>

                {/* Discipline 3 */}
                <div className="flex flex-col gap-1 border-l-2 border-[#E5FBB8]/40 pl-3">
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8] tracking-[0.05em] font-black uppercase leading-tight text-[16px] sm:text-[19px] lg:text-[21px]"
                  >
                    {t.screen1.discipline3Title}
                  </div>
                  <div 
                    className="font-share-tech-mono text-[#E5FBB8]/85 leading-[1.4] tracking-[0.04em] text-[11px] sm:text-[13px] lg:text-[14px]"
                  >
                    {t.screen1.discipline3Subtitle}
                  </div>
                </div>

              </div>

              {/* Bottom rule */}
              <div className="w-full border-t border-[#E5FBB8]/40 pt-2 mt-2 flex justify-between items-center text-[9px] sm:text-[10.5px] font-sometype-mono text-[#E5FBB8]/80 shrink-0">
                <span>{t.screen1.signalStable}</span>
                <span className="font-bold">DSP • EQ-10 MATRIX</span>
              </div>
            </div>

          </div>

          {/* ====================================================
              SECTION 2: SKILLS RADAR & TELEMETRY MATRIX
              Stacked vertically underneath, full width & high visual impact
             ==================================================== */}
          <div 
            className="w-full relative p-3 sm:p-5 border-[3px] border-double bg-black flex flex-col justify-between overflow-hidden shadow-[3px_3px_0px_rgba(0,0,0,0.7)] shrink-0"
            style={{
              borderColor: '#E5FBB8',
            }}
          >
            {/* Header: SKILLS + LIVE STATUS */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5FBB8]/40 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-black border border-[#E5FBB8] text-[#E5FBB8] font-silkscreen font-normal text-[12px] sm:text-[14px] tracking-wider leading-none rounded-[2px] shadow-[1px_1px_0px_rgba(229,251,184,0.3)]">
                  {t.screen1.skillsTelemetry}
                </span>
              </div>

              <div className="flex items-center gap-3 font-share-tech-mono text-[11px] sm:text-[13px] text-[#E5FBB8]">
                <span className="text-[#E5FBB8] font-bold animate-pulse">
                  {radarTick % 2 === 0 ? '●' : '○'} LIVE
                </span>
                <span className="opacity-80">142.8 MHz</span>
              </div>
            </div>

            {/* Main Boxed Radar Area with Ruler / Telemetry / Rich Data */}
            <div className="relative border border-[#E5FBB8] p-2.5 sm:p-4 bg-black flex flex-col justify-between flex-1 min-h-[300px] overflow-hidden shadow-inner gap-3">
              
              {/* Top Ruler Ticks with Coordinate Marks */}
              <div className="w-full flex justify-between items-center px-1 text-[8px] sm:text-[9.5px] text-[#E5FBB8]/70 font-mono select-none border-b border-[#E5FBB8]/20 pb-1 shrink-0">
                <span>+00°00'</span>
                <span>┬─┬─┬─┬─┬─┬</span>
                <span>AZ: 042.8°</span>
                <span>┬─┬─┬─┬─┬─┬</span>
                <span>SIG: -48dBm</span>
              </div>

              {/* Upper Section: Experience Badges + System Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0 z-20">
                {/* Badge 1: +10Y Design Experience */}
                <div className="p-2 sm:p-2.5 bg-black border border-[#E5FBB8] rounded-[2px] shadow-[2px_2px_0px_rgba(229,251,184,0.25)] flex flex-col justify-center">
                  <div className="font-silkscreen text-[11px] sm:text-[13px] lg:text-[14px] text-[#E5FBB8] font-normal leading-tight">
                    {t.screen1.badgeDesign}
                  </div>
                  <div className="font-share-tech-mono text-[9.5px] sm:text-[11px] text-[#E5FBB8]/80 leading-tight mt-1">
                    {t.screen1.badgeDesignSub}
                  </div>
                </div>

                {/* Badge 2: +20Y Artistic Experience */}
                <div className="p-2 sm:p-2.5 bg-black border border-[#E5FBB8] rounded-[2px] shadow-[2px_2px_0px_rgba(229,251,184,0.25)] flex flex-col justify-center">
                  <div className="font-silkscreen text-[11px] sm:text-[13px] lg:text-[14px] text-[#E5FBB8] font-normal leading-tight">
                    {t.screen1.badgeArt}
                  </div>
                  <div className="font-share-tech-mono text-[9.5px] sm:text-[11px] text-[#E5FBB8]/80 leading-tight mt-1">
                    {t.screen1.badgeArtSub}
                  </div>
                </div>
              </div>

              {/* Middle Section: Retro Radar Graphic & Tech Chips */}
              <div className="relative flex-1 flex flex-col justify-between py-2 border-y border-[#E5FBB8]/25 bg-[#E5FBB8]/[0.02] px-2 min-h-[140px]">
                
                {/* Telemetry Graphic Background */}
                <div className="relative w-full flex-1 flex flex-row items-center pt-1 min-h-[100px]">
                  
                  {/* Left Column: Dither + Solid Bar */}
                  <div className="flex flex-row items-stretch shrink-0 pr-2.5 select-none h-full">
                    <div className="flex flex-col justify-between text-[7px] sm:text-[8.5px] lg:text-[8px] font-mono leading-tight text-[#E5FBB8]/70 pr-0.5">
                      <span>▒</span>
                      <span>?</span>
                      <span>░</span>
                      <span>,</span>
                      <span>▓</span>
                    </div>

                    <div 
                      className="w-2.5 sm:w-3 h-full bg-[#E5FBB8] rounded-[1px] border border-black"
                      style={{
                        boxShadow: '0 0 6px rgba(229, 251, 184, 0.5)',
                      }}
                    />
                  </div>

                  {/* Center/Right: Detailed Radar Grid Rings */}
                  <div className="flex-1 h-full flex flex-col justify-between font-mono select-none px-1">
                    
                    {/* Top Line */}
                    <div className="w-full flex items-center justify-between text-[8px] sm:text-[9.5px] leading-tight">
                      <span className="opacity-0">.</span>
                      <div className="flex items-center gap-1 font-normal text-[#E5FBB8]/90">
                        <span>════</span>
                        <span>15.8NM</span>
                        <span>════</span>
                      </div>
                      <span className="font-bold text-[#E5FBB8] pr-1">X</span>
                    </div>

                    {/* Middle Arc */}
                    <div className="w-full flex items-center justify-between text-[8px] sm:text-[9.5px] leading-tight">
                      <div className="text-[7.5px] text-[#E5FBB8]/70 leading-none">
                        <div>,-?</div>
                      </div>

                      <div className="flex items-center gap-1 font-normal text-[#E5FBB8]/90">
                        <span>════</span>
                        <span>7.9NM</span>
                        <span>════</span>
                      </div>

                      <span className="text-[8px] sm:text-[9px] font-normal tracking-tight text-[#E5FBB8]/80 pr-1">
                        3
                      </span>
                    </div>

                    {/* Inner Arc */}
                    <div className="w-full flex items-center justify-between text-[8px] sm:text-[9.5px] leading-tight">
                      <span className="font-bold text-[#E5FBB8]">UN</span>
                      <div className="flex items-center gap-1 font-normal text-[#E5FBB8]/90">
                        <span>═══</span>
                        <span>3.6NM</span>
                        <span>═══</span>
                      </div>
                      <span className="opacity-0">.</span>
                    </div>

                  </div>
                </div>

                {/* Tech Stack Chips Strip */}
                <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 pt-2 shrink-0">
                  {['FIGMA', 'FRAMER', 'WEBFLOW', 'WORDPRESS', 'HTML/CSS'].map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-black text-[#E5FBB8] font-silkscreen font-normal text-[9px] sm:text-[10.5px] border border-[#E5FBB8]/80 rounded-[2px] leading-none shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.8)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lower Section: ARROWS EQUALIZER */}
              <div 
                className="w-full bg-black/90 border border-[#E5FBB8]/70 p-2 sm:p-2.5 rounded-[2px] flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.8)] shrink-0 z-20"
                title="Frequency Spectrum Equalizer"
              >
                {/* Centered Inverted Triangle Equalizer Graphic */}
                <div className="w-full flex items-end justify-center gap-2 sm:gap-3 py-1 px-2 bg-black border border-[#E5FBB8]/40 rounded-[2px]">
                  {eqLevels.map((lvl, colIdx) => (
                    <div key={colIdx} className="flex flex-col items-center justify-end leading-none select-none">
                      {Array.from({ length: Math.min(8, lvl) }).map((_, rIdx) => (
                        <span 
                          key={rIdx}
                          className="text-[12px] sm:text-[15px] lg:text-[16px] text-[#E5FBB8] leading-[11px] sm:leading-[13px] lg:leading-[14px] block font-bold"
                          style={{
                            opacity: 0.5 + (rIdx / lvl) * 0.5,
                            filter: 'drop-shadow(0 0 3px rgba(229, 251, 184, 0.95))',
                          }}
                        >
                          ▼
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Banner: WEBMASTER AT + PUENTES/ESCUCHADORAS */}
            <div 
              id="radar-webmaster-banner"
              className="mt-2.5 w-full bg-black border-2 border-[#E5FBB8] text-[#E5FBB8] py-2 px-3 leading-none flex items-center justify-between relative z-20 shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span 
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                  className="text-[#E5FBB8]"
                >
                  {t.screen1.webmasterAt}
                </span>
                <div className="flex items-center gap-2 sm:gap-3 text-[#E5FBB8] uppercase">
                  <span className="text-[7px]">●</span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 'bold',
                    }}
                  >
                    PUENTES
                  </span>
                  <span className="text-[7px]">●</span>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 'bold',
                    }}
                  >
                    ESCUCHADORAS
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          SCREEN 3: WORKS SHOWCASE WITH VIDEO & GLITCH RENDER REVEAL
         ======================================================== */}
      {currentScreen === 3 && (
        <WorksScreen 
          currentIndex={activeWorkIndex}
          language={language}
          onIndexChange={(idx) => setActiveWorkIndex(idx)}
          onBack={() => setCurrentScreen(1)} 
          onNavigateAbout={() => setCurrentScreen(4)}
        />
      )}

      {/* ========================================================
          SCREEN 4: DEDICATED ABOUT PAGE WITH GLITCH PORTRAIT
         ======================================================== */}
      {currentScreen === 4 && (
        <AboutScreen 
          language={language}
          onBack={() => setCurrentScreen(1)} 
          onNavigateWorks={() => setCurrentScreen(3)} 
          onNavigateCv={() => setCurrentScreen(5)}
        />
      )}

      {/* ========================================================
          SCREEN 5: DEDICATED CV / CURRICULUM VITAE PAGE
         ======================================================== */}
      {currentScreen === 5 && (
        <CvScreen 
          language={language}
          onBack={() => setCurrentScreen(4)} 
          onNavigateWorks={() => setCurrentScreen(3)} 
        />
      )}

      {/* ========================================================
          SCREEN 6: DEDICATED PRICING & BUDGET CALCULATOR PAGE
         ======================================================== */}
      {currentScreen === 6 && (
        <PricingScreen 
          language={language}
          onBack={() => setCurrentScreen(1)} 
          onNavigateWorks={() => setCurrentScreen(3)} 
        />
      )}

      {/* CRT Edge Shadow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.95), inset 0 0 10px rgba(0, 0, 0, 1)',
        }}
      />
    </div>
  );
};
