import React, {Component} from "react";
import {withCookies} from "react-cookie";
import WaitMessage from "./WaitMessage";
import {Radio, RadioGroup} from "react-radio-group";
import Alert from "./Alert";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      options: null,
      submittedValue: null,
      hasErrors: false,
    };
  }

  getOptions(questionId) {
    const url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question/${questionId}`);

    fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        options: data,
      })
    });
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

  componentWillMount() {
    this.getOptions(this.state.question.id);
  }

  render() {
    let options = this.state.options;
    let feedbackMessage = '';

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
          <h3>{this.state.question.title}</h3>
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
}

export default withCookies(Question);
