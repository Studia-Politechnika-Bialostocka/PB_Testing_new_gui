import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StepCreator from "./components/step_creator";
import ChoiceScreen from "./components/choice_screen";
import CreateFeature from "./components/create_feature";

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
      <Route path="/feature-files/create" element={<CreateFeature />} />
      <Route path="/feature-files/edit/:feature_name" element={<CreateFeature />} />
      <Route path="/step-creator" element={<StepCreator />} />
    </Routes>
  );
}

export default App;
