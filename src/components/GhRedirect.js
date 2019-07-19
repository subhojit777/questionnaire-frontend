import React, {Component} from 'react';
import {parse} from 'query-string';
require('dotenv').config();

class GhRedirect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: parse(props.location.search).code,
    };
  }

  componentDidMount() {
    let getTokenUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/gh-access-token`);
    let params = {
      code: this.state.code,
    };
    getTokenUrl.search = new URLSearchParams(params).toString();

    fetch(getTokenUrl.toString())
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  render() {
    return (
      <div>finally this should be empty</div>
    );
  }
}

export default GhRedirect;
