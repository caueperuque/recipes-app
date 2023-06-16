import { GET_ONLY_RECIPE, GET_PATH, GET_RECIPES } from '../actions/actionTypes';

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
  case GET_ONLY_RECIPE:
    return {
      ...state,
      recipe: action.recipe,
    };
  default:
    return state;
  }
};

export default pathReducer;
