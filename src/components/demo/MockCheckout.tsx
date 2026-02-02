import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShoppingCart, Check, Clock, Users, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MockCheckoutProps {
  highlightedPattern: string | null;
  onPatternInteract: (patternId: string) => void;
}

export function MockCheckout({ highlightedPattern, onPatternInteract }: MockCheckoutProps) {
  const [email, setEmail] = useState("");
  const [newsletterChecked, setNewsletterChecked] = useState(true);
  const [shareDataChecked, setShareDataChecked] = useState(true);

  const isHighlighted = (id: string) => highlightedPattern === id;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-primary px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-foreground">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-display font-semibold">QuickBuy Pro</span>
        </div>
        <span className="text-xs text-primary-foreground/70">Demo Checkout</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Urgency Banner - Dark Pattern */}
        <motion.div
          onClick={() => onPatternInteract("urgency")}
          className={cn(
            "relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all",
            "bg-danger-light border border-danger/20",
            isHighlighted("urgency") && "pattern-highlight"
          )}
        >
          <Clock className="w-5 h-5 text-danger animate-pulse" />
          <div>
            <p className="text-sm font-semibold text-danger">⚡ HURRY! Only 2 left in stock!</p>
            <p className="text-xs text-danger/70">15 people are viewing this right now</p>
          </div>
          <Users className="w-4 h-4 text-danger/50 ml-auto" />
        </motion.div>

        {/* Product */}
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
            <Zap className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold">Premium Widget Pro</h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">(4,829 reviews)</span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold">$49.99</span>
              <span className="text-sm text-muted-foreground line-through">$99.99</span>
              <span className="text-xs text-success font-medium">50% OFF</span>
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Pre-checked Consent - Dark Pattern */}
        <motion.div
          onClick={() => onPatternInteract("preselected")}
          className={cn(
            "space-y-3 p-4 rounded-lg border transition-all cursor-pointer",
            isHighlighted("preselected") && "pattern-highlight",
            "bg-background"
          )}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              id="newsletter"
              checked={newsletterChecked}
              onCheckedChange={(checked) => setNewsletterChecked(checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">
              Yes, I want to receive promotional emails, special offers, and marketing 
              communications from QuickBuy and our partners.
            </Label>
          </div>
          
          <div className="flex items-start gap-3">
            <Checkbox
              id="share-data"
              checked={shareDataChecked}
              onCheckedChange={(checked) => setShareDataChecked(checked as boolean)}
            />
            <Label htmlFor="share-data" className="text-sm leading-relaxed cursor-pointer">
              I agree to share my personal data with third-party partners for 
              personalized advertising purposes.
            </Label>
          </div>
        </motion.div>

        {/* Confirmshaming Button - Dark Pattern */}
        <motion.div
          onClick={() => onPatternInteract("confirmshaming")}
          className={cn(
            "space-y-2 transition-all",
            isHighlighted("confirmshaming") && "pattern-highlight rounded-lg"
          )}
        >
          <Button className="w-full" size="lg">
            <Check className="w-4 h-4 mr-2" />
            Complete Purchase - $49.99
          </Button>
          <button className="w-full text-xs text-muted-foreground hover:text-foreground py-2 transition-colors">
            No thanks, I don't want to save money
          </button>
        </motion.div>

        {/* Hidden Costs Notice - Dark Pattern */}
        <motion.div
          onClick={() => onPatternInteract("hidden-costs")}
          className={cn(
            "text-xs text-muted-foreground border-t border-border pt-4 cursor-pointer transition-all",
            isHighlighted("hidden-costs") && "pattern-highlight rounded-lg p-2"
          )}
        >
          <p>
            * Price shown excludes $4.99 handling fee, $2.99 service charge, and applicable taxes. 
            By proceeding, you agree to our{" "}
            <span className="underline">Terms of Service</span> and authorize a recurring 
            monthly subscription of $9.99 after your 7-day trial ends.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
