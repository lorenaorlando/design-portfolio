import React from 'react';
import { WorkProject } from '../data/worksData';
import { audioEngine } from '../utils/audio';

interface CaseStudyScreenProps {
  project: WorkProject;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const CaseStudyScreen: React.FC<CaseStudyScreenProps> = ({
  project,
  onBack,
  onNext,
  onPrev,
  hasPrev = true,
  hasNext = true,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-black text-[#E5FBB8] p-2 sm:p-3 overflow-hidden select-none animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between pb-2 border-b border-[#E5FBB8] shrink-0 gap-2">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <button
            onClick={() => {
              audioEngine.playClick(0.9);
              onBack();
            }}
            className="px-2.5 py-1 bg-[#E5FBB8] text-black font-silkscreen text-[11px] sm:text-[12px] font-normal hover:bg-[#B980F0] transition-colors cursor-pointer shrink-0 flex items-center gap-1 leading-none border border-black"
          >
            <span>←</span> BACK
          </button>
          <span className="font-silkscreen text-[12px] sm:text-[15px] text-[#E5FBB8] uppercase truncate font-normal">
            {project.title}
          </span>
        </div>

        {/* Next / Prev Navigation */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onPrev && (
            <button
              onClick={() => {
                audioEngine.playClick(1.1);
                onPrev();
              }}
              disabled={!hasPrev}
              className="px-2 py-1 border border-[#E5FBB8]/60 text-[#E5FBB8] hover:bg-[#B980F0] hover:text-black font-silkscreen text-[10px] sm:text-[11px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed leading-none"
              title="Previous Case Study"
            >
              PREV
            </button>
          )}
          {onNext && (
            <button
              onClick={() => {
                audioEngine.playClick(1.2);
                onNext();
              }}
              disabled={!hasNext}
              className="px-2 py-1 border border-[#E5FBB8]/60 text-[#E5FBB8] hover:bg-[#B980F0] hover:text-black font-silkscreen text-[10px] sm:text-[11px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed leading-none"
              title="Next Case Study"
            >
              NEXT
            </button>
          )}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto pr-1 sm:pr-2 pt-2.5 pb-4 space-y-4 font-share-tech-mono text-[13px] sm:text-[14px] leading-relaxed custom-scrollbar">
        
        {/* Meta Specs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 border border-[#E5FBB8]/40 bg-[#E5FBB8]/5">
          <div>
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#E5FBB8]/70 block mb-0.5">
              SCOPE:
            </span>
            <span className="font-share-tech-mono text-[12.5px] sm:text-[14px] text-[#E5FBB8] font-normal leading-normal">
              {project.category}
            </span>
          </div>
          <div>
            <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#E5FBB8]/70 block mb-0.5">
              TYPE OF CLIENT:
            </span>
            <span className="font-share-tech-mono text-[12.5px] sm:text-[14px] text-[#E5FBB8] font-normal leading-normal">
              {project.typeOfProject}
            </span>
          </div>
        </div>

        {/* Media Grid: Image + Live Video Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
          
          {/* 1. Main Project Case Study Image */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#E5FBB8] tracking-wider uppercase">
                [ VISUAL ARTIFACT ]
              </span>
              <span className="font-share-tech-mono text-[10px] text-[#E5FBB8]/70">
                100% HI-RES
              </span>
            </div>
            <div className="w-full border-2 border-[#E5FBB8] bg-[#E5FBB8] p-1 flex items-center justify-center overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto max-h-[220px] object-contain border border-black/20"
                loading="eager"
              />
            </div>
          </div>

          {/* 2. Motion Artifact / Looping Video Player */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#E5FBB8] tracking-wider uppercase">
                [ MOTION ARTIFACT ]
              </span>
              <span className="font-share-tech-mono text-[10px] text-[#E5FBB8]/70">
                LIVE LOOP
              </span>
            </div>
            <div className="w-full border-2 border-[#E5FBB8] bg-black p-1 flex items-center justify-center overflow-hidden">
              <video
                key={project.videoUrl}
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[220px] object-cover border border-[#E5FBB8]/30"
              />
            </div>
          </div>

        </div>

        {/* Structured Case Study Sections */}
        <div className="space-y-4 pt-1">
          
          {/* ABOUT SECTION */}
          <div className="border-t border-[#E5FBB8]/40 pt-2.5">
            <div
              className="case-study-html space-y-2"
              dangerouslySetInnerHTML={{ __html: project.aboutHtml }}
            />
          </div>

          {/* PROCESS SECTION */}
          <div className="border-t border-[#E5FBB8]/40 pt-2.5">
            <div
              className="case-study-html space-y-2"
              dangerouslySetInnerHTML={{ __html: project.processHtml }}
            />
          </div>

          {/* RESULT SECTION */}
          <div className="border-t border-[#E5FBB8]/40 pt-2.5">
            <div
              className="case-study-html space-y-2"
              dangerouslySetInnerHTML={{ __html: project.resultHtml }}
            />
          </div>

        </div>

        {/* Bottom Case Study Actions */}
        <div className="pt-3 border-t-2 border-[#E5FBB8] flex items-center justify-between">
          <span className="font-silkscreen text-[10px] sm:text-[11px] text-[#E5FBB8]/80">
            CASE STUDY // {project.slug}
          </span>
          <button
            onClick={() => {
              audioEngine.playClick(0.9);
              onBack();
            }}
            className="px-3.5 py-1.5 bg-[#E5FBB8] text-black font-silkscreen text-[11px] font-normal hover:bg-[#B980F0] transition-colors cursor-pointer border border-black"
          >
            ← RETURN TO WORKS
          </button>
        </div>

      </div>

    </div>
  );
};
