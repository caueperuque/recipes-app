import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionIsInProgress } from '../redux/actions';

class StartRecipe extends Component {
  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(actionIsInProgress(true));
  };

  render() {
    return (
      <div className="container__button">
        <button
          data-testid="start-recipe-btn"
          className="startrecipe__button"
          onClick={ this.handleClick }
          id="recipe__continue-button"
        >
          Continue Recipe
        </button>
        <button
          data-testid="start-recipe-btn"
          className="startrecipe__button"
          onClick={ this.handleClick }
        >
          Start Recipe
        </button>
      </div>
    );
  }
}

StartRecipe.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(StartRecipe);
