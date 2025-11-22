import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, BookOpen, Brain, Lock, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Documentation = () => {
  return (
    <section id="documentation" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
            <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient">
              Documentation
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete technical documentation and implementation guide
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="model" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-card/50 border border-primary/20">
              <TabsTrigger value="model" className="font-display data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Brain className="h-4 w-4 mr-2" />
                ML Model
              </TabsTrigger>
              <TabsTrigger value="extension" className="font-display data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Code2 className="h-4 w-4 mr-2" />
                Extension
              </TabsTrigger>
              <TabsTrigger value="privacy" className="font-display data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Lock className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="github" className="font-display data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Github className="h-4 w-4 mr-2" />
                Repository
              </TabsTrigger>
            </TabsList>

            <TabsContent value="model" className="space-y-6">
              <Card className="cyber-card bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">Machine Learning Model</CardTitle>
                  <CardDescription>CNN/LSTM Hybrid with 99.41% accuracy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Training Dataset</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary mt-0.5">1M+</Badge>
                        <span>Real phishing URLs from multiple threat intelligence sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary mt-0.5">Balanced</Badge>
                        <span>Equal distribution of phishing and legitimate URLs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="border-primary/30 text-primary mt-0.5">Updated</Badge>
                        <span>Continuously updated with new threat patterns</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Feature Extraction</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Character-level embeddings",
                        "Special character ratios",
                        "Suspicious TLD detection",
                        "Deep subdomain patterns",
                        "Brand name similarity (edit distance)",
                        "Domain age from WHOIS cache",
                        "HTTPS/Certificate validation",
                        "Instant blacklist lookup"
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Model Architecture</h4>
                    <div className="bg-muted/50 p-4 rounded-lg border border-primary/20 font-mono text-sm space-y-2">
                      <div>Input: URL String → Character Tokenization</div>
                      <div>→ Embedding Layer (char-level)</div>
                      <div>→ CNN Layer (pattern extraction)</div>
                      <div>→ LSTM Layer (sequence learning)</div>
                      <div>→ Heuristic Features (merged)</div>
                      <div>→ Dense Layers + Dropout</div>
                      <div>→ Output: Safety Score (0-100) + Confidence (%)</div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <h4 className="font-display mb-2 text-primary">Colab Notebook Reference</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Training implementation based on URL-based Phishing Analysis:
                    </p>
                    <code className="text-xs bg-muted/50 px-2 py-1 rounded break-all">
                      https://colab.research.google.com/github/nooot77/CNN-colab/blob/main/URL_based_Phishing_Analysis_Using_Machine_Learning.ipynb
                    </code>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="extension" className="space-y-6">
              <Card className="cyber-card bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">Extension Implementation</CardTitle>
                  <CardDescription>Chrome Manifest V3 architecture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">File Structure</h4>
                    <div className="bg-muted/50 p-4 rounded-lg border border-primary/20 font-mono text-sm space-y-1">
                      <div>phishguard-extension/</div>
                      <div className="pl-4">├── manifest.json (Manifest V3)</div>
                      <div className="pl-4">├── background.js (Service Worker)</div>
                      <div className="pl-4">├── content.js (DOM Scanner)</div>
                      <div className="pl-4">├── popup.html/js (Extension UI)</div>
                      <div className="pl-4">├── ml-classifier.js (ONNX Model)</div>
                      <div className="pl-4">├── models/ (Quantized ONNX files)</div>
                      <div className="pl-4">├── styles/ (CSS)</div>
                      <div className="pl-4">└── icons/ (Extension icons)</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Key Components</h4>
                    <div className="space-y-4">
                      <div className="p-4 border border-primary/20 rounded-lg bg-card/30">
                        <h5 className="font-display text-primary mb-2">background.js</h5>
                        <p className="text-sm text-muted-foreground">
                          Service Worker that intercepts navigation requests, runs ML inference, and blocks/warns based on safety score.
                        </p>
                      </div>
                      <div className="p-4 border border-primary/20 rounded-lg bg-card/30">
                        <h5 className="font-display text-primary mb-2">content.js</h5>
                        <p className="text-sm text-muted-foreground">
                          Scans page DOM for suspicious login forms, detects brand impersonation, and analyzes all links in content.
                        </p>
                      </div>
                      <div className="p-4 border border-primary/20 rounded-lg bg-card/30">
                        <h5 className="font-display text-primary mb-2">ml-classifier.js</h5>
                        <p className="text-sm text-muted-foreground">
                          Loads ONNX model, extracts URL features, runs inference, and returns safety score with confidence level.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Permissions Required</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "webRequest",
                        "webRequestBlocking", 
                        "tabs",
                        "storage",
                        "declarativeNetRequest",
                        "notifications"
                      ].map((perm, i) => (
                        <Badge key={i} variant="outline" className="border-primary/30 text-primary justify-center py-2">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="cyber-card bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">Privacy-First Architecture</CardTitle>
                  <CardDescription>Zero data collection, 100% local processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-success/10 border border-success/30 rounded-lg space-y-4">
                    <h4 className="font-display text-lg text-success flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Privacy Guarantees
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "No browsing history stored or transmitted",
                        "All ML inference runs locally in your browser",
                        "No external API calls for URL classification",
                        "WHOIS data cached locally (no real-time lookups)",
                        "No user tracking or analytics",
                        "No cloud processing of URLs",
                        "Open source code - verify yourself",
                        "Optional cloud features (VirusTotal) require explicit consent"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-success flex-shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">What Data Stays Local</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted/30 rounded border-l-4 border-primary">
                        <span className="font-display text-sm text-primary">ML Model:</span>
                        <span className="text-sm text-muted-foreground ml-2">Embedded in extension, no downloads</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded border-l-4 border-primary">
                        <span className="font-display text-sm text-primary">Blacklists:</span>
                        <span className="text-sm text-muted-foreground ml-2">Stored in local storage</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded border-l-4 border-primary">
                        <span className="font-display text-sm text-primary">User Settings:</span>
                        <span className="text-sm text-muted-foreground ml-2">Browser sync storage only</span>
                      </div>
                      <div className="p-3 bg-muted/30 rounded border-l-4 border-primary">
                        <span className="font-display text-sm text-primary">Detection History:</span>
                        <span className="text-sm text-muted-foreground ml-2">Optional, stored locally, user-controlled</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="github" className="space-y-6">
              <Card className="cyber-card bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-primary">Repository Structure</CardTitle>
                  <CardDescription>Complete source code and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Repository Contents</h4>
                    <div className="bg-muted/50 p-4 rounded-lg border border-primary/20 font-mono text-sm space-y-1">
                      <div>phishguard/</div>
                      <div className="pl-4">├── README.md (Setup & Usage)</div>
                      <div className="pl-4">├── extension/ (Chrome Extension)</div>
                      <div className="pl-4">├── model/ (Training Scripts)</div>
                      <div className="pl-4">├── datasets/ (Training Data)</div>
                      <div className="pl-4">├── docs/ (Full Documentation)</div>
                      <div className="pl-4">├── tests/ (Unit Tests)</div>
                      <div className="pl-4">└── LICENSE</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg mb-3 text-foreground">Quick Start</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-4 bg-muted/30 rounded-lg border border-primary/20">
                        <div className="font-display text-primary mb-2">1. Clone Repository</div>
                        <code className="bg-background px-2 py-1 rounded text-xs">
                          git clone https://github.com/yourusername/phishguard.git
                        </code>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg border border-primary/20">
                        <div className="font-display text-primary mb-2">2. Load Extension</div>
                        <div className="text-muted-foreground">
                          Open chrome://extensions/, enable Developer Mode, click "Load unpacked", select extension folder
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg border border-primary/20">
                        <div className="font-display text-primary mb-2">3. Train Model (Optional)</div>
                        <code className="bg-background px-2 py-1 rounded text-xs block mb-2">
                          cd model && python train.py --dataset datasets/phishing.csv
                        </code>
                        <div className="text-muted-foreground text-xs">
                          Pre-trained model included in extension/models/
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/10 border border-primary/30 rounded-lg text-center space-y-4">
                    <Github className="h-12 w-12 text-primary mx-auto" />
                    <h4 className="font-display text-xl text-primary">Open Source</h4>
                    <p className="text-muted-foreground">
                      Full source code available on GitHub. Contributions welcome!
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="border-primary/30 text-primary">MIT License</Badge>
                      <Badge variant="outline" className="border-primary/30 text-primary">Pull Requests Welcome</Badge>
                      <Badge variant="outline" className="border-primary/30 text-primary">Issues & Discussions</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
