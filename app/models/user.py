from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .store import Store

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image_profile_url = db.Column(db.String(300))
    hashed_password = db.Column(db.String(255), nullable=False)
    # store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')))

    my_reviews = db.relationship("Review", back_populates='user', cascade='all, delete-orphan')
    my_carts = db.relationship("Cart", back_populates='user', cascade='all, delete-orphan')
    my_store = db.relationship("Store", back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'current_cart': self.get_current_cart(),
            'image_profile_url': self.image_profile_url,
            'store_id': self.get_store_id()
        }

    def get_store_id(self):
        if len(self.my_store) == 0:
            return "null"
        else:
            store_arr = [store.id_to_dict() for store in self.my_store]
            store_id = store_arr[0]
            return store_id["id"]

    def user_preview_to_dict(self):
        return {
            'id': self.id,
            'username': self.first_name,
            'image_profile_url': self.image_profile_url
        }

    def get_current_cart(self):
        cart = self.my_carts.pop()
        return cart.curr_cart_to_dict()