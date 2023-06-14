import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';

class MealDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const $URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => this.setState({
        returnAPI: data.meals,
      }));
    // const objetoSemVazios = this.removeElementosVazios(this.state.returnAPI);
    // this.setState({ returnAPI: objetoSemVazios });
  }

  removeElementosVazios(objeto) {
    const resultado = Object.fromEntries(
      Object.entries(objeto).filter(([chave, valor]) => {
        console.log(chave);
        return valor !== null && valor !== undefined && valor !== '' && valor !== ' ';
      }),
    );

    return resultado;
  }

  render() {
    const { returnAPI } = this.state;
    const arrayIndex = [1, 2];
    return (
      <div>
        { returnAPI && (
          <div>
            { returnAPI.map((recipe) => {
              const arrayRecipe = this.removeElementosVazios(recipe);
              const ingredientArray = arrayIndex
                .map((a, index) => (`${Object.keys(recipe).includes('Ingredients')}`));
              return (
                <CardDetails
                  key={ Math.random() }
                  title={ recipe.strMeal }
                  image={ recipe.strMealThumb }
                  category={ recipe.strCategory }
                  instructions={ recipe.strInstructions }
                  video={ recipe.strYoutube }
                  ingredients={ ingredientArray }
                />
              );
            }) }
          </div>
        ) }
      </div>
    );
  }
}

export default connect()(MealDetails);
