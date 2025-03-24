from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle as pk

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
try:
    model = pk.load(open('backend/model.pkl', 'rb'))
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", str(e))

# Brand mapping (ensure this matches your training data)
brand_mapping = {
    'sx4': 1, 'ciaz': 2, 'wagon': 3, 'swift': 4, 'vitara': 5, 's': 6,
    'alto': 7, 'ertiga': 8, 'dzire': 9, 'ignis': 10, '800': 11,
    'baleno': 12, 'omni': 13, 'fortuner': 14, 'innova': 15, 'corolla': 16,
    'etios': 17, 'camry': 18, 'land': 19, 'Royal': 20, 'UM': 21, 'KTM': 22,
    'Bajaj': 23, 'Hyosung': 24, 'Mahindra': 25, 'Honda': 26, 'Yamaha': 27,
    'TVS': 28, 'Hero': 29, 'Activa': 30, 'Suzuki': 31, 'i20': 32, 'grand': 33,
    'i10': 34, 'eon': 35, 'xcent': 36, 'elantra': 37, 'creta': 38, 'verna': 39,
    'city': 40, 'brio': 41, 'amaze': 42, 'jazz': 43
}

@app.route('/predict', methods=['POST'])
def predict_price():
    try:
        # Get data from the request
        data = request.json
        print("Received Data:", data)

        # Ensure all required fields are present
        required_fields = ['brand', 'year', 'km_driven', 'fuel', 'seller_type', 'transmission', 'present_price']
        for field in required_fields:
            if field not in data or data[field] == '':
                return jsonify({'error': f'Missing field: {field}', 'status': 'error'}), 400

        # Prepare input data for the model
        input_data = pd.DataFrame([{
            'Car_Name': brand_mapping.get(data['brand'].lower(), 0),  # Map brand to its corresponding value
            'Year': int(data['year']),
            'Present_Price': float(data['present_price']),  # Present_Price must match the training data
            'Kms_Driven': int(data['km_driven']),
            'Fuel_Type': 0 if data['fuel'] == 'Petrol' else 1 if data['fuel'] == 'Diesel' else 2,
            'Seller_Type': 0 if data['seller_type'] == 'Dealer' else 1,
            'Transmission': 0 if data['transmission'] == 'Manual' else 1,
            'Owner': int(data.get('owner', 0))
        }])

        print("Processed Input Data:", input_data)

        # Make prediction
        prediction = model.predict(input_data)[0]

        # Return the predicted price
        return jsonify({
            'predicted_price': round(prediction, 2),
            'status': 'success'
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    app.run(debug=True)