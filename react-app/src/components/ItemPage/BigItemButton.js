import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getSingleCart } from "../../store/carts";
import { getSingleItem } from "../../store/items";
import * as sessionActions from '../../store/session';

function BigItemButton({ item, id }){
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedInUser = useSelector(state => state.session.user);
    const current_cart = useSelector(state => state.cartState.currentCart);

    let ItemButton;

    if(loggedInUser?.store_id === item?.Store?.id){ 
        ItemButton =
            <NavLink className="edit-item-btn" to={`/edit-item/${id}`}>
                Edit Item
            </NavLink>
    } else if(loggedInUser) {
        if(current_cart?.Items?.filter(cart_item => cart_item?.Item?.id === item?.id).length > 0){ 
            ItemButton = <button className="item-cart-btn" onClick={() => {history.push(`/carts/${current_cart?.id}`)}}>
                Head to Checkout
            </button>
        }
        else { 
            const cart_id = current_cart?.id;
            ItemButton = <button  className="item-cart-btn" onClick={async () => await dispatch(addToCart(cart_id, id)).then(dispatch(getSingleItem(id)))}>
                Add to Cart
            </button>
        }
    }

return (
    <>
        {ItemButton}
    </>
)
}

export default BigItemButton;