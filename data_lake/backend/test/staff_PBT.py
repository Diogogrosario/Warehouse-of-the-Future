import json
import urllib
from datetime import datetime


class StaffPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testStaffWithMinimumAge(self, queryMinimumAge):
        response = self.client.get(f'staff/?age={queryMinimumAge}')
        staff_data = json.loads(response.data.decode('utf-8'))

        today = datetime.now()
        for staff in staff_data:
            birth_date = datetime.strptime(
                staff['birth_date'],
                '%Y-%m-%d %H:%M:%S').replace(tzinfo=None)
            diff_years = int((today - birth_date).days / 365.2425)
            self.TestClass.assertTrue(diff_years >= queryMinimumAge)

        self.TestClass.assertEqual(response.status_code, 200)

    def testStaffWithName(self, name):
        queryName = urllib.parse.quote(name)
        response = self.client.get(f'staff/?name={queryName}')
        staff_data = json.loads(response.data.decode('utf-8'))

        for staff in staff_data:
            self.TestClass.assertEqual(staff['name'], name)

        self.TestClass.assertEqual(response.status_code, 200)
