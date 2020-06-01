import React, {Component} from 'react';
import {withCookies} from "react-cookie";
import Login from "./Login";
import PropTypes, {string} from "prop-types";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {Radio, RadioGroup} from "react-radio-group";
import Alert from "./Alert";
import WaitMessage from "./WaitMessage";

class Participant extends Component {
  static propTypes = {
    authenticationToken: string,
    webSocketClient: PropTypes.exact(W3CWebSocket).isRequired,
  };

  constructor(props) {
    super(props);

    this.client = props.webSocketClient;
    this.authenticationToken = props.token;
    this.questions = props.questions;
    this.state = {
      questionIndex: props.questionIndex,
      submittedValue: null,
      hasErrors: false,
      options: [],
    };
  }

  async getOptions(questionId) {
    const url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question/${questionId}`);

    return await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => data);
  }

  handleSubmission(value) {
    let answerPostUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/answers`);
    let body = {
      'option_id': value,
    };

    fetch(answerPostUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: "include",
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          submittedValue: value,
        });
      }
      else {
        this.setState({
          hasErrors: true,
        });
        console.error(response);
      }
    })
    .catch(error => {
      this.setState({
        hasErrors: true,
      });
      console.error(error);
    });
  }

  async componentDidMount() {
    let options = await this.getOptions(this.questions[this.state.questionIndex].id);
    this.setState({
      options: options,
    });

    this.client.onmessage = async message => {
      let data = JSON.parse(message.data);
      let options = await this.getOptions(this.questions[this.state.questionIndex].id);

      // TODO: Update state after all options are fetched.
      this.setState({
        questionIndex: data.new_question_index,
        submittedValue: null,
        hasErrors: false,
        options: options,
      });
    };
  }

  render() {
    if (this.authenticationToken) {
      let feedbackMessage = '';
      let options = this.state.options;

      if (options) {
        let isSubmitted = (this.state.submittedValue !== null);
        let optionElements = options.map(function (option) {
          return (
            <div className="form-check" key={option.id}>
              <Radio value={option.id} className="form-check-input" id={option.id} />
              <label className="form-check-label" htmlFor={option.id}>{option.data}</label>
            </div>
          );
        });

        if (isSubmitted)  {
          feedbackMessage = <Alert message="Thanks for participating." />;
          optionElements = options.map(function (option) {
            return (
              <div className="form-check" key={option.id}>
                <Radio value={option.id} className="form-check-input" id={option.id} disabled />
                <label className="form-check-label" htmlFor={option.id}>{option.data}</label>
              </div>
            );
          });
        }

        if (this.state.hasErrors) {
          feedbackMessage = <Alert type="danger" message="Something wrong happened, your opinion is not posted. Please contact the presenter." />;
        }

        return (
          <div>
            <h3>{this.questions[this.state.questionIndex].title}</h3>
            {feedbackMessage}
            <RadioGroup name="options" onChange={this.handleSubmission.bind(this)} selectedValue={this.state.submittedValue}>
              {optionElements}
            </RadioGroup>
          </div>
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
        <Login />
      );
    }
  }
}

export default withCookies(Participant);
