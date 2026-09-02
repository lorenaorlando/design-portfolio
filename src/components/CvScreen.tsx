import React from 'react';
import { audioEngine } from '../utils/audio';

interface CvScreenProps {
  onBack: () => void;
  onNavigateWorks: () => void;
}

export const CvScreen: React.FC<CvScreenProps> = ({ onBack, onNavigateWorks }) => {
  return (
    <div className="relative z-10 w-full h-full flex-1 flex flex-col justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3 animate-fadeIn select-none text-[#E5FBB8] overflow-hidden">
      
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
      <div className="flex-1 w-full overflow-y-auto pr-2 sm:pr-4 space-y-5 custom-scrollbar text-left font-sometype-mono leading-relaxed uppercase touch-pan-y overscroll-contain pb-3">
        
        {/* 1. Header & Contact Section */}
        <div className="space-y-1.5 pb-3 border-b border-[#E5FBB8]/20">
          <div className="text-[15px] sm:text-[17px] font-normal text-[#E5FBB8] tracking-wide font-silkscreen">
            WEB &amp; VISUAL DESIGNER
          </div>
          <div className="text-[11.5px] sm:text-[13px] text-[#E5FBB8]/80 flex flex-wrap gap-x-6 gap-y-1 font-share-tech-mono">
            <span>TEL: +58 412 099 11 80</span>
            <span>EMAIL: SOY@LORENAORLANDO.COM</span>
          </div>
          <p className="text-[#E5FBB8]/90 pt-1 font-normal leading-relaxed text-[13px] sm:text-[14.5px]">
            DIGITAL DESIGNER WITH OVER 10 YEARS OF EXPERIENCE ACROSS WEB DESIGN, BRANDING, AND VISUAL DIRECTION. CURRENTLY WORKING AS A WEBMASTER AT PUENTES AND LAS ESCUCHADORAS. FOCUSED ON SHAPING STRUCTURE AND IDENTITY INTO ENGAGING DIGITAL EXPERIENCES BASED ON THE VISION AND GOALS OF EVERY PROJECT.
          </p>
        </div>

        {/* 2. Experience Section */}
        <div className="space-y-3.5">
          <div className="text-[16px] sm:text-[18px] font-normal text-[#E5FBB8] tracking-wider border-b border-[#E5FBB8]/40 pb-1 font-silkscreen flex items-center justify-between">
            <span>// EXPERIENCE</span>
            <span className="text-[10px] font-sometype-mono text-[#E5FBB8]/60">CHRONOLOGICAL RECORD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            
            {/* Puentes */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">PUENTES</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MARCH 2025 - PRESENT</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WEBMASTER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• CONTENT UPDATES AND MAINTENANCE</div>
            </div>

            {/* Las Escuchadoras */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">LAS ESCUCHADORAS</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">DECEMBER 2024 - PRESENT</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WEBMASTER</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MARCH 2024 - JUNE 2024</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">SQUARESPACE DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• CONTENT UPDATES, MAINTENANCE &amp; LANDING PAGE CREATION</div>
            </div>

            {/* Afrochingonas */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">AFROCHINGONAS</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">DECEMBER 2022 - DECEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WEBMASTER</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MARCH 2022 - NOVEMBER 2022</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• CSS CUSTOMIZATION, EMAIL ACCOUNTS &amp; WOOCOMMERCE SETTING</div>
            </div>

            {/* Caresaga */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">CARESAGA</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">FEBRUARY 2025 - APRIL 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• WEBSITE REDESIGN &amp; BRAND IDENTITY REDESIGN</div>
            </div>

            {/* Venezuelan Film Services */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">VENEZUELAN FILM SERVICES</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">NOVEMBER 2025 - DECEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* Colmena de Escritores */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">COLMENA DE ESCRITORES</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">AUGUST 2025 - NOVEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* Antroposabores */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">ANTROPOSABORES</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">JUNE 2025 - JULY 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* Brigitte Olivares */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">BRIGITTE OLIVARES</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">NOVEMBER 2025 - DECEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">FRAMER DESIGNER</div>
            </div>

            {/* José Ramírez Guaigua */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">JOSÉ RAMÍREZ GUAIGUA</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">AUGUST 2025 - SEPTEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* Gianni Felice */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">GIANNI FELICE</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">AUGUST 2025 - NOVEMBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• UPDATE WITH NEW CONTENT</div>
            </div>

            {/* Lunaria Ritual */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">LUNARIA RITUAL</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">AUGUST 2025 - OCTOBER 2025</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS &amp; BRAND DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• BRAND DESIGN &amp; CREATION OF BUSINESS EMAIL ACCOUNTS</div>
            </div>

            {/* Technicolor */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">TECHNICOLOR</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MAY 2024 - JULY 2024</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• EPK DESIGN</div>
            </div>

            {/* Del Siervo */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">DEL SIERVO</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MARCH 2024 - APRIL 2024</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• BRANDING DESIGN</div>
            </div>

            {/* Freelanzate al éxito */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">FREELANZATE AL ÉXITO</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">SEPTEMBER 2024 - OCTOBER 2024</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* JEVA ORG */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">JEVA ORG</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">NOVEMBER 2023 - MAY 2024</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WEBFLOW DESIGNER</div>
              <div className="text-[11.5px] sm:text-[12px] text-[#E5FBB8]/90">• UPDATE WITH NEW CONTENT &amp; COMPANY EMAIL SETUP</div>
            </div>

            {/* Jarina de Marco */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">JARINA DE MARCO</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">SEPTEMBER 2023</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">SQUARESPACE DESIGNER</div>
            </div>

            {/* NFTecnológica */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">NFTECNOLÓGICA</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">SEPTEMBER 2023</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* Ni gracias ni no */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">NI GRACIAS NI NO</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">MARCH 2023 - APRIL 2023</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">WORDPRESS DESIGNER</div>
            </div>

            {/* El Bus TV */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">EL BUS TV</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">2018</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-bold">MOCK UP DESIGNER</div>
            </div>

            {/* Draidel */}
            <div className="space-y-0.5 p-2 bg-black/40 border border-[#E5FBB8]/20">
              <div className="font-normal text-[#E5FBB8] font-silkscreen text-[15px] sm:text-[16px]">DRAIDEL</div>
              <div className="text-[12px] sm:text-[13px] text-[#E5FBB8]/60 font-sometype-mono">2016 - 2017</div>
              <div className="text-[13.5px] sm:text-[14px] text-[#E5FBB8]/80 font-sometype-mono font-bold">FULL-TIME WEB DESIGNER (WORDPRESS, HTML, CSS)</div>
            </div>

          </div>
        </div>

        {/* 3. Design & Development Tools */}
        <div className="pt-3 border-t border-[#E5FBB8]/20 space-y-1.5">
          <div className="text-[15px] sm:text-[17px] font-normal text-[#E5FBB8] tracking-wider font-silkscreen">
            // DESIGN &amp; DEVELOPMENT TOOLS
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
          ← BACK TO ABOUT
        </button>

        <button
          onClick={() => {
            audioEngine.playClick(1.5);
            onNavigateWorks();
          }}
          className="px-3.5 py-1 bg-[#E5FBB8] text-black font-silkscreen font-normal text-[9px] sm:text-[10.5px] uppercase tracking-wider hover:bg-[#B980F0] cursor-pointer transition-colors shadow-[1px_1px_0px_rgba(0,0,0,0.5)]"
        >
          EXPLORE WORKS ▶
        </button>
      </div>

    </div>
  );
};
