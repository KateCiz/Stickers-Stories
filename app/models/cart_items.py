from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Cart_Item(db.Model):
    __tablename__ = 'cart_items'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    my_cart = db.relationship("Cart", back_populates = 'cart_list')
    items_in_cart = db.relationship("Item", back_populates = 'cart_items')

    # these relationships might cause issues if they aren't right
