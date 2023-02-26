import { Link } from "react-router-dom";
import "./choice_screen.css";

export default function ChoiceScreen(props) {
  const choices = props.choices;
  return (
    <div id="choice-container">
      {Object.keys(choices).map((choice) => (
        <Link class="link-choice" to={choices[choice]}>
          {choice}
        </Link>
      ))}
    </div>
  );
}
