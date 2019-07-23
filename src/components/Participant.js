import React, {Component} from 'react';

class Participant extends Component {
  render() {
    if (this.props.accessToken) {
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

export default Participant;
