import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  state = {
    ingredientSearch: 'ingredient',
    nameSearch: 'name',
    firstLetterSearch: 'firstLetter',
    searchInput: '',
    valueRadio: '',
  };

  mealsAPI = () => {
    const { searchInput, valueRadio } = this.state;

    let url = '';
    if (valueRadio === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    } else if (valueRadio === 'name') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (valueRadio === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
    }
    return url;
  };

  drinksAPI = () => {
    const { searchInput, valueRadio } = this.state;

    let url = '';
    if (valueRadio === 'ingredient') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    } else if (valueRadio === 'name') {
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (valueRadio === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
    }
    return url;
  };

  fetchAPI = async () => {
    const { pathname } = this.props;

    let url = '';

    if (pathname === '/meals') {
      url = this.mealsAPI();
    }

    if (pathname === '/drinks') {
      url = this.drinksAPI();
    }

    return fetch(url)
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await this.fetchAPI();
      const data = await response.json();
      this.setState({
        // resultsAPI: data,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
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
      <form onSubmit={ this.handleClick }>
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

SearchBar.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  pathname: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(SearchBar);
