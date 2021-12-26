from warehouse import *
from database import Database
import time

class Storage:
    def __init__(self, db):
        self.db = db

        query_shelf = "SELECT * FROM shelf"
        query_product_rack = "SELECT * FROM product_rack"
        query_rack = "SELECT * FROM rack"
        query_product = "SELECT * FROM product"
        query_month_manifesto_product = "SELECT * FROM month_manifesto_product"

        self.df_shelves = db.df_query(query_shelf)
        self.df_racks = db.df_query(query_rack)
        self.df_products = db.df_query(query_product)
        self.df_product_rack = db.df_query(query_product_rack)
        self.df_month_manifesto_products = db.df_query(query_month_manifesto_product)

        self.products = self.create_products(self.df_products)

    def get_manifestos(self, manifestos):
        manifestos_dict = {}

        for _, manifesto in manifestos.iterrows():
            manifesto_id = manifesto['id']
            m_list = self.df_month_manifesto_products.loc[self.df_month_manifesto_products['manifesto_id'] == manifesto_id]
            manifestos_dict[manifesto_id] = dict(zip(m_list['product_id'], m_list['quantity']))
        
        return manifestos_dict

    def create_products(self, df_products):
        products = []

        for _, p in df_products.iterrows():
            product = Product(p['id'], p['name'], p['length'], p['height'], p['width'], p['weight'], p['car_model_id'], p['sector_id'], p['frequency'])
            products.append(product)

        return products

    def create_warehouse(self, warehouse_id):
        warehouse = Warehouse(warehouse_id)

        shelves_query = f"SELECT * FROM shelf WHERE warehouse_id = {warehouse_id}"
        shelves = self.db.df_query(shelves_query)
        
        for _, s in shelves.iterrows():
            shelf_id = s['id']
            shelf = Shelf(shelf_id)
            racks_query = f"SELECT * FROM rack WHERE shelf_id = {shelf_id}"
            racks = self.db.df_query(racks_query)

            for _, r in racks.iterrows():
                rack = Rack(r['id'], r['length'], r['width'], r['height'], r['y'], r['capacity'])
                shelf.add_rack(rack)

            warehouse.add_shelf(shelf)

        return warehouse
    
    def calculate_frequencies(self):
        for product in self.products:
            self.db.df_query(f"CALL calculate_product_frequency({product.id})")

    def fill_warehouse(self, layout):  # TODO: Verificar outros atributos das racks tb, para além da capacity
        # Place the heaviest products first
        products = sorted(self.products, key=lambda x: (x.weight,x.width), reverse=True)

        for product in products:
            out = False
            iteration = 0
            rack = layout.get_random_rack()
            while not self.valid_placement(rack, product):
                rack = layout.get_random_rack()
                iteration += 1
                if iteration == max_iterations:
                    layout.products_out.append(product)
                    out = True
                    break
                    
            if out:
                continue

            rack.add_product(product)

        return layout
    
    def valid_placement(self, rack, product): # TODO: check other stuff, like height
        valid_weight = rack.get_current_weight() + product.weight <= rack.capacity
        valid_width = rack.last_x + product.width <= rack.width
        # print(f'RACK WEIGHT: {rack.get_current_weight()} + PRODW: {product.weight} <= CAP: {rack.capacity}')
        # print(f'LAST X: {rack.last_x} + PRODW: {product.width} <= RACKW: {rack.width}')
        return valid_weight and valid_width


        # rack -----------

        # width = 20
        # products = [(0,4), (7,10)]


db = Database()
storage = Storage(db)
storage.calculate_frequencies()