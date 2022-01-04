import os
import datetime
from sensors_unit_tests import SensorsTests
from globalData_unit_tests import GlobalDataTests
from staff_unit_tests import StaffTests
from staff_PBT import StaffPBT
from flask import Flask
from flask_testing import TestCase
from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv
from bson.objectid import ObjectId
from hypothesis import given, settings, strategies as st
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

    # ----------------------------------------------------------
    # Unit Tests
    # ----------------------------------------------------------

    def test_staff_endpoint(self):
        staff_tests = StaffTests(self, self.client)
        staff_tests.testRoot()
        staff_tests.testStaffWithName("Deolinda Gomes")
        staff_tests.testStaffWithMinimumAge(45)
        staff_tests.testSpecificStaffWithNameAndAge("Deolinda Gomes", 45)
        staff_tests.testSpecificStaff("a07f1f77bcf86cd799439013")
        staff_tests.testWrongRequest()
        staff_tests.testWrongURLParam("abc")

    def test_globalData_enpoint(self):
        global_tests = GlobalDataTests(self, self.client)
        global_tests.testWithTimeBefore("2021-01-01")
        global_tests.testWithTimeBeforeAndAfter("2022-01-02", "2022-01-03")
        global_tests.testWrongRequest()

    def test_sensors_endpoint(self):
        sensor_tests = SensorsTests(self, self.client)
        sensor_tests.testRoot()
        sensor_tests.testSpecificSensor("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorMovements("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorMovementsWithTime("b07f1f77bcf86cd799439012",
                                                 "2022-01-03", "2022-01-04")
        sensor_tests.testSensorTimestamps("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorTimestampsWithTime("b07f1f77bcf86cd799439012",
                                                  "2022-01-03", "2022-01-04")

    # ----------------------------------------------------------
    # Property Based Tests
    # ----------------------------------------------------------

    @settings(max_examples=15, deadline=None)
    @given(minimumAge=st.integers())
    def test_staff_endpoint_age_PBT(self, minimumAge):
        staff_tests = StaffPBT(self, self.client)
        staff_tests.testStaffWithMinimumAge(minimumAge)

    @settings(max_examples=15, deadline=None)
    @given(name=st.sampled_from([
        "Deolinda Gomes", "Alcides Cabides",
        "Rosa Mota", "Joao de Deus",
        "Jorge Jesus"
    ]))
    def test_staff_endpoint_name_PBT(self, name):
        staff_tests = StaffPBT(self, self.client)
        staff_tests.testStaffWithName(name)
