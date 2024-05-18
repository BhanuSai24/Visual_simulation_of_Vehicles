import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Optional: to style the sidebar

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract the pathname from the location object
    const { pathname } = location;
    // Set the active item based on the pathname
    switch (pathname) {
      case "/":
        setActiveItem(0);
        break;
      case "/add-scenario":
        setActiveItem(1);
        break;
      case "/all-scenarios":
        setActiveItem(2);
        break;
      case "/add-vehicle":
        setActiveItem(3);
        break;
      default:
        setActiveItem(null);
    }
  }, [location]); // Run this effect whenever the location changes

  return (
    <div className="sidebar">
      <ul>
        <li className={activeItem === 0 ? 'active' : ''}><Link to="/">Home</Link></li>
        <li className={activeItem === 1 ? 'active' : ''}><Link to="/add-scenario">Add Scenario</Link></li>
        <li className={activeItem === 2 ? 'active' : ''}><Link to="/all-scenarios">All Scenarios</Link></li>
        <li className={activeItem === 3 ? 'active' : ''}><Link to="/add-vehicle">Add Vehicle</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
