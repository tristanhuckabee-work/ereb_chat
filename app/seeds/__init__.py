from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_servers()
    seed_users()
    seed_servers()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
