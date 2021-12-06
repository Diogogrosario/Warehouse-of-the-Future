from flask_restx import Api

from .cart import namespace as cart_namespace
from .manifest import namespace as manifests_namespace
from .sensor import namespace as sensors_namespace
from .staff import namespace as staff_namespace

api = Api(
    title='Data Lake',
    version='1.0',
    description='Data Lake for Warehouse'
)

api.add_namespace(cart_namespace)
api.add_namespace(manifests_namespace)
api.add_namespace(sensors_namespace)
api.add_namespace(staff_namespace)
