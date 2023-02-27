import { useState } from "react";
import { postFeature } from "../util/api";

// const STEP_TYPES = {0: "Given", 1: "When", 2: "Then"}

const CreateFeature = () => {
  const [featureName, setFeatureName] = useState("");
  const [scenarios, setScenarios] = useState([]);

  const saveFeature = async () => {
    let feature_data = { name: featureName, scenarios: scenarios };
    let response = await postFeature(feature_data);
    console.log(response);
  };

  const addScenario = () => {
    setScenarios((oldScenarios) => [...oldScenarios, { name: "", steps: [] }]);
    console.log(scenarios);
  };

  const updateScenarioName = (name, idx) => {
    let oldScenarios = [...scenarios];
    oldScenarios[idx].name = name;
    setScenarios(oldScenarios);

    console.log(scenarios);
  };

  const addStep = (idx) => {
    let oldScenarios = [...scenarios];
    let steps = oldScenarios[idx].steps;
    steps.push({ type: "Given", name: "" });
    setScenarios(oldScenarios);
  };

  const updateStepType = (type, scenario, step) => {
    let oldScenarios = [...scenarios];
    let steps = oldScenarios[scenario].steps;
    steps[step].type = type;
    setScenarios(oldScenarios);
  };

  const updateStepName = (name, scenario, step) => {
    let oldScenarios = [...scenarios];
    let steps = oldScenarios[scenario].steps;
    steps[step].name = name;
    setScenarios(oldScenarios);
  };

  return (
    <div>
      <input
        type="text"
        className={"form-input"}
        placeholder="Feature Name"
        value={featureName}
        onChange={(e) => setFeatureName(e.target.value)}
      />
      <button onClick={() => addScenario()}>Add Scenario</button>
      {scenarios.map((scenario, scenario_idx) => (
        <div>
          <input
            type="text"
            className={"form-input"}
            value={scenario.name}
            onChange={(e) => updateScenarioName(e.target.value, scenario_idx)}
            placeholder="Scenario Name"
          />
          <button onClick={() => addStep(scenario_idx)}>Add Step</button>
          {scenario.steps.map((step, step_idx) => (
            <div>
              <select
                defaultValue={step.type}
                onChange={(e) =>
                  updateStepType(e.target.value, scenario_idx, step_idx)
                }
              >
                <option value="Given">Given</option>
                <option value="When">When</option>
                <option value="Then">Then</option>
              </select>
              <input
                type="text"
                className={"form-input"}
                placeholder="Step"
                onChange={(e) =>
                  updateStepName(e.target.value, scenario_idx, step_idx)
                }
              />
            </div>
          ))}
        </div>
      ))}
      <br />
      <button onClick={() => saveFeature()}>Save</button>
    </div>
  );
};

export default CreateFeature;
