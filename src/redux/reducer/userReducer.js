import {} from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case ADD_EMAIL:
  //   return { ...state };
  default:
    return state;
  }
};

export default userReducer;
