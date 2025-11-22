import { Shield, Github, Mail } from "lucide-react";
import logo from "@/assets/phishguard-logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="PhishGuard Logo" className="w-12 h-12" />
              <span className="font-display text-xl font-bold text-primary">PhishGuard AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Think before you click? PhishGuard already did.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">99.41% Detection Accuracy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Features", href: "#features" },
                { label: "Architecture", href: "#architecture" },
                { label: "Extension", href: "#extension" },
                { label: "Documentation", href: "#documentation" }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-primary uppercase tracking-wider">Connect</h3>
            <div className="space-y-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub Repository
              </a>
              <a 
                href="mailto:contact@phishguard.ai"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@phishguard.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 PhishGuard AI. Open Source Project.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for hackathons. Privacy-first architecture. MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};
