import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeatureData, updateFeature, postFeature } from "../util/api";
import "./create_feature.css";

const errorCodes = {
  0: "Feature name cannot be empty and may only contain alphanumeric characters and spaces",
  1: "Scenario names cannot be empty and may only contain alphanumeric characters along with - and _",
  2: "Step names cannot be empty may only contain alphanumeric characters, spaces, -, and _",
};

const CreateFeature = () => {
  const [featureName, setFeatureName] = useState("");
  const [scenarios, setScenarios] = useState([]);
  const [invalidFeature, setInvalidFeature] = useState(false);
  const [invalidScenarios, setInvalidScenarios] = useState(new Set());
  const [invalidSteps, setInvalidSteps] = useState(new Set());
  const [errors, setErrors] = useState(new Set());
  const { feature_param } = useParams();

  useEffect(() => {
    if (!!feature_param) {
      const getFeature = async () => {
        let response = await getFeatureData(feature_param);
        let feature = response.feature_data;
        setFeatureName(feature.name.replaceAll("_", " "));
        setScenarios(feature.scenarios);
      };
      getFeature();
    }
  }, []);

  const saveFeature = async () => {
    let feature_data = { name: featureName, scenarios: scenarios };
    if (!!feature_param) {
      await updateFeature(feature_data);
      return;
    }
    await postFeature(feature_data);
  };

  const updateErrorCodes = () => {
    if (invalidFeature) setErrors((prev) => new Set(prev.add(0)));
    else errors.has(0) && removeFromSet(setErrors, 0);

    if (invalidScenarios.size) setErrors((prev) => new Set(prev.add(1)));
    else errors.has(1) && removeFromSet(setErrors, 1);

    if (invalidSteps.size) setErrors((prev) => new Set(prev.add(2)));
    else errors.has(2) && removeFromSet(setErrors, 2);
    console.log(errors);
  };

  const updateFeatureName = (name) => {
    let pattern = /^[a-zA-Z0-9 ]+$/;
    if (!pattern.test(name)) {
      setInvalidFeature(true);
      setErrors((prev) => new Set(prev.add(0)));
    } else if (invalidFeature) {
      setInvalidFeature(false);
      errors.has(0) && removeFromSet(setErrors, 0);
    }
    setFeatureName(name);
    updateErrorCodes();
  };

  const addScenario = () => {
    setScenarios((oldScenarios) => [...oldScenarios, { name: "", steps: [] }]);
    console.log(scenarios);
  };

  const updateScenarioName = (name, idx) => {
    let pattern = /^[a-zA-Z0-9_\- ]+$/;
    if (!pattern.test(name)) {
      setInvalidScenarios((prev) => new Set(prev.add(idx)));
    } else if (invalidScenarios.has(idx))
      removeFromSet(setInvalidScenarios, idx);
    let oldScenarios = [...scenarios];
    oldScenarios[idx].name = name;
    setScenarios(oldScenarios);
    updateErrorCodes();
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
    let pattern = /^[a-zA-Z0-9_\- ]+$/;
    if (!pattern.test(name)) {
      setInvalidSteps((prev) => new Set(prev.add(`${scenario},${step}`)));
    } else if (invalidSteps.has(`${scenario},${step}`))
      removeFromSet(setInvalidSteps, `${scenario},${step}`);
    let oldScenarios = [...scenarios];
    let steps = oldScenarios[scenario].steps;
    steps[step].name = name;
    setScenarios(oldScenarios);
    updateErrorCodes();
  };

  const removeFromSet = (setSet, el) => {
    setSet((prev) => new Set([...prev].filter((x) => x != el)));
  };

  return (
    <div>
      <input
        type="text"
        className={`form-input ${invalidFeature ? "input-error" : ""}`}
        placeholder="Feature Name"
        value={featureName}
        onInput={(e) => updateFeatureName(e.target.value)}
        disabled={!!feature_param}
      />
      <button onClick={() => addScenario()}>Add Scenario</button>
      {scenarios.map((scenario, scenario_idx) => (
        <div>
          <input
            type="text"
            className={`form-input ${
              invalidScenarios.has(scenario_idx) ? "input-error" : ""
            }`}
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
                className={`form-input ${
                  invalidSteps.has(`${scenario_idx},${step_idx}`)
                    ? "input-error"
                    : ""
                }`}
                placeholder="Step"
                value={step.name}
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
