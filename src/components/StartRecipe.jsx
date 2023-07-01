import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { actionIsInProgress } from '../redux/actions';

class StartRecipe extends Component {
  startClick = () => {
    const { dispatch, progress } = this.props;
    dispatch(actionIsInProgress(!progress));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        'id-da-bebida': ['lista-de-ingredientes-utilizados'],
      },
      meals: {
        'id-da-comida': ['lista-de-ingredientes-utilizados'],
      },
    }));
  };

  render() {
    const { path, progress } = this.props;
    return (
      <div className="container__button">
        <div>
          <Link to={ `${path}/in-progress` }>
            <button
              data-testid="start-recipe-btn"
              className="startrecipe__button btn button__SoF"
              onClick={ this.startClick }
            >
              { !progress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

StartRecipe.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
  progress: globalState.inProgressReducer.progress,
});

export default connect(mapStateToProps)(StartRecipe);
