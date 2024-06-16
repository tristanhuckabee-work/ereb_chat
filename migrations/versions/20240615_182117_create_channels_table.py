"""create channels table

Revision ID: e03985f411b6
Revises: ac7a75e1e583
Create Date: 2024-06-15 18:21:17.152904

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'e03985f411b6'
down_revision = 'ac7a75e1e583'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE channels SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('channels')