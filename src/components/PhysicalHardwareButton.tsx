import React from 'react';
import { audioEngine } from '../utils/audio';

interface PhysicalHardwareButtonProps {
  id: string;
  label: string;
  subLabel?: string;
  isActive?: boolean;
  ledColor?: 'green' | 'amber' | 'red' | 'blue';
  icon?: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
}

export const PhysicalHardwareButton: React.FC<PhysicalHardwareButtonProps> = ({
  id,
  label,
  subLabel,
  isActive = false,
  ledColor = 'green',
  icon,
  onClick,
  tooltip,
}) => {
  const handleClick = () => {
    audioEngine.playClick(isActive ? 0.95 : 1.15);
    onClick();
  };

  const getLedStyles = () => {
    if (!isActive) {
      return {
        backgroundColor: '#26292b',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
        border: '1px solid #1a1a1a',
      };
    }

    switch (ledColor) {
      case 'amber':
        return {
          backgroundColor: '#ffb300',
          boxShadow: '0 0 8px #ffb300, inset 0 1px 1px #fff',
          border: '1px solid #d99100',
        };
      case 'red':
        return {
          backgroundColor: '#ff3b30',
          boxShadow: '0 0 8px #ff3b30, inset 0 1px 1px #fff',
          border: '1px solid #c91e14',
        };
      case 'blue':
        return {
          backgroundColor: '#00c7ff',
          boxShadow: '0 0 8px #00c7ff, inset 0 1px 1px #fff',
          border: '1px solid #0099cc',
        };
      case 'green':
      default:
        return {
          backgroundColor: '#34c759',
          boxShadow: '0 0 8px #34c759, inset 0 1px 1px #fff',
          border: '1px solid #28a745',
        };
    }
  };

  return (
    <div
      id={`container-${id}`}
      className="flex flex-col items-center gap-1.5 select-none"
      title={tooltip || label}
    >
      {/* LED Indicator above button */}
      <div className="flex items-center gap-1">
        <div
          id={`led-${id}`}
          className={`w-2 h-2 rounded-full transition-all duration-200 ${isActive ? 'animate-led' : ''}`}
          style={getLedStyles()}
        />
      </div>

      {/* Physical Push Button Outer Recessed Well */}
      <div
        className="p-1 rounded-xl bg-[#2a0823] shadow-[inset_0_2px_5px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.15)] border border-[#1a0416]"
      >
        <button
          id={id}
          type="button"
          onClick={handleClick}
          className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg transition-all duration-75 active:translate-y-0.5 cursor-pointer outline-none focus:ring-1 focus:ring-amber-300/40`}
          style={{
            background: isActive
              ? 'linear-gradient(180deg, #5c144e 0%, #3e0c34 100%)'
              : 'linear-gradient(180deg, #6e1a5d 0%, #4a103e 70%, #360a2d 100%)',
            boxShadow: isActive
              ? 'inset 0 2px 4px rgba(0,0,0,0.75), 0 1px 1px rgba(255,255,255,0.1)'
              : 'inset 0 1px 1px rgba(255,255,255,0.4), 0 3px 6px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Subtle button surface concentric ring texture */}
          <div className="absolute inset-1 rounded-[6px] border border-white/10 pointer-events-none" />

          {/* Icon or Graphic */}
          <div
            className={`transition-colors duration-150 ${
              isActive ? 'text-amber-200' : 'text-neutral-200 group-hover:text-white'
            }`}
          >
            {icon}
          </div>
        </button>
      </div>

      {/* Silkscreened retro typography label */}
      <div className="text-center">
        <span
          className="block text-[8px] sm:text-[9px] font-silkscreen font-bold tracking-wider text-[#f5d5f0] uppercase leading-tight"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
        >
          {label}
        </span>
        {subLabel && (
          <span className="block text-[7px] sm:text-[8px] font-silkscreen text-[#c98ebb] uppercase tracking-normal mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
