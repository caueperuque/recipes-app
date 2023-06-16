import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';
import FavoriteRecipeBtn from '../components/FavoriteRecipeBtn';
import ShareRecipeBtn from '../components/ShareRecipeBtn';
import FinishBtn from '../components/FinishBtn';
import { actionGetPath } from '../redux/actions';

class DrinkInProgress extends Component {
  state = {
    returnAPI: null,
  };

  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
    console.log(pathname);
    const {
      match: { params: { id } },
    } = this.props;
    const $URL_API = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => this.setState({
        returnAPI: data.drinks,
      }));
  }

  render() {
    const { returnAPI } = this.state;
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
        {returnAPI && returnAPI.map((recipe) => {
          let counter = 0;

          return Object.entries(recipe).map(([key, value]) => {
            if (key.includes('strIngredient') && value) {
              const ingredientKey = key;
              const measureKey = `strMeasure${ingredientKey
                .slice('strIngredient'.length)}`;
              const ingredient = value;
              const measure = recipe[measureKey];

              const testDataId = `${counter}-ingredient-step`;

              counter += 1;

              return (
                <label key={ key } data-testid={ testDataId }>
                  {ingredient}
                  {' '}
                  -
                  {measure}
                  <input type="checkbox" />
                </label>
              );
            }
            return null;
          });
        })}

        <FavoriteRecipeBtn />
        <ShareRecipeBtn />
        <FinishBtn />
      </div>
    );
  }
}

DrinkInProgress.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(DrinkInProgress);
