import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { actionGetPath } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import FavoriteRecipeBtn from '../components/FavoriteRecipeBtn';

class FavoriteRecipes extends Component {
  state = {
    recipes: [],
    linkCopied: {},
    filter: 'all',
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch, path } = this.props;
    dispatch(actionGetPath(pathname));
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ recipes: doneRecipes });
    console.log(path);
  }

  handleFilter = (value) => {
    this.setState({ filter: value });
  };

  render() {
    const { recipes, linkCopied, filter } = this.state;
    let filteredRecipes = recipes;

    if (filter === 'meal') {
      filteredRecipes = recipes.filter((recipe) => recipe.type === 'meal');
    } else if (filter === 'drink') {
      filteredRecipes = recipes.filter((recipe) => recipe.type === 'drink');
    }

    return (
      <div>
        <Header />
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => this.handleFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => this.handleFilter('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => this.handleFilter('drink') }
        >
          Drinks
        </button>
        { recipes && (
          <div>
            { filteredRecipes.map((recipe, index) => (
              <div key={ Math.random() }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    width="100px"
                  />
                </Link>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
                </Link>
                { recipe.nationality ? (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>
                ) : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {recipe.category}
                  </p>
                ) }
                <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
                {/* {
                  recipe.tags.slice(0, 2).map((tag) => (
                    <div key={ Math.random() }>
                      <p data-testid={ `${index}-${tag}-horizontal-tag` }>
                        {tag}
                      </p>
                    </div>
                  ))
                } */}
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
                <button data-testid={ `${index}-horizontal-favorite-btn` }>
                  Favorite
                </button>
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(FavoriteRecipes);
