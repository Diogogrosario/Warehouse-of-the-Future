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

layoutAttributes = namespace.model("Layout", {
    "id": fields.String(
        required=True,
        attribute="_id.$oid",
        description="Layout id"
    ),
    "buckets": fields.List(
        fields.String(
            required=True,
            attribute="$oid"
        ),
        description="Bucket ids in layout"
    ),
    "time": fields.String(required=True, description="The layout time"),
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

        if time_after is not None or time_before is not None:
            if time_before is None:
                searchQuery["time"] = {"$lte": str(time_after)}
            elif time_after is None:
                searchQuery["time"] = {"$gte": str(time_before)}
            else:
                searchQuery["time"]["$lte"] = str(time_after)

        response = layoutsCollection.find(searchQuery)

        return json.loads(json_util.dumps(response))
