import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddVehicle.css"; // Import the CSS for styling
import axios from 'axios';

function AddVehicle() {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [speed, setSpeed] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [direction, setDirection] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [positionXError, setPositionXError] = useState("");
  const [positionYError, setPositionYError] = useState("");
  const navigate = useNavigate();

  // Define the range for X and Y positions
  const MIN_X = 0;
  const MAX_X = 915;
  const MIN_Y = 0;
  const MAX_Y = 375;

  useEffect(() => {
    fetchScenarios();
  }, []); // Empty dependency array to ensure the effect runs only once

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/scenarios');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const handleAdd = async () => {
    if (isAdding) return; // Prevent multiple submissions

    // Validate input fields
    if (!selectedScenario || !vehicleName || !speed || !positionX || !positionY || !direction) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate position range
    let isValid = true;

    if (positionX < MIN_X || positionX > MAX_X) {
      setPositionXError(`Position X must be between ${MIN_X} and ${MAX_X}.`);
      isValid = false;
    } else {
      setPositionXError("");
    }

    if (positionY < MIN_Y || positionY > MAX_Y) {
      setPositionYError(`Position Y must be between ${MIN_Y} and ${MAX_Y}.`);
      isValid = false;
    } else {
      setPositionYError("");
    }

    if (!isValid) {
      return;
    }

    try {
      // Disable the "Add" button
      setIsAdding(true);

      const response = await axios.post('http://localhost:3030/api/vehicles', {
        scenario: selectedScenario,
        vehicleName: vehicleName,
        speed: speed,
        positionX: positionX,
        positionY: positionY,
        direction: direction
      });

      if (response.status === 201) {
        setSuccessMessage("Vehicle Added Successfully"); // Set success message
        // Clear form fields after successful addition
        setSelectedScenario("");
        setVehicleName("");
        setSpeed("");
        setPositionX("");
        setPositionY("");
        setDirection("");

        // Navigate to another page after 2 seconds
        setTimeout(() => {
          navigate('/'); // Replace with the desired path
        }, 1000);
      } else {
        console.error("Failed to add vehicle");
        // Handle the error, such as showing an error message to the user
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      // Handle the error, such as showing an error message to the user
    } finally {
      // Re-enable the "Add" button
      setIsAdding(false);
    }
  };

  const handleGoBack = () => {
    navigate("/", { replace: true }); // Navigate to the home page and replace the current entry in history
  };

  const handleReset = () => {
    setSelectedScenario("");
    setVehicleName("");
    setSpeed("");
    setPositionX("");
    setPositionY("");
    setDirection("");
    setSuccessMessage(""); // Clear the success message
    setPositionXError(""); // Clear the position error message
    setPositionYError(""); // Clear the position error message
  };

  return (
    <div className="add-vehicle-container">
      <h2>Add Vehicle</h2>
      <div className="vehicle-box">
        <div className="vehicle-input-fields">
          <div className="vehicle-input-group">
            <label htmlFor="scenario">Scenario:</label>
            <select
              id="scenario"
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
            >
              <option value="">Select Scenario</option>
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.name}>{scenario.name}</option>
              ))}
            </select>
          </div>
          <div className="vehicle-input-group">
            <label htmlFor="vehicleName">Vehicle Name:</label>
            <input
              type="text"
              id="vehicleName"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            />
          </div>
          <div className="vehicle-input-group">
            <label htmlFor="speed">Speed:</label>
            <input
              type="number"
              id="speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
        </div>
        <div className="vehicle-input-fields">
          <div className="vehicle-input-group">
            <label htmlFor="positionX">Position X:</label>
            <input
              type="number"
              id="positionX"
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
            />
            {positionXError && <div className="error-message">{positionXError}</div>}
          </div>
          <div className="vehicle-input-group">
            <label htmlFor="positionY">Position Y:</label>
            <input
              type="number"
              id="positionY"
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
            />
            {positionYError && <div className="error-message">{positionYError}</div>}
          </div>
          <div className="vehicle-input-group">
            <label htmlFor="direction">Direction:</label>
            <select
              id="direction"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="">Select Direction</option>
              <option value="towards">Towards</option>
              <option value="backwards">Backwards</option>
              <option value="upwards">Upwards</option>
              <option value="downwards">Downwards</option>
            </select>
          </div>
        </div>
      </div>
      <div className="vehicle-button-group">
        <button className="vehicle-add-button" onClick={handleAdd} disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add'}
        </button>
        <button className="vehicle-reset-button" onClick={handleReset}>Reset</button>
        <button className="vehicle-go-back-button" onClick={handleGoBack}>Go Back</button>
      </div>
      
      {/* Display success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default AddVehicle;