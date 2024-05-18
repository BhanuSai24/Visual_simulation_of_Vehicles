const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Enter your MySQL password here
  database: 'vehicle_management' // Database name
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route to add a new scenario
app.post('/api/scenarios', (req, res) => {
  const { name, time } = req.body; // Extract name and time from request body
  const vehicles = 0; // Default number of vehicles
  const sql = 'INSERT INTO scenarios (name, time, vehicles) VALUES (?, ?, ?)';
  connection.query(sql, [name, time, vehicles], (err, result) => {
    if (err) {
      console.error('Error adding scenario:', err);
      res.status(500).send('Error adding scenario. Please try again later.');
      return;
    }
    console.log('Scenario added successfully!');
    res.status(201).json({ message: 'Scenario added successfully' });
  });
});
// Route to add a new vehicle
app.post('/api/vehicles', (req, res) => {
    const { scenario, vehicleName, speed, positionX, positionY, direction } = req.body;
    const sql = 'INSERT INTO vehicles (scenario, vehicle_name, speed, position_x, position_y, direction) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [scenario, vehicleName, speed, positionX, positionY, direction], (err, result) => {
      if (err) {
        console.error('Error adding vehicle:', err);
        res.status(500).send('Error adding vehicle. Please try again later.');
        return;
      }
      console.log('Vehicle added successfully!');
      res.status(201).json({ message: 'Vehicle added successfully' });
    });
  });
  

// Route to update scenario details
app.put('/api/scenarios/:id', (req, res) => {
  const scenarioId = req.params.id;
  const { name, time, vehicles } = req.body;
  const sql = 'UPDATE scenarios SET name = ?, time = ?, vehicles = ? WHERE id = ?';
  connection.query(sql, [name, time, vehicles, scenarioId], (err, result) => {
    if (err) {
      console.error('Error updating scenario:', err);
      res.status(500).send('Error updating scenario. Please try again later.');
      return;
    }
    console.log('Scenario updated successfully');
    res.status(200).send('Scenario updated successfully');
  });
});



// Route to get all scenarios
app.get('/api/scenarios', (req, res) => {
  const sql = 'SELECT * FROM scenarios';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching scenarios:', err);
      res.status(500).send('Error fetching scenarios. Please try again later.');
      return;
    }
    res.status(200).json(results);
  });
});
// Route to get all vehicles for a specific scenario
app.get('/api/vehicles', (req, res) => {
  const { scenario } = req.query;
  const sql = 'SELECT * FROM vehicles WHERE scenario = ?';
  connection.query(sql, [scenario], (err, results) => {
    if (err) {
      console.error('Error fetching vehicles:', err);
      res.status(500).send('Error fetching vehicles. Please try again later.');
      return;
    }
    res.status(200).json(results);
  });
});

// Route to delete all scenarios
app.delete('/api/scenarios', (req, res) => {
  const sql = 'DELETE FROM scenarios';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error deleting all scenarios:', err);
      res.status(500).send('Error deleting all scenarios. Please try again later.');
      return;
    }
    console.log('All scenarios deleted successfully');
    res.status(200).send('All scenarios deleted successfully');
  });
});

// Route to delete a specific scenario by its ID
app.delete('/api/scenarios/:id', (req, res) => {
    const scenarioId = req.params.id;
    const sql = 'DELETE FROM scenarios WHERE id = ?';
    connection.query(sql, [scenarioId], (err, result) => {
      if (err) {
        console.error('Error deleting scenario:', err);
        res.status(500).send('Error deleting scenario. Please try again later.');
        return;
      }
      console.log('Scenario deleted successfully');
      res.status(200).send('Scenario deleted successfully');
    });
  });


// Route to delete a vehicle by its ID
app.delete('/api/vehicles/:id', (req, res) => {
  const vehicleId = req.params.id;
  const sql = 'DELETE FROM vehicles WHERE id = ?';
  connection.query(sql, [vehicleId], (err, result) => {
    if (err) {
      console.error('Error deleting vehicle:', err);
      res.status(500).send('Error deleting vehicle');
      return;
    }
    console.log('Vehicle deleted successfully');
    res.status(200).send('Vehicle deleted successfully');
  });
});

// Route to update a vehicle by its ID
app.put('/api/vehicles/:id', (req, res) => {
  const vehicleId = req.params.id;
  const { vehicle_name, position_x, position_y, speed, direction } = req.body;
  const sql = 'UPDATE vehicles SET vehicle_name = ?, position_x = ?, position_y = ?, speed = ?, direction = ? WHERE id = ?';
  connection.query(sql, [vehicle_name, position_x, position_y, speed, direction, vehicleId], (err, result) => {
    if (err) {
      console.error('Error updating vehicle:', err);
      res.status(500).send('Error updating vehicle');
      return;
    }
    console.log('Vehicle updated successfully');
    res.status(200).send('Vehicle updated successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
