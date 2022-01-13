from bson import json_util
from flask_restx import fields, Namespace, Resource, abort
from bson import ObjectId
import json

from .db import client

shelvesCollection = client.WoF.Shelves

namespace = Namespace("Shelves", path="/shelves",
                      description="Shelves related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

shelfAttributes = namespace.model("Shelf", {
    "id": fields.String(
        required=True,
        attribute="_id.$oid",
        description="Shelf id"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the shelf, in cm"
    ),
    "rack_id": fields.String(
        required=True,
        attribute="rack_id.$oid",
        description="Associated rack id"
    ),
})


# ------------------------------------------------------------------------------
# Shelves information
# ------------------------------------------------------------------------------

@namespace.route("/")
class Shelves(Resource):
    @namespace.marshal_list_with(shelfAttributes)
    def get(self):
        """
        Returns information of the shelves
        """

        response = shelvesCollection.find({})
        return json.loads(json_util.dumps(response))


@namespace.route("/<string:id>")
@namespace.param('id', 'The shelf ID')
class Shelf(Resource):
    @namespace.marshal_with(shelfAttributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns the information of a specific shelf.
        """
        try:
            document = shelvesCollection.find_one({"_id": ObjectId(id)})
        except Exception:
            abort(400, 'Incorrect shelf ID passed.')

        return json.loads(json_util.dumps(document))
