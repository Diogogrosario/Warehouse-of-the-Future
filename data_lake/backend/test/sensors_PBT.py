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

        for data in sensor_data:
            movement_time = datetime.strptime(
                data['time'],
                '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= movement_time and
                                      movement_time <= time_after)

    def testSensorsTimestampWithTime(self, sensor_id, time_before, time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get(f'sensors/{sensor_id}/timestamps?' +
                                   f'time_before={query_time_before}&' +
                                   f'time_after={query_time_after}')
        sensor_data = json.loads(response.data.decode('utf-8'))

        for data in sensor_data:
            timestamp_time = datetime.strptime(
                data['time'],
                '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= timestamp_time and
                                      timestamp_time <= time_after)
