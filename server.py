from flask import *
import json
import numpy as np 
import tensorflow as tf
from tensorflow import keras 
import numpy as np 
import matplotlib.pyplot as plot

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True)