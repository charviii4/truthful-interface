import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, XCircle, HelpCircle } from "lucide-react";

export interface DarkPattern {
  id: string;
  name: string;
  category: "language" | "visual" | "choice";
  severity: "low" | "medium" | "high";
  description: string;
  element: string;
  learnMore?: string;
}

interface PatternCardProps {
  pattern: DarkPattern;
  isEducationMode?: boolean;
  onHover?: (id: string | null) => void;
  isHighlighted?: boolean;
}

export function PatternCard({ 
  pattern, 
  isEducationMode = false,
  onHover,
  isHighlighted = false 
}: PatternCardProps) {
  const severityConfig = {
    low: {
      icon: Info,
      bg: "bg-info-light",
      border: "border-info/30",
      text: "text-info",
      label: "Low Impact",
    },
    medium: {
      icon: AlertTriangle,
      bg: "bg-warning-light",
      border: "border-warning/30",
      text: "text-warning",
      label: "Medium Impact",
    },
    high: {
      icon: XCircle,
      bg: "bg-danger-light",
      border: "border-danger/30",
      text: "text-danger",
      label: "High Impact",
    },
  };

  const categoryLabels = {
    language: "Language Manipulation",
    visual: "Visual Coercion",
    choice: "Choice Asymmetry",
  };

  const config = severityConfig[pattern.severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onMouseEnter={() => onHover?.(pattern.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200",
        config.bg,
        config.border,
        isHighlighted && "ring-2 ring-offset-2 ring-offset-background",
        isHighlighted && pattern.severity === "high" && "ring-danger",
        isHighlighted && pattern.severity === "medium" && "ring-warning",
        isHighlighted && pattern.severity === "low" && "ring-info"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", config.text)} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-display font-semibold text-sm truncate">
              {pattern.name}
            </h4>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("text-xs font-medium", config.text)}>
              {config.label}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {categoryLabels[pattern.category]}
            </span>
          </div>
        </div>
      </div>

      {/* Element Reference */}
      <div className="mb-2 px-2 py-1 bg-background/50 rounded text-xs font-mono text-muted-foreground truncate">
        "{pattern.element}"
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/80 leading-relaxed">
        {pattern.description}
      </p>

      {/* Education Mode Extra */}
      {isEducationMode && pattern.learnMore && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pt-3 border-t border-border/50"
        >
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {pattern.learnMore}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
