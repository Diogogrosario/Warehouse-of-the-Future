import json
from datetime import datetime


class GlobalPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testGlobalDataWithTimeBeforeAndAfter(self, time_before, time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get("globalData/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        global_data = json.loads(response.data.decode('utf-8'))

        for data in global_data:
            start_time = datetime.strptime(
                data['cart']['start_time'],
                '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            end_time = datetime.strptime(
                data['cart']['end_time'],
                '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= start_time)
            self.TestClass.assertTrue(time_after >= end_time)
