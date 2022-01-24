from __future__ import annotations
import json
import os
import random


class Bucket:

    bucket_id = 1000

    def __init__(self, width: float, height: float) -> None:
        self.width = width
        self.height = height
        self.id = Bucket.bucket_id
        Bucket.bucket_id += 1

    def __str__(self) -> str:
        return str(self.__dict__)
    
    def __repr__(self) -> str:
        return str(self.__dict__)

class Shelf:
    def __init__(self, y: float, buckets: list[Bucket], grounded: bool=False) -> None:
        self.y = y
        self.buckets = buckets

        if (grounded):
            self.grounded = True

class Rack:
    def __init__(self, orientation: str, x: float, z: float, width: float, depth: float, height: float, shelves: list[Shelf], hasFrame: bool = True) -> None:
        self.orientation = orientation
        self.x = x
        self.z = z
        self.width = width
        self.depth = depth
        self.height = height
        self.shelves = shelves
        if (not hasFrame):
            self.hasFrame = False

    @staticmethod
    def random_layout(w: float):
        sample = [
            lambda: [ Bucket(1/4 * w, 0.33) for _ in range(random.randint(3, 4)) ],
            lambda: [ Bucket(1/3 * w, 0.33) for _ in range(random.randint(2, 3)) ],
            lambda: random.sample([ Bucket(1/6 * w, 0.33), Bucket(1/6 * w, 0.33), Bucket(1/3 * w, 0.33) ], k=3),
        ]
        return random.choice(sample)()

    @staticmethod
    def large_rack(orientation: str, x: float, z: float) -> Rack:
        return Rack(orientation, x, z, 2, 1, 4, [
            Shelf(0, [Bucket(1, 1) for _ in range(2)], grounded=True),
            Shelf(3, [Bucket(0.5, 0.33) for _ in range(3)])
        ])

    @staticmethod
    def single_bin(orientation: str, x: float, z: float) -> Rack:
        return Rack(orientation, x, z, 2, 1, 4, [
            Shelf(0, [Bucket(1, 1) for _ in range(2)], grounded=True)
        ], hasFrame=False)

    @staticmethod
    def normal_rack(orientation: str, x: float, z: float, shelves: int) -> Rack:
        w = 2
        h = 4
        return Rack(orientation, x, z, w, 1, h, [
            Shelf(i/shelves * h, Rack.random_layout(w)) for i in range(shelves)
        ])
    
    @staticmethod
    def wide_rack(orientation: str, x: float, z: float) -> Rack:
        shelfContents = [
            [Bucket(0.5, 0.33) for _ in range(5)],
            [Bucket(0.5, 0.33) for _ in range(4)],
            [Bucket(0.5, 0.33) for _ in range(6)],
            [Bucket(0.5, 0.33) for _ in range(3)],
            [Bucket(0.5, 0.33) for _ in range(4)]
        ]
        random.shuffle(shelfContents)
        return Rack(orientation, x, z, 3, 1, 5, [Shelf(i, shelfContents[i]) for i in range(5)])


class WarehouseDimensions:
    def __init__(self, width: float, depth: float, height: float) -> None:
        self.width = width
        self.depth = depth
        self.height = height


class Warehouse:
    def __init__(self, dimensions: WarehouseDimensions, racks: list[Rack]) -> None:
        self.dimensions = dimensions
        self.racks = racks

    @staticmethod
    def mock() -> Warehouse:
        dim = WarehouseDimensions(12, 15, 6)
        racks = []

        # Top racks
        for x in range(0, 12, 3):
            racks.append(Rack.wide_rack("south", x, 0))

        # Left corridor left racks
        for z in range(5, 15, 2):
            racks.append(Rack.large_rack("east", 0, z))

        # Left corridor right racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack("west", 5, z, 4))

        # Right corridor left racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack("east", 6, z, 3))

        # Right corridor right racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack("west", 11, z, random.randint(3, 4)))

        return Warehouse(dim, racks)


class WarehouseEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__

random.seed = 42
warehouse = Warehouse.mock()

# Save file
with open(os.path.dirname(__file__) + "/mock_json.json", "w") as json_file:
    json.dump(warehouse, json_file, indent=4, cls=WarehouseEncoder)
