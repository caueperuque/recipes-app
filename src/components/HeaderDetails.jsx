import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

class HeaderDetails extends Component {
  render() {
    const { path } = this.props;
    return (
      <header className="headerd__container">
        <Link to={ `/${path.split('/')[1]}` } id="headerd__back">Voltar</Link>
        <h1 id="headerd__title">Recipes App</h1>
      </header>
    );
  }
}

HeaderDetails.propTypes = {
  path: PropTypes.shape({
    split: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(HeaderDetails);
