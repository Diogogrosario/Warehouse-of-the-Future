from flask_restx import fields, inputs, reqparse, Namespace, Resource
from bson.objectid import ObjectId
from bson import json_util
import json
from .db import client

sensorsCollection = client.WoF.Sensors

namespace = Namespace("Sensors", path="/sensors",
                      description="Sensor related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

staff_contact_in_sensor_attributes = namespace.model("StaffContactInSensor", {
    "time": fields.String(
        required=True,
        attribute='time',
        description="Timestamp of when the sensor registered the contact"
    ),
    "staff_id": fields.String(
        required=True,
        attribute='staff_id.$oid',
        description="Id of the operator that was next to the sensor"
    )
})

sensor_attributes = namespace.model("Sensor", {
    "id": fields.String(
        required=True,
        attribute='_id.$oid',
        description="The unique identifier of the sensor"
    ),
    "device": fields.String(
        required=True,
        attribute='device.$oid',
        description="The unique identifier of the associated device"
    ),
    "movement_records": fields.List(
        fields.String(),
        required=True,
        description="Timestamps of the movement detections."
    ),
    "staff_contacts": fields.List(
        fields.Nested(staff_contact_in_sensor_attributes),
        required=True,
        description="Represents at a specific timestamp what was"
                    + "the operator that was next to the sensor."
    )
})

# ------------------------------------------------------------------------------
# Sensor information
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_before",
                    required=False,
                    type=inputs.date,
                    help="The lower bound for the timestamp " +
                    "of the selected sensor (Format YYYY-MM-DD).")
parser.add_argument("time_after",
                    required=False,
                    type=inputs.date,
                    help="The upper bound for the timestamp of " +
                    "the selected sensor (Format YYYY-MM-DD).")


@namespace.route("/<string:id>/staff_contacts")
@namespace.param('id', 'The sensor ID')
class SensorInformationWithTimestamps(Resource):
    @namespace.marshal_with(staff_contact_in_sensor_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    @namespace.expect(parser)
    def get(self, id: str):
        """
        Returns information of a sensor

        Returns data about the sensor that has the passed "id" on a determined
        time interval.
        """
        args = parser.parse_args()
        time_before = args['time_before']  # Format: YYYY-MM-DD
        time_after = args['time_after']    # Format: YYYY-MM-DD

        searchQuery = {"_id": ObjectId(id)}

        if time_before is not None or time_after is not None:
            searchQuery["staff_contacts.time"] = {}
            if time_before is not None:
                searchQuery["staff_contacts.time"]["$gte"] = str(time_before)
            if time_after is not None:
                searchQuery["staff_contacts.time"]["$lte"] = str(time_after)

        document = sensorsCollection.aggregate([
            {"$unwind": "$staff_contacts"},
            {"$match": searchQuery},
            {"$project": {
                "time": "$staff_contacts.time",
                "staff_id": "$staff_contacts.staff_id"
            }}
        ])

        return json.loads(json_util.dumps(document))


@namespace.route("/<string:id>")
@namespace.param('id', 'The sensor ID')
class DeviceInformation(Resource):
    @namespace.marshal_with(sensor_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns information of a sensor

        Returns data about the sensor that has the passed "id".
        """
        document = sensorsCollection.find_one({"_id": ObjectId(id)})

        return json.loads(json_util.dumps(document))


@namespace.route("/")
class AllSensorInformation(Resource):
    @namespace.marshal_with(sensor_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns information of all sensors.
        """
        document = sensorsCollection.find({})

        return json.loads(json_util.dumps(document))

# ------------------------------------------------------------------------------
# Sensor movements
# ------------------------------------------------------------------------------


@namespace.route("/<string:id>/movements")
@namespace.param('id', 'The sensor ID')
class SensorMovements(Resource):
    @namespace.expect(parser)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns information of the movements of a sensor

        Returns the registered movements of the sensor that has the passed "id"
        on a determined time interval.
        """
        args = parser.parse_args()
        time_before = args['time_before']  # Format: YYYY-MM-DD
        time_after = args['time_after']    # Format: YYYY-MM-DD

        searchQuery = {"_id": ObjectId(id)}

        if time_before is not None or time_after is not None:
            searchQuery["movement_records"] = {}
            if time_before is not None:
                searchQuery["movement_records"]["$gte"] = str(time_before)
            if time_after is not None:
                searchQuery["movement_records"]["$lte"] = str(time_after)

        document = sensorsCollection.aggregate([
            {"$unwind": "$movement_records"},
            {"$match": searchQuery},
            {"$group": {
                "_id": None,
                "movement_records": {"$push": "$movement_records"}
            }},
            {"$project": {"_id": False, "movement_records": True}},
        ])

        return json.loads(json_util.dumps(document))
