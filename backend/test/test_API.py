import datetime
import os
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

from api.init import api
from flask import Flask
from flask_testing import TestCase
from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv

class APITesting(TestCase):
    def populateTestDatabase(self):
        self.populateTestEmployees()

    def populateTestEmployees(self):
        employees_data = [
            {
                "name": "Alcides Cabides",
                "birth_date": datetime.datetime(2000, 10, 30),
                "height": 175
            },
            {
                "name": "Rosa Mota",
                "birth_date": datetime.datetime(1970, 5, 24),
                "height": 163
            },
            {
                "name": "Deolinda Gomes",
                "birth_date": datetime.datetime(1975, 3, 2),
                "height": 187
            },
            {
                "name": "João Deus",
                "birth_date": datetime.datetime(1980, 1, 1),
                "height": 172
            },
            {
                "name": "Jorge Jesus",
                "birth_date": datetime.datetime(1990, 8, 11),
                "height": 186
            },
        ]
        self.db.WoFTests.Employees.insert_many(employees_data)

    def setUp(self):
        self.client = self.app.test_client()

        load_dotenv('.env.test')
        self.db = MongoClient("mongodb+srv://" +
        f"{getenv('MONGO_ATLAS_USERNAME')}:" +
        f"{getenv('MONGO_ATLAS_PASSWORD')}@ds.420ei.mongodb.net/" +
        f"{getenv('MONGO_ATLAS_CLUSTER')}?retryWrites=true&w=majority")
        
        self.populateTestDatabase()

    def tearDown(self):
        self.db.WoFTests.Employees.drop()
        pass

    def create_app(self):        
        app = Flask(__name__)        
        app.config['RESTX_MASK_SWAGGER'] = False
        api.init_app(app)
        return app
    
    def test_server_is_up_and_running(self):
        response = self.client.get('staff/')
        print(response.get_data())
        self.assertEqual(response.status_code, 200)        
    