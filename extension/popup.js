// PhishGuard AI - Popup Script

let currentTabId = null;
let currentResult = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  currentTabId = tab.id;
  
  // Load settings
  loadSettings();
  
  // Load stats
  loadStats();
  
  // Check if we have scan result for this tab
  const data = await chrome.storage.local.get([`scan_${currentTabId}`]);
  if (data[`scan_${currentTabId}`]) {
    const scanData = data[`scan_${currentTabId}`];
    currentResult = scanData.result;
    displayResult(scanData.result);
  } else {
    // Request scan
    requestScan(tab.url);
  }
  
  // Setup event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  document.getElementById('scan-btn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    requestScan(tab.url);
  });
  
  document.getElementById('report-btn').addEventListener('click', () => {
    if (currentResult) {
      reportSite();
    }
  });
  
  document.getElementById('auto-block-toggle').addEventListener('change', (e) => {
    chrome.storage.sync.set({ autoBlock: e.target.checked });
  });
  
  document.getElementById('hover-preview-toggle').addEventListener('change', (e) => {
    chrome.storage.sync.set({ hoverPreview: e.target.checked });
  });
  
  document.getElementById('view-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    // Open dashboard in new tab
    chrome.tabs.create({ url: 'dashboard.html' });
  });
}

// Request URL scan
async function requestScan(url) {
  setStatus('analyzing', 'Analyzing...', 'Scanning URL for threats');
  
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'ANALYZE_URL',
      url: url
    });
    
    if (response && response.result) {
      currentResult = response.result;
      displayResult(response.result);
    }
  } catch (error) {
    console.error('Scan error:', error);
    setStatus('error', 'Error', 'Failed to analyze URL');
  }
}

// Display scan result
function displayResult(result) {
  const { riskLevel, confidence, score, reasons, features } = result;
  
  // Update status
  const statusMap = {
    low: { icon: '🟢', title: 'Safe', desc: 'No threats detected' },
    medium: { icon: '🟡', title: 'Suspicious', desc: 'Proceed with caution' },
    high: { icon: '🔴', title: 'Dangerous', desc: 'Phishing detected!' }
  };
  
  const status = statusMap[riskLevel];
  setStatus(riskLevel, status.title, status.desc);
  
  // Show safety score
  document.getElementById('safety-score').style.display = 'block';
  updateSafetyScore(score, riskLevel);
  
  // Show details
  if (riskLevel !== 'low') {
    document.getElementById('details-section').style.display = 'block';
    document.getElementById('confidence-value').textContent = `${Math.round(confidence * 100)}%`;
    
    const reasonsList = document.getElementById('reasons-list');
    reasonsList.innerHTML = reasons.map(reason => `
      <div class="reason-item">${reason}</div>
    `).join('');
  } else {
    document.getElementById('details-section').style.display = 'none';
  }
}

// Set status indicator
function setStatus(level, title, description) {
  const icon = document.getElementById('status-icon');
  const titleEl = document.getElementById('status-title');
  const descEl = document.getElementById('status-description');
  
  const icons = {
    analyzing: '🔄',
    low: '🟢',
    medium: '🟡',
    high: '🔴',
    error: '❌'
  };
  
  icon.textContent = icons[level] || '🔄';
  icon.className = `status-icon ${level}`;
  titleEl.textContent = title;
  descEl.textContent = description;
  
  if (level !== 'analyzing') {
    titleEl.className = `risk-${level}`;
  }
}

// Update safety score circle
function updateSafetyScore(score, riskLevel) {
  const scoreText = document.getElementById('score-text');
  const scoreFill = document.getElementById('score-fill');
  const circle = document.getElementById('score-circle');
  
  scoreText.textContent = score;
  
  // Calculate stroke dashoffset (283 is full circle)
  const offset = 283 - (score / 100) * 283;
  scoreFill.style.strokeDashoffset = offset;
  
  // Set color based on risk level
  const colors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };
  
  scoreFill.style.stroke = colors[riskLevel];
  scoreText.style.color = colors[riskLevel];
  
  // Add animation
  setTimeout(() => {
    circle.style.transform = 'scale(1.05)';
    setTimeout(() => {
      circle.style.transform = 'scale(1)';
    }, 200);
  }, 100);
}

// Load settings
async function loadSettings() {
  const settings = await chrome.storage.sync.get(['autoBlock', 'hoverPreview']);
  
  document.getElementById('auto-block-toggle').checked = settings.autoBlock !== false;
  document.getElementById('hover-preview-toggle').checked = settings.hoverPreview !== false;
}

// Load stats
async function loadStats() {
  const response = await chrome.runtime.sendMessage({ type: 'GET_STATS' });
  
  if (response && response.stats) {
    document.getElementById('total-scans').textContent = response.stats.totalScans || 0;
    document.getElementById('threats-blocked').textContent = response.stats.threatsBlocked || 0;
  }
}

// Report site
async function reportSite() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const reason = prompt('Please describe why you\'re reporting this site:');
  if (!reason) return;
  
  await chrome.runtime.sendMessage({
    type: 'REPORT_PHISHING',
    url: tab.url,
    details: reason
  });
  
  alert('Thank you for your report! It will help improve PhishGuard AI.');
}
