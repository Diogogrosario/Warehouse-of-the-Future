import heapq
import sys
from copy import deepcopy
from datetime import datetime

from database import Database
from storage import *
from warehouse import *

db = None
storage = None


# Randomly generate a population of num layouts of the warehouse
def generate_population(warehouse, num):
    population = []

    for index in range(num):
        layout = Layout(deepcopy(warehouse))
        layout = storage.fill_warehouse(layout)
        population.append(layout)

    return population


def reproduce(parent1, parent2, warehouse):
    # percorrer todos os produtos
    # para cada produto, fazer random(1,2) e ir buscá-lo ao respetivo pai
    # caso estiverem os 2 ocupados, escolher rack aleatória
    parents = [parent1, parent2]

    products = sorted(storage.products, key=lambda x: (x.weight, x.width), reverse=True)

    child = Layout(deepcopy(warehouse), metrics_to_optimize)

    for product in products:
        parent = r.randint(0, 1)
        rack_id = parents[parent].get_product_rack_id(product)
        if rack_id and not child.add_product_rack_id(rack_id, product):
            parent = 1 - parent
            rack_id = parents[parent].get_product_rack_id(product)
            if rack_id and not child.add_product_rack_id(rack_id, product):
                child.add_product_random(product)

    return child


def genetic_algorithm(warehouse, population, num_iterations):
    heapq.heapify(population)
    length = len(population)

    for index in range(num_iterations):
        parent1 = heapq.nlargest(1, population)[0]  # best layout
        parent2 = heapq.nsmallest(length - 1, population)[r.randint(0, length - 2)]  # random layout
        child = reproduce(parent1, parent2, warehouse)

        if r.uniform(0, 1.0) > 0.80:  # mutation with a chance of 20%
            mutate(child)

        heapq.heapreplace(population, child)  # remove the worst layout and add the new child

    final_layout = heapq.nlargest(1, population)[0]  # best layout
    print(f'FINAL_SCORE {str(final_layout.get_score())}')
    print(f'PRODUCTS OUT: {len(final_layout.products_out)}')
    return final_layout


def mutate(child):
    product = child.get_random_product()
    child.change_place(product)


def dump_results_to_database(layout):
    query_insert_result = f"INSERT INTO Results (date_issued) values (%s)"

    db.df_query(query_insert_result, [datetime.now().strftime('%Y-%m-%d %H:%M:%S')])

    result_id_inserted = f"SELECT MAX(id) FROM RESULTS"

    result_id = int(db.df_query(result_id_inserted).at[0, 'MAX(id)'])

    for out_product in layout.products_out:
        query_insert_out_product = f"INSERT INTO Products_Left_Out (result_id,product_id) values (%s,%s)"
        db.df_query(query_insert_out_product, [result_id, out_product.id])

    for shelf in layout.warehouse.shelves:
        for rack in shelf.racks:
            for product, position in rack.products.items():
                x_orig, x_end = position
                query_insert_out_product_rack = f"INSERT INTO Product_Rack (x_orig,x_end,result_id,rack_id,product_id) values (%s,%s,%s,%s,%s)"
                db.df_query(query_insert_out_product_rack, [x_orig, x_end, result_id, rack.id, product.id])


def main(docker=False, list_parameters=None):
    global db
    global storage
    global metrics_to_optimize

    if list_parameters is None:
        list_parameters = []

    metrics_to_optimize = list_parameters

    # Overwrite Database configs if Docker tag is defined
    if docker or len(sys.argv) > 1 and sys.argv[1] == 'docker':
        db = Database('test', True)
        storage = Storage(db)
        print("Running Docker ENV")
    else:
        db = Database()
        storage = Storage(db)

    query_warehouse = "SELECT * FROM warehouse"

    warehouses = db.df_query(query_warehouse)
    # month_manifestos = db.df_query(query_month_manifesto)

    # manifestos = storage.get_manifestos(month_manifestos)
    # manifesto = manifestos[1]  # Initial test with only 1 manifesto
    warehouse_id = warehouses.iloc[0]['id']  # Initial test with only 1 warehouse

    warehouse = storage.create_warehouse(warehouse_id)

    initial_population = generate_population(warehouse, 10)

    final_layout = genetic_algorithm(warehouse, initial_population, max_iterations)

    print('----- FINAL LAYOUT -----')
    print(final_layout)

    print('----- Out Products -----')

    if len(final_layout.products_out) > 0:
        for out_product in final_layout.products_out:
            print(out_product)
    else:
        print('No products were left out')

    dump_results_to_database(final_layout)


if __name__ == '__main__':
    main()
