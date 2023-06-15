import { IS_IN_PROGESS } from '../actions/actionTypes';

const INITIAL_STATE = {
  progress: false,
};

const inProgressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_IN_PROGESS:
    return {
      ...state,
      progress: action.progress,
    };
  default:
    return state;
  }
};

export default inProgressReducer;
