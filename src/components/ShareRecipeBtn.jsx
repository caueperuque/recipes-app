import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

class ShareRecipeBtn extends Component {
  state = {
    hidden: '',
  };

  handleClick = (e) => {
    e.preventDefault();
    const { path } = this.props;
    const path1 = path.split('/');
    console.log(path1[2]);
    console.log(path);
    copy(`http://localhost:3000/${path1[1]}/${path1[2]}`);
    this.setState({
      hidden: 'active',
    });
  };

  render() {
    const { hidden } = this.state;
    return (
      <div>
        <button data-testid="share-btn" onClick={ this.handleClick }>
          <img src={ shareIcon } alt="share button" />
        </button>
        { hidden && (
          <p>Link copied!</p>
        )}
      </div>
    );
  }
}

ShareRecipeBtn.propTypes = {
  path: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  path: globalState.pathReducer.path,
});

export default connect(mapStateToProps)(ShareRecipeBtn);
