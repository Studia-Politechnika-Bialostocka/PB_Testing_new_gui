import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StepCreator from "./components/step_creator";
import ChoiceScreen from "./components/choice_screen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ChoiceScreen
            choices={{
              "Feature Files": "/feature-files",
              "Implementation": "/implementation",
              "Step Creator": "/step-creator",
            }}
          />
        }
      />
      <Route
        path="/feature-files"
        element={
          <ChoiceScreen
            choices={{
              "Create": "/feature-files/create",
              "Edit": "/feature-files/edit",
            }}
          />
        }
      />
      <Route path="/step-creator" element={<StepCreator />} />
    </Routes>
  );
}

export default App;
