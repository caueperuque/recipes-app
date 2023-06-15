import React, { Component } from 'react';

class FavoriteRecipeBtn extends Component {
  render() {
    return (
      <div>
        <button data-testid="favorite-btn">
          Favorite
        </button>
      </div>
    );
  }
}

export default FavoriteRecipeBtn;
