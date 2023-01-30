from flask import Blueprint, jsonify, request, redirect, abort, make_response
from flask_login import login_required, current_user
from app.models import db, Cart, Item, User, Cart_Item
from sqlalchemy.orm import joinedload
from datetime import datetime
import json
import stripe

stripe.api_key = "sk_test_51M3OooDVmTpUEfT54GvKtvkNLNaX0QyPedQUyKB9Of80VkJZ2FxjULYiavwafiCQSyljIbHBdyXZeot7Z7W5zlEM00RNC2jZz9"

cart_routes = Blueprint('carts', __name__)

# create a cart
@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart():
    if current_user:
        cart = Cart(
            user_id=current_user.id,
            checked_out=False
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
    cart = Cart.query.filter(Cart.id == cart_id).first()
    if cart:
        if cart.user_id == current_user.id:
            if not cart.checkout_session_id == None:
                session = stripe.checkout.Session.retrieve(cart.checkout_session_id)
                # print('SESSION SESSION SESSION OBJ Status After useing dumb code', session)
                if not session['payment_intent'] == None:
                    payment_intent_object = stripe.PaymentIntent.retrieve(session['payment_intent'])
                    if payment_intent_object['status'] == 'succeeded':
                        print('CART 1 CART 1 CART 1 CART 1 CART 1 CART 1', cart)
                        cart.checked_out=True
                        print('CART 2 CART 2 CART 2 CART 2 CART 2 CART 2', cart)
                        db.session.add(cart)
                        print('CART 3 CART 3 CART 3 CART 3 CART 3 CART 3', jsonify(cart.to_dict()))
                        db.session.commit()
                        cart_obj = cart.to_dict()
                        print('CART 4 CART 4 CART 4 CART 4 CART 4 CART 4', cart_obj)
                        return make_response(jsonify({"status": "ok", "data": cart_obj}), 200)
                    else: 
                        return jsonify({'message': 'Carts can only be updated if they have been paid for'}), 403
                else: 
                    return jsonify({'message': 'Carts can only be updated if they have been paid for'}), 403
            else: 
                return jsonify({'message': 'Carts can only be updated if they have been checked out'}), 403
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

#create checkout session
TEST_DOMAIN = 'http://localhost:3000/'

TEST_ERROR_DOMAIN = 'http://localhost:3000/items/2'

stripe.api_key = 'sk_test_51M3OooDVmTpUEfT54GvKtvkNLNaX0QyPedQUyKB9Of80VkJZ2FxjULYiavwafiCQSyljIbHBdyXZeot7Z7W5zlEM00RNC2jZz9'

@cart_routes.route('/<int:cart_id>/create_checkout', methods=['POST'])
@login_required
def create_checkout_session(cart_id):
    cart = Cart.query.filter(Cart.id == cart_id).first()
    if cart:
        if cart.user_id == current_user.id:
            cart_obj = cart.checkout_cart_to_dict()
            cart_items = [item['Item'] for item in cart_obj['Items']]
    
            checkout_session = stripe.checkout.Session.create(
                line_items = cart_items,
                mode='payment',
                success_url=TEST_DOMAIN,
                cancel_url=TEST_ERROR_DOMAIN
            )

            cart.checkout_session_id=checkout_session.id
            # print('IDIDIDIDIDIDIDIDIDIDIDIDIDIDIDIDIDIDIDIDID', checkout_session.id)
            db.session.add(cart)
            db.session.commit()
            # print('CHECKOUT CHECKOUT CHECKOUT OBJ', checkout_session)
            return jsonify({'session_url': checkout_session.url}), 200
        else: 
            return jsonify({'message': 'Users can only checkout with their own cart'}), 403 
    else:
        return jsonify({'message': 'Cart could not be found'}), 404