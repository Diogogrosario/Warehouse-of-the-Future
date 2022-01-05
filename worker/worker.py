import os

parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

from backend.api import db, generate_data as gen

exit = False

def populate_items():
    items = gen.Items().get()
    db.client.WoF.Items.insert_many(items)


def populate_layout():
    layout = gen.Layout().get()
    db.client.WoF.Layouts.insert_one(layout)


def populate_manifests():
    manifest = gen.Manifest().get()
    db.client.WoF.Manifests.insert_one(manifest)


def populate_sensor():
    sensors = gen.Sensors().get()
    db.client.WoF.Sensors.insert_many(sensors)


def populate_shelves():
    items = gen.Shelves().get()
    db.client.WoF.Shelves.insert_many(items)


def populate_staff():
    employees = gen.Staff().get()
    db.client.WoF.Employees.insert_many(employees)

while not exit:
    populate_items()
    populate_layout()
    populate_manifests()
    populate_sensor()
    populate_shelves()
    populate_staff()
    exit = True