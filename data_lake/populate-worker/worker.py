import sched
import time
import requests
from bson.objectid import ObjectId

import db

DAILY_MANIFESTS = 30
terminate = False
reset = False

API_BASE_URL = "http://backend:5000/generate_data"


# Call when wanting to terminate worker
def terminate_worker():
    global terminate
    terminate = True


# Manifest
def populate_manifests():
    manifest = requests.get(f"{API_BASE_URL}/manifest").json()

    manifest["_id"] = ObjectId(manifest["_id"]["$oid"])
    manifest["staff_id"] = ObjectId(manifest["staff_id"])

    db.client.WoF.Manifests.insert_one(manifest)


# Layout
def populate_buckets(buckets):
    for bucket in buckets:
        bucket["_id"] = ObjectId(bucket["_id"]["$oid"])

    db.client.WoF.Buckets.insert_many(buckets)


def populate_racks(racks):
    for rack in racks:
        rack["_id"] = ObjectId(rack["_id"]["$oid"])

    db.client.WoF.Racks.insert_many(racks)


def populate_sensors(sensors):
    for sensor in sensors:
        sensor["_id"] = ObjectId(sensor["_id"]["$oid"])

    db.client.WoF.Sensors.insert_many(sensors)


def populate_devices(devices):
    for device in devices:
        device["_id"] = ObjectId(device["_id"]["$oid"])

    db.client.WoF.Devices.insert_many(devices)


def populate_shelves(shelves):
    for shelf in shelves:
        shelf["_id"] = ObjectId(shelf["_id"]["$oid"])

    db.client.WoF.Shelves.insert_many(shelves)


def populate_layouts():
    layout = requests.get(f"{API_BASE_URL}/layout").json()

    # Use layout data to populate other collections
    populate_buckets(layout["buckets"])
    populate_racks(layout["racks"])
    populate_sensors(layout["sensors"])
    populate_devices(layout["devices"])
    populate_shelves(layout["shelves"])

    bucket_ids = [bucket["_id"] for bucket in layout["buckets"]]

    # Finally, populate Layouts collection
    final_layout = {"time": layout["time"], "buckets": bucket_ids}
    db.client.WoF.Layouts.insert_one(final_layout)


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

    for employee in employees:
        employee["_id"] = ObjectId(employee["_id"])

    db.client.WoF.Employees.insert_many(employees)


# Items
def populate_items():
    db.client.WoF.Items.drop()
    db.client.WoF.create_collection("Items")
    items = requests.get(f"{API_BASE_URL}/items").json()

    for item in items:
        item["_id"] = ObjectId(item["_id"]["$oid"])

    db.client.WoF.Items.insert_many(items)


if (reset):
    db.client.WoF.Buckets.drop()
    db.client.WoF.create_collection("Buckets")
    db.client.WoF.Shelves.drop()
    db.client.WoF.create_collection("Shelves")
    db.client.WoF.Devices.drop()
    db.client.WoF.create_collection("Devices")
    db.client.WoF.Sensors.drop()
    db.client.WoF.create_collection("Sensors")
    db.client.WoF.Layouts.drop()
    db.client.WoF.create_collection("Layouts")
    db.client.WoF.Racks.drop()
    db.client.WoF.create_collection("Racks")
    db.client.WoF.Manifests.drop()
    db.client.WoF.create_collection("Manifests")

time.sleep(5)

# Worker starts by populating staff and global, which are needed only once
populate_staff()
populate_items()
populate_global()

# Then periodically adds manifests and layouts
s = sched.scheduler(time.time, time.sleep)


def populate_periodic():
    # Schedule another populate action the next day
    event = s.enter(172800, 1, populate_periodic)

    counter = 0

    # For each day, add 1 layout and DAILY_MANIFESTS manifests
    populate_layouts()

    while (counter < DAILY_MANIFESTS):
        populate_manifests()
        counter += 1

    # If terminated, cancels last scheduled populate action
    if terminate:
        s.cancel(event)


s.enter(0, 1, populate_periodic)
s.run()
