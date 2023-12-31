import { GET_ONLY_RECIPE, GET_PATH, GET_RECIPES, IS_IN_PROGESS } from './actionTypes';

export const actionGetPath = (path) => ({
  type: GET_PATH,
  path,
});

export const actionGetRecipes = (recipes) => ({
  type: GET_RECIPES,
  recipes,
});

export const actionIsInProgress = (progress) => ({
  type: IS_IN_PROGESS,
  progress,
});

export const actionGetOnlyRecipe = (recipe) => ({
  type: GET_ONLY_RECIPE,
  recipe,
});
