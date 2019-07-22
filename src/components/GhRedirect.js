import React, {Component} from 'react';
import {parse} from 'query-string';
import {withCookies} from 'react-cookie';

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
    const {cookies} = this.props;

    fetch(getTokenUrl.toString())
      .then(response => response.json())
      .then(data => {
        cookies.set('token', data);
        this.setState({
          token: data,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.token) {
      return <div>
        logged in successfully. time to get back.
      </div>;
    }
    else {
      return <div>
        finally this should be empty
      </div>;
    }
  }
}

export default withCookies(GhRedirect);
