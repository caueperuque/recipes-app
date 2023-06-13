import { GET_PATH, GET_RECIPES } from './actionTypes';

export const actionGetPath = (path) => ({
  type: GET_PATH,
  path,
});

export const actionGetRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});
