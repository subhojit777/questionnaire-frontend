import React, {Component} from 'react';
import {withCookies} from "react-cookie";
import Question from "../components/Question";
import Login from "./Login";
import {string} from "prop-types";

class Participant extends Component {
  static propTypes = {
    authenticationToken: string,
  };

  constructor(props) {
    super(props);

    this.authenticationToken = props.token;
    this.state = {
      questions: props.questions,
      questionIndex: props.questionIndex,
    };
  }

  render() {
    if (this.authenticationToken) {
      let question = this.state.questions[this.state.questionIndex];
      return (
        <Question question={question} token={this.authenticationToken} />
      );
    }
    else {
      return (
        <Login />
      );
    }
  }
}

export default withCookies(Participant);
