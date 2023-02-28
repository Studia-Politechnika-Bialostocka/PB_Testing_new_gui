from pathlib import Path


class FeatureService:
    def __init__(self) -> None:
        self.feature_dir = Path().parent / "features"

    def create_feature(self, feature_data: dict):
        file_path = self.__get_file_path(feature_data["name"])
        file = file_path.touch(exist_ok=False)
        file_path.write_text(self.__feature_from_dict(feature_data))

    def get_feature(self, feature_name: str) -> dict:
        file_path = self.__get_file_path(feature_name)
        return self.__feature_to_dict(file_path)

    def get_feature_list(self) -> list:
        return [
            path.stem
            for path in self.feature_dir.glob("**/*")
            if path.is_file() and path.suffix == ".feature"
        ]

    def __get_file_path(self, feature_name: str):
        file_name = f"{feature_name.replace(' ', '_')}.feature"
        return self.feature_dir / file_name

    def __feature_from_dict(self, feature_data: dict):
        content = f"Feature: {feature_data['name']}\n"
        for scenario in feature_data["scenarios"]:
            content += f"  Scenario: {scenario['name']}\n"
            for step in scenario["steps"]:
                content += f"    {step['type']} {step['name']}\n"
        return content

    def __feature_to_dict(self, file_path: Path):
        data = {"name": "", "scenarios": []}
        with open(file_path, "r") as f:
            lines = f.readlines()
            data["name"] = self.__get_split_string(lines.pop(0), sep=":")

            scenario_idx = -1
            for line in lines:
                if self.__get_split_string(line, idx=0, sep=":") == "Scenario":
                    scenario_idx += 1
                    data["scenarios"].append(
                        {
                            "name": self.__get_split_string(line, sep=":"),
                            "steps": [],
                        }
                    )
                    continue
                step_type = self.__get_split_string(line, idx=0)
                step_name = self.__get_split_string(line)
                data["scenarios"][scenario_idx]["steps"].append(
                    {
                        "type": step_type,
                        "name": step_name,
                    }
                )
        return data

    def __get_split_string(self, string: str, idx: int = 1, sep: str = " "):
        return string.strip().split(sep)[idx].strip()
