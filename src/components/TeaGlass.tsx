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
  
  // Calculate sugar height - strictly bottom to top
  const sugarHeight = clampedFill * 1.08;
  const sugarTop = 126 - sugarHeight;
  
  // Generate individual sugar crystals with varied shapes - seeded by index for consistency
  const sugarCrystals = useMemo(() => {
    if (clampedFill === 0) return [];
    const seed = index * 1000;
    const crystalCount = Math.floor(clampedFill * 2) + 50;
    return Array.from({ length: Math.min(crystalCount, 150) }, (_, i) => {
      const pseudoRandom = (n: number) => {
        const x = Math.sin(seed + n * 9999) * 10000;
        return x - Math.floor(x);
      };
      return {
        id: i,
        x: 20 + pseudoRandom(i) * 60,
        y: sugarTop + pseudoRandom(i + 100) * sugarHeight,
        width: pseudoRandom(i + 200) * 2 + 0.8,
        height: pseudoRandom(i + 300) * 1.5 + 0.6,
        rotation: pseudoRandom(i + 400) * 45 - 22.5,
        opacity: pseudoRandom(i + 500) * 0.4 + 0.2,
        isHighlight: pseudoRandom(i + 600) > 0.88,
        shade: pseudoRandom(i + 700),
      };
    });
  }, [clampedFill, index, sugarTop, sugarHeight]);

  // Generate surface crystals for uneven top layer
  const surfaceCrystals = useMemo(() => {
    if (clampedFill === 0) return [];
    const seed = index * 2000;
    return Array.from({ length: 20 }, (_, i) => {
      const pseudoRandom = (n: number) => {
        const x = Math.sin(seed + n * 7777) * 10000;
        return x - Math.floor(x);
      };
      return {
        id: i,
        x: 22 + pseudoRandom(i) * 56,
        yOffset: pseudoRandom(i + 50) * 4 - 2,
        size: pseudoRandom(i + 100) * 2 + 1,
        opacity: pseudoRandom(i + 150) * 0.5 + 0.4,
      };
    });
  }, [clampedFill, index]);

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative w-20 h-28 md:w-24 md:h-32">
        <svg 
          viewBox="0 0 100 140" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }}
        >
          <defs>
            {/* Glass body gradient - more transparent */}
            <linearGradient id={`glass-body-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(200, 30%, 95%)" stopOpacity="0.25" />
              <stop offset="15%" stopColor="hsl(200, 20%, 90%)" stopOpacity="0.08" />
              <stop offset="50%" stopColor="hsl(200, 10%, 98%)" stopOpacity="0.03" />
              <stop offset="85%" stopColor="hsl(200, 20%, 90%)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(200, 30%, 95%)" stopOpacity="0.2" />
            </linearGradient>

            {/* Rim gradient with shine */}
            <linearGradient id={`rim-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(200, 40%, 98%)" stopOpacity="0.7" />
              <stop offset="50%" stopColor="hsl(200, 30%, 85%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(200, 20%, 80%)" stopOpacity="0.25" />
            </linearGradient>

            {/* Sugar vertical gradient - darker at bottom, lighter at top */}
            <linearGradient id={`sugar-body-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(35, 45%, 82%)" stopOpacity="1" />
              <stop offset="30%" stopColor="hsl(38, 50%, 86%)" stopOpacity="0.95" />
              <stop offset="60%" stopColor="hsl(42, 55%, 90%)" stopOpacity="0.92" />
              <stop offset="100%" stopColor="hsl(48, 60%, 94%)" stopOpacity="0.88" />
            </linearGradient>

            {/* Sugar inner shadow gradient - for depth near walls */}
            <linearGradient id={`sugar-shadow-left-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(30, 40%, 70%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(40, 50%, 88%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`sugar-shadow-right-${index}`} x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(30, 40%, 70%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(40, 50%, 88%)" stopOpacity="0" />
            </linearGradient>

            {/* Sugar noise texture pattern */}
            <pattern id={`sugar-noise-${index}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="hsl(42, 50%, 91%)" />
              <rect x="0" y="0" width="1.5" height="1" fill="hsl(35, 40%, 85%)" opacity="0.5" />
              <rect x="3" y="2" width="1" height="1.2" fill="hsl(50, 70%, 96%)" opacity="0.6" />
              <rect x="1" y="4" width="1.2" height="0.8" fill="hsl(38, 45%, 87%)" opacity="0.4" />
              <rect x="4" y="5" width="0.8" height="0.6" fill="hsl(55, 80%, 98%)" opacity="0.5" />
              <rect x="2" y="1" width="0.6" height="0.8" fill="hsl(32, 35%, 82%)" opacity="0.3" />
            </pattern>

            {/* Glass interior clip - sugar stays inside */}
            <clipPath id={`interior-${index}`}>
              <path d="M20 16 L17 124 Q17 128 22 128 L78 128 Q83 128 83 124 L80 16 Z" />
            </clipPath>

            {/* Glass overlay clip */}
            <clipPath id={`glass-clip-${index}`}>
              <path d="M14 10 L10 128 Q10 138 22 138 L78 138 Q90 138 90 128 L86 10 Q86 2 78 2 L22 2 Q14 2 14 10" />
            </clipPath>
          </defs>

          {/* === LAYER 1: Sugar fill (behind glass) === */}
          {clampedFill > 0 && !isScaleLabel && (
            <g clipPath={`url(#interior-${index})`}>
              {/* Base sugar fill with vertical gradient */}
              <rect
                x="18"
                y={sugarTop}
                width="64"
                height={sugarHeight + 4}
                fill={`url(#sugar-body-${index})`}
                style={{ transition: 'y 0.6s ease, height 0.6s ease' }}
              />

              {/* Sugar granular texture overlay */}
              <rect
                x="18"
                y={sugarTop}
                width="64"
                height={sugarHeight + 4}
                fill={`url(#sugar-noise-${index})`}
                opacity="0.7"
                style={{ transition: 'y 0.6s ease, height 0.6s ease' }}
              />

              {/* Inner shadow - left wall */}
              <rect
                x="18"
                y={sugarTop}
                width="10"
                height={sugarHeight + 4}
                fill={`url(#sugar-shadow-left-${index})`}
                style={{ transition: 'y 0.6s ease, height 0.6s ease' }}
              />

              {/* Inner shadow - right wall */}
              <rect
                x="72"
                y={sugarTop}
                width="10"
                height={sugarHeight + 4}
                fill={`url(#sugar-shadow-right-${index})`}
                style={{ transition: 'y 0.6s ease, height 0.6s ease' }}
              />

              {/* Individual sugar crystals throughout */}
              {sugarCrystals.map((crystal) => (
                <rect
                  key={crystal.id}
                  x={crystal.x}
                  y={crystal.y}
                  width={crystal.width}
                  height={crystal.height}
                  rx="0.2"
                  transform={`rotate(${crystal.rotation} ${crystal.x + crystal.width/2} ${crystal.y + crystal.height/2})`}
                  fill={crystal.isHighlight 
                    ? "hsl(55, 100%, 98%)" 
                    : crystal.shade > 0.5 
                      ? "hsl(45, 60%, 93%)" 
                      : "hsl(38, 45%, 87%)"}
                  opacity={crystal.opacity}
                />
              ))}

              {/* Surface crystals - uneven top edge */}
              {surfaceCrystals.map((crystal) => (
                <g key={`surface-${crystal.id}`}>
                  <polygon
                    points={`
                      ${crystal.x},${sugarTop + crystal.yOffset} 
                      ${crystal.x + crystal.size * 0.8},${sugarTop + crystal.yOffset - crystal.size * 0.6} 
                      ${crystal.x + crystal.size * 1.4},${sugarTop + crystal.yOffset - crystal.size * 0.3}
                      ${crystal.x + crystal.size * 1.6},${sugarTop + crystal.yOffset + crystal.size * 0.2}
                      ${crystal.x + crystal.size * 0.4},${sugarTop + crystal.yOffset + crystal.size * 0.4}
                    `}
                    fill="hsl(48, 65%, 95%)"
                    opacity={crystal.opacity}
                  />
                  {/* Crystal facet highlight */}
                  <circle
                    cx={crystal.x + crystal.size * 0.6}
                    cy={sugarTop + crystal.yOffset - crystal.size * 0.3}
                    r={crystal.size * 0.25}
                    fill="white"
                    opacity={crystal.opacity * 0.7}
                  />
                </g>
              ))}

              {/* Subtle sparkle highlights */}
              {clampedFill > 20 && (
                <>
                  <circle cx="30" cy={sugarTop + sugarHeight * 0.3} r="1.2" fill="white" opacity="0.6" />
                  <circle cx="50" cy={sugarTop + sugarHeight * 0.5} r="0.9" fill="white" opacity="0.5" />
                  <circle cx="68" cy={sugarTop + sugarHeight * 0.25} r="1" fill="white" opacity="0.55" />
                  <circle cx="40" cy={sugarTop + sugarHeight * 0.7} r="0.7" fill="white" opacity="0.45" />
                  <circle cx="58" cy={sugarTop + sugarHeight * 0.6} r="0.8" fill="white" opacity="0.5" />
                </>
              )}
            </g>
          )}

          {/* === LAYER 2: Glass body (on top, transparent) === */}
          <g>
            {/* Glass outer body */}
            <path
              d="M14 10 L10 128 Q10 138 22 138 L78 138 Q90 138 90 128 L86 10 Q86 2 78 2 L22 2 Q14 2 14 10"
              fill={`url(#glass-body-${index})`}
              stroke="hsl(200, 25%, 80%)"
              strokeWidth="0.6"
            />

            {/* Inner glass wall edge */}
            <path
              d="M18 14 L15 126 Q15 132 22 132 L78 132 Q85 132 85 126 L82 14 Q82 8 78 8 L22 8 Q18 8 18 14"
              fill="none"
              stroke="hsl(200, 30%, 88%)"
              strokeWidth="0.4"
              opacity="0.5"
            />

            {/* Vertical ribbed flutes */}
            {Array.from({ length: 12 }, (_, i) => {
              const x = 18 + i * 5.5;
              return (
                <g key={`flute-${i}`}>
                  <path
                    d={`M${x} 12 Q${x - 0.8} 72 ${x - 0.4} 130`}
                    fill="none"
                    stroke="hsl(200, 20%, 75%)"
                    strokeWidth="0.8"
                    opacity="0.15"
                  />
                  <path
                    d={`M${x + 1.8} 14 Q${x + 1.5} 72 ${x + 1.6} 128`}
                    fill="none"
                    stroke="hsl(200, 50%, 98%)"
                    strokeWidth="0.5"
                    opacity="0.25"
                  />
                </g>
              );
            })}

            {/* Glass rim - top */}
            <ellipse
              cx="50"
              cy="5"
              rx="36"
              ry="5"
              fill={`url(#rim-gradient-${index})`}
              stroke="hsl(200, 30%, 82%)"
              strokeWidth="0.5"
            />
            
            {/* Inner rim highlight */}
            <ellipse
              cx="50"
              cy="7"
              rx="30"
              ry="3.5"
              fill="none"
              stroke="hsl(200, 60%, 98%)"
              strokeWidth="0.6"
              opacity="0.5"
            />

            {/* Rim top shine */}
            <path
              d="M22 4 Q36 1 50 2 Q64 3 78 4"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Primary left edge reflection */}
            <path
              d="M18 16 Q16 72 15 125"
              stroke="hsl(200, 60%, 98%)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            
            {/* Secondary left shine */}
            <path
              d="M23 20 Q22 55 21 85"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Right edge subtle reflection */}
            <path
              d="M84 22 Q85 72 86 120"
              stroke="hsl(200, 50%, 96%)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.25"
            />

            {/* Glass base */}
            <ellipse
              cx="50"
              cy="136"
              rx="38"
              ry="4"
              fill="hsl(200, 20%, 80%)"
              opacity="0.2"
            />
            
            {/* Base inner reflection */}
            <ellipse
              cx="50"
              cy="135"
              rx="30"
              ry="2.5"
              fill="hsl(200, 40%, 95%)"
              opacity="0.2"
            />
          </g>
        </svg>

        {/* Scale label overlay - subtle styling */}
        {isScaleLabel && scaleLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-muted/80 text-muted-foreground px-2.5 py-1 text-xs font-medium shadow-sm rounded border border-border/50">
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