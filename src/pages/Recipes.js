import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetPath } from '../redux/actions';

class Recipes extends Component {
  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
  }

  render() {
    return (
      <div>Recipes</div>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Recipes);
