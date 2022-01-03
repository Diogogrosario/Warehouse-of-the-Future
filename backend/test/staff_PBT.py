import json
from dateutil import parser
from datetime import datetime, timedelta, timezone

class StaffPBT():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client
    
    def testStaffWithMinimumAge(self, queryMinimumAge):
        # staff/?age=45
        response = self.client.get(f'staff/?age={queryMinimumAge}')
        staff_data = json.loads(response.data.decode('utf-8'))

        today = datetime.now()
        for staff in staff_data:
            birth_date = datetime.strptime(staff['birth_date'], '%Y-%m-%dT%H:%M:%S%z').replace(tzinfo=None)
            diff_years = int((today - birth_date).days / 365.2425)
            self.TestClass.assertTrue(diff_years >= queryMinimumAge)

        self.TestClass.assertEqual(response.status_code, 200)