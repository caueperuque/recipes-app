import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { actionGetPath } from '../redux/actions';

class Profile extends Component {
  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
  }

  goToDoneRecipes = () => {
    const { history } = this.props;
    history.push('/done-recipes');
  };

  goToFavorites = () => {
    const { history } = this.props;
    history.push('/favorite-recipes');
  };

  clearLocalStorage = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  showEmail = () => {
    const getToken = localStorage.getItem('user');
    const localToken = JSON.parse(getToken);
    const email = localToken ? localToken.email : '';

    return email;
  };

  render() {
    const email = this.showEmail();
    return (
      <>
        <Header />
        <h2
          data-testid="profile-email"
        >
          { email }
        </h2>
        <button
          onClick={ this.goToDoneRecipes }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
        <button
          onClick={ this.goToFavorites }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ this.clearLocalStorage }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
        <Footer />
      </>
    );
  }
}

Profile.propTypes = {
  dispatch: Proptypes.func,
  history: Proptypes.shape({
    push: Proptypes.func,
    location: Proptypes.shape({
      pathname: Proptypes.string,
    }),
  }),
}.isRequired;

export default connect()(Profile);
