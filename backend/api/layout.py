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
    "_id": fields.Integer(required=True, description=""),
    "bucket": fields.Integer(required=True, description=""),
    "item": fields.Integer(required=True, description=""),
    "quantity": fields.Integer(required=True, description=""),
    "coordinates": fields.List(fields.Integer(required=True, description="")),
    "shelf": fields.Integer(required=True, description=""),
})

layoutAttributes = namespace.model("Layout", {
    "_id": fields.Integer(required=True, description=""),
    "buckets": fields.List(
        fields.Nested(bucketAttributes),
        description="List of buckets in layout"
    ),
    "date": fields.DateTime(required=True, description="The layout time"),
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
    # @namespace.marshal_list_with(layoutAttributes)
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

        if time_after is not None or time_before is not None:
            if time_before is None:
                searchQuery["date"] = {"$lte": time_after}
            elif time_after is None:
                searchQuery["date"] = {"$gte": time_before}
            else:
                searchQuery["date"]["$lte"] = time_after

        response = layoutsCollection.find(searchQuery)

        return json.loads(json_util.dumps(response))
