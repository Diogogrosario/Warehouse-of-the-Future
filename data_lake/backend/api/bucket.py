from bson import json_util
from flask_restx import fields, Namespace, Resource, abort
from bson import ObjectId
import json

from .db import client

bucketsCollection = client.WoF.Buckets

namespace = Namespace("Buckets", path="/buckets",
                      description="Buckets related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

bucketAttributes = namespace.model("Bucket", {
    "id": fields.String(
        required=True,
        attribute="_id.$oid",
        description="Bucket id"
    ),
    "width": fields.Float(
        required=True,
        description="Width of the bucket, in cm"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the bucket, in cm"
    ),
    "length": fields.Float(
        required=True,
        description="Length of the bucket, in cm"
    ),
    "position": fields.List(
        fields.Integer(
            required=True,
            description="Bucket position")
    ),
    "item_id": fields.String(
        required=True,
        attribute="item_id.$oid",
        description="Associated item id"
    ),
    "quantity": fields.Integer(required=True, description="Item quantity"),
    "shelf_id": fields.String(
        required=True,
        attribute="shelf_id.$oid",
        description="Associated shelf id"
    )
})


# ------------------------------------------------------------------------------
# Buckets information
# ------------------------------------------------------------------------------

@namespace.route("/")
class Buckets(Resource):
    @namespace.marshal_list_with(bucketAttributes)
    def get(self):
        """
        Returns information of the buckets
        """

        response = bucketsCollection.find({})
        return json.loads(json_util.dumps(response))


@namespace.route("/<string:id>")
@namespace.param('id', 'The bucket ID')
class Bucket(Resource):
    @namespace.marshal_with(bucketAttributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns the information of a specific bucket.
        """
        try:
            document = bucketsCollection.find_one({"_id": ObjectId(id)})
        except Exception:
            abort(400, 'Incorrect bucket ID passed.')

        return json.loads(json_util.dumps(document))
