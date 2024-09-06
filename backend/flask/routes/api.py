import pandas as pd
from flask import Blueprint, request, jsonify
from models.alternatives_model import get_alternatives
# from models.chatbot_model import symptoms_dict, predict_disease, get_description, get_precautions, get_symptom
from models.medibot_model import predict_disease_and_precaution
from models.side_effects_model import train_model, predict_side_effects
from models.interaction_model import check_drug_interaction

api = Blueprint('api', __name__)

def create_error_response(message, status_code):
    return jsonify({'error': message}), status_code

@api.route('/get-alternatives', methods=['POST'])
def get_alternatives_route():
    data = request.get_json()
    medicine = data.get('medicine_name', '').strip()  
    side_effect = data.get('side_effect', '').strip()

    if not medicine:
        return create_error_response('Medicine name is required.', 400)
    
    if not side_effect:
        return create_error_response('Side effect is required.', 400)

    alternatives = get_alternatives(medicine, side_effect)

    if alternatives:
        return jsonify({'alternatives': alternatives})
    else:
        return create_error_response('No alternatives found.', 404)


@api.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', '')
    disease_precautions = predict_disease_and_precaution(symptoms)
    diseases = [item['disease'] for item in disease_precautions]
    return jsonify({'diseases': diseases})

@api.route('/precautions', methods=['POST'])
def get_precaution():
    data = request.json
    diseases = data.get('diseases', [])
    precautions = [predict_disease_and_precaution(disease)[0]['precaution'] for disease in diseases]
    return jsonify({'precautions': precautions})



doctor_df = pd.read_csv('data/New_Doctor_data.csv')
@api.route('/consultation', methods=['POST'])
def find_doctor_route():
    data = request.get_json()
    specialization = data.get('specialization', '').strip().lower()
    # Filter doctors based on the specialization
    filtered_doctors = doctor_df[doctor_df['Specialization'].str.lower().str.contains(specialization, na=False)]

    if not filtered_doctors.empty:
        doctors = filtered_doctors.to_dict(orient='records')

        return jsonify({'doctors': doctors}), 200
    else:
        return jsonify({'error': 'No doctors found!'}), 404

@api.route('/unique-specializations', methods=['GET'])
def unique_specializations():
    try:
        doctordf = pd.read_csv('data/New_Doctor_data.csv')
        # Get a list of unique specializations
        unique_specializations = doctordf['Specialization'].unique().tolist()
        return jsonify({"specializations": unique_specializations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



df_side_effects = pd.read_csv('data/FINAL_DATASET_.csv')
model = train_model(df_side_effects)
@api.route('/predict-side-effects', methods=['POST'])
def predict_side_effects_route():
    data = request.get_json()
    medicine = data.get('medicine')
    prediction_result = predict_side_effects(medicine, model, df_side_effects)
    return jsonify(prediction_result)


@api.route('/drug-interaction', methods=['POST'])
def check_drug_interaction_route():
    data = request.get_json()
    medicine1 = data.get('medicine1', '').strip().lower()
    medicine2 = data.get('medicine2', '').strip().lower()

    interaction_info = check_drug_interaction(medicine1, medicine2)

    if interaction_info:
        return jsonify({
            'interaction': interaction_info['interaction'],
            'explanation': interaction_info['explanation']
        })
    else:
        return jsonify({
            'interaction': 'No interaction found',
            'explanation': ''
        })