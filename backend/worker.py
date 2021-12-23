from api import generate_data as gen 

from api.db import client

def populate_items():
    items = gen.Items().get()
    new_ids = client.WoF.Items.insert_many(items).inserted_ids

def populate_layout():
    layout = gen.Layout().get()
    new_id = client.WoF.Layouts.insert_one(layout).inserted_id

def populate_manifests():
    manifest = gen.Manifest().get()
    new_id = client.WoF.Manifests.insert_one(manifest).inserted_id

def populate_sensor():
    sensors = gen.Sensors().get()
    new_ids = client.WoF.Sensors.insert_many(sensors).inserted_ids

def populate_shelves():
    items = gen.Shelves().get()
    new_ids = client.WoF.Shelves.insert_many(items).inserted_ids

def populate_staff():
    employees = gen.Staff().get()
    new_ids = client.WoF.Employees.insert_many(employees).inserted_ids

populate_items()
populate_layout()
populate_manifests()
populate_sensor()
populate_shelves()
populate_staff()
