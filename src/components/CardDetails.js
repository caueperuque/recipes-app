import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CardDetails extends Component {
  render() {
    const {
      image,
      title,
      category,
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
          <p data-testid="instructions">{instructions}</p>
          { video && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ video }
              title={ title }
              // allowFullScreen
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
