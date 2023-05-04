from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ItemEditorForm, ReviewForm
from app.models import db, Item, User, Review, Store
from sqlalchemy.orm import joinedload
from datetime import datetime
import stripe
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
stripe.api_key = 'sk_test_51M3OooDVmTpUEfT54GvKtvkNLNaX0QyPedQUyKB9Of80VkJZ2FxjULYiavwafiCQSyljIbHBdyXZeot7Z7W5zlEM00RNC2jZz9'

item_routes = Blueprint('items', __name__)


# get all items
@item_routes.route('/')
def get_all_items():
    items = Item.query.order_by(Item.created_date.desc()).all()
    if not bool(items):
        return jsonify({'message': 'Items could not be found'}), 404
    return jsonify({'Items': [item.preview_item_to_dict() for item in items]}), 200 

# get all stickers
@item_routes.route('/stickers')
def get_all_stickers():
    stickers = Item.query.where(Item.content_type == 'sticker').order_by(Item.created_date.desc()).all()
    if not bool(stickers):
        return jsonify({'message': 'Stickers could not be found'}), 404
    return jsonify({'Items': [sticker.preview_item_to_dict() for sticker in stickers]}), 200 

# get all stories
@item_routes.route('/stories')
def get_all_stories():
    stories = Item.query.where(Item.content_type == 'story').order_by(Item.created_date.desc()).all() 
    if not bool(stories):
        return jsonify({'message': 'Stories could not be found'}), 404
    return jsonify({'Items': [story.preview_item_to_dict() for story in stories]}), 200 

# create an item
@item_routes.route('/', methods=['POST'])
@login_required
def create_item():
    print('6666666666666666666666666666666666666666666666666666666666666666666666', request.files)
    print('777777777777777777777777777777777777777777777777777777777', request.files.get('image_url'))
    form = ItemEditorForm() # look into this line
    form['csrf_token'].data = request.cookies['csrf_token']
    if "image_url" not in request.files:
        return jsonify({'message': 'To create an item, you need to provide a valid image'}), 400
    file = request.files.get('image_url')
    print('88888888888888888888888888888888888888888888888888888888888888888888', file.filename)


    if not allowed_file(file.filename):
        return jsonify({'message': 'To create an item, your image file type must be one of the types listed in the directions'}), 400
    file.filename = get_unique_filename(file.filename)
    awsUpload = upload_file_to_s3(file)
    if 'url' not in awsUpload:
        return awsUpload, 400 # is this syntax correct? 

    if not current_user.get_store_id() == "null":
        stripeProduct = stripe.Product.create(
            name=form.data['name'],
            description=form.data['description'],
            image_url=awsUpload['url']
        )
        print('STRIPE STRIPE STRIPE STRIPE STRIPE', stripeProduct)
        if stripeProduct:
            stripePrice = stripe.Price.create(
                #have to put in logic to fix this bug, unit amount cannot have any puncuation or it errors, must convert form data into parsable int
                #update: temp fixed with price validation on front end, but not the most ideal
                unit_amount_decimal=(form.data['price']*100), 
                currency="usd",
                product=str(stripeProduct['id'])
            )
            # print('PRICE PRICE PRICE PRICE PRICE', stripePrice['id'])
            if form.validate_on_submit():
                if stripePrice['id']:
                    item = Item(
                        name=form.data['name'],
                        description=form.data['description'],
                        price=form.data['price'],
                        image_url=form.data['image_url'],
                        content=form.data['content'],
                        content_type=form.data['content_type'],
                        stripe_price_key=stripePrice['id'],
                        stripe_product_id=stripeProduct['id'],
                        store_id=current_user.get_store_id()
                    )
                    item.image_url = awsUpload['url']
                    db.session.add(item)
                    db.session.commit()
                    return item.to_dict()
                else:
                    return jsonify({'message': 'stripe product could not be created'}), 404
        # else:
        #     # need to have better backend validation
        #     return jsonify({'message': 'To create an item ALL fields must be filled out'}), 400
    else:
        return jsonify({'message': 'To create an item you must first create a store'}), 400
        
    

# get a single item
@item_routes.route('/<int:item_id>')
def get_one_item(item_id):
    item = Item.query.filter(Item.id == item_id).first()
    if item:
        item_obj = item.full_item_to_dict()
        return jsonify(item_obj), 200
    else:
        return jsonify({'message': 'Item could not be found'}), 404

# edit & delete a single item
@item_routes.route('/<int:item_id>', methods=['PUT', 'DELETE'])
@login_required
def update_one_item(item_id):
    if request.method == 'PUT':
        form = ItemEditorForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        item = Item.query.filter(Item.id == item_id).first()
        if item:
            if not current_user.get_store_id() == "null":
                if item.store_id == current_user.get_store_id():
                    if form.validate_on_submit():
                        item.name=form.data['name'] or item.name
                        item.description=form.data['description'] or item.description
                        item.price=form.data['price'] or item.price
                        item.image_url=form.data['image_url'] or item.image_url
                        item.content_type=form.data['content_type'] or item.content_type
                        item.content=form.data['content'] or item.content
                        item.store_id=current_user.get_store_id()
                        item.updated_date = datetime.now()
                        db.session.add(item)
                        db.session.commit()
                        return jsonify(item.to_dict()), 200
                    else:
                        return jsonify({'message': 'Item needs the have a name and content'}), 400
                else:
                    return jsonify({'message': 'Users can only edit their own items'}), 403
            else:
                return jsonify({'message': 'To edit an item you must first create a store and create an item to edit'}), 403
        else:
            return jsonify({'message': 'Item could not be found'}), 404

    if request.method == 'DELETE':
        item = Item.query.get(item_id)
        if item:
            if item.store_id == current_user.get_store_id():
                db.session.delete(item)
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Users can only delete their own items'}), 403
        else:
            return jsonify({'message': 'Item could not be found'}), 404

# get all reviews for an item
@item_routes.route('/<int:item_id>/reviews')
def get_item_reviews(item_id):
  item = Item.query.get(item_id)
  if item:
    reviews = [review.to_dict() for review in item.item_reviews]
    return jsonify({ 'Reviews': reviews}), 200
  else:
    return jsonify({'message': 'Item could not be found'}), 404

# post a review for an item
@item_routes.route('/<int:item_id>/reviews', methods=['POST'])
@login_required
def create_item_review(item_id):
  current_user_id = int(current_user.is_authenticated) and current_user.id
  item = Item.query.get(item_id)
  form = ReviewForm()
  if item:
    if form.validate_on_submit:
      review = Review(
            content=form.data['content'],
            star_rating=form.data['star_rating'],
            photo=form.data['photo'],
            store_id=item.store_id,
            item_id=item_id,
            user_id=current_user_id
        )
      db.session.add(review)
      db.session.commit()
      return review.to_dict()
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  else:
    return jsonify({'message': 'Item could not be found'}), 404

