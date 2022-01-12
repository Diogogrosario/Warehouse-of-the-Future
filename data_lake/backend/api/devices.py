from bson import json_util
from flask_restx import fields, Namespace, Resource, abort
from bson import ObjectId
import json

from .db import client

devicesCollection = client.WoF.Devices

namespace = Namespace("Devices", path="/devices",
                      description="Devices related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

deviceAttributes = namespace.model("Device", {
    "id": fields.String(
        required=True,
        attribute="_id.$oid",
        description="Device id"
    ),
    "bucket": fields.String(
        required=True,
        attribute="bucket.$oid",
        description="Bucket id"
    ),
    "sensor": fields.String(
        required=True,
        attribute="sensor.$oid",
        description="Sensor id"
    ),
})


# ------------------------------------------------------------------------------
# Sensor information
# ------------------------------------------------------------------------------

@namespace.route("/")
class Devices(Resource):
    @namespace.marshal_list_with(deviceAttributes)
    def get(self):
        """
        Returns information of the devices
        """

        response = devicesCollection.find({})
        return json.loads(json_util.dumps(response))


@namespace.route("/<string:id>")
@namespace.param('id', 'The device ID')
class Device(Resource):
    @namespace.marshal_with(deviceAttributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns the information of a specific device.
        """
        try:
            document = devicesCollection.find_one({"_id": ObjectId(id)})
        except Exception:
            abort(400, 'Incorrect Device ID passed.')

        return json.loads(json_util.dumps(document))
