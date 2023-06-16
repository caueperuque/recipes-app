import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import iconWhite from '../images/whiteHeartIcon.svg';
import iconBlack from '../images/blackHeartIcon.svg';

class FavoriteRecipeBtn extends Component {
  state = {
    iconHeart: iconWhite,
    isFavorite: false,
  };

  componentDidUpdate(prevProps) {
    const { path } = this.props;
    if (prevProps.path !== path) {
      // console.log(recipe[0].idMeal);
      const id = path.split('/')[2];
      const saveRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      this.setState({
        isFavorite: saveRecipes.some((frecipe) => frecipe.id === id),
      }, () => this
        .setState(({ isFavorite }) => ({
          iconHeart: isFavorite ? iconBlack : iconWhite,
        })));
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { iconHeart, isFavorite } = this.state;
    const { recipe } = this.props;
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
    if (isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(arrayTeste.filter((frecipe) => frecipe.id !== objRecipes[0].id)));
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...arrayTeste, ...objRecipes]));
    }
    this.setState({
      iconHeart: iconHeart === iconWhite ? iconBlack : iconWhite,
      isFavorite: !isFavorite,
    });
  };

  render() {
    const { iconHeart } = this.state;
    return (
      <div>
        <button data-testid="favorite-btn" onClick={ this.handleClick } src={ iconHeart }>
          <img src={ iconHeart } alt="favorite icon" />
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
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(FavoriteRecipeBtn);
