from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import csv

app = Flask(__name__)
CORS(app)

# Load the CSV data
interaction_df = pd.read_csv('./data/drug_interactions.csv')

# Create a dictionary for quick lookup
interactions_dict = {}

for _, row in interaction_df.iterrows():
    key = (row['medicine1'].strip().lower(), row['medicine2'].strip().lower())
    interactions_dict[key] = {
        'interaction': row['interaction'],
        'explanation': row['explanation']
    }

def check_drug_interaction(medicine1, medicine2):
    medicine1 = medicine1.strip().lower()
    medicine2 = medicine2.strip().lower()

    interaction_info = interactions_dict.get(
        (medicine1, medicine2),
        interactions_dict.get((medicine2, medicine1))
    )

    return interaction_info
