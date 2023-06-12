import React, { Component } from 'react';
import { connect } from 'react-redux';

class DoneRecipes extends Component {
  render() {
    return (
      <div>
        Done Recipes
      </div>
    );
  }
}

export default connect()(DoneRecipes);
