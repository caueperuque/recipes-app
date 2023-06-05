import { USER_LOGIN } from '../actions/actionTypes';

// initial state
const INITIAL_STATE_LOGIN = {
  email: '',
};

const userReducer = (state = INITIAL_STATE_LOGIN, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      email: action.email,
      password: action.password,
    };
  }
  default: return state;
  }
};

export default userReducer;
