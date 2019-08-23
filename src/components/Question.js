import React, {Component} from "react";
import {withCookies} from "react-cookie";
import WaitMessage from "./WaitMessage";
import {Radio, RadioGroup} from "react-radio-group";

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      options: null,
      submittedValue: null,
    };
  }

  getOptions(questionId) {
    let url = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question`);
    url.search = new URLSearchParams({
      question_id: questionId,
    }).toString();

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
    this.setState({
      submittedValue: value,
    });
  }

  componentWillMount() {
    this.getOptions(this.state.question.id);
  }

  render() {
    let options = this.state.options;

    if (options) {
      let optionElements = [];
      if (this.state.submittedValue) {
        optionElements = options.map(function (option) {
          return (
            <div className="form-check" key={option.id}>
              <Radio value={option.id} className="form-check-input" id={option.id} disabled />
              <label className="form-check-label" htmlFor={option.id}>{option.data}</label>
            </div>
          );
        });
      }
      else {
        optionElements = options.map(function (option) {
          return (
            <div className="form-check" key={option.id}>
              <Radio value={option.id} className="form-check-input" id={option.id} />
              <label className="form-check-label" htmlFor={option.id}>{option.data}</label>
            </div>
          );
        });
      }

      return (
        <div>
          <h3>{this.state.question.title}</h3>
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
