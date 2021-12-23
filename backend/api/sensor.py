from flask_restx import fields, inputs, reqparse, Namespace, Resource
from bson.objectid import ObjectId
from bson import json_util
import json
from .db import client

devicesCollection = client.WoF.Devices

namespace = Namespace("Sensors", path="/sensors",
                      description="Sensor related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

staff_contact_in_sensor_attributes = namespace.model("StaffContactInSensor", {
    "time": fields.DateTime(
        required=True,
        attribute='time.$date',
        description="Timestamp of when the sensor registered the contact"
    ),
    "staff_id": fields.String(
        required=True,
        attribute='staff_id.$oid',
        description="Id of the operator that was next to the sensor"
    )
})

movement_sensor_attributes = namespace.model("StaffContactInSensor", {
    "time": fields.DateTime(
        required=True,
        attribute='time.$date',
        description="Timestamp of when the sensor registered the contact"
    )
})

sensor_attributes = namespace.model("Sensor", {
    "id": fields.String(
        required=True,
        attribute='_id.$oid',
        description="The unique identifier of the sensor"
    ),
    "bucket": fields.String(
        required=True,
        attribute='bucket.$oid',
        description="The unique identifier of the associated bucket"
    ),
    "movement_sensor": fields.List(
        fields.DateTime(
            attribute="$date"
        ),
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
                    "of the selected sensor.")
parser.add_argument("time_after",
                    required=False,
                    type=inputs.date,
                    help="The upper bound for the timestamp of " +
                    "the selected sensor.")


@namespace.route("/<string:id>/timestamps")
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

        if time_before is not None:
            searchQuery["staff_contacts.time"] = {"$gte": time_before}
        if time_after is not None and time_before is not None:
            searchQuery["staff_contacts.time"]["$lte"] = time_after
        elif time_after is not None and time_before is None:
            searchQuery["staff_contacts.time"] = {"$lte": time_after}

        document = devicesCollection.aggregate([
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
class SensorInformation(Resource):
    @namespace.marshal_with(sensor_attributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns information of a sensor

        Returns data about the sensor that has the passed "id".
        """
        document = devicesCollection.find({"_id": ObjectId(id)})

        return json.loads(json_util.dumps(document))

# ------------------------------------------------------------------------------
# Sensor movements
# ------------------------------------------------------------------------------


@namespace.route("/<string:id>/movements")
@namespace.param('id', 'The sensor ID')
class SensorMovements(Resource):
    @namespace.marshal_with(movement_sensor_attributes)
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

        if time_before is not None:
            searchQuery["movement_sensor"] = {"$gte": time_before}
        if time_after is not None and time_before is not None:
            searchQuery["movement_sensor"]["$lte"] = time_after
        elif time_after is not None and time_before is None:
            searchQuery["movement_sensor"] = {"$lte": time_after}

        document = devicesCollection.aggregate([
            {"$unwind": "$movement_sensor"},
            {"$match": searchQuery},
            {"$project": {"time": "$movement_sensor"}}
        ])

        return json.loads(json_util.dumps(document))
