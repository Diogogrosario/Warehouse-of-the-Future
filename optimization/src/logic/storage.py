from warehouse import *
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
            m_list = self.df_month_manifesto_products.loc[
                self.df_month_manifesto_products['manifesto_id'] == manifesto_id]
            manifestos_dict[manifesto_id] = dict(zip(m_list['product_id'], m_list['quantity']))

        return manifestos_dict

    def create_products(self, df_products):
        products = []

        for _, p in df_products.iterrows():
            product = Product(p['id'], p['name'], p['length'], p['height'], p['width'], p['weight'], p['sector_id'])
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
                rack = Rack(r['id'], r['length'], r['width'], r['height'], r['y'], r['capacity'], shelf_id)
                shelf.add_rack(rack)

            warehouse.add_shelf(shelf)

        return warehouse

    def fill_warehouse(self, layout):  # TODO: Verificar outros atributos das racks tb, para além da capacity
        # Place the heaviest products first
        # TODO: Which is the concept of best product to FIT?
        products = sorted(self.products, key=lambda x: (x.weight, x.width), reverse=True)

        for product in products:
            out = False
            iteration = 0
            # TODO: Change this from random_rack to
            # TODO: Return list of valid Racks. Iterate Over them.
            # TODO: Which is the concept of best RACK to FIT?
            # TODO: Conjungando a ordenação safa  melhor porque estou a dar racks mais baixas para produtos mais pesadas.

            rack = layout.get_random_rack()
            while not self.valid_placement(rack, product, layout):
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

    def valid_placement(self, rack, product, layout):
        valid_weight = rack.get_current_weight() + product.weight <= rack.capacity
        valid_width = rack.last_x + product.width <= rack.width
        valid_height = True

        rack_above = layout.get_rack_above(rack)

        if rack_above:
            valid_height = rack.y + product.height <= rack.y

        return valid_weight and valid_width and valid_height
