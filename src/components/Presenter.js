import React, {Component} from "react";
import {QuestionIndexConsumer} from "../contexts/QuestionIndex";

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: props.questions,
    };
  }

  render() {
    return (
      <QuestionIndexConsumer>
        {({currentPosition, moveForward, moveBackward}) => {
          return (
            <div>
              <div>List of questions and answers as chart {currentPosition}</div>
              <button type="button" onClick={moveBackward}>Backward</button>
              <button type="button" onClick={moveForward}>Forward</button>
            </div>
          )
        }}
      </QuestionIndexConsumer>
    );
  }
}

export default Presenter;
