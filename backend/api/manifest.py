from flask_restx import Namespace, Resource, fields

namespace = Namespace("manifests", description="Manifests related operations")

manifest = namespace.model("Manifest", {
    "id": fields.String(required=True, description="The manifest identifier"),
    "time": fields.DateTime(required=True, description="The manifest time"),
})

MANIFESTS = [
    {
        "id": "1",
        "time": "2020-10-11"
    },
    {
        "id": "2",
        "time": "2020-10-12"
    }
]


@namespace.route("/")
class CatList(Resource):
    @namespace.doc("list_manifests")
    @namespace.marshal_list_with(manifest)
    def get(self):
        """List all manifests"""
        return MANIFESTS


@namespace.route("/<id>")
@namespace.param("id", "The manifest identifier")
@namespace.response(404, "Manifest not found")
class Cat(Resource):
    @namespace.doc("get_manifest")
    @namespace.marshal_with(manifest)
    def get(self, id):
        """Fetch a manifest given its identifier"""
        for manifest in MANIFESTS:
            if manifest["id"] == id:
                return manifest
        namespace.abort(404)
