const express = require('express');
const mysql = require('mysql2');
const os = require('os');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jai121$$',
  database: 'server_monitoring',
});

connection.connect();

// API endpoint to get server status
app.get('/status', (req, res) => {
  // Fetch server metrics
  const metrics = {
    status: 'ok',
    cpuUsage: getCpuUsage(),
    memoryUsage: getMemoryUsage(),
    diskUsage: getDiskUsage(),
  };

  // Save metrics to the database
  saveMetricsToDatabase(metrics);

  // Send metrics as JSON response
  res.json(metrics);
});

// API endpoint to get server metrics from the database
app.get('/metrics', (req, res) => {
  // Retrieve metrics from the database
  connection.query('SELECT * FROM server_status', (error, results) => {
    if (error) {
      console.error('Error fetching metrics from database:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Send metrics as JSON response
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function getCpuUsage() {
  // Implement logic to get CPU usage
  return os.loadavg()[0]; // Example: return the 1-minute load average
}

function getMemoryUsage() {
  // Implement logic to get memory usage
  return 1 - os.freemem() / os.totalmem(); // Example: return the used memory percentage
}

function getDiskUsage() {
  // Implement logic to get disk usage
  // This is a simplified example; you may want to use a library like 'diskusage'
  const diskUsage = os.freemem() / os.totalmem();
  return diskUsage;
}

function saveMetricsToDatabase(metrics) {
  const query = 'INSERT INTO server_status (status, cpu_usage, memory_usage, disk_usage) VALUES (?, ?, ?, ?)';
  const values = [metrics.status, metrics.cpuUsage, metrics.memoryUsage, metrics.diskUsage];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving metrics to database:', error);
    } else {
      console.log('Metrics saved to database:', results);
    }
  });
}
