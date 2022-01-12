from flask_restx import fields, inputs, reqparse, Namespace, Resource
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

parser = reqparse.RequestParser()
parser.add_argument("time_before",
                    required=False,
                    type=str,
                    help="The lower bound for the start_time" +
                    "of the cart (HH:MM).")
parser.add_argument("time_after",
                    required=False,
                    type=str,
                    help="The upper bound for the end_time" +
                    "of the cart (HH:MM).")


@namespace.route("/cart")
class GlobalDataCart(Resource):
    @namespace.marshal_with(cart_attributes)
    @namespace.expect(parser)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns the cart's information

        Returns the global data including the position of the cart
        on a determined time interval.
        """
        args = parser.parse_args()
        time_before = args['time_before']  # Format: HH:MM
        time_after = args['time_after']    # Format: HH:MM

        searchQuery = {}

        if time_before is not None:
            searchQuery["cart.start_time"] = {"$gte": str(time_before)}
        if time_after is not None:
            searchQuery["cart.end_time"] = {"$lte": str(time_after)}

        document = globalDataCollection.find(searchQuery)

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
