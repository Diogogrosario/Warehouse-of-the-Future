from flask_restx import Namespace, Resource
import random
import datetime
import names
import json
import secrets
from .utils import utils
from bson.objectid import ObjectId
from bson import json_util

namespace = Namespace(
    "GenerateData",
    path="/generate_data",
    description="Generate random data to simulate the warehouse.\
        This endpoint is only used by the populate worker."
)

available_item_names = []

with open("./api/static_files/items_ids.json", "r") as file:
    available_item_names = json.load(file)


# ------------------------------------------------------------------------------
# Manifests
# ------------------------------------------------------------------------------

def generate_items_for_manifest():
    manifest_items = []

    static_items = get_static_items_data()
    items_ids = [item["_id"] for item in static_items]

    selected_items_indexes = random.sample(
        range(0, len(items_ids)-1),
        random.randint(1, 4)
    )

    for index in selected_items_indexes:
        id = items_ids[index]

        quantity = random.randint(1, 3)

        manifest_items.append({
            "item_id": ObjectId(id),
            "quantity": quantity
        })

    return json.loads(json_util.dumps(manifest_items))


def get_static_items_ids():
    with open("./api/static_files/items_ids.json", "r") as file:
        return json.load(file)


@namespace.route("/manifest")
class Manifest(Resource):
    def get(self):
        """
        Returns a random manifest.
        """

        items = generate_items_for_manifest()
        employees = get_static_employee_data()

        manifest = {
            "_id": ObjectId(secrets.token_hex(12)),
            "time": str(datetime.datetime.now()),
            "staff_id": random.choice(employees)["_id"],
            "items": items
        }

        return json.loads(json_util.dumps(manifest))


# ------------------------------------------------------------------------------
# Staff
# ------------------------------------------------------------------------------

def generate_employee_data(id=None):
    if (id is None):
        id = ObjectId(secrets.token_hex(12))

    employee = {
        "_id": id,
        "name": names.get_full_name(),
        "height": round(random.uniform(140, 220)),
        "birth_date": str(utils.get_random_birth_date()),
    }

    return json.loads(json_util.dumps(employee))


def get_static_employee_data():
    with open("./api/static_files/staff.json", "r") as file:
        return json.load(file)


GENERATE_RANDOM_STAFF = False


@namespace.route("/staff")
class Staff(Resource):
    def get(self):
        """
        Returns a list with all the employees.
        """

        if GENERATE_RANDOM_STAFF:
            number_of_employees = random.randint(100, 150)
            employees = [
                generate_employee_data() for _ in range(number_of_employees)
            ]
        else:
            employees = get_static_employee_data()

        # for employee in employees:
        #     employee["_id"] = ObjectId(employee["_id"])

        return json.loads(json_util.dumps(employees))


# ------------------------------------------------------------------------------
# Items
# ------------------------------------------------------------------------------


def get_static_items_data():
    with open("./api/static_files/items.json", "r") as file:
        return json.load(file)


@namespace.route("/items")
class Item(Resource):
    def get(self):
        """
        Returns a list with all the items.
        """

        items = get_static_items_data()

        for item in items:
            item["_id"] = ObjectId(item["_id"])

        return json.loads(json_util.dumps(items))


# ------------------------------------------------------------------------------
# Orchestrator
# ------------------------------------------------------------------------------

@namespace.route("/orchestrator")
class Orchestrator(Resource):
    def get(self):
        """
        Returns the position of the orchestrator.
        """

        orchestrator = {
            "position": utils.get_position(),
        }

        return orchestrator


# ------------------------------------------------------------------------------
# Layout
# ------------------------------------------------------------------------------

# Dimentions of the warehouse, in cm

# Super rack 1 and 3 are parallel
#         s-rack2
# |---------------------| -> point (width2, width3)
# |                     |
# | s-rack1             | s-rack3
# |                     |
# | <- point (0, 0)     | -> point (width2, 0)

# cart starts at (width2/2, 0)

SUPER_RACK1_MAX_WIDTH = 20*100
SUPER_RACK2_MAX_WIDTH = 10*100
SUPER_RACK3_MAX_WIDTH = 20*100

RACK_MIN_WIDTH = 1*100
RACK_MAX_WIDTH = 4*100
RACK_MIN_HEIGHT = 2*100
RACK_MAX_HEIGHT = 4*100

# Assuming all the shelfs have a length of 95cm
RACK_LENGTH = 0.95*100

# height of the rack (not in relation to the ground)
SHELF_MIN_HEIGHT = 0.3*100
SHELF_MAX_HEIGHT = 1*100

BUCKET_MIN_WIDTH = 0.2*100
BUCKET_MAX_WIDTH = 0.4*100
BUCKET_MIN_HEIGHT = 0.1*100
BUCKET_MAX_HEIGHT = 0.7*100
BUCKET_MIN_LENGTH = 0.3*100
BUCKET_MAX_LENGTH = 0.9*100


# The super_rack_number is accordingly to the above diagram;
# The final_previous_super_rack_width tells us the real width of the
# previously created super rack, so it is not applicable to the first one
def generate_super_rack(
    super_rack_number,
    final_previous_super_rack_width,
    staff_ids,
    items_ids,
):
    sensors = []
    buckets = []
    racks = []
    shelves = []
    devices = []

    # track the width of the racks we are creating
    current_super_rack_width = 0
    final_current_super_rack1_width = 0

    # Super rack 1
    while (True):
        rack_width = random.randint(
            RACK_MIN_WIDTH,
            RACK_MAX_WIDTH
        )
        current_super_rack_width += rack_width

        if (current_super_rack_width > SUPER_RACK1_MAX_WIDTH):
            final_current_super_rack1_width = current_super_rack_width \
                - rack_width
            break

        rack_height = random.randint(
            RACK_MIN_HEIGHT,
            RACK_MAX_HEIGHT
        )

        # track the height of the rack we are creating
        current_rack_height = 0

        rack = {
            "_id": ObjectId(secrets.token_hex(12)),
            "width": rack_width
        }
        racks.append(rack)

        while (current_rack_height < rack_height):
            shelf_height = random.randint(
                SHELF_MIN_HEIGHT,
                SHELF_MAX_HEIGHT
            )
            current_rack_height += shelf_height

            if (current_rack_height > rack_height):
                break

            shelf = {
                "_id": ObjectId(secrets.token_hex(12)),
                # the height of the shelf is in relation to the ground
                "height": current_rack_height - shelf_height,
                "rack_id": rack["_id"]
            }
            shelves.append(shelf)

            # track the width of the shelf with the buckets we are creating;
            # the width of th shelf is the same as the width of the rack;
            # we are trying to fit a certain number of buckets in the shelf,
            # considering its width
            current_shelf_width = 0

            while (current_shelf_width < rack["width"]):
                bucket_width = random.randint(
                    BUCKET_MIN_WIDTH,
                    BUCKET_MAX_WIDTH
                )
                current_shelf_width += bucket_width

                if (current_shelf_width > rack["width"]):
                    break

                if (super_rack_number == 1):
                    shelf_start_y_pos = current_super_rack_width - rack_width
                    bucket_start_y_pos = shelf_start_y_pos + \
                        current_shelf_width - bucket_width
                    # Considering the y pos of the bucket to
                    # be in the its center
                    bucket_y_position = bucket_start_y_pos + bucket_width / 2

                    position = [0, bucket_y_position, shelf["height"]]

                elif (super_rack_number == 2):
                    shelf_start_x_pos = current_super_rack_width - rack_width
                    bucket_start_x_pos = shelf_start_x_pos + \
                        current_shelf_width - bucket_width
                    # Considering the x pos of the bucket to
                    # be in the its center
                    bucket_x_position = bucket_start_x_pos + bucket_width / 2

                    position = [
                        bucket_x_position,
                        final_previous_super_rack_width,
                        shelf["height"]
                    ]

                elif (super_rack_number == 3):
                    shelf_start_y_pos = current_super_rack_width - rack_width
                    bucket_start_y_pos = shelf_start_y_pos + \
                        current_shelf_width - bucket_width
                    # Considering the y pos of the bucket to
                    # be in the its center
                    bucket_y_position = bucket_start_y_pos + bucket_width / 2

                    # We started counting the current width from the point
                    # (width2, width3), so the real bucket position is
                    # SUPER_RACK3_MAX_WIDTH - bucket_y_position
                    real_bucket_y_pos = SUPER_RACK3_MAX_WIDTH \
                        - bucket_y_position

                    position = [
                        final_previous_super_rack_width,
                        real_bucket_y_pos,
                        shelf["height"]
                    ]

                item_id = random.choice(items_ids)
                items_ids.remove(item_id)

                bucket = generate_bucket(
                    shelf=shelf,
                    item_id=ObjectId(item_id),
                    position=position,
                    width=bucket_width,
                    shelf_height=shelf_height
                )
                buckets.append(bucket)

                device, sensor = generate_device(
                    bucket_id=bucket["_id"],
                    staff_ids=staff_ids
                )

                devices.append(device)
                sensors.append(sensor)

    superrack = {
        "final_super_rack1_width": final_current_super_rack1_width,
        "racks": racks,
        "shelves": shelves,
        "buckets": buckets,
        "sensors": sensors,
        "devices": devices
    }

    return json.loads(json_util.dumps(superrack))


def coherent_generate_layout():
    sensors = []
    buckets = []
    racks = []
    shelves = []
    devices = []

    employees = get_static_employee_data()
    staff_ids = [employee["_id"] for employee in employees]

    items_ids = get_static_items_ids()

    super_rack1 = generate_super_rack(
        super_rack_number=1,
        final_previous_super_rack_width=0,
        staff_ids=staff_ids,
        items_ids=items_ids
    )

    super_rack2 = generate_super_rack(
        super_rack_number=2,
        final_previous_super_rack_width=super_rack1["final_super_rack1_width"],
        staff_ids=staff_ids,
        items_ids=items_ids
    )

    super_rack3 = generate_super_rack(
        super_rack_number=3,
        final_previous_super_rack_width=super_rack2["final_super_rack1_width"],
        staff_ids=staff_ids,
        items_ids=items_ids
    )

    racks = super_rack1["racks"] + super_rack2["racks"] + super_rack3["racks"]
    shelves = super_rack1["shelves"] + super_rack2["shelves"] \
                                     + super_rack3["shelves"]
    buckets = super_rack1["buckets"] + super_rack2["buckets"] \
                                     + super_rack3["buckets"]
    sensors = super_rack1["sensors"] + super_rack2["sensors"] \
                                     + super_rack3["sensors"]
    devices = super_rack1["devices"] + super_rack2["devices"] \
                                     + super_rack3["devices"]

    coherent_layout = {
        "racks": racks,
        "shelves": shelves,
        "buckets": buckets,
        "sensors": sensors,
        "devices": devices
    }

    return json.loads(json_util.dumps(coherent_layout))


def generate_item(max_width, max_height):
    quantity = random.randint(1, 3)

    # Here we are choosing a random name of the item,
    # but there is no problem because the generated items
    # will for sure have a different id;
    # We still don't have sufficient names for
    # them to be all different
    item_name = random.choice(available_item_names)
    width = random.randint(1, max_width // quantity)
    height = random.randint(1, max_height // quantity)
    length = random.randint(1, RACK_LENGTH // quantity)
    weight = random.randint(1, 1000*100 // quantity)

    item = {
        "_id": ObjectId(secrets.token_hex(12)),
        "designation": item_name,
        "width": width,
        "height": height,
        "length": length,
        "weight": weight,
        "quantity": quantity,
    }

    return json.loads(json_util.dumps(item))


def generate_sensor(device_id, staff_ids):
    number_of_movements = random.randint(1, 10)
    movement_timestamps = []

    for _ in range(number_of_movements):
        movement_timestamps.append(str(utils.get_random_date_last_day()))

    staff_contacts = []
    number_of_staff_contacts = random.randint(1, 10)

    for _ in range(number_of_staff_contacts):
        staff_contact = {
            "time": str(utils.get_random_date_last_day()),
            "staff_id": ObjectId(random.choice(staff_ids))
        }

        staff_contacts.append(staff_contact)

    sensor = {
        "_id": ObjectId(secrets.token_hex(12)),
        "device": device_id,
        "movement_records": movement_timestamps,
        "staff_contacts": staff_contacts
    }

    return json.loads(json_util.dumps(sensor))


def generate_device(bucket_id, staff_ids):
    device_id = ObjectId(secrets.token_hex(12))

    sensor = generate_sensor(device_id, staff_ids)

    device = {
        "_id": device_id,
        "bucket": bucket_id,
        "sensor": sensor["_id"]
    }

    return json.loads(json_util.dumps(device)), sensor


def generate_bucket(shelf, item_id, position, width, shelf_height):
    height = min(
        random.randint(BUCKET_MIN_HEIGHT, BUCKET_MAX_HEIGHT),
        # Make sure the bucket is not higher than the shelf
        shelf["height"] + shelf_height - 1
    )

    length = random.randint(BUCKET_MIN_LENGTH, BUCKET_MAX_LENGTH)
    quantity = random.randint(1, 3)

    bucket = {
        "_id": ObjectId(secrets.token_hex(12)),
        "width": width,
        "height": height,
        "length": length,
        "position": position,
        "item_id": item_id,
        "quantity": quantity,
        "shelf_id": shelf["_id"]
    }

    return json.loads(json_util.dumps(bucket))


@namespace.route("/layout")
class Layout(Resource):
    def get(self):
        """
        Returns the racks, shelves, buckets, sensors
        and items present in the wareshouse
        """

        layout = coherent_generate_layout()

        layout = {
            "_id": ObjectId(secrets.token_hex(12)),
            "time": str(datetime.datetime.now()),
            "racks": layout["racks"],
            "shelves": layout["shelves"],
            "buckets": layout["buckets"],
            "sensors": layout["sensors"],
            "devices": layout["devices"]
        }

        return json.loads(json_util.dumps(layout))


# ------------------------------------------------------------------------------
# Cart
# ------------------------------------------------------------------------------

@namespace.route("/cart")
class Cart(Resource):
    def get(self):
        """
        Returns the speed, start and end times of the cart.
        """

        cart = {
            "start_position": [SUPER_RACK2_MAX_WIDTH//2, 0],
            "speed": round(random.uniform(500, 1000), 2),
            "start_time": "07:00",
            "end_time": "19:00"
        }

        return cart
