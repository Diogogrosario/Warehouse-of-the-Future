from flask import Flask
from flask_restx import Api

app = Flask(__name__)
api = Api(app)


@app.route('/')
def hello_world():
    return 'Hello from Flask!'


if __name__ == '__main__':
    app.run()
