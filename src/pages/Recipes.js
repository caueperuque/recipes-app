import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { actionGetPath } from '../redux/actions';
import Footer from '../components/Footer';
import '../index.css';

class Recipes extends Component {
  state = {
    recipesArray: [],
    categories: [],
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    this.recipesGenerate();
    this.fetchCategoriesAPI();
  }

  fetchRecipesAPI = (url, pathname) => {
    // tem que pegar a url do global state para completar esse código
    if (pathname === '/meals') {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            recipesArray: data.meals,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    if (pathname === '/drinks') {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            recipesArray: data.drinks,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  recipesGenerate = () => {
    const { history: { location: { pathname } } } = this.props;
    let url = '';
    if (pathname === '/meals') {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c';
    } else if (pathname === '/drinks') {
      url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
    }
    this.fetchRecipesAPI(url, pathname);
  };

  fetchCategoriesAPI = () => {
    const { history: { location: { pathname } } } = this.props;
    if (pathname === '/meals') {
      fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            categories: data.meals,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    if (pathname === '/drinks') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            categories: data.drinks,
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  handleCategoryChange = ({ target: { id } }) => {
    const { history: { location: { pathname } } } = this.props;
    let url = '';
    if (pathname === '/meals') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
    }
    if (pathname === '/drinks') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
    }
    this.fetchRecipesAPI(url, pathname);
  };

  render() {
    const { recipesArray, categories } = this.state;
    const { history: { location: { pathname } } } = this.props;
    const lastRecipePosition = 12;
    const lastCategoryPosition = 5;
    return (
      <main className="Main">
        <section className="recipes__content">
          <aside>
            <label
              htmlFor="All"
              data-testid="All-category-filter"
            >
              <input
                type="radio"
                name="categories"
                id="All"
                onChange={ this.handleCategoryChange }
              />
              All
            </label>
            {
              categories.slice(0, lastCategoryPosition).map(({ strCategory }, index) => (
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
              ))
            }
          </aside>
          {pathname === '/meals' ? (
            <section className="recipe__section">
              { recipesArray && recipesArray.slice(0, lastRecipePosition)
                .map((recipe, index) => {
                  const { idMeal, strMealThumb, strMeal } = recipe;
                  return (
                    <div
                      className="recipe__card"
                      key={ index }
                      data-testid={ `${index}-recipe-card` }
                    >
                      <Link to={ `/meals/${idMeal}` }>
                        <img
                          src={ strMealThumb }
                          alt={ strMeal }
                          data-testid={ `${index}-card-img` }
                          className="recipe__img"
                        />
                        <h4
                          data-testid={ `${index}-card-name` }
                        >
                          { strMeal }
                        </h4>
                      </Link>
                    </div>
                  );
                })}
            </section>
          ) : (
            <section className="recipe__section">
              { recipesArray && recipesArray.slice(0, lastRecipePosition)
                .map((recipe, index) => {
                  const { idDrink, strDrinkThumb, strDrink } = recipe;
                  return (
                    <div
                      className="recipe__card"
                      key={ index }
                      data-testid={ `${index}-recipe-card` }
                    >
                      <Link to={ `/drinks/${idDrink}` }>
                        <img
                          src={ strDrinkThumb }
                          alt={ strDrink }
                          data-testid={ `${index}-card-img` }
                          className="recipe__img"
                        />
                        <h4
                          data-testid={ `${index}-card-name` }
                        >
                          { strDrink }
                        </h4>
                      </Link>
                    </div>
                  );
                })}
            </section>
          )}
        </section>
        <Footer />
      </main>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Recipes);
