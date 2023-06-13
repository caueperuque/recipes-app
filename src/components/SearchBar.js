import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetURL } from '../redux/actions';

class SearchBar extends React.Component {
  state = {
    ingredientSearch: 'ingredient',
    nameSearch: 'name',
    firstLetterSearch: 'firstLetter',
    searchInput: '',
    valueRadio: '',
    // urlRecipes: '',
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

  urlGenerate = async () => {
    const { path } = this.props;
    let url = '';
    if (path === '/meals') {
      url = this.mealsAPI();
      return url;
    }
    if (path === '/drinks') {
      url = this.drinksAPI();
      return url;
    }
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const url = await this.urlGenerate();
    console.log(url);
    dispatch(actionGetURL(url));
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
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(SearchBar);
