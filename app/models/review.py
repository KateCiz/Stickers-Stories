from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    content = db.Column(db.String, nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False)
    created_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.Date, default=datetime.datetime.now, nullable=False)

    user = db.relationship("User", back_populates= 'my_reviews')
    item = db.relationship("Item", back_populates = 'item_reviews')
    store =  db.relationship("Store", back_populates = 'store_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user': {
                    'id': self.user.id,
                    'username': self.user.username,
                    'image_profile_url': self.user.image_profile_url
            },
            'content': self.content,
            'star_rating': self.star_rating,
            'photo': self.photo,
            'store_id': self.store_id,
            'item_id': self.item_id,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }
