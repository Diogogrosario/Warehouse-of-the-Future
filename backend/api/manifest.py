from flask_restx import fields, inputs, reqparse, Namespace, Resource

namespace = Namespace("Manifests", path="/manifests",
                      description="Manifests related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

itemAttributes = namespace.model("ManifestItem", {
    "item": fields.String(required=True, description=""),
    "quantity": fields.Integer(required=True, description=""),
    "position": fields.List(fields.Integer, required=True, description=""),
})

manifestAttributes = namespace.model("Manifest", {
    "items": fields.List(fields.Nested(itemAttributes),
                         description="List of items in manifest"),
    "time": fields.DateTime(required=True, description="The manifest time"),
})

manifestExampleList = [
    {
        "items": [
            {
                "item": "prego",
                "quantity": 5,
                "position": [10, 20, 30]
            },
            {
                "item": "parafuso",
                "quantity": 10,
                "position": [30, 20, 10]
            }
        ],
        "time": "2020-10-12"
    },
    {
        "items": [
            {
                "item": "parabrisas",
                "quantity": 2,
                "position": [5, 23, 31]
            },
            {
                "item": "porta",
                "quantity": 4,
                "position": [10, 5, 60]
            }
        ],
        "time": "2020-10-12"
    },
]

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
    @namespace.marshal_list_with(manifestAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of reposition manifests

        Returns data about every "reposition" manifest on a determined time
        interval.
        """
        return manifestExampleList


# ------------------------------------------------------------------------------
# Collection Manifests
# ------------------------------------------------------------------------------

parser.add_argument("staff_id", required=False, type=int,
                    help="The ID of the resposible staff.")


@namespace.route("/collection")
class CollectionManifests(Resource):
    @namespace.marshal_list_with(manifestAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of collection manifests

        Returns data about every "collection" manifest on a determined time
        interval. Can filter also by employee id.
        """
        return manifestExampleList
