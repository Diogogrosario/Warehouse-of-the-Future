import json


class LayoutTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def test_data(self, layout_data):
        for layout in layout_data:
            self.TestClass.assertEqual(len(layout), 3)

    def testSimple(self):
        # layouts/
        response = self.client.get('/layouts/')
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeBefore(self, query_time_before):
        # layouts/?time_before=1970-01-01
        response = self.client.get("/layouts/?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeAfter(self, query_time_before):
        # layouts/?time_after=1970-01-01
        response = self.client.get("/layouts/?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeBeforeAndAfter(self, query_time_before, query_time_after):
        # layouts/?time_before=2022-01-01&time_after=2038-01-19
        response = self.client.get("/layouts/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)
