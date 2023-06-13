import { GET_PATH, GET_URL } from '../actions/actionTypes';

const INITIAL_STATE = {
  path: '',
};

const pathReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_PATH:
    return {
      ...state,
      path: action.path,
    };
  case GET_URL:
    return {
      ...state,
      url: action.url,
    };
  default:
    return state;
  }
};

export default pathReducer;
