from flask_restx import fields, Namespace, Resource
import random
import datetime
import uuid
import names
from .utils import utils

namespace = Namespace(
    "GenerateData",
    path="/generate_data",
    description="Generate random data to simulate the warehouse"
)

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

# Items

item_attributes = namespace.model("Item", {
    "id": fields.String(
        required=True,
        description="Id of the item"
    ),
    "designation": fields.String(
        required=True,
        description="Name of the item"
    ),
    "width": fields.Float(
        required=True,
        description="Width of the item, in cm"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the item, in cm"
    ),
    "length": fields.Float(
        required=True,
        description="Length of the item, in cm"
    ),
    "weight": fields.Float(
        required=True,
        description="Weight of the item, in g"
    ),
    "quantity": fields.Integer(
        required=True,
        description="Quantity of the item"
    ),
    "bucket_id": fields.String(
        required=True,
        description="Id of the item's bucket"
    ),
})

item_in_manifest_attributes = namespace.model("ItemInManifest", {
    "item_id": fields.String(
        required=True,
        description="Id of the item"
    ),
    "quantity": fields.Integer(
        required=True,
        description="Quantity of the item"
    ),
})

# TODO:
# put the available items in the database,
# and add the weight and dimensions
available_items = [
    # items relacionados com o sistema de travagem
    "pastilhas de travão", "kit de travões", "maxilas do travão",
    "pinças de travão", "cilindro de travão de roda", "tubo flexível de vácuo",
    "bomba hidráulica de abs", "bomba central dos travões",
    "interruptor de luz de stop", "regulador de força de travagem",
    "sensor de desgaste pastilha de travão", "defletor de discos de travão",
    "tambor de travão", "disco de travão", "eixo do travão de estacionamento",
    "mangueira de travão", "bomba de vácuo",
    "disco de travão de alto rendimento", "travão de estacionamento",
    "sensor de abs", "servo freio", "anel de sensor de abs",
    "cabo de freio de mão",

    # items relacionados com o motor
    "cirtuito elétrico do motor", "bujão do carter", "cárter de óleo",
    "radiador de óleo", "tubo de óleo", "compressor",
    "correntes de distribuição", "correia dentada",
    "correia trapezoidal estriada", "amortecedor de vibrações",
    "juntas da cabeça do motor", "válvula de admissão", "cabeçote",
    "filtro de óleo", "filtro de ar", "anilhas da cambota", "cambota",
    "turbocompressor", "embreagem do ventilador", "tampa do radiador",
    "bobila de ignição", "radiador", "sensor de combustível",
    "vela de ignição", "árvore de cames", "apoios de motor", "guia",
    "vareta de óleo", "bomba de água",

    # items relacionados com a carroçaria
    "espelho retrovisor", "guarda-lamas", "farol principal",
    "luz de travão suplementar", "luz de stop", "para-choques",
    "gancho de roboque", "painel de radiador", "amortecedor de capô",
    "vidro de espelho", "sensores de estacionamento", "vidro farol",
    "faróis de xénon", "borracha de vidro", "vidro lateral",
    "soleira de porta", "painel lateral", "revestimento traseiro",
    "porta dianteira", "porta traseira", "para-brisas", "suporte da bateria",
    "eixo", "fecho central",
]

# Manifest

manifest_attributes = namespace.model("Manifest", {
    "id": fields.String(
        required=True,
        description="Id of the manifest"
    ),
    "time": fields.DateTime(
        required=True,
        description="The manifest time"
    ),
    "staff_id": fields.String(
        required=True,
        description="Id of the operator who makes the collection of items"
    ),
    "items": fields.List(
        fields.Nested(item_in_manifest_attributes),
        required=True,
        description="Manifest Items"
    ),
})

# Staff

staff_attributes = namespace.model("Staff", {
    "id": fields.String(
        required=True,
        description="Id of the employee"
    ),
    "name": fields.String(
        required=True,
        description="Name of the employee"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the employee, in cm."
    ),
    "birth_date": fields.DateTime(
        required=True,
        description="Birth date of the employee"
    ),
})

# Layout

bucket_attributes = namespace.model("Bucket", {
    "id": fields.String(
        required=True,
        description="Id of the bucket"
    ),
    "width": fields.Float(
        required=True,
        description="Width of the bucket, in cm"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the bucket, in cm"
    ),
    "length": fields.Float(
        required=True,
        description="Length of the bucket, in cm"
    ),
    "position": fields.List(
        fields.Integer,
        required=True,
        description="Coordinates of the bucket, "
                    + "in the form of list ([x, y, z])"
    ),
    "item_id": fields.String(
        required=True,
        description="Id of the item inside the bucket"
    ),
    "quantity": fields.Integer(
        required=True,
        description="Quantity of the item that is inside the bucket"
    ),
    "shelf_id": fields.String(
        required=True,
        description="Id of the shelf where the bucket is located"
    )
})

shelf_attributes = namespace.model("Shelf", {
    "id": fields.String(
        required=True,
        description="Id of the shelf"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the shelf in relation to the gound, in cm"
    ),
    "rack_id": fields.String(
        required=True,
        description="Id of the rack where the shelf is located"
    ),
})

rack_attributes = namespace.model("Rack", {
    "id": fields.String(
        required=True,
        description="Id of the rack"
    ),
    "width": fields.Float(
        required=True,
        description="Width of the rack, in cm"
    ),
})

layout_attributes = namespace.model("Layout", {
    "time": fields.DateTime(
        required=True,
        description="The current time"
    ),
    "buckets": fields.List(
        fields.Nested(bucket_attributes),
        required=True,
        description="Buckets present in the warehouse"
    )
})

# Sensors

staff_contact_in_sensor_attributes = namespace.model("StaffContactInSensor", {
    "time": fields.DateTime(
        required=True,
        description="Timestamp of when the sensor registered the contact"
    ),
    "staff_id": fields.String(
        required=True,
        description="Id of the operator that was next to the sensor"
    )
})

sensor_attributes = namespace.model("Sensor", {
    "id": fields.String(
        required=True,
        description="Id of the sensor"
    ),
    "bucket": fields.String(
        required=True,
        description="Id of the associated bucket"
    ),
    "movement_records": fields.List(
        fields.DateTime,
        required=True,
        description="Timestamps of the movement detections."
    ),
    "staff_contacts": fields.List(
        fields.Nested(staff_contact_in_sensor_attributes),
        required=True,
        description="Array of objects with timestamp and staff_id, that"
                    + " represents when an operator was next to the sensor."
    )
})

# Cart

cart_attributes = namespace.model("Cart", {
    "speed": fields.Float(
        required=True,
        description="Speed of the cart, in cm/min"
    ),
    "start_time": fields.String(
        required=True,
        description="The time of the day when the cart starts"
    ),
    "end_time": fields.String(
        required=True,
        description="The time of the day when the cart stops"
    ),
})

# Orchestrator

orchestrator_attributes = namespace.model("Orchestrator", {
    "position": fields.List(
        fields.Integer,
        required=True,
        description="Coordinates of the orchestrator, "
                    + "in the form of list ([x, y, z])"
    )
})


# ------------------------------------------------------------------------------
# Items
# ------------------------------------------------------------------------------

def generate_random_items(number_of_items=None):
    items = []

    if (number_of_items is None):
        number_of_items = random.randint(3, 6)

    for _ in range(number_of_items):
        item_name = random.choice(available_items)
        width = random.randint(1, 100)
        height = random.randint(1, 100)
        length = random.randint(1, 100)
        weight = random.randint(1, 1000*100)
        quantity = random.randint(1, 3)

        items.append({
            "id": uuid.uuid4(),
            "designation": item_name,
            "width": width,
            "height": height,
            "length": length,
            "weight": weight,
            "quantity": quantity,
            "bucket_id": uuid.uuid4()
        })

    return items


@namespace.route("/items")
class Items(Resource):
    @namespace.marshal_list_with(item_attributes)
    def get(self):
        """
        Returns all the items of the warehouse.
        """

        items = generate_random_items()

        return items


@namespace.route("/items/<string:id>")
class Item(Resource):
    @namespace.marshal_list_with(item_attributes)
    def get(self, id):
        """
        Returns the item with the specified id.
        """

        item = generate_random_items(number_of_items=1)[0]
        item["id"] = id

        return item


# ------------------------------------------------------------------------------
# Manifests
# ------------------------------------------------------------------------------

def generate_random_items_for_manifest(number_of_items=None):
    items = []

    if (number_of_items is None):
        number_of_items = random.randint(1, 3)

    for _ in range(number_of_items):
        id = uuid.uuid4()

        quantity = random.randint(1, 3)

        items.append({
            "item_id": id,
            "quantity": quantity
        })

    return items


@namespace.route("/manifest")
class Manifest(Resource):
    @namespace.marshal_list_with(manifest_attributes)
    def get(self):
        """
        Returns a random manifest.
        """

        items = generate_random_items_for_manifest()

        manifest = {
            "id": uuid.uuid4(),
            "time": datetime.datetime.now(),
            "staff_id": uuid.uuid4(),
            "items": items
        }

        return manifest


# ------------------------------------------------------------------------------
# Staff
# ------------------------------------------------------------------------------

def generate_employee_data(id=None):
    if (id is None):
        id = uuid.uuid4()

    employee = {
        "id": id,
        "name": names.get_full_name(),
        "height": round(random.uniform(140, 220)),
        "birth_date": utils.get_random_birth_date(),
    }

    return employee


@namespace.route("/staff")
class Staff(Resource):
    @namespace.marshal_list_with(staff_attributes)
    def get(self):
        """
        Returns a list with all the employees.
        """

        number_of_employees = random.randint(20, 100)
        employees = [
            generate_employee_data() for _ in range(number_of_employees)
        ]

        return employees


@namespace.route("/staff/<string:id>")
class StaffEmployee(Resource):
    @namespace.marshal_list_with(staff_attributes)
    def get(self, id):
        """
        Returns information about the employee with the provided id.
        """

        return generate_employee_data(id)


# ------------------------------------------------------------------------------
# Sensors
# ------------------------------------------------------------------------------

def generate_random_sensors(number_of_sensors):

    sensors = []

    for _ in range(number_of_sensors):
        id = uuid.uuid4()

        number_of_movements = random.randint(1, 10)
        movement_timestamps = []

        for _ in range(number_of_movements):
            movement_timestamps.append(utils.get_random_date_last_day())

        staff_contacts = []
        number_of_staff_contacts = random.randint(1, 10)

        for _ in range(number_of_staff_contacts):
            staff_contact = {
                "time": utils.get_random_date_last_day(),
                "staff_id": uuid.uuid4()
            }

            staff_contacts.append(staff_contact)

        sensor = {
            "id": id,
            "bucket": uuid.uuid4(),
            "movement_records": movement_timestamps,
            "staff_contacts": staff_contacts
        }
        sensors.append(sensor)
    return sensors


def generate_random_sensor(sensor_id):
    sensor = generate_random_sensors(number_of_sensors=1)[0]
    sensor["id"] = sensor_id
    return sensor


@namespace.route("/sensors")
class Sensors(Resource):
    @namespace.marshal_list_with(sensor_attributes)
    def get(self):
        """
        Returns the data about all the sensors.
        """

        number_of_sensors = random.randint(30, 100)

        sensors = generate_random_sensors(number_of_sensors=number_of_sensors)

        return sensors


@namespace.route("/sensors/<string:id>")
class Sensor(Resource):
    @namespace.marshal_list_with(sensor_attributes)
    def get(self, id):
        """
        Returns the data about the sensor with the provided id.
        """

        sensor = generate_random_sensor(sensor_id=id)

        return sensor


# ------------------------------------------------------------------------------
# Cart
# ------------------------------------------------------------------------------

@namespace.route("/cart")
class Cart(Resource):
    @namespace.marshal_list_with(cart_attributes)
    def get(self):
        """
        Returns the speed, start and end times of the cart.
        """

        cart = {
            "speed": round(random.uniform(500, 1000), 2),
            "start_time": "07:00",
            "end_time": "19:00"
        }

        return cart


# ------------------------------------------------------------------------------
# Orchestrator
# ------------------------------------------------------------------------------

@namespace.route("/orchestrator")
class Orchestrator(Resource):
    @namespace.marshal_list_with(orchestrator_attributes)
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

SUPER_RACK1_MAX_WIDTH = 50*100
SUPER_RACK2_MAX_WIDTH = 50*100
SUPER_RACK3_MAX_WIDTH = 50*100

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


def coherent_generate_layout():
    buckets = []
    racks = []
    shelfs = []

    # track the width of the racks we are creating
    current_super_rack_width = 0

    # Super rack 1
    while (current_super_rack_width < SUPER_RACK1_MAX_WIDTH):
        rack_width = random.randint(
            RACK_MIN_WIDTH,
            RACK_MAX_WIDTH
        )
        current_super_rack_width += rack_width

        if (current_super_rack_width > SUPER_RACK1_MAX_WIDTH):
            break

        rack_height = random.randint(
            RACK_MIN_HEIGHT,
            RACK_MAX_HEIGHT
        )

        # track the height of the rack we are creating
        current_rack_height = 0

        rack = {
            "id": uuid.uuid4(),
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
                "id": uuid.uuid4(),
                # the height of the shelf is in relation to the ground
                "height": current_rack_height - shelf_height,
                "rack_id": rack["id"]
            }
            shelfs.append(shelf)

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

                shelf_start_y_pos = current_super_rack_width - rack_width
                bucket_start_y_pos = shelf_start_y_pos + current_shelf_width \
                    - bucket_width
                # Considering the y pos of the bucket to be in the center of it
                bucket_y_position = bucket_start_y_pos + bucket_width / 2

                position = [0, bucket_y_position, shelf["height"]]

                bucket = generate_bucket(
                    shelf=shelf,
                    # TODO: make sure there are no repeated items
                    item_id=random.choice(available_items),
                    position=position,
                    width=bucket_width,
                    shelf_height=shelf_height
                )
                buckets.append(bucket)

    return buckets


def generate_bucket(shelf, item_id, position, width, shelf_height):
    height = min(
        random.randint(BUCKET_MIN_HEIGHT, BUCKET_MAX_HEIGHT),
        # Make sure the bucket is not higher than the shelf
        shelf["height"] + shelf_height - 1
    )

    length = random.randint(BUCKET_MIN_LENGTH, BUCKET_MAX_LENGTH)
    quantity = random.randint(1, 3)

    bucket = {
        "id": uuid.uuid4(),
        "width": width,
        "height": height,
        "length": length,
        "position": position,
        "item_id": item_id,
        "quantity": quantity,
        "shelf_id": shelf["id"]
    }

    return bucket


def generate_buckets():
    number_of_buckets = random.randint(50, 150)

    buckets = [
        generate_bucket() for _ in range(number_of_buckets)
    ]

    return buckets


@namespace.route("/layout")
class Layout(Resource):
    @namespace.marshal_list_with(layout_attributes)
    def get(self):
        """
        Returns the buckets present in the wareshouse,
        as well it's details and associated items
        """

        buckets = coherent_generate_layout()

        layout = {
            "time": datetime.datetime.now(),
            "buckets": buckets
        }

        return layout


# ------------------------------------------------------------------------------
# Shelves
# ------------------------------------------------------------------------------

def generate_shelf():
    height = round(random.uniform(0, 400), 2)

    shelf = {
        "id": uuid.uuid4(),
        "height": height,
        "rack_id": uuid.uuid4()
    }

    return shelf


def generate_shelves():
    number_of_shelves = random.randint(50, 100)

    shelves = [
        generate_shelf() for _ in range(number_of_shelves)
    ]

    return shelves


@namespace.route("/shelves")
class Shelves(Resource):
    @namespace.marshal_list_with(shelf_attributes)
    def get(self):
        """
        Returns the information about the shelves.
        """

        shelves = generate_shelves()

        return shelves


@namespace.route("/shelves/<string:id>")
class Shelf(Resource):
    @namespace.marshal_list_with(shelf_attributes)
    def get(self, id):
        """
        Returns the information about the shelf with the specified id.
        """

        shelf = generate_shelf()
        shelf["id"] = id

        return shelf


# ------------------------------------------------------------------------------
# Racks
# ------------------------------------------------------------------------------

def generate_rack():
    width = round(random.uniform(50, 300), 2)

    rack = {
        "id": uuid.uuid4(),
        "width": width,
    }

    return rack


def generate_racks():
    number_of_racks = random.randint(300, 400)

    racks = [
        generate_rack() for _ in range(number_of_racks)
    ]

    return racks


@namespace.route("/racks")
class Racks(Resource):
    @namespace.marshal_list_with(rack_attributes)
    def get(self):
        """
        Returns the information about the racks.
        """

        racks = generate_racks()

        return racks


@namespace.route("/racks/<string:id>")
class Rack(Resource):
    @namespace.marshal_list_with(rack_attributes)
    def get(self, id):
        """
        Returns the information about the rack with the specified id.
        """

        rack = generate_rack()
        rack["id"] = id

        return rack
