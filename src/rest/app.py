from flask import Flask
from flask_cors import CORS

from rest.step_creation_handlers import step_creation

app = Flask(__name__.split(".")[0])
app.register_blueprint(step_creation)
CORS(app, origins=["http://localhost:5173"])
