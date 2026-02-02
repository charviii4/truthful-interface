import { useState } from "react";
import { motion } from "framer-motion";
import { Scan, Info, Sparkles } from "lucide-react";
import { MockCheckout } from "@/components/demo/MockCheckout";
import { AnalysisPanel } from "@/components/demo/AnalysisPanel";

export default function Demo() {
  const [highlightedPattern, setHighlightedPattern] = useState<string | null>(null);

  const handlePatternInteract = (patternId: string) => {
    setHighlightedPattern(patternId);
  };

  const handlePatternHover = (patternId: string | null) => {
    setHighlightedPattern(patternId);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-light border border-success/30 text-sm font-medium text-success mb-4">
            <Scan className="w-4 h-4" />
            Live Analysis Active
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Interactive Demo
          </h1>
          <p className="text-muted-foreground text-lg">
            Interact with the simulated checkout below. Click on elements to see 
            how System Truth detects and explains dark patterns in real time.
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-info-light border border-info/20 rounded-lg px-4 py-3 flex items-start gap-3">
            <Info className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <strong className="text-foreground">How to use:</strong>{" "}
              <span className="text-foreground/80">
                Click on highlighted elements in the checkout to see their analysis. 
                Toggle "Learn" mode in the Analysis Panel for detailed explanations.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Demo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {/* Mock Checkout */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-danger animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Simulated Website
              </span>
            </div>
            <MockCheckout
              highlightedPattern={highlightedPattern}
              onPatternInteract={handlePatternInteract}
            />
          </div>

          {/* Analysis Panel */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">
                System Truth Analysis
              </span>
            </div>
            <AnalysisPanel
              onPatternHover={handlePatternHover}
              highlightedPattern={highlightedPattern}
            />
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold mb-4">Trust Score Legend</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success" />
                <span className="text-sm">70-100: Trustworthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning" />
                <span className="text-sm">40-69: Concerning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-danger" />
                <span className="text-sm">0-39: Manipulative</span>
              </div>
            </div>
            
            <div className="border-t border-border mt-4 pt-4">
              <h4 className="text-sm font-semibold mb-2">Categories Analyzed</h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Language:</strong> Urgency claims, 
                  guilt-tripping, confusing wording
                </div>
                <div>
                  <strong className="text-foreground">Visual:</strong> Hidden info, 
                  misleading layouts, button hierarchy
                </div>
                <div>
                  <strong className="text-foreground">Choice:</strong> Pre-selections, 
                  asymmetric options, difficult opt-outs
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
