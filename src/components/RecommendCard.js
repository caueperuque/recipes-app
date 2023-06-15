import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RecommendCard extends Component {
  renderCard = () => {
    const { cards } = this.props;
    const maxLength = 6;

    return cards.slice(0, maxLength).map((card, index) => (
      <div
        key={ index }
        data-testid={ `${index}-recommendation-card` }
        className="recommendation-card"
      >
        <img
          src={ card.strMealThumb || card.strDrinkThumb }
          alt={ card.strMeal || card.strDrink }
          className="recommendation-img"
        />
        <Link
          to={ `/${card.strMeal ? `meals/${card.idMeal}` : `drinks/${card.idDrink}`}` }
        >
          <h3
            data-testid={ `${index}-recommendation-title` }
            className="recommendation-title"
          >
            {card.strMeal || card.strDrink}
          </h3>
        </Link>
      </div>
    ));
  };

  render() {
    return (
      <div className="recommendation-container">
        <div className="recommendation-scroll">
          {this.renderCard()}
        </div>
      </div>
    );
  }
}

RecommendCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      idMeal: PropTypes.string,
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
      idDrink: PropTypes.string,
      strDrink: PropTypes.string,
      strDrinkThumb: PropTypes.string,
    }),
  ).isRequired,
};

export default RecommendCard;
