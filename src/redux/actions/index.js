import { USER_LOGIN } from './actionTypes';

// export const userEmail = (email) => ({
//   type: USER_LOGIN,
//   payload: email,
// });

export const userLogin = ({ email, password }) => ({
  type: USER_LOGIN,
  email,
  password,
});
