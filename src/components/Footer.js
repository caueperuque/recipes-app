import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <div data-testid="footer">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/meals">
          <img
            src={ mealIcon }
            alt="Meal Icon"
            data-testid="meals-bottom-btn"
          />
        </Link>
      </div>
    );
  }
}

export default connect()(Footer);
