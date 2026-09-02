import React, { useState, useRef, useEffect } from 'react';
import { audioEngine } from '../utils/audio';

interface KnobProps {
  id?: string;
  value: number; // 0 to 100
  onChange: (val: number) => void;
  label?: string;
  className?: string;
}

export const Knob: React.FC<KnobProps> = ({
  id = 'knob-on-bright',
  value,
  onChange,
  label = 'ON-BRIGHT',
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef<number>(0);
  const startValRef = useRef<number>(0);
  const lastStepRef = useRef<number>(value);

  // Map 0-100 to -135deg to +135deg
  const rotationDeg = -135 + (value / 100) * 270;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startValRef.current = value;
    audioEngine.playKnobStep();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = startYRef.current - e.clientY;
      const sensitivity = 0.75;
      const newVal = Math.min(100, Math.max(10, Math.round(startValRef.current + deltaY * sensitivity)));
      
      if (Math.abs(newVal - lastStepRef.current) >= 5) {
        audioEngine.playKnobStep();
        lastStepRef.current = newVal;
      }
      onChange(newVal);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onChange]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 5 : -5;
    const newVal = Math.min(100, Math.max(10, value + delta));
    audioEngine.playKnobStep();
    onChange(newVal);
  };

  return (
    <div
      id={`container-${id}`}
      className={`inline-flex flex-col items-center select-none ${className}`}
      title="Rotate or drag up/down to adjust screen brightness"
    >
      {/* Label */}
      <span
        className="text-[8px] font-silkscreen font-bold tracking-wider text-[#f5d5f0] uppercase mb-1"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.85)' }}
      >
        {label}
      </span>

      {/* Outer recessed bezel ring */}
      <div
        id={id}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className="relative w-8 h-8 rounded-full p-0.5 cursor-ns-resize"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #4a103e 0%, #1f051a 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.85), 0 1px 2px rgba(255,255,255,0.2)',
          border: '1px solid #140311',
        }}
      >
        {/* Rotating Knob dial */}
        <div
          className="w-full h-full rounded-full relative transition-transform duration-75"
          style={{
            transform: `rotate(${rotationDeg}deg)`,
            background: 'radial-gradient(circle at 40% 40%, #6e1a5d 0%, #3a0d31 75%, #24071f 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {/* White / Amber notch indicator */}
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 rounded-full bg-amber-300"
            style={{
              boxShadow: '0 0 3px rgba(255,200,0,0.8)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
