import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StepCreator from "./components/step_creator";
import MainScreen from "./components/main_screen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/step-creator" element={<StepCreator />} />
    </Routes>
  );
}

export default App;
