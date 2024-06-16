from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server

server_routes = Blueprint('servers', __name__)


@server_routes.route('/')
@login_required
def servers():
    """
    Query for all servers and returns them in a list of server dictionaries
    """
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}


@server_routes.route('/<int:id>')
@login_required
def server(id):
    """
    Query for a server by id and returns that server in a dictionary
    """
    server = Server.query.get(id)
    return server.to_dict()
