import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetPath } from '../redux/actions';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipes extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ recipes: doneRecipes });
  }

  render() {
    const { recipes } = this.state;
    return (
      <div>
        <Header />
        <button data-testid="filter-by-all-btn">
          All
        </button>
        <button data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button data-testid="filter-by-drink-btn">
          Drinks
        </button>
        { recipes && (
          <div>
            { recipes.map((recipe, index) => (
              <div key={ Math.random() }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                { recipe.nationality ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                ) : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.category}
                  </p>
                ) }
                <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                {
                  recipe.tags.slice(0, 2).map((tag) => (
                    <div key={ Math.random() }>
                      <p data-testid={ `${index}-${tag}-horizontal-tag` }>
                        {tag}
                      </p>
                    </div>
                  ))
                }
                {
                  recipe.alcoholicOrNot && (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.alcoholicOrNot }
                    </p>
                  )
                }
                <button data-testid={ `${index}-horizontal-share-btn` } src={ shareIcon }>
                  <img src={ shareIcon } alt="share" />
                </button>
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(DoneRecipes);
