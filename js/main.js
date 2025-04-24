function goToTab(panelId) {
  const trigger = document.querySelector(`button[data-bs-target="#${panelId}"]`);
  if (trigger) {
    const tab = new bootstrap.Tab(trigger);
    tab.show();

    const progressMap = {
      router: 25,
      dns: 50,
      lock: 75,
      success: 100
    };
    document.getElementById('setupProgress').style.width = `${progressMap[panelId]}%`;
  }
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
  localStorage.setItem('lastPassHash', password.substring(0, 8));
  goToTab('success');
}

function testDNS() {
  const resultBox = document.getElementById('dnsTestResult');
  resultBox.textContent = 'Testing...';
  fetch('https://example.com', { mode: 'no-cors' })
    .then(() => {
      resultBox.textContent = '⚠️ DNS filtering might not be active!';
      resultBox.style.color = 'red';
    })
    .catch(() => {
      resultBox.textContent = '✅ DNS filtering is active!';
      resultBox.style.color = 'green';
    });
}

// Initialization
document.getElementById('dnsTestBtn').addEventListener('click', testDNS);

document.getElementById('dnsProvider').addEventListener('change', function (e) {
  const dns = {
    kahf: { primary: '193.148.18.2', secondary: '193.148.18.3' },
    cleanbrowsing: { primary: '185.228.168.168', secondary: '185.228.169.168' }
  };
  const selected = dns[e.target.value];
  document.getElementById('dnsPrimary').value = selected.primary;
  document.getElementById('dnsSecondary').value = selected.secondary;
});

document.getElementById('routerIP').addEventListener('input', function (e) {
  document.getElementById('routerNextBtn').disabled =
    !e.target.value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
});

document.getElementById('confirmGenerate').addEventListener('click', generatePassword);
