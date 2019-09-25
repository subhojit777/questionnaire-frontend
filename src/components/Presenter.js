import React, {Component} from "react";
import QuestionIndex from "../contexts/QuestionIndex";

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
    };
  }

  render() {
    return (
      <div>
        List of questions and answers as chart
      </div>
    );
  }
}

Presenter.contextType = QuestionIndex;

export default Presenter;
