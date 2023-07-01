import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class FinishBtn extends Component {
  handleClick = () => {
    const { recipe } = this.props;
    console.log(recipe);

    const prevRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const currentDate = new Date();
    // const currentDay = currentDate.getDate();
    // const currentMonth = currentDate.getMonth() + 1;
    // const currentYear = currentDate.getFullYear();

    const objRecipe = recipe.map((recipeInfo) => ({
      id: recipeInfo.idDrink || recipeInfo.idMeal,
      nationality: recipeInfo.strArea || '',
      name: recipeInfo.strDrink || recipeInfo.strMeal,
      category: recipeInfo.strCategory || '',
      image: recipeInfo.strDrinkThumb || recipeInfo.strMealThumb,
      tags: recipeInfo.strTags ? recipeInfo.strTags.split(',').filter(Boolean) : [],
      alcoholicOrNot: recipeInfo.strAlcoholic || '',
      type: recipeInfo.idDrink ? 'drink' : 'meal',
      doneDate: currentDate.toISOString(),
    }));

    localStorage.setItem('doneRecipes', JSON.stringify([...prevRecipes, ...objRecipe]));
  };

  render() {
    const { isDisabled } = this.props;
    return (
      <div>
        <Link to="/done-recipes">
          <button
            className="btn btn-info button__SoF"
            data-testid="finish-recipe-btn"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Finish Recipe
          </button>
        </Link>
      </div>
    );
  }
}

FinishBtn.propTypes = {
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
  nationality: PropTypes.string,
  recipe: PropTypes.shape({
    map: PropTypes.func,
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  recipe: globalState.pathReducer.recipe,
});

export default connect(mapStateToProps)(FinishBtn);
