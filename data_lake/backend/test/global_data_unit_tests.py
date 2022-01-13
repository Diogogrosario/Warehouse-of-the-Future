class GlobalDataTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testEndpoint(self, url_param):
        response = self.client.get(f"globalData/{url_param}")
        self.TestClass.assertEqual(response.status_code, 200)
