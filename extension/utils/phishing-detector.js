// PhishGuard AI - ML-Powered Phishing Detector

export class PhishingDetector {
  constructor() {
    this.model = null;
    this.isInitialized = false;
    this.blacklist = new Set();
  }

  async initialize() {
    if (this.isInitialized) return;
    
    console.log('Initializing PhishGuard AI detector...');
    
    // Load blacklist
    await this.loadBlacklist();
    
    // Initialize ML model (lightweight heuristic-based for now)
    // TODO: Replace with actual trained model
    this.isInitialized = true;
    
    console.log('Detector initialized successfully');
  }

  async loadBlacklist() {
    // Load known phishing domains from storage
    try {
      const data = await chrome.storage.local.get(['blacklist']);
      if (data.blacklist) {
        this.blacklist = new Set(data.blacklist);
      }
    } catch (error) {
      console.error('Error loading blacklist:', error);
    }
  }

  async analyzeURL(urlString) {
    try {
      const url = new URL(urlString);
      
      // Quick blacklist check
      if (this.blacklist.has(url.hostname)) {
        return {
          riskLevel: 'high',
          score: 0,
          confidence: 0.99,
          reasons: ['Domain is in known phishing blacklist'],
          features: {}
        };
      }
      
      // Extract features
      const features = this.extractFeatures(url);
      
      // Calculate risk score using heuristics
      const { score, riskLevel, reasons } = this.calculateRiskScore(features, url);
      
      // Calculate confidence based on number of indicators
      const confidence = Math.min(0.95, 0.7 + (reasons.length * 0.05));
      
      return {
        riskLevel,
        score,
        confidence,
        reasons,
        features
      };
      
    } catch (error) {
      console.error('Error analyzing URL:', error);
      return {
        riskLevel: 'low',
        score: 100,
        confidence: 0.5,
        reasons: ['Unable to analyze URL'],
        features: {}
      };
    }
  }

  extractFeatures(url) {
    const features = {};
    
    // Feature 1: Using IP address instead of domain
    features.UsingIP = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url.hostname) ? -1 : 1;
    
    // Feature 2: Long URL
    features.LongURL = url.href.length > 75 ? -1 : (url.href.length > 54 ? 0 : 1);
    
    // Feature 3: Short URL service
    const shorteners = ['bit.ly', 'goo.gl', 'tinyurl', 't.co', 'ow.ly'];
    features.ShortURL = shorteners.some(s => url.hostname.includes(s)) ? -1 : 1;
    
    // Feature 4: @ symbol in URL
    features.Symbol = url.href.includes('@') ? -1 : 1;
    
    // Feature 5: Redirecting //
    const slashCount = (url.href.match(/\//g) || []).length;
    features.Redirecting = slashCount > 6 ? -1 : 1;
    
    // Feature 6: Prefix/Suffix with -
    features.PrefixSuffix = url.hostname.includes('-') ? -1 : 1;
    
    // Feature 7: Subdomain count
    const subdomains = url.hostname.split('.').length - 2;
    features.SubDomains = subdomains > 3 ? -1 : (subdomains > 1 ? 0 : 1);
    
    // Feature 8: HTTPS
    features.HTTPS = url.protocol === 'https:' ? 1 : -1;
    
    // Feature 9: Domain registration length (simplified)
    features.DomainRegLen = url.hostname.length > 20 ? -1 : 1;
    
    // Feature 10: Favicon (placeholder)
    features.Favicon = 1;
    
    // Feature 11: Non-standard port
    features.NonStdPort = url.port && url.port !== '80' && url.port !== '443' ? -1 : 1;
    
    // Feature 12: HTTPS in domain
    features.HTTPSDomainURL = url.hostname.includes('https') ? -1 : 1;
    
    // Feature 13: Request URL (placeholder)
    features.RequestURL = 1;
    
    // Feature 14: Anchor URL (placeholder)
    features.AnchorURL = 0;
    
    // Feature 15: Links in script tags (placeholder)
    features.LinksInScriptTags = 0;
    
    // Feature 16: Server form handler (placeholder)
    features.ServerFormHandler = 0;
    
    // Feature 17: Info email (placeholder)
    features.InfoEmail = 1;
    
    // Feature 18: Abnormal URL
    features.AbnormalURL = this.checkAbnormalURL(url) ? -1 : 1;
    
    // Feature 19: Website forwarding (placeholder)
    features.WebsiteForwarding = 0;
    
    // Feature 20-31: Other features (placeholders for now)
    features.StatusBarCust = 1;
    features.DisableRightClick = 1;
    features.UsingPopupWindow = 1;
    features.IframeRedirection = 1;
    features.AgeofDomain = 1;
    features.DNSRecording = 1;
    features.WebsiteTraffic = 0;
    features.PageRank = -1;
    features.GoogleIndex = 1;
    features.LinksPointingToPage = 0;
    features.StatsReport = 1;
    
    return features;
  }

  checkAbnormalURL(url) {
    // Check for common brand impersonation
    const brands = [
      'paypal', 'amazon', 'google', 'facebook', 'microsoft', 
      'apple', 'netflix', 'instagram', 'twitter', 'linkedin'
    ];
    
    const legitimateDomains = [
      'paypal.com', 'amazon.com', 'google.com', 'facebook.com',
      'microsoft.com', 'apple.com', 'netflix.com', 'instagram.com',
      'twitter.com', 'linkedin.com'
    ];
    
    const hostname = url.hostname.toLowerCase();
    
    // Check if hostname contains brand name but isn't the legitimate domain
    for (let i = 0; i < brands.length; i++) {
      if (hostname.includes(brands[i]) && !hostname.endsWith(legitimateDomains[i])) {
        return true;
      }
    }
    
    // Check for suspicious patterns
    if (hostname.includes('--') || hostname.split('.').length > 4) {
      return true;
    }
    
    return false;
  }

  calculateRiskScore(features, url) {
    const reasons = [];
    let negativeCount = 0;
    let suspiciousCount = 0;
    
    // Count risk indicators
    for (const [key, value] of Object.entries(features)) {
      if (value === -1) negativeCount++;
      if (value === 0) suspiciousCount++;
    }
    
    // Generate specific reasons based on features
    if (features.UsingIP === -1) {
      reasons.push('⚠️ Using IP address instead of domain name');
    }
    
    if (features.LongURL === -1) {
      reasons.push('⚠️ Unusually long URL (> 75 characters)');
    }
    
    if (features.ShortURL === -1) {
      reasons.push('⚠️ Uses URL shortening service');
    }
    
    if (features.Symbol === -1) {
      reasons.push('⚠️ Contains @ symbol (may hide real destination)');
    }
    
    if (features.PrefixSuffix === -1) {
      reasons.push('⚠️ Domain contains suspicious hyphens');
    }
    
    if (features.SubDomains === -1) {
      reasons.push('⚠️ Excessive subdomains detected');
    }
    
    if (features.HTTPS === -1) {
      reasons.push('🔓 No HTTPS encryption');
    }
    
    if (features.HTTPSDomainURL === -1) {
      reasons.push('⚠️ "HTTPS" appears in domain name (deceptive)');
    }
    
    if (features.AbnormalURL === -1) {
      reasons.push('🎭 Possible brand impersonation detected');
    }
    
    if (features.NonStdPort === -1) {
      reasons.push('⚠️ Using non-standard port');
    }
    
    // Check for known phishing patterns
    const hostname = url.hostname.toLowerCase();
    if (/secure|verify|update|login|account|banking/i.test(hostname)) {
      reasons.push('⚠️ Domain contains suspicious keywords');
    }
    
    // Calculate score (0-100, where 100 is safest)
    const baseScore = 100;
    const negativeWeight = 8;
    const suspiciousWeight = 3;
    
    let score = baseScore - (negativeCount * negativeWeight) - (suspiciousCount * suspiciousWeight);
    score = Math.max(0, Math.min(100, score));
    
    // Determine risk level
    let riskLevel;
    if (score >= 70) {
      riskLevel = 'low';
    } else if (score >= 40) {
      riskLevel = 'medium';
    } else {
      riskLevel = 'high';
    }
    
    // Override if no reasons found
    if (reasons.length === 0) {
      reasons.push('✓ No suspicious indicators found');
      riskLevel = 'low';
      score = 95;
    }
    
    return { score, riskLevel, reasons };
  }
}
