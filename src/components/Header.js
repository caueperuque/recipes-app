import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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

  render() {
    const { title } = this.props;
    const { hide } = this.state;
    return (
      <>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-ico"
          />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        <button
          onClick={ this.handleHide }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-ico"
          />
        </button>
        { hide ? '' : <SearchBar /> }
      </>

    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

const mapStateToProps = (glabalState) => ({
  ...glabalState,
});

export default connect(mapStateToProps)(Header);
