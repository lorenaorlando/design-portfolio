import React from 'react';

interface PixelGlobeProps {
  color?: string;
  className?: string;
}

export const PixelGlobe: React.FC<PixelGlobeProps> = ({
  color = '#7C3AED',
  className = 'w-full h-full',
}) => {
  // 16x16 or 24x24 Pixel Grid representing the 8-bit wireframe globe from the screenshot
  // 1 = filled pixel block, 0 = empty
  const globeMatrix = [
    [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0],
    [0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0],
    [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1,0],
    [1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1],
    [0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0],
    [0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0],
  ];

  const rows = globeMatrix.length;
  const cols = globeMatrix[0].length;

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      className={className}
      style={{
        shapeRendering: 'crispEdges',
      }}
      aria-hidden="true"
    >
      {globeMatrix.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          if (cell === 1) {
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width={1}
                height={1}
                fill={color}
              />
            );
          }
          return null;
        })
      )}
    </svg>
  );
};
