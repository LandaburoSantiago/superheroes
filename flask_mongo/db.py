from pymongo import MongoClient


def connection():
    client = MongoClient("mongodb://db:27017/mongodb")
    db = client['superhero_app']
    return db['superhero']
