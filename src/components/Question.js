import React, {Component} from "react";
import {withCookies} from "react-cookie";
import WaitMessage from "./WaitMessage";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: props.questionId,
      options: [],
      optionIndex: -1,
      question: null,
    };
  }

  getQuestionData(questionId) {
    const {cookies} = this.props;

    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/questions/${questionId}`);

    fetch(url.toString(), {
      headers: {
        'Authorization': `token ${cookies.get('token')}`,
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        question: data,
      });
    })
    .catch(error => console.error(error));
  }

  getOptions(questionId) {
    const {cookies} = this.props;

    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question`);
    url.search = new URLSearchParams({
      question_id: questionId,
    }).toString();

    fetch(url.toString(), {
      headers: {
        'Authorization': `token ${cookies.get('token')}`,
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        options: data,
        optionIndex: 0,
      })
    });
  }

  componentWillMount() {
    this.getQuestionData(this.state.questionId);
    this.getOptions(this.state.questionId);
  }

  render() {
    // TODO: Test and refactor.
    let question = this.state.question;
    let options = this.state.options;
    console.log(options);

    if (question && options) {
      return (
        <div>{question.title}</div>
      );
    }
    else {
      return (
        <WaitMessage />
      );
    }
  }
}

export default withCookies(Question);
