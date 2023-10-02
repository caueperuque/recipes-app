import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style/CardDetails.css';

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
      <div className="card__container-main">
        <div className="card__container-sub">
          <img
            src={ image }
            data-testid="recipe-photo"
            alt={ title }
            className="card__image"
          />
          <h4 data-testid="recipe-title">{ title }</h4>
          <p data-testid="recipe-category">{category}</p>
          <hr className="card__division" />
          <p data-testid="instructions" className="cardDetails__instructions">
            {instructions}
          </p>
          <hr className="card__division" />
          { video && (
            <>
              <iframe
                data-testid="video"
                width="300"
                height="300"
                src={ video && video.replace('watch?v=', 'embed/') }
                title={ title }
              />
              <hr className="card__division" />
            </>
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
