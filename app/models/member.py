from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


members = db.Table(
    "members",
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('server_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('servers.id')), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.now()),
    db.Column('updated_at', db.DateTime, default=datetime.now())
)

if environment == "production":
    members.schema = SCHEMA