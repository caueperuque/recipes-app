import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetPath } from '../redux/actions';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class DoneRecipes extends Component {
  state = {
    recipes: [],
    linkCopied: {},
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch, path } = this.props;
    dispatch(actionGetPath(pathname));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ recipes: doneRecipes });
    console.log(path);
  }

  render() {
    const { recipes, linkCopied } = this.state;
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
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => {
                    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                    this.setState({ linkCopied: { ...linkCopied, [index]: true } });
                  } }
                >
                  <img src={ shareIcon } alt="share" />
                </button>
                {linkCopied[index] && (
                  <p>Link copied!</p>
                )}
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

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(DoneRecipes);
