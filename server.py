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


@app.route('/register')
def register(): #Returns an length 6 api key 
    key = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    hashkey = str(hashlib.sha1(mongodb_pass.encode()).hexdigest())
    newuser = User(apikey = hashkey)
    newuser.save()
    return jsonify(key)

if __name__ == '__main__':
    app.run(debug = True)