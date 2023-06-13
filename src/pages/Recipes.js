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
    if (recipes !== prevProps.recipes && recipes.length === 1 && !showRecipes) {
      const { idMeal, idDrink } = recipes[0];
      const recipeId = idMeal || idDrink;
      const { history } = this.props;
      history.push(`/drinks/${recipeId}`);
    } else if (recipes !== prevProps.recipes && recipes.length > 0 && !showRecipes) {
      this.setState({ showRecipes: true });
    }
  }

  fetchRecipesAPI = (url, pathname) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const key = pathname === '/meals' ? 'meals' : 'drinks'; // Atualize essa linha
        this.setState({
          recipesArray: data[key],
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  recipesGenerate = () => {
    const { history: { location: { pathname } } } = this.props;
    const url = pathname === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/random.php'
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  handleCategoryChange = ({ target: { id } }) => {
    const { history: { location: { pathname } } } = this.props;
    const url = pathname === '/meals'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
    this.setState({ showRecipes: false });
    this.fetchRecipesAPI(url, pathname);
  };

  renderRecipes() {
    const { recipes, history: { location: { pathname } } } = this.props;

    return (
      <div>
        {recipes.map((recipe, index) => {
          const { idMeal,
            idDrink, strMeal, strDrink, strMealThumb, strDrinkThumb } = recipe;
          const recipeId = pathname === '/meals' ? idMeal : idDrink;
          const recipeName = pathname === '/meals' ? strMeal : strDrink;
          const recipeImg = pathname === '/meals' ? strMealThumb : strDrinkThumb;

          return (
            <div key={ recipeId } className="recipe__card">
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
    const { recipesArray, categories, showRecipes } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const lastRecipePosition = 12;
    const lastCategoryPosition = 5;

    return (
      <main className="Main">
        <Header />
        <aside>
          <label htmlFor="All" data-testid="All-category-filter">
            <input
              type="radio"
              name="categories"
              id="All"
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
                  type="radio"
                  name="categories"
                  id={ strCategory }
                  onChange={ this.handleCategoryChange }
                />
                {strCategory}
              </label>
            ))}
        </aside>
        {showRecipes ? (
          this.renderRecipes()
        ) : (
          <section className="recipes__content">
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
          </section>
        )}
        <Footer />
      </main>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (globalState) => ({
  recipes: globalState.pathReducer.recipes,
});

export default connect(mapStateToProps)(Recipes);
