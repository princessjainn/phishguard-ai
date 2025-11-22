import { Shield, Brain, Eye, AlertTriangle, Users, BarChart3, Lock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Zap,
    title: "Zero-Click Protection",
    description: "Auto scans every URL and blocks threats before the page even loads. No user interaction needed.",
    badge: "Core Feature",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "AI Classifier",
    description: "Offline ML model scoring URLs with 99.41% accuracy. Trained on 1M+ phishing samples using CNN/LSTM hybrid.",
    badge: "AI Powered",
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "Fake Login Detector",
    description: "Identifies Gmail/PayPal/Amazon login clones via DOM analysis, logo detection, and layout matching.",
    badge: "Advanced",
    color: "text-primary"
  },
  {
    icon: AlertTriangle,
    title: "Explainable AI Panel",
    description: "Shows detection reasons like 'new domain', 'brand typo', 'no HTTPS', and 'suspicious patterns'.",
    badge: "Transparency",
    color: "text-warning"
  },
  {
    icon: Users,
    title: "User Reporting System",
    description: "Community-powered threat intelligence. Report suspicious URLs and improve the model over time.",
    badge: "Crowdsourced",
    color: "text-success"
  },
  {
    icon: BarChart3,
    title: "Safety Score (0-100)",
    description: "Clear visual indicators: 🟢 Safe, 🟡 Suspicious, 🔴 Blocked with confidence levels.",
    badge: "User Friendly",
    color: "text-success"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "100% offline detection. No browsing history stored. No URLs uploaded. All ML runs locally.",
    badge: "Privacy",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Multi-Layer Defense",
    description: "Combines ML scoring, WHOIS data, blacklist checks, and heuristic analysis for maximum accuracy.",
    badge: "Enterprise Grade",
    color: "text-destructive"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">
            Proposed Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Phishing blocked before users even know they were in danger
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="cyber-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${feature.color} group-hover:bg-primary/20 transition-colors`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary">
            <Shield className="h-5 w-5" />
            <span className="font-display">Real-time protection with zero latency</span>
          </div>
        </div>
      </div>
    </section>
  );
};
