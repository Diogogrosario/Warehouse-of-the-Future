import math
import random
import sys
import itertools
import random as r
import numpy as np
from copy import deepcopy
from constants import MAX_ITERATIONS

worker_average_height = 1.75


class Layout:
    def __init__(self, warehouse, metrics_to_optimize):
        self.warehouse = warehouse
        self.products_out = []
        self.metrics_to_optimize = metrics_to_optimize

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

    def get_product_rack_id(self, product):  # Assuming that each product ID is unique
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
            if iteration == MAX_ITERATIONS:
                self.products_out.append(product)
                break
            random_shelf = r.choice(self.warehouse.shelves)
            random_rack = r.choice(random_shelf.racks)
            success = random_rack.add_product(product)

    def get_score(self):
        score = 0

        if 'weight' in self.metrics_to_optimize.keys():
            factor = int(self.metrics_to_optimize['weight']['factor'])
            weight_score = 0
            max_score = 0
            max_int = sys.maxsize * 2 + 1
            min_y = max_int

            for shelf in self.warehouse.shelves:
                for rack in shelf.racks:
                    # find min_y (this condition should happen at least once)
                    if (rack.y < min_y):
                        min_y = max(float(rack.y), 0.01)
                    for product in rack.products:
                        max_score += float(product.weight) / min_y
                        weight_score += float(product.weight) / max(float(rack.y), 0.01)

            score += (weight_score / max_score) * factor


        if 'work' in self.metrics_to_optimize.keys():
            factor = int(self.metrics_to_optimize['work']['factor'])
            work_score = 0
            max_score = 0
            adj_side = 0.2
            chest_y = worker_average_height * (2.0 / 3.0)

            for shelf in self.warehouse.shelves:

                for rack in shelf.racks:
                    opo = abs(float(rack.y) - float(chest_y))
                    theta = abs(math.degrees(math.atan(opo / adj_side)))

                    for product in rack.products:
                        max_score += float(product.weight)
                        work_score += math.cos(math.radians(theta)) * float(product.weight)

            score += (work_score / max_score) * factor

        if 'frequency' in self.metrics_to_optimize.keys():
            factor = int(self.metrics_to_optimize['frequency']['factor'])
            frequency_score = 0
            max_score = 0
            shelves_frequencies = []

            for shelf in self.warehouse.shelves:
                shelf_frequency = 0
                for rack in shelf.racks:
                    for product in rack.products:
                        max_score += float(product.frequency)
                        shelf_frequency += float(product.frequency)

                shelves_frequencies.append(shelf_frequency)

            shelves_frequencies = sorted(shelves_frequencies)

            frequency_score += float(sum(np.diff(shelves_frequencies)))

            score += (frequency_score / max_score) * factor

        if 'organization' in self.metrics_to_optimize.keys():
            factor = int(self.metrics_to_optimize['organization']['factor'])
            organization_score = 0
            total_types = {}

            shelves_count_types = []

            for shelf in self.warehouse.shelves:
                count_types = {}  # { type_x : n_products_type_x }

                for rack in shelf.racks:
                    for product in rack.products:
                        if product.type_id not in count_types:
                            count_types[product.type_id] = 1
                        else:
                            count_types[product.type_id] += 1

                shelves_count_types.append(count_types)

            for dic in shelves_count_types:

                if dic:
                    max_key = max(dic, key=dic.get)
                    max_val = dic[max_key]

                    organization_score += 2 ** max_val

                    # If more than 1 type start penalizing
                    values = sorted(dic.values(), reverse=True)[1:]

                    for val in values:
                        organization_score -= 2 ** (val ** 2)

            # Get dictionary {p_type : total_count}
            for dic in shelves_count_types:
                if dic:
                    for p_type in dic:
                        if (p_type in total_types):
                            total_types[p_type] += dic[p_type]
                        else:
                            total_types[p_type] = dic[p_type]

            # Descending sorted list with number of products of each type
            total_types_arr = sorted([val for _, val in total_types.items()], reverse=True)
            max_score = 0

            num_shelves = len(self.warehouse.shelves)

            for elem in total_types_arr:
                if num_shelves == 0:
                    missing_types = total_types_arr[len(self.warehouse.shelves):]
                    for missing_elem in missing_types:
                        max_score -= 2 ** (missing_elem ** 2)
                    break

                max_score += 2 ** elem
                num_shelves = num_shelves - 1

            score += (organization_score / max_score) * factor

        if 'minimize-errors' in self.metrics_to_optimize:
            factor = int(self.metrics_to_optimize['minimize-errors']['factor'])
            minimize_errors_score = 0

            shelves_count_types = {} # shelf_id : [{type_x : num_x, type_y, num_y, ...}, ...]
            shelves_similarities_scores = {} # shelf_id : score

            for shelf in self.warehouse.shelves:
                count_types = {}  # { type_x : n_products_type_x }
                products_properties = {} # type_x : [[prod_1_height, prod_1_width, prod_1_weight], ...]
    
                for rack in shelf.racks:
                    for product in rack.products:
                        if product.type_id not in count_types:
                            count_types[product.type_id] = 1
                        else:
                            count_types[product.type_id] += 1

                        if product.type_id not in products_properties:
                            products_properties[product.type_id] = [[float(product.height), float(product.width), float(product.weight)]]
                        else:
                            products_properties[product.type_id].append([float(product.height), float(product.width), float(product.weight)])

                shelves_count_types[shelf.id] = count_types

                repeated_types = []
                for p_type, products in products_properties.items():
                    if len(products) > 1:
                        repeated_types.append(products)

                shelves_similarities_scores[shelf.id] = len(repeated_types) if len(repeated_types) > 0 else 1
                for type_products in repeated_types:
                    product_pairs = list(itertools.combinations(type_products, 2))
                    differences = []
                    for pair in product_pairs:
                        dif = np.linalg.norm(np.array(pair[0]) - np.array(pair[1]))
                        differences.append(dif)

                    num_intervals = len(type_products) - 1
                    biggest_differences = sorted(differences, reverse=True)[:num_intervals]

                    difference_sum = sum(biggest_differences) / (len(biggest_differences)**5)
                    shelves_similarities_scores[shelf.id] -= 1/difference_sum if difference_sum != 0 else 1/len(type_products)

                if len(repeated_types) > 0:
                    shelves_similarities_scores[shelf.id] = shelves_similarities_scores[shelf.id] / len(repeated_types)

            for id, dic in shelves_count_types.items():
                if dic:
                    repeated_values = sum(dic.values()) - len(dic)
                    minimize_errors_score += 1/(1.5**repeated_values)
                    minimize_errors_score += shelves_similarities_scores[id]

                max_score = 2*len(self.warehouse.shelves)

            score += (minimize_errors_score / max_score) * factor

        # Penalize layouts with products out
        score -= len(self.products_out) * 100

        return score

    def remove_product(self, product):   # username : { ip: , port: , followers:[] , following:[] }
        for shelf in self.warehouse.shelves:
            for rack in shelf.racks:
                for prod in rack.products:
                    if prod == product:
                        rack.remove_product(product)
                        return

    def change_place(self, product):
        self.remove_product(product)
        self.add_product_random(product)

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

    def get_num_products(self):
        num_products = 0
        for rack in self.racks:
            num_products += len(rack.products)

        return num_products

    def __str__(self) -> str:
        state = ""
        state += f'SHELF {self.id} ---------------------------------------- ({self.get_num_products()} products)\n'
        for rack in self.racks:
            state += f'\t\t{rack}\n'
        return state


class Product:
    def __init__(self, id, name, height, width, weight, type_id, frequency):
        self.id = id
        self.name = name
        self.height = height
        self.width = width
        self.weight = weight
        self.type_id = type_id
        self.frequency = frequency

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(str(self.id))

    def __str__(self) -> str:
        state = ""
        state += f'PRODUCT {self.id}:\n'
        state += f'\t\t\t\t\tNAME {self.name}\n'
        state += f'\t\t\t\t\tWEIGHT {self.weight}\n'
        state += f'\t\t\t\t\tWIDTH {self.width}\n'
        state += f'\t\t\t\t\tHEIGHT {self.height}\n'
        state += f'\t\t\t\t\tTYPE_ID {self.type_id}\n'
        state += f'\t\t\t\t\tFREQUENCY {self.frequency}'
        return state


class Rack:
    def __init__(self, id, width, height, y, capacity, shelf_id):
        self.id = id
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

    def __str__(self) -> str:
        state = ""
        state += f'RACK {self.id}:\n'
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


def valid_placement(rack, product):
    if (rack.get_current_weight() + product.weight) > rack.capacity:
        return False

    if (rack.last_x + product.width) > rack.width:
        return False

    if product.height > rack.height:
        return False

    return True
