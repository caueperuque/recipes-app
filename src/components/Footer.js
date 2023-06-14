import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../index.css';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
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
      </footer>
    );
  }
}

export default connect()(Footer);
