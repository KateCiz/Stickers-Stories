//all actions specific to Items Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_ITEMS = "GET_ALL_ITEMS";
const GET_USER_ITEMS = "GET_USER_ITEMS";
const GET_FEED = "GET_FEED";
const GET_ITEM_DETAILS = "GET_ITEM_DETAILS";
const CREATE_ITEM = "CREATE_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";

//ACTION CREATORS
const getItems = (items) => {
  return {
    type: GET_ALL_ITEMS,
    items,
  };
};

const getUserItems = (items) => {
  return {
    type: GET_USER_ITEMS,
    items,
  };
};

const getMyFeed = (items) => {
  return {
    type: GET_FEED,
    items,
  };
};

const getItemDetails = (item) => {
  return {
    type: GET_ITEM_DETAILS,
    item,
  };
};

const addItem = (item) => {
  return {
    type: CREATE_ITEM,
    item,
  };
};

const updateItem = (item) => {
  return {
    type: UPDATE_ITEM,
    item,
  };
};

const deleteItem = (itemId) => {
  return {
    type: DELETE_ITEM,
    itemId,
  };
};


//Thunks

//GET ALL ITEMS
export const getAllItems = () => async (dispatch) => {
  const res = await csrfFetch("/api/items/");

  if (res.ok) {
    const data = await res.json();
    dispatch(getItems(data.Items));
  }
  return res;
};

//GET User Items
export const userItems = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/profiles/${userId}/`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserItems(data.Items));
  }
};

//GET FEED
export const getProfileFeed = () => async (dispatch) => {
  const res = await csrfFetch("/api/feed/myfollows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getMyFeed(data.Items));
  }
};

//Get SINGLE ITEM
export const getSingleItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}`);

  if (res.ok) {
    const item = await res.json();
    dispatch(getItemDetails(item));
    return res;
  }
  return res;
};

//CREATE ITEM
export const createNewItem = (item) => async (dispatch) => {
  const { name, description, price, content, content_type, image_url } = item;

  const res = await csrfFetch("/api/items/", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      price,
      content,
      content_type,
      image_url
    }),
  });

  if (res.ok) {
    const newItem = await res.json();
    dispatch(addItem(newItem));
    return res;
  }
};

//UPDATE ITEM
export const editItem = (item, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });

  if (res.ok) {
    const updatedItem = await res.json();
    dispatch(updateItem(updatedItem));
    return res;
  }
};


//DELETE ITEM
export const deleteAnItem = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteItem(itemId));
  }
  return response;
};

const initialState = {};

//Items REDUCER
export default function itemReducer(state = initialState, action) {
  let newState = {...state };
  switch (action.type) {
    case GET_ALL_ITEMS:
      action.items.forEach((item) => newState[item.id] = item);
      // newState = [...action.items];
      return newState;
    case GET_USER_ITEMS:
      let userItems = {};
      action.items.forEach((item) => userItems[item.id] = item);
      // let userItems = [];
      // userItems = [...action.items];
      return userItems;
    case GET_FEED:
      let feed = {};
      action.items.forEach((item) => feed[item.id] = item);
      // let feed = [];
      // feed = [...action.items];
      return feed;
    case GET_ITEM_DETAILS:
      newState[action.item.id] = action.item;
      return newState;
    case CREATE_ITEM:
      newState[action.item.id] = action.item;
      return newState;
    case UPDATE_ITEM:
      newState[action.item.id] = action.item;
      return newState;
    case DELETE_ITEM:
      delete newState[action.itemId];
      return newState;
    default:
      return state;
  }
}
