import { GET_PATH, GET_RECIPES } from '../actions/actionTypes';

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
  case GET_RECIPES:
    return {
      ...state,
      recipes: action.recipes,
    };
  default:
    return state;
  }
};

export default pathReducer;
