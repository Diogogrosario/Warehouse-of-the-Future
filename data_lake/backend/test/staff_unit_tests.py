import json
import urllib


class StaffTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testRoot(self):
        # staff/
        response = self.client.get('staff/')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(staff_data), 5)
        self.TestClass.assertEqual(response.status_code, 200)

    def testStaffWithName(self, name):
        # staff?name=Deolinda Gomes
        queryName = urllib.parse.quote(name)
        response = self.client.get(f'staff/?name={queryName}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(staff_data), 1)
        self.TestClass.assertEqual(response.status_code, 200)

    def testStaffWithMinimumAge(self, queryMinimumAge):
        # staff/?age=45
        response = self.client.get(f'staff/?age={queryMinimumAge}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(staff_data), 2)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSpecificStaffWithNameAndAge(self, name, queryMinimumAge):
        # staff/?age=45&name=Deolinda Gomes
        queryName = urllib.parse.quote(name)
        response = self.client.get(f'staff/?age={queryMinimumAge}' +
                                   f'&name={queryName}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(staff_data), 1)
        self.TestClass.assertEqual(response.status_code, 200)

    def testSpecificStaff(self, staff_id):
        # staff/:id
        response = self.client.get(f'staff/{staff_id}')
        staff_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(staff_data['id'], staff_id)
        self.TestClass.assertEqual(response.status_code, 200)

    def testWrongRequest(self):
        # staff/?age=abc (Incorrect Request)
        response = self.client.get('staff/?age=abc')
        self.TestClass.assertEqual(response.status_code, 400)

    def testWrongURLParam(self, wrong_param):
        # staff/:id (Incorrect Request)
        response = self.client.get(f'staff/{wrong_param}')
        self.TestClass.assertEqual(response.status_code, 400)
