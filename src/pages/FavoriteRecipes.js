import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { actionGetPath } from '../redux/actions';
import shareIcon from '../images/shareIcon.svg';
import iconWhite from '../images/whiteHeartIcon.svg';
import iconBlack from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

class FavoriteRecipes extends Component {
  state = {
    recipes: [],
    linkCopied: {},
    filter: 'all',
    iconHeart: iconWhite,
    // isFavorite: false,
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch, path } = this.props;
    dispatch(actionGetPath(pathname));
    const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    this.setState({ recipes: doneRecipes });
    console.log(path);
  }

  componentDidUpdate(prevProps) {
    const { path } = this.props;
    if (prevProps.path !== path) {
      // console.log(recipe[0].idMeal);
      const id = path.split('/')[2];
      const saveRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      this.setState({
        isFavorite: saveRecipes.some((frecipe) => frecipe.id === id),
      }, () => this
        .setState(({ isFavorite }) => ({
          iconHeart: isFavorite ? iconBlack : iconWhite,
        })));
    }
  }

  handleFilter = (value) => {
    this.setState({ filter: value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { iconHeart, isFavorite } = this.state;
    const { recipes } = this.state;
    const arrayTeste = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const objRecipes = recipes.map((recipeInfo) => ({
      id: recipeInfo.id,
      type: recipeInfo.type,
      nationality: recipeInfo.nationality || '',
      category: recipeInfo.category || '',
      alcoholicOrNot: recipeInfo.alcoholicOrNot || '',
      name: recipeInfo.name,
      image: recipeInfo.image,
    })) || [];
    if (isFavorite) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify(arrayTeste.filter((frecipe) => frecipe.id !== objRecipes[0].id)));
    } else {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...arrayTeste, ...objRecipes]));
    }
    this.setState({
      iconHeart: iconHeart === iconWhite ? iconBlack : iconWhite,
      isFavorite: !isFavorite,
    });
  };

  render() {
    const { recipes, linkCopied, filter, iconHeart } = this.state;
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
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ this.handleClick }
                  src={ iconHeart }
                >
                  <img src={ iconHeart } alt="favorite icon" />
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

const mapStateToProps = (globalState) => ({
  recipe: globalState.pathReducer.recipe,
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(FavoriteRecipes);
