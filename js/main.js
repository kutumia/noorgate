document.addEventListener('DOMContentLoaded', function () {
  // Setup Progress Logic
  function goToTab(tabId) {
    const tab = new bootstrap.Tab(document.getElementById(tabId));
    tab.show();
    
    const progressMap = {
      'router-tab': 25,
      'dns-tab': 50,
      'lock-tab': 75,
      'success-tab': 100
    };
    document.getElementById('setupProgress').style.width = `${progressMap[tabId]}%`;
  }

  // DNS Test
  document.getElementById('dnsTestBtn').addEventListener('click', async () => {
    const resultBox = document.getElementById('dnsTestResult');
    resultBox.textContent = 'Testing...';

    try {
      await fetch('https://example.com', { mode: 'no-cors' });  // or use a dummy
      resultBox.textContent = '⚠️ DNS filtering might not be active!';
      resultBox.style.color = 'red';
    } catch (e) {
      resultBox.textContent = '✅ DNS filtering is active!';
      resultBox.style.color = 'green';
    }
  });

  // Router IP Enablement
  document.getElementById('routerIP').addEventListener('input', function (e) {
    document.getElementById('routerNextBtn').disabled =
      !e.target.value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
  });

  // DNS Switching Logic
  document.getElementById('dnsProvider').addEventListener('change', function (e) {
    const dns = {
      kahf: { primary: '193.148.18.2', secondary: '193.148.18.3' },
      cleanbrowsing: { primary: '185.228.168.168', secondary: '185.228.169.168' }
    };
    const selected = dns[e.target.value];
    document.getElementById('dnsPrimary').value = selected.primary;
    document.getElementById('dnsSecondary').value = selected.secondary;
  });

  // Password Gen
  document.getElementById('routerPassword').value = '';
  document.querySelector('button[onclick="generatePassword()"]').addEventListener('click', () => {
    const chars = '!@#$%^ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    const arr = new Uint32Array(16);
    window.crypto.getRandomValues(arr);
    const password = Array.from(arr, n => chars[n % chars.length]).join('');
    document.getElementById('routerPassword').value = password;
  });

  // Lock
  document.querySelector('button[onclick="lockRouter()"]').addEventListener('click', () => {
    const password = document.getElementById('routerPassword').value;
    if (!password) {
      alert('Please generate a password first!');
      return;
    }
    localStorage.setItem('lastPassHash', password.substring(0, 8));
    goToTab('success-tab');
  });
});
