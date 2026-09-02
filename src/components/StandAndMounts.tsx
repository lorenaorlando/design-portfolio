import React from 'react';

interface StandAndMountsProps {
  tiltAngle?: number;
  onKnobClick?: () => void;
}

export const StandAndMounts: React.FC<StandAndMountsProps> = ({
  onKnobClick,
}) => {
  return (
    <div id="monitor-stand-assembly" className="relative w-full flex flex-col items-center select-none pointer-events-none">
      {/* 1. U-shaped Cradle Yoke Frame (curves beneath monitor chassis) */}
      <div className="relative w-full max-w-[860px] h-10 -mt-2 z-0 flex justify-center">
        {/* The horizontal crossbar of the cradle */}
        <div
          id="cradle-crossbar"
          className="w-[94%] h-4 rounded-b-xl"
          style={{
            background: 'linear-gradient(180deg, #d3cebd 0%, #ded9c7 40%, #c4bea9 100%)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(0,0,0,0.2)',
            borderLeft: '1px solid #b8b199',
            borderRight: '1px solid #b8b199',
            borderBottom: '1px solid #aba38a',
          }}
        />
      </div>

      {/* 2. Central Swivel Neck / Rotating Collar */}
      <div
        id="swivel-pedestal-neck"
        className="relative w-36 sm:w-44 h-8 sm:h-9 -mt-6 z-0 flex flex-col items-center"
      >
        {/* Upper pivot cylinder */}
        <div
          className="w-28 sm:w-32 h-5 rounded-t-lg"
          style={{
            background: 'linear-gradient(90deg, #b8b199 0%, #ded9c7 25%, #ece8d8 50%, #ded9c7 75%, #b3ac94 100%)',
            boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.6), inset 0 -2px 3px rgba(0,0,0,0.25)',
            borderTop: '1px solid #aba38a',
          }}
        />

        {/* Lower turntable swivel disc */}
        <div
          className="w-36 sm:w-44 h-3.5 sm:h-4 rounded-full -mt-1"
          style={{
            background: 'linear-gradient(90deg, #a69f88 0%, #ded9c7 30%, #f0ecdc 50%, #ded9c7 70%, #9e977f 100%)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.3)',
            border: '1px solid #b3ac94',
          }}
        />
      </div>

      {/* 3. Wide Desktop Heavy Base Foot (Trapezoidal Pedestal) */}
      <div
        id="desktop-pedestal-base"
        className="relative w-full max-w-[580px] sm:max-w-[680px] h-9 sm:h-11 -mt-2 z-0"
      >
        {/* Base Beveled Geometry using pure CSS and SVG */}
        <div
          className="w-full h-full rounded-[14px] sm:rounded-[18px] relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #eae5d4 0%, #ded9c7 35%, #cb649 70%, #bcb49c 100%)',
            boxShadow: `
              0 20px 40px -10px rgba(0, 0, 0, 0.28),
              0 8px 16px -4px rgba(0, 0, 0, 0.16),
              inset 0 2px 3px rgba(255, 255, 255, 0.85),
              inset 0 -3px 4px rgba(0, 0, 0, 0.3)
            `,
            border: '1px solid #b8b199',
          }}
        >
          {/* Subtle sloped surface reflection */}
          <div
            className="absolute inset-x-8 top-0 h-4 pointer-events-none rounded-t-full opacity-60"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Rubber foot base lip */}
          <div
            className="absolute inset-x-0 bottom-0 h-1.5 bg-[#1a1c20]"
            style={{
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* Ambient Occlusion Contact Shadow Grounding to Studio Table */}
        <div
          className="absolute -bottom-4 inset-x-4 h-8 -z-10 rounded-full blur-md opacity-35"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 75%)',
          }}
        />
      </div>
    </div>
  );
};

interface SideKnobProps {
  side: 'left' | 'right';
  onClick?: () => void;
}

export const SideAdjustmentKnob: React.FC<SideKnobProps> = ({ side, onClick }) => {
  return (
    <div
      id={`chassis-swivel-knob-${side}`}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === 'left' ? '-left-6 sm:-left-7' : '-right-6 sm:-right-7'
      } z-30 cursor-pointer group pointer-events-auto select-none`}
      title={`Tilt Swivel Lock Nut (${side})`}
    >
      {/* Chassis Pivot Spacer Boss */}
      <div
        className="w-5 h-8 sm:w-6 sm:h-10 rounded-sm absolute top-1/2 -translate-y-1/2"
        style={{
          left: side === 'left' ? 'auto' : '-3px',
          right: side === 'left' ? '-3px' : 'auto',
          background: 'linear-gradient(180deg, #d8d3c1 0%, #c4bea9 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          border: '1px solid #aba38a',
        }}
      />

      {/* Fluted Cylindrical Black Hand Knob */}
      <div
        className="relative w-6 sm:w-7 h-16 sm:h-20 rounded-md sm:rounded-lg overflow-hidden transition-transform duration-150 group-hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(90deg, #181c22 0%, #303742 40%, #1c2026 100%)',
          boxShadow: `
            0 8px 16px rgba(0, 0, 0, 0.4),
            inset 0 1px 1px rgba(255, 255, 255, 0.25),
            inset 0 -1px 2px rgba(0, 0, 0, 0.6)
          `,
          border: '1px solid #101318',
        }}
      >
        {/* Ribbed knurling flutes */}
        <div className="w-full h-full flex flex-col justify-around py-1.5 px-0.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-1 rounded-full opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.8) 100%)',
              }}
            />
          ))}
        </div>

        {/* Center Metal Axis Bolt */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #7a828e 0%, #2f343b 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.6), 0 1px 2px rgba(0,0,0,0.8)',
          }}
        />
      </div>
    </div>
  );
};
