function goToTab(tabId) {
    const tab = new bootstrap.Tab(document.getElementById(tabId));
    tab.show();
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('✅ Service Worker Registered'))
      .catch(err => console.error('❌ SW Error:', err));
  }
  