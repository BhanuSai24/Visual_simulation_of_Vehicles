import React, { useState, useEffect } from "react";
import "./GraphSection.css";

const GraphSection = ({ vehiclesData }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Generate initial vehicles with unique colors
    const initialVehicles = vehiclesData.map((vehicle) => ({
      ...vehicle,
      color: getRandomColor(), // Assign a unique color to each vehicle
    }));
    setVehicles(initialVehicles);

    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          let newX = vehicle.position_x;
          let newY = vehicle.position_y;

          // Calculate distance to move per update (assuming 1 update per second)
          const distancePerUpdate = vehicle.speed;

          // Update position based on direction
          switch (vehicle.direction) {
            case "towards":
              newX += distancePerUpdate;
              break;
            case "backwards":
              newX -= distancePerUpdate;
              break;
            case "upwards":
              newY += distancePerUpdate; // Moving upwards means decreasing Y
              break;
            case "downwards":
              newY -= distancePerUpdate; // Moving downwards means increasing Y
              break;
            default:
              break;
          }

          // Ensure the vehicle stays within bounds
          newX = Math.max(0, Math.min(newX, 915));
          newY = Math.max(0, Math.min(newY, 375));

          return { ...vehicle, position_x: newX, position_y: newY };
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [vehiclesData]);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Initialize minimum and maximum coordinates
  const minX = 0;
  const minY = 0;
  const maxX = 915;
  const maxY = 375;

  // Calculate the width and height of the graph area
  const graphWidth = maxX - minX; // Remove padding to fit exactly
  const graphHeight = maxY - minY;

  // Define the number of horizontal and vertical lines
  const numHorizontalLines = 10;
  const numVerticalLines = 18;

  // Calculate the spacing between lines
  const horizontalSpacing = graphHeight / numHorizontalLines;
  const verticalSpacing = graphWidth / numVerticalLines;

  return (
    <div className="graph-section">
      <div className="graph-area">
        {/* Generate horizontal lines */}
        {[...Array(numHorizontalLines)].map((_, index) => (
          <div
            key={`horizontal-line-${index}`}
            className="graph-line horizontal"
            style={{ top: index * horizontalSpacing }}
          ></div>
        ))}
        {/* Generate vertical lines */}
        {[...Array(numVerticalLines)].map((_, index) => (
          <div
            key={`vertical-line-${index}`}
            className="graph-line vertical"
            style={{ left: index * verticalSpacing }}
          ></div>
        ))}
        {/* Render vehicles */}
        {vehicles.map((vehicle) => {
          // Calculate the position of the vehicle relative to the graph area
          const vehicleX = vehicle.position_x - minX;
          const vehicleY = vehicle.position_y - minY;

          // Check if the vehicle position is within the visible area (0 to 835, 0 to 375)
          if (vehicleX >= 0 && vehicleX <= 915 && vehicleY >= 0 && vehicleY <= 375) {
            return (
              <div
                key={vehicle.id}
                className="vehicle"
                style={{ transform: `translate(${vehicleX}px, 0)`, bottom: `${vehicleY}px` }}
              >
                <div className="vehicle-circle" style={{ backgroundColor: vehicle.color }}>
                  {vehicle.id}
                </div>
              </div>
            );
          } else {
            return null; // Exclude vehicles outside the visible area
          }
        })}
      </div>
    </div>
  );
};

export default GraphSection;
