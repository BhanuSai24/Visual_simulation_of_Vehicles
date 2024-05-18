// AddScenario.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./AddScenario.css"; // Import the CSS for styling

function AddScenario({ setScenarios }) {
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioTime, setScenarioTime] = useState("");
  const [message, setMessage] = useState(""); // State to manage success message
  const navigate = useNavigate();

  const handleAdd = async () => {
    // Check if scenarioName and scenarioTime are not empty
    if (!scenarioName || !scenarioTime) {
      console.error('Scenario name and time are required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3030/api/scenarios', { name: scenarioName, time: scenarioTime });
      if (response.status === 201) {
        setMessage('Scenario added successfully'); // Set success message
        setTimeout(() => {
          navigate('/all-scenarios'); // Redirect to home page after adding
        }, 1000);
        // Update the list of scenarios after adding
        setScenarios(prevScenarios => [
          ...prevScenarios,
          { id: response.data.id, name: scenarioName, time: scenarioTime, vehicles: 1 }
        ]);
      } else {
        console.error('Failed to add scenario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleReset = () => {
    setScenarioName("");
    setScenarioTime("");
  };

  const handleGoBack = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="add-scenario">
      <p>Scenario/Add</p>
      <h2>Add Scenario</h2>
      <div className="scenario-box">
        <div className="input-group">
          <label htmlFor="scenarioName">Scenario Name:</label>
          <input
            type="text"
            id="scenarioName"
            required
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="scenarioTime">Scenario Time (seconds):</label>
          <input
            type="number"
            id="scenarioTime"
            required
            value={scenarioTime}
            onChange={(e) => setScenarioTime(e.target.value)}
          />
        </div>
      </div>
      {message && <p className="success-message">{message}</p>} {/* Display success message if available */}
      <div className="button-group">
        <button className="add-button" onClick={handleAdd}>Add</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
        <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
}

export default AddScenario;
