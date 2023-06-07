import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetPath } from '../redux/actions';

class Drinks extends Component {
  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
  }

  render() {
    return (
      <div>Drinks</div>
    );
  }
}

Drinks.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Drinks);
