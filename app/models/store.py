from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Store(db.Model):
    __tablename__ = 'stores'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    about = db.Column(db.String(500))
    cover_image_url = db.Column(db.String(300))
    profile_image_url = db.Column(db.String(300))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    store_reviews = db.relationship("Review", back_populates = 'store', cascade='all, delete-orphan')
    user = db.relationship("User", back_populates = 'my_store')
    store_items = db.relationship("Item", back_populates = 'store', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'about': self.about,
            'cover_image_url': self.cover_image_url,
            'profile_image_url': self.profile_image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Items': [item.store_item_to_dict() for item in self.store_items],
            'num_reviews': self.num_reviews(),
            'avg_reviews': self.avg_star_rating()
        }

    def id_to_dict(self):
        return {
            "id": self.id
        }

    def preview_store_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'profile_image_url': self.profile_image_url
        }

    def num_reviews(self):
        return len(self.store_reviews)

    def avg_star_rating(self): 
        if len(self.store_reviews) == 0:
            return "Store has no reviews yet"
        else:
            count = 0
            stars = [review.star_rating for review in self.store_reviews]
            for i in stars:
                count = count + i   
            return round(count/len(self.store_reviews), 2)