// ParentComponent.js
import React, { useState } from "react";
import AddScenario from "./AddScenario";
import AllScenarios from "./AllScenarios";

function ParentComponent() {
  const [scenarios, setScenarios] = useState([]);

  return (
    <div>
      <AddScenario setScenarios={setScenarios} />
      <AllScenarios scenarios={scenarios} setScenarios={setScenarios} />
    </div>
  );
}

export default ParentComponent;
