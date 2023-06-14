import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CardDetails extends Component {
  render() {
    const {
      image,
      title,
      category,
      ingredients,
      instructions,
      video,
    } = this.props;
    return (
      <div>

        <div>
          <img
            src={ image }
            data-testid="recipe-photo"
            alt={ title }
          />
          <h4 data-testid="recipe-title">{ title }</h4>
          <p data-testid="recipe-category">{category}</p>
          <ul>
            { ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ Math.random() }
              >
                { ingredient }
              </li>
            )) }
          </ul>
          <p data-testid="instructions">{instructions}</p>
          { video && (
            <iframe
              width="560"
              height="315"
              src={ video }
              title={ title }
              allowfullscreen
            />
          ) }
        </div>
      </div>
    );
  }
}

CardDetails.propTypes = {
  category: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  ingredients: PropTypes.string,
  instructions: PropTypes.string,
  title: PropTypes.string,
  video: PropTypes.string,
}.isRequired;

export default CardDetails;
