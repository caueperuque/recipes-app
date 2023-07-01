import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';
import RecommendCard from '../components/RecommendCard';
import StartRecipe from '../components/StartRecipe';
import { actionGetPath, actionGetOnlyRecipe } from '../redux/actions';
import ShareRecipeBtn from '../components/ShareRecipeBtn';
import FavoriteRecipeBtn from '../components/FavoriteRecipeBtn';
import HeaderDetails from '../components/HeaderDetails';

class DrinkDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    console.log(pathname);
    const {
      match: { params: { id } },
    } = this.props;
    const $URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => this.setState({
        returnAPI: data.drinks,
      }));
    const $URL_API_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch($URL_API_MEALS)
      .then((response) => response.json())
      .then((data) => this.setState({
        recommendation: data.meals,
      }));
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { returnAPI } = this.state;
    dispatch(actionGetOnlyRecipe(returnAPI));
  }

  render() {
    const { returnAPI, recommendation } = this.state;
    const lengthString = 13;
    return (
      <div className="card__container-main">
        <HeaderDetails />
        { returnAPI && (
          <div>
            { returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                title={ recipe.strDrink }
                image={ recipe.strDrinkThumb }
                category={ recipe.strAlcoholic }
                instructions={ recipe.strInstructions }
              />
            )) }
            <ul>
              <h1>Ingredients</h1>
              {returnAPI.map((recipe) => {
                let counter = 0;

                return Object.entries(recipe).map(([key, value]) => {
                  if (key.includes('strIngredient') && value) {
                    const measureKey = `strMeasure${key.slice(lengthString)}`;
                    const measureValue = recipe[measureKey];

                    if (measureValue && measureValue !== ' ') {
                      const ingredientWithMeasure = `${value} - ${measureValue}`;

                      const testDataId = `${counter}-ingredient-name-and-measure`;

                      counter += 1;

                      return (
                        <li key={ key } data-testid={ testDataId }>
                          {ingredientWithMeasure}
                        </li>
                      );
                    }

                    const testDataId = `${counter}-ingredient-name-and-measure`;

                    counter += 1;

                    return (
                      <li key={ key } data-testid={ testDataId }>
                        {value}
                      </li>
                    );
                  }
                  return null;
                });
              })}
            </ul>
            <hr className="recipe__division" />
          </div>
        ) }
        { recommendation && (
          <RecommendCard cards={ recommendation } />
        ) }
        <StartRecipe />
        <div className="details__button">
          <ShareRecipeBtn />
          <FavoriteRecipeBtn />
        </div>
      </div>
    );
  }
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(DrinkDetails);
