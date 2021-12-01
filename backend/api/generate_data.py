from flask_restx import fields, Namespace, Resource
import random
import datetime
import uuid
import names

namespace = Namespace("GenerateData", path="/generate_data",
                      description="Generate random data to simulate the warehouse")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

# Manifests

item_attributes = namespace.model("ManifestItem", {
    "item": fields.String(required=True, description="Name of the item"),
    "quantity": fields.Integer(required=True, description="Quantity of the item"),
    "position": fields.List(fields.Integer, required=True, description="Coordinates of the item, in the form of list ([x, y, z])"),
})

reposition_manifest_attributes = namespace.model("RepositionManifest", {
    "items": fields.List(fields.Nested(item_attributes), description="List of items in manifest"),
    "time": fields.DateTime(required=True, description="The manifest time"),
})

collection_manifest_attributes = namespace.model("CollectionManifest", {
    "items": fields.List(fields.Nested(item_attributes), description="List of items in manifest"),
    "staff_id": fields.String(required=True, description="Id of the operator who makes the collection of items"),
    "time": fields.DateTime(required=True, description="The manifest time"),
})

# TODO: put the available items in the database, and add the weight and dimensions
available_items = [
    # items relacionados com o sistema de travagem
    "pastilhas de travão", "kit de travões", "maxilas do travão", "pinças de travão",
    "cilindro de travão de roda", "tubo flexível de vácuo", "bomba hidráulica de abs",
    "bomba central dos travões", "interruptor de luz de stop", "regulador de força de travagem",
    "sensor de desgaste pastilha de travão", "defletor de discos de travão", "tambor de travão",
    "disco de travão", "eixo do travão de estacionamento", "mangueira de travão",
    "bomba de vácuo", "disco de travão de alto rendimento", "travão de estacionamento",
    "sensor de abs", "servo freio", "anel de sensor de abs", "cabo de freio de mão",

    # items relacionados com o motor
    "cirtuito elétrico do motor", "bujão do carter", "cárter de óleo", "radiador de óleo",
    "tubo de óleo", "compressor", "correntes de distribuição", "correia dentada",
    "correia trapezoidal estriada", "amortecedor de vibrações", "juntas da cabeça do motor",
    "válvula de admissão", "cabeçote", "filtro de óleo", "filtro de ar", "anilhas da cambota",
    "cambota", "turbocompressor", "embreagem do ventilador", "tampa do radiador",
    "bobila de ignição", "radiador", "sensor de combustível", "vela de ignição",
    "árvore de cames", "apoios de motor", "guia", "vareta de óleo", "bomba de água",

    # items relacionados com a carroçaria
    "espelho retrovisor", "guarda-lamas", "farol principal", "luz de travão suplementar",
    "luz de stop", "para-choques", "gancho de roboque", "painel de radiador",
    "amortecedor de capô", "vidro de espelho", "sensores de estacionamento",
    "vidro farol", "faróis de xénon", "borracha de vidro", "vidro lateral",
    "soleira de porta", "painel lateral", "revestimento traseiro", "porta dianteira",
    "porta traseira", "para-brisas", "suporte da bateria", "eixo", "fecho central",
]

# Staff

staff_attributes = namespace.model("Staff", {
    "id": fields.String(required=True, description="Id of the employee"),
    "name": fields.String(required=True, description="Name of the employee"),
    "gender": fields.String(required=True, description="Gender of the employee. The possible values are 'female' and 'male'"),
    "age": fields.Integer(required=True, description="Age of the employee"),
})


# ------------------------------------------------------------------------------
# Manifests
# ------------------------------------------------------------------------------

def generate_random_items():
    items = []
    number_of_items = random.randint(3, 6)

    for _ in range(number_of_items):
        item_index = random.randint(0, len(available_items) - 1)
        item = available_items[item_index]

        quantity = random.randint(1,3)

        position = [
            random.randint(0, 100),
            random.randint(0, 100),
            random.randint(0, 100),
        ]

        items.append({
            "item": item,
            "quantity": quantity,
            "position": position
        })
        
    return items

@namespace.route("/manifest/reposition")
class Manifest(Resource):
    @namespace.marshal_list_with(reposition_manifest_attributes)
    def get(self):
        """
        Returns a random reposition manifest.
        """

        items = generate_random_items()

        reposition_manifest = {
            "items": items,
            "time": datetime.datetime.now()
        }

        return reposition_manifest

@namespace.route("/manifest/collection")
class Manifest(Resource):
    @namespace.marshal_list_with(collection_manifest_attributes)
    def get(self):
        """
        Returns a random collection manifest.
        """

        items = generate_random_items()

        collection_manifest = {
            "items": items,
            "staff_id": uuid.uuid4(),
            "time": datetime.datetime.now()
        }

        return collection_manifest

# ------------------------------------------------------------------------------
# Staff
# ------------------------------------------------------------------------------

def generate_employee_data(id = None):
    if (id == None):
        id = uuid.uuid4()

    gender = random.choice(["female", "male"])

    employee = {
        "id": id,
        "name": names.get_full_name(gender=gender),
        "gender": gender,
        "age": random.randint(18,65),
    }

    return employee


@namespace.route("/staff")
class Staff(Resource):
    @namespace.marshal_list_with(staff_attributes)
    def get(self):
        """
        Returns a list with all the employees.
        """

        number_of_employees = random.randint(20,100)
        employees = [generate_employee_data() for _ in range(number_of_employees)]
        
        return employees

@namespace.route("/staff/<string:id>")
class Staff(Resource):
    @namespace.marshal_list_with(staff_attributes)
    def get(self, id):
        """
        Returns information about the employee with the provided id.
        """
        
        return generate_employee_data(id)
