import React, {Component} from 'react';
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class Participant extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };

  constructor(props) {
    super(props);

    const {cookies} = props;
    this.state = {
      token: cookies.get('token')
    };
  }

  render() {
    if (this.state.token) {
      return (
        <div>logged in</div>
      );
    }
    else {
      return (
        <div>not logged in</div>
      )
    }
  }
}

export default withCookies(Participant);
