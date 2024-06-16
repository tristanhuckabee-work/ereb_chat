"""create servers table

Revision ID: ac7a75e1e583
Revises: ffdc0a98111c
Create Date: 2024-06-15 18:13:11.886157

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'ac7a75e1e583'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('servers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('invite_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE servers SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('servers')
