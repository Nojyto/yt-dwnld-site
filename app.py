from flask import Flask, send_from_directory
from flask_restful import Api #, Resource, reqparse
from api.api_handlers import InterfaceApi

app = Flask(__name__, static_url_path="", static_folder="app/build")
api = Api(app)
api.add_resource(InterfaceApi, "/_api")


@app.route("/", defaults={"path": "index.html"})
def serve(path):
    return send_from_directory(app.static_folder, path)


if __name__ == "__main__":
    from flask_cors import CORS
    CORS(app)
    app.run(host="0.0.0.0", port=5050, debug=True)
