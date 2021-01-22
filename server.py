from flask import *
import json
import numpy as np
import hashlib 
import tensorflow as tf
from tensorflow import keras 
import numpy as np 
import matplotlib.pyplot as plot
from flask_mongoengine import MongoEngine
from math import *
import random
import string
from datetime import datetime
from bson.binary import Binary
import pickle

mongodb_pass = 'gobears'
db_name = 'Main'

app = Flask(__name__)
db_name = "Main"
DB_URI = "mongodb+srv://s3kim2018:{}@cluster0.nw98u.mongodb.net/{}?retryWrites=true&w=majority".format(mongodb_pass, db_name)
app.config["MONGODB_HOST"] = DB_URI
db = MongoEngine()
db.init_app(app)


class User(db.Document):
    apikey = db.StringField()
    def to_json(self): 
        return {
            "apikey": self.apikey
        } 

class Model(db.Document):
    apikey = db.StringField()
    modelname = db.StringField()
    type = db.StringField()
    description = db.StringField()
    date = db.DateTimeField()
    model = db.StringField()
    def to_json(self):
        return {
            "apikey": self.apikey,
            "modelname": self.modelname,
            "type": self.type,
            "description": self.description,
            "date": self.date,
            "model": self.model
        } 


# class testset(db.Document):

@app.route('/register', methods = ['GET'])
def register(): #Returns an length 6 api key 
    key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    hashkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    newuser = User(apikey = hashkey)
    newuser.save()
    return jsonify(key)

@app.route('/createmodel/<apikey>', methods = ['POST'])
def createmodel(apikey):
    compkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    if User.objects(apikey = compkey):
        name = str(request.args.get('name'))
        modeltype = str(request.args.get('model'))
        description = str(request.args.get('desc'))
        network = keras.Sequential().to_json()
        now = datetime.now()
        mod = Model(apikey = apikey, modelname = name, type = modeltype, description = description, date = now, model = network)
        mod.save()
        return make_response("success", 201)
    else: 
        return make_response("Invalid API-KEY", 404)

if __name__ == '__main__':
    app.run(debug = True)