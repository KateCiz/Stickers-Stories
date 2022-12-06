const GET_USER_INFO = 'GET_USER_INFO';

const userInfo = (user_info) => {
    return {
      type: GET_USER_INFO,
      user_info
    };
  };


export const getUserInfo = (userId) => async(dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
 
     if(res.ok){
       const info = await res.json();
       dispatch(userInfo(info));
     }
};

const initialState = {};

export default function userReducer(state = initialState, action){
    let user = {...state}
    switch(action.type){
        case GET_USER_INFO:
        user = action.user_info
        return user
    default:
        return state
    };

};