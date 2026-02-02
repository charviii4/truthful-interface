import { Link } from "react-router-dom";
import { Shield, AlertTriangle, Github, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Shield className="w-7 h-7 text-primary" />
                <AlertTriangle className="w-3.5 h-3.5 text-warning absolute -bottom-1 -right-1" />
              </div>
              <span className="font-display font-bold text-lg">System Truth</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              A real-time honesty layer for digital systems. We reveal manipulation 
              so you can make informed choices. No blocking, no judging—just transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-warning animate-pulse" />
              Hackathon Project MVP — Not for production compliance
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/problem" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  The Problem
                </Link>
              </li>
              <li>
                <Link 
                  to="/demo" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Try Demo
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About & Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Future & Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Coming Soon</h4>
            <ul className="space-y-2 mb-6">
              <li className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Browser Extension
              </li>
              <li className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                API for Regulators
              </li>
              <li className="text-sm text-muted-foreground flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Open Source
              </li>
            </ul>
            
            <div className="flex gap-3">
              <a 
                href="mailto:team@systemtruth.io" 
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 System Truth. Built for transparency, not surveillance.
          </p>
          <p className="text-xs text-muted-foreground">
            Team Credits: [Your Team Name Here]
          </p>
        </div>
      </div>
    </footer>
  );
}
