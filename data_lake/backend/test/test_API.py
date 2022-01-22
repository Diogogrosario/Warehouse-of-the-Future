import datetime
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask import Flask
from flask_testing import TestCase
from hypothesis import HealthCheck, given, settings, strategies as st
from os import getenv
from pymongo import MongoClient

from ..api import api

from .general_unit_tests import ShelvesBucketsRacksDeviceTests
from .global_data_unit_tests import GlobalDataTests
from .layout_PBT import LayoutPBT
from .layout_unit_tests import LayoutTests
from .manifest_PBT import ManifestPBT
from .manifest_unit_tests import ManifestTests
from .sensors_PBT import SensorsPBT
from .sensors_unit_tests import SensorsTests
from .staff_PBT import StaffPBT
from .staff_unit_tests import StaffTests
from .stock_unit_tests import StockTests


class APITesting(TestCase):
    def populateTestDatabase(self):
        self.populateEmployees()
        self.populateGlobalData()
        self.populateSensorData()
        self.populateShelvesData()
        self.populateStock()
        self.populateLayouts()
        self.populateManifests()
        self.populateRackData()
        self.populateBucketsData()
        self.populateDevicesData()

    def populateDevicesData(self):
        devices_data = [
            {
                "_id": ObjectId("f07f1f77bcf86cd799439011"),
                "bucket": ObjectId("f07f1f77bcf86cd799439012"),
                "sensor": ObjectId("f07f1f77bcf86cd799439013")
            },
            {
                "_id": ObjectId("f07f1f77bcf86cd799439014"),
                "bucket": ObjectId("f07f1f77bcf86cd799439015"),
                "sensor": ObjectId("f07f1f77bcf86cd799439016")
            }
        ]
        self.db.WoF.Devices.insert_many(devices_data)

    def populateBucketsData(self):
        buckets_data = [
            {
                "_id": ObjectId("e07f1f77bcf86cd799439011"),
                "width": 32,
                "height": 50,
                "length": 33,
                "position": [1, 2, 3],
                "item_id": ObjectId("e07f1f77bcf86cd799439012"),
                "quantity": 2,
                "shelf_id": ObjectId("e07f1f77bcf86cd799439013")
            },
            {
                "_id": ObjectId("e07f1f77bcf86cd799439014"),
                "width": 23,
                "height": 19,
                "length": 30,
                "position": [4, 5, 6],
                "item_id": ObjectId("e07f1f77bcf86cd799439015"),
                "quantity": 5,
                "shelf_id": ObjectId("e07f1f77bcf86cd799439016")
            }
        ]
        self.db.WoF.Buckets.insert_many(buckets_data)

    def populateRackData(self):
        rack_data = [
            {
                "_id": ObjectId("d07f1f77bcf86cd799439011"),
                "width": 240
            },
            {
                "_id": ObjectId("d07f1f77bcf86cd799439012"),
                "width": 150
            }
        ]
        self.db.WoF.Racks.insert_many(rack_data)

    def populateShelvesData(self):
        shelves_data = [
            {
                "_id": ObjectId("c07f1f77bcf86cd799439011"),
                "height": 10,
                "rack_id": ObjectId("d07f1f77bcf86cd799439011"),
            },
            {
                "_id": ObjectId("c07f1f77bcf86cd799439012"),
                "height": 10,
                "rack_id": ObjectId("d07f1f77bcf86cd799439012"),
            },
            {
                "_id": ObjectId("c07f1f77bcf86cd799439013"),
                "height": 10,
                "rack_id": ObjectId("d07f1f77bcf86cd799439013"),
            },
        ]
        self.db.WoF.Shelves.insert_many(shelves_data)

    def populateSensorData(self):
        sensors_data = [
            {
                "_id": ObjectId("b07f1f77bcf86cd799439011"),
                "device": ObjectId("107f1f77bcf86cd799439011"),
                "movement_records": [
                    str(datetime.datetime(2022, 1, 2, 8, 35, 3)),
                    str(datetime.datetime(2022, 1, 2, 8, 40, 5)),
                    str(datetime.datetime(2022, 1, 2, 8, 50, 45)),
                ],
                "staff_contacts": [
                    {
                        "time": str(datetime.datetime(2022, 1, 2, 8, 35, 3)),
                        "staff_id": ObjectId("107f1f77bcf86cd799439012")
                    },
                    {
                        "time": str(datetime.datetime(2022, 1, 2, 8, 40, 5)),
                        "staff_id": ObjectId("107f1f77bcf86cd799439013")
                    }
                ]
            },
            {
                "_id": ObjectId("b07f1f77bcf86cd799439012"),
                "device": ObjectId("907f1f77bcf86cd799439011"),
                "movement_records": [
                    str(datetime.datetime(2022, 1, 3, 8, 35, 3)),
                    str(datetime.datetime(2022, 1, 3, 8, 40, 5)),
                    str(datetime.datetime(2022, 1, 3, 8, 50, 45)),
                    str(datetime.datetime(2022, 1, 3, 9, 50, 1)),
                    str(datetime.datetime(2022, 1, 3, 12, 50, 10)),
                    str(datetime.datetime(2022, 1, 5, 8, 50, 45)),
                    str(datetime.datetime(2022, 1, 5, 9, 50, 1)),
                    str(datetime.datetime(2022, 1, 5, 12, 50, 10)),
                ],
                "staff_contacts": [
                    {
                        "time": str(datetime.datetime(2022, 1, 3, 8, 35, 3)),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                    {
                        "time": str(datetime.datetime(2022, 1, 4, 9, 55, 0)),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                    {
                        "time": str(datetime.datetime(2022, 1, 5, 10, 35, 25)),
                        "staff_id": ObjectId("907f1f77bcf86cd799439012")
                    },
                ]
            }
        ]
        self.db.WoF.Sensors.insert_many(sensors_data)

    def populateGlobalData(self):
        global_data = [
            {
                "orchestrator": {
                    "position": [1, 2, 3]
                },
                "cart": {
                    "start_position": [250, 100],
                    "speed": 300.50,
                    "start_time": "08:00",
                    "end_time": "20:00"
                }
            }
        ]
        self.db.WoF.GlobalData.insert_many(global_data)

    def populateEmployees(self):
        employees_data = [
            {
                "_id": ObjectId("a07f1f77bcf86cd799439011"),
                "name": "Alcides Cabides",
                "birth_date": str(datetime.datetime(2000, 10, 30)),
                "height": 175
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439012"),
                "name": "Rosa Mota",
                "birth_date": str(datetime.datetime(1970, 5, 24)),
                "height": 163
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439013"),
                "name": "Deolinda Gomes",
                "birth_date": str(datetime.datetime(1975, 3, 2)),
                "height": 187
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439014"),
                "name": "Joao de Deus",
                "birth_date": str(datetime.datetime(1980, 1, 1)),
                "height": 172
            },
            {
                "_id": ObjectId("a07f1f77bcf86cd799439015"),
                "name": "Jorge Jesus",
                "birth_date": str(datetime.datetime(1990, 8, 11)),
                "height": 186
            },
        ]
        self.db.WoF.Employees.insert_many(employees_data)

    def populateLayouts(self):
        layouts_data = [
            {
                "_id": ObjectId("a07f1f99bcf86cd799439011"),
                "time": str(datetime.datetime(2019, 8, 11)),
                "buckets": []
            }, {
                "_id": ObjectId("a07f1f99bcf86cd799439012"),
                "time": str(datetime.datetime(2023, 8, 11)),
                "buckets": []
            }, {
                "_id": ObjectId("a07f1f99bcf86cd799439013"),
                "time": str(datetime.datetime(2022, 8, 11)),
                "buckets": []
            }, {
                "_id": ObjectId("a07f1f99bcf86cd799439014"),
                "time": str(datetime.datetime(2021, 8, 11)),
                "buckets": []
            }, {
                "_id": ObjectId("a07f1f99bcf86cd799439015"),
                "time": str(datetime.datetime(2020, 8, 11)),
                "buckets": []
            }
        ]
        self.db.WoF.Layouts.insert_many(layouts_data)

    def populateManifests(self):
        manifests_data = [
            {
                "_id": ObjectId("a07f1e00bcf86cd799439011"),
                "time": str(datetime.datetime(2021, 8, 11)),
                "items": [
                    {
                        "item_id": ObjectId("a07f1e98bcf86cd799439011"),
                        "quantity": 2
                    }
                ],
                "staff_id": ObjectId("a07f1f77bcf86cd799439011")
            }, {
                "_id": ObjectId("a07f1e00bcf86cd799439012"),
                "time": str(datetime.datetime(2019, 8, 11)),
                "items": [
                    {
                        "item_id": ObjectId("a07f1e98bcf86cd799439011"),
                        "quantity": 2
                    }
                ],
                "staff_id": ObjectId("a07f1f77bcf86cd799439011")
            }, {
                "_id": ObjectId("a07f1e00bcf86cd799439013"),
                "time": str(datetime.datetime(2020, 8, 11)),
                "items": [],
                "staff_id": ObjectId("a07f1f77bcf86cd799439011")
            }
        ]
        self.db.WoF.Manifests.insert_many(manifests_data)

    def populateStock(self):
        items_data = [
            {
                "_id": ObjectId("a07f1e98bcf86cd799439011"),
                "designation": "Parafusos",
                "width": 10,
                "height": 20,
                "length": 15,
                "weight": 20,
                "quantity": 400
            }, {
                "_id": ObjectId("a07f1e98bcf86cd799439012"),
                "designation": "Porcas",
                "width": 10,
                "height": 20,
                "length": 15,
                "weight": 20,
                "quantity": 400
            }, {
                "_id": ObjectId("a07f1e98bcf86cd799439013"),
                "designation": "Roscas",
                "width": 10,
                "height": 20,
                "length": 15,
                "weight": 20,
                "quantity": 400
            }
        ]
        self.db.WoF.Items.insert_many(items_data)

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
        self.db.WoF.Sensors.drop()
        self.db.WoF.Shelves.drop()
        self.db.WoF.Layouts.drop()
        self.db.WoF.Items.drop()
        self.db.WoF.Manifests.drop()
        self.db.WoF.Racks.drop()
        self.db.WoF.Buckets.drop()
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
        global_tests.testEndpoint("cart")
        global_tests.testEndpoint("orchestrator")

    def test_sensors_endpoint(self):
        sensor_tests = SensorsTests(self, self.client)
        sensor_tests.testRoot()
        sensor_tests.testSpecificSensor("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorMovements("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorMovementsWithTime("b07f1f77bcf86cd799439012",
                                                 "2022-01-03", "2022-01-04")
        sensor_tests.testSensorStaffContacts("b07f1f77bcf86cd799439012")
        sensor_tests.testSensorStaffContactsWithTime(
            "b07f1f77bcf86cd799439012",
            "2022-01-03", "2022-01-04"
        )

    def test_shelves_endpoint(self):
        shelves_tests = ShelvesBucketsRacksDeviceTests(self, self.client)
        keys = ['id', 'height', 'rack_id']
        path = 'shelves/'
        shelves_tests.testRoot(keys, len(keys), path)
        shelves_tests.testEndpoint("c07f1f77bcf86cd799439011", path)

    def test_layout_endpoint(self):
        layout_tests = LayoutTests(self, self.client)
        layout_tests.testSimple()
        layout_tests.testWithTimeBefore("2020-01-01")
        layout_tests.testWithTimeAfter("2020-01-01")
        layout_tests.testWithTimeBeforeAndAfter("2020-01-02", "2022-01-03")

    def test_manifest_endpoint(self):
        manifest_tests = ManifestTests(self, self.client)
        manifest_tests.testSimple()
        manifest_tests.testWithTimeBefore("2022-01-01")
        manifest_tests.testWithTimeAfter("2020-01-01")
        manifest_tests.testWithTimeBeforeAndAfter(
            "2022-01-02", "2022-01-03")
        manifest_tests.testWithStaffId(
            "0e1544f0b3d31188f2c7de9b")
        manifest_tests.testWithAll(
            "2022-01-02", "2022-01-03",
            "0e1544f0b3d31188f2c7de9b")

    def test_racks_endpoint(self):
        racks_tests = ShelvesBucketsRacksDeviceTests(self, self.client)
        keys = ['id', 'width']
        path = 'racks/'
        racks_tests.testRoot(keys, len(keys), path)
        racks_tests.testEndpoint("d07f1f77bcf86cd799439011", path)

    def test_stock_endpoint(self):
        stock_tests = StockTests(self, self.client)
        stock_tests.testRoot()
        stock_tests.testStockWithId("a07f1e98bcf86cd799439011")

    def test_buckets_endpoint(self):
        buckets_tests = ShelvesBucketsRacksDeviceTests(self, self.client)
        keys = [
            'id', 'width', 'height', 'length', 'position',
            'item_id', 'quantity', 'shelf_id'
        ]
        path = "buckets/"
        buckets_tests.testRoot(keys, len(keys), path)
        buckets_tests.testEndpoint("e07f1f77bcf86cd799439011", path)

    def test_devices_endpoint(self):
        buckets_tests = ShelvesBucketsRacksDeviceTests(self, self.client)
        keys = ['id', 'bucket', 'sensor']
        path = "devices/"
        buckets_tests.testRoot(keys, len(keys), path)
        buckets_tests.testEndpoint("f07f1f77bcf86cd799439011", path)

    # ----------------------------------------------------------
    # Property Based Tests
    # ----------------------------------------------------------

    # Staff

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

    # Sensors

    @settings(
        max_examples=15,
        deadline=None,
        suppress_health_check=(HealthCheck.data_too_large,)
    )
    @given(sensor_id=st.sampled_from([
        "b07f1f77bcf86cd799439011",
        "b07f1f77bcf86cd799439012"]),
        times=st.tuples(st.datetimes(), st.datetimes()).filter(
            lambda x: x[0] < x[1] and x[0].year > 999 and x[1].year > 999))
    def test_sensors_endpoint_movements_PBT(self, sensor_id, times):
        global_tests = SensorsPBT(self, self.client)
        (time_before, time_after) = times
        global_tests.testSensorsMovementWithTime(
            sensor_id,
            time_before,
            time_after
        )

    @settings(
        max_examples=15,
        deadline=None,
        suppress_health_check=(HealthCheck.data_too_large,)
    )
    @given(sensor_id=st.sampled_from([
        "b07f1f77bcf86cd799439011",
        "b07f1f77bcf86cd799439012"]),
        times=st.tuples(st.datetimes(), st.datetimes()).filter(
            lambda x: x[0] < x[1] and x[0].year > 999 and x[1].year > 999))
    def test_sensors_endpoint_Staff_contacts_PBT(self, sensor_id, times):
        global_tests = SensorsPBT(self, self.client)
        (time_before, time_after) = times
        global_tests.testSensorsStaffContactsWithTime(
            sensor_id,
            time_before,
            time_after
        )

    # Layouts

    @settings(max_examples=15, deadline=None)
    @given(st.tuples(st.datetimes(), st.datetimes()).filter(
        lambda x: x[0] < x[1]
        and x[0].year > 999
        and x[1].year > 999
        and x[0].year != x[1].year
        and x[0].month != x[1].month
        and x[0].day != x[1].day))
    def test_layout_endpoint_PBT(self, times):
        layout_tests = LayoutPBT(self, self.client)
        time_before, time_after = times
        layout_tests.testLayoutWithTimeBeforeAndAfter(
            time_before,
            time_after
        )

    # Manifests

    @settings(
        max_examples=15,
        deadline=None,
        suppress_health_check=(HealthCheck.data_too_large,)
    )
    @given(st.tuples(st.datetimes(), st.datetimes()).filter(
        lambda x: x[0] < x[1]
        and x[0].year > 999
        and x[1].year > 999
        and x[0].year != x[1].year
        and x[0].month != x[1].month
        and x[0].day != x[1].day))
    def test_manifest_endpoint_PBT(self, times):
        manifest_tests = ManifestPBT(self, self.client)
        time_before, time_after = times
        manifest_tests.testManifestPBTWithTimeBeforeAndAfter(
            time_before,
            time_after
        )
