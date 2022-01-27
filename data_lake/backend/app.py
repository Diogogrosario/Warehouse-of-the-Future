from flask import Flask
from flask_cors import CORS
from api import api

app = Flask(__name__)

# Cors configuration
cors = CORS(app, resources={
    r"/*": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'GET, ' +
                                        'POST, PUT, DELETE, PATCH, OPTIONS',
        "Access-Control-Allow-Headers":
        'Origin, Content-Type, Accept, X-Auth-Token'
    }
})
# app.config['CORS_HEADERS'] = 'Content-Type'

app.config['RESTX_MASK_SWAGGER'] = False
api.init_app(app)

if __name__ == '__main__':
    app.run()
