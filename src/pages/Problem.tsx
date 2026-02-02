import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  Clock, 
  CheckSquare, 
  Eye, 
  MousePointer, 
  X,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

const darkPatterns = [
  {
    icon: Clock,
    name: "Fake Urgency",
    description: "Fabricated countdown timers and scarcity claims pressure you to act without thinking.",
    example: "\"Only 2 left!\" when inventory is unlimited",
    color: "danger",
  },
  {
    icon: CheckSquare,
    name: "Pre-selected Consent",
    description: "Checkboxes already ticked for newsletters, data sharing, or add-ons you didn't ask for.",
    example: "Consent boxes checked by default",
    color: "warning",
  },
  {
    icon: MousePointer,
    name: "Misdirection",
    description: "Visual tricks that draw your attention away from important information or options.",
    example: "Bright \"Accept All\" vs. tiny \"Manage\" link",
    color: "warning",
  },
  {
    icon: Eye,
    name: "Hidden Information",
    description: "Important details buried in fine print, behind expandable sections, or written in confusing language.",
    example: "Subscription auto-renewal hidden in terms",
    color: "danger",
  },
  {
    icon: X,
    name: "Roach Motel",
    description: "Easy to sign up, nearly impossible to cancel. Extra steps, hidden links, phone calls required.",
    example: "One-click subscribe, maze to unsubscribe",
    color: "danger",
  },
  {
    icon: AlertTriangle,
    name: "Confirmshaming",
    description: "Guilt-tripping language designed to make you feel bad for declining.",
    example: "\"No, I don't want to save money\"",
    color: "info",
  },
];

export default function Problem() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              The Problem with Modern Interfaces
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every day, billions of people interact with interfaces designed to 
              manipulate rather than inform. These "dark patterns" exploit psychology 
              to make you click, buy, and share—often against your best interests.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* What are dark patterns */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
              What are Dark Patterns?
            </h2>
            
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="text-foreground">Dark patterns</strong> are user interface designs 
                that trick users into doing things they didn't intend, like subscribing to newsletters, 
                making purchases, or giving up personal data.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Coined by UX researcher Harry Brignull in 2010, the term describes deceptive design 
                practices that prioritize business metrics over user wellbeing. These patterns are 
                increasingly regulated in the EU, California, and other jurisdictions.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                <a 
                  href="https://www.deceptive.design" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline"
                >
                  Learn more at deceptive.design
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pattern Examples */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Common Dark Patterns
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These manipulative techniques are everywhere. Here's what to look out for.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {darkPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl border p-6 ${
                  pattern.color === "danger" 
                    ? "bg-danger-light border-danger/20" 
                    : pattern.color === "warning"
                    ? "bg-warning-light border-warning/20"
                    : "bg-info-light border-info/20"
                }`}
              >
                <pattern.icon className={`w-8 h-8 mb-4 ${
                  pattern.color === "danger" 
                    ? "text-danger" 
                    : pattern.color === "warning"
                    ? "text-warning"
                    : "text-info"
                }`} />
                <h3 className="font-display font-semibold text-lg mb-2">{pattern.name}</h3>
                <p className="text-foreground/80 text-sm mb-4">{pattern.description}</p>
                <div className="bg-background/50 rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground">
                  {pattern.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Consent is Broken */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
                Why Digital Consent is Broken
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-danger-light text-danger flex items-center justify-center text-sm font-bold">1</span>
                    Asymmetric Power
                  </h3>
                  <p className="text-muted-foreground">
                    Companies have teams of psychologists and A/B testing. Users have 
                    seconds to make decisions on interfaces designed to confuse them.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-danger-light text-danger flex items-center justify-center text-sm font-bold">2</span>
                    Information Overload
                  </h3>
                  <p className="text-muted-foreground">
                    Terms of service average 8,000+ words. Privacy policies are longer 
                    than literary novels. Nobody reads them—and that's by design.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-danger-light text-danger flex items-center justify-center text-sm font-bold">3</span>
                    Manufactured Consent
                  </h3>
                  <p className="text-muted-foreground">
                    Pre-checked boxes, "Accept All" buttons, and opt-out rather than 
                    opt-in models create consent that's legal but not meaningful.
                  </p>
                </div>
                
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-danger-light text-danger flex items-center justify-center text-sm font-bold">4</span>
                    Invisible Consequences
                  </h3>
                  <p className="text-muted-foreground">
                    The effects of data sharing, subscriptions, and permissions are 
                    abstract and delayed. Harm is hard to connect to the moment of consent.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              See It In Action
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience how System Truth detects these patterns in real time 
              with our interactive demo.
            </p>
            <Button asChild size="lg" className="group">
              <Link to="/demo">
                Try the Interactive Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
