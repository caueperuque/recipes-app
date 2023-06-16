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
    checkedIngredients: {}, // Armazena o estado de marcação de cada ingrediente
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
      .then((data) => this.setState({
        returnAPI: data.drinks,
      }));
  }

  handleChange = (index) => { // Recebe o índice do ingrediente que foi clicado
    this.setState((prevState) => {
      const { checkedIngredients } = prevState;
      const isChecked = checkedIngredients[index] || false; // Verifica se o ingrediente está marcado ou não
      return {
        checkedIngredients: {
          ...checkedIngredients,
          [index]: !isChecked, // Inverte o estado de marcação do ingrediente
        },
      };
    });
  };

  render() {
    const { returnAPI, checkedIngredients } = this.state;
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
              const index = counter; // Salva o índice do ingrediente

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
                    <input type="checkbox" onClick={ () => this.handleChange(index) } />
                  </label>
                </div>
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
