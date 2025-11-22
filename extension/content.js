// PhishGuard AI - Content Script
console.log('🛡️ PhishGuard AI: Content script loaded');

let currentRiskLevel = 'low';
let scanResult = null;

// Listen for scan results from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SCAN_RESULT') {
    currentRiskLevel = message.result.riskLevel;
    scanResult = message.result;
    
    // Show banner if needed
    if (currentRiskLevel !== 'low') {
      showWarningBanner(message.result);
    }
    
    // Scan for suspicious links in page
    scanPageLinks();
  }
});

// Show warning banner at top of page
function showWarningBanner(result) {
  // Remove existing banner
  const existing = document.getElementById('phishguard-banner');
  if (existing) existing.remove();
  
  const banner = document.createElement('div');
  banner.id = 'phishguard-banner';
  banner.className = `phishguard-banner phishguard-${result.riskLevel}`;
  
  const icon = result.riskLevel === 'high' ? '🔴' : '🟡';
  const message = result.riskLevel === 'high' 
    ? '⚠️ DANGER: This site has been flagged as potentially dangerous!'
    : '⚠️ WARNING: This site shows suspicious characteristics.';
  
  banner.innerHTML = `
    <div class="phishguard-banner-content">
      <div class="phishguard-banner-left">
        <span class="phishguard-icon">${icon}</span>
        <span class="phishguard-message">${message}</span>
        <button class="phishguard-details-btn" id="phishguard-details-btn">
          Why? (${Math.round(result.confidence * 100)}% confidence)
        </button>
      </div>
      <div class="phishguard-banner-right">
        <button class="phishguard-report-btn" id="phishguard-report-btn">Report as Safe</button>
        <button class="phishguard-close-btn" id="phishguard-close-btn">✕</button>
      </div>
    </div>
    <div class="phishguard-details" id="phishguard-details" style="display: none;">
      <h4>🔍 Detection Reasons:</h4>
      <ul>
        ${result.reasons.map(r => `<li>${r}</li>`).join('')}
      </ul>
      <div class="phishguard-features">
        <strong>Analyzed Features:</strong>
        <div class="phishguard-feature-grid">
          ${Object.entries(result.features || {})
            .filter(([key, val]) => val < 0)
            .map(([key, val]) => `
              <span class="phishguard-feature">${key.replace(/([A-Z])/g, ' $1')}: 
                <strong style="color: ${val === -1 ? '#ef4444' : '#f59e0b'}">${val === -1 ? 'HIGH RISK' : 'SUSPICIOUS'}</strong>
              </span>
            `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
  
  // Add event listeners
  document.getElementById('phishguard-close-btn').onclick = () => banner.remove();
  document.getElementById('phishguard-details-btn').onclick = () => {
    const details = document.getElementById('phishguard-details');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  };
  document.getElementById('phishguard-report-btn').onclick = () => {
    chrome.runtime.sendMessage({
      type: 'REPORT_PHISHING',
      url: window.location.href,
      details: 'User reported as safe'
    });
    banner.remove();
  };
}

// Scan all links on the page
function scanPageLinks() {
  const links = document.querySelectorAll('a[href]');
  let suspiciousCount = 0;
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
    
    try {
      const url = new URL(href, window.location.href);
      
      // Quick heuristic check
      if (isURLSuspicious(url)) {
        suspiciousCount++;
        link.classList.add('phishguard-suspicious-link');
        link.dataset.phishguardWarning = 'This link appears suspicious';
        
        // Add hover tooltip
        link.addEventListener('mouseenter', showLinkTooltip);
        link.addEventListener('mouseleave', hideLinkTooltip);
      }
    } catch (e) {
      // Invalid URL
    }
  });
  
  // Update badge with suspicious link count
  if (suspiciousCount > 0) {
    console.log(`⚠️ Found ${suspiciousCount} suspicious links on page`);
  }
}

// Quick heuristic check for suspicious URLs
function isURLSuspicious(url) {
  const suspicious = [
    url.hostname.includes('--'),
    url.hostname.split('.').length > 4,
    /@/.test(url.href),
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url.hostname),
    url.hostname.length > 50,
    /paypal|amazon|google|facebook|microsoft|apple/i.test(url.hostname) && 
      !/(paypal\.com|amazon\.com|google\.com|facebook\.com|microsoft\.com|apple\.com)$/.test(url.hostname)
  ];
  
  return suspicious.filter(Boolean).length >= 2;
}

// Show tooltip on hover
function showLinkTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'phishguard-tooltip';
  tooltip.textContent = e.target.dataset.phishguardWarning;
  tooltip.style.top = `${e.pageY + 10}px`;
  tooltip.style.left = `${e.pageX + 10}px`;
  tooltip.id = 'phishguard-tooltip';
  document.body.appendChild(tooltip);
}

function hideLinkTooltip() {
  const tooltip = document.getElementById('phishguard-tooltip');
  if (tooltip) tooltip.remove();
}

// Scan for login forms (fake login detector)
function detectFakeLoginForms() {
  const forms = document.querySelectorAll('form');
  const keywords = ['login', 'signin', 'password', 'email', 'username'];
  
  forms.forEach(form => {
    const formHTML = form.innerHTML.toLowerCase();
    const hasPassword = form.querySelector('input[type="password"]');
    const hasKeywords = keywords.some(kw => formHTML.includes(kw));
    
    if (hasPassword && hasKeywords && currentRiskLevel !== 'low') {
      // This is a login form on a suspicious page
      form.style.border = '3px solid #ef4444';
      form.style.position = 'relative';
      
      const warning = document.createElement('div');
      warning.className = 'phishguard-form-warning';
      warning.innerHTML = '⚠️ WARNING: Do not enter credentials on this suspicious page!';
      form.insertBefore(warning, form.firstChild);
    }
  });
}

// Run detection after page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    detectFakeLoginForms();
  }, 1000);
});

// Monitor DOM changes for dynamically loaded links
const observer = new MutationObserver(() => {
  scanPageLinks();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
