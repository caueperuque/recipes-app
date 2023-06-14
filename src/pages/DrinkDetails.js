import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardDetails from '../components/CardDetails';

class DrinkDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
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
        { returnAPI && (
          <div>
            { returnAPI.map((recipe) => (
              <CardDetails
                key={ Math.random() }
                title={ recipe.strDrink }
                image={ recipe.strDrinkThumb }
                category={ recipe.strCategory }
                instructions={ recipe.strInstructions }
              />
            )) }
            <ul>
              { returnAPI.map((recipe) => (
                Object.entries(recipe).map(([key, value]) => {
                  if (key.includes('strIngredient') && value) {
                    return <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>{ value }</li>;
                  }
                  return null;
                })
              )) }
            </ul>
            <ul>
              { returnAPI.map((recipe) => (
                Object.entries(recipe).map(([key, value]) => {
                  if (key.includes('strMeasure') && value && value !== ' ') {
                    return (
                      <li
                        key={ key }
                        // data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { value }
                      </li>
                    );
                  }
                  return null;
                })
              )) }
            </ul>
          </div>
        ) }
      </div>
    );
  }
}

export default connect()(DrinkDetails);
