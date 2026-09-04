import React from 'react';
import { audioEngine } from '../utils/audio';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getCvData } from '../data/cvData';

interface CvScreenProps {
  language?: Language;
  onBack: () => void;
  onNavigateWorks: () => void;
}

export const CvScreen: React.FC<CvScreenProps> = ({ 
  language = 'es',
  onBack, 
  onNavigateWorks 
}) => {
  const t = TRANSLATIONS[language];
  const cvData = getCvData(language);

  return (
    <div className="relative z-10 w-full h-full min-h-0 flex-1 flex flex-col justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3 animate-fadeIn select-none text-[#E5FBB8] overflow-hidden">
      
      {/* CV Terminal Header */}
      <div className="flex items-center justify-between border-b border-[#E5FBB8]/40 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-silkscreen text-[18px] sm:text-[22px] tracking-wider uppercase font-normal text-[#E5FBB8]">
            CV
          </span>
          <span className="text-[10px] sm:text-[11.5px] font-silkscreen px-2 py-0.5 bg-[#E5FBB8] text-black font-normal">
            LORENA ORLANDO
          </span>
        </div>
        <div className="font-share-tech-mono text-[9px] sm:text-[10px] text-[#E5FBB8]/70">
          DOCUMENT // VER 2026.09
        </div>
      </div>

      {/* Main Text Content - Full-height Scrollable Terminal */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto pr-2 sm:pr-4 space-y-5 custom-scrollbar text-left font-sometype-mono leading-relaxed uppercase touch-pan-y overscroll-contain pb-3">
        
        {/* 1. Header & Contact Section */}
        <div className="space-y-1.5 pb-3 border-b border-[#E5FBB8]/20">
          <div className="text-[15px] sm:text-[17px] font-normal text-[#E5FBB8] tracking-wide font-silkscreen">
            {t.cv.roleTitle}
          </div>
          <div className="text-[11.5px] sm:text-[13px] text-[#E5FBB8]/80 flex flex-wrap gap-x-6 gap-y-1 font-share-tech-mono">
            <span>TEL: +58 412 099 11 80</span>
            <span>EMAIL: SOY@LORENAORLANDO.COM</span>
          </div>
          <p className="text-[#E5FBB8]/90 pt-1 font-normal leading-relaxed text-[13px] sm:text-[14.5px]">
            {t.cv.summary}
          </p>
        </div>

        {/* 2. Experience Section */}
        <div className="space-y-3.5">
          <div className="text-[16px] sm:text-[18px] font-normal text-[#E5FBB8] tracking-wider border-b border-[#E5FBB8]/40 pb-1 font-silkscreen flex items-center justify-between">
            <span>{t.cv.experienceTitle}</span>
            <span className="text-[10px] font-sometype-mono text-[#E5FBB8]/60">{t.cv.chronologicalRecord}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {cvData.map((item, idx) => (
              <div key={idx} className="space-y-1.5 p-2.5 bg-black/40 border border-[#E5FBB8]/20">
                <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px] border-b border-[#E5FBB8]/20 pb-0.5">
                  {item.company}
                </div>
                {item.positions.map((pos, pIdx) => (
                  <div key={pIdx} className="space-y-0.5 pt-1 first:pt-0.5">
                    <div className="text-[13px] sm:text-[14px] text-[#E5FBB8] font-bold">
                      {pos.role}
                    </div>
                    <div className="text-[11.5px] sm:text-[12.5px] text-[#E5FBB8]/60 font-sometype-mono">
                      {pos.period}
                    </div>
                    {pos.bullets && pos.bullets.length > 0 && (
                      <div className="space-y-0.5 pt-0.5">
                        {pos.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="text-[11px] sm:text-[12px] text-[#E5FBB8]/90 leading-tight">
                            • {bullet}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Design & Development Tools */}
        <div className="pt-3 border-t border-[#E5FBB8]/20 space-y-1.5">
          <div className="text-[15px] sm:text-[17px] font-normal text-[#E5FBB8] tracking-wider font-silkscreen">
            {t.cv.toolsTitle}
          </div>
          <div className="text-[11px] sm:text-[12.5px] text-[#E5FBB8]/90 flex flex-wrap gap-x-3 gap-y-1.5 font-share-tech-mono">
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ WORDPRESS ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ SQUARESPACE ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ WEBFLOW ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ FRAMER ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ FIGMA ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ PHOTOSHOP ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ CANVA ]</span>
            <span className="px-1.5 py-0.5 bg-black border border-[#E5FBB8]/40">[ WOOCOMMERCE ]</span>
          </div>
        </div>

      </div>

      {/* Footer Navigation */}
      <div className="mt-2 pt-2 border-t border-[#E5FBB8]/30 flex items-center justify-between shrink-0">
        <button
          onClick={() => {
            audioEngine.playClick(0.9);
            onBack();
          }}
          className="px-3 py-1 bg-black hover:bg-[#B980F0] hover:text-black text-[#E5FBB8] border border-[#E5FBB8] font-silkscreen text-[9px] sm:text-[10px] cursor-pointer transition-colors uppercase shadow-[1px_1px_0px_rgba(229,251,184,0.3)]"
        >
          {t.cv.backToAbout}
        </button>

        <button
          onClick={() => {
            audioEngine.playClick(1.5);
            onNavigateWorks();
          }}
          className="px-3.5 py-1 bg-[#E5FBB8] text-black font-silkscreen font-normal text-[9px] sm:text-[10.5px] uppercase tracking-wider hover:bg-[#B980F0] cursor-pointer transition-colors shadow-[1px_1px_0px_rgba(0,0,0,0.5)]"
        >
          {t.cv.exploreWorks}
        </button>
      </div>

    </div>
  );
};
