import json


class ManifestTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def test_data(self, manifest_data):
        for manifest in manifest_data:
            self.TestClass.assertEqual(len(manifest), 4)
            for item in manifest['items']:
                self.TestClass.assertEqual(len(item), 2)

    def testSimple(self):
        # manifests/
        response = self.client.get('/manifests/')
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeBefore(self, query_time_before):
        # manifests/?time_before=1970-01-01
        response = self.client.get("/manifests/?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeAfter(self, query_time_before):
        # manifests/?time_after=1970-01-01
        response = self.client.get("/manifests/?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithTimeBeforeAndAfter(self, query_time_before,
                                   query_time_after):
        # manifests/?time_before=2022-01-01&time_after=2038-01-19
        response = self.client.get("/manifests/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithStaffId(self, staff_id):
        # manifests/?staff_id=4b1a3ec3-0e15-44f0-b3d3-1188f2c7de9b
        response = self.client.get("/manifests/?" +
                                   f"staff_id={staff_id}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWithAll(self, query_time_before, query_time_after,
                    staff_id):
        # manifests/c?time_before=2022-01-01&time_after=2038-01-19
        # &staff_id=4b1a3ec3-0e15-44f0-b3d3-1188f2c7de9b
        response = self.client.get("/manifests/?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}&"
                                   f"staff_id={staff_id}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)
