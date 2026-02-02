import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Eye, AlertTriangle, Sparkles, Play, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/TrustScore";

export default function Landing() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning-light border border-warning/30 text-sm font-medium text-warning-foreground mb-6">
                <AlertTriangle className="w-4 h-4" />
                Hackathon Project — Prototype Demo
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                What if websites had to{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">tell the truth?</span>
                  <motion.span
                    className="absolute inset-0 bg-warning/20 rounded-lg -rotate-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  />
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                System Truth detects manipulative design and dark patterns in real time.
                No blocking. No judging. Just transparency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link to="/demo">
                    <Play className="w-4 h-4 mr-2" />
                    Try the Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/problem">
                    <BookOpen className="w-4 h-4 mr-2" />
                    How It Works
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-5xl mx-auto mt-16"
          >
            <div className="relative bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-4 py-1.5 text-sm text-muted-foreground">
                    shop.example.com/checkout
                  </div>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Fake UI */}
                <div className="lg:col-span-3 p-8 border-r border-border">
                  <div className="space-y-4">
                    {/* Highlighted Element */}
                    <div className="relative bg-danger-light border-2 border-danger rounded-lg p-4 animate-pulse-glow">
                      <div className="absolute -top-2 -right-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-danger-foreground text-xs font-bold">
                          !
                        </span>
                      </div>
                      <p className="text-danger font-semibold text-sm">
                        ⚡ HURRY! Only 2 left at this price!
                      </p>
                    </div>
                    
                    <div className="h-12 bg-muted rounded-lg" />
                    <div className="h-10 bg-muted rounded-lg" />
                    
                    {/* Another Highlighted Element */}
                    <div className="relative border-2 border-warning rounded-lg p-3 bg-warning-light">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-xs">✓</span>
                        </div>
                        <span className="text-sm">Sign me up for special offers</span>
                      </div>
                    </div>
                    
                    <div className="h-12 bg-primary rounded-lg" />
                  </div>
                </div>
                
                {/* Analysis Side */}
                <div className="lg:col-span-2 p-6 bg-muted/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 text-warning" />
                    <span className="font-display font-semibold">Analysis</span>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <TrustScore score={32} size="sm" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-danger-light rounded-lg px-3 py-2 text-xs">
                      <span className="text-danger font-semibold">Fake Urgency</span>
                      <span className="text-muted-foreground ml-2">detected</span>
                    </div>
                    <div className="bg-warning-light rounded-lg px-3 py-2 text-xs">
                      <span className="text-warning font-semibold">Pre-checked Consent</span>
                      <span className="text-muted-foreground ml-2">detected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              An honesty layer for the internet
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We analyze interfaces, not people. No personal data stored.
              Just transparent, explainable detection.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Real-time Detection",
                description: "Our system scans UI elements and text patterns as you browse, flagging manipulation instantly.",
              },
              {
                icon: Shield,
                title: "Transparent Scoring",
                description: "No black boxes. Every flagged pattern includes a clear explanation and category breakdown.",
              },
              {
                icon: Sparkles,
                title: "Education Mode",
                description: "Toggle learning mode to understand why each pattern is problematic and how it affects your choices.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-warning" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-primary text-primary-foreground rounded-2xl p-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to see through the tricks?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Try our interactive demo and experience how System Truth reveals 
              manipulation in real-time.
            </p>
            <Button asChild size="lg" variant="secondary" className="group">
              <Link to="/demo">
                Launch Interactive Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
