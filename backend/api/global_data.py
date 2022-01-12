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
        required=True,
        description="Speed of the cart, in cm/min"
    ),
    "start_time": fields.DateTime(
        attribute='start_time',
        required=True,
        description="Start time of this information record"
    ),
    "end_time": fields.DateTime(
        attribute='end_time',
        required=True,
        description="End time of this information record"
    )
})

globalDataAttributes = namespace.model("Cart", {
    "orchestrator_position": fields.List(
        fields.Integer,
        required=True,
        description="Coordinates of the orchestrator,\
in the form of list ([x, y, z])"
    ),
    "cart": fields.Nested(
        cart_attributes,
        required=True,
        description="Information relative to the cart"
    ),
})


# ------------------------------------------------------------------------------
# Cart position
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_before",
                    required=False,
                    type=inputs.date,
                    help="The lower bound for the timestamp of the cart.")
parser.add_argument("time_after",
                    required=False,
                    type=inputs.date,
                    help="The upper bound for the timestamp of the cart.")


@namespace.route("/")
class SensorInformation(Resource):
    @namespace.marshal_with(globalDataAttributes)
    @namespace.expect(parser)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns the cart's position

        Returns the global data including the position of the cart
        on a determined time interval.
        """
        args = parser.parse_args()
        time_before = args['time_before']  # Format: YYYY-MM-DD
        time_after = args['time_after']    # Format: YYYY-MM-DD

        searchQuery = {}

        if time_before is not None:
            searchQuery["cart.start_time"] = {"$gte": str(time_before)}
        if time_after is not None:
            searchQuery["cart.end_time"] = {"$lte": str(time_after)}

        document = globalDataCollection.find(searchQuery)

        return json.loads(json_util.dumps(document))
