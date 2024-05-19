# Visual simulation of Vehicles 

### Project Overview:
The project aims to develop a visual simulation application using React.js for the frontend and Express.js for the backend. The application allows users to create, display, update, and delete scenarios and vehicles. A scenario can have multiple vehicles, and vehicles can be moved based on user input within a graph.

## Setup Instructions

### Prerequisites
- Node.js
- MySQL

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/BhanuSai24/Visual_simulation_of_Vehicles.git
   cd Visual_simulation_of_Vehicles



## Data Models

### Scenario
- **Scenario ID**: Unique identifier for the scenario.
- **Scenario Name**: Name of the scenario.
- **Time**: Duration of the scenario.

### Vehicle
- **Vehicle ID**: Unique identifier for the vehicle.
- **Vehicle Name**: Name of the vehicle.
- **Initial Position X**: Starting X-coordinate of the vehicle.
- **Initial Position Y**: Starting Y-coordinate of the vehicle.
- **Speed**: Speed of the vehicle.
- **Direction**: Movement direction of the vehicle (Towards, Backwards, Upwards, Downwards).

### Components Used:
1. **AddScenario**: This component allows users to add a new scenario with the scenario name and time.
2. **AllScenarios**: Displays all scenarios with their details and allows users to update or delete scenarios.
3. **AddVehicle**: Allows users to add a new vehicle with its details such as name, initial position (X, Y), speed, and direction.
4. **GraphSection**: Displays a graph where vehicles can move according to their parameters.
5. **Home**: Displays the home page where users can select a scenario, start the simulation, and view the graph.
6. **Sidebar**: Provides a navigation sidebar for easy access to different components.

### Implementation Details:
1. **Backend Setup**: Node.js server is created using Express.js to handle CRUD operations for scenarios and vehicles. Data is stored in JSON format and served via API endpoints.
2. **Frontend Development**: React.js is used to build the frontend interface. Components are created for each functionality, such as adding scenarios and vehicles, displaying data, and controlling the simulation.
3. **Data Management**: Data is managed using state in React components. When a user interacts with the frontend, API requests are made to the backend to fetch, update, create, or delete data.
4. **Simulation Logic**: When the user starts the simulation, vehicles are moved based on their speed and direction. The simulation continues until the scenario time is reached. Vehicles that go outside the graph container are hidden.
5. **Validation**: Proper validation is implemented, ensuring that users cannot add vehicles with positions greater than the graph container size.
6. **Deployment**: The application is deployed to a platform such as Vercel or Netlify. The code is also uploaded to a public GitHub repository, along with a README.md file explaining how to install and run the application. Additionally, the README.md provides a brief overview of the project and its functionalities.

## Features
- **CRUD Operations**: Create, read, update, and delete scenarios and vehicles.
- **Vehicle Movement**: Vehicles move based on their parameters when the user starts the simulation.
- **Validation**: Ensures vehicle positions do not exceed the container size.

### Vehicle Movement in the Graph:
1. Vehicles are represented as objects in the graph with initial positions (X, Y).
2. When the user starts the simulation, vehicles begin moving based on their speed and direction.
3. The simulation continues until the scenario time is reached.
4. If a vehicle reaches the boundary of the graph container, it is hidden from view.
5. Users can interact with the simulation by starting, stopping, or modifying the parameters of the vehicles.

### Summary:
The project is a full-stack application developed using React.js and Express.js. It allows users to create scenarios and vehicles, simulate their movement in a graph, and manage data through CRUD operations. The application is deployed to a platform for easy access and includes proper documentation for installation and usage.

