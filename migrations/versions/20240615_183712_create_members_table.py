"""create members table

Revision ID: 2f540b6c45b9
Revises: e03985f411b6
Create Date: 2024-06-15 18:37:12.153927

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '2f540b6c45b9'
down_revision = 'e03985f411b6'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('members',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('server_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE members SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('members')