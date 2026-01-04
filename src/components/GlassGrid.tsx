import { TeaGlass } from "./TeaGlass";

interface GlassGridProps {
  totalGlasses: number;
}

const GLASS_CAPACITY_ML = 100;
const SUGAR_DENSITY = 0.8; // 1g sugar = 0.8ml
const FULL_GLASS_GRAMS = GLASS_CAPACITY_ML / SUGAR_DENSITY; // ~125g

export const GlassGrid = ({ totalGlasses }: GlassGridProps) => {
  // Calculate scaling and display logic
  const calculateDisplay = () => {
    if (totalGlasses <= 0) {
      return { glasses: [], scale: 1, scaleLabel: null };
    }

    if (totalGlasses <= 10) {
      // Case 1: Show actual glasses
      const fullGlasses = Math.floor(totalGlasses);
      const partialFill = (totalGlasses - fullGlasses) * 100;
      
      const glasses = [];
      for (let i = 0; i < fullGlasses; i++) {
        glasses.push({ fill: 100, isScaleLabel: false });
      }
      if (partialFill > 0) {
        glasses.push({ fill: partialFill, isScaleLabel: false });
      }
      
      return { glasses, scale: 1, scaleLabel: null };
    }

    // Case 2: Large-scale mode (> 10 glasses)
    const n = Math.floor(Math.log10(totalGlasses)) - 1;
    const scale = Math.pow(10, Math.max(0, n));
    const scaledGlasses = totalGlasses / scale;
    
    const fullGlasses = Math.floor(scaledGlasses);
    const partialFill = (scaledGlasses - fullGlasses) * 100;
    
    const glasses = [];
    const maxVisibleGlasses = Math.min(fullGlasses, 8);
    
    for (let i = 0; i < maxVisibleGlasses; i++) {
      glasses.push({ fill: 100, isScaleLabel: false });
    }
    
    if (partialFill > 0 && glasses.length < 9) {
      glasses.push({ fill: partialFill, isScaleLabel: false });
    }
    
    // Add scale label glass
    if (scale > 1) {
      glasses.push({ 
        fill: 0, 
        isScaleLabel: true, 
        scaleLabel: `×10${formatExponent(n)}` 
      });
    }
    
    return { glasses, scale, scaleLabel: n > 0 ? `×10${formatExponent(n)}` : null };
  };

  const formatExponent = (n: number): string => {
    const superscripts: { [key: string]: string } = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };
    return n.toString().split('').map(d => superscripts[d] || d).join('');
  };

  const { glasses, scale, scaleLabel } = calculateDisplay();

  if (glasses.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-muted-foreground text-lg">Enter sugar amount to visualize</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Glasses display */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {glasses.map((glass, index) => (
          <TeaGlass
            key={index}
            fillPercentage={glass.fill}
            isScaleLabel={glass.isScaleLabel}
            scaleLabel={glass.isScaleLabel ? glass.scaleLabel : undefined}
            index={index}
          />
        ))}
      </div>

      {/* Scale indicator */}
      {scaleLabel && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 border border-border">
            <span className="text-sm text-muted-foreground">Each glass represents</span>
            <span className="font-bold text-primary">{scale.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">actual glasses</span>
          </div>
        </div>
      )}
    </div>
  );
};

export { GLASS_CAPACITY_ML, SUGAR_DENSITY, FULL_GLASS_GRAMS };
