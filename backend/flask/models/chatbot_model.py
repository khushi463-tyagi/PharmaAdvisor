# import pandas as pd
# import numpy as np
# from sklearn.tree import DecisionTreeClassifier
# from sklearn import preprocessing
# from sklearn.model_selection import train_test_split, cross_val_score
# from flask import Flask, jsonify
# from flask_cors import CORS
# import csv

# app = Flask(__name__)
# CORS(app)
# # Load datasets
# training = pd.read_csv('data/Data/Training.csv')
# testing = pd.read_csv('data/Data/Testing.csv')

# cols = training.columns[:-1]
# x = training[cols]
# y = training['prognosis']

# # Mapping strings to numbers
# le = preprocessing.LabelEncoder()
# le.fit(y)
# y = le.transform(y)

# x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
# clf = DecisionTreeClassifier().fit(x_train, y_train)
# scores = cross_val_score(clf, x_test, y_test, cv=3)
# print(f"Model Accuracy: {scores.mean()}")

# description_dict = read_csv_safe('data/MasterData/symptom_Description.csv', 2)
# severity_dict = {k: int(v[0]) for k, v in read_csv_safe('data/MasterData/symptom_severity.csv', 2).items()}
# precaution_dict = {k: v for k, v in read_csv_safe('data/MasterData/symptom_precaution.csv', 5).items()}
# symptoms_dict = {symptom: idx for idx, symptom in enumerate(x)}

# # Prediction Functions
# def predict_disease(symptoms):
#     input_vector = np.zeros(len(symptoms_dict))
#     for symptom in symptoms:
#         if symptom in symptoms_dict:
#             input_vector[symptoms_dict[symptom]] = 1

#     disease_prediction = clf.predict([input_vector])
#     return le.inverse_transform(disease_prediction)[0]

# def get_description(disease):
#     return description_dict.get(disease, ["No description available"])[0]

# def get_precautions(disease):
#     return precaution_dict.get(disease, [])









# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# from sklearn.tree import DecisionTreeClassifier
# from sklearn import preprocessing
# from sklearn.model_selection import cross_val_score
# from sklearn.model_selection import train_test_split
# import csv
# import re

# app = Flask(__name__)
# CORS(app)

# # Load datasets
# training = pd.read_csv('data/Data/Training.csv')
# testing = pd.read_csv('data/Data/Testing.csv')

# cols = training.columns[:-1]
# x = training[cols]
# y = training['prognosis']

# # Mapping strings to numbers
# le = preprocessing.LabelEncoder()
# le.fit(y)
# y = le.transform(y)

# x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
# clf = DecisionTreeClassifier().fit(x_train, y_train)
# scores = cross_val_score(clf, x_test, y_test, cv=3)
# print(scores)

# # Load supplementary data
# severity_dict = {}
# description_dict = {}
# precaution_dict = {}

# def read_csv_safe(file_path, expected_columns):
#     data = {}
#     with open(file_path) as f:
#         csv_reader = csv.reader(f)
#         for row in csv_reader:
#             if len(row) >= expected_columns:
#                 data[row[0]] = row[1:]
#     return data

# description_dict = read_csv_safe('data/MasterData/symptom_Description.csv', 2)
# severity_dict = {k: int(v[0]) for k, v in read_csv_safe('data/MasterData/symptom_severity.csv', 2).items()}
# precaution_dict = {k: v for k, v in read_csv_safe('data/MasterData/symptom_precaution.csv', 5).items()}

# symptoms_dict = {symptom: idx for idx, symptom in enumerate(x)}

# @app.route('/api/symptom', methods=['POST'])
# def get_symptom():
#     data = request.get_json()
#     symptom = data['symptom'].strip().replace(' ', '_')  # Convert spaces to underscores
#     response = {"is_valid": symptom in symptoms_dict}
#     return jsonify(response)

# @app.route('/api/disease', methods=['POST'])
# def predict_disease(symptoms):
#     # data = request.get_json()
#     # symptoms = data['symptoms']
#     # print(symptoms)
    
#     input_vector = np.zeros(len(symptoms_dict))
#     for symptom in symptoms:
#         if symptom in symptoms_dict:
#             input_vector[symptoms_dict[symptom]] = 1

#     disease_prediction = clf.predict([input_vector])
#     disease = le.inverse_transform(disease_prediction)[0]
#     return jsonify({"disease": disease})

# @app.route('/api/description', methods=['POST'])
# def get_description():
#     data = request.get_json()
#     disease = data['disease']
#     description = description_dict.get(disease, ["No description available"])[0]
#     return jsonify({"description": description})

# @app.route('/api/precautions', methods=['POST'])
# def get_precautions():
#     data = request.get_json()
#     disease = data['disease']
#     precautions = precaution_dict.get(disease, [])
#     return jsonify({"precautions": precautions})

# if __name__ == '__main__':
#     app.run(debug=True)






######################16-08
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import csv
from sklearn.tree import DecisionTreeClassifier
from sklearn import preprocessing
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  

# Load datasets
training = pd.read_csv('data/Data/Training.csv')

# Prepare data
cols = training.columns[:-1]
x = training[cols]
y = training['prognosis']

# Encode the target variable (disease)
le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)

# Train-test split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
clf = DecisionTreeClassifier().fit(x_train, y_train)

# Dictionary of symptoms
symptoms_dict = {symptom: idx for idx, symptom in enumerate(cols)}

# Load supplementary data
def read_csv_safe(file_path, expected_columns):
    data = {}
    with open(file_path) as f:
        csv_reader = csv.reader(f)
        for row in csv_reader:
            if len(row) >= expected_columns:
                data[row[0]] = row[1:]
    return data

description_dict = read_csv_safe('data/MasterData/symptom_Description.csv', 2)
severity_dict = {k: int(v[0]) for k, v in read_csv_safe('data/MasterData/symptom_severity.csv', 2).items()}
precaution_dict = {k: v for k, v in read_csv_safe('data/MasterData/symptom_precaution.csv', 5).items()}

# API Endpoints

@app.route('/symptom', methods=['POST'])
def get_symptom(symptom):
    symptom = symptom.strip().replace(' ', '_')  # Convert spaces to underscores
    response = {"is_valid": symptom in symptoms_dict}
    return (response)

@app.route('/disease', methods=['POST'])
def predict_disease(symptoms):
    print(symptoms)
    input_vector = np.zeros(len(symptoms_dict))
    for symptom in symptoms:
        if symptom in symptoms_dict:
            input_vector[symptoms_dict[symptom]] = 1

    disease_prediction = clf.predict([input_vector])
    disease = le.inverse_transform(disease_prediction)[0]
    return disease

@app.route('/description', methods=['POST'])
def get_description(disease):
    description = description_dict.get(disease, ["No description available"])[0]
    return description

@app.route('/precautions', methods=['POST'])
def get_precautions(disease):
    precautions = precaution_dict.get(disease, ["No precautions available"])
    return precautions

if __name__ == '__main__':
    app.run(debug=True)
