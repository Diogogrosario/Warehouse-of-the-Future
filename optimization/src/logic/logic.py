from database import Database
from warehouse import *
from utils import *
from copy import deepcopy

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

if __name__ == '__main__':
    manifestos = storage.get_manifestos(month_manifestos)
    manifesto = manifestos[1] # Initial test with only 1 manifesto
    warehouse_id = warehouses.iloc[0]['id'] # Initial test with only 1 warehouse

    warehouse = storage.create_warehouse(warehouse_id)

    initial_population = generate_population(warehouse, manifesto, 10)
    
    for layout in initial_population:
        print(layout)