import React, { Component } from 'react';
import { connect } from 'react-redux';

class MealDetails extends Component {
  state = {
    returnAPI: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const $URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch($URL_API)
      .then((response) => response.json())
      .then((data) => this.setState({
        returnAPI: data.meals,
      }));
  }

  render() {
    // const
    return (
      <div>
        Drink Details
      </div>
    );
  }
}

export default connect()(MealDetails);
