import React, {Component} from "react";
import {withCookies} from "react-cookie";
import WaitMessage from "./WaitMessage";
import PresentationNotFoundMessage from "./PresentationNotFoundMessage";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentationId: props.presentationId,
      questions: [],
      questionIndex: -1,
    };
  }

  getQuestionsByPresentation(presentationId) {
    const {cookies} = this.props;

    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/questions-presentation`);
    url.search = new URLSearchParams({presentation_id: presentationId}).toString();

    fetch(url.toString(), {
      headers: {
        'Authorization': `token ${cookies.get('token')}`,
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        questions: data,
        questionIndex: 0,
      });
    })
    .catch(error => console.error(error));
  }

  componentWillMount() {
    this.getQuestionsByPresentation(this.state.presentationId);
  }

  render() {
    if (this.state.presentationId) {
      let question = this.state.questions[this.state.questionIndex];

      if (question) {
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
    else {
      return (
        <PresentationNotFoundMessage />
      );
    }
  }
}

export default withCookies(Question);
