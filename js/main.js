// Tab Navigation with Progress Sync
function goToTab(tabId) {
  const tab = new bootstrap.Tab(document.querySelector(`button[data-bs-target="#${tabId}"]`));
  tab.show();

  const progress = {
    'router': 25,
    'dns': 50,
    'lock': 75,
    'success': 100
  };
  document.getElementById('setupProgress').style.width = `${progress[tabId]}%`;
}

// Auto-Enable "Next" Button
document.getElementById('routerIP').addEventListener('input', e => {
  document.getElementById('routerNextBtn').disabled = !e.target.value.match(/^\d{1,3}(\.\d{1,3}){3}$/);
});

// DNS Provider Logic
document.getElementById('dnsProvider').addEventListener('change', e => {
  const map = {
    kahf: { primary: '193.148.18.2', secondary: '193.148.18.3' },
    cleanbrowsing: { primary: '185.228.168.168', secondary: '185.228.169.168' }
  };
  const { primary, secondary } = map[e.target.value];
  document.getElementById('dnsPrimary').value = primary;
  document.getElementById('dnsSecondary').value = secondary;
});
document.getElementById('dnsProvider').dispatchEvent(new Event('change')); // Set default on load

// Test DNS Button (Simulated)
document.getElementById('dnsTestBtn').addEventListener('click', async () => {
  const resultBox = document.getElementById('dnsTestResult');
  resultBox.textContent = 'Testing...';
  resultBox.style.color = 'black';

  try {
    await fetch('https://example.com', { mode: 'no-cors' });
    resultBox.textContent = '⚠️ DNS filtering might not be active!';
    resultBox.style.color = 'red';
  } catch (err) {
    resultBox.textContent = '✅ DNS filtering is active!';
    resultBox.style.color = 'green';
  }
});

// Generate Password After Disclaimer
document.getElementById('confirmGenerate').addEventListener('click', () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#%';
  const arr = new Uint32Array(16);
  window.crypto.getRandomValues(arr);
  const password = Array.from(arr, n => chars[n % chars.length]).join('');
  document.getElementById('routerPassword').value = password;
});

// Final Lock Action
function lockRouter() {
  const pass = document.getElementById('routerPassword').value;
  if (!pass) return alert('Please generate a password first.');
  localStorage.setItem('guardianPassHash', pass.slice(0, 8));
  goToTab('success');
}

// Load Blocklist
fetch('data/blocklist.json')
  .then(res => res.json())
  .then(domains => {
    const list = document.getElementById('dohBlocklist');
    domains.forEach(domain => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = domain;
      list.appendChild(li);
    });
  });

// Rage Timer Hook (for future)
function startRageTimer(minutes = 5) {
  alert(`Please take a break. Lock will unlock after ${minutes} minutes.`);
}

// Public for use in HTML
window.goToTab = goToTab;
window.lockRouter = lockRouter;
