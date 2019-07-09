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
      let loginURL = `https://github.com/login/oauth/authorize?scope=user:email,read:user&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
      return (
        <div>
          <a href={loginURL}>Click here to login</a>
        </div>
      );
    }
  }
}

export default withCookies(Participant);
