from flask import Flask
from flask_restx import Api
from hello import HelloUser

app = Flask(__name__)
api = Api(app)

api.add_resource(HelloUser, '/hello', '/hello/<string:name>', endpoint='hello')

if __name__ == '__main__':
    app.run()
