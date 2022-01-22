import mysql.connector
import pandas as pd


class Database:
    # Connect to MySQL server of a given database
    def __init__(self, database='test', docker=False):
        host = "localhost"
        port = 9002

        if docker:
            host = "db"
            port = 3306

        try:
            self.db = mysql.connector.connect(
                host=host,
                port=port,
                database=database,
                user="test",
                password="test"
            )

            if self.db.is_connected():
                db_version = self.db.get_server_info()
                print('Connected to MySQL. Version: ', db_version, ' Database: ', database)

        except Exception as e:
            print("Error connecting to MySQL database %s: ", database, e)

    # Execute SQL queries
    def execute(self, query, value=None):
        cursor = self.db.cursor(buffered=True)
        if not value:
            cursor.execute(query)
            try:
                records = cursor.fetchall()
                header = [i[0] for i in cursor.description]
                return {'header': header, 'records': records}
            except Exception as e:
                print(f"Error executing query: {query} Exception: {e}")
        else:
            cursor.execute(query, value)
            self.db.commit()
            return cursor.lastrowid

    # Execute SQL queries and retrieve a pandas dataframe
    def df_query(self, query, value=None):

        if not value:
            result = self.execute(query)

            if not result:
                return None

            if len(result['records']) == 0:
                return None

            df = pd.DataFrame(result['records'])
            df.columns = result['header']
            return df
        else:
            return self.execute(query, value)

    # Close the database connection
    def __del__(self):
        self.db.close()
