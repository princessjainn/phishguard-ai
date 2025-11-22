import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, Cpu, Globe, Shield } from "lucide-react";

const architectureSteps = [
  {
    step: "1",
    title: "User Visits Website",
    description: "Browser extension intercepts navigation",
    icon: Globe
  },
  {
    step: "2", 
    title: "Service Worker",
    description: "Background.js intercepts and analyzes URL",
    icon: Cpu
  },
  {
    step: "3",
    title: "ML Classifier",
    description: "Offline model analyzes URL features (ml-classifier.js)",
    icon: Database
  },
  {
    step: "4",
    title: "Safety Score & Action",
    description: "🟢 Safe: Allow | 🟡 Suspicious: Warn | 🔴 Dangerous: Block + Redirect",
    icon: Shield
  }
];

export const Architecture = () => {
  return (
    <section id="architecture" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">
            Technical Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How PhishGuard protects you in milliseconds
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Architecture flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {architectureSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="cyber-card h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                        <span className="font-display text-xl font-bold text-primary">{step.step}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-display">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector (hidden on last item and mobile) */}
                {index < architectureSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-16 space-y-8">
            <h3 className="text-2xl font-display font-bold text-center text-primary">Tech Stack</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  category: "Frontend Extension",
                  tech: ["HTML5", "CSS3", "JavaScript", "Manifest V3", "Chrome Extension API"]
                },
                {
                  category: "Machine Learning",
                  tech: ["TensorFlow.js", "Scikit-learn", "ONNX Runtime", "Python", "CNN/LSTM Hybrid"]
                },
                {
                  category: "Tools & APIs",
                  tech: ["WHOIS Lookup", "VirusTotal API", "DOM Parser", "Local Storage", "Service Workers"]
                }
              ].map((stack, i) => (
                <Card key={i} className="cyber-card bg-card/30 backdrop-blur border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-display text-primary">{stack.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stack.tech.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
