from fastapi import FastAPI
import pickle
import pandas as pd
import numpy as np

app = FastAPI()

import os


with open('container/no_tests.pkl', 'rb') as file:
    none = pickle.load(file)

with open('container/both.pkl', 'rb') as file:
    both = pickle.load(file)

with open('container/sat.pkl', 'rb') as file:
    sat = pickle.load(file)

with open('container/act.pkl', 'rb') as file:
    act = pickle.load(file)

@app.get('/')
def home():
    return {'message': 'Welcome to the Acceptance Rate Prediction API!'}

@app.post('/predict')
def predict(data: dict):
    data = pd.DataFrame(data, index=[0])
    if 'Mean SAT' in data.columns and 'Mean ACT' in data.columns:
        prediction = both.predict(data)[0]
    elif 'Mean SAT' in data.columns:
        prediction = sat.predict(data)[0]
    elif 'Mean ACT' in data.columns:
        prediction = act.predict(data)[0]
    else:
        prediction = none.predict(data)[0]
    return {'prediction': np.round(prediction, 2)}