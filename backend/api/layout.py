from bson import json_util
from flask_restx import fields, inputs, reqparse, Namespace, Resource
import json

from .db import client

layoutsCollection = client.WoF.Layouts

namespace = Namespace("Layouts", path="/layouts",
                      description="Layouts related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

bucketAttributes = namespace.model("LayoutBucket", {
    "id": fields.String(required=True, attribute="_id", description=""),
    "width": fields.Integer(required=True, description=""),
    "height": fields.Integer(required=True, description=""),
    "length": fields.Integer(required=True, description=""),
    "position": fields.List(fields.Integer(required=True, description="")),
    "item": fields.String(
        required=True,
        attribute="item_id",
        description=""),
    "quantity": fields.Integer(required=True, description=""),
    "shelf": fields.String(
        required=True,
        attribute="shelf_id",
        description=""),
})

layoutAttributes = namespace.model("Layout", {
    "id": fields.String(required=True, description="", attribute='_id.$oid'),
    "buckets": fields.List(
        fields.Nested(bucketAttributes),
        description="List of buckets in layout"
    ),
    "time": fields.DateTime(required=True, description="The layout time"),
})

# ------------------------------------------------------------------------------
# Layouts information
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_after", required=False, type=inputs.date,
                    help="The lower bound for the timestamp of layouts.")
parser.add_argument("time_before", required=False, type=inputs.date,
                    help="The upper bound for the timestamp of layouts.")


@namespace.route("/")
class Layouts(Resource):
    @namespace.marshal_list_with(layoutAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of layouts

        Returns data about every warehouse layout on a determined
        time interval.
        """
        args = parser.parse_args()
        time_before = args['time_before']  # Format: YYYY-MM-DD
        time_after = args['time_after']    # Format: YYYY-MM-DD

        searchQuery = {}

        if time_after is not None:
            searchQuery["time"] = {"$lte": time_after}
        if time_before is not None:
            searchQuery["time"] = {"$gte": time_before}

        response = layoutsCollection.find(searchQuery)

        return json.loads(json_util.dumps(response))
