from flask_restx import Api

from .global_data import namespace as global_data_namespace
from .manifest import namespace as manifests_namespace
from .sensor import namespace as sensors_namespace
from .staff import namespace as staff_namespace
from .stock import namespace as stock_namespace
from .layout import namespace as layouts_namespace
from .generate_data import namespace as generate_data_namespace

api = Api(
    title='Data Lake',
    version='1.0',
    description='Data Lake for Warehouse'
)

api.add_namespace(global_data_namespace)
api.add_namespace(manifests_namespace)
api.add_namespace(sensors_namespace)
api.add_namespace(staff_namespace)
api.add_namespace(stock_namespace)
api.add_namespace(layouts_namespace)
api.add_namespace(generate_data_namespace)
