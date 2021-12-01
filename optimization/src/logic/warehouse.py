import random as r

class Layout:
    def __init__(self, warehouse):
        self.warehouse = warehouse
        # shelf -> lista de racks
        #   rack -> lista de products
        #       product, x_orig, x_end

    def get_random_rack(self):
        shelf = self.warehouse.get_random_shelf()
        rack = shelf.get_random_rack()
        return rack
    
    def __str__(self) -> str:
        state = 'LAYOUT:\n'
        state += str(self.warehouse)
        return state

class Warehouse:
    def __init__(self, id):
        self.id = id
        self.shelves = [] # list of Shelves
    
    def add_shelf(self, shelf):
        self.shelves.append(shelf)

    def get_random_shelf(self):
        return self.shelves[r.randrange(0,len(self.shelves))]

    def __str__(self) -> str:
        state = ""
        state += f'WAREHOUSE ID: {self.id}\n'
        for shelf in self.shelves:
            state += f'\t{shelf}'
        return state

class Shelf:
    def __init__(self, id):
        self.id = id
        self.racks = [] # list of Racks
    
    def add_rack(self, rack):
        self.racks.append(rack)

    def get_random_rack(self):
        return self.racks[r.randrange(0,len(self.racks))]

    def __str__(self) -> str:
        state = ""
        state += f'SHELF {self.id} ----------------------------------------\n'
        for rack in self.racks:
            state += f'\t\t{rack}\n'
        return state

class Product:
    def __init__(self, id, name, length, height, width, weight, car_model_id, sector_id):
        self.id = id
        self.name = name
        self.length = length
        self.height = height
        self.width = width
        self.weight = weight
        self.car_model_id = car_model_id
        self.sector_id = sector_id

    def __str__(self) -> str: # TODO: print other attributes
        state = ""
        state += f'PRODUCT {self.id}:\n'
        state += f'\t\t\t\t\tWEIGHT {self.weight}\n'
        return state

class Rack:
    def __init__(self, id, length, width, height, y, capacity):
        self.id = id
        self.length = length
        self.width = width
        self.height = height
        self.y = y
        self.capacity = capacity
        self.products = [] # list of Products
    
    def add_product(self, products):
        self.products.append(products)
        
    def remove_product(self, product):
        self.products.remove(product)
    
    def remove_product_id(self, id):
        # change this later
        for product in self.products:
            if product.id == id:
                self.products.remove(id)
                break
    
    def get_current_weight(self):
        weight = 0
        for product in self.products:
            weight += product.weight
        return weight

    def __str__(self) -> str:
        state = ""
        state += f'RACK {self.id}:\n'
        state += f'\t\t\tLENGTH: {self.length}\n'
        state += f'\t\t\tWIDTH: {self.width}\n'
        state += f'\t\t\tHEIGHT: {self.height}\n'
        state += f'\t\t\tY: {self.y}\n'
        state += f'\t\t\tCAPACITY: {self.capacity}\n'
        state += f'\t\t\tPRODUCTS:\n'
        for product in self.products:
            state += f'\t\t\t\t{product}\n'
        return state

class Manifesto:
    def __init__(self, products):
        self.products = products # {id : quantity}