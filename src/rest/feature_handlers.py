from flask import Blueprint, request

from services.feature_service import FeatureService

features = Blueprint("features", __name__)


@features.route("/features", methods=["POST"])
def create_feature():
    feature_data = request.get_json()
    FeatureService().create_feature(feature_data)
    return {}
