import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';
import FavoriteRecipeBtn from '../components/FavoriteRecipeBtn';
import ShareRecipeBtn from '../components/ShareRecipeBtn';
import FinishBtn from '../components/FinishBtn';
import { actionGetPath, actionGetOnlyRecipe } from '../redux/actions';

class DrinkInProgress extends Component {
  state = {
    returnAPI: null,
    checkedIngredients: {},
    isDisable: true,
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    const {
      match: { params: { id } },
    } = this.props;
    const $URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => {
        const drinkInProgress = JSON
          .parse(localStorage.getItem('inProgressRecipes')) || {};
        const checkedIngredients = drinkInProgress.drinks?.[id] || [];

        const totalIngredients = data.drinks.reduce((count, recipe) => {
          let counter = count;
          Object.entries(recipe).forEach(([key]) => {
            if (key.includes('strIngredient') && recipe[key]) {
              counter += 1;
            }
          });
          return counter;
        }, 0);

        const isDisable = checkedIngredients
          .length !== totalIngredients || checkedIngredients.length === 0;

        this.setState({
          returnAPI: data.drinks,
          checkedIngredients: checkedIngredients.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
          }, {}),
          isDisable,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const { returnAPI } = this.state;
    dispatch(actionGetOnlyRecipe(returnAPI));

    const { match: { params: { id } } } = this.props;

    if (prevProps.match.params.id !== id) {
      const drinkInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
      const checkedIngredients = drinkInProgress.drinks?.[id] || [];

      this.setState({
        checkedIngredients: checkedIngredients.reduce((acc, curr) => {
          acc[curr] = true;
          return acc;
        }, {}),
      });
    }
  }

  handleChange = (index) => {
    this.setState((prevState) => {
      const { checkedIngredients } = prevState;
      const isChecked = checkedIngredients[index] || false;

      return {
        checkedIngredients: {
          ...checkedIngredients,
          [index]: !isChecked,
        },
      };
    }, this.saveCheckedIngredients);
  };

  saveCheckedIngredients = () => {
    const { match: { params: { id } } } = this.props;
    const { checkedIngredients } = this.state;

    const drinkInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    drinkInProgress.drinks = {
      ...drinkInProgress.drinks,
      [id]: Object.keys(checkedIngredients)
        .filter((key) => checkedIngredients[key])
        .map((key) => key.replace('ingredient-', '')),
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(drinkInProgress));

    const { returnAPI } = this.state;
    const totalIngredients = returnAPI.reduce((count, recipe) => {
      let counter = count;
      Object.entries(recipe).forEach(([key, value]) => {
        if (key.includes('strIngredient') && value) {
          counter += 1;
        }
      });
      return counter;
    }, 0);

    const savedIngredients = drinkInProgress.drinks?.[id]?.length || 0;
    const isDisable = savedIngredients !== totalIngredients;
    this.setState({ isDisable });
  };

  render() {
    const { returnAPI, checkedIngredients, isDisable } = this.state;

    return (
      <div>
        {returnAPI ? (
          <>
            {returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                image={ recipe.strDrinkThumb }
                title={ recipe.strDrink }
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

                return (
                  <div key={ key }>
                    <label
                      data-testid={ testDataId }
                      className={ checkedIngredients[index] ? 'checked' : '' }
                    >
                      {ingredient}
                      -
                      {measure}
                      <input
                        type="checkbox"
                        checked={ checkedIngredients[index] }
                        onChange={ () => this.handleChange(index) }
                      />
                    </label>
                  </div>
                );
              }

              return null;
            });
          })}

        <FavoriteRecipeBtn />
        <ShareRecipeBtn />
        <FinishBtn isDisabled={ isDisable } />
      </div>
    );
  }
}

DrinkInProgress.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default connect()(DrinkInProgress);
