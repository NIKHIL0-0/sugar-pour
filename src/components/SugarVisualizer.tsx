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

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-card border border-border p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground font-serif mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mb-6">
              Sugar is a common part of the Indian diet, especially through tea, sweets, and packaged foods. Many people have questions about how much sugar is safe and how it affects health.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is sugar bad for health?</h3>
                <p className="text-sm text-muted-foreground">
                  Sugar is not harmful when consumed in small amounts. Problems usually occur when daily intake goes beyond recommended limits, which often happens due to frequent tea, sweets, and sugary drinks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How much sugar per day is considered safe in India?</h3>
                <p className="text-sm text-muted-foreground">
                  Health experts generally suggest limiting added sugar to about 25 grams per day for adults. In practice, many people exceed this amount without realizing it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is jaggery healthier than white sugar?</h3>
                <p className="text-sm text-muted-foreground">
                  Jaggery is less refined and contains small amounts of minerals, but it is still a form of sugar. In terms of calories and blood sugar impact, both act similarly when consumed in excess.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Does sugar cause weight gain?</h3>
                <p className="text-sm text-muted-foreground">
                  Sugar can contribute to weight gain if it increases overall calorie intake. Sugary drinks are particularly problematic because they are easy to consume in large quantities without feeling full.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Are animal bones used to make sugar in India?</h3>
                <p className="text-sm text-muted-foreground">
                  In India, sugar is mainly produced from sugarcane and refined using chemical and carbon-based filtration methods. The use of animal bone char is extremely rare and is not a common practice in Indian sugar production.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Why do people underestimate how much sugar they consume?</h3>
                <p className="text-sm text-muted-foreground">
                  Sugar quantities are usually shown in grams, which are difficult to visualize. Because of this, people often consume more sugar than they think.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 pt-4 border-t border-border">
              To make sugar quantities easier to understand, visualizing sugar in familiar forms—such as Indian tea glasses—helps people better grasp their actual intake.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Visualize your sugar intake with familiar Indian tea glasses ☕
~Built by nick · <a href="https://github.com/NIKHIL0-0/sugar-pour" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a></p>
        </div>
      </footer>
    </div>;
};