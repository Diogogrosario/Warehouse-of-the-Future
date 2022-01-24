import json
import urllib


class StockTests():
    def __init__(self, TestClass, client):
        self.TestClass = TestClass
        self.client = client

    def testRoot(self):
        # stock/
        response = self.client.get('/stock/')
        stock_data = json.loads(response.data.decode('utf-8'))
        for item in stock_data:
            self.TestClass.assertEqual(len(item), 7)
            to_assert = ['width', 'height', 'length', 'weight', 'quantity']
            # Get the items from the item
            to_assert = map(lambda x: item[x], to_assert)
            # Change to_assert to a boolean list
            to_assert = map(lambda x: int(x) > 0, to_assert)
            # Assert there's only true values
            map(self.TestClass.assertTrue, to_assert)

        self.TestClass.assertEqual(response.status_code, 200)

    def testStockWithId(self, stock_id):
        # stock/<id>
        stock_url = urllib.parse.quote(stock_id)
        response = self.client.get(f'/stock/{stock_url}')
        stock_data = json.loads(response.data.decode('utf-8'))
        self.TestClass.assertEqual(len(stock_data), 7)
        self.TestClass.assertEqual(response.status_code, 200)
