from flask import Flask
from api import api

app = Flask(__name__)
app.config['RESTX_MASK_SWAGGER'] = False

api.init_app(app)

if __name__ == '__main__':
    app.run()
