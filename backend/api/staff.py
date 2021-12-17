from flask_restx import fields, inputs, reqparse, Namespace, Resource
from .db import client

namespace = Namespace("Staff", path="/staff",
                      description="Staff related operations")

# ------------------------------------------------------------------------------
# Models
# ------------------------------------------------------------------------------

staffAttributes = namespace.model("Staff", {
    "id": fields.Integer(required=True, description="The unique identificator \
        of the staff member"),
    "name": fields.String(required=True, description="The name of this staff \
        member"),
    "birthdate": fields.DateTime(required=True, description="Birth date of this \
        staff member"),
})

# ------------------------------------------------------------------------------
# Staff queries
# ------------------------------------------------------------------------------

parser = reqparse.RequestParser()
parser.add_argument("name", required=False, type=inputs.date, help="The name \
    of the staff member to search for.")
parser.add_argument("age", required=False, type=inputs.date, help="The age to \
    filter of the needed staff members.")


@namespace.route("/")
class StaffQuery(Resource):
    # @namespace.marshal_list_with(staffAttributes)
    # @namespace.expect(parser)
    def get(self):
        """
        Returns the result of the search for staff members

        Returns information about all the staff members that match the name \
            and age passed as query parameters.
        """
        return client.WoF.Employees.count_documents({})
# ------------------------------------------------------------------------------
# Staff instance information
# ------------------------------------------------------------------------------


@namespace.route("/<int:id>")
class StaffInformation(Resource):
    @namespace.marshal_with(staffAttributes)
    @namespace.expect(parser)
    def get(self):
        """
        Returns the information of a staff member

        Returns all the information of the staff member that has the passed
        "id".
        """
        return {}
