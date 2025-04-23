// Core Application Logic
function goToTab(tabId) {
  const tab = new bootstrap.Tab(document.getElementById(tabId));
  tab.show();
  
  // Update progress bar
  const progressMap = {
    'router-tab': 25,
    'dns-tab': 50,
    'lock-tab': 75,
    'success-tab': 100
  };
  document.getElementById('setupProgress').style.width = `${progressMap[tabId]}%`;
}

function generatePassword() {
  const chars = '!@#$%^ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const arr = new Uint32Array(16);
  window.crypto.getRandomValues(arr);
  const password = Array.from(arr, n => chars[n % chars.length]).join('');
  document.getElementById('routerPassword').value = password;
}

function lockRouter() {
  const password = document.getElementById('routerPassword').value;
  if (!password) {
    alert('Please generate a password first!');
    return;
  }
  
  // In a real app, you'd hash this for local storage
  localStorage.setItem('lastPassHash', password.substring(0, 8));
  goToTab('success-tab');
}

function testDNS() {
  alert('This would test DNS in production.\nFor now, visit dnsleaktest.com manually.');
}

// Initialize
document.getElementById('routerIP').addEventListener('input', function(e) {
  document.getElementById('routerNextBtn').disabled = 
    !e.target.value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
});

document.getElementById('dnsProvider').addEventListener('change', function(e) {
  const dns = {
    kahf: { primary: '193.148.18.2', secondary: '193.148.18.3' },
    cleanbrowsing: { primary: '185.228.168.168', secondary: '185.228.169.168' }
  };
  const selected = dns[e.target.value];
  document.getElementById('dnsPrimary').value = selected.primary;
  document.getElementById('dnsSecondary').value = selected.secondary;
});