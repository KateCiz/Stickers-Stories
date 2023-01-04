//all actions specific to CARTS Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_USER_CARTS = "GET_USER_CARTS";
const GET_CART_DETAILS = "GET_CART_DETAILS";
const CREATE_CART = "CREATE_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_CART = "DELETE_CART";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART"

//ACTION CREATORS
const getUserCarts = (carts) => {
  return {
    type: GET_USER_CARTS,
    carts,
  };
};

const getCartDetails = (cart) => {
  return {
    type: GET_CART_DETAILS,
    cart,
  };
};

const addCart = (cart) => {
  return {
    type: CREATE_CART,
    cart,
  };
};

const addItemToCart = (cart) => {
  return {
    type: ADD_ITEM_TO_CART,
    cart
  };
};

const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

const deleteCart = (cartId) => {
  return {
    type: DELETE_CART,
    cartId,
  };
};

const deleteItemFromCart = (cart) => {
  return {
    type: DELETE_ITEM_FROM_CART,
    cart,
  };
};


//Thunks

// //GET User Carts
// export const userCarts = (userId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/profiles/${userId}/`);

//   if (res.ok) {
//     const data = await res.json();
//     dispatch(getUserCarts(data.Carts));
//   }
// };

//Get SINGLE Cart
export const getSingleCart = (cartId) => async (dispatch) => {
  const res = await csrfFetch(`/api/carts/${cartId}`);

  if (res.ok) {
    const cart = await res.json();
    dispatch(getCartDetails(cart));
    return res;
  }
  return res;
};

//CREATE CART
export const createNewCart = () => async (dispatch) => {
  const res = await csrfFetch("/api/carts/", {
    method: "POST",
    body: JSON.stringify({
      checkout: false
    }),
  });

  if (res.ok) {
    const newCart = await res.json();
    dispatch(addCart(newCart));
    return res;
  }
};

//ADD TO CART
export const addToCart = (cart_id, item_id) => async (dispatch) => {
  const res = await csrfFetch(`/api/carts/${cart_id}/add_item/${item_id}`, {
    method: "POST",
    body: JSON.stringify(cart_id, item_id),
  });

  if (res.ok) {
    const newCart = await res.json();
    dispatch(addItemToCart(newCart));
    return res;
  }
};

//UPDATE CART
export const editCart = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/carts/${id}/update`, {
    method: "PUT"
  });

  if (res.ok) {
    const updatedCart = await res.json();
    dispatch(updateCart(updatedCart));
    return res;
  }
};


//DELETE CART
export const deleteACart = (cartId) => async (dispatch) => {
  const res = await csrfFetch(`/api/carts/${cartId}/delete`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteCart(cartId));
  }
  return response;
};

//DELETE ITEM FROM CART
export const deleteFromCart = (cart_id, item_id) => async (dispatch) => {
  const res = await csrfFetch(`/api/carts/${cart_id}/deleteItem/${item_id}`, {
    method: "DELETE",
    // body: JSON.stringify({
    //   cart_id, 
    //   item_id
    // }),
  });

  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteItemFromCart(response.cart));
  }
  return response;
};




const initialState = {carts: null, currentCart: null};

//Carts REDUCER
export default function cartReducer(state = initialState, action) {
  let newState = {...state };
  switch (action.type) {
    // case GET_USER_CARTS:
    //   let userCarts = {};
    //   action.carts.forEach((cart) => userCarts[cart.id] = cart);
    //   // let userCarts = [];
    //   // userCarts = [...action.carts];
    //   return userCarts;
    case GET_CART_DETAILS:
      newState.currentCart = {...action.cart}
      return newState;
    case CREATE_CART:
      newState.carts[action.cart.id] = {...action.cart};
      return newState;
    case ADD_ITEM_TO_CART:
      newState.currentCart = {...action.cart}
      // newState.cart[action.cart.id] = action.cart;
      return newState;
    case UPDATE_CART:
      newState.currentCart = {...action.cart}
      newState.cart[action.cart.id] = {...action.cart};
      return newState;
    case DELETE_CART:
      delete newState.cart[action.cartId];
      return newState;
    case DELETE_ITEM_FROM_CART:
      // newState.cart[action.cart.id] = {...action.cart};
      newState.currentCart[action.cart.id] = action.cart;
      return newState;
    default:
      return state;
  }
}
