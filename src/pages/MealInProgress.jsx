import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';
import FavoriteRecipeBtn from '../components/FavoriteRecipeBtn';
import ShareRecipeBtn from '../components/ShareRecipeBtn';
import { actionGetPath, actionGetOnlyRecipe } from '../redux/actions';
import FinishBtn from '../components/FinishBtn';

class MealInProgress extends Component {
  state = {
    returnAPI: null,
    checkedIngredients: {},
    allIngredientsChecked: false,
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    const { match: { params: { id } } } = this.props;
    const $URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          returnAPI: data.meals,
          checkedIngredients: this.loadCheckedIngredients(id),
        });
      })
      .catch((error) => {
        console.log('Erro ao carregar os dados:', error);
      });
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { returnAPI } = this.state;
    dispatch(actionGetOnlyRecipe(returnAPI));

    const { match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      this.setState({
        checkedIngredients: this.loadCheckedIngredients(id),
      });
    }
  }

  handleChange = (index) => {
    this.setState(
      (prevState) => {
        const { checkedIngredients } = prevState;
        const isChecked = checkedIngredients[index] || false;
        const updatedIngredients = {
          ...checkedIngredients,
          [index]: !isChecked,
        };
        this.saveCheckedIngredients(updatedIngredients);
        return {
          checkedIngredients: updatedIngredients,
        };
      },
      () => {
        this.checkAllIngredients();
      },
    );
  };

  checkAllIngredients = () => {
    const { checkedIngredients } = this.state;
    const { returnAPI } = this.state;
    if (returnAPI) {
      const totalIngredients = returnAPI.reduce((count, recipe) => {
        Object.entries(recipe).forEach(([key]) => {
          if (key.includes('strIngredient') && recipe[key]) {
            count += 1;
          }
        });
        return count;
      }, 0);
      const checkedCount = Object.values(checkedIngredients)
        .filter((isChecked) => isChecked).length;
      const allChecked = totalIngredients === checkedCount;
      this.setState({ allIngredientsChecked: allChecked });
    }
  };

  loadCheckedIngredients = (recipeId) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (
      inProgressRecipes
      && inProgressRecipes.meals
      && inProgressRecipes.meals[recipeId]
    ) {
      return inProgressRecipes.meals[recipeId].reduce((acc, ingredient) => {
        acc[ingredient] = true;
        return acc;
      }, {});
    }
    return {};
  };

  saveCheckedIngredients = (ingredients) => {
    const { match: { params: { id } } } = this.props;
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    inProgressRecipes.meals = inProgressRecipes.meals || {};
    inProgressRecipes.meals[id] = Object.keys(ingredients)
      .filter((key) => ingredients[key]);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  render() {
    const { returnAPI, checkedIngredients, allIngredientsChecked } = this.state;
    return (
      <div>
        {returnAPI ? (
          <>
            {returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                image={ recipe.strMealThumb }
                title={ recipe.strMeal }
                category={ recipe.strCategory }
                instructions={ recipe.strInstructions }
              />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
        {returnAPI
          && returnAPI.map((recipe) => {
            let counter = 0;

            return Object.entries(recipe).map(([key, value]) => {
              if (key.includes('strIngredient') && value) {
                const ingredientKey = key;
                const measureKey = `strMeasure${ingredientKey
                  .slice('strIngredient'.length)}`;
                const ingredient = value;
                const measure = recipe[measureKey];
                const index = counter;

                const testDataId = `${counter}-ingredient-step`;

                counter += 1;

                const isChecked = checkedIngredients[index] || false;

                return (
                  <div key={ key }>
                    <label
                      data-testid={ testDataId }
                      className={ isChecked ? 'checked' : '' }
                    >
                      {ingredient}
                      -
                      {measure}
                      <input
                        type="checkbox"
                        checked={ isChecked }
                        onClick={ () => this.handleChange(index) }
                      />
                    </label>
                  </div>
                );
              }
              return null;
            });
          })}
        <div className="details__button">
          <FavoriteRecipeBtn />
          <ShareRecipeBtn />
          <FinishBtn isDisabled={ !allIngredientsChecked } />
        </div>
      </div>
    );
  }
}

MealInProgress.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  recipe: globalState.pathReducer.recipe,
});

export default connect(mapStateToProps)(MealInProgress);
