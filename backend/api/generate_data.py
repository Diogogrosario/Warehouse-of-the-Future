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
    "racks": fields.List(
        fields.Nested(rack_attributes),
        required=True,
        description="Racks present in the warehouse"
    ),
    "shelves": fields.List(
        fields.Nested(shelf_attributes),
        required=True,
        description="Shelves present in the warehouse"
    ),
    "buckets": fields.List(
        fields.Nested(bucket_attributes),
        required=True,
        description="Buckets present in the warehouse"
    ),
    "sensors": fields.List(
        fields.Nested(sensor_attributes),
        required=True,
        description="Sensors present in the warehouse"
    )
})

# Cart

cart_attributes = namespace.model("Cart", {
    "start_position": fields.List(
        fields.Integer,
        required=True,
        description="Coordinates of the cart start position, "
                    + "in the form of list ([x, y])"
    ),
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

SUPER_RACK1_MAX_WIDTH = 15*100
SUPER_RACK2_MAX_WIDTH = 15*100
SUPER_RACK3_MAX_WIDTH = 15*100

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
def generate_super_rack(super_rack_number, final_previous_super_rack_width):
    items = []
    sensors = []
    buckets = []
    racks = []
    shelves = []

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

                bucket = generate_bucket(
                    shelf=shelf,
                    # TODO: make sure there are no repeated items
                    item_id=random.choice(available_items),
                    position=position,
                    width=bucket_width,
                    shelf_height=shelf_height
                )
                buckets.append(bucket)

                sensor = generate_sensor(bucket_id=bucket["id"])
                sensors.append(sensor)

                item = generate_item(
                    bucket_id=bucket["id"],
                    # remove 1 cm to the max_width and max_height
                    # to be sure the item will fit in the bucket
                    max_width=bucket["width"] - 1,
                    max_height=bucket["height"] - 1
                )
                items.append(item)

    return {
        "final_super_rack1_width": final_current_super_rack1_width,
        "racks": racks,
        "shelves": shelves,
        "buckets": buckets,
        "sensors": sensors,
        "items": items
    }


def coherent_generate_layout():
    items = []
    sensors = []
    buckets = []
    racks = []
    shelves = []

    super_rack1 = generate_super_rack(
        super_rack_number=1,
        final_previous_super_rack_width=0
    )

    super_rack2 = generate_super_rack(
        super_rack_number=2,
        final_previous_super_rack_width=super_rack1["final_super_rack1_width"]
    )

    super_rack3 = generate_super_rack(
        super_rack_number=3,
        final_previous_super_rack_width=super_rack2["final_super_rack1_width"]
    )

    racks = super_rack1["racks"] + super_rack2["racks"] + super_rack3["racks"]
    shelves = super_rack1["shelves"] + super_rack2["shelves"] \
                                     + super_rack3["shelves"]
    buckets = super_rack1["buckets"] + super_rack2["buckets"] \
                                     + super_rack3["buckets"]
    sensors = super_rack1["sensors"] + super_rack2["sensors"] \
                                     + super_rack3["sensors"]
    items = super_rack1["items"] + super_rack2["items"] \
                                 + super_rack3["items"]

    return {
        "racks": racks,
        "shelves": shelves,
        "buckets": buckets,
        "sensors": sensors,
        "items": items
    }


def generate_item(bucket_id, max_width, max_height):

    quantity = random.randint(1, 3)

    # Here we are choosing a random name of the item,
    # but there is no problem because the generated items
    # will for sure have a different id;
    # We still don't have sufficient names for
    # them to be all different
    item_name = random.choice(available_items)
    width = random.randint(1, max_width // quantity)
    height = random.randint(1, max_height // quantity)
    length = random.randint(1, RACK_LENGTH // quantity)
    weight = random.randint(1, 1000*100 // quantity)

    item = {
        "id": uuid.uuid4(),
        "designation": item_name,
        "width": width,
        "height": height,
        "length": length,
        "weight": weight,
        "quantity": quantity,
        "bucket_id": bucket_id
    }

    return item


def generate_sensor(bucket_id):
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
        "id": uuid.uuid4(),
        "bucket": bucket_id,
        "movement_records": movement_timestamps,
        "staff_contacts": staff_contacts
    }

    return sensor


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


@namespace.route("/layout")
class Layout(Resource):
    @namespace.marshal_list_with(layout_attributes)
    def get(self):
        """
        Returns the buckets present in the wareshouse,
        as well it's details and associated items
        """

        layout = coherent_generate_layout()

        layout = {
            "time": datetime.datetime.now(),
            "racks": layout["racks"],
            "shelves": layout["shelves"],
            "buckets": layout["buckets"],
            "sensors": layout["sensors"],
            "items": layout["items"]
        }

        return layout


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
            "start_position":  [SUPER_RACK2_MAX_WIDTH//2, 0],
            "speed": round(random.uniform(500, 1000), 2),
            "start_time": "07:00",
            "end_time": "19:00"
        }

        return cart
