import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import GraphSection from "./GraphSection";

function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [vehiclesData, setVehiclesData] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    vehicle_name: '',
    position_x: '',
    position_y: '',
    speed: '',
    direction: ''
  });
  const [tableDimensions, setTableDimensions] = useState({ width: 0, height: 0 });
  const [simulationStarted, setSimulationStarted] = useState(false);

  useEffect(() => {
    fetchScenarios();
    updateTableDimensions();
    window.addEventListener('resize', updateTableDimensions);
    return () => {
      window.removeEventListener('resize', updateTableDimensions);
    };
  }, []);

  useEffect(() => {
    if (selectedScenario) {
      fetchVehicles(selectedScenario);
    } else {
      setVehiclesData([]);
    }
  }, [selectedScenario]);

  const updateTableDimensions = () => {
    const table = document.getElementById('vehicle-table');
    if (table) {
      const rect = table.getBoundingClientRect();
      setTableDimensions({ width: rect.width, height: rect.height });
    }
  };

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/scenarios');
      setScenarios(response.data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const fetchVehicles = async (scenarioName) => {
    try {
      const response = await axios.get(`http://localhost:3030/api/vehicles?scenario=${scenarioName}`);
      setVehiclesData(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleScenarioSelect = (event) => {
    setSelectedScenario(event.target.value);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/vehicles/${id}`);
      setVehiclesData(vehiclesData.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicleId(vehicle.id);
    setEditFormData({
      vehicle_name: vehicle.vehicle_name,
      position_x: vehicle.position_x,
      position_y: vehicle.position_y,
      speed: vehicle.speed,
      direction: vehicle.direction
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveEditVehicle = async (id) => {
    try {
      await axios.put(`http://localhost:3030/api/vehicles/${id}`, editFormData);
      setEditingVehicleId(null);

      // Refresh the page and open the same scenario
      const currentScenario = selectedScenario;
      setSelectedScenario(""); // Temporarily clear the selection to trigger the useEffect
      setTimeout(() => {
        setSelectedScenario(currentScenario); // Reset to the original scenario
      }, 0);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleStartSimulation = () => {
    setSimulationStarted(true);
    // Start simulation logic
  };

  const handleStopSimulation = () => {
    setSimulationStarted(false);
    // Stop simulation logic
  };

  return (
    <div className="home-page">
      <div className="scenario-section">
        <div className="scenario-select">
          <select value={selectedScenario} onChange={handleScenarioSelect}>
            <option value="">Select Scenario</option>
            {scenarios.map(scenario => (
              <option key={scenario.id} value={scenario.name}>{scenario.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="vehicle-section">
        <h2>Vehicle List</h2>
        <div className="table-section">
          <table id="vehicle-table">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Name</th>
                <th>Position X</th>
                <th>Position Y</th>
                <th>Speed</th>
                <th>Direction</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {vehiclesData.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.id}</td>
                  {editingVehicleId === vehicle.id ? (
                    <>
                      <td><input type="text" name="vehicle_name" value={editFormData.vehicle_name} onChange={handleFormChange} /></td>
                      <td><input type="number" name="position_x" value={editFormData.position_x} onChange={handleFormChange} /></td>
                      <td><input type="number" name="position_y" value={editFormData.position_y} onChange={handleFormChange} /></td>
                      <td><input type="number" name="speed" value={editFormData.speed} onChange={handleFormChange} /></td>
                      <td>
                        <select name="direction" value={editFormData.direction} onChange={handleFormChange}>
                          <option value="towards">Towards</option>
                          <option value="backwards">Backwards</option>
                          <option value="upwards">Upwards</option>
                          <option value="downwards">Downwards</option>
                        </select>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faSave} onClick={() => handleSaveEditVehicle(vehicle.id)} className="table-symbol" />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{vehicle.vehicle_name}</td>
                      <td>{vehicle.position_x}</td>
                      <td>{vehicle.position_y}</td>
                      <td>{vehicle.speed}</td>
                      <td>{vehicle.direction}</td>
                      <td>
                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEditVehicle(vehicle)} className="table-symbol" />
                      </td>
                    </>
                  )}
                  <td>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteVehicle(vehicle.id)} className="table-symbol" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="simulation-buttons">
          <button className="start-simulation" onClick={handleStartSimulation}>Start Simulation</button>
          <button className="stop-simulation" onClick={handleStopSimulation}>Stop Simulation</button>
        </div>
      </div>
      {simulationStarted && (
        <GraphSection vehiclesData={vehiclesData} tableDimensions={tableDimensions} />
      )}
    </div>
  );
}

export default HomePage;
