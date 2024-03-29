from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployment
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__, static_url_path="", static_folder="app/build")
api = Api(app)
api.add_resource(HelloApiHandler, "/api/hello")


@app.route("/", defaults={"path": ""})
def serve(path):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    CORS(app)  # comment this on deployment
    app.run(host="0.0.0.0", port=80, debug=True)