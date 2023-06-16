import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FinishBtn extends Component {
  render() {
    const { isDisabled } = this.props;
    return (
      <div>
        <button data-testid="finish-recipe-btn" disabled={ isDisabled }>
          Finish Recipe
        </button>
      </div>
    );
  }
}

FinishBtn.propTypes = {
  isDisabled: PropTypes.bool,
}.isRequired;

export default FinishBtn;
