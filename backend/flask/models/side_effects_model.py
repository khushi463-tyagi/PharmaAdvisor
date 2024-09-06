import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
    
def preprocess_data(df):
    df['Severity Score'] = pd.to_numeric(df['Severity Score'], errors='coerce')
    df['Frequency'] = pd.to_numeric(df['Frequency'], errors='coerce')
    df.dropna(subset=['Seriousness', 'Severity Score', 'Frequency'], inplace=True)
    return df
    
def train_model(df):
    features = ['Seriousness', 'Severity Score', 'Frequency']
    target = 'Severity'
    seriousness_map = {'Serious': 1, 'Non-Serious': 0}
    df['Seriousness'] = df['Seriousness'].map(seriousness_map)
    df[target] = df['Seriousness'] * df['Severity Score'] * df['Frequency']

    X = df[features]
    y = df[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f'Mean Squared Error: {mse}')

    return model

def predict_side_effects(medicine, model, df):
    # Filter data for the specified medicine
    medicine = medicine.lower()
    med_data = df[df['Medicine'].str.lower() == medicine].copy()
    if med_data.empty:
        return {"error": "No data found for the specified medicine."}
    
    # Preprocess the data
    med_data = preprocess_data(med_data)
    med_data['Predicted Severity'] = model.predict(med_data[['Seriousness', 'Severity Score', 'Frequency']])
    
    # Get the top 5 side effects based on predicted severity
    top_side_effects = med_data.sort_values(by='Predicted Severity', ascending=False).head(5)
    top_side_effects_list = top_side_effects['Side Effect'].tolist()
    
    return {"top_side_effects": top_side_effects_list}
