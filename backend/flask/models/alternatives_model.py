import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
df = pd.read_csv('data/AlternativesDataset.csv')
@app.route('/get-alternative', methods=['POST'])
def get_alternatives(medicine_name, side_effect):
   import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import difflib

def train_model(file_path):
    df = pd.read_csv(file_path)
    
    features = ['Medicine', 'Disease', 'Side_Effect']
    target = 'Alternative'
    df = df.dropna(subset=[target])
    
    label_encoders = {}
    for col in features + [target]:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))  
        label_encoders[col] = le
    X = df[features]
    y = df[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    rf_model = RandomForestClassifier(n_estimators=200, min_samples_split=5, random_state=42)
    rf_model.fit(X_train, y_train)
    
    accuracy = rf_model.score(X_test, y_test)
    print(f'Model Accuracy: {accuracy * 100:.2f}%')
    
    return rf_model, label_encoders, df

def find_closest_match(input_value, valid_values):
    matches = difflib.get_close_matches(input_value, valid_values, n=1, cutoff=0.7)
    return matches[0] if matches else None

def predict_alternative(rf_model, label_encoders, df, medicine, disease, side_effect):
    try:
        medicine_list = df['Medicine'].astype(str).unique().tolist()
        disease_list = df['Disease'].astype(str).unique().tolist()
        side_effect_list = df['Side_Effect'].astype(str).unique().tolist()
        
        medicine = find_closest_match(medicine, medicine_list) or medicine
        disease = find_closest_match(disease, disease_list) or disease
        side_effect = find_closest_match(side_effect, side_effect_list) or side_effect
        
        if medicine not in medicine_list:
            return f'Error: Medicine "{medicine}" not found in dataset.'
        if disease not in disease_list:
            return f'Error: Disease "{disease}" not found in dataset.'
        if side_effect not in side_effect_list:
            return f'Error: Side Effect "{side_effect}" not found in dataset.'
        
        medicine_encoded = label_encoders['Medicine'].transform([medicine])[0]
        disease_encoded = label_encoders['Disease'].transform([disease])[0]
        side_effect_encoded = label_encoders['Side_Effect'].transform([side_effect])[0]
      
        input_data = [[medicine_encoded, disease_encoded, side_effect_encoded]]
        predicted_label = rf_model.predict(input_data)[0]

        alternative_medicine = label_encoders['Alternative'].inverse_transform([predicted_label])[0]
        return alternative_medicine
    except Exception as e:
        return f'Error in prediction: {str(e)}'



