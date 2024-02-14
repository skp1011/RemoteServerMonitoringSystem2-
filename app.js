// app.js
document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    const cpuUsageElement = document.getElementById('cpuUsage');
    const memoryUsageElement = document.getElementById('memoryUsage');
    const diskUsageElement = document.getElementById('diskUsage');
  
    // Fetch server status and metrics from the API
    fetch('/status')
      .then(response => response.json())
      .then(data => {
        statusElement.textContent = data.status;
        cpuUsageElement.textContent = (data.cpuUsage * 100).toFixed(2) + '%';
        memoryUsageElement.textContent = (data.memoryUsage * 100).toFixed(2) + '%';
        diskUsageElement.textContent = (data.diskUsage * 100).toFixed(2) + '%';
      })
      .catch(error => {
        console.error('Error fetching server status and metrics:', error);
        statusElement.textContent = 'Error';
      });
  });
  