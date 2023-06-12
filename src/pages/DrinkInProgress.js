import React, { Component } from 'react';
import { connect } from 'react-redux';

class DrinkInProgress extends Component {
  render() {
    return (
      <div>
        Drink in progress
      </div>
    );
  }
}

export default connect()(DrinkInProgress);
