import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import './style/ButtonsSoF.css';

class ShareRecipeBtn extends Component {
  state = {
    hidden: '',
  };

  handleClick = (e) => {
    e.preventDefault();
    // const { path } = this.props;
    const limitPath = 5;
    const limitPath2 = 6;

    const relativePath = window.location.href.split('/');
    const toto = relativePath.length >= limitPath2 ? relativePath.slice(0, limitPath).join().replace(/,/g, '/') : relativePath.join().replace(/,/g, '/');
    // const testie = toto.join();
    // const path1 = path.split('/');
    // console.log(path1[2]);
    // console.log(path);
    copy(toto);
    console.log(toto);

    this.setState({
      hidden: 'active',
    });
  };

  render() {
    const { hidden } = this.state;
    return (
      <div>
        <button
          data-testid="share-btn"
          onClick={ this.handleClick }
          className="btn button__SoF"
        >
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
