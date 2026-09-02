import React from 'react';
import { CrtScreenMode, PowerState } from '../types';
import { ChiQuachCanvas } from './ChiQuachCanvas';

interface CrtScreenProps {
  power: PowerState;
  crtMode: CrtScreenMode;
  brightness: number; // 20 to 120
  contrast: number; // 50 to 150
  activeTab?: string;
  onTabChange?: (tab: any) => void;
  onPowerToggle?: () => void;
  currentScreen?: 1 | 3 | 4 | 5;
  onScreenChange?: (screen: 1 | 3 | 4 | 5) => void;
}

export const CrtScreen: React.FC<CrtScreenProps> = ({
  power,
  crtMode,
  brightness,
  contrast,
  onPowerToggle,
  currentScreen,
  onScreenChange,
}) => {
  const isPoweredOn = power === 'on' || power === 'warming';

  // Apply color matrix filters depending on CRT mode
  const getCrtFilter = () => {
    const base = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (crtMode === 'amber') {
      return `${base} sepia(60%) saturate(150%)`;
    }
    if (crtMode === 'phosphor') {
      return `${base} sepia(80%) hue-rotate(85deg) saturate(200%)`;
    }
    return base;
  };

  return (
    <div
      id="crt-screen-housing"
      className="relative w-full h-full rounded-[16px] overflow-hidden crt-bezel-recess bg-black flex items-center justify-center select-none"
      style={{
        border: '3px solid #000000',
      }}
    >
      {/* 1. CRT Powered OFF State: Glass surface with pure dark reflection */}
      {!isPoweredOn && (
        <div
          id="crt-screen-off"
          onClick={onPowerToggle}
          className="absolute inset-0 w-full h-full bg-black flex flex-col items-center justify-center cursor-pointer group transition-colors"
        >
          {/* Faint hint to turn on */}
          <div className="relative z-10 flex flex-col items-center gap-2 opacity-40 group-hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 bg-black">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[10px] font-silkscreen tracking-wider text-neutral-400 uppercase">
              Standby • Press Button
            </span>
          </div>
        </div>
      )}

      {/* 2. CRT Active Content Container */}
      {isPoweredOn && (
        <div
          id="crt-screen-active"
          className={`relative w-full h-full overflow-hidden bg-black ${
            power === 'warming' ? 'animate-crt-warmup' : ''
          }`}
          style={{
            filter: getCrtFilter(),
          }}
        >
          {/* The Pure Black CRT Screen */}
          <ChiQuachCanvas currentScreen={currentScreen} onScreenChange={onScreenChange} />

          {/* Optional Vintage Scanlines Overlay */}
          {crtMode !== 'clean' && (
            <div className="absolute inset-0 pointer-events-none crt-scanlines opacity-25 z-30" />
          )}

          {/* CRT Glass Reflection Sheen */}
          <div className="absolute inset-0 pointer-events-none crt-glass-glare opacity-15 z-30" />
        </div>
      )}
    </div>
  );
};
