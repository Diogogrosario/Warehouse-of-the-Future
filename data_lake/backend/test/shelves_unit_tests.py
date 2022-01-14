import json


class ShelvesTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testEndpoint(self, shelf_id):
        # shelves/:id
        response = self.client.get(f'shelves/{shelf_id}')
        shelves_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(shelves_data['id'], shelf_id)
        self.TestClass.assertEqual(response.status_code, 200)
