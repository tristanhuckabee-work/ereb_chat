from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Server(db.Model, UserMixin):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    invite_url = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    owner = db.relationship('User', back_populates='servers')
    users = db.relationship('User', back_populates='servers', secondary='members')
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete-orphan')

    @property
    def invite_url(self):
        return self.invite_url
    @invite_url.setter
    def invite_url(self):
        ord_str = [ord(char) for char in f'{self.name}{str(self.id)}']
        hex_str = ''.join([hex(char)[2:] for char in ord_str])
        self.invite_url = f'https://www.ereb-chat.onrender.com/api/servers/{bin_str}/join'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'invite_url': self.invite_url
        }
