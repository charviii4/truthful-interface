import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrustScore } from "@/components/TrustScore";
import { PatternCard, DarkPattern } from "@/components/PatternCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, List, BarChart3 } from "lucide-react";

const detectedPatterns: DarkPattern[] = [
  {
    id: "urgency",
    name: "Fake Urgency",
    category: "language",
    severity: "high",
    description: "Creates artificial time pressure with unverified scarcity claims.",
    element: "HURRY! Only 2 left in stock!",
    learnMore: "This is a classic pressure tactic. Real inventory data is rarely shared, and the 'viewing' count may be fabricated to create FOMO (Fear of Missing Out).",
  },
  {
    id: "preselected",
    name: "Pre-selected Consent",
    category: "choice",
    severity: "high",
    description: "Consent checkboxes are pre-checked, exploiting user inertia.",
    element: "Newsletter and data sharing checkboxes",
    learnMore: "GDPR and many consumer protection laws require explicit consent. Pre-checked boxes rely on users not noticing or being too lazy to uncheck them.",
  },
  {
    id: "confirmshaming",
    name: "Confirmshaming",
    category: "language",
    severity: "medium",
    description: "Uses guilt-inducing language to discourage declining.",
    element: "No thanks, I don't want to save money",
    learnMore: "This manipulates emotions rather than informing decisions. Ethical design offers neutral decline options like 'No, thanks' or 'Maybe later'.",
  },
  {
    id: "hidden-costs",
    name: "Hidden Costs",
    category: "visual",
    severity: "high",
    description: "Additional fees and subscription terms buried in small print.",
    element: "Price excludes $4.99 handling fee...",
    learnMore: "Drip pricing hides the true cost until checkout. This practice is illegal in many jurisdictions and is being increasingly regulated globally.",
  },
];

interface AnalysisPanelProps {
  onPatternHover: (id: string | null) => void;
  highlightedPattern: string | null;
}

export function AnalysisPanel({ onPatternHover, highlightedPattern }: AnalysisPanelProps) {
  const [isEducationMode, setIsEducationMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"patterns" | "score">("patterns");

  const trustScore = 28;
  const breakdown = {
    language: 25,
    visual: 35,
    choice: 22,
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold flex items-center gap-2">
            <Eye className="w-5 h-5 text-warning" />
            Analysis Panel
          </h3>
          
          {/* Education Mode Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="education-mode"
              checked={isEducationMode}
              onCheckedChange={setIsEducationMode}
            />
            <Label 
              htmlFor="education-mode" 
              className="text-sm flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              Learn
            </Label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab("patterns")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === "patterns" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
            Patterns ({detectedPatterns.length})
          </button>
          <button
            onClick={() => setActiveTab("score")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              activeTab === "score" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart3 className="w-4 h-4" />
            Trust Score
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === "patterns" ? (
            <motion.div
              key="patterns"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {detectedPatterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  isEducationMode={isEducationMode}
                  onHover={onPatternHover}
                  isHighlighted={highlightedPattern === pattern.id}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center py-6"
            >
              <TrustScore 
                score={trustScore} 
                showBreakdown 
                breakdown={breakdown}
                size="lg"
              />
              
              {isEducationMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 p-4 bg-info-light rounded-lg border border-info/20"
                >
                  <h4 className="font-display font-semibold text-sm mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-info" />
                    How We Calculate This
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Our Trust Score analyzes three dimensions: <strong>Language</strong> (manipulative 
                    wording, urgency claims), <strong>Visual Design</strong> (hidden information, 
                    misleading layouts), and <strong>Choice Fairness</strong> (pre-selections, 
                    asymmetric options). Each pattern detected reduces the score based on severity.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted/30 text-center">
        <p className="text-xs text-muted-foreground">
          Click on elements in the demo to see their analysis
        </p>
      </div>
    </div>
  );
}
