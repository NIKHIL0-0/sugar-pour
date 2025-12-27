import { Droplets, Scale, GlassWater, Calculator } from "lucide-react";

interface StatsPanelProps {
  sugarGrams: number;
  sugarMl: number;
  totalGlasses: number;
  scale: number;
}

export const StatsPanel = ({ sugarGrams, sugarMl, totalGlasses, scale }: StatsPanelProps) => {
  const stats = [
    {
      icon: Scale,
      label: "Sugar",
      value: sugarGrams.toLocaleString(),
      unit: "grams",
    },
    {
      icon: Droplets,
      label: "Volume",
      value: sugarMl.toLocaleString(undefined, { maximumFractionDigits: 1 }),
      unit: "ml",
    },
    {
      icon: GlassWater,
      label: "Tea Glasses",
      value: totalGlasses.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      unit: "glasses",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-card border border-border p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {scale > 1 && (
        <div className="md:col-span-3 bg-accent/20 border border-accent p-4 flex items-center gap-3">
          <Calculator className="w-5 h-5 text-accent-foreground" />
          <p className="text-sm text-accent-foreground">
            <span className="font-semibold">Scale Mode Active:</span> Each displayed glass represents{" "}
            <span className="font-bold">{scale.toLocaleString()}</span> actual glasses
          </p>
        </div>
      )}
    </div>
  );
};
