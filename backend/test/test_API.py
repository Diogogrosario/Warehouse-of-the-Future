import datetime
import json
import urllib.parse
import os
from flask import Flask
from flask_testing import TestCase
from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv
from bson.objectid import ObjectId
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)
from api.init import api


class APITesting(TestCase):
    def populateTestDatabase(self):
        self.populateEmployees()
        self.populateGlobalData()
        self.populateSensorData()

    def populateSensorData(self):
        devices_data = [
            {
                "_id": ObjectId("b07f1f77bcf86cd799439011"),
                "bucket": ObjectId("107f1f77bcf86cd799439011"),
                "movement_sensor": [
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
                "_id": ObjectId("b07f1f77bcf86cd799439012"),
                "bucket": ObjectId("907f1f77bcf86cd799439011"),
                "movement_sensor": [
                    datetime.datetime(2022, 1, 3, 8, 35, 3),
                    datetime.datetime(2022, 1, 3, 8, 40, 5),
                    datetime.datetime(2022, 1, 3, 8, 50, 45),
                    datetime.datetime(2022, 1, 3, 9, 50, 1),
                    datetime.datetime(2022, 1, 3, 12, 50, 10),
                    datetime.datetime(2022, 1, 5, 8, 50, 45),
                    datetime.datetime(2022, 1, 5, 9, 50, 1),
                    datetime.datetime(2022, 1, 5, 12, 50, 10),
                ],
                "staff_contacts": [
                    {
                        "time": datetime.datetime(2022, 1, 3, 8, 35, 3),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                    {
                        "time": datetime.datetime(2022, 1, 4, 9, 55, 0),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                    {
                        "time": datetime.datetime(2022, 1, 5, 10, 35, 25),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                ]
            }
        ]
        self.db.WoF.Devices.insert_many(devices_data)

    def populateGlobalData(self):
        global_data = [
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
        self.db.WoF.GlobalData.insert_many(global_data)

    def populateEmployees(self):
        employees_data = [
            {
                "_id": ObjectId("a07f1f77bcf86cd799439011"),
                "name": "Alcides Cabides",
                "birth_date": datetime.datetime(2000, 10, 30),
                "height": 175
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439012"),
                "name": "Rosa Mota",
                "birth_date": datetime.datetime(1970, 5, 24),
                "height": 163
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439013"),
                "name": "Deolinda Gomes",
                "birth_date": datetime.datetime(1975, 3, 2),
                "height": 187
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439014"),
                "name": "Joao de Deus",
                "birth_date": datetime.datetime(1980, 1, 1),
                "height": 172
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439015"),
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
                              f"{getenv('MONGO_ATLAS_PASSWORD')}@" +
                              f"{getenv('MONGO_ATLAS_SERVER')}/" +
                              f"{getenv('MONGO_ATLAS_CLUSTER')}?" +
                              "retryWrites=true&w=majority")

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

    def test_staff_endpoint(self):
        # staff/
        response = self.client.get('staff/')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(staff_data), 5)
        self.assertEqual(response.status_code, 200)

        # staff?name=Deolinda Gomes
        queryName = urllib.parse.quote("Deolinda Gomes")
        response = self.client.get(f'staff/?name={queryName}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(staff_data), 1)
        self.assertEqual(response.status_code, 200)

        # staff/?age=45
        queryMinimumAge = 45
        response = self.client.get(f'staff/?age={queryMinimumAge}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(staff_data), 2)
        self.assertEqual(response.status_code, 200)

        # staff/?age=45&name=Deolinda Gomes
        response = self.client.get(f'staff/?age={queryMinimumAge}' +
                                   f'&name={queryName}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(staff_data), 1)
        self.assertEqual(response.status_code, 200)

        # staff/?age=abc (Incorrect Request)
        response = self.client.get('staff/?age=abc')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 400)

        # staff/:id
        staff_id = "a07f1f77bcf86cd799439013"
        response = self.client.get(f'staff/{staff_id}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(staff_data['id'], staff_id)
        self.assertEqual(response.status_code, 200)

        # staff/:id (Incorrect Request)
        response = self.client.get('staff/abc')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 404)

    def test_globalData_enpoint(self):
        # globalData/?time_before=2021-01-01
        query_time_before = "2021-01-01"
        response = self.client.get("globalData/?" +
                                   f"time_before={query_time_before}")
        global_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(global_data), 2)
        self.assertEqual(response.status_code, 200)

        # globalData/?time_before=2022-01-01&time_after=2022-01-03
        query_time_before = "2022-01-02"
        query_time_after = "2022-01-03"
        response = self.client.get("globalData/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        global_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(global_data), 1)
        self.assertEqual(response.status_code, 200)

        # globalData/?time_before=abc (Incorrect Request)
        response = self.client.get("globalData/?time_before=abc")
        global_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 400)

    def test_sensors_endpoint(self):
        # sensors/
        response = self.client.get('sensors/')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(sensor_data), 2)
        self.assertEqual(response.status_code, 200)

        # sensors/:id
        sensor_id = "b07f1f77bcf86cd799439012"
        response = self.client.get(f'sensors/{sensor_id}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(sensor_data['id'], sensor_id)
        self.assertEqual(response.status_code, 200)

        # sensors/:id/movements
        response = self.client.get(f'sensors/{sensor_id}/movements')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(sensor_data), 8)
        self.assertEqual(response.status_code, 200)

        # sensors/:id/movements/
        # ?time_before=2022-01-03&time_after=2022-01-04
        query_time_before = "2022-01-03"
        query_time_after = "2022-01-04"
        response = self.client.get(f'sensors/{sensor_id}/movements?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(sensor_data), 5)
        self.assertEqual(response.status_code, 200)

        # sensors/:id/timestamps
        response = self.client.get(f'sensors/{sensor_id}/timestamps')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(sensor_data), 3)
        self.assertEqual(response.status_code, 200)

        # sensors/:id/timestamps/
        # ?time_before=2022-01-03&time_after=2022-01-04
        query_time_before = "2022-01-03"
        query_time_after = "2022-01-04"
        response = self.client.get(f'sensors/{sensor_id}/timestamps?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(len(sensor_data), 1)
        self.assertEqual(response.status_code, 200)
