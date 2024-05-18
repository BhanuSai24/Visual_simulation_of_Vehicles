import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AllScenarios.css"; // Import the CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

function AllScenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [editingScenario, setEditingScenario] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", time: "", vehicles: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    fetchScenarios();
  }, []); // Empty dependency array to ensure the effect runs only once

  const fetchScenarios = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/scenarios');
      const scenariosWithVehicleCounts = await Promise.all(response.data.map(async (scenario) => {
        const vehiclesResponse = await axios.get(`http://localhost:3030/api/vehicles?scenario=${scenario.name}`);
        return { ...scenario, vehicles: vehiclesResponse.data.length };
      }));
      setScenarios(scenariosWithVehicleCounts);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const handleAddScenario = () => {
    navigate('/add-scenario');
  };

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  const handleEditScenario = (scenario) => {
    setEditingScenario(scenario.id);
    setEditForm({ name: scenario.name, time: scenario.time, vehicles: scenario.vehicles });
  };

  const handleCancelEdit = () => {
    setEditingScenario(null);
  };

  const handleSaveEdit = async (scenarioId) => {
    try {
      const response = await axios.put(`http://localhost:3030/api/scenarios/${scenarioId}`, editForm);
      if (response.status === 200) {
        // Update the scenario details in the UI
        setScenarios(prevScenarios => {
          return prevScenarios.map(scenario => {
            if (scenario.id === scenarioId) {
              return { ...scenario, ...editForm };
            } else {
              return scenario;
            }
          });
        });
        // Reset editing state
        setEditingScenario(null);
      }
    } catch (error) {
      console.error('Error saving scenario:', error);
    }
  };

  const handleDeleteScenario = async (scenarioId) => {
    try {
      const response = await axios.delete(`http://localhost:3030/api/scenarios/${scenarioId}`);
      if (response.status === 200) {
        // Remove the scenario from the state
        setScenarios(prevScenarios => prevScenarios.filter(scenario => scenario.id !== scenarioId));
      }
    } catch (error) {
      console.error('Error deleting scenario:', error);
    }
  };

  const handleDeleteAllScenario = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all scenarios? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const response = await axios.delete('http://localhost:3030/api/scenarios');
        if (response.status === 200) {
          // Clear the scenarios state to update the UI
          setScenarios([]);
        }
      } catch (error) {
        console.error('Error deleting all scenarios:', error);
      }
    }
  };

  return (
    <div className="all-scenarios">
      <div className="header">
        <h2>All Scenarios</h2>
        <div className="button-group">
          <button onClick={handleAddScenario} className="new-scenario">New Scenario</button>
          <button onClick={handleAddVehicle} className="add-vehicle">Add Vehicle</button>
          <button onClick={handleDeleteAllScenario} className="delete-all">Delete All</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Add Vehicle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id}>
              {editingScenario === scenario.id ? (
                <>
                  <td>{scenario.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editForm.vehicles}
                      onChange={(e) => setEditForm({ ...editForm, vehicles: parseInt(e.target.value) })}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faSave} onClick={() => handleSaveEdit(scenario.id)} className="action-icon save-icon" />
                    <FontAwesomeIcon icon={faTimes} onClick={handleCancelEdit} className="action-icon cancel-icon" />
                  </td>
                </>
              ) : (
                <>
                  <td>{scenario.id}</td>
                  <td>{scenario.name}</td>
                  <td>{scenario.time}</td>
                  <td>{scenario.vehicles}</td>
                  <td>
                    <FontAwesomeIcon icon={faPlus} className="add-vehicle-symbol" onClick={handleAddVehicle} />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditScenario(scenario)} className="table-symbol" />
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteScenario(scenario.id)} className="table-symbol" />
                  </td>
                </>
              )}
            </tr>
          ))}
          {scenarios.length === 0 && (
            <tr>
              <td colSpan="7">No scenarios available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllScenarios;
