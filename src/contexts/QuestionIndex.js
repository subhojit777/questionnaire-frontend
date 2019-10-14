import * as React from "react";
import {Component} from "react";

export const defaultPosition = 0;

export const QuestionIndex = React.createContext({
  currentPosition: defaultPosition,
});

export class QuestionIndexProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: defaultPosition,
    };
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  moveForward() {
    let currentPosition = this.state.currentPosition;
    this.setState({
      currentPosition: currentPosition + 1,
    });
  }

  moveBackward() {
    let currentPosition = this.state.currentPosition;
    this.setState({
      currentPosition: currentPosition - 1,
    });
  }

  render() {
    return (
      <QuestionIndex.Provider value={{
        currentPosition: this.state.currentPosition,
        moveForward: this.moveForward,
        moveBackward: this.moveBackward
      }}>
        {this.props.children}
      </QuestionIndex.Provider>
    );
  }
}

export const QuestionIndexConsumer = QuestionIndex.Consumer;
