import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  state = {
    ingredientSearch: 'ingredient',
    nameSearch: 'name',
    firstLetterSearch: 'firstLetter',
    searchInput: '',
  };

  fetchAPI = async ({ target }) => {
    const { name, value } = target;
    const { searchInput } = this.state;
    if (name === 'radioInput' && value === 'ingredient') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`,
      );
      const data = await response.json();
      return data;
    }
    if (name === 'radioInput' && value === 'name') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
      );
      const data = await response.json();
      return data;
    }
    if (name === 'radioInput' && value === 'firstLetter') {
      const response = await fetch(
        `www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`,
      );
      const data = await response.json();
      return data;
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { ingredientSearch, nameSearch, firstLetterSearch } = this.state;
    return (
      <form>
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
            value={ ingredientSearch }
            data-testid="ingredient-search-radio"
            type="radio"
            checked={ this.fetchAPI }
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
            checked={ this.fetchAPI }
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
            checked={ this.fetchAPI }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          onClick=""
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
