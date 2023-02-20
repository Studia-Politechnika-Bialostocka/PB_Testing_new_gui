import { Link } from "react-router-dom";
import "./main_screen.css";

export default function MainScreen() {
  return (
    <div id="choice-container">
      <div class="link-choice">Feature Files</div>
      <div class="link-choice">Implementation</div>
      <Link class="link-choice" to="/step-creator">
        Step Creator
      </Link>
    </div>
  );
}
