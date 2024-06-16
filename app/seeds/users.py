from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(username='yung-demo', email='demo@user.io', password='password', profile_picture_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235494/pexels-jacek-jan-skorupski_ljira3.jpg")
    user2 = User(username='city-pop-phantom', email='marnie@user.io', password='password', profile_picture_url="https://res.cloudinary.com/dzsgront4/image/upload/v1700889029/marnie_z9wlbg.png")
    user3 = User(username='bigBobby32', email='robertwilliams@user.io', password='password', profile_picture_url="https://res.cloudinary.com/dzsgront4/image/upload/v1701235496/pexels-vadim-birsan_ahyinz.jpg")
    
    # user4 = User(username='', email='', password='password', profile_picture_url="")
    # user5 = User(username='', email='', password='password', profile_picture_url="")
    # user6 = User(username='', email='', password='password', profile_picture_url="")
    # user7 = User(username='', email='', password='password', profile_picture_url="")
    # user8 = User(username='', email='', password='password', profile_picture_url="")
    # user9 = User(username='', email='', password='password', profile_picture_url="")
    # user10 = User(username='', email='', password='password', profile_picture_url="")
    # user11 = User(username='', email='', password='password', profile_picture_url="")
    # user12 = User(username='', email='', password='password', profile_picture_url="")


    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    # db.session.add(user4)
    # db.session.add(user5)
    # db.session.add(user6)
    # db.session.add(user7)
    # db.session.add(user8)
    # db.session.add(user9)
    # db.session.add(user10)
    # db.session.add(user11)
    # db.session.add(user12)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
