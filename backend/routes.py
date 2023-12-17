from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from functions import scrape_automobile_info, clean_data

process_data = Blueprint('process_data', __name__)

@process_data.route('/process_data', methods=['POST'])
@cross_origin()
def process_data_route():
    # Get the URLs from the request body
    url1 = request.json['url1']
    url2 = request.json['url2']

    # Scrape data from the URLs
    data1 = scrape_automobile_info(url1)
    data2 = scrape_automobile_info(url2)

    car1_photo = data1["car_photo"]
    car2_photo = data2["car_photo"]

    # Process the data
    processed_data = clean_data(data1, data2)

    # Return the processed data
    return jsonify(result={"text": processed_data, "photo1": car1_photo, "photo2": car2_photo})