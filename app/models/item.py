from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Item(db.Model):
    __tablename__ = 'items'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    content = db.Column(db.String(), nullable=False)
    content_type = db.Column(db.String(), nullable=False)
    stripe_price_key = db.Column(db.String(), nullable=False)
    stripe_product_id = db.Column(db.String(), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_date = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    cart_items = db.relationship("Cart_Item", back_populates = 'items_in_cart', cascade='all, delete-orphan')
    item_reviews = db.relationship("Review", back_populates = 'item', cascade='all, delete-orphan')
    # user = db.relationship("User", back_populates = 'my_items')
    store =  db.relationship("Store", back_populates = 'store_items')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'content_type': self.content_type,
            'content': self.content,
            'image_url': self.image_url,
            'store_id': self.store_id,
            'created_date':  self.created_date,
            'updated_date': self.updated_date
        }

    def preview_item_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'content_type': self.content_type,
            'image_url': self.image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Store': self.store.preview_store_to_dict()
        }

    def store_item_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'content_type': self.content_type,
            'image_url': self.image_url,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
        }

    def full_item_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url,
            'content': self.content,
            'content_type': self.content_type,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Store': self.store.preview_store_to_dict(),
            'Reviews': [review.to_dict() for review in self.item_reviews],
            'num_reviews': self.num_reviews(),
            'avg_star_rating': self.avg_star_rating()
        }

    def num_reviews(self):
        return len(self.item_reviews)

    def avg_star_rating(self): 
        if len(self.item_reviews) == 0:
            return "Item has no reviews yet"
        else:
            count = 0
            stars = [review.star_rating for review in self.item_reviews]
            for i in stars:
                count = count + i   
            return round(count/len(self.item_reviews), 2)

    def cart_item_to_dict(self):
        return {
            'id': self.id,
            'store_id': self.store_id,
            'name': self.name,
            'price': self.price,
            'image_url': self.image_url,
            'content_type': self.content_type,
            'content': self.content,
            'created_date':  self.created_date,
            'updated_date': self.updated_date,
            'Store': self.store.preview_store_to_dict()
        }

    def checkout_item_to_dict(self):
      return {
          'price': self.stripe_price_key,
          'quantity': 1
      }