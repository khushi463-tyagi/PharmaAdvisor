import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

data = pd.read_csv('data/medibot_dataset.csv', encoding='ISO-8859-1')

expanded_data = []
for index, row in data.iterrows():
    diseases = row['Disease'].split(",")
    symptoms = row['Symptom']
    precaution = row['Precaution']

    for disease in diseases:
        expanded_data.append({'Disease': disease.strip(), 'Symptom': symptoms, 'Precaution': precaution})

expanded_df = pd.DataFrame(expanded_data)

X = expanded_df['Symptom']
y = expanded_df['Disease']
precautions = expanded_df[['Disease', 'Precaution']]

vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

model = SVC(kernel='linear', C=1, random_state=42, probability=True)
model.fit(X_train, y_train)

def predict_disease_and_precaution(symptoms):
    symptoms_vectorized = vectorizer.transform([symptoms])
    probabilities = model.predict_proba(symptoms_vectorized)[0]
    top_indices = probabilities.argsort()[-3:][::-1] 
    diseases = [model.classes_[index] for index in top_indices]
    
    disease_precautions = []
    for disease in diseases:
        precaution = precautions.loc[precautions['Disease'] == disease, 'Precaution'].values
        disease_precautions.append({
            'disease': disease,
            'precaution': precaution[0] if len(precaution) > 0 else "No precautions found for this disease."
        })
    
    return disease_precautions
