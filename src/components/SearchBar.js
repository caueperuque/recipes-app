import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  state = {
    ingredientSearch: 'ingredient',
    nameSearch: 'name',
    firstLetterSearch: 'firstLetter',
    searchInput: '',
    valueRadio: '',
  };

  fetchAPI = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { searchInput, valueRadio } = this.state;
    // console.log(valueRadio);
    if (valueRadio === 'ingredient') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
      );
      const data = await response.json();
      console.log(`Olá ${response}`);
      return data;
    }
    if (name === 'radioInput' && valueRadio === 'name') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
      );
      const data = await response.json();
      console.log(`Olá ${data}`);
      return data;
    }
    if (valueRadio === 'firstLetter') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
      );
      const data = await response.json();
      console.log(`Olá entrou no firstLetter ${data}`);
      return data;
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleChecked = ({ target: { value } }) => {
    this.setState({
      valueRadio: value,
    });
  };

  render() {
    const { ingredientSearch, nameSearch, firstLetterSearch, searchInput } = this.state;
    return (
      <form onSubmit={ this.fetchAPI }>
        <input
          name="searchInput"
          value={ searchInput }
          data-testid="search-input"
          onChange={ this.handleChange }
          type="text"
        />
        <label htmlFor="ingredientSearch">
          <input
            id="ingredientSearch"
            name="radioInput"
            onChange={ this.handleChecked }
            value={ ingredientSearch }
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            id="nameSearch"
            name="radioInput"
            value={ nameSearch }
            data-testid="name-search-radio"
            type="radio"
            // checked={ this.fetchAPI }
            onChange={ this.handleChecked }
          />
          Name
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            id="firstLetterSearch"
            name="radioInput"
            value={ firstLetterSearch }
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ this.handleChecked }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    );
  }
}

const mapStateToProps = (glabalState) => ({
  ...glabalState,
});

export default connect(mapStateToProps)(SearchBar);
