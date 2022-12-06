from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Cart(db.Model):
    __tablename__ = 'carts'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    checked_out = db.Column(db.Boolean, nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    # updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    cart_list = db.relationship("Cart_Item", back_populates = 'my_cart', cascade='all, delete-orphan')
    user = db.relationship("User", back_populates = 'my_carts')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_date':  self.created_date,
            'checked_out': self.checked_out,
            # 'updated_date': self.updated_date,
            'Items': [item.cart_item_to_dict() for item in self.cart_list]
        }
    
    def curr_cart_to_dict(self):
        return {
            'id': self.id,
            'Items': [item.cart_item_to_dict() for item in self.cart_list]
        }