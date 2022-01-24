from bson import json_util
from flask_restx import fields, Namespace, Resource, abort
from bson import ObjectId
import json

from .db import client

racksCollection = client.WoF.Racks

namespace = Namespace("Racks", path="/racks",
                      description="Racks related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

rackAttributes = namespace.model("Rack", {
    "id": fields.String(
        required=True,
        attribute="_id.$oid",
        description="Rack id"
    ),
    "width": fields.Float(
        required=True,
        description="Width of the rack, in cm"
    )
})


# ------------------------------------------------------------------------------
# Racks information
# ------------------------------------------------------------------------------

@namespace.route("/")
class Racks(Resource):
    @namespace.marshal_list_with(rackAttributes)
    def get(self):
        """
        Returns information of the racks
        """

        response = racksCollection.find({})
        return json.loads(json_util.dumps(response))


@namespace.route("/<string:id>")
@namespace.param('id', 'The rack ID')
class Rack(Resource):
    @namespace.marshal_with(rackAttributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns the information of a specific rack.
        """
        try:
            document = racksCollection.find_one({"_id": ObjectId(id)})
        except Exception:
            abort(400, 'Incorrect rack ID passed.')

        return json.loads(json_util.dumps(document))
