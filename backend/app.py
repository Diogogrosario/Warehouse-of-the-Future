from flask import Flask
from flask_cors import CORS
from api.init import api

app = Flask(__name__)

# Cors configuration
cors = CORS(app, resources={r"/*": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'

app.config['RESTX_MASK_SWAGGER'] = False
api.init_app(app)

if __name__ == '__main__':
    app.run()
