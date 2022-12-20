from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import StoreEditorForm
from app.models import db, Item, User, Review, Store
from sqlalchemy.orm import joinedload
from datetime import datetime

store_routes = Blueprint('stores', __name__)


# # get all stores
# @item_routes.route('/')
# def get_all_items():
#     stores = Store.query.order_by(Store.created_date.desc()).all()
#     if not bool(stores):
#         return jsonify({'message': 'Stores could not be found'}), 404
#     return jsonify({'Stores': [store.to_dict() for store in stores]}), 200 

# create a store
@store_routes.route('/', methods=['POST'])
@login_required
def create_store():
    form = StoreEditorForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.get_store_id() == "null":
        if form.validate_on_submit():
            store = Store(
                user_id=current_user.id,
                name=form.data['name'],
                cover_image_url=form.data['cover_image_url'],
                profile_image_url=form.data['profile_image_url'],
                about=form.data['about']
            )
            db.session.add(store)
            db.session.commit()
            return store.to_dict()
        else:
            return jsonify({'message': 'Store needs the have a name and about snippet'}), 400
    else:
        return jsonify({'message': 'Each user can only have one store'}), 400
    


# get a single store
@store_routes.route('/<int:store_id>')
def get_one_store(store_id):
    store = Store.query.filter(Store.id == store_id).first()
    if store:
        store_obj = store.to_dict()
        return jsonify(store_obj), 200
    else:
        return jsonify({'message': 'Store could not be found'}), 404


# edit & delete a single store
@store_routes.route('/<int:store_id>', methods=['PUT', 'DELETE'])
@login_required
def update_one_store(store_id):
    if request.method == 'PUT':
        form = StoreEditorForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        store = Store.query.filter(Store.id == store_id).first()
        if store:
            if store.user_id == current_user.id:
                if form.validate_on_submit():
                    store.user_id=current_user.id
                    store.name=form.data['name'] or store.name
                    store.cover_image_url=form.data['cover_image_url'] or store.cover_image_url
                    store.profile_image_url=form.data['profile_image_url'] or store.profile_image_url
                    store.about=form.data['about'] or store.about
                    store.updated_date = datetime.now()
                    db.session.add(store)
                    db.session.commit()
                    return jsonify(store.to_dict()), 200
                else:
                    return jsonify({'message': 'Store needs the have a name and about snippet'}), 400
            else:
                return jsonify({'message': 'Users can only edit their own store'}), 403
        else:
            return jsonify({'message': 'Store could not be found'}), 404

    if request.method == 'DELETE':
        store = Store.query.get(store_id)
        if store:
            if store.user_id == current_user.id:
                db.session.delete(store)
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Users can only delete their own store'}), 403
        else:
            return jsonify({'message': 'Store could not be found'}), 404

# get all reviews for a store
@store_routes.route('/<int:store_id>/reviews')
def get_store_reviews(store_id):
  store = Store.query.get(store_id)
  if store:
    # reviews = [review.to_dict() for review in store.store_reviews]
    return jsonify({ 'Reviews': [review.to_dict() for review in store.store_reviews]}), 200
  else:
    return jsonify({'message': 'Store could not be found'}), 404
