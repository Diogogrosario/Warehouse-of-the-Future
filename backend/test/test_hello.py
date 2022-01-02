import os
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

from api.init import api
from flask import Flask
from flask_testing import TestCase

# pytest -s

class MyTest(TestCase):
    def setUp(self):
        self.app_context = self.app.app_context()
        self.app_context.push()
        self.client = self.app.test_client()
    
    def tearDown(self):
        self.app_context.pop()
        pass

    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        app.config['RESTX_MASK_SWAGGER'] = False
        api.init_app(app)
        return app
    
    def test_server_is_up_and_running(self):
        response = self.client.get('staff/')
        print(response.get_data())
        self.assertEqual(response.status_code, 200)
    