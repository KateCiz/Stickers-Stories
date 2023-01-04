import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteFromCart, getSingleCart } from "../../store/carts";

function CartItem({ item }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartId } = useParams();

    return (
        <div className="cart-item-container">
          <div
            className="cart-item-img-container"
            style={{ backgroundImage: `url('${item?.image_url}')` }}
          ></div>
          <div className="cart-item-info">
                <p className="cart-item-name-text">{item?.name}</p>
                <p className="cart-item-store-text">{item?.Store?.name}</p>
                <p className="cart-item-price-container">${item?.price}</p>
                <button className="delete-cart-item-btn" onClick={async () => await dispatch(deleteFromCart(cartId, item?.id)).then(() => {dispatch(getSingleCart(cartId))})}>Delete from cart</button>
            </div>
        </div>
      );
}

export default CartItem;