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
  
  const sugarGranules = useMemo(() => {
    if (clampedFill === 0) return [];
    const granuleCount = Math.floor(clampedFill / 5);
    return Array.from({ length: Math.min(granuleCount, 20) }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      bottom: Math.random() * (clampedFill * 0.8),
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.3,
    }));
  }, [clampedFill]);

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glass Container */}
      <div className="relative w-20 h-28 md:w-24 md:h-32">
        {/* Glass Shape - SVG */}
        <svg 
          viewBox="0 0 100 140" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Glass outline */}
          <path
            d="M15 5 L12 130 Q12 135 17 135 L83 135 Q88 135 88 130 L85 5 Q85 2 80 2 L20 2 Q15 2 15 5"
            fill="none"
            stroke="hsl(var(--glass-border))"
            strokeWidth="2"
            className="opacity-60"
          />
          
          {/* Sugar fill */}
          {clampedFill > 0 && !isScaleLabel && (
            <g className="animate-sugar-fill origin-bottom">
              <clipPath id={`glass-clip-${index}`}>
                <path d="M14 8 L12 128 Q12 133 17 133 L83 133 Q88 133 88 128 L86 8 Q86 6 82 6 L18 6 Q14 6 14 8" />
              </clipPath>
              <rect
                x="12"
                y={133 - (clampedFill * 1.27)}
                width="76"
                height={clampedFill * 1.27}
                fill="hsl(var(--sugar-fill))"
                clipPath={`url(#glass-clip-${index})`}
                className="transition-all duration-500 ease-out"
              />
              {/* Sugar surface texture */}
              <ellipse
                cx="50"
                cy={133 - (clampedFill * 1.27) + 3}
                rx="35"
                ry="4"
                fill="hsl(var(--sugar-granule))"
                clipPath={`url(#glass-clip-${index})`}
                className="transition-all duration-500 ease-out"
              />
            </g>
          )}
          
          {/* Glass shine effect */}
          <path
            d="M20 10 L18 120"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-40"
          />
          <path
            d="M25 15 L23 50"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-30"
          />
        </svg>

        {/* Sugar granules particles */}
        {!isScaleLabel && sugarGranules.map((granule) => (
          <div
            key={granule.id}
            className="absolute rounded-full bg-sugar-granule animate-sugar-pour"
            style={{
              left: `${granule.left}%`,
              bottom: `${granule.bottom}%`,
              width: `${granule.size}px`,
              height: `${granule.size}px`,
              opacity: granule.opacity,
              animationDelay: `${granule.id * 50}ms`,
            }}
          />
        ))}

        {/* Scale label overlay */}
        {isScaleLabel && scaleLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary/90 text-primary-foreground px-3 py-1.5 text-sm font-semibold shadow-lg">
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
