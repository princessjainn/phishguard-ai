import { Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/phishguard-logo.png";

export const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 animate-scan" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Logo with glow effect */}
          <div className="relative animate-float">
            <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full" />
            <img 
              src={logo} 
              alt="PhishGuard Logo" 
              className="w-48 h-48 md:w-64 md:h-64 relative z-10 drop-shadow-2xl"
            />
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient glow">
              PHISHGUARD AI
            </h1>
            <p className="text-xl md:text-3xl font-display text-primary/90">
              "Think before you click? PhishGuard already did."
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Advanced AI-powered phishing detection with <span className="text-primary font-semibold">99.41% accuracy</span>.
            Trained on 1M+ real phishing URLs. Zero-click protection before pages even load.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl pt-8">
            {[
              { value: "99.41%", label: "Accuracy" },
              { value: "1M+", label: "Training URLs" },
              { value: "<10ms", label: "Detection Time" },
              { value: "100%", label: "Privacy" }
            ].map((stat, i) => (
              <div key={i} className="cyber-card p-6 border-glow">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary glow">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button 
              size="lg" 
              className="font-display text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300"
              onClick={() => document.getElementById('extension')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Shield className="mr-2 h-5 w-5" />
              Get Extension
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-display text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
              onClick={() => document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Documentation
            </Button>
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={scrollToFeatures}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/60 hover:text-primary transition-colors"
            aria-label="Scroll to features"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};
