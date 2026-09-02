import React from 'react';

interface DataGeneralBadgeProps {
  className?: string;
  onClick?: () => void;
}

export const DataGeneralBadge: React.FC<DataGeneralBadgeProps> = ({ className = '', onClick }) => {
  return (
    <div
      id="hardware-brand-badge"
      onClick={onClick}
      className={`relative inline-flex items-center px-2.5 py-1 rounded-[3px] cursor-pointer select-none transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background: 'linear-gradient(135deg, #f6e6b4 0%, #dfc382 35%, #f9edcb 50%, #c9a759 85%, #b59243 100%)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(0,0,0,0.4)',
        border: '1px solid #9e7d32',
      }}
      title="Data General Corporation Vintage Terminal Plate"
    >
      {/* Subtle metallic reflection streak */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[2px]"
        style={{
          background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 45%, transparent 60%)',
        }}
      />

      <div className="flex items-center gap-1.5 relative z-10">
        {/* Vintage Data General four-diamond / tree crest mark */}
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 text-[#523d14]"
          fill="currentColor"
        >
          <path d="M12 2L4 10H9V14H4L12 22L20 14H15V10H20L12 2Z" fill="#523d14" />
        </svg>

        <span
          className="text-[10px] font-bold tracking-tight uppercase"
          style={{
            fontFamily: 'serif',
            color: '#3d2e11',
            textShadow: '0 1px 0 rgba(255,255,255,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          DataGeneral
        </span>
      </div>
    </div>
  );
};
