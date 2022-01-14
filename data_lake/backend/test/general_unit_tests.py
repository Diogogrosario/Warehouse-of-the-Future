import json


class ShelvesBucketsRacksDeviceTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testRoot(self, keys, expected, path):
        response = self.client.get(path)
        data = json.loads(response.data.decode('utf-8'))
        for x in data:
            to_assert = list(filter(lambda key: key in x, keys))
            self.TestClass.assertEqual(len(to_assert), expected)

        self.TestClass.assertEqual(response.status_code, 200)

    def testEndpoint(self, obj_id, path):
        response = self.client.get(f'{path}{obj_id}')
        data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(data['id'], obj_id)
        self.TestClass.assertEqual(response.status_code, 200)
