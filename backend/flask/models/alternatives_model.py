import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
df = pd.read_csv('data/AlternativesDataset.csv')
@app.route('/get-alternative', methods=['POST'])
def get_alternatives(medicine_name, side_effect):
    result = df[df['Medicine'].str.lower() == medicine_name.lower()]

    if not result.empty:
        if side_effect:
            result = result[result['Side Effect'].str.contains(side_effect, case=False, na=False)]
        
        if not result.empty:
            alternatives = result['Alternatives'].values[0].split(',')
            return alternatives
        else:
            return None
    else:
        return None

