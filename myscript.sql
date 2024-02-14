-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS server_monitoring;

-- Switch to the created database
USE server_monitoring;

-- Create a table to store server metrics
CREATE TABLE IF NOT EXISTS server_status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(255),
  cpu_usage FLOAT,
  memory_usage FLOAT,
  disk_usage FLOAT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
