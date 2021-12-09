from flask_restx import fields, inputs, reqparse, Namespace, Resource

namespace = Namespace("Stock", path="/stock",
                      description="Stock related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------


itemAttributes = namespace.model("StockItem", {
    "item": fields.String(required=True, description="Name of the item"),
    "width": fields.Float(required=True, description="Width of the item"),
    "height": fields.Float(required=True, description="Height of the item"),
    "length": fields.Float(required=True, description="Length of the item"),
    "weight": fields.Float(required=True, description="Weight of the item")
})

# ------------------------------------------------------------------------------
# Stock Information
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("id", required=False, type=int, help="The ID of the item \
    to show from stock.")
parser.add_argument("time_after", required=True, type=inputs.date, help="The \
    lower bound for the timestamp of the stock.")
parser.add_argument("time_before", required=True, type=inputs.date, help="The \
    upper bound for the timestamp of the stock.")


@namespace.route("")
class CollectionManifests(Resource):
    @namespace.marshal_list_with(itemAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information about the stock
        Returns data about the stock between the passed timestamps
        time interval.
        """
        return {}


@namespace.route("/<id>")
class StockValues(Resource):
    @namespace.marshal_with(itemAttributes)
    @namespace.expect(parser)
    def get(self, id: int):
        """
        Returns information about the item
        Returns data about a certain item of the stock between the passed \
        timestamps time interval.
        """
        return {}
