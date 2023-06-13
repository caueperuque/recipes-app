import { GET_PATH, GET_URL } from './actionTypes';

export const actionGetPath = (path) => ({
  type: GET_PATH,
  path,
});

export const actionGetURL = (url) => ({
  type: GET_URL,
  url,
});
