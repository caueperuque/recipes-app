import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FavoriteRecipeBtn extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const { recipe } = this.props;
    // console.log(recipe);
    const arrayTeste = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const objRecipes = recipe.map((recipeInfo) => ({
      id: recipeInfo.idDrink || recipeInfo.idMeal,
      type: recipeInfo.idDrink ? 'drink' : 'meal',
      nationality: recipeInfo.strArea || '',
      category: recipeInfo.strCategory || '',
      alcoholicOrNot: recipeInfo.strAlcoholic || '',
      name: recipeInfo.strDrink || recipeInfo.strMeal,
      image: recipeInfo.strDrinkThumb || recipeInfo.strMealThumb,
    }));
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([...arrayTeste, ...objRecipes]));
  };

  render() {
    return (
      <div>
        <button data-testid="favorite-btn" onClick={ this.handleClick }>
          Favorite
        </button>
      </div>
    );
  }
}

FavoriteRecipeBtn.propTypes = {
  recipe: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    map: PropTypes.func,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  recipe: globalState.pathReducer.recipe,
});

export default connect(mapStateToProps)(FavoriteRecipeBtn);
