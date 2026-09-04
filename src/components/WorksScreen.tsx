import React, { useState } from 'react';
import { WorkProject, getWorksData } from '../data/worksData';
import { CaseStudyScreen } from './CaseStudyScreen';
import { audioEngine } from '../utils/audio';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface WorksScreenProps {
  currentIndex?: number;
  language?: Language;
  onIndexChange?: (index: number) => void;
  onBack: () => void;
  onNavigateAbout: () => void;
}

export const WorksScreen: React.FC<WorksScreenProps> = ({ 
  language = 'es',
  onBack, 
  onNavigateAbout 
}) => {
  const t = TRANSLATIONS[language];
  const worksData = getWorksData(language);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [pressedBtnSlug, setPressedBtnSlug] = useState<string | null>(null);

  const handleCaseStudyClick = (idx: number, slug: string) => {
    setPressedBtnSlug(slug);
    audioEngine.playClick(1.4);
    setTimeout(() => {
      setPressedBtnSlug(null);
      setSelectedProjectIndex(idx);
    }, 120);
  };

  const handleNextCase = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % worksData.length);
    }
  };

  const handlePrevCase = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex - 1 + worksData.length) % worksData.length);
    }
  };

  const activeCaseProject = selectedProjectIndex !== null ? worksData[selectedProjectIndex] : null;

  return (
    <div className="relative z-10 w-full h-full min-h-0 flex flex-col bg-black text-[#E5FBB8] select-none overflow-hidden">
      
      {/* Works Continuous Natural Scroll List */}
      <div 
        id="works-scroll-container"
        className="w-full h-full min-h-0 overflow-y-auto custom-scrollbar touch-pan-y overscroll-contain flex flex-col items-center px-2 sm:px-6 md:px-8 py-3 sm:py-6"
      >
        {/* Header Ribbon */}
        <div className="w-full max-w-[840px] flex items-center justify-between border-b border-[#E5FBB8]/40 pb-2 mb-4 sm:mb-6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-silkscreen text-[11px] sm:text-[13px] text-[#E5FBB8] uppercase tracking-wider">
              {t.works.archiveTitle}
            </span>
            <span className="font-sometype-mono text-[9px] sm:text-[10px] text-[#E5FBB8]/70">
              [{worksData.length} {t.works.worksCountSuffix}]
            </span>
          </div>

          <div className="flex items-center gap-2 font-share-tech-mono text-[9px] sm:text-[10px] text-[#E5FBB8]/70">
            <span>▼ {t.works.scrollDown}</span>
          </div>
        </div>

        {/* List of all projects rendered naturally for fluid scrolling */}
        <div className="w-full max-w-[840px] flex flex-col gap-8 sm:gap-14 pb-8">
          {worksData.map((project, idx) => {
            const projectNumber = String(idx + 1).padStart(2, '0');
            const isPressed = pressedBtnSlug === project.slug;

            return (
              <article 
                key={project.slug}
                id={`work-item-${project.slug}`}
                className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-3 sm:p-5 border border-[#E5FBB8]/30 bg-black/60 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rounded-[2px]"
              >
                {/* Left Side: Video Container with #E5FBB8 Border */}
                <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] aspect-square relative bg-black border-[3px] sm:border-[4px] border-[#E5FBB8] overflow-hidden flex items-center justify-center shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.6)]">
                  {/* Corner index guide */}
                  <span className="absolute top-1 left-1.5 font-silkscreen text-[7.5px] sm:text-[8.5px] text-[#E5FBB8] bg-black/80 px-1 py-0.5 z-20 border border-[#E5FBB8]/50 leading-none">
                    [{projectNumber}/{worksData.length}]
                  </span>

                  {/* Video Player */}
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Right Side: Details & Action Button */}
                <div className="flex-1 w-full max-w-[340px] md:max-w-[360px] flex flex-col justify-center text-left gap-2.5 sm:gap-3.5">
                  
                  {/* Title Banner */}
                  <div className="inline-block">
                    <div 
                      className="px-2.5 py-1 bg-[#E5FBB8] text-black font-silkscreen font-normal tracking-wider leading-none uppercase inline-block border border-black text-[17px] sm:text-[20px] md:text-[22px]"
                    >
                      {project.title}
                    </div>
                  </div>

                  {/* Type Tag */}
                  <div className="flex items-center gap-2 font-sometype-mono text-[9.5px] sm:text-[11px] text-[#E5FBB8]/80">
                    <span className="truncate">{project.typeOfProject}</span>
                  </div>

                  {/* Disciplines / Tags */}
                  <div className="flex flex-col gap-0.5 text-[#E5FBB8] leading-snug tracking-wider">
                    {project.disciplines.map((discipline, dIdx) => (
                      <span 
                        key={dIdx} 
                        className="block font-share-tech-mono text-[14px] sm:text-[17px] md:text-[18px] text-[#E5FBB8]/90 font-bold"
                      >
                        {discipline}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Button: SEE CASE STUDY */}
                  <div className="pt-1.5">
                    <button
                      id={`btn-case-${project.slug}`}
                      onClick={() => handleCaseStudyClick(idx, project.slug)}
                      className={`px-3.5 sm:px-4 py-1.5 bg-[#E5FBB8] text-black font-silkscreen font-normal leading-none uppercase tracking-wider transition-all duration-75 cursor-pointer outline-none border border-black text-[13px] sm:text-[14px] md:text-[15px] ${
                        isPressed ? 'scale-95 bg-[#B980F0]' : 'hover:bg-[#B980F0] active:scale-95'
                      }`}
                      title={`${t.works.seeCaseStudy} - ${project.title}`}
                    >
                      {t.works.seeCaseStudy} →
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* Footer info at the bottom of the list */}
        <div className="w-full max-w-[840px] border-t border-[#E5FBB8]/40 pt-3 pb-4 flex items-center justify-between text-[9px] sm:text-[10px] font-sometype-mono text-[#E5FBB8]/70">
          <span>{t.works.endOfArchive}</span>
          <button 
            onClick={() => {
              const el = document.getElementById('works-scroll-container');
              if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-[#E5FBB8] underline cursor-pointer"
          >
            ▲ {t.works.backToTop}
          </button>
        </div>

      </div>

      {/* ========================================================
          FULL CASE STUDY SCREEN TAKEOVER MODAL
         ======================================================== */}
      {activeCaseProject && (
        <div className="absolute inset-0 z-40 bg-black">
          <CaseStudyScreen
            project={activeCaseProject}
            language={language}
            onBack={() => setSelectedProjectIndex(null)}
            onNext={handleNextCase}
            onPrev={handlePrevCase}
            hasPrev={true}
            hasNext={true}
          />
        </div>
      )}

    </div>
  );
};
