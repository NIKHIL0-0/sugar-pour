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
          style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }}
        >
          <defs>
            {/* Glass gradient for realistic transparency */}
            <linearGradient id={`glass-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.3" />
              <stop offset="15%" stopColor="hsl(var(--glass-border))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--glass-border))" stopOpacity="0.05" />
              <stop offset="85%" stopColor="hsl(var(--glass-border))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--glass-shine))" stopOpacity="0.2" />
            </linearGradient>
            
            {/* Sugar crystal gradient */}
            <linearGradient id={`sugar-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--sugar-granule))" stopOpacity="1" />
              <stop offset="30%" stopColor="hsl(var(--sugar-fill))" stopOpacity="0.95" />
              <stop offset="100%" stopColor="hsl(var(--sugar-fill))" stopOpacity="0.9" />
            </linearGradient>
            
            {/* Clip path for glass interior */}
            <clipPath id={`glass-clip-${index}`}>
              <path d="M18 12 L15 125 Q15 130 20 130 L80 130 Q85 130 85 125 L82 12 Q82 8 78 8 L22 8 Q18 8 18 12" />
            </clipPath>
          </defs>
          
          {/* Glass body with fluted ridges */}
          <g>
            {/* Outer glass shape - slightly tapered like real chai glass */}
            <path
              d="M16 8 L13 128 Q13 134 20 134 L80 134 Q87 134 87 128 L84 8 Q84 4 78 4 L22 4 Q16 4 16 8"
              fill={`url(#glass-gradient-${index})`}
              stroke="hsl(var(--glass-border))"
              strokeWidth="1.5"
              className="opacity-70"
            />
            
            {/* Vertical fluted ridges - characteristic of Indian chai glass */}
            {[20, 28, 36, 44, 52, 60, 68, 76].map((x, i) => (
              <path
                key={i}
                d={`M${x + 2} 10 L${x} 128`}
                stroke="hsl(var(--glass-border))"
                strokeWidth="0.8"
                className="opacity-20"
              />
            ))}
            
            {/* Inner ridge shadows for depth */}
            {[24, 40, 56, 72].map((x, i) => (
              <path
                key={`shadow-${i}`}
                d={`M${x} 12 L${x - 1} 126`}
                stroke="hsl(var(--glass-shine))"
                strokeWidth="1.2"
                className="opacity-15"
              />
            ))}
          </g>
          
          {/* Sugar fill with crystal texture */}
          {clampedFill > 0 && !isScaleLabel && (
            <g className="animate-sugar-fill origin-bottom">
              {/* Main sugar body */}
              <rect
                x="15"
                y={130 - (clampedFill * 1.22)}
                width="70"
                height={clampedFill * 1.22}
                fill={`url(#sugar-gradient-${index})`}
                clipPath={`url(#glass-clip-${index})`}
                className="transition-all duration-500 ease-out"
              />
              
              {/* Sugar surface - slightly uneven top */}
              <ellipse
                cx="50"
                cy={130 - (clampedFill * 1.22) + 2}
                rx="32"
                ry="5"
                fill="hsl(var(--sugar-granule))"
                clipPath={`url(#glass-clip-${index})`}
                className="transition-all duration-500 ease-out opacity-80"
              />
              
              {/* Crystal sparkle highlights */}
              {clampedFill > 10 && (
                <>
                  <circle cx="30" cy={130 - (clampedFill * 0.6)} r="1.5" fill="white" className="opacity-60" />
                  <circle cx="55" cy={130 - (clampedFill * 0.4)} r="1" fill="white" className="opacity-50" />
                  <circle cx="70" cy={130 - (clampedFill * 0.7)} r="1.2" fill="white" className="opacity-55" />
                  <circle cx="40" cy={130 - (clampedFill * 0.3)} r="0.8" fill="white" className="opacity-45" />
                  <circle cx="62" cy={130 - (clampedFill * 0.5)} r="1.3" fill="white" className="opacity-50" />
                </>
              )}
              
              {/* Sugar granule texture lines */}
              {clampedFill > 20 && (
                <>
                  <line x1="25" y1={130 - (clampedFill * 0.5)} x2="35" y2={130 - (clampedFill * 0.45)} stroke="hsl(var(--sugar-granule))" strokeWidth="0.5" className="opacity-30" />
                  <line x1="50" y1={130 - (clampedFill * 0.6)} x2="65" y2={130 - (clampedFill * 0.55)} stroke="hsl(var(--sugar-granule))" strokeWidth="0.5" className="opacity-25" />
                </>
              )}
            </g>
          )}
          
          {/* Glass rim highlight */}
          <ellipse
            cx="50"
            cy="6"
            rx="30"
            ry="3"
            fill="none"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="1"
            className="opacity-40"
          />
          
          {/* Primary shine effect - left side */}
          <path
            d="M22 15 L19 115"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-35"
          />
          
          {/* Secondary shine - shorter highlight */}
          <path
            d="M27 20 L25 60"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-25"
          />
          
          {/* Right side subtle reflection */}
          <path
            d="M78 25 L80 100"
            stroke="hsl(var(--glass-shine))"
            strokeWidth="1"
            strokeLinecap="round"
            className="opacity-15"
          />
          
          {/* Glass base thickness */}
          <ellipse
            cx="50"
            cy="132"
            rx="33"
            ry="4"
            fill="hsl(var(--glass-border))"
            className="opacity-20"
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
