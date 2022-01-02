import os
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

import datetime
from api.init import api
from flask import Flask
from flask_testing import TestCase
from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv
from bson.objectid import ObjectId

class APITesting(TestCase):
    def populateTestDatabase(self):
        self.populateTestEmployees()
        self.populateGlobalData()
        self.populateSensorData()

    def populateSensorData(self):
        devices_data = [
            {
                "bucket": ObjectId("107f1f77bcf86cd799439011"),
                "movement_records": [
                    datetime.datetime(2022, 1, 2, 8, 35, 3),
                    datetime.datetime(2022, 1, 2, 8, 40, 5),
                    datetime.datetime(2022, 1, 2, 8, 50, 45),
                ],
                "staff_contacts": [
                    {
                        "time": datetime.datetime(2022, 1, 2, 8, 35, 3),
                        "staff_id": ObjectId("107f1f77bcf86cd799439012")
                    },
                    {
                        "time": datetime.datetime(2022, 1, 2, 8, 40, 5),
                        "staff_id": ObjectId("107f1f77bcf86cd799439013")
                    }
                ]
            },
            {
                "bucket": ObjectId("907f1f77bcf86cd799439011"),
                "movement_records": [
                    datetime.datetime(2022, 1, 3, 8, 35, 3),
                    datetime.datetime(2022, 1, 3, 8, 40, 5),
                    datetime.datetime(2022, 1, 3, 8, 50, 45),
                    datetime.datetime(2022, 1, 3, 9, 50, 1),
                    datetime.datetime(2022, 1, 3, 12, 50, 10),
                ],
                "staff_contacts": [
                    {
                        "time": datetime.datetime(2022, 1, 3, 8, 35, 3),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                ]
            }
        ]
        self.db.WoF.Devices.insert_many(devices_data)
    
    def populateGlobalData(self):
        globalData_data = [
            {
                "orchestrator_position": [1, 2, 3],
                "cart": {
                    "speed": 3,
                    "start_time": datetime.datetime(2022, 1, 2, 8, 30, 0),
                    "end_time": datetime.datetime(2022, 1, 2, 20, 0, 0)
                }
            },
            {
                "orchestrator_position": [2, 3, 4],
                "cart": {
                    "speed": 10,
                    "start_time": datetime.datetime(2022, 1, 1, 8, 00, 0),
                    "end_time": datetime.datetime(2022, 1, 1, 19, 30, 0)
                }
            }

        ]
        self.db.WoF.GlobalData.insert_many(globalData_data)

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
                "name": "Joao de Deus",
                "birth_date": datetime.datetime(1980, 1, 1),
                "height": 172
            },
            {
                "name": "Jorge Jesus",
                "birth_date": datetime.datetime(1990, 8, 11),
                "height": 186
            },
        ]
        self.db.WoF.Employees.insert_many(employees_data)

    def setUp(self):
        load_dotenv('.env.test')
        self.db = MongoClient("mongodb+srv://" +
        f"{getenv('MONGO_ATLAS_USERNAME')}:" +
        f"{getenv('MONGO_ATLAS_PASSWORD')}@{getenv('MONGO_ATLAS_SERVER')}/" +
        f"{getenv('MONGO_ATLAS_CLUSTER')}?retryWrites=true&w=majority")
        
        self.populateTestDatabase()
        self.client = self.app.test_client()

    def tearDown(self):
        self.db.WoF.Employees.drop()
        self.db.WoF.GlobalData.drop()
        self.db.WoF.Devices.drop()

    def create_app(self):        
        app = Flask(__name__)        
        app.config['RESTX_MASK_SWAGGER'] = False
        api.init_app(app)
        return app
    
    def test_server_is_up_and_running(self):
        response = self.client.get('staff/')
        print(response.get_data())
        self.assertEqual(response.status_code, 200)  
    