import { FETCH, AUTH, LOGOUT } from "../actions/ActionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    
    case FETCH:
      return action.payload;
      break;

    case AUTH:
      localStorage.setItem('profile', JSON.stringify({...action?.data}));

      return {...state, authData: action.data};
      break;
    case LOGOUT:
    
        localStorage.clear()
        return {...state, authData: null};

      return state;
      break;
    default:
      return state;
      break;
  }
};

export default authReducer;
