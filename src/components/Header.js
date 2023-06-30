import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './style/Header.css';

class Header extends React.Component {
  state = {
    hide: true,
  };

  handleHide = () => {
    const { hide } = this.state;
    this.setState({
      hide: !hide,
    });
  };

  getTitlePage = () => {
    const { path } = this.props;
    switch (path) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  render() {
    const { path } = this.props;
    const { hide } = this.state;
    return (
      <div className="header__container-main">
        <h2 data-testid="page-title">{this.getTitlePage()}</h2>
        <nav className="header__nav">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile-ico"
            />
          </Link>
          { (path === '/profile'
            || path === '/done-recipes'
            || path === '/favorite-recipes') ? ''
            : (
              <button
                onClick={ this.handleHide }
                className="btn"
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="search-ico"
                />
              </button>
            )}
        </nav>
        {hide ? '' : <SearchBar />}
      </div>

    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(Header);
