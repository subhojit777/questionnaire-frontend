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
    return (
      <QuestionIndex.Consumer>
        {({currentPosition, moveForward, moveBackward}) => (
          <div>
            <div>List of questions and answers as chart</div>
            <button type="button" onClick={moveBackward}>Backward</button>
            <button type="button" onClick={moveForward}>Forward</button>
          </div>
        )}
      </QuestionIndex.Consumer>
    );
  }
}

Presenter.contextType = QuestionIndex;

export default Presenter;
