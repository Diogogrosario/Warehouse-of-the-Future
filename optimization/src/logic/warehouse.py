import math
import random
import random as r
from copy import deepcopy

max_iterations = 10000

# metrics_to_optimize = ['weight', 'sector']
metrics_to_optimize = ['sector']
# metrics_to_optimize = ['weight']
# metrics_to_optimize = ['work']
worker_average_height = 1.75


class Layout:
    def __init__(self, warehouse):  # TODO: Talvez manter lista com todos os produtos e respetivas posições
        self.warehouse = warehouse
        self.products_out = []

    def get_random_rack(self):
        shelf = self.warehouse.get_random_shelf()
        rack = shelf.get_random_rack()
        return rack

    def get_valid_rack(self, product):
        valid_racks = []
        for shelf in self.warehouse.shelves:
            for rack in shelf.racks:
                if valid_placement(rack, product):
                    valid_racks.append(rack)

        if len(valid_racks) == 0:
            return None

        return random.choice(valid_racks)

    def get_product_rack_id(self, product):  # Assumindo que cada id do produto é único
        for shelf in self.warehouse.shelves:
            for rack in shelf.racks:
                if product in rack.products:
                    return rack.id
        return None

    def add_product_rack_id(self, rack_id, product):
        for shelf in self.warehouse.shelves:
            for rack in shelf.racks:
                if rack.id == rack_id:
                    return True if rack.add_product(product) else False

    def get_random_product(self):
        random_product = None
        while random_product is None:
            random_product = self.warehouse.get_random_shelf().get_random_rack().get_random_product()

        return random_product

    def add_product_random(self, product):
        iteration = 0
        random_shelf = r.choice(self.warehouse.shelves)
        random_rack = r.choice(random_shelf.racks)
        success = random_rack.add_product(product)
        while not success:
            iteration += 1
            if iteration == max_iterations:
                self.products_out.append(product)
                print(f'DELETED FROM CROSSOVER/MUTATION: {product.id}')
                break
            random_shelf = r.choice(self.warehouse.shelves)
            random_rack = r.choice(random_shelf.racks)
            success = random_rack.add_product(product)

    def get_score(self):
        score = 0

        if 'weight' in metrics_to_optimize:
            for shelf in self.warehouse.shelves:
                for rack in shelf.racks:
                    for product in rack.products:
                        score += product.weight / rack.y

        if 'sector' in metrics_to_optimize:
            for shelf in self.warehouse.shelves:
                different_sectors = []

                for rack in shelf.racks:
                    for product in rack.products:
                        if product.sector_id not in different_sectors:
                            different_sectors.append(product.sector_id)

                if len(different_sectors) == 1:
                    score += 10
                elif len(different_sectors) > 1:
                    score -= 20 * len(different_sectors)
                elif len(different_sectors) == 0:
                    score -= 50

        if 'work' in metrics_to_optimize:
            adj_side = 0.2
            chest_y = worker_average_height * (2.0 / 3.0)

            for shelf in self.warehouse.shelves:

                for rack in shelf.racks:
                    opo = abs(float(rack.y) - float(chest_y))
                    theta = abs(math.degrees(math.atan(opo / adj_side)))

                    for product in rack.products:
                        score += math.cos(math.radians(theta)) * float(product.weight)

        score -= len(self.products_out) * 100

        return score

    def remove_product(self, product):
        for shelf in self.warehouse.shelves:
            for rack in shelf.racks:
                for prod in rack.products:
                    if prod == product:
                        rack.remove_product(product)
                        return

    def change_place(self, product):
        self.remove_product(product)
        self.add_product_random(product)

    # Return NONE If current_rack is at the top and there is nothing above
    def get_rack_above(self, current_rack):

        shelf = None

        for elem in self.warehouse.shelves:
            if elem.id == current_rack.shelf_id:
                shelf = shelf
                break

        if not shelf:
            return None

        rack_above = None

        for shelf_rack in shelf.racks:

            if shelf_rack.y < current_rack.y:
                continue

            if not rack_above:
                rack_above = shelf_rack

            elif rack_above.y > shelf_rack.y:
                rack_above = shelf_rack

        return rack_above

    def __lt__(self, other):
        return self.get_score() < other.get_score()

    def __str__(self) -> str:
        state = 'LAYOUT:\n'
        state += str(self.warehouse)
        return state


class Warehouse:
    def __init__(self, id):
        self.id = id
        self.shelves = []  # list of Shelves

    def add_shelf(self, shelf):
        self.shelves.append(shelf)

    def get_random_shelf(self):
        return self.shelves[r.randrange(0, len(self.shelves))]

    def __str__(self) -> str:
        state = ""
        state += f'WAREHOUSE ID: {self.id}\n'

        for shelf in self.shelves:
            state += f'\t{shelf}'
        return state


class Shelf:
    def __init__(self, id):
        self.id = id
        self.racks = []  # list of Racks

    def add_rack(self, rack):
        self.racks.append(rack)

    def get_random_rack(self):
        return self.racks[r.randrange(0, len(self.racks))]

    def __str__(self) -> str:
        state = ""
        state += f'SHELF {self.id} ----------------------------------------\n'
        for rack in self.racks:
            state += f'\t\t{rack}\n'
        return state


class Product:
    def __init__(self, id, name, length, height, width, weight, sector_id):
        self.id = id
        self.name = name
        self.length = length
        self.height = height
        self.width = width
        self.weight = weight
        self.sector_id = sector_id

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(str(self.id))

    def __str__(self) -> str:  # TODO: print other attributes
        state = ""
        state += f'PRODUCT {self.id}:\n'
        state += f'\t\t\t\t\tWEIGHT {self.weight}\n'
        state += f'\t\t\t\t\tWIDTH {self.width}\n'
        state += f'\t\t\t\t\tHEIGHT {self.height}\n'
        state += f'\t\t\t\t\tSECTOR_ID {self.sector_id}'
        return state


class Rack:
    def __init__(self, id, length, width, height, y, capacity, shelf_id):
        self.id = id
        self.length = length
        self.width = width
        self.height = height
        self.y = y
        self.capacity = capacity
        self.products = {}  # dictionary of Products {Product : (x_orig, x_end)}
        self.last_x = 0
        self.shelf_id = shelf_id

    def get_random_product(self):
        try:
            return r.choice(list(self.products.keys()))
        except IndexError:
            return None

    def add_product(self, product):

        if not valid_placement(self, product):
            return False

        self.products[product] = (self.last_x, self.last_x + product.width)
        self.last_x = self.last_x + product.width

        return True

    def remove_product(self, product):
        del self.products[product]

        products = deepcopy(list(self.products.keys()))

        self.products.clear()

        last_width = 0
        self.last_x = 0

        for prod in products:
            if self.add_product(prod):
                _, last_width = self.products[prod]

        self.last_x = last_width

    def get_current_weight(self):
        weight = 0
        for product in self.products.keys():
            weight += product.weight
        return weight

    def get_available_width(self):

        counter = self.width

        for product in self.products:
            counter -= product.width

        return counter

    def __str__(self) -> str:
        state = ""
        state += f'RACK {self.id}:\n'
        state += f'\t\t\tLENGTH: {self.length}\n'
        state += f'\t\t\tWIDTH: {self.width}\n'
        state += f'\t\t\tHEIGHT: {self.height}\n'
        state += f'\t\t\tY: {self.y}\n'
        state += f'\t\t\tCAPACITY: {self.capacity}\n'
        state += f'\t\t\tPRODUCTS:\n'
        for product, position in self.products.items():
            x_orig, x_end = position
            state += f'\t\t\t\t{product}\n'
            state += f'\t\t\t\t\tPOSITION: ({x_orig}, {x_end})\n'
        return state


class MonthManifesto:  # TODO: use this class instead of dictionary of dictionaries in get_manifestos()
    def __init__(self, products):
        self.products = products  # {id : quantity}


def valid_placement(rack, product):
    if (rack.get_current_weight() + product.weight) > rack.capacity:
        return False

    if (rack.last_x + product.width) > rack.width:
        return False

    if product.height > rack.height:
        return False

    return True
