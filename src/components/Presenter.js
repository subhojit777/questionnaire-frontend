import React, {Component} from "react";
import {QuestionIndexConsumer} from "../contexts/QuestionIndex";
import Answers from "./Answers";

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: props.questions,
    };
  }

  render() {
    let questions = this.state.questions;
    let questionsCount = (questions.length - 1);

    return (
      <QuestionIndexConsumer>
        {({currentPosition, moveForward, moveBackward}) => {
          let shouldMoveForward = currentPosition < questionsCount;
          let shouldMoveBackward = currentPosition >= questionsCount;

          return (
            <div>
              <div>{questions[currentPosition].title}</div>
              <Answers question={questions[currentPosition]} />
              <button type="button" disabled={!shouldMoveBackward} onClick={moveBackward}>Backward</button>
              <button type="button" disabled={!shouldMoveForward} onClick={moveForward}>Forward</button>
            </div>
          )
        }}
      </QuestionIndexConsumer>
    );
  }
}

export default Presenter;
