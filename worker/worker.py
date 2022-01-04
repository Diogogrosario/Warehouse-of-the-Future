import os

parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

from backend.api import db, generate_data as gen

client = db.client
print(client)

"""def populate_items():
    items = gen.Items().get()
    client.WoF.Items.insert_many(items)


def populate_layout():
    layout = gen.Layout().get()
    client.WoF.Layouts.insert_one(layout)


def populate_manifests():
    manifest = gen.Manifest().get()
    client.WoF.Manifests.insert_one(manifest)


def populate_sensor():
    sensors = gen.Sensors().get()
    client.WoF.Sensors.insert_many(sensors)


def populate_shelves():
    items = gen.Shelves().get()
    client.WoF.Shelves.insert_many(items)


def populate_staff():
    employees = gen.Staff().get()
    client.WoF.Employees.insert_many(employees)


populate_items()
populate_layout()
populate_manifests()
populate_sensor()
populate_shelves()
populate_staff()
"""

def populate_manifests():
    manifest = gen.Manifest().get()
    client.WoF.Manifests.insert_one(manifest)

populate_manifests()