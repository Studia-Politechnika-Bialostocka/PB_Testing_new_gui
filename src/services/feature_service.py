from pathlib import Path


class FeatureService:
    def __init__(self) -> None:
        self.feature_dir = Path().parent / "features"

    def create_feature(self, feature_data):
        file_name = f"{feature_data['name'].replace(' ', '_')}.feature"
        file_path = self.feature_dir / file_name
        file = file_path.touch(exist_ok=False)
        file_path.write_text(self.__feature_from_dict(feature_data))

    def __feature_from_dict(self, feature_data):
        content = f"Feature: {feature_data['name']}\n"
        for scenario in feature_data["scenarios"]:
            content += f"  Scenario: {scenario['name']}\n"
            for step in scenario["steps"]:
                content += f"    {step['type']} {step['name']}\n"
        return content

    def __feature_to_dict(self, feature_data):
        pass
