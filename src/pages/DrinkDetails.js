import React, { Component } from 'react';
import { connect } from 'react-redux';

class MealDetails extends Component {
  render() {
    return (
      <div>
        Drink Details
      </div>
    );
  }
}

export default connect()(MealDetails);
