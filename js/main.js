// router.js — Load router selector from routers.json
document.addEventListener('DOMContentLoaded', function () {
  const dropdownContainer = document.getElementById('routerDropdown');
  if (!dropdownContainer) return;

  fetch('data/routers.json')
    .then(response => response.json())
    .then(routers => {
      const select = document.createElement('select');
      select.className = 'form-select mt-2';
      select.innerHTML = `<option value="">Select your router</option>` +
        routers.map((r, i) => `<option value="${i}">${r.brand} ${r.model}</option>`).join('');

      const infoBox = document.createElement('div');
      infoBox.id = 'routerWarning';
      infoBox.className = 'alert alert-warning mt-2 d-none';

      select.addEventListener('change', (e) => {
        const selected = routers[e.target.value];
        if (!selected) return;
        
        document.getElementById('routerIP').value = selected.ip || '';
        document.getElementById('routerNextBtn').disabled = !!selected.ip;

        if (selected.dns_support === false) {
          infoBox.textContent = selected.workaround || 'This router may not support DNS changes. Set DNS per device.';
          infoBox.classList.remove('d-none');
        } else {
          infoBox.classList.add('d-none');
        }
      });

      dropdownContainer.appendChild(select);
      dropdownContainer.appendChild(infoBox);
    })
    .catch(err => {
      dropdownContainer.innerHTML = '<div class="alert alert-danger">⚠️ Failed to load router list.</div>';
      console.error('Router DB fetch failed:', err);
    });
});
