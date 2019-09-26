import React, {Component} from "react";
import {QuestionIndex} from "../contexts/QuestionIndex";

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: props.questions,
    };
  }

  render() {
    // TODO: Implement forward and back navigation keys and connect them with context.
    return (
      <QuestionIndex.Consumer>
        <div>
          List of questions and answers as chart
        </div>
      </QuestionIndex.Consumer>
    );
  }
}

Presenter.contextType = QuestionIndex;

export default Presenter;
