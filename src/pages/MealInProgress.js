import React, { Component } from 'react';
import { connect } from 'react-redux';

class MealInProgress extends Component {
  render() {
    return (
      <div>
        Meal in Progress
      </div>
    );
  }
}

export default connect()(MealInProgress);
