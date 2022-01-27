import json
from datetime import datetime


class SensorsPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testSensorsMovementWithTime(self, sensor_id, time_before, time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get(f'sensors/{sensor_id}/movements?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))

        if(len(sensor_data) > 0):
            for data in sensor_data[0]['movement_records']:
                movement_time = datetime.strptime(
                    data,
                    '%Y-%m-%d %H:%M:%S').replace(tzinfo=None)
                self.TestClass.assertTrue(time_before <= movement_time and
                                          movement_time <= time_after)
        else:
            self.TestClass.assertEqual(response.status_code, 200)

    def testSensorsStaffContactsWithTime(
            self,
            sensor_id,
            time_before,
            time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get(f'sensors/{sensor_id}/staff_contacts?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))

        for data in sensor_data:
            timestamp_time = datetime.strptime(
                data['time'],
                '%Y-%m-%d %H:%M:%S').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= timestamp_time and
                                      timestamp_time <= time_after)
