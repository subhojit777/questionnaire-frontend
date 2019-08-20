import React, {Component} from "react";
import {withCookies} from "react-cookie";
import WaitMessage from "./WaitMessage";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      options: null,
      optionIndex: -1,
    };
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
    this.getOptions(this.state.question.id);
  }

  render() {
    let options = this.state.options;

    if (options) {
      return (
        <div>{this.state.question.title}</div>
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
