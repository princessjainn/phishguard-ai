// PhishGuard AI - Background Service Worker
import { PhishingDetector } from './utils/phishing-detector.js';

const detector = new PhishingDetector();
let isInitialized = false;

// Initialize the detector
async function initialize() {
  if (isInitialized) return;
  
  console.log('🛡️ PhishGuard AI: Initializing...');
  await detector.initialize();
  isInitialized = true;
  console.log('✅ PhishGuard AI: Ready to protect!');
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    await initialize();
    
    try {
      const url = new URL(tab.url);
      
      // Skip chrome:// and extension pages
      if (url.protocol === 'chrome:' || url.protocol === 'chrome-extension:') {
        return;
      }
      
      console.log(`🔍 Scanning: ${url.href}`);
      const result = await detector.analyzeURL(url.href);
      
      // Store result for popup
      await chrome.storage.local.set({
        [`scan_${tabId}`]: {
          url: url.href,
          result: result,
          timestamp: Date.now()
        }
      });
      
      // Update badge
      updateBadge(tabId, result.riskLevel);
      
      // Block if dangerous and auto-block is enabled
      const settings = await chrome.storage.sync.get(['autoBlock']);
      if (settings.autoBlock !== false && result.riskLevel === 'high') {
        chrome.tabs.update(tabId, {
          url: chrome.runtime.getURL(`warning.html?url=${encodeURIComponent(url.href)}`)
        });
      }
      
      // Send to content script
      chrome.tabs.sendMessage(tabId, {
        type: 'SCAN_RESULT',
        result: result
      }).catch(() => {
        // Content script might not be ready yet
      });
      
    } catch (error) {
      console.error('Error analyzing URL:', error);
    }
  }
});

// Update badge based on risk level
function updateBadge(tabId, riskLevel) {
  const colors = {
    low: '#10b981',     // Green
    medium: '#f59e0b',  // Yellow
    high: '#ef4444'     // Red
  };
  
  const text = {
    low: '✓',
    medium: '!',
    high: '✗'
  };
  
  chrome.action.setBadgeBackgroundColor({ 
    color: colors[riskLevel] || colors.low,
    tabId 
  });
  
  chrome.action.setBadgeText({ 
    text: text[riskLevel] || '',
    tabId 
  });
}

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.type) {
      case 'ANALYZE_URL':
        await initialize();
        const result = await detector.analyzeURL(request.url);
        sendResponse({ result });
        break;
        
      case 'REPORT_PHISHING':
        await reportPhishing(request.url, request.details);
        sendResponse({ success: true });
        break;
        
      case 'GET_STATS':
        const stats = await getStats();
        sendResponse({ stats });
        break;
    }
  })();
  
  return true; // Keep channel open for async response
});

// Report phishing to community database
async function reportPhishing(url, details) {
  try {
    // Store locally
    const reports = await chrome.storage.local.get(['phishing_reports']) || { phishing_reports: [] };
    reports.phishing_reports.push({
      url,
      details,
      timestamp: Date.now()
    });
    await chrome.storage.local.set(reports);
    
    console.log('📝 Phishing reported:', url);
  } catch (error) {
    console.error('Error reporting phishing:', error);
  }
}

// Get extension stats
async function getStats() {
  const data = await chrome.storage.local.get(['stats']);
  return data.stats || {
    totalScans: 0,
    threatsBlocked: 0,
    lastScan: null
  };
}

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('🎉 PhishGuard AI installed successfully!');
  
  // Set default settings
  chrome.storage.sync.set({
    autoBlock: true,
    hoverPreview: true,
    communityReports: true
  });
  
  // Initialize stats
  chrome.storage.local.set({
    stats: {
      totalScans: 0,
      threatsBlocked: 0,
      lastScan: null
    }
  });
});

// Keep service worker alive
chrome.runtime.onStartup.addListener(() => {
  console.log('🚀 PhishGuard AI starting up...');
  initialize();
});
