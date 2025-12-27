import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SugarInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const SugarInput = ({ value, onChange }: SugarInputProps) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && numVal >= 0) {
      onChange(numVal);
    } else if (val === "" || val === "0") {
      onChange(0);
    }
  };

  const presets = [
    { label: "1 tsp", grams: 4 },
    { label: "1 tbsp", grams: 12 },
    { label: "1 cup tea", grams: 8 },
    { label: "1 soda can", grams: 39 },
    { label: "Daily limit", grams: 25 },
    { label: "1 kg", grams: 1000 },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sugar-input" className="text-base font-medium">
          Enter Sugar Amount
        </Label>
        <div className="relative">
          <Input
            id="sugar-input"
            type="number"
            min="0"
            step="any"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter grams of sugar"
            className="text-lg h-14 pr-16 font-mono"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            grams
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                onChange(preset.grams);
                setInputValue(preset.grams.toString());
              }}
              className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
            >
              {preset.label} ({preset.grams}g)
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
