import pandas as pd

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

def preprocess_input(data):
    return pd.DataFrame([{
        'Car_Name': brand_mapping.get(data['brand'].lower(), 0),
        'Year': data['year'],
        'Present_Price': 0,
        'Kms_Driven': data['km_driven'],
        'Fuel_Type': 0 if data['fuel'] == 'Petrol' else 1 if data['fuel'] == 'Diesel' else 2,
        'Seller_Type': 0 if data['seller_type'] == 'Dealer' else 1,
        'Transmission': 0 if data['transmission'] == 'Manual' else 1,
        'Owner': data.get('owner', 0)
    }])
