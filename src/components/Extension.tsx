import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Download, Settings, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const installSteps = [
  {
    step: "1",
    title: "Download Extension",
    description: "Clone the GitHub repository or download the extension folder"
  },
  {
    step: "2",
    title: "Open Chrome Extensions",
    description: "Navigate to chrome://extensions/ in your browser"
  },
  {
    step: "3",
    title: "Enable Developer Mode",
    description: "Toggle the Developer Mode switch in the top right"
  },
  {
    step: "4",
    title: "Load Unpacked",
    description: "Click 'Load unpacked' and select the extension folder"
  },
  {
    step: "5",
    title: "Done!",
    description: "PhishGuard is now protecting your browsing in real-time"
  }
];

export const Extension = () => {
  return (
    <section id="extension" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Chrome className="h-12 w-12 text-primary" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">
              Chrome Extension
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Install in developer mode and get instant protection
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Installation steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-center text-primary mb-8">
              Installation Steps
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {installSteps.map((step, index) => (
                <Card 
                  key={index}
                  className="cyber-card bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 relative group"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                      <span className="font-display text-lg font-bold text-primary-foreground">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="pt-8">
                    <CardTitle className="text-center text-lg font-display">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features when installed */}
          <div className="cyber-card p-8 bg-card/30 backdrop-blur">
            <h3 className="text-2xl font-display font-bold text-primary mb-6 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              What You Get
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Real-time URL scanning on every navigation",
                "Visual safety indicators (🟢🟡🔴)",
                "Explainable AI panel showing detection reasons",
                "Auto-block dangerous sites with redirect",
                "Hover preview for links before clicking",
                "Community reporting system",
                "Privacy-first: 100% offline detection",
                "Zero performance impact (<10ms latency)"
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download CTA */}
          <div className="text-center space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="border-success/50 text-success px-4 py-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Open Source
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary px-4 py-2">
                <Chrome className="h-4 w-4 mr-2" />
                Chrome Compatible
              </Badge>
              <Badge variant="outline" className="border-warning/50 text-warning px-4 py-2">
                Developer Mode Required
              </Badge>
            </div>

            <Button 
              size="lg"
              className="font-display text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Extension
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Extension files will be included in the GitHub repository
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
