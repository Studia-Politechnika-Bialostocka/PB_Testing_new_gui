from flask import Blueprint, request
from marshmallow import Schema, ValidationError, fields, validate, validates

from services.feature_service import FeatureService

features = Blueprint("features", __name__)


class StepSchema(Schema):
    step_type = fields.String(required=True, data_key="type")
    name = fields.String(required=True, validate=validate.Regexp(r"^[a-zA-Z0-9_\- ]+$"))

    @validates("step_type")
    def validate_step_type(self, value):
        if value.lower() not in ["given", "when", "then"]:
            raise ValidationError("Step type must be one of 'Given', 'When', 'Then'")


class ScenarioSchema(Schema):
    name = fields.String(required=True, validate=validate.Regexp(r"^[a-zA-Z0-9_\- ]+$"))
    steps = fields.List(fields.Nested(StepSchema), required=True)


class FeatureSchema(Schema):
    name = fields.String(required=True, validate=validate.Regexp(r"^[a-zA-Z0-9 ]+$"))
    scenarios = fields.List(fields.Nested(ScenarioSchema), required=True)


@features.route("/features", methods=["POST"])
def create_feature():
    feature_data = request.get_json()
    errors = FeatureSchema().validate(feature_data)
    if errors:
        return {"errors": errors}, 400

    FeatureService().create_feature(feature_data)
    return {}


@features.route("/features", methods=["PUT"])
def update_feature():
    feature_data = request.get_json()
    errors = FeatureSchema().validate(feature_data)
    if errors:
        return {"errors": errors}, 400

    FeatureService().update_feature(feature_data)
    return {}


@features.route("/features/<string:name>", methods=["GET"])
def get_feature(name: str):
    feature_name = name.replace("-", " ")
    feature_data = FeatureService().get_feature(feature_name)
    return {"feature_data": feature_data}


@features.route("/features", methods=["GET"])
def get_feature_list():
    feature_list = FeatureService().get_feature_list()
    return {"feature_list": feature_list}
