from flask.cli import AppGroup
# from .users import seed_users, undo_users
from .all_new_seeds import seed_users, undo_users, seed_stores, undo_stores, seed_reviews, undo_reviews, seed_items, undo_items, seed_carts, undo_carts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_users()
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.commit()

        db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
        db.session.commit()

        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
        db.session.commit()

        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.commit()

        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    # Add other seed functions here
   
    seed_stores()

    seed_items()

    seed_reviews()

    seed_carts()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_stores()
    undo_items()
    undo_reviews()
    undo_carts()

