import React, {Component} from 'react';
import {parse} from "query-string";
import {withCookies} from "react-cookie";
import Question from "../components/Question";
import {connect} from "react-redux";

class Participant extends Component {
  constructor(props) {
    super(props);
    this.question = props.questions[props.questionIndex];

    this.state = {
      token: props.token,
    };
  }

  componentWillMount() {
    if (parse(this.props.location.search).code && !this.state.token) {
      this.setGitHubAccessToken(parse(this.props.location.search).code);
    }
  }

  setGitHubAccessToken(code) {
    let getTokenUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/gh-access-token`);
    getTokenUrl.search = new URLSearchParams({code: code}).toString();
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
    // TODO: Split into presentational and container components.
    if (this.state.token) {
      return (
        <Question question={this.question} token={this.state.token} />
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

// TODO: This is not working.
const mapStateToProps = (state) => {
  return {
    questionIndex: state.questionIndex.index,
  }
};

export default withCookies(connect(mapStateToProps)(Participant));
