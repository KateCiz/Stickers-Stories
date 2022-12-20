//all actions specific to REVIEWS Resource

//imports
import { csrfFetch } from "./csrf";

//constants
const GET_ALL_STORE_REVIEWS = 'GET_ALL_STORE_REVIEWS';
const GET_ALL_ITEM_REVIEWS = 'GET_ALL_ITEM_REVIEWS';
const SINGLE_REVIEW = 'GET_SINGLE_REVIEW';
const CREATE_REVIEW = 'CREATE_REVIEW';
const UPDATE_REVIEW = 'UPDATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';


//ACTION CREATORS
const getStoreReviews = (reviews) => {
    return {
        type: GET_ALL_STORE_REVIEWS,
        reviews
    }
};

const getItemReviews = (reviews) => {
    return {
        type: GET_ALL_ITEM_REVIEWS,
        reviews
    }
};

const getSingleReview = (review) => {
    return {
        type: SINGLE_REVIEW,
        review
    };
};

const addReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review,
    }
};

const updateReview = (review, parentId) => {
    return {
        type: UPDATE_REVIEW,
        review,
        parentId
    }
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
};

//Thunks

    //GET ALL Item Reviews for an ITEM
export const getAllReviewsForItem = (itemId) => async (dispatch) => {
    const res = await csrfFetch(`/api/items/${itemId}/reviews`);
    if(res.ok){
        const data = await res.json();
        dispatch(getItemReviews(data.Reviews));
    }
    return res;
};

    //GET ALL Item Reviews for a STORE
export const getAllReviewsForStore = (store_id) => async (dispatch) => {
    const res = await csrfFetch(`/api/stores/${store_id}/reviews`);
    if(res.ok){
        const data = await res.json();
        dispatch(getStoreReviews(data.Reviews));
    }
    return res;
};



    //SINGLE REVIEW
export const getReview = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`)

    if(res.ok){
        const review =  await res.json();
        dispatch(getSingleReview(review))
    };
};

    //CREATE Review
export const createReview = (review) => async(dispatch) =>  {
    const {content, photo, star_rating} =  review;

    const res = await csrfFetch(`/api/items/${review.item_id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            content,
            photo,
            star_rating
        })
    });

    if(res.ok){
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return res
    }
};

    //UPDATE Review
export const editReview = (review, reviewId, parentId) => async(dispatch) =>  {
    const {content} = review;
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
          content
        }),
    });

    if(res.ok){
        const updatedReview = await res.json();
        dispatch(updateReview(updatedReview, parentId));
        return res
    }
};


    //DELETE Review
export const deleteAReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const response = await res.json();
    if(res.status === 200){
        dispatch(deleteReview(reviewId));
    }
    return response;
};


const initialState = {reviews: {}, replies: {}};

//Reviews REDUCER
export default function reviewsReducer(state = initialState, action){
    let newState = {...state}
    switch(action.type){
        case  GET_ALL_STORE_REVIEWS:
            newState = {}
            action.reviews.forEach((review) => newState[review.id] = review);
            return newState
        case  GET_ALL_ITEM_REVIEWS:
            action.reviews.forEach((review) => newState[review.id] = review);
            return newState
        case SINGLE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        case UPDATE_REVIEW:
            newState[action.review.id] = action.review;
            return  newState;
        case DELETE_REVIEW:
            delete newState[action.reviewId]
            return newState;
        default:
            return state;
        };
};
