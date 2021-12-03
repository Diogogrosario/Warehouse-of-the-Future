from database import Database
from warehouse import *
from utils import *
from copy import deepcopy
import heapq
import random as r

db = Database()
storage = Storage(db)

query_warehouse = "SELECT * FROM warehouse"
query_month_manifesto = "SELECT * FROM month_manifesto"

warehouses = db.df_query(query_warehouse)
month_manifestos = db.df_query(query_month_manifesto)


# Randomly generate a population of num layouts of the warehouse
def generate_population(warehouse, manifesto, num):
    population = []

    for _ in range(num):
        layout = Layout(deepcopy(warehouse))
        layout = storage.fill_warehouse(layout)
        population.append(layout)

    return population


def reproduce(parent1, parent2, warehouse):
    # percorrer todos os produtos
    # para cada produto, fazer random(1,2) e ir buscá-lo ao respetivo pai
    # caso estiverem os 2 ocupados, escolher rack aleatória
    parents = [parent1, parent2]

    products = sorted(storage.products, key=lambda x: x.weight, reverse=True)

    child = Layout(deepcopy(warehouse))

    for product in products:
        parent = r.randint(0, 1)
        rack_id = parents[parent].get_product_rack_id(product)
        if not child.add_product_rack_id(rack_id, product):
            parent = 1 - parent
            rack_id = parents[parent].get_product_rack_id(product)
            if not child.add_product_rack_id(rack_id, product):
                child.add_product_random(product)

    return child


def genetic_algorithm(warehouse, population, num_iterations):
    heapq.heapify(population)
    length = len(population)

    for i in range(num_iterations):
        print(f'Iteration {i}:')
        parent1 = heapq.nlargest(1, population)[0]  # best layout
        parent2 = heapq.nsmallest(length - 1, population)[r.randint(0, length - 2)]  # random layout
        child = reproduce(parent1, parent2, warehouse)

        if r.uniform(0, 1.0) > 0.80:  # mutation with a chance of 20%
            print("MUTATING")
            mutate(child)

        worst_score = heapq.heapreplace(population, child).get_score()  # remove the worst layout and add the new child

        print(f'WORST_SCORE {str(worst_score)}')

    final_layout = heapq.nlargest(1, population)[0]  # best layout
    print(f'FINAL_SCORE {str(final_layout.get_score())}')
    return final_layout


def mutate(child):
    product = child.get_random_product()
    child.change_place(product)


if __name__ == '__main__':
    manifestos = storage.get_manifestos(month_manifestos)
    manifesto = manifestos[1]  # Initial test with only 1 manifesto
    warehouse_id = warehouses.iloc[0]['id']  # Initial test with only 1 warehouse

    warehouse = storage.create_warehouse(warehouse_id)

    initial_population = generate_population(warehouse, manifesto, 10)

    for layout in initial_population:
        print(layout)

    num_iterations = 100

    final_layout = genetic_algorithm(warehouse, initial_population, num_iterations)

    print('----- FINAL LAYOUT -----')
    print(final_layout)
