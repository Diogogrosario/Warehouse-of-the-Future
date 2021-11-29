from flask_restx import Resource


class HelloUser(Resource):
    def get(self, name: str = None) -> dict:
        return {'message': f'Hello, {name}!'}
