import json


class GlobalDataTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testWithTimeBefore(self, query_time_before):
        # globalData/?time_before=2021-01-01
        response = self.client.get("globalData/?" +
                                   f"time_before={query_time_before}")
        global_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(global_data), 2)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeBeforeAndAfter(self, query_time_before, query_time_after):
        # globalData/?time_before=2022-01-01&time_after=2022-01-03
        response = self.client.get("globalData/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        global_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(global_data), 1)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWrongRequest(self):
        # globalData/?time_before=abc (Incorrect Request)
        response = self.client.get("globalData/?time_before=abc")
        self.TestClass.assertEqual(response.status_code, 400)
