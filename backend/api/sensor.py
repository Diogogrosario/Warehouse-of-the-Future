from flask_restx import fields, inputs, reqparse, Namespace, Resource

namespace = Namespace("Sensors", path="/sensors",
                      description="Sensor related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

sensorMovementAttribute = namespace.model("Sensor Movements", {
    "id": fields.Integer(required=True, description="The unique identificator \
        of the sensor movement"),
    "records": fields.List(fields.DateTime(required=True, description="\
        The timestamps of the movements"))
})

sensorAttributes = namespace.model("Sensor", {
    "id": fields.Integer(required=True, description="The unique identificator \
        of the sensor"),
    "time": fields.DateTime(required=True, description="Time of this record \
        information"),
    "current_position": fields.List(fields.Integer, required=True, description="\
        The current coordinates of the sensor"),
    "battery": fields.Integer(required=True, description="The battery level of \
        the sensor"),
})

# ------------------------------------------------------------------------------
# Sensor information
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_after", required=False, type=inputs.date, help="The \
    lower bound for the timestamp of the selected sensor.")
parser.add_argument("time_before", required=False, type=inputs.date, help="The \
    upper bound for the timestamp of the selected sensor.")


@namespace.route("/<int:id>")
class SensorInformation(Resource):
    @namespace.marshal_with(sensorAttributes)
    @namespace.expect(parser)
    def get(self, id: int):
        """
        Returns information of a sensor

        Returns data about the sensor that has the passed "id" on a determined
        time interval.
        """
        return {}

# ------------------------------------------------------------------------------
# Sensor movements
# ------------------------------------------------------------------------------


@namespace.route("/<int:id>/movements")
class SensorMovements(Resource):
    @namespace.marshal_with(sensorAttributes)
    @namespace.expect(parser)
    def get(self, id: int):
        """
        Returns information of the movements of a sensor

        Returns the registered movements of the sensor that has the passed "id"
        on a determined time interval.
        """
        return {}
