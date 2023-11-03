from ast import literal_eval
from crypt import methods
from flask import Flask, jsonify, render_template, request
import json
from flask_cors import CORS
from db import connection
from bson.objectid import ObjectId
from bson import json_util
app = Flask(__name__)
CORS(app)

superhero_keys_required = ["character_name", "name",
                           "appearance_year", "house", "biography", "equipment", "images_url"]
superhero_valid_keys = ["character_name",
                        "name",
                        "appearance_year",
                        "house",
                        "biography",
                        "equipment",
                        "images_url"]


@app.route("/")
def index():
    return 'api flask'


@app.route("/createCharacter", methods=["POST"])
def createCharacter():
    db = connection()
    if request.method == "POST":
        sanitized_dict = {}
        data = literal_eval(request.data.decode('utf-8'))
        for i in superhero_keys_required:
            if (data.get(i) is None):
                return "Error falta el dato " + i + " en los parámetros de entrada"
            sanitized_dict[i] = data[i]
        print(sanitized_dict)
        db.insert_one(sanitized_dict)
        return 'ok'
    else:
        return "server error"


@app.route("/updateCharacter", methods=["POST"])
def updateCharacter():
    db = connection()
    if request.method == "POST":
        data = literal_eval(request.data.decode('utf-8'))
        print(data)
        if ("id" not in data):
            return "No se pudo identificar el personaje."
        mongo_id = data["id"]
        print(mongo_id)
        del data['id']
        db.update_one({'_id': ObjectId(mongo_id)},
                      {"$set": data}, upsert=False)
        return 'ok'
    else:
        return "server error"


@app.route("/deleteCharacter", methods=["POST"])
def deleteCharacter():
    db = connection()
    if request.method == "POST":
        data = literal_eval(request.data.decode('utf-8'))
        if ("id" not in data):
            return "No se pudo identificar el personaje."
        mongo_id = data["id"]
        db.delete_one({'_id': ObjectId(mongo_id)})
        return 'ok'
    else:
        return "server error"


@app.route("/getDcCharacters", methods=["GET"])
def getDcCharacters():
    db = connection()
    if request.method == "GET":
        data = db.find({"house": 2})
        return json.loads(json_util.dumps(data))
    else:
        return "server error"


@app.route("/getMarvelCharacters", methods=["GET"])
def getMarvelCharacters():
    db = connection()
    if request.method == "GET":
        data = db.find({"house": 1})
        return json.loads(json_util.dumps(data))
    else:
        return "server error"


@app.route("/getCharacters", methods=["GET"])
def getCharacters():
    db = connection()
    if request.method == "GET":
        data = db.find()
        return json.loads(json_util.dumps(data))
    else:
        return "server error"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
