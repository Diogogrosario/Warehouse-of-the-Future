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

    def testReposition(self):
        # manifests/reposition
        response = self.client.get('/manifests/reposition')
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testRepositionWithTimeBefore(self, query_time_before):
        # manifests/reposition/?time_before=1970-01-01
        response = self.client.get("/manifests/reposition?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testRepositionWithTimeAfter(self, query_time_before):
        # manifests/reposition/?time_after=1970-01-01
        response = self.client.get("/manifests/reposition?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testRepositionWithTimeBeforeAndAfter(self, query_time_before,
                                             query_time_after):
        # manifests/reposition/?time_before=2022-01-01&time_after=2038-01-19
        response = self.client.get("/manifests/reposition?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollection(self):
        # manifests/collection
        response = self.client.get('/manifests/collection')
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollectionWithTimeBefore(self, query_time_before):
        # manifests/collection/?time_before=1970-01-01
        response = self.client.get("/manifests/collection?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollectionWithTimeAfter(self, query_time_before):
        # manifests/collection/?time_after=1970-01-01
        response = self.client.get("/manifests/collection?" +
                                   f"time_before={query_time_before}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollectionWithTimeBeforeAndAfter(self, query_time_before,
                                             query_time_after):
        # manifests/collection/?time_before=2022-01-01&time_after=2038-01-19
        response = self.client.get("/manifests/collection?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollectionWithStaffId(self, staff_id):
        # manifests/collection/?staff_id=4b1a3ec3-0e15-44f0-b3d3-1188f2c7de9b
        response = self.client.get("/manifests/collection?" +
                                   f"staff_id={staff_id}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)

    def testCollectionWithAll(self, query_time_before, query_time_after,
                              staff_id):
        # manifests/collection/?time_before=2022-01-01&time_after=2038-01-19
        # &staff_id=4b1a3ec3-0e15-44f0-b3d3-1188f2c7de9b
        response = self.client.get("/manifests/collection?" +
                                   f"time_before={query_time_before}&"
                                   f"time_after={query_time_after}&"
                                   f"staff_id={staff_id}")
        layout_data = json.loads(response.data.decode('utf-8'))
        self.test_data(layout_data)
        self.TestClass.assertEqual(response.status_code, 200)
