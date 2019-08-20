import React, {Component} from 'react';
import {parse} from "query-string";
import {withCookies} from "react-cookie";
import Question from "../components/Question";
import PresentationNotFoundMessage from "./PresentationNotFoundMessage";

class Participant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: props.token,
      presentationId: props.presentationId,
      questionId: 1,
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
    if (this.state.token) {
      if (this.state.presentationId) {
        return (
          <Question questionId={this.state.questionId} />
        );
      }
      else {
        return (
          <PresentationNotFoundMessage />
        );
      }
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
