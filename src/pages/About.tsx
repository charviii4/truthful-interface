import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  Heart, 
  Code, 
  Users, 
  Globe, 
  Workflow,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function About() {
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
              About System Truth
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We believe transparency should be the default, not the exception.
              System Truth is a tool for informed consent in a world of designed manipulation.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-foreground/90 mb-4">
                To create a real-time, transparent "honesty layer" for digital systems 
                that reveals asymmetry and manipulation—empowering users to make truly 
                informed choices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don't block content or judge intent. We simply illuminate what's 
                happening beneath the surface of user interfaces, making the invisible 
                visible.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Ethics & Principles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Our Ethical Principles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              System Truth is built on a foundation of transparency, privacy, 
              and respect for user autonomy.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Eye,
                title: "We Analyze Interfaces, Not People",
                description: "Our system examines design patterns and UI elements. We never profile, track, or analyze individual users or their behavior.",
              },
              {
                icon: Lock,
                title: "Privacy-First Architecture",
                description: "No personal data is collected or stored. Demo sessions are anonymized. We can't identify you even if we wanted to.",
              },
              {
                icon: Heart,
                title: "Inform, Don't Control",
                description: "We provide information, not restrictions. The choice to proceed or not is always yours. We're a tool for empowerment, not a gatekeeper.",
              },
              {
                icon: Code,
                title: "Transparent Algorithms",
                description: "Our detection rules and scoring system are documented and explainable. No black boxes, no secret sauce.",
              },
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center mb-4">
                  <principle.icon className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What We Do / Don't Do */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Clear Boundaries
              </h2>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-success-light rounded-xl border border-success/20 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <h3 className="font-display font-semibold text-lg">What We Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Detect known dark pattern types",
                    "Explain why patterns are problematic",
                    "Provide transparent scoring breakdowns",
                    "Educate users about manipulative design",
                    "Reference established UX ethics research",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground/80">
                      <span className="text-success mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-danger-light rounded-xl border border-danger/20 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-danger" />
                  <h3 className="font-display font-semibold text-lg">What We Don't Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Provide legal advice or compliance certification",
                    "Judge intent or morality of website creators",
                    "Block, filter, or modify website content",
                    "Collect or store personal user data",
                    "Claim 100% accuracy in detection",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-foreground/80">
                      <span className="text-danger mt-1">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future Roadmap */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Future Vision
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This hackathon prototype is just the beginning. Here's where we're headed.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Browser Extension",
                description: "Real-time analysis directly in your browser as you navigate the web.",
                status: "Planned",
              },
              {
                icon: Workflow,
                title: "API for Regulators",
                description: "Programmatic access for compliance audits and research.",
                status: "Planned",
              },
              {
                icon: Users,
                title: "Open Source",
                description: "Public codebase for transparency and community contribution.",
                status: "Planned",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-info-light flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-info" />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-warning-light border border-warning/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Hackathon Project Disclaimer
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    System Truth is a prototype developed for educational and demonstration 
                    purposes. It is not a production-ready compliance tool and should not be 
                    used for legal or regulatory decisions. The detection algorithms are 
                    illustrative and may not catch all dark patterns or may flag legitimate 
                    design choices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
