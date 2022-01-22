from flask_restx import Api

from .global_data import namespace as global_data_namespace
from .manifest import namespace as manifests_namespace
from .sensors import namespace as sensor_namespace
from .staff import namespace as staff_namespace
from .stock import namespace as stock_namespace
from .layouts import namespace as layouts_namespace
from .generate_data import namespace as generate_data_namespace
from .bucket import namespace as bucket_namespace
from .shelves import namespace as shelves_namespace
from .racks import namespace as racks_namespace
from .devices import namespace as devices_namespace

api = Api(
    title='Data Lake',
    version='1.0',
    description='Data Lake for Warehouse'
)

api.add_namespace(global_data_namespace)
api.add_namespace(manifests_namespace)
api.add_namespace(sensor_namespace)
api.add_namespace(devices_namespace)
api.add_namespace(staff_namespace)
api.add_namespace(stock_namespace)
api.add_namespace(layouts_namespace)
api.add_namespace(bucket_namespace)
api.add_namespace(shelves_namespace)
api.add_namespace(racks_namespace)
api.add_namespace(generate_data_namespace)
