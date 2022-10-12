import pandas as pd
import time
import joblib
import numpy as np
import os, webbrowser

from flask import Flask, request, jsonify
from flask import render_template
from flask_cors import CORS, cross_origin

###############################################################################
app = Flask(__name__,
            static_url_path='', 
            static_folder='static',
            template_folder='templates')

CORS(app, support_credentials=True)
app.config['SECRET_KEY'] =  os.urandom(24)


def getPredResult(df):
    print('\n ====== Predict function ======= \n')
    target_var = 'sales'
    
    #Load model pickle file 
    mdl_path = './model/demand_forecast_mdl_29092022.pkl'
    demand_forecast_mdl = joblib.load(mdl_path)

    cols = [col for col in df.columns if col not in ['date', 'id', "sales", "year", "store_name", "item_name", "month"]]
 
    #Get test dataset
    test = df.loc[df.sales.isna()]
    X_test = test[cols]

    #Get Predictions    
    test_preds = demand_forecast_mdl.predict(X_test, num_iteration=demand_forecast_mdl.best_iteration)

    predict_output_path = "./output/sales_forecast_3mnths.csv"

    forecast_df = pd.DataFrame({"date":test["date"],
                            "month":test["month"],
                            "store":test["store_name"],
                            "item":test["item_name"],
                            "sales":np.ceil(test_preds)
                            })
  
    
    response = {'status': 'success', 'predResult':forecast_df.sample(frac=0.5).to_dict(orient = 'records')}
    
    return response

###############################################################################
###  Render Index html  ###
###############################################################################
@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    print(" === Displaying home page === ")
    
    return render_template('index.html')

###############################################################################
###  Preview API  ###
###############################################################################
@app.route("/preview", methods=['POST'])
@cross_origin(supports_credentials=True)
def preview_api():
    start_time = time.time()
    file_path = 'output/test_preview.csv'
    
    file = request.files['file']
    print(file)
    file.save(file_path)

    dataset = pd.read_csv(file_path)
  
    response = {'status': 'success','dataset': dataset.sample(100).to_dict(orient = 'records')}
    end_time = time.time()
    print('Time Required : ', end_time -start_time)
    return jsonify(response)
###############################################################################
###  Predict API  ###
###############################################################################
@app.route("/predict", methods=['POST'])
@cross_origin(supports_credentials=True)
def predict_api():
    start_time = time.time()
    file_path = 'output/test_pred.csv'
    
    file = request.files['file']
    print(file)
    file.save(file_path)
    
    dataset = pd.read_csv(file_path)

    response = getPredResult(dataset)
    end_time = time.time()
    print('Time Required: ', end_time -start_time)
    return jsonify(response)

###############################################################################
if __name__ == "__main__":   
    # chrome_path = 'C:/Program Files/Google/Chrome/Application/chrome.exe %s'
    # webbrowser.get(chrome_path).open('file://' + os.path.realpath('templates/index.html'))
    
    app.run(port=5000)
    
###############################################################################
###############################################################################
###############################################################################
