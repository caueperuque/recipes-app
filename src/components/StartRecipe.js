import React, { Component } from 'react';

class StartRecipe extends Component {
  render() {
    return (
      <div>
        <button data-testid="start-recipe-btn" className="startrecipe__button">
          Start Recipe
        </button>
      </div>
    );
  }
}

export default StartRecipe;
