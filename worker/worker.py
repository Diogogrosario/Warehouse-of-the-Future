import os, sched, time

import requests

parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.sys.path.append(parentdir)

from backend.api import db

DAILY_MANIFESTS = 30
terminate = False

API_BASE_URL = "http://localhost:8001/generate_data"


# Call when wanting to terminate worker
def terminate_worker():
    global terminate
    terminate = True


# Manifest
def populate_manifests(n_items):
    manifest = requests.get(f"{API_BASE_URL}/manifest/{n_items}").json()
    db.client.WoF.Manifests.insert_one(manifest)


# Layout
def populate_buckets(buckets):
    db.client.WoF.Buckets.insert_many(buckets)


def populate_items(items):
    db.client.WoF.Items.insert_many(items)


def populate_racks(racks):
    db.client.WoF.Racks.insert_many(racks)


def populate_sensors(sensors):
    db.client.WoF.Sensors.insert_many(sensors)


def populate_shelves(shelves):
    db.client.WoF.Shelves.insert_many(shelves)


def populate_layouts():
    layout = requests.get(f"{API_BASE_URL}/layout").json()

    # Use layout data to populate other collections
    populate_buckets(layout["buckets"])
    #populate_items(layout["items"])
    populate_racks(layout["racks"])
    populate_sensors(layout["sensors"])
    populate_shelves(layout["shelves"])

    # Finally, populate Layouts collection
    final_layout = {"time": layout["time"], "buckets": layout["buckets"]}
    db.client.WoF.Layouts.insert_one(final_layout)

    return len(layout["items"])


# Global Data
def populate_global():
    db.client.WoF.GlobalData.drop()
    db.client.WoF.create_collection("GlobalData")

    # Add orchestrator and cart data
    orchestrator = requests.get(f"{API_BASE_URL}/orchestrator").json()
    cart = requests.get(f"{API_BASE_URL}/cart").json()
    data = {"orchestrator": orchestrator, "cart": cart}

    db.client.WoF.GlobalData.insert_one(data)


# Staff
def populate_staff():
    db.client.WoF.Employees.drop()
    db.client.WoF.create_collection("Employees")
    employees = requests.get(f"{API_BASE_URL}/staff").json()
    db.client.WoF.Employees.insert_many(employees)


# Worker starts by populating staff and global, which are needed only once
populate_staff()
populate_global()

# Then periodically adds manifests and layouts
s = sched.scheduler(time.time, time.sleep)

def populate_periodic():
    # Schedule another populate action
    event = s.enter(172800, 1, populate_periodic)

    counter = 0

    # For each day, add 1 layout and DAILY_MANIFESTS manifests
    n_items = populate_layouts()

    while (counter < DAILY_MANIFESTS):
        populate_manifests(n_items)
        counter += 1

    # If terminated, cancels last scheduled populate action
    if terminate:
        s.cancel(event)

s.enter(0, 1, populate_periodic)
s.run()