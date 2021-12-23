import concurrent.futures

from .db import client

import backend.api.generate_data as gen

class Worker:
    def __init__(self):
        self.threadpool = concurrent.futures.ThreadPoolExecutor(max_workers=50)
        self.exit = False
        self.start()

    def start(self):
        while not self.exit:
            self.threadpool.submit(self.populate_items)
            self.threadpool.submit(self.populate_layout)
            self.threadpool.submit(self.populate_manifests)
            self.threadpool.submit(self.populate_sensor)
            self.threadpool.submit(self.populate_shelves)
            self.threadpool.submit(self.populate_staff)

    def populate_items(self):
        items = gen.Items.get()
        new_ids = client.WoF.Items.insert_many(items).insertedIds

    def populate_layout(self):
        layout = gen.Layout.get()
        new_id = client.WoF.Layouts.insert_one(layout).insertedId

    def populate_manifests(self):
        manifest = gen.Manifests.get()
        new_id = client.WoF.Manifests.insert_one(manifest).insertedId

    def populate_sensor(self):
        sensors = gen.Sensors.get()
        new_ids = client.WoF.Sensors.insert_many(sensors).insertedIds

    def populate_shelves(self):
        items = gen.Shelves.get()
        new_ids = client.WoF.Shelves.insert_many(items).insertedIds

    def populate_staff(self):
        employees = gen.Staff.get()
        new_ids = client.WoF.Staff.insert_many(employees).insertedIds
