from database import Database
from warehouse import *

db = Database()

query_warehouse = "SELECT * FROM warehouse"
query_shelf = "SELECT * FROM shelf"
query_rack_piece = "SELECT * FROM rack_piece"
query_rack = "SELECT * FROM rack"
query_piece = "SELECT * FROM piece"

warehouse = db.df_query(query_warehouse)
shelf = db.df_query(query_shelf)
rack = db.df_query(query_rack)
piece = db.df_query(query_piece)
rack_piece = db.df_query(query_rack_piece)

# Randomly generate a population of num layouts of the warehouse
def generate_population(manifesto, num):
    population = []
    for i in range(num):
        layout = Layout()
        
        population.append(layout)

    return population
    
if __name__ == '__main__':
    # TODO: Receber os dados de um manifesto - falta ter essa data na base de dados
    initial_population = generate_population(manifesto, 10)