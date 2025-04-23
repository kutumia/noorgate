// Router Detection Logic
async function detectRouter() {
    const commonIPs = ['192.168.1.1', '192.168.0.1', '10.0.0.1'];
    const routerIP = document.getElementById('routerIP');
    
    for (const ip of commonIPs) {
      if (await isRouterReachable(ip)) {
        routerIP.value = ip;
        document.getElementById('routerNextBtn').disabled = false;
        return;
      }
    }
    alert('⚠️ Could not auto-detect router. Enter manually.');
  }
  
  async function isRouterReachable(ip) {
    try {
      const response = await fetch(`http://${ip}`, { 
        method: 'HEAD', 
        mode: 'no-cors',
        cache: 'no-store'
      });
      return true;
    } catch {
      return false;
    }
  }