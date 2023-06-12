import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionGetPath } from '../redux/actions';

class FavoriteRecipes extends Component {
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

FavoriteRecipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(FavoriteRecipes);
