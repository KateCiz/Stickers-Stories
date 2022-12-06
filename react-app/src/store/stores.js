//all actions specific to Stores Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_STORES = "GET_ALL_STORES";
const GET_USER_STORES = "GET_USER_STORES";
const GET_FEED = "GET_FEED";
const GET_STORE_DETAILS = "GET_STORE_DETAILS";
const CREATE_STORE = "CREATE_STORE";
const UPDATE_STORE = "UPDATE_STORE";
const DELETE_STORE = "DELETE_STORE";

//ACTION CREATORS
const getStores = (stores) => {
  return {
    type: GET_ALL_STORES,
    stores,
  };
};

const getUserStores = (stores) => {
  return {
    type: GET_USER_STORES,
    stores,
  };
};

const getMyFeed = (stores) => {
  return {
    type: GET_FEED,
    stores,
  };
};

const getStoreDetails = (store) => {
  return {
    type: GET_STORE_DETAILS,
    store,
  };
};

const addStore = (store) => {
  return {
    type: CREATE_STORE,
    store,
  };
};

const updateStore = (store) => {
  return {
    type: UPDATE_STORE,
    store,
  };
};

const deleteStore = (storeId) => {
  return {
    type: DELETE_STORE,
    storeId,
  };
};


//Thunks

//GET ALL STORES
export const getAllStores = () => async (dispatch) => {
  const res = await csrfFetch("/api/stores/");

  if (res.ok) {
    const data = await res.json();
    dispatch(getStores(data.Stores));
  }
  return res;
};

//GET User Stores
export const userStores = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/profiles/${userId}/`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserStores(data.Stores));
  }
};

//GET FEED
export const getProfileFeed = () => async (dispatch) => {
  const res = await csrfFetch("/api/feed/myfollows");

  if (res.ok) {
    const data = await res.json();
    dispatch(getMyFeed(data.Stores));
  }
};

//Get SINGLE STORE
export const getSingleStore = (storeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stores/${storeId}`);

  if (res.ok) {
    const store = await res.json();
    dispatch(getStoreDetails(store));
    return res;
  }
  return res;
};

//CREATE STORE
export const createNewStore = (store) => async (dispatch) => {
  const { name, about, cover_image_url, profile_image_url } = store;

  const res = await csrfFetch("/api/stores/", {
    method: "POST",
    body: JSON.stringify({
      name,
      about,
      cover_image_url,
      profile_image_url
    }),
  });

  if (res.ok) {
    const newStore = await res.json();
    dispatch(addStore(newStore));
    return res;
  }
};

//UPDATE STORE
export const editStore = (store, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/stores/${id}`, {
    method: "PUT",
    body: JSON.stringify(store),
  });

  if (res.ok) {
    const updatedStore = await res.json();
    dispatch(updateStore(updatedStore));
    return res;
  }
};


//DELETE STORE
export const deleteAStore = (storeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stores/${storeId}`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (res.status === 200) {
    dispatch(deleteStore(storeId));
  }
  return response;
};

const initialState = {};

//Stores REDUCER
export default function storeReducer(state = initialState, action) {
  let newState = {...state };
  switch (action.type) {
    case GET_ALL_STORES:
      action.stores.forEach((store) => newState[store.id] = store);
      // newState = [...action.stores];
      return newState;
    case GET_USER_STORES:
      let userStores = {};
      action.stores.forEach((store) => userStores[store.id] = store);
      // let userStores = [];
      // userStores = [...action.stores];
      return userStores;
    case GET_FEED:
      let feed = {};
      action.stores.forEach((store) => feed[store.id] = store);
      // let feed = [];
      // feed = [...action.stores];
      return feed;
    case GET_STORE_DETAILS:
      newState[action.store.id] = action.store;
      return newState;
    case CREATE_STORE:
      newState[action.store.id] = action.store;
      return newState;
    case UPDATE_STORE:
      newState[action.store.id] = action.store;
      return newState;
    case DELETE_STORE:
      delete newState[action.storeId];
      return newState;
    default:
      return state;
  }
}
