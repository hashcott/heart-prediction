from flask import current_app as app
from flask import render_template
from flask import request
import numpy as np 
import pandas as pd 
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import pickle 
import json


loaded_model = pickle.load(open('src/model/knnpickle_file.pkl', 'rb'))
loaded_scaler = pickle.load(open('src/model/scaler_file.pkl', 'rb'))


@app.route("/", methods=["GET"])
def index():
    return render_template(template_name_or_list="index.jinja2")

@app.route("/analysis", methods=["POST"])
def analysis():
    data = request.get_json()
    with open('./data.json', 'w') as f:
        json.dump(data, f)
    df = pd.read_json('./data.json')
    df.head()
    cols = df.columns

    X_test = loaded_scaler.transform(df)
    X_test = pd.DataFrame(X_test, columns=[cols])
    result = loaded_model.predict(X_test)
    return str(result[0])
