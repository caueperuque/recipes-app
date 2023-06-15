import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardDetails from '../components/CardDetails';
import RecommendCard from '../components/RecommendCard';
import StartRecipe from '../components/StartRecipe';

class DrinkDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
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

  render() {
    const { returnAPI, recommendation } = this.state;
    const lengthString = 13;
    // console.log(recommendation);
    return (
      <div>
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
          </div>
        ) }
        { recommendation && (
          <RecommendCard cards={ recommendation } />
        ) }
        <StartRecipe />
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

export default DrinkDetails;
