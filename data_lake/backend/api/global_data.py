from flask_restx import fields, Namespace, Resource
from bson import json_util
import json
from .db import client

globalDataCollection = client.WoF.GlobalData

namespace = Namespace("Global Data", path="/globalData",
                      description="Global Data related operations")

# ------------------------------------------------------------------------------
# Model
# ------------------------------------------------------------------------------

cart_attributes = namespace.model("Cart", {
    "speed": fields.Float(
        attribute="cart.speed",
        required=True,
        description="Speed of the cart, in cm/min"
    ),
    "start_time": fields.String(
        attribute='cart.start_time',
        required=True,
        description="Start time of this information record (HH:MM)"
    ),
    "end_time": fields.String(
        attribute='cart.end_time',
        required=True,
        description="End time of this information record (HH:MM)"
    ),
    "start_position": fields.List(
        fields.Integer,
        required=True,
        attribute="cart.start_position",
        description="Coordinates of the cart"
    )
})

orchestrator_position_attributes = namespace.model("Orchestrator", {
    "position": fields.List(
        fields.Integer,
        required=True,
        attribute="orchestrator.position",
        description="Coordinates of the orchestrator,\
        in the form of list ([x, y, z])"
    )
})


# ------------------------------------------------------------------------------
# Cart position
# ------------------------------------------------------------------------------

@namespace.route("/cart")
class GlobalDataCart(Resource):
    @namespace.marshal_with(cart_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns the cart's information

        Returns the global data including the position of the cart.
        """

        document = globalDataCollection.find_one({})

        return json.loads(json_util.dumps(document))


@namespace.route("/orchestrator")
class GlobalDataOrchestrator(Resource):
    @namespace.marshal_with(orchestrator_position_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns the orchestrator position.
        """
        document = globalDataCollection.find_one({})

        return json.loads(json_util.dumps(document))
