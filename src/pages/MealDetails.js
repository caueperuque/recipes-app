import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardDetails from '../components/CardDetails';

class MealDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const $URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => this.setState({
        returnAPI: data.meals,
      }));
  }

  render() {
    const { returnAPI } = this.state;
    const lengthString = 13;

    return (
      <div>
        {returnAPI && (
          <div>
            {returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                title={ recipe.strMeal }
                image={ recipe.strMealThumb }
                category={ recipe.strCategory }
                instructions={ recipe.strInstructions }
                video={ recipe.strYoutube }
              />
            ))}
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
        )}
      </div>
    );
  }
}

MealDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect()(MealDetails);
