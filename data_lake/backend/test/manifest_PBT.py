import json
from datetime import datetime


class ManifestPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testManifestPBTWithTimeBeforeAndAfter(self, time_before, time_after):
        query_time_before = time_before.strftime("%Y-%m-%d")
        query_time_after = time_after.strftime("%Y-%m-%d")

        response = self.client.get("manifests/collection?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))

        for data in layout_data:
            data_time = datetime.strptime(
                data['time'],
                '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            self.TestClass.assertTrue(time_before <= data_time)
            self.TestClass.assertTrue(time_after >= data_time)
