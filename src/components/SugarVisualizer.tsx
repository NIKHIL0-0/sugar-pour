import { useState, useMemo } from "react";
import { SugarInput } from "./SugarInput";
import { GlassGrid, GLASS_CAPACITY_ML, SUGAR_DENSITY } from "./GlassGrid";
import { StatsPanel } from "./StatsPanel";
import { GlassWater, Info } from "lucide-react";
export const SugarVisualizer = () => {
  const [sugarGrams, setSugarGrams] = useState<number>(0);
  const calculations = useMemo(() => {
    const sugarMl = sugarGrams * SUGAR_DENSITY;
    const totalGlasses = sugarMl / GLASS_CAPACITY_ML;
    let scale = 1;
    if (totalGlasses > 10) {
      const n = Math.floor(Math.log10(totalGlasses)) - 1;
      scale = Math.pow(10, Math.max(0, n));
    }
    return {
      sugarMl,
      totalGlasses,
      scale
    };
  }, [sugarGrams]);
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10">
              <GlassWater className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground font-serif">
                Sugar Visualization
              </h1>
              <p className="text-sm text-muted-foreground">
                Using Scalable Indian Tea Glasses (125ml)
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-10 space-y-8 md:space-y-12">
        {/* Input Section */}
        <section className="max-w-xl mx-auto">
          <SugarInput value={sugarGrams} onChange={setSugarGrams} />
        </section>

        {/* Stats Panel */}
        {sugarGrams > 0 && <section className="max-w-4xl mx-auto animate-sugar-pour">
            <StatsPanel sugarGrams={sugarGrams} sugarMl={calculations.sugarMl} totalGlasses={calculations.totalGlasses} scale={calculations.scale} />
          </section>}

        {/* Glass Visualization */}
        <section className="max-w-5xl mx-auto">
          <div className="bg-card border border-border p-6 md:p-10 shadow-sm">
            <GlassGrid totalGlasses={calculations.totalGlasses} />
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-muted/30 border border-border p-4 md:p-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Standard Indian Tea Glass:</span>{" "}
                  125ml capacity, 8.6cm height, 6.5cm diameter
                </p>
                <p>
                  <span className="font-semibold text-foreground">Sugar Density:</span>{" "}
                  1 gram of sugar ≈ 0.8ml volume
                </p>
                <p>
                  <span className="font-semibold text-foreground">Full Glass:</span>{" "}
                  ≈ 156 grams of sugar to fill completely
                </p>
                <p className="pt-2 border-t border-border mt-2">
                  For large quantities (&gt;10 glasses), the visualization uses power-of-10 scaling 
                  to keep the display manageable while maintaining intuition.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Visualize your sugar intake with familiar Indian tea glasses ☕
~Built by nick · GitHub</p>
        </div>
      </footer>
    </div>;
};