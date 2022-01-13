from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv

if getenv('TESTING') == "True":
    load_dotenv('.env.test')
else:
    load_dotenv()

client = MongoClient(f"mongodb+srv://\
{getenv('MONGO_ATLAS_USERNAME')}:\
{getenv('MONGO_ATLAS_PASSWORD')}@{getenv('MONGO_ATLAS_SERVER')}/\
{getenv('MONGO_ATLAS_CLUSTER')}?retryWrites=true&w=majority")
