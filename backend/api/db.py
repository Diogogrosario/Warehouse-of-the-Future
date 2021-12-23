from pymongo import MongoClient
from os import getenv

client = MongoClient(f"mongodb+srv://\
{getenv('MONGO_ATLAS_USERNAME')}:\
{getenv('MONGO_ATLAS_PASSWORD')}@ds.420ei.mongodb.net/\
{getenv('MONGO_ATLAS_DATABASE')}?retryWrites=true&w=majority")
