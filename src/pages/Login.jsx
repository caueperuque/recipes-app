import React, { Component } from 'react';
import PropTypes from 'prop-types';
import recipeIcon from '../images/recipeIcon.png';
import './style/Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
    classBtn: 'btn btn-secondary',
  };

  verifyFields = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const verifyPassword = password.length > minLength;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const verifyEmail = emailRegex.test(email);
    this.setState({
      isDisabled: !(verifyEmail && verifyPassword),
      classBtn: verifyEmail && verifyPassword ? 'btn btn-success' : 'btn btn-secondary',
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.verifyFields);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email } = this.state;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  render() {
    const { email, password, isDisabled, classBtn } = this.state;

    return (
      <div className="login__container-main">
        <img src={ recipeIcon } alt="recipe" className="login__image" />
        <form
          onSubmit={ this.handleSubmit }
          className="login__container-form"
        >
          <label className="teste">
            <input
              placeholder="email"
              type="email"
              name="email"
              data-testid="email-input"
              className="form-control"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            <input
              placeholder="password"
              type="password"
              name="password"
              className="form-control"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            className={ classBtn }
          >
            Enter
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
