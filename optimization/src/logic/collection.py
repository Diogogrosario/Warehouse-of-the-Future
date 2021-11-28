from database import Database

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

# print(warehouse)
# print(shelf)
# print(rack)
# print(piece)
# print(rack_piece)
