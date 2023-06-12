import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Footer from '../components/Footer';

class Profile extends Component {
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
        <div>Perfil</div>
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
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default Profile;
