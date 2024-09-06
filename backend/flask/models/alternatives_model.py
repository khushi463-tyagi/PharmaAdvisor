# 13-08
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import requests
# import re
# from sklearn.model_selection import train_test_split
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.pipeline import Pipeline
# from sklearn.metrics import accuracy_score

# app = Flask(__name__)
# CORS(app)
# # Load the CSV file into a DataFrame
# df = pd.read_csv('./data/FINAL_DATASET_.csv')

# # Preprocess the data
# df['Alternatives'] = df['Alternatives'].fillna('')
# df['Active Ingredient'] = df['Active Ingredient'].fillna('')

# # Simulate data for class 0
# additional_data = pd.DataFrame({
#     'Medicine': ['Medicine_No_Alt_1', 'Medicine_No_Alt_2', 'Medicine_No_Alt_3'],
#     'Alternatives': ['', '', ''],
#     'Active_Ingredient': ['', '', '']
# })
# df = pd.concat([df, additional_data], ignore_index=True)

# # Encode target variable
# df['has_alternative'] = df['Alternatives'].apply(lambda x: 0 if x == '' else 1)

# # Prepare features and target variable
# X = df['Medicine']
# y = df['has_alternative']

# # Split the data into training and test sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# # Create a pipeline for text processing and model training
# pipeline = Pipeline([
#     ('tfidf', TfidfVectorizer()),
#     ('clf', RandomForestClassifier(n_estimators=100, random_state=42))
# ])

# # Train the model
# pipeline.fit(X_train, y_train)

# # Evaluate the model
# y_pred = pipeline.predict(X_test)
# print('Accuracy:', accuracy_score(y_test, y_pred))

# def get_rxcui(medicine_name):
#     url = f"https://rxnav.nlm.nih.gov/REST/rxcui.json?name={medicine_name}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         id_group = response.json().get('idGroup', {})
#         return id_group.get('rxnormId', [None])[0]
#     else:
#         print(f"Failed to retrieve RxCUI for {medicine_name}: {response.status_code}")
#         return None

# def get_active_ingredient(medicine_name):
#     # First check in the DataFrame
#     active_ingredient = df.loc[df['Medicine'].str.lower() == medicine_name.lower(), 'Active_Ingredient'].values
#     if len(active_ingredient) > 0 and active_ingredient[0]:
#         return active_ingredient[0]

#     # If not found in the DataFrame, call the RxNav API
#     rxcui = get_rxcui(medicine_name)
#     if rxcui:
#         url = f"https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/related.json?tty=PIN"
#         response = requests.get(url)
#         if response.status_code == 200:
#             related_group = response.json().get('relatedGroup', {})
#             active_ingredients = [concept['name'] for concept_group in related_group.get('conceptGroup', []) for concept in concept_group.get('conceptProperties', [])]
#             if active_ingredients:
#                 return active_ingredients[0]  # Return only the first active ingredient

#         url = f"https://rxnav.nlm.nih.gov/REST/rxcui/{rxcui}/related.json?tty=IN"
#         response = requests.get(url)
#         if response.status_code == 200:
#             related_group = response.json().get('relatedGroup', {})
#             active_ingredients = [concept['name'] for concept_group in related_group.get('conceptGroup', []) for concept in concept_group.get('conceptProperties', [])]
#             if active_ingredients:
#                 return active_ingredients[0]  # Return only the first active ingredient

#     print(f"Failed to retrieve active ingredients for {medicine_name}")
#     return None

# # Function to predict alternatives and filter based on active ingredients
# def predict_alternative(medicine_name):
#     medicine_name = medicine_name.lower()
#     prediction = pipeline.predict([medicine_name])[0]
#     if prediction == 1:
#         if medicine_name in df['Medicine'].str.lower().values:
#             matches = df[df['Medicine'].str.lower() == medicine_name]
#             user_active_ingredient = matches['Active Ingredient'].values[0]
#             alternatives = matches['Alternatives'].values[0].replace('/', ',').split(',')
#             alternatives = [alt.strip() for alt in alternatives]

#             filtered_alternatives = []
#             for alt in set(alternatives):
#                 alt_matches = df[df['Medicine'].str.contains(alt, case=False, na=False)]
#                 if not alt_matches.empty:
#                     alt_active_ingredient = alt_matches['Active_Ingredient'].values[0]
#                 else:
#                     alt_active_ingredient = get_active_ingredient(alt)

#                 if alt_active_ingredient != user_active_ingredient and alt.lower() != medicine_name.lower():
#                     filtered_alternatives.append(alt)
#             return filtered_alternatives
#     else:
#         return []

# @app.route('/predict_alternative', methods=['POST'])
# def predict_alternatives_route():
#     data = request.json
#     medicine_name = data.get('medicine_name')
#     if not medicine_name:
#         return jsonify({"error": "Please provide a medicine name"}), 400

#     alternatives = predict_alternative(medicine_name)
    
#     if not alternatives:
#         return jsonify({"alternatives": ""}), 200
#     return jsonify({"alternatives": alternatives})

# if __name__ == '__main__':
#     app.run(debug=True)








# 5-9 changed dataset
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the dataset (ensure the path is correct)
df = pd.read_csv('data/AlternativesDataset.csv')
@app.route('/get-alternative', methods=['POST'])
def get_alternatives(medicine_name, side_effect):
    # Filter the dataset for the given medicine
    result = df[df['Medicine'].str.lower() == medicine_name.lower()]

    if not result.empty:
        # Further filter the results based on the side effect if provided
        if side_effect:
            result = result[result['Side Effect'].str.contains(side_effect, case=False, na=False)]
        
        if not result.empty:
            # Return the alternatives as a list
            alternatives = result['Alternatives'].values[0].split(',')
            return alternatives
        else:
            return None
    else:
        return None

