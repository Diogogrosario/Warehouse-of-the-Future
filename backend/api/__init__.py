from flask_restx import Api

from .manifest import namespace as manifests_namespace

api = Api(
    title='Data Lake',
    version='1.0',
    description='Data Lake for Warehouse'
)

api.add_namespace(manifests_namespace)
