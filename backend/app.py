from flask import Flask
from flask_cors import CORS
from routes import process_data

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS with support for credentials
CORS(app, supports_credentials=True)

# Register the 'process_data' blueprint for handling specific routes
app.register_blueprint(process_data)

# Run the application only if this script is executed directly
if __name__ == '__main__':
    app.run()