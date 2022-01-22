import json


class SensorsTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testRoot(self):
        # sensors/
        response = self.client.get('sensors/')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(sensor_data), 2)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSpecificSensor(self, sensor_id):
        # sensors/:id
        response = self.client.get(f'sensors/{sensor_id}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(sensor_data['id'], sensor_id)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSensorMovements(self, sensor_id):
        # sensors/:id/movements
        response = self.client.get(f'sensors/{sensor_id}/movements')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(sensor_data[0]['movement_records']), 8)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSensorMovementsWithTime(
        self, sensor_id, query_time_before, query_time_after
    ):
        # sensors/:id/movements/
        # ?time_before=2022-01-03&time_after=2022-01-04
        response = self.client.get(f'sensors/{sensor_id}/movements?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(sensor_data[0]['movement_records']), 5)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSensorStaffContacts(self, sensor_id):
        # sensors/:id/staff_contacts
        response = self.client.get(f'sensors/{sensor_id}/staff_contacts')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(sensor_data), 3)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSensorStaffContactsWithTime(
        self, sensor_id, query_time_before, query_time_after
    ):
        # sensors/:id/staff_contacts/
        # ?time_before=2022-01-03&time_after=2022-01-04
        response = self.client.get(f'sensors/{sensor_id}/staff_contacts?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(sensor_data), 1)
        self.TestClass.assertEqual(response.status_code, 200)
