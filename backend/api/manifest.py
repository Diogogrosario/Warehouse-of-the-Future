from bson import json_util
from bson.objectid import ObjectId
from flask_restx import fields, inputs, reqparse, Namespace, Resource
import json

from .db import client

manifestCollection = client.WoF.Manifests

namespace = Namespace("Manifests", path="/manifests",
                      description="Manifests related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

itemAttributes = namespace.model("ManifestItem", {
    "item": fields.String(required=True, description=""),
    "quantity": fields.Integer(required=True, description=""),
})

manifestAttributes = namespace.model("Manifest", {
    "items": fields.List(fields.Nested(itemAttributes),
                         description="List of items in manifest"),
    "date": fields.DateTime(required=True, description="The manifest time"),
    "staff_id": fields.String(
        required=True,
        attribute='staff_id.$oid',
        description="Id of the operator that was next to the sensor"
    ),
})

# ------------------------------------------------------------------------------
# Reposition Manifests
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_after", required=False, type=inputs.date,
                    help="The lower bound for the timestamp of manifests.")
parser.add_argument("time_before", required=False, type=inputs.date,
                    help="The upper bound for the timestamp of manifests.")


@namespace.route("/reposition")
class RepositionManifests(Resource):
    # @namespace.marshal_list_with(manifestAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of reposition manifests

        Returns data about every "reposition" manifest on a determined time
        interval.
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

        response = manifestCollection.find(searchQuery)

        return json.loads(json_util.dumps(response))


# ------------------------------------------------------------------------------
# Collection Manifests
# ------------------------------------------------------------------------------

parser.add_argument("staff_id", required=False, type=str,
                    help="The ID of the resposible staff.")


@namespace.route("/collection")
class CollectionManifests(Resource):
    # @namespace.marshal_list_with(manifestAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of collection manifests

        Returns data about every "collection" manifest on a determined time
        interval. Can filter also by employee id.
        """
        args = parser.parse_args()
        staff_id = args['staff_id']
        time_before = args['time_before']  # Format: YYYY-MM-DD
        time_after = args['time_after']    # Format: YYYY-MM-DD

        searchQuery = {}

        if staff_id is not None:
            searchQuery["staff_id"] = ObjectId(staff_id)

        if time_after is not None or time_before is not None:
            if time_before is None:
                searchQuery["date"] = {"$lte": time_after}
            elif time_after is None:
                searchQuery["date"] = {"$gte": time_before}
            else:
                searchQuery["date"]["$lte"] = time_after

        response = manifestCollection.find(searchQuery)

        return json.loads(json_util.dumps(response))
