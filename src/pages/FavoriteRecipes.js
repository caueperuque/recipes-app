import React, { Component } from 'react';
import { connect } from 'react-redux';

class FavoriteRecipes extends Component {
  render() {
    return (
      <div>
        Favorite Recipes
      </div>
    );
  }
}

export default connect()(FavoriteRecipes);
