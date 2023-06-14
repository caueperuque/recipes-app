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

    return (
      <div>
        { returnAPI && (
          <div>
            { returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                title={ recipe.strMeal }
                image={ recipe.strMealThumb }
                category={ recipe.strCategory }
                instructions={ recipe.strInstructions }
                video={ recipe.strYoutube }
              />
            )) }
            <ul>
              { returnAPI.map((recipe) => (
                Object.entries(recipe).map(([key, value], index) => {
                  if (key.includes('strIngredient') && value && value.trim() !== '') {
                    return (
                      <li
                        key={ key }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { value }
                      </li>
                    );
                  }
                  return null;
                })
              )) }
            </ul>
            <ul>
              { returnAPI.map((recipe) => (
                Object.entries(recipe).map(([key, value], index) => {
                  if (key.includes('strMeasure') && value && value.trim() !== '') {
                    return (
                      <li
                        key={ key }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { value }
                      </li>
                    );
                  }
                  return null;
                })
              )) }
            </ul>
          </div>
        ) }

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
