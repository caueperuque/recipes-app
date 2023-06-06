import { GET_PATH } from '../actions/actionTypes';

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
  default:
    return state;
  }
};

export default pathReducer;
