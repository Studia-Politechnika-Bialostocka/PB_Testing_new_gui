from flask import Blueprint, request

from services.feature_service import FeatureService

features = Blueprint("features", __name__)


@features.route("/features", methods=["POST"])
def create_feature():
    feature_data = request.get_json()
    FeatureService().create_feature(feature_data)
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
