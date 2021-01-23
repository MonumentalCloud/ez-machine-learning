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
    modelid = db.StringField()
    apikey = db.StringField()
    modelname = db.StringField()
    type = db.StringField()
    description = db.StringField()
    date = db.DateTimeField()
    model = db.StringField()
    def to_json(self):
        return {
            "modelid": self.modelid,
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
    hashkey = str(hashlib.sha1(key.encode('utf-8')).hexdigest())
    newuser = User(apikey = hashkey)
    newuser.save()
    return jsonify(key)

@app.route('/createmodel', methods = ['PUT'])
def createmodel():
    apikey = request.headers.get('apikey')
    compkey = str(hashlib.sha1(apikey.encode('utf-8')).hexdigest())
    name = str(request.args.get('name'))
    modeltype = str(request.args.get('model'))
    description = str(request.args.get('desc'))
    id = str(request.args.get('id'))
    if Model.objects(modelid = id) or Model.objects(modelname = name):
        return make_response("Model ID or Model Name already exists", 409)
    if User.objects(apikey = compkey):
        network = keras.Sequential().to_json()
        now = datetime.now()
        mod = Model(modelid = id, apikey = compkey, modelname = name, type = modeltype, description = description, date = now, model = network)
        mod.save()
        return make_response("success", 201)
    else: 
        return make_response("Invalid API-KEY", 401)

@app.route('/getmodel', methods = ["GET"])
def getmodel(): 
    apikey = request.headers.get('apikey')
    id = str(request.args.get('id'))
    compkey = str(hashlib.sha1(apikey.encode('utf-8')).hexdigest())

    if User.objects(apikey = compkey):
        if Model.objects(modelid = id, apikey = compkey):
            val = Model.objects(modelid = id, apikey = compkey).first()
            lst = {"ModelID":val.modelid, "ModelName":val.modelname, "ModelType":val.type, "ModelDesc":val.description, "ModelDate":val.date}
            return make_response(jsonify(lst), 200)
        else:
            return make_response("Cannot find model with name: " + str(name), 400)
    else:
        return make_response("Invalid API-KEY", 401)

@app.route('/getallmodels', methods = ["GET"])
def getall():
    apikey = request.headers.get('apikey')
    compkey = str(hashlib.sha1(apikey.encode('utf-8')).hexdigest())
    if User.objects(apikey = compkey):
        retset = []
        if Model.objects(apikey = compkey):
            val = Model.objects(apikey = compkey)
            for v in val.all():
                lst = {"ModelID":v.modelid, "ModelName":v.modelname, "ModelType":v.type, "ModelDesc":v.description, "ModelDate":v.date}
                retset.append(lst)
            return make_response(jsonify(retset), 200)
        else:
            return make_response(jsonify([]), 400)
    else: 
        return make_response("Invalid API-KEY", 401)

@app.route('/editmode', methods = ["POST"])
def editmodel(): 
    apikey = request.headers.get('apikey')
    compkey = str(hashlib.sha1(apikey.encode('utf-8')).hexdigest())
    name = str(request.args.get('name'))
    description = str(request.args.get('desc'))
    id = str(request.args.get('id'))
    if User.objects(apikey = compkey):
        if Model.objects(apikey = compkey, modelid = id):
            val =  Model.objects(modelid = id, apikey = compkey).first()
            val.modelname = name
            val.description = description
            val.save()
            return make_response("Success", 202)
        else:
            return make_response("Cannot find model associated with model id: " + str(id), 400)
    else: 
        return make_response("Invalid API-KEY", 401)
 



if __name__ == '__main__':
    app.run(debug = True)