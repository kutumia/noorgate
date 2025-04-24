// Load router models from routers.json
fetch('data/routers.json')
  .then(res => res.json())
  .then(routers => {
    const dropdown = document.getElementById('routerDropdown');
    routers.forEach(router => {
      const option = document.createElement('option');
      option.value = router.model;
      option.textContent = `${router.brand} ${router.model}`;
      option.dataset.dns = router.dns_support;
      option.dataset.ip = router.ip || '';
      dropdown.appendChild(option);
    });
  });

document.getElementById('routerDropdown').addEventListener('change', (e) => {
  const selected = e.target.options[e.target.selectedIndex];
  const dnsSupported = selected.dataset.dns === "true";
  const ip = selected.dataset.ip;

  // Prefill router IP if known
  if (ip) document.getElementById('routerIP').value = ip;

  // Warn if DNS can't be changed
  const warning = document.getElementById('routerWarning');
  if (!dnsSupported) {
    warning.textContent = '⚠️ This router may not support DNS changes. Consider setting DNS on devices instead.';
  } else {
    warning.textContent = '';
  }

  // Enable Next if valid IP
  document.getElementById('routerNextBtn').disabled = !ip.match(/^\d{1,3}(\.\d{1,3}){3}$/);
});

// Auto-detect router IP (basic fallback only)
function detectRouter() {
  const commonIPs = ["192.168.1.1", "192.168.0.1", "10.0.0.1"];
  document.getElementById('routerIP').value = commonIPs[0]; // Simulate detection
  document.getElementById('routerNextBtn').disabled = false;
}

// Public
window.detectRouter = detectRouter;
