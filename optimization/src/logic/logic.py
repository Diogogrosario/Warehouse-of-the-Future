from database import Database
from warehouse import *
from utils import *

db = Database()

query_warehouse = "SELECT * FROM warehouse"
query_shelf = "SELECT * FROM shelf"
query_product_rack = "SELECT * FROM product_rack"
query_rack = "SELECT * FROM rack"
query_product = "SELECT * FROM product"
query_month_manifesto = "SELECT * FROM month_manifesto"
query_month_manifesto_product = "SELECT * FROM month_manifesto_product"

warehouses = db.df_query(query_warehouse)
shelves = db.df_query(query_shelf)
racks = db.df_query(query_rack)
products = db.df_query(query_product)
product_rack = db.df_query(query_product_rack)
month_manifestos = db.df_query(query_month_manifesto)
month_manifesto_products = db.df_query(query_month_manifesto_product)

# Randomly generate a population of num layouts of the warehouse
def generate_population(manifesto, num):
    population = []
    for i in range(num):
        layout = Layout()
        
        population.append(layout)

    return population

if __name__ == '__main__':
    manifestos = get_manifestos(db, month_manifestos)

    print(manifestos)

    # initial_population = generate_population(manifesto, 10)