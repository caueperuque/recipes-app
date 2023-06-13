import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetRecipes } from '../redux/actions';

class SearchBar extends React.Component {
  state = {
    searchInput: '',
    valueRadio: '',
  };

  fetchAPI = async () => {
    const { searchInput, valueRadio } = this.state;
    const { path } = this.props;

    let url = '';
    if (valueRadio === 'ingredient') {
      url = `https://www.${path === '/meals' ? 'themeal' : 'thecocktail'}db.com/api/json/v1/1/filter.php?i=${searchInput}`;
    } else if (valueRadio === 'name') {
      url = `https://www.${path === '/meals' ? 'themeal' : 'thecocktail'}db.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (valueRadio === 'firstLetter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      url = `https://www.${path === '/meals' ? 'themeal' : 'thecocktail'}db.com/api/json/v1/1/search.php?f=${searchInput}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const recipes = Object.values(data)[0];

    const { dispatch } = this.props;
    dispatch(actionGetRecipes(recipes));
  };

  handleClick = (e) => {
    e.preventDefault();
    this.fetchAPI();
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
    const { searchInput, valueRadio } = this.state;

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
            value="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            checked={ valueRadio === 'ingredient' }
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            id="nameSearch"
            name="radioInput"
            value="name"
            data-testid="name-search-radio"
            type="radio"
            checked={ valueRadio === 'name' }
            onChange={ this.handleChecked }
          />
          Name
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            id="firstLetterSearch"
            name="radioInput"
            value="firstLetter"
            data-testid="first-letter-search-radio"
            type="radio"
            checked={ valueRadio === 'firstLetter' }
            onChange={ this.handleChecked }
          />
          First letter
        </label>
        <button type="submit" data-testid="exec-search-btn">
          Search
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  path: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(SearchBar);
