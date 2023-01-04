from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Cart, Item, User, Cart_Item
from sqlalchemy.orm import joinedload
from datetime import datetime

cart_routes = Blueprint('carts', __name__)

# create a cart
@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart():
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user:
        cart = Cart(
            user_id=current_user.id
        )
        db.session.add(cart)
        db.session.commit()
        return cart.to_dict()
    else:
        return jsonify({'message': 'Cart needs to belong to a user'}), 400


# get a single cart
@cart_routes.route('/<int:cart_id>')
def get_one_store(cart_id):
    cart = Cart.query.filter(Cart.id == cart_id).first()
    if cart:
        if cart.user_id == current_user.id:
            cart_obj = cart.to_dict()
            return jsonify(cart_obj), 200
        else:
            return jsonify({'message': 'Cart could not be found'}), 404

# add item to cart
@cart_routes.route('/<int:cart_id>/add_item/<int:item_id>', methods=['POST'])
@login_required
def add_item_to_cart(cart_id, item_id):
        cart = Cart.query.filter(Cart.id == cart_id).first()
        item = Item.query.filter(Item.id == item_id).first()
        if item:
            if cart:
                if cart.user_id == current_user.id:
                    cart_item = Cart_Item(
                        cart_id=cart_id,
                        item_id=item_id
                        )
                    db.session.add(cart_item)
                    db.session.commit()
                    return jsonify(cart.to_dict()), 200
                else:
                    return jsonify({'message': 'Users can only add items to their own cart'}), 403
            else:
                return jsonify({'message': 'Cart could not be found'}), 404
        else:
            return jsonify({'message': 'Item could not be found'}), 404

# delete item from cart & update cart status
@cart_routes.route('/<int:cart_id>/deleteItem/<int:item_id>', methods=['DELETE'])
@login_required
def delete_item_from_cart(cart_id, item_id):
    if request.method == 'DELETE':
        cart = Cart.query.filter(Cart.id == cart_id).first()
        item = Item.query.filter(Item.id == item_id).first()
        cart_item = Cart_Item.query.filter(Cart_Item.item_id == item.id, Cart_Item.cart_id == cart.id).first()
        if cart:
            if item:
                if cart_item:
                    if cart.user_id == current_user.id:
                        db.session.delete(cart_item)
                        db.session.commit()
                        return jsonify({'message': 'Successfully deleted', 'cart': cart.to_dict()}), 200
                    else:
                        return jsonify({'message': 'Users can only delete items in their own cart'}), 403
                else:
                    return jsonify({'message': 'Item is not in this cart'}), 403
            else:
                return jsonify({'message': 'Item could not be found'}), 404
        else:
            return jsonify({'message': 'Cart could not be found'}), 404
                
            
@cart_routes.route('/<int:cart_id>/update', methods=['PUT'])
@login_required
def update_cart_status(cart_id):
    if request.method == 'PUT':
        cart = Cart.query.filter(Cart.id == cart_id).first()
        if cart:
            if cart.user_id == current_user.id:
                cart.checked_out = True
                    # cart.updated_date = datetime.now()
                db.session.add(cart)
                db.session.commit()
                return jsonify(cart.to_dict()), 200
            else:
                return jsonify({'message': 'Users can only update their own cart'}), 403
        else:
            return jsonify({'message': 'Cart could not be found'}), 404

# delete entire cart       
@cart_routes.route('/<int:item_id>/delete', methods=['DELETE'])
@login_required
def delete_cart(cart_id):
        cart = Cart.query.filter(Cart.id == cart_id).first()
        if cart:
            if cart.user_id == current_user.id:
                db.session.delete(cart)
                db.session.commit()
                return jsonify({'message': 'Successfully deleted'}), 200
            else:
                return jsonify({'message': 'Users can only delete their own cart'}), 403
        else:
            return jsonify({'message': 'Cart could not be found'}), 404