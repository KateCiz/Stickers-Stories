import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSingleCart } from "../../store/carts";
import { csrfFetch } from "../../store/csrf";
import CartItem from "./CartItem";
import './index.css';

function CartPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedInUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
      dispatch(getSingleCart(loggedInUser?.current_cart?.id))
      setLoaded(true);
    }, [dispatch]);
    
    const current_cart = useSelector(state => state.cartState.currentCart);

    let CartTotal = 0;
    {loaded && current_cart?.Items?.map((item, i) => {
        return (
            CartTotal += item?.Item?.price
        )
    })}

    if (!loaded) {
        return null;
    }

    if(loaded && !loggedInUser){
        history.push('/')
    }

    const goToCheckout = (async () => {
        const res = await csrfFetch(`/api/carts/${current_cart?.id}/create_checkout`, {
            method: "POST",
        })
 
        const checkout_url = await res.json();
        window.location.replace(checkout_url.session_url);
    })
  
    return (
        <div className="cart-items-page">
            <div className="cart-items">
                {loaded && (current_cart?.Items?.length > 0) ? (current_cart?.Items?.map((item, i) => {
                    return (
                        <CartItem item={item?.Item}/>
                    );
                })) : (<p className="empty-cart" >Cart is sadly empty, let's go find some cool things to fill it!</p>)}
            </div>
            {loaded && (current_cart?.Items?.length > 0) && 
            <div className="cart-checkout-math">
                <p>Total</p>
                <p>${CartTotal.toFixed(2)}</p>
                <p>After Taxes</p>
                <p>${(CartTotal*1.1).toFixed(2)}</p>
                <button className="checkout-btn" onClick={goToCheckout}>Checkout</button>
            </div>}
        </div> 
    );
}

export default CartPage;