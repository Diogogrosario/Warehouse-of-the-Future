import json
import urllib


class StockTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testRoot(self):
        # stock/
        response = self.client.get('/stock')
        stock_data = json.loads(response.data.decode('utf-8'))
        for stock in stock_data:
            self.TestClass.assertEqual(len(stock), 8)
        self.TestClass.assertEqual(response.status_code, 200)

    def testStockWithId(self, stock_id):
        # stock/<id>
        stock_url = urllib.parse.quote(stock_id)
        response = self.client.get(f'/stock/{stock_url}')
        stock_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(stock_data), 8)
        self.TestClass.assertEqual(response.status_code, 200)
