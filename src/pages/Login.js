import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  verifyFields = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const verifyPassword = password.length > minLength;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const verifyEmail = emailRegex.test(email);
    this.setState({
      isDisabled: !(verifyEmail && verifyPassword),
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
    const { email, password, isDisabled } = this.state;

    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <label>
          User:
          <input
            type="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          // onClick={}
        >
          Enter
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
