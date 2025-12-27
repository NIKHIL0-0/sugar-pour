import { useMemo } from "react";

interface TeaGlassProps {
  fillPercentage: number;
  isScaleLabel?: boolean;
  scaleLabel?: string;
  index?: number;
}

export const TeaGlass = ({ 
  fillPercentage, 
  isScaleLabel = false, 
  scaleLabel,
  index = 0 
}: TeaGlassProps) => {
  const clampedFill = Math.max(0, Math.min(100, fillPercentage));
  
  // Generate individual sugar crystals with varied shapes
  const sugarCrystals = useMemo(() => {
    if (clampedFill === 0) return [];
    const crystalCount = Math.floor(clampedFill * 1.5) + 30;
    return Array.from({ length: Math.min(crystalCount, 120) }, (_, i) => ({
      id: i,
      x: 18 + Math.random() * 64,
      y: 130 - (Math.random() * clampedFill * 1.15),
      width: Math.random() * 2.5 + 1,
      height: Math.random() * 2 + 0.8,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.5 + 0.3,
      isHighlight: Math.random() > 0.85,
    }));
  }, [clampedFill]);

  // Generate surface crystals for top layer
  const surfaceCrystals = useMemo(() => {
    if (clampedFill === 0) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 130 - (clampedFill * 1.18) + Math.random() * 6 - 3,
      size: Math.random() * 2.5 + 1.5,
      opacity: Math.random() * 0.6 + 0.4,
    }));
  }, [clampedFill]);

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-20 h-28 md:w-24 md:h-32">
        <svg 
          viewBox="0 0 100 140" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}
        >
          <defs>
            {/* Realistic glass gradient with depth */}
            <linearGradient id={`glass-body-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.4" />
              <stop offset="8%" stopColor="hsl(var(--glass-border))" stopOpacity="0.15" />
              <stop offset="25%" stopColor="hsl(var(--glass-border))" stopOpacity="0.03" />
              <stop offset="50%" stopColor="hsl(var(--glass-border))" stopOpacity="0.01" />
              <stop offset="75%" stopColor="hsl(var(--glass-border))" stopOpacity="0.03" />
              <stop offset="92%" stopColor="hsl(var(--glass-border))" stopOpacity="0.12" />
              <stop offset="100%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.25" />
            </linearGradient>

            {/* Thick rim gradient */}
            <linearGradient id={`rim-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.6" />
              <stop offset="40%" stopColor="hsl(var(--glass-border))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--glass-border))" stopOpacity="0.15" />
            </linearGradient>

            {/* Sugar body gradient */}
            <linearGradient id={`sugar-body-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(48, 100%, 98%)" stopOpacity="1" />
              <stop offset="15%" stopColor="hsl(45, 80%, 95%)" stopOpacity="0.95" />
              <stop offset="50%" stopColor="hsl(40, 60%, 92%)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(35, 50%, 88%)" stopOpacity="0.85" />
            </linearGradient>

            {/* Flute shadow gradient */}
            <linearGradient id={`flute-shadow-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--glass-border))" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(var(--glass-border))" stopOpacity="0.03" />
              <stop offset="100%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.2" />
            </linearGradient>

            {/* Glass interior clip */}
            <clipPath id={`interior-${index}`}>
              <path d="M20 18 L17 122 Q17 126 22 126 L78 126 Q83 126 83 122 L80 18 Z" />
            </clipPath>

            {/* Pattern for sugar texture */}
            <pattern id={`sugar-noise-${index}`} width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="hsl(45, 80%, 96%)" />
              <circle cx="2" cy="2" r="0.8" fill="hsl(40, 50%, 90%)" opacity="0.4" />
              <circle cx="6" cy="5" r="0.6" fill="hsl(50, 90%, 99%)" opacity="0.5" />
              <circle cx="4" cy="7" r="0.5" fill="hsl(40, 60%, 88%)" opacity="0.3" />
            </pattern>
          </defs>

          {/* Glass outer body - thick walls */}
          <path
            d="M14 12 L10 126 Q10 136 22 136 L78 136 Q90 136 90 126 L86 12 Q86 4 78 4 L22 4 Q14 4 14 12"
            fill={`url(#glass-body-${index})`}
            stroke="hsl(var(--glass-border))"
            strokeWidth="0.8"
            className="opacity-80"
          />

          {/* Inner glass wall for thickness effect */}
          <path
            d="M18 16 L15 124 Q15 130 22 130 L78 130 Q85 130 85 124 L82 16 Q82 10 78 10 L22 10 Q18 10 18 16"
            fill="none"
            stroke="hsl(var(--glass-border))"
            strokeWidth="0.5"
            className="opacity-30"
          />

          {/* Vertical ribbed flutes - 12 flutes for authentic look */}
          {Array.from({ length: 12 }, (_, i) => {
            const x = 18 + i * 5.5;
            return (
              <g key={`flute-${i}`}>
                {/* Flute depression */}
                <path
                  d={`M${x} 14 Q${x - 1} 70 ${x - 0.5} 128`}
                  fill="none"
                  stroke="hsl(var(--glass-border))"
                  strokeWidth="1.2"
                  className="opacity-12"
                />
                {/* Flute highlight */}
                <path
                  d={`M${x + 1.5} 16 Q${x + 1} 70 ${x + 1.2} 126`}
                  fill="none"
                  stroke="hsl(var(--glass-shine))"
                  strokeWidth="0.8"
                  className="opacity-18"
                />
              </g>
            );
          })}

          {/* Sugar fill with crystal texture */}
          {clampedFill > 0 && !isScaleLabel && (
            <g clipPath={`url(#interior-${index})`}>
              {/* Base sugar layer */}
              <rect
                x="17"
                y={126 - (clampedFill * 1.1)}
                width="66"
                height={clampedFill * 1.1 + 4}
                fill={`url(#sugar-body-${index})`}
                className="transition-all duration-500"
              />

              {/* Sugar texture overlay */}
              <rect
                x="17"
                y={126 - (clampedFill * 1.1)}
                width="66"
                height={clampedFill * 1.1 + 4}
                fill={`url(#sugar-noise-${index})`}
                className="opacity-60 transition-all duration-500"
              />

              {/* Individual sugar crystals */}
              {sugarCrystals.map((crystal) => (
                <rect
                  key={crystal.id}
                  x={crystal.x}
                  y={crystal.y}
                  width={crystal.width}
                  height={crystal.height}
                  rx="0.3"
                  transform={`rotate(${crystal.rotation} ${crystal.x + crystal.width/2} ${crystal.y + crystal.height/2})`}
                  fill={crystal.isHighlight ? "hsl(60, 100%, 99%)" : "hsl(45, 70%, 94%)"}
                  opacity={crystal.opacity}
                />
              ))}

              {/* Surface crystals - top layer irregularity */}
              {surfaceCrystals.map((crystal) => (
                <g key={`surface-${crystal.id}`}>
                  <polygon
                    points={`${crystal.x},${crystal.y} ${crystal.x + crystal.size},${crystal.y - crystal.size * 0.5} ${crystal.x + crystal.size * 1.5},${crystal.y + crystal.size * 0.3} ${crystal.x + crystal.size * 0.5},${crystal.y + crystal.size * 0.5}`}
                    fill="hsl(50, 90%, 97%)"
                    opacity={crystal.opacity}
                  />
                  {/* Crystal highlight facet */}
                  <circle
                    cx={crystal.x + crystal.size * 0.5}
                    cy={crystal.y - crystal.size * 0.2}
                    r={crystal.size * 0.3}
                    fill="white"
                    opacity={crystal.opacity * 0.6}
                  />
                </g>
              ))}

              {/* Sugar sparkle highlights */}
              {clampedFill > 15 && (
                <>
                  <circle cx="28" cy={126 - (clampedFill * 0.6)} r="1.8" fill="white" opacity="0.7" />
                  <circle cx="45" cy={126 - (clampedFill * 0.35)} r="1.2" fill="white" opacity="0.55" />
                  <circle cx="62" cy={126 - (clampedFill * 0.75)} r="1.5" fill="white" opacity="0.6" />
                  <circle cx="72" cy={126 - (clampedFill * 0.45)} r="1" fill="white" opacity="0.5" />
                  <circle cx="35" cy={126 - (clampedFill * 0.25)} r="0.9" fill="white" opacity="0.45" />
                  <circle cx="55" cy={126 - (clampedFill * 0.55)} r="1.3" fill="white" opacity="0.55" />
                </>
              )}
            </g>
          )}

          {/* Thick glass rim - top */}
          <ellipse
            cx="50"
            cy="7"
            rx="36"
            ry="5"
            fill={`url(#rim-gradient-${index})`}
            stroke="hsl(var(--glass-border))"
            strokeWidth="0.5"
            className="opacity-80"
          />
          
          {/* Inner rim edge */}
          <ellipse
            cx="50"
            cy="9"
            rx="30"
            ry="3.5"
            fill="none"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="0.8"
            className="opacity-40"
          />

          {/* Rim reflection highlight */}
          <path
            d="M20 6 Q35 3 50 4 Q65 5 80 6"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-50"
          />

          {/* Primary left shine - long reflection */}
          <path
            d="M20 18 Q18 70 17 120"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-40"
          />
          
          {/* Secondary left shine */}
          <path
            d="M25 22 Q24 50 23 75"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="opacity-30"
          />

          {/* Right side subtle reflection */}
          <path
            d="M82 25 Q83 70 84 115"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-20"
          />

          {/* Glass base - thick bottom */}
          <ellipse
            cx="50"
            cy="134"
            rx="38"
            ry="5"
            fill="hsl(var(--glass-border))"
            className="opacity-25"
          />
          
          {/* Base inner reflection */}
          <ellipse
            cx="50"
            cy="133"
            rx="32"
            ry="3"
            fill="hsl(var(--glass-shine))"
            className="opacity-15"
          />
        </svg>

        {/* Scale label overlay */}
        {isScaleLabel && scaleLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/90 text-primary-foreground px-3 py-1.5 text-sm font-semibold shadow-lg rounded">
              {scaleLabel}
            </div>
          </div>
        )}
      </div>

      {/* Fill percentage label */}
      {!isScaleLabel && (
        <span className="mt-2 text-sm font-medium text-muted-foreground">
          {clampedFill.toFixed(0)}%
        </span>
      )}
    </div>
  );
};