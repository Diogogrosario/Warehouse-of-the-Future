from __future__ import annotations
import json
import os


class Bucket:

    bucket_id = 1000

    def __init__(self, width: float, height: float) -> None:
        self.width = width
        self.height = height
        self.id = Bucket.bucket_id
        Bucket.bucket_id += 1


class Shelf:
    def __init__(self, y: float, buckets: list[Bucket]) -> None:
        self.y = y
        self.buckets = buckets


class Rack:
    def __init__(self, orientation: str, x: float, z: float, width: float, depth: float, height: float, shelves: list[Shelf]) -> None:
        self.orientation = orientation
        self.x = x
        self.z = z
        self.width = width
        self.depth = depth
        self.height = height
        self.shelves = shelves

    @staticmethod
    def large_rack(orientation: str, x: float, z: float) -> Rack:
        return Rack(orientation, x, z, 2, 1, 4, [
            Shelf(0, [Bucket(1, 1) for _ in range(2)]),
            Shelf(3, [Bucket(0.5, 0.33) for _ in range(3)])
        ])

    @staticmethod
    def normal_rack_4(orientation: str, x: float, z: float) -> Rack:
        return Rack(orientation, x, z, 2, 1, 4, [
            Shelf(0, [Bucket(0.5, 0.33) for _ in range(4)]),
            Shelf(1, [Bucket(0.5, 0.33) for _ in range(4)]),
            Shelf(2, [Bucket(0.5, 0.33) for _ in range(4)]),
            Shelf(3, [Bucket(0.5, 0.33) for _ in range(4)])
        ])

    @staticmethod
    def normal_rack_3(orientation: str, x: float, z: float) -> Rack:
        return Rack(orientation, x, z, 2, 1, 4, [
            Shelf(0, [Bucket(0.5, 0.33) for _ in range(4)]),
            Shelf(4/3, [Bucket(0.5, 0.33) for _ in range(4)]),
            Shelf(2 * 4/3, [Bucket(0.5, 0.33) for _ in range(4)]),
        ])


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
        dim = WarehouseDimensions(14, 16, 6)
        racks = []

        # Top racks
        for x in range(0, 14, 2):
            racks.append(Rack.normal_rack_4("south", x, 0))

        # Only north rack
        racks.append(Rack.normal_rack_4("north", 0, 5))

        # Left corridor left racks
        for z in range(5, 15, 2):
            racks.append(Rack.large_rack("east", 2, z))

        # Left corridor right racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack_4("west", 7, z))

        # Right corridor left racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack_3("east", 8, z))

        # Right corridor right racks
        for z in range(5, 15, 2):
            racks.append(Rack.normal_rack_4("west", 13, z))

        return Warehouse(dim, racks)


class WarehouseEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__


warehouse = Warehouse.mock()

# Save file
with open(os.path.dirname(__file__) + "/mock_json.json", "w") as json_file:
    json.dump(warehouse, json_file, indent=4, cls=WarehouseEncoder)
