import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetPath } from '../redux/actions';
import Header from '../components/Header';

class DoneRecipes extends Component {
  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
  }

  render() {
    return (
      <Header />
    );
  }
}

DoneRecipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(DoneRecipes);
