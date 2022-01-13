from bson import json_util
from bson.objectid import ObjectId
from flask_restx import fields, Namespace, Resource
import json

from .db import client

itemsCollection = client.WoF.Items

namespace = Namespace("Stock", path="/stock",
                      description="Stock related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------


itemAttributes = namespace.model("StockItem", {
    "id": fields.String(
        required=True,
        attribute='_id.$oid',
        description="Name of the item"),
    "designation": fields.String(
        required=True,
        description="Name of the item"),
    "width": fields.Float(
        required=True,
        description="Width of the item, in cm"
    ),
    "height": fields.Float(
        required=True,
        description="Height of the item, in cm"
    ),
    "length": fields.Float(
        required=True,
        description="Length of the item, in cm"
    ),
    "weight": fields.Float(
        required=True,
        description="Weight of the item, in g"
    ),
    "quantity": fields.Integer(
        required=True,
        description="Quantity of the item"
    ),
})

# ------------------------------------------------------------------------------
# Stock Information
# ------------------------------------------------------------------------------


@namespace.route("/")
class CollectionManifests(Resource):
    @namespace.marshal_list_with(itemAttributes)
    def get(self):
        """
        Returns information about the stock
        Returns data about the stock.
        """
        searchQuery = {}
        response = itemsCollection.find(searchQuery)
        return json.loads(json_util.dumps(response))


@namespace.route("/<string:id>")
class StockValues(Resource):
    @namespace.marshal_with(itemAttributes)
    def get(self, id: str):
        """
        Returns information about the item
        Returns data about a certain item of the stock.
        """
        searchQuery = {"_id": ObjectId(id)}
        response = itemsCollection.find_one(searchQuery)
        return json.loads(json_util.dumps(response))
