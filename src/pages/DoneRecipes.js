import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionGetPath } from '../redux/actions';

class DoneRecipes extends Component {
  componentDidMount() {
    const { history: { location: { pathname } }, dispatch } = this.props;
    dispatch(actionGetPath(pathname));
  }

  render() {
    return (
      <div>
        Done Recipes
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  dispatch: Proptypes.func,
  history: Proptypes.shape({
    push: Proptypes.func,
    location: Proptypes.shape({
      pathname: Proptypes.string,
    }),
  }),
}.isRequired;

export default connect()(DoneRecipes);
