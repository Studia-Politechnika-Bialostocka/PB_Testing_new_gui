import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFeatureList } from "../util/api";
import "./feature_list.css"

const FeatureList = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const getFeatures = async () => {
      let response = await getFeatureList();
      let features = response.feature_list;
      setFeatures(features);
    };
    getFeatures();
  }, []);
  return (
    <div id="fl-container">
      {features.map((feature) => (
        <Link
          class="fl-choice"
          to={`/feature-files/edit/${feature.replace("_", "-")}`}
        >
          {feature}
        </Link>
      ))}
    </div>
  );
};

export default FeatureList;
