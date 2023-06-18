import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actionGetPath } from '../redux/actions';
import Footer from '../components/Footer';
import '../index.css';
import Header from '../components/Header';

class Recipes extends Component {
  state = {
    recipesArray: [],
    categories: [],
    showRecipes: false,
    selectedValue: '',
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    this.recipesGenerate();
    this.fetchCategoriesAPI();
  }

  componentDidUpdate(prevProps) {
    const { recipes } = this.props;
    const { showRecipes } = this.state;
    if (recipes === null && !showRecipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (recipes !== prevProps.recipes && recipes.length === 1 && !showRecipes) {
      const { idMeal, idDrink } = recipes[0];
      const recipeId = idMeal || idDrink;
      const { history, path } = this.props;
      history.push(`${path}/${recipeId}`);
    } else if (recipes !== prevProps.recipes && recipes.length > 0 && !showRecipes) {
      this.setState({ showRecipes: true });
    }
  }

  fetchRecipesAPI = (url, pathname) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const key = pathname === '/meals' ? 'meals' : 'drinks';
        this.setState({
          recipesArray: data[key],
        });
      });
  };

  recipesGenerate = () => {
    const { history: { location: { pathname } } } = this.props;
    const url = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    this.fetchRecipesAPI(url, pathname);
  };

  fetchCategoriesAPI = () => {
    const { history: { location: { pathname } } } = this.props;
    const url = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const key = pathname === '/meals' ? 'meals' : 'drinks';
        this.setState({
          categories: data[key],
        });
      });
  };

  handleCategoryChange = ({ target }) => {
    const { history: { location: { pathname } } } = this.props;
    const { selectedValue } = this.state;
    const filterSelected = selectedValue === target.id ? '' : target.id;
    if (filterSelected === 'All' || filterSelected === '') {
      this.recipesGenerate();
    } else {
      const url = pathname === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterSelected}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filterSelected}`;
      this.fetchRecipesAPI(url, pathname);
    }
    this.setState({
      showRecipes: false,
      selectedValue: filterSelected,
    });
  };

  renderRecipes() {
    const { recipes, history: { location: { pathname } } } = this.props;
    const lastRecipePosition = 12;
    return (
      <div className="recipe__section">
        {recipes.slice(0, lastRecipePosition).map((recipe, index) => {
          const { idMeal,
            idDrink, strMeal, strDrink, strMealThumb, strDrinkThumb } = recipe;
          const recipeId = pathname === '/meals' ? idMeal : idDrink;
          const recipeName = pathname === '/meals' ? strMeal : strDrink;
          const recipeImg = pathname === '/meals' ? strMealThumb : strDrinkThumb;

          return (
            <div
              key={ recipeId }
              className="recipe__card"
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/${pathname}/${recipeId}` }>
                <img
                  src={ recipeImg }
                  alt={ recipeName }
                  data-testid={ `${index}-card-img` }
                  className="recipe__img"
                />
                <h4 data-testid={ `${index}-card-name` }>{recipeName}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const {
      recipesArray, categories,
      showRecipes, selectedValue } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const lastRecipePosition = 12;
    const lastCategoryPosition = 5;

    return (
      <main className="Main">
        <Header />
        <aside>
          <label htmlFor="All" data-testid="All-category-filter">
            <input
              type="checkbox"
              name="category"
              id="All"
              checked={ selectedValue === 'All' }
              onChange={ this.handleCategoryChange }
            />
            All
          </label>
          {categories
            .slice(0, lastCategoryPosition)
            .map(({ strCategory }, index) => (
              <label
                key={ index }
                htmlFor={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
              >
                <input
                  type="checkbox"
                  name="category"
                  id={ strCategory }
                  checked={ selectedValue === `${strCategory}` }
                  onChange={ this.handleCategoryChange }
                />
                {strCategory}
              </label>
            ))}
        </aside>
        <section className="recipes__content">
          {showRecipes ? (
            this.renderRecipes()
          ) : (
            <section className="recipe__section">
              {recipesArray
                && recipesArray
                  .slice(0, lastRecipePosition)
                  .map((recipe, index) => {
                    const {
                      idMeal,
                      strMealThumb,
                      strMeal,
                      idDrink,
                      strDrinkThumb,
                      strDrink,
                    } = recipe;
                    const recipeId = pathname === '/meals' ? idMeal : idDrink;
                    const recipeImg = (
                      pathname === '/meals' ? strMealThumb : strDrinkThumb);
                    const recipeName = pathname === '/meals' ? strMeal : strDrink;

                    return (
                      <div
                        className="recipe__card"
                        key={ index }
                        data-testid={ `${index}-recipe-card` }
                      >
                        <Link to={ `${pathname}/${recipeId}` }>
                          <img
                            src={ recipeImg }
                            alt={ recipeName }
                            data-testid={ `${index}-card-img` }
                            className="recipe__img"
                          />
                          <h4 data-testid={ `${index}-card-name` }>{recipeName}</h4>
                        </Link>
                      </div>
                    );
                  })}
            </section>
          )}
        </section>
        <div className="footer">
          <Footer />
        </div>
      </main>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
  dispatch: PropTypes.func,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  })),
}.isRequired;

const mapStateToProps = (globalState) => ({
  recipes: globalState.pathReducer.recipes,
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(Recipes);
