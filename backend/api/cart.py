from flask_restx import fields, inputs, reqparse, Namespace, Resource

namespace = Namespace("Cart", path="/cart",
                      description="Cart related operations")

# ------------------------------------------------------------------------------
# Model
# ------------------------------------------------------------------------------

cartAttributes = namespace.model("Cart", {
    "time": fields.DateTime(required=True, description="Time of this record \
         information"),
    "current_position": fields.List(fields.Integer, required=True, description="\
         The current coordinates of the cart"),
})

# ------------------------------------------------------------------------------
# Cart position
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_after", required=False, type=inputs.date, help="The \
    lower bound for the timestamp of the cart.")
parser.add_argument("time_before", required=False, type=inputs.date, help="The \
    upper bound for the timestamp of the cart.")


@namespace.route("")
class SensorInformation(Resource):
    @namespace.marshal_with(cartAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns the cart's position

        Returns the position of the cart on a determined
        time interval.
        """
        return {}
