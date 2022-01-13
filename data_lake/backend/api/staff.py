from flask_restx import fields, reqparse, Namespace, Resource, abort
from bson.objectid import ObjectId
from bson import json_util
import json
import datetime
from .db import client

employeesCollection = client.WoF.Employees

namespace = Namespace("Staff", path="/staff",
                      description="Staff related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

staffAttributes = namespace.model("Staff", {
    "id": fields.String(required=True, attribute='_id.$oid', description="The unique identificator \
of the staff member"),
    "name": fields.String(required=True, description="The name of this staff \
member"),
    "birth_date": fields.String(
        required=True,
        description="Birth date of this staff member"
    ),
    "height": fields.Integer(require=True, description="Staff member age")
})

# ------------------------------------------------------------------------------
# Staff queries
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("name", required=False, type=str, help="The name \
of the staff member to search for.")
parser.add_argument("age", required=False, type=int, help="Minimum age in years to \
filter of the needed staff members.")


@namespace.route("/")
class StaffQuery(Resource):
    @namespace.marshal_list_with(staffAttributes)
    @namespace.expect(parser)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self):
        """
        Returns the result of the search for staff members

        Returns information about all the staff members that match the name \
            and minimum age passed as query parameters.
        """

        args = parser.parse_args()
        name = args['name']
        age = args['age']
        searchQuery = {}

        if age is not None:
            try:
                today = datetime.date.today()

                dt = datetime.datetime(
                    year=today.year - age,
                    month=today.month,
                    day=today.day
                )
                searchQuery["birth_date"] = {"$lte": str(dt)}
            except Exception:
                return json.loads(json_util.dumps([]))

        if name is not None:
            searchQuery["name"] = name

        response = employeesCollection.find(searchQuery)
        return json.loads(json_util.dumps(response))

# ------------------------------------------------------------------------------
# Staff instance information
# ------------------------------------------------------------------------------


@namespace.route("/<string:id>")
@namespace.param('id', 'The staff member ID')
class StaffInformation(Resource):
    @namespace.marshal_with(staffAttributes)
    @namespace.response(200, 'Success')
    @namespace.response(404, 'Incorrect Request')
    def get(self, id: str):
        """
        Returns the information of a staff member

        Returns all the information of the staff member that has the passed
        "id".
        """
        try:
            document = employeesCollection.find_one({"_id": ObjectId(id)})
        except Exception:
            abort(400, 'Incorrect Staff member ID passed.')

        return json.loads(json_util.dumps(document))
