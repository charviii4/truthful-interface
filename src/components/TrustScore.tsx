import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface TrustScoreProps {
  score: number;
  showBreakdown?: boolean;
  breakdown?: {
    language: number;
    visual: number;
    choice: number;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TrustScore({ 
  score, 
  showBreakdown = false, 
  breakdown,
  size = "md",
  className 
}: TrustScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 70) return "text-success";
    if (value >= 40) return "text-warning";
    return "text-danger";
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return "Trustworthy";
    if (value >= 60) return "Minor Issues";
    if (value >= 40) return "Concerning";
    if (value >= 20) return "Manipulative";
    return "Deceptive";
  };

  const getScoreIcon = (value: number) => {
    if (value >= 70) return <CheckCircle className="w-5 h-5 text-success" />;
    if (value >= 40) return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <XCircle className="w-5 h-5 text-danger" />;
  };

  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Main Score Circle */}
      <div className="relative">
        <svg className={cn("transform -rotate-90", {
          "w-24 h-24": size === "sm",
          "w-32 h-32": size === "md",
          "w-44 h-44": size === "lg",
        })}>
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={getScoreColor(score)}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray: "283",
              strokeDashoffset: "0",
            }}
          />
        </svg>
        
        {/* Score Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={cn("font-display font-bold", sizeClasses[size], getScoreColor(score))}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            / 100
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-2">
        {getScoreIcon(score)}
        <span className={cn("font-display font-semibold", getScoreColor(score))}>
          {getScoreLabel(score)}
        </span>
      </div>

      {/* Breakdown */}
      {showBreakdown && breakdown && (
        <motion.div 
          className="w-full max-w-xs space-y-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ScoreBar label="Language" value={breakdown.language} />
          <ScoreBar label="Visual Design" value={breakdown.visual} />
          <ScoreBar label="Choice Fairness" value={breakdown.choice} />
        </motion.div>
      )}
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const getBarColor = (v: number) => {
    if (v >= 70) return "bg-success";
    if (v >= 40) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/100</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", getBarColor(value))}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}
