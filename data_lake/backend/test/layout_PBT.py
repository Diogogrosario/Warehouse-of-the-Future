import json
from datetime import datetime


class LayoutPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testLayoutWithTimeBeforeAndAfter(self, time_before, time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get("layouts/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))

        for data in layout_data:
            data_time = datetime.strptime(
                data['time'],
                '%Y-%m-%d %H:%M:%S').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= data_time)
            self.TestClass.assertTrue(time_after >= data_time)
