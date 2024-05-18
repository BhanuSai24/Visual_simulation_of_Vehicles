// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home"; 
import AddScenario from "./Components/AddScenario";
import AllScenarios from "./Components/AllScenarios";
import AddVehicle from "./Components/AddVehicle";
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-scenario" element={<AddScenario />} />
            <Route path="/all-scenarios" element={<AllScenarios />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
