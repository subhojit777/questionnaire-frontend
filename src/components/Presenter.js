import React, {Component} from "react";

class Presenter extends Component {
  constructor(props) {
    super(props);

    this.questions = props.questions;
    this.questionsCount = (this.questions.length - 1);
    this.state = {
      currentPosition: 0,
      options: [],
      answers: new Map(),
    };

    this.loadOptions = this.loadOptions.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }

  loadOptions(index) {
    const fetchOptionsByQuestionUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/options-question`);
    fetchOptionsByQuestionUrl.search = new URLSearchParams({question_id: this.questions[index].id}).toString();

    const fetchAnswersByOptionUrl = new URL(`${process.env.REACT_APP_BACK_END_BASE_URL}/answers-option`);

    let answers = new Map();

    fetch(fetchOptionsByQuestionUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      // Fetch answers for every option and build state.
      data.forEach((option) => {
        fetchAnswersByOptionUrl.search = new URLSearchParams({
          option_id: option.id,
        }).toString();

        fetch(fetchAnswersByOptionUrl.toString(), {
          headers: {
            'Accept': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => answers.set(data.id, data));
      });

      // TODO: This isn't populating the answers state correctly.
      this.setState({
        options: data,
        currentPosition: index,
        answers: answers,
      });
    })
    .catch(error => console.error(error));
  }

  moveBackward() {
    let newPosition = this.state.currentPosition - 1;
    this.loadOptions(newPosition);
  }

  moveForward() {
    let newPosition = this.state.currentPosition + 1;
    this.loadOptions(newPosition);
  }

  componentDidMount() {
    this.loadOptions(this.state.currentPosition);
  }

  render() {
    const shouldMoveForward = this.state.currentPosition < this.questionsCount;
    const shouldMoveBackward = this.state.currentPosition >= this.questionsCount;
    const question = this.questions[this.state.currentPosition];
    const options = this.state.options.map((option) => {
      return (
        <li key={option.id}>{option.data}</li>
      );
    });

    return (
      <div>
        <h2>{question.title}</h2>
        {options}
        <button type="button" className="btn btn-outline-primary" disabled={!shouldMoveBackward} onClick={this.moveBackward}>Backward</button>
        <button type="button" className="btn btn-outline-primary" disabled={!shouldMoveForward} onClick={this.moveForward}>Forward</button>
      </div>
    )
  }
}

export default Presenter;
