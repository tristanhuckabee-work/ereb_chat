from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


def seed_servers():
    server1 = Server(name='Demo Server', owner_id='1')
    server2 = Server(name='Phantom Server', owner_id='2')
    server3 = Server(name='Bobbie Server', owner_id='3')
    # server4 = Server(name='', owner_id='', invite_url="")
    # server5 = Server(name='', owner_id='', invite_url="")
    # server6 = Server(name='', owner_id='', invite_url="")
    # server7 = Server(name='', owner_id='', invite_url="")
    # server8 = Server(name='', owner_id='', invite_url="")
    # server9 = Server(name='', owner_id='', invite_url="")
    # server10 = Server(name='', owner_id='', invite_url="")
    # server11 = Server(name='', owner_id='', invite_url="")
    # server12 = Server(name='', owner_id='', invite_url="")

    server1.invite_url = server1.generate_invite_url()
    server2.invite_url = server2.generate_invite_url()
    server3.invite_url = server3.generate_invite_url()
    # server4.invite_url = server4.generate_invite_url()
    # server5.invite_url = server5.generate_invite_url()
    # server6.invite_url = server6.generate_invite_url()
    # server7.invite_url = server7.generate_invite_url()
    # server8.invite_url = server8.generate_invite_url()
    # server9.invite_url = server9.generate_invite_url()
    # server10.invite_url = server10.generate_invite_url()
    # server11.invite_url = server11.generate_invite_url()
    # server12.invite_url = server12.generate_invite_url()


    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    # db.session.add(server4)
    # db.session.add(server5)
    # db.session.add(server6)
    # db.session.add(server7)
    # db.session.add(server8)
    # db.session.add(server9)
    # db.session.add(server10)
    # db.session.add(server11)
    # db.session.add(server12)
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
        
    db.session.commit()
