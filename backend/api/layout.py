from flask_restx import fields, inputs, reqparse, Namespace, Resource

namespace = Namespace("Layouts", path="/layouts",
                      description="Layouts related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

bucketAttributes = namespace.model("LayoutBucket", {
    "_id": fields.Integer(required=True, description=""),
    "bucket": fields.Integer(required=True, description=""),
    "item": fields.Integer(required=True, description=""),
    "quantity": fields.Integer(required=True, description=""),
    "coordinates": fields.List(fields.Integer(required=True, description="")),
    "shelf": fields.Integer(required=True, description=""),
})

layoutAttributes = namespace.model("Layout", {
    "buckets": fields.List(fields.Nested(bucketAttributes),
                         description="List of bucets in layout"),
    "date": fields.DateTime(required=True, description="The layout time"),
})

layoutsExampleList = [
    {
        "date": "01-01-2021",
        "buckets": [
            {
                "_id": 1,
                "bucket": 10,
                "item": 1,
                "quantity": 10,
                "coordinates": [  
                    1,  
                    1  
                ],
                "shelf": 1
            }
        ]
    },
]

# ------------------------------------------------------------------------------
# Layouts information
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("time_after", required=False, type=inputs.date,
                    help="The lower bound for the timestamp of layouts.")
parser.add_argument("time_before", required=False, type=inputs.date,
                    help="The upper bound for the timestamp of layouts.")


@namespace.route("/warehouse")
class Layouts(Resource):
    @namespace.marshal_list_with(layoutAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns information of layouts

        Returns data about every warehouse layout on a determined time interval.
        """
        return layoutsExampleList
