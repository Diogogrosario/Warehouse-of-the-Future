from database import Database
from warehouse import *
from utils import *

db = Database()

query_warehouse = "SELECT * FROM warehouse"
query_month_manifesto = "SELECT * FROM month_manifesto"

warehouses = db.df_query(query_warehouse)
month_manifestos = db.df_query(query_month_manifesto)

# Randomly generate a population of num layouts of the warehouse
def generate_population(warehouse_id, manifesto, num):
    population = []
    for _ in range(num):
        layout = Layout(warehouse_id)

        population.append(layout)

    return population

if __name__ == '__main__':
    storage = Storage(db)

    manifestos = storage.get_manifestos(month_manifestos)
    manifesto = manifestos[1] # Initial test with only 1 manifesto
    warehouse_id = warehouses.iloc[0]['id'] # Initial test with only 1 warehouse

    warehouse = storage.create_warehouse(warehouse_id)

    print(warehouse)

    # initial_population = generate_population(warehouse_id, manifesto, 10)